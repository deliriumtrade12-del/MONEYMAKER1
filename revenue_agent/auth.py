from __future__ import annotations

from collections import Counter
from typing import Any


def build_dashboard(queue: list[dict[str, Any]]) -> dict[str, Any]:
    priorities = Counter(item.get("priority", "low") for item in queue)
    services = Counter(item.get("service", "website") for item in queue)
    high_score = max((item.get("score", 0) for item in queue), default=0)
    return {
        "total": len(queue),
        "high_priority": priorities.get("high", 0),
        "medium_priority": priorities.get("medium", 0),
        "low_priority": priorities.get("low", 0),
        "services": dict(services),
        "highest_score": high_score,
    }
