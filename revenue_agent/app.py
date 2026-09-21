from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .dashboard import build_dashboard
from .lead_scoring import generate_offer, score_lead
from .models import Lead
from .queue import build_queue, load_leads_csv, write_queue
from .queue_store import set_status
from .website_audit import audit_website

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="MONEYMAKER1 Revenue Agent", version="1.2.0")
QUEUE_PATH = Path("data/outreach_queue.json")


class LeadInput(BaseModel):
    name: str = ""
    company: str = ""
    role: str = ""
    website: str = ""
    source: str = "csv"
    consent_or_relationship: str = ""
    issue: str = ""
    email: str = ""
    profile_url: str = ""
    notes: str = ""

    def to_lead(self) -> Lead:
        return Lead(**self.model_dump())


class AuditInput(BaseModel):
    website: str = Field(..., min_length=1)


class QueueRequest(BaseModel):
    input_file: str = "examples/leads.csv"
    output_file: str = str(QUEUE_PATH)


class StatusRequest(BaseModel):
    item_id: str = Field(..., min_length=1)
    status: str
    approved: bool = False


@app.get("/health")
def health() -> dict[str, Any]:
    return {"status": "ok", "mode": "approval_first", "dry_run": True}


@app.post("/lead/score")
def lead_score(payload: LeadInput) -> dict[str, Any]:
    score, service, reason, cues = score_lead(payload.to_lead())
    return {"score": score, "service": service, "reason": reason, "cues": cues}


@app.post("/lead/offer")
def lead_offer(payload: LeadInput) -> dict[str, Any]:
    return generate_offer(payload.to_lead()).__dict__


@app.post("/audit")
def website_audit_endpoint(payload: AuditInput) -> dict[str, Any]:
    return audit_website(payload.website).__dict__


@app.post("/queue/generate")
def generate_queue_endpoint(payload: QueueRequest) -> dict[str, Any]:
    try:
        leads = load_leads_csv(payload.input_file)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    queue = build_queue(leads)
    output = write_queue(payload.output_file, queue)
    return {"generated": len(queue), "output_file": str(output), "queue": queue}


@app.get("/queue")
def read_queue(path: str = str(QUEUE_PATH)) -> list[dict[str, Any]]:
    target = Path(path)
    if not target.exists():
        return []
    return json.loads(target.read_text(encoding="utf-8"))


@app.patch("/queue/status")
def update_queue_status(payload: StatusRequest) -> dict[str, Any]:
    try:
        return set_status(QUEUE_PATH, payload.item_id, payload.status, payload.approved)
    except (KeyError, ValueError, PermissionError) as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.get("/dashboard")
def dashboard(path: str = str(QUEUE_PATH)) -> dict[str, Any]:
    target = Path(path)
    if not target.exists():
        return build_dashboard([])
    return build_dashboard(json.loads(target.read_text(encoding="utf-8")))
