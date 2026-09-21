# MONEYMAKER1

Approval-first AI revenue assistant for selling web services.

## What it does

- imports authorized leads from CSV
- scores lead fit and recommends a service
- audits a public website with a basic, non-invasive HTTP check
- creates a personalized offer draft and price range
- stores drafts in a review queue
- exposes a FastAPI API and CLI
- includes simple CRM, dashboard, retainer, and approval helpers

## What it does not do

The agent does not scrape LinkedIn, impersonate people, send unsolicited messages, accept contracts, or take payments autonomously. Use official APIs and respect platform rules, privacy law, consent, and opt-out requests. Every outreach action requires human approval.

## Run

```bash
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
python -m revenue_agent generate --input examples/leads.csv --output data/outreach_queue.json
python -m revenue_agent audit --url https://example.com
uvicorn revenue_agent.app:app --reload
```

API documentation is available at `http://127.0.0.1:8000/docs`.

## Environment

Copy `.env.example` to `.env`. Keep `AGENT_DRY_RUN=true` until you have reviewed every integration and compliance requirement. Never commit credentials.

## Services

- landing pages
- website redesign
- website maintenance
- workflow automation
- monthly maintenance retainers

Revenue is not guaranteed; the system assists with prospecting and sales preparation. The operator is responsible for truthful claims, lawful processing, delivery, contracts, invoicing, and taxes.
