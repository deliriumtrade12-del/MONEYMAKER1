from __future__ import annotations

from typing import Any


def require_approval(approved: bool) -> None:
    if not approved:
        raise PermissionError("Human approval is required before outreach or payment actions.")


def auth_context() -> dict[str, Any]:
    return {"mode": "approval_first", "dry_run": True, "outreach_enabled": False, "payments_enabled": False}
