from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class SalesRecord:
    company: str
    contact: str = ""
    service: str = "website"
    status: str = "new"
    score: int = 0
    notes: list[str] = field(default_factory=list)

    def approve(self) -> None:
        self.status = "approved"

    def to_dict(self) -> dict[str, object]:
        return {
            "company": self.company,
            "contact": self.contact,
            "service": self.service,
            "status": self.status,
            "score": self.score,
            "notes": self.notes,
        }


def save_sales_records(path: str | Path, records: list[SalesRecord]) -> Path:
    output = Path(path)
    output.parent.mkdir(parents=True, exist_ok=True)
    payload = [record.to_dict() for record in records]
    output.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    return output
