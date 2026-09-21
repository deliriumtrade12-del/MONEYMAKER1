"""CLI for importing authorized leads and creating an approval queue."""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path

from .core import Lead, create_draft


def main() -> None:
    parser = argparse.ArgumentParser(description="Create human-review outreach drafts")
    parser.add_argument("--input", required=True, help="CSV exported from an authorized source")
    parser.add_argument("--output", required=True, help="JSON approval queue")
    args = parser.parse_args()

    drafts = []
    with Path(args.input).open(newline="", encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            drafts.append(create_draft(Lead(**{key: row.get(key, "") for key in Lead.__dataclass_fields__})))

    drafts.sort(key=lambda draft: draft.score, reverse=True)
    destination = Path(args.output)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps([draft.__dict__ for draft in drafts], indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Created {len(drafts)} drafts in {destination}. No messages were sent.")


if __name__ == "__main__":
    main()
