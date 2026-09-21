from __future__ import annotations

import re
from typing import Any

from .models import AuditResult, DraftOffer, Lead

SERVICE_CATALOG = {
    "landing_page": {
        "label": "landing page",
        "promise": "a focused sales page designed to move visitors into leads and calls",
        "range": "€300 – €1,200",
    },
    "website": {
        "label": "website redesign",
        "promise": "a cleaner, clearer site that explains the offer and improves trust",
        "range": "€500 – €2,500",
    },
    "maintenance": {
        "label": "website maintenance",
        "promise": "regular updates, backups, speed checks, and low-risk issue handling",
        "range": "€80 – €350 / month",
    },
    "workflow": {
        "label": "workflow system",
        "promise": "a lightweight operational system to reduce repetitive admin work",
        "range": "€500 – €3,000",
    },
}


def score_lead(lead: Lead) -> tuple[int, str, str, list[str]]:
    """Return score, recommended service, reason, and supporting cues."""
    issue_text = (lead.issue or "") + " " + (lead.notes or "")
    text = issue_text.lower()
    service = "website"
    reason = "the business may benefit from a clearer online presence"
    cues: list[str] = []

    if any(word in text for word in ("landing", "conversion", "ads", "campaign", "lead")):
        service = "landing_page"
        reason = "there are conversion or campaign signals suggesting a landing page is needed"
        cues.append("lead generation / conversion")
    elif any(word in text for word in ("redesign", "outdated", "mobile", "broken", "slow", "modern")):
        service = "website"
        reason = "the brand may need a stronger and more trustworthy website"
        cues.append("site quality / redesign")
    elif any(word in text for word in ("maintenance", "backup", "update", "security", "hosting")):
        service = "maintenance"
        reason = "the business appears to need ongoing website care"
        cues.append("maintenance / health")
    elif any(word in text for word in ("workflow", "admin", "manual", "forms", "process", "spreadsheet")):
        service = "workflow"
        reason = "the operation is likely losing time in repetitive manual work"
        cues.append("operations / workflow")

    score = 0
    if lead.website:
        score += 10
        cues.append("website available")
    if lead.email:
        score += 5
        cues.append("email available")
    if lead.consent_or_relationship:
        score += 10
        cues.append("prior relationship or consent")
    if lead.profile_url:
        score += 5
        cues.append("profile attached")

    keyword_points = {
        "landing": 20,
        "conversion": 18,
        "ads": 12,
        "outdated": 16,
        "mobile": 14,
        "redesign": 16,
        "maintenance": 12,
        "backup": 12,
        "workflow": 18,
        "manual": 15,
        "process": 10,
    }
    for key, points in keyword_points.items():
        if key in text:
            score += points

    if score > 100:
        score = 100

    return score, service, reason, sorted(set(cues))


def generate_offer(lead: Lead, audit: AuditResult | None = None) -> DraftOffer:
    score, service, reason, cues = score_lead(lead)
    catalog = SERVICE_CATALOG[service]
    first_name = lead.name.strip().split()[0] if lead.name.strip() else "there"
    company = lead.company or "your business"
    issue_text = (lead.issue or "no issue summary provided").strip()
    if audit and audit.issues:
        issue_text = "; ".join(audit.issues)

    subject = f"Idea for {company}: {catalog['label']}"
    body = (
        f"Hi {first_name},\n\n"
        f"I came across {company} and noticed {reason}. Based on the current signals, a {catalog['label']} may help create a clearer online offer and improve conversion.\n\n"
        f"The likely opportunity is: {issue_text}.\n\n"
        f"I can help with {catalog['promise']}. A practical starting point is {catalog['range']} depending on scope, pages, and the amount of custom work needed.\n\n"
        "If this is relevant, I can share a short plan with scope, timeline, and a fixed-price option. If it is not a fit, no problem—please let me know and I will not follow up.\n\n"
        "Best,\nMONEYMAKER1"
    )

    priority = "high" if score >= 70 else "medium" if score >= 40 else "low"
    return DraftOffer(
        lead={
            "name": lead.name,
            "company": lead.company,
            "role": lead.role,
            "website": lead.website,
            "source": lead.source,
            "consent_or_relationship": lead.consent_or_relationship,
            "issue": lead.issue,
            "email": lead.email,
            "profile_url": lead.profile_url,
            "notes": lead.notes,
        },
        service=service,
        score=score,
        priority=priority,
        subject=subject,
        body=body,
        estimated_value=catalog["range"],
    )


def _normalize_sentence(value: str) -> str:
    if not value:
        return ""
    stripped = value.strip()
    if not stripped:
        return ""
    return stripped[0].upper() + stripped[1:]


def format_draft_summary(draft: DraftOffer) -> str:
    return (
        f"{draft.priority.upper()} PRIORITY | {draft.service} | score {draft.score}/100 | "
        f"value {draft.estimated_value}"
    )
