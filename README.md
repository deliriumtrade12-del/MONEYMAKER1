from __future__ import annotations

from typing import Any


def require_approval(token: str | None) -> bool:
    return token is not None and token.strip() != ""


def auth_context() -> dict[str, Any]:
    return {"mode": "approval_first", "dry_run": True}
