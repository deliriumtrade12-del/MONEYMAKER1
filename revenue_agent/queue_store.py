from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .auth import require_approval


def load_queue(path: str | Path) -> list[dict[str, Any]]:
    target = Path(path)
    if not target.exists():
        return []
    data = json.loads(target.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("Queue file must contain a JSON list")
    return data


def save_queue(path: str | Path, queue: list[dict[str, Any]]) -> Path:
    target = Path(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(queue, indent=2, ensure_ascii=False), encoding="utf-8")
    return target


def set_status(path: str | Path, item_id: str, status: str, approved: bool = False) -> dict[str, Any]:
    allowed = {"needs_human_approval", "approved", "rejected", "sent", "won", "lost"}
    if status not in allowed:
        raise ValueError(f"Unsupported status: {status}")
    if status in {"approved", "sent", "won"}:
        require_approval(approved)
    queue = load_queue(path)
    for item in queue:
        if item.get("id") == item_id:
            item["status"] = status
            save_queue(path, queue)
            return item
    raise KeyError(f"Queue item not found: {item_id}")
