from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from .lead_scoring import generate_offer, score_lead
from .models import AuditResult, Lead


def load_leads_csv(path: str | Path) -> list[Lead]:
    records: list[Lead] = []
    csv_path = Path(path)
    if not csv_path.exists():
        raise FileNotFoundError(f"CSV file not found: {csv_path}")

    with csv_path.open("r", encoding="utf-8", newline="") as file:
        import csv

        reader = csv.DictReader(file)
        for row in reader:
            records.append(
                Lead(
                    name=row.get("name", ""),
                    company=row.get("company", ""),
                    role=row.get("role", ""),
                    website=row.get("website", ""),
                    source=row.get("source", "csv"),
                    consent_or_relationship=row.get("consent_or_relationship", ""),
                    issue=row.get("issue", ""),
                    email=row.get("email", ""),
                    profile_url=row.get("profile_url", ""),
                    notes=row.get("notes", ""),
                )
            )
    return records


def build_queue(leads: list[Lead]) -> list[dict[str, Any]]:
    queue: list[dict[str, Any]] = []
    for lead in leads:
        draft = generate_offer(lead)
        queue.append(
            {
                "lead": draft.lead,
                "service": draft.service,
                "score": draft.score,
                "priority": draft.priority,
                "subject": draft.subject,
                "body": draft.body,
                "estimated_value": draft.estimated_value,
                "status": draft.status,
            }
        )
    queue.sort(key=lambda item: item["score"], reverse=True)
    return queue


def write_queue(path: str | Path, queue: list[dict[str, Any]]) -> Path:
    target = Path(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(queue, indent=2, ensure_ascii=False), encoding="utf-8")
    return target


def audit_website(url: str) -> AuditResult:
    safe_url = url.strip()
    if not safe_url:
        raise ValueError("Website URL is required.")
    parsed = urlparse(safe_url)
    if not parsed.scheme:
        safe_url = "https://" + safe_url

    issues: list[str] = []
    recommendations: list[str] = []
    service = "website"

    try:
        request = Request(safe_url, headers={"User-Agent": "MONEYMAKER1-Review/1.0"})
        with urlopen(request, timeout=10) as response:
            content = response.read().decode("utf-8", errors="replace")
            status = response.status
    except Exception:
        return AuditResult(
            website=safe_url,
            reachable=False,
            score=0,
            issues=["The website could not be reached from this environment."],
            recommendations=["Confirm the URL, check DNS, and then run the audit again."],
            service="website",
        )

    title_match = re.search(r"<title>(.*?)</title>", content, re.IGNORECASE | re.DOTALL)
    title = title_match.group(1).strip() if title_match else "No title found"
    lower = content.lower()

    if "contact" not in lower:
        issues.append("No obvious contact information on the page.")
        recommendations.append("Add a visible contact section and call-to-action.")
    if "pricing" not in lower and "services" not in lower:
        issues.append("Offer and pricing are not clear from the homepage.")
        recommendations.append("Clarify the offer, pricing, and benefits on the homepage.")
    if "form" not in lower:
        issues.append("There is no obvious lead-capture form.")
        recommendations.append("Add a lead form or a simple enquiry CTA.")
    if len(re.findall(r"<img", content, flags=re.IGNORECASE)) < 2:
        issues.append("The page may be visually sparse or under-optimized for trust.")
        recommendations.append("Add stronger visual hierarchy and trust signals.")

    if any(token in lower for token in ("wordpress", "shopify", "wix")):
        service = "website"
    if any(token in lower for token in ("pricing", "services", "book", "contact")):
        service = "landing_page"

    score = 100
    score -= 15 * len(issues)
    if score < 10:
        score = 10
    return AuditResult(
        website=safe_url,
        reachable=True,
        score=score,
        issues=issues or ["No major issues detected from an automated, basic review."],
        recommendations=recommendations or ["Keep the homepage focused, add trust signals, and make the CTA obvious."],
        service=service,
    )
