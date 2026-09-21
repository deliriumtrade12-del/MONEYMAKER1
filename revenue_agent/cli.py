from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from .lead_scoring import audit_website, build_queue, load_leads_csv, write_queue


def main() -> int:
    parser = argparse.ArgumentParser(description="MONEYMAKER1 approval-first revenue agent")
    subparsers = parser.add_subparsers(dest="command", required=True)

    generate_parser = subparsers.add_parser("generate", help="Build a lead outreach queue from a CSV file")
    generate_parser.add_argument("--input", required=True, help="Path to input CSV")
    generate_parser.add_argument("--output", required=True, help="Path to output JSON queue")

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
        print(json.dumps({
            "website": result.website,
            "reachable": result.reachable,
            "score": result.score,
            "service": result.service,
            "issues": result.issues,
            "recommendations": result.recommendations,
        }, ensure_ascii=False, indent=2))
        return 0

    print("Unknown command", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
