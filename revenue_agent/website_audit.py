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
    records: list[Lead] = []
    csv_path = Path(path)
    if not csv_path.exists():
        raise FileNotFoundError(f"CSV file not found: {csv_path}")

    with csv_path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            records.append(
                Lead(
                    name=row.get("name", ""),
                    company=row.get("company", ""),
                    role=row.get("role", ""),
                    website=row.get("website", ""),
                    source=row.get("source", "csv"),
                    consent_or_relationship=row.get("consent_or_relationship", ""),
                    issue=row.get("issue", ""),
                    email=row.get("email", ""),
                    profile_url=row.get("profile_url", ""),
                    notes=row.get("notes", ""),
                )
            )
    return records


def build_queue(leads: list[Lead]) -> list[dict[str, Any]]:
    queue: list[dict[str, Any]] = []
    for lead in leads:
        draft = generate_offer(lead)
        queue.append(
            {
                "lead": draft.lead,
                "service": draft.service,
                "score": draft.score,
                "priority": draft.priority,
                "subject": draft.subject,
                "body": draft.body,
                "estimated_value": draft.estimated_value,
                "status": draft.status,
            }
        )
    queue.sort(key=lambda item: item["score"], reverse=True)
    return queue


def write_queue(path: str | Path, queue: list[dict[str, Any]]) -> Path:
    target = Path(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(queue, indent=2, ensure_ascii=False), encoding="utf-8")
    return target


def main() -> int:
    parser = argparse.ArgumentParser(description="MONEYMAKER1 approval-first revenue agent")
    subparsers = parser.add_subparsers(dest="command", required=True)

    generate_parser = subparsers.add_parser("generate", help="Build a lead outreach queue from a CSV file")
    generate_parser.add_argument("--input", required=True, help="Path to the input CSV file")
    generate_parser.add_argument("--output", required=True, help="Path to the output JSON queue")

    audit_parser = subparsers.add_parser("audit", help="Audit a website URL")
    audit_parser.add_argument("--url", required=True, help="Website URL to review")

    args = parser.parse_args()

    if args.command == "generate":
        leads = load_leads_csv(args.input)
        queue = build_queue(leads)
        output_path = write_queue(args.output, queue)
        print(f"Created {len(queue)} queued opportunities in {output_path}")
        return 0

    if args.command == "audit":
        result = audit_website(args.url)
        print(
            json.dumps(
                {
                    "website": result.website,
                    "reachable": result.reachable,
                    "score": result.score,
                    "service": result.service,
                    "issues": result.issues,
                    "recommendations": result.recommendations,
                },
                ensure_ascii=False,
                indent=2,
            )
        )
        return 0

    print("Unknown command", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
