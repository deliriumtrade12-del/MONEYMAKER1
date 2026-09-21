from __future__ import annotations

from .lead_scoring import SERVICE_CATALOG, generate_offer
from .models import Lead


def prepare_offer(lead: Lead) -> dict[str, object]:
    """Create a reviewable offer; this function never sends it."""
    return generate_offer(lead).__dict__


def monthly_retainer(service: str) -> str:
    return {
        "landing_page": "€150 – €400 / month",
        "website": "€180 – €500 / month",
        "maintenance": "€80 – €350 / month",
        "workflow": "€200 – €600 / month",
    }.get(service, "€80 – €300 / month")


def catalog() -> dict[str, dict[str, str]]:
    return SERVICE_CATALOG.copy()
