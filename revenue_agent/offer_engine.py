from __future__ import annotations

import re
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from .models import AuditResult


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
    except Exception:
        return AuditResult(
            website=safe_url,
            reachable=False,
            score=0,
            issues=["The website could not be reached from this environment."],
            recommendations=["Confirm the URL, check DNS, and then run the audit again."],
            service="website",
        )

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

    if any(token in lower for token in ("pricing", "services", "book", "contact")):
        service = "landing_page"
    if any(token in lower for token in ("wordpress", "shopify", "wix")):
        service = "website"

    score = max(10, 100 - (len(issues) * 15))
    return AuditResult(
        website=safe_url,
        reachable=True,
        score=score,
        issues=issues or ["No major issues detected from the automated review."],
        recommendations=recommendations or ["Keep the homepage focused, add trust signals, and make the CTA obvious."],
        service=service,
    )
