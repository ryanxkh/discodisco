# discodisco — Spec v1 (locked 2026-04-30)

A real, useful web app that helps Vercel AEs and SE/SAs walk into discovery
calls with sharper questions, better Vercel-product anchoring, and a relevant
case study to drop — grounded in real Vercel ICP, product, and customer research.

Public, MIT-licensed, deployed on Vercel infrastructure, evaluated continuously
with Braintrust.

---

## Users & moment-of-use

- **AE** prepping morning-of a disco call → fast, low cognitive load, copy-paste-friendly.
- **SE/SA** prepping 2-4 hours before a technical deep-dive → depth, product-mapped, exportable.
- **GTM coach mode** → deferred to v2.

## Input

Free-text paste. User dumps meeting notes / LinkedIn bio / SDR-handoff email /
company URL. Model handles parsing.

## Output sections

| Section | AE | SE/SA |
|---|---|---|
| Prospect snapshot | 1-line buyer type + top 3 signals | + buyer committee, deal-stage read, ICP fit confidence |
| Discovery questions (MEDDPICC + SPICED dual-tagged) | 5 ranked, each tagged to a Vercel product/value | 7-9, each with: product map, what a good answer sounds like, follow-up, the WHY (coaching note) |
| Vercel product map | Top 1-2 anchor products | Full architecture sketch: current state → proposed Vercel architecture |
| Case study to drop | Single best-matched (1 line + URL) | Top 3 with rationale |
| Objection prep | 1 likely pushback + response | 3 likely pushbacks (technical / pricing / political) sourced from research |
| Competitive read | — | Likely competitor + 2-3 differentiators |

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Server Components) |
| LLM client | Vercel AI SDK |
| Routing/cache | Vercel AI Gateway (default model: `claude-sonnet-4-6`) |
| Vector DB | Neon Postgres + pgvector (via Vercel Marketplace) |
| Knowledge spine | `data/knowledge-spine.json` in repo (version-controlled) |
| Cache | Neon (cached responses); Upstash for rate-limit deferred |
| Observability + evals | Braintrust (project: `discodisco`) |
| Auth | None — public, rate-limited |
| Hosting | Vercel; `discodisco.vercel.app` for v1 |
| License | MIT |

## Knowledge architecture (hybrid)

1. **Spine** — `data/knowledge-spine.json`, ~8-10 hand-curated cards: Vercel
   products, ICP segments, top case studies, common objections. Always passed in
   context.
2. **RAG long tail** — SA-ready research files chunked, embedded, stored in Neon
   pgvector. Top-K retrieved per request based on input + the section being
   generated.
3. **Section-scoped retrieval** — every chunk tagged with applicable sections
   (`objections`, `competitive`, `case-study`, `product-map`, etc.). Generation
   step retrieves only chunks tagged to the section being rendered.
   `vercel-honest-criticisms` chunks are tagged `objections` ONLY — never leak
   into snapshot or product map.

## RAG corpus (ingestion list)

Source: `~/Projects/vercel/interview-prep/research/`

**IN:**
- 8 SA-ready product breakdowns (`2026-02-21-*-sa-breakdown.md`,
  `2026-02-21-self-driving-infrastructure.md`,
  `2026-02-21-pages-to-agents-pixels-to-tokens.md`,
  `2026-02-21-vercel-pricing-sa-playbook.md`,
  `2026-02-21-v0-sa-value-prop.md`)
- Platform deep-dives (`2026-03-13-deployments-builds-rollback-deep-dive.md`,
  `2026-03-13-vercel-functions-complete-technical-reference.md`,
  `2026-03-13-vercel-caching-isr-deep-dive.md`,
  `2026-03-13-ai-products-deep-dive.md`,
  `2026-03-13-vercel-security-compliance-enterprise-deep-dive.md`,
  `2026-03-13-vercel-limits-pricing-deep-dive.md`,
  `2026-03-13-nextjs-on-vercel-vs-self-hosted.md`,
  `2026-03-13-cdn-request-collapsing.md`,
  `2026-03-13-ai-sdk-6-release.md`)
- Competitive analyses
  (`2026-03-12-vercel-vs-amplify-competitive-analysis.md`,
   `2026-03-12-vercel-vs-netlify-competitive-analysis.md`,
   `2026-03-12-vercel-vs-cloudflare-competitive-analysis.md`)
- Customer case studies
  (`2026-03-12-vercel-customer-case-studies.md`,
   `2026-03-13-gamma-vercel-case-study.md`,
   `2026-03-13-grep-cra-to-nextjs-migration.md`,
   `2026-03-13-stably-vercel-case-study.md`,
   `2026-03-13-cruise-critic-vercel-case-study.md`)
- Honest criticisms
  (`2026-03-12-vercel-honest-criticisms-panel-prep.md`)
  → tagged `objections` only

**OUT:**
- All `transcripts/`
- All `*-podcast-insights.md`
- `2026-03-06-david-totten-profile.md`
- All `talking-points/` and `mock-interviews/`
- `panel-take-home-prompt.md`
- Any compensation, candidate-specific, or interview-prep-only content

## Pipeline (per request)

```
paste + mode
   ↓
parseProspect            → extract company / industry / role / stage / signals / known pain
   ↓
sectionPlanner           → which sections to generate, priority order
   ↓
   for each section:
   ├── retrieveContext   (spine cards + section-tagged chunks via pgvector)
   └── generateSection   (AI SDK → AI Gateway → Claude)
   ↓
assembleResult           → render JSON for the page
```

Each step `wrapTraced` for Braintrust; AI SDK calls auto-instrumented.

## Repo / project setup

- Local: `~/Projects/vercel/discodisco/`
- GitHub: `github.com/ryanxkh/discodisco` (public, MIT)
- Branching: `main` → prod auto-deploy; preview deploys per branch
- Vercel project: linked, env vars provisioned via `vercel env`
- Braintrust project: `discodisco` (separate from earlier `testing` demo)

## Session 1 — SLC plan

**Goal:** by end of session, `discodisco.vercel.app` is live, takes a paste,
returns a real result, has a Braintrust eval baseline. Useful enough to share
the link.

**Sequence (~3.5 hr focused):**

1. **Foundation (~45 min)** — scaffold Next.js 16, init repo, push to GitHub,
   Vercel CLI link, provision Neon via Marketplace, configure AI Gateway, env vars.
2. **Brain (~60 min)** — hand-distill 8-10 spine cards, curate corpus, chunk +
   section-tag, embed into Neon pgvector, build the pipeline.
3. **UI (~60 min)** — single page: paste box, AE/SE toggle, run, render all
   output sections; intentional minimal branding (discodisco wordmark, clean
   typography), loading + error states.
4. **Instrument + eval (~30 min)** — Braintrust `initLogger({ projectName:
   "discodisco" })`, AI SDK auto-instrumented, eval suite with 3-5 prospect
   test cases + 4 scorers (MEDDPICC coverage, SPICED coverage, specificity,
   product-grounding-faithfulness), run baseline experiment.
5. **Ship (~15 min)** — deploy, verify end-to-end, basic Postgres-backed
   rate-limit (10 runs / IP / day), share link.

**Bail points:** drop step 4 (still SLC, no measurement yet — pick up next
session), or simplify section-scoped retrieval to flat RAG.

## Deferred to v2+

- GTM-coach mode (the teaching layer)
- Auth (Clerk via Marketplace)
- Saved sessions / history
- Multi-model toggle / "compare models" view
- Vercel-native methodology overlay
- Slack / Chrome extension surfaces
- CRM integrations (Salesforce, Gong, HubSpot)
- Custom domain
- Edge Config knowledge spine
- Upstash for rate-limit (replaces Postgres-backed v1 implementation)
