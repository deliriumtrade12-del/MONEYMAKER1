# MONEYMAKER1

AI web-operations platform for websites, maintenance, client acquisition, and subscriptions.

## Revenue agent MVP

This branch contains a safe, approval-first lead-generation agent for selling web services:

- web design and landing pages
- website creation and maintenance
- lightweight business workflow systems

The agent **does not scrape LinkedIn, impersonate a person, send unsolicited messages, accept contracts, or take payments autonomously**. LinkedIn and other platforms must be connected through their official APIs or used manually in accordance with their terms. The agent prepares a ranked prospect list and personalized drafts; a human approves every outreach action.

### Run locally

```bash
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
python -m revenue_agent.cli --input examples/leads.csv --output data/outreach_queue.json
```

Review `data/outreach_queue.json` before sending anything. Set `AGENT_DRY_RUN=true` unless you have implemented and verified an official messaging integration.

### Workflow

1. Import leads from an authorized source (CSV export or official API).
2. Score prospects using transparent signals such as missing website, broken mobile layout, or outdated content.
3. Generate a truthful, personalized offer for a service the business can actually deliver.
4. Save drafts to an approval queue.
5. A human reviews consent, accuracy, pricing, and platform policy before sending.
6. After a signed agreement and successful payment setup, deliver the work and manage recurring maintenance with explicit customer consent.

This is an earning assistant, not a guaranteed money-making machine. Revenue depends on the quality of the offer, legal compliance, customer demand, delivery, and payment terms.
