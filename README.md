# MONEYMAKER1

AI web operations platform for websites, maintenance, client acquisition, and subscriptions.

## Full revenue agent

This repository now contains a complete, approval-first revenue assistant designed to help generate business opportunities ethically and legally.

It is built for a practical workflow:

- import authorized leads
- score prospects by need, quality, and fit
- audit the company website for weak signals
- recommend the best service offer
- generate a human-review outreach draft
- save an approval queue before any message is sent

### Safety rules

This project intentionally does not:

- scrape personal data without permission
- impersonate people or businesses
- auto-send messages without approval
- accept payments or contracts automatically
- operate in a way that violates platform terms

The app is designed in dry-run mode by default. All actions are reviewable. Human validation is mandatory before outreach or invoicing.

## Quick start

```bash
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
python -m revenue_agent --help
python -m revenue_agent generate --input examples/leads.csv --output data/outreach_queue.json
python -m revenue_agent audit --url https://example.com
```

To run the API server:

```bash
uvicorn revenue_agent.app:app --reload
```

## Workflow

1. Import leads from an approved source or a CSV export.
2. Score leads based on business need, website quality, and offer fit.
3. Audit the website to confirm a measurable opportunity.
4. Recommend a service such as landing page, website redesign, maintenance, or workflow automation.
5. Generate a draft message and a proposal with pricing guidance.
6. Require human approval before sending messages or starting work.

## Project structure

- `revenue_agent/models.py` — data models
- `revenue_agent/lead_scoring.py` — scoring and offer generation
- `revenue_agent/website_audit.py` — remote website checks
- `revenue_agent/queue.py` — import/export workflows
- `revenue_agent/cli.py` — command-line runner
- `revenue_agent/app.py` — FastAPI API
- `examples/leads.csv` — sample lead set

## License

This project is for educational and operational experimentation. You are responsible for compliance with local laws, platform terms, privacy rules, and customer consent requirements.
