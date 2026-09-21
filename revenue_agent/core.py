"""Approval-first lead and offer generation for MONEYMAKER1.

The module intentionally has no network client and no send/payment capability.
It turns authorized lead records into reviewable outreach drafts.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from typing import Any


SERVICES = {
    "landing_page": {
        "label": "landing page",
        "promise": "a fast, focused page designed to turn visitors into enquiries",
    },
    "website": {
        "label": "website refresh",
        "promise": "a clearer, mobile-friendly website that explains your offer",
    },
    "maintenance": {
        "label": "website maintenance",
        "promise": "reliable updates, backups, and basic health checks",
    },
    "workflow": {
        "label": "workflow system",
        "promise": "a lightweight system to reduce repetitive admin work",
    },
}


@dataclass
class Lead:
    name: str
    company: str
    role: str = ""
    website: str = ""
    source: str = "csv"
    consent_or_relationship: str = ""
    issue: str = ""
    email: str = ""
    profile_url: str = ""


@dataclass
class Draft:
    lead: dict[str, Any]
    service: str
    score: int
    reason: str
    subject: str
    body: str
    status: str = "needs_human_approval"
    created_at: str = ""


def score_lead(lead: Lead) -> tuple[int, str, str]:
    """Return score, selected service, and an explainable reason.

    Scores are deliberately conservative. Missing data is never treated as proof
    that a business needs a service; it only lowers confidence.
    """
    issue = lead.issue.lower()
    score = 0
    service = "website"
    reason = "potential website improvement"

    if any(word in issue for word in ("landing", "conversion", "campaign", "ads")):
        score += 35
        service = "landing_page"
        reason = "the supplied notes mention a campaign or conversion problem"
    elif any(word in issue for word in ("slow", "broken", "outdated", "mobile", "redesign")):
        score += 30
        service = "website"
        reason = "the supplied notes mention a website quality problem"
    elif any(word in issue for word in ("backup", "update", "security", "maintenance")):
        score += 25
        service = "maintenance"
        reason = "the supplied notes mention an ongoing maintenance need"
    elif any(word in issue for word in ("manual", "spreadsheet", "workflow", "admin")):
        score += 25
        service = "workflow"
        reason = "the supplied notes mention repetitive operational work"

    if lead.website:
        score += 10
    if lead.consent_or_relationship:
        score += 10
    if lead.email:
        score += 5
    return min(score, 100), service, reason


def create_draft(lead: Lead) -> Draft:
    score, service, reason = score_lead(lead)
    offer = SERVICES[service]
    first_name = lead.name.strip().split()[0] if lead.name.strip() else "there"
    company = lead.company or "your business"
    body = (
        f"Hi {first_name},\n\n"
        f"I came across {company} and noticed {reason}. "
        f"I build {offer['label']}s; the practical goal would be {offer['promise']}.\n\n"
        "If this is relevant, I can send a short no-obligation outline with scope, "
        "timeline, and a fixed price. If not, no problem—please let me know and I "
        "will not follow up.\n\n"
        "Best,\nMONEYMAKER1"
    )
    return Draft(
        lead=asdict(lead),
        service=service,
        score=score,
        reason=reason,
        subject=f"Idea for {company}: {offer['label']}",
        body=body,
        created_at=datetime.now(timezone.utc).isoformat(),
    )
