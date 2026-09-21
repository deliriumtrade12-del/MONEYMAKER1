from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path
from typing import Any

from .lead_scoring import generate_offer
from .models import Lead
from .website_audit import audit_website


def load_leads_csv(path: str | Path) -> list[Lead]:
    csv_path = Path(path)
    if not csv_path.exists():
        raise FileNotFoundError(f"CSV file not found: {csv_path}")
    with csv_path.open("r", encoding="utf-8", newline="") as handle:
        return [
            Lead(
                name=row.get("name", ""), company=row.get("company", ""), role=row.get("role", ""),
                website=row.get("website", ""), source=row.get("source", "csv"),
                consent_or_relationship=row.get("consent_or_relationship", ""), issue=row.get("issue", ""),
                email=row.get("email", ""), profile_url=row.get("profile_url", ""), notes=row.get("notes", ""),
            )
            for row in csv.DictReader(handle)
        ]


def build_queue(leads: list[Lead]) -> list[dict[str, Any]]:
    queue = []
    for lead in leads:
        draft = generate_offer(lead)
        item = draft.__dict__.copy()
        item["id"] = f"{lead.company}:{lead.email}".strip(":")
        item["status"] = "needs_human_approval"
        queue.append(item)
    return sorted(queue, key=lambda item: item["score"], reverse=True)


def write_queue(path: str | Path, queue: list[dict[str, Any]]) -> Path:
    target = Path(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(queue, indent=2, ensure_ascii=False), encoding="utf-8")
    return target


def main() -> int:
    parser = argparse.ArgumentParser(description="MONEYMAKER1 approval-first revenue agent")
    subparsers = parser.add_subparsers(dest="command", required=True)
    generate = subparsers.add_parser("generate", help="Build a review queue from CSV")
    generate.add_argument("--input", required=True)
    generate.add_argument("--output", required=True)
    audit = subparsers.add_parser("audit", help="Audit a public website")
    audit.add_argument("--url", required=True)
    args = parser.parse_args()
    if args.command == "generate":
        queue = build_queue(load_leads_csv(args.input))
        print(f"Created {len(queue)} queued opportunities in {write_queue(args.output, queue)}")
        return 0
    if args.command == "audit":
        print(json.dumps(audit_website(args.url).__dict__, ensure_ascii=False, indent=2))
        return 0
    print("Unknown command", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
