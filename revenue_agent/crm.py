from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .models import SalesRecord


def load_sales_records(path: str | Path) -> list[SalesRecord]:
    target = Path(path)
    if not target.exists():
        return []
    return [SalesRecord(**item) for item in json.loads(target.read_text(encoding="utf-8"))]


def save_sales_records(path: str | Path, records: list[SalesRecord]) -> Path:
    target = Path(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps([record.to_dict() for record in records], indent=2, ensure_ascii=False), encoding="utf-8")
    return target


def add_record(path: str | Path, record: SalesRecord) -> SalesRecord:
    records = load_sales_records(path)
    records.append(record)
    save_sales_records(path, records)
    return record


def update_status(path: str | Path, company: str, status: str) -> bool:
    records = load_sales_records(path)
    for record in records:
        if record.company.casefold() == company.casefold():
            record.status = status
            save_sales_records(path, records)
            return True
    return False
