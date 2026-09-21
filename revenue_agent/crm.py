from __future__ import annotations

from .lead_scoring import generate_offer
from .models import Lead


def prepare_offer(lead: Lead) -> dict[str, object]:
    draft = generate_offer(lead)
    return {
        "service": draft.service,
        "score": draft.score,
        "priority": draft.priority,
        "subject": draft.subject,
        "body": draft.body,
        "estimated_value": draft.estimated_value,
        "status": draft.status,
    }


def monthly_retainer(service: str) -> str:
    mapping = {
        "landing_page": "€150 – €400 / month",
        "website": "€180 – €500 / month",
        "maintenance": "€80 – €350 / month",
        "workflow": "€200 – €600 / month",
    }
    return mapping.get(service, "€80 – €300 / month")
