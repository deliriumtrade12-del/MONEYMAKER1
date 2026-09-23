# MONEYMAKER1 / Aura Trinity

AI web operations platform for websites, maintenance, client acquisition, and subscriptions.

## What is automated

- Cloudflare Worker deployment on every push to `main`.
- CI validation for every pull request and push.
- A Cloudflare Cron trigger every 6 hours. The existing `scheduled` handler runs pending autonomous tasks, generates a thought, performs self-reflection, and evaluates goals.
- An optional GitHub Actions learning cycle that calls `/api/think` and `/api/reflect` once per day.

## Deploy

1. Create a D1 database and bind it as `DB` in the Worker. The Worker expects `env.DB`.
2. Enable the Workers AI binding named `AI` (it is declared in `wrangler.jsonc`).
3. Add these repository secrets for the deploy workflow:
   - `CLOUDFLARE_API_TOKEN` — token with Workers Edit and D1 Edit permissions.
   - `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account ID.
   - `AURA_HEALTHCHECK_URL` — optional deployed Worker URL for a post-deploy check.
4. Add runtime secrets when the related integrations are needed:

```bash
npx wrangler secret put GITHUB_TOKEN
npx wrangler secret put API_TOKEN
npx wrangler secret put ACCOUNT_ID
```

5. Run the `Deploy Aura Trinity` workflow, or deploy locally:

```bash
npm ci
npm run deploy
```

For the optional GitHub learning workflow, add `AURA_WORKER_URL` as a repository secret. The Cloudflare Cron trigger is the primary autonomous loop and does not require GitHub Actions.

## Safety

Learning is stored in D1 as thoughts, reflections, knowledge, skills, goals, and audit logs. Code and external integration actions are recorded or proposed by the Worker; review credentials and generated changes before enabling production integrations.
