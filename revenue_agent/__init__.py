from __future__ import annotations

from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from .lead_scoring import generate_offer, score_lead
from .models import Lead
from .queue import build_queue, load_leads_csv, write_queue
from .website_audit import audit_website

app = FastAPI(
    title="MONEYMAKER1 Revenue Agent",
    version="1.0.0",
    description="Approval-first lead generation and web-services offer workflow.",
)


class LeadInput(BaseModel):
    name: str = Field(default="")
    company: str = Field(default="")
    role: str = Field(default="")
    website: str = Field(default="")
    source: str = Field(default="csv")
    consent_or_relationship: str = Field(default="")
    issue: str = Field(default="")
    email: str = Field(default="")
    profile_url: str = Field(default="")
    notes: str = Field(default="")


class AuditInput(BaseModel):
    website: str = Field(..., description="Website URL to audit")


class QueueRequest(BaseModel):
    input_file: str = Field(default="examples/leads.csv")
    output_file: str = Field(default="data/outreach_queue.json")


@app.get("/health")
def health() -> dict[str, Any]:
    return {"status": "ok", "dry_run": True, "mode": "approval_first"}


@app.post("/lead/score")
def score_lead_endpoint(lead: LeadInput) -> dict[str, Any]:
    score, service, reason, cues = score_lead(Lead(**lead.model_dump()))
    return {"score": score, "service": service, "reason": reason, "cues": cues}


@app.post("/lead/offer")
def offer_endpoint(lead: LeadInput) -> dict[str, Any]:
    draft = generate_offer(Lead(**lead.model_dump()))
    return {
        "service": draft.service,
        "score": draft.score,
        "priority": draft.priority,
        "subject": draft.subject,
        "body": draft.body,
        "estimated_value": draft.estimated_value,
        "status": draft.status,
    }


@app.post("/audit")
def audit_endpoint(payload: AuditInput) -> dict[str, Any]:
    result = audit_website(payload.website)
    return {
        "website": result.website,
        "reachable": result.reachable,
        "score": result.score,
        "service": result.service,
        "issues": result.issues,
        "recommendations": result.recommendations,
    }


@app.post("/queue/generate")
def generate_queue(payload: QueueRequest) -> dict[str, Any]:
    input_path = Path(payload.input_file)
    if not input_path.exists():
        raise HTTPException(status_code=404, detail=f"Input file not found: {input_path}")

    leads = load_leads_csv(input_path)
    queue = build_queue(leads)
    output_path = write_queue(payload.output_file, queue)
    return {
        "generated": len(queue),
        "output_file": str(output_path),
        "queue": queue,
    }


@app.get("/queue")
def list_queue() -> list[dict[str, Any]]:
    output_path = Path("data/outreach_queue.json")
    if not output_path.exists():
        return []
    import json
    return json.loads(output_path.read_text(encoding="utf-8"))
