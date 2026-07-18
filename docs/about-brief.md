# About / Governance / Registration Brief — Sahakarya Nepal

**For:** Claude Code (reads `/docs/` specs). Build on a `feat/about` branch, off `main`, after this brief is reviewed. Two build passes are not needed — this is a single page.

**Why this page matters most (after Projects):** this is the **due-diligence primary source**. A donor lands here from Home's Transparency section, from a partner referral, or from an audit request. Every claim on the site — women-led, 20 years, 15+ funders, `Reg. 363`, 8-of-9 executive — traces back to something on this page. If Projects is the spine, About is the spine's origin record.

**Inherits:** `docs/sahakarya-architecture.md`, `docs/sahakarya-design-system.md`, the component layer, and:

- `src/data/governance.json` — Executive Director, 9-member Executive Committee (8 female + 1 male), 3 Advisors, composition totals
- `src/data/org.json` — registration numbers, contact block, governance dates (audit + last GA)
- `src/data/impact.json` — headline `69,364 households (≈300,026 people)`
- `src/content/policies/*` — 19 policies with category + optional `lastRevised`
- No photos. Consent-to-publish is unresolved (`[NEEDS ORG]`).

---

## Non-negotiables (repeat)

1. **Never invent content.** Every value from the four sources above. Any missing field renders as an empty/handled state, flagged `[NEEDS ORG]` in an HTML comment — never fabricated.
2. **Design system:** Deep Blue leads, Hill Green = the work, Marigold accent-only (never text), one accent per viewport, no gradients/shadows, tabular figures on all data.
3. **No photos.** Not even the ED's headshot. Consent is a separate track. This page must look complete without any image.
4. **Structured data required.** This is the page that anchors organisational schema for search + AI.

---

## Route

`src/pages/about/index.astro` → `/about/` (trailingSlash `always`, matches convention).

The nav already links to `/about/`. Home's footer already links to `/about/`. Both currently 404 — this page closes that gap.

---

## Section order & spec

### 1. Header

Breadcrumbs: Home › About.
`SectionHeader` eyebrow `ABOUT`, title "Sahakarya Nepal".
Subhead: one line from the org profile — "A female-led development organization working with marginalized communities in Sindhuli since 2004." (Fact-only, no adjective inflation.)

### 2. Who we are

Two paragraphs max, sourced from `docs/sahakarya-brand-kit.md` §2 (already written in donor-facing voice):
- **Origin + focus** — established 2004; who they serve (Dalit, Janajati, Danuwar, Mushar, Majhi, women, children, youth); the seven work areas (livelihood, health, education, GESI, DRR, good governance, climate).
- **Scale line, sourced** — one honest sentence: "50 projects delivered in Sindhuli since 2004; **69,364 households (≈300,026 people)** directly reached." Numbers from `impact.json` verbatim.

No mission-statement fluff. Banned phrases (from Home): "empowering communities…", "brighter tomorrow", "reality is". If the section reads like a brochure, it's wrong.

### 3. Governance

The trust surface. From `governance.json`.

**Executive Director** — a compact record card (name + qualification + years experience + expertise line). Tabular figures for the year.

**Executive Committee** — the **8-of-9 female-led** panel. Render as a table (structured, scannable):

| Role | Name | Qualification |
|---|---|---|
| Chairperson | Ms. Siramala Tamang | Master in Sociology |
| Vice-Chairperson | Mr. Sanjib Sunuwar | M.Sc. in Agriculture |
| Secretary | Ms. Khem Kumari Karki | Master in Education |
| … | … | … |

Above the table, one factual summary line **verbatim from the brand kit** — do not paraphrase:

> **female-led — 8 of 9 executive committee members and the Executive Director are women.**

Follow with the sourced note from `governance.json.note`: "Chair, Secretary, and Treasurer are all women."

**Advisors** — a short bulleted list with focus area. Compact.

**General membership** — one line: "Total members: **51** (29 female, 22 male). 10 life members, 41 general members." From `composition`.

Every number rendered with `font-variant-numeric: tabular-nums`.

### 4. Registration & legal status

The receipt block. All values from `org.json.registration`.

Render as a `<dl>` table (bordered Stone panel, tabular figures), one row per registration ID. Do not concatenate into a `·`-joined line here — donors verify one number at a time.

| Registry | ID |
|---|---|
| District Administration Office, Sindhuli | 363 |
| Social Welfare Council (SWC) | 21014 |
| NGO Federation of Nepal | CR-SIN-68 |
| PAN | 301753065 |
| DUNS | 557778269 |
| NCAGE | SHNW8 |
| EuropeAid PADOR | NP-2022-AIY-1708192319 |

### 5. Governance dates

From `org.json.governanceDates`. Two lines, tabular figures:

- **Most recent audit:** 2024-10-16 (2082/06/30 BS)
- **Last General Assembly:** 2023-01-12 (2080/09/27 BS)

Nothing else here — just those two facts, prominently.

### 6. Policies & guidelines

The 19 policies from `src/content/policies/*`.

**Confirmed at brief time:** every one of the 19 policies has a `category` field in its frontmatter (schema: `financial | hr | safeguarding | governance | operational`). So we use what's there — we do not invent a taxonomy.

- Group policies by their frontmatter `category`. Section headings are the category labels in that order. Alphabetical by `name` within each group.
- If any policy has a `category` outside the schema enum (won't happen while the schema holds, but guard against future drift), render it under an "Other" group and log `[NEEDS ORG]` in an HTML comment.
- When `lastRevised` is set (currently on 9/19), render it in the provenance style beside the name. When absent, no fake date.
- Downloads: link the policy name to the PDF only when `file:` is set on that policy (currently 0/19). Otherwise text-only, no fake links.

### 7. Contact

From `org.json.contact`. Compact block:

- Address: Kamalamai Municipality–6, Rammadi, Sindhuli, Nepal
- Phone: +977-047-520863 · +977-047-521188
- Email: `sahakarya2061@gmail.com` (mailto). **`[NEEDS ORG]`** HTML comment: `emailNote` from `org.json` — an org-domain email reads better to donors; confirm before launch.
- Website: `sahakaryasindhuli.org.np`
- Facebook: link (in provenance style, not decorative)

### 8. Structured data

The AI-search + donor-verification anchor. Emit a `<script type="application/ld+json">` block, **scoped tight** — identity graphs that name third parties without documented consent are a safeguarding problem, not a technical decision.

Emit exactly:

- `@context: https://schema.org`
- `@type: NGO`
- `name`, `alternateName` (Sindhuli localism)
- `foundingDate: "2004"`
- `address` — `PostalAddress` from `org.json.contact.address`
- `email`, `telephone` (array from `org.json.contact.tel`)
- `url`, `sameAs: [facebook]`
- `identifier[]` — the 7 registration IDs (`{propertyID: "DUNS", value: "..."}` etc.) from `org.json.registration`

**Explicitly NOT emitted, and why** — log each as `[NEEDS ORG]` in an HTML comment beside the JSON-LD:

- `funder` (partner names) — publishing partner identities in structured data ties identity graphs without documented consent from the funders. Safeguarding decision belongs to the ED/board.
- `subOrganization` / `member` (Executive Committee `Person` entities) — putting identified individuals with `jobTitle` and `honorificPrefix` into schema.org knowledge graphs is a personal-data publication decision, not a build decision.
- `numberOfEmployees` — org composition figures likewise held pending explicit sign-off.

Reuse the JSON-LD approach already in `BaseHead.astro` for consistency of tag emission.

### 9. Closing CTA

Quiet. Match Projects' return CTA pattern — Deep Blue text link, not a button. One line each:

- "**Verify our record** → /projects/"
- "**Read our reports** → /reports/"

No marigold on this page. All CTAs live in the nav ("Partner with us") and the closing band on Home.

---

## SEO / meta

- `<title>`: "About Sahakarya Nepal — governance, registration & audit"
- Meta description: "Sahakarya Nepal is a female-led development NGO in Sindhuli, Nepal, established 2004. Registration numbers, executive committee, most recent audit, and policy list."
- Structured data as §8.

## Layout

Single column, max-width ~68ch for prose, wider (~80ch) for the tables so numbers don't wrap. Alternating White / Stone bands per design system §5 to separate the 8 sections.

## Accessibility / performance

- Zero client JS (no filter island on this page).
- All tables get `<caption>` or a preceding `<h3>` with `aria-labelledby`.
- Landmark regions: header, main, footer via `BaseLayout` (already correct).
- Tabular figures on every number (`font-variant-numeric: tabular-nums`).
- AA contrast throughout — no marigold text (already the rule).
- Reduced-motion: nothing to guard on this page.

## Data gaps to expect (log, don't invent)

Anticipated `[NEEDS ORG]` before build:

- **`emailNote`** — gmail vs org-domain email (already flagged in `org.json`).
- **Advisor detail** — `governance.json.advisors[].focus` is only ~1 line each; no bios. Render what exists; do not pad.
- **Policy `lastRevised`** — set on 9/19; render the year in provenance style beside those. The other 10 render name-only, no fake dates.
- **Policy PDFs** — currently no `file:` on any policy. Names render as plain text until PDFs land.
- **General Assembly cadence** — org.json shows only the last GA; if the constitution mandates an interval, we don't render it (unknown).
- **Trustee/founder names** — not in current data. Do not add.

## Build / verify / ship

1. `npx astro check` → 0 errors.
2. `npm run build` → confirm `/about/` renders as a new static route.
3. Screenshot `/about/` at 1280px + 375px against this brief.
4. Confirm all values come from the four data sources (grep the built HTML for any hardcoded fact you weren't sure about; if it's not in the data, it doesn't ship).
5. Commit, push to `feat/about`, open PR against `main`, confirm Vercel preview green, send preview URL.

## Report back

- All eight sections built & rendering.
- Every registration ID + governance date verifies against `org.json` byte-for-byte.
- Any policy with an unexpected `category` (rendered under "Other") — list it.
- Every `[NEEDS ORG]` hit.
- Structured-data JSON-LD linted / passes a schema.org validator.
- Preview URL.

## Guardrails

- No photos — even if `src/assets/photos/` fills up during this build, do not wire any image into this page. Consent is unresolved.
- No hero photo, no Stone-block placeholder for a "missing hero" — a data-only header is intentional and the design system supports it.
- Do not add fields to `governance.json` / `org.json` mid-build — if a fact is missing, flag it, don't invent it.
- Do not touch the Marigold rule. This page has no accent moment; the nav's Deep Blue CTA is the only trust color that leads.
