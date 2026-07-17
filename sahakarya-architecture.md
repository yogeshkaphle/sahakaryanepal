# Site Architecture — Sahakarya Nepal

**Status:** DRAFT v0.2 — awaiting sign-off. Once locked, this is the source of truth; changes get confirmed before edits.
**Built from:** full org profile (updated 12/07/2025) + annual reports (FY 2076-77, FY 2078-79) + brand kit v0.2. Nothing invented; gaps marked `[NEEDS ORG]`.
**v0.2 change:** profile read in full — all 50 projects, governance roster, 19 policies, recent (2025-26) activity, staff, financials now sourced. Prior "stale record" concern retracted (an ongoing project runs to June 2026). Added Policies surface (§4.5). Corrected chairperson to Ms. Siramala Tamang.
**Stack confirmed against current docs:** Astro 5 native i18n routing + Content Layer API (`glob()` loader, Zod schemas). Both verified 2026-07-17.

---

## 1. The organizing principle

The site is a **due-diligence instrument**, not a brochure. One rule drives the whole IA:

> **Every impact number traces to a project. Every project traces to a funder, a place, and a date.**

That traceability *is* the architecture. A donor must be able to click from "300,000 people reached" down to a single named project with its budget, wards, donor, and dated achievements — and back up to the funder who paid for it. If a claim can't be traced, it doesn't go on the site.

---

## 2. Page map + URL structure

English is the default locale at root (`/`). Nepali lives under `/ne/` (see §6). URLs below show English.

```
/                            Home
/about                       Who we are — mission, vision, values, 20-yr record
/about/governance            Executive committee, ED, female leadership, org structure
/about/registration          Legal: Reg 363, SWC 21014, PAN, DUNS, EuropeAid PADOR, affiliations
/our-work                    Programs overview — the 7 sectors
/our-work/[sector]           One page per thematic area (dynamic, 7 entries)
/projects                    Project index — filterable (sector · donor · municipality · year · status)
/projects/[slug]             Individual project (the verifiable unit)
/impact                      The record — aggregate numbers, where we work, stories
/impact/stories/[slug]       Named beneficiary stories (dynamic; small collection)
/partners                    Donors & partners — trust proof + reference letters
/reports                     Reports & transparency — annual reports, audited financials
/reports/policies            The 19 governance policies (safeguarding, anti-corruption, GESI, etc.)
/contact                     Contact + location
/partner-with-us             Donor/partner CTA — how to fund or collaborate
```

**Utility / system pages:** `/404`, `/sitemap.xml` (auto), `/robots.txt`, `/privacy` (if forms collect data).

**Deliberately NOT built (see §8):** `/news`, `/blog`.

---

## 3. Primary navigation

Six items, credibility-first ordering. A persistent CTA button sits outside the nav.

| Nav item | Points to | Job |
|---|---|---|
| About | `/about` (▾ Governance, Registration) | Establish the institution |
| Our Work | `/our-work` (▾ Projects) | What we do + the itemized record |
| Impact | `/impact` | The aggregate proof |
| Reports | `/reports` | Transparency — audited, dated |
| Partners | `/partners` | Third-party trust |
| Contact | `/contact` | Reach us |
| **[Partner with us]** *(button)* | `/partner-with-us` | The one donor action |

- **One dropdown max per parent, two children max.** "Our Work" holds Programs (self) + Projects. "About" holds Governance + Registration. Mobile: these expand inline, no hover.
- **Footer** carries the full map + registration numbers + a compact donor-logo strip + Reports link. The footer is a due-diligence surface, not decoration.

---

## 4. Content types (Astro content collections)

Dynamic, type-safe collections via the Content Layer API. Frontmatter is the schema; the build fails on a bad field, which is the point for a data-integrity site.

### 4.1 `projects` — the spine
Powers `/projects` (index + filters) and `/projects/[slug]`.
```
title, slug, status(active|completed), sector[] , donor[],
municipality[], wards, startDate, endDate, budgetNPR,
summary, objectives[], achievements[], sdgs[], heroImage, gallery[]
```
**All 50 sourced** from the profile's project table (name · sector · duration AD · location · expenditure NPR · funder), spanning 2005–2026. Newest is **ongoing to June 2026** (Land Degradation / Agro-Ecology, UNDP/Australian AID/GEF/SGP). `status` derives from the "Ongoing" flag + end dates.
**Weighting note (for design step):** the 50 range from NPR 60k skill-trainings (2008) to NPR 104M emergency-education (2016). Don't render 50 equal cards — the index needs a featured/flagship tier vs. an archive/table tier, or the crown jewels drown. Decide in design system.

### 4.2 `sectors` — the 7 programs
Powers `/our-work` and `/our-work/[sector]`.
```
title, slug, description, icon, heroImage
→ related projects queried live (no manual linking)
```
Sectors: Livelihood & Entrepreneurship · Health, Nutrition & WASH · Education · GESI · Disaster Risk Reduction · Good Governance & Social Accountability · Climate Change.
**Taxonomy caution:** the profile ALSO has a 7-bucket "Areas of Experience" spend table with *different labels* (e.g. "Peace Building & Conflict Management", "Emergency support, Nature Conservation, Relief…"). That is a financial breakdown for the **Impact** page, NOT the program taxonomy. Keep them separate; do not merge into one list.

### 4.3 `partners` — donors
Powers `/partners`; each links to the projects it funded.
```
name, logo, type(multilateral|bilateral|INGO|govt|other),
relationship, projectsFunded(query), referenceLetter?(from Annex 12)
```
Named (derived from the 50-project funder column): UNDP, Australian AID/GEF/SGP, EU, USAID (via CDM Smith & IFES), Embassy of Japan, CARE Nepal, FCA/MoFA Finland, Women's Bank, Swiss SDC, ADB (CMIASP), Concern Worldwide, Welthungerhilfe, Terre des Hommes Germany, UNICEF, Heifer Project Nepal, Restless Development, plus GoN ministries & Sindhuli local governments. **Logos + reference letters live in Annex 12 (PDF) — `[NEEDS ORG]` to extract as assets.**

### 4.4 `stories` — real people
Powers `/impact/stories/[slug]`. If only 3–4 exist, render as a section of `/impact`, not a collection.
```
person, place, sector, project(ref), quote, photo, body, date
```
Known: Khinchalal Pahari (vegetable farming, Hariharpurgadhi); Chandra Kumari Shrestha; Rinu Maya Gole (tailoring); Sharmila Shrestha. **Recent stories `[NEEDS ORG]`.**

### 4.5 `reports` — publications & financials
Powers `/reports`.
```
title, yearBS, yearAD, type(annual-report|audited-financials|financial-summary),
language, file(PDF), summary
```
Have: annual reports FY 2076-77, FY 2078-79; 3-year financial summary (FY 2079/80–2081/82) from the profile; recent audit dated 2082/06/30 (2024/10/16). **Audited financial PDFs themselves + intervening annual reports `[NEEDS ORG]`.**

### 4.5b `policies` — governance & safeguarding  *(NEW in v0.2)*
Powers `/reports/policies`. Prime due-diligence content — donors check for exactly these.
```
name, yearBS, lastRevised, category(financial|hr|safeguarding|governance|operational), file?(PDF)
```
Sourced: 19 policies incl. Child Protection (2073, rev. 2076), Safeguarding (2076), Anti-Sexual Harassment (2076), Anti-corruption (2074), GESI (2068, rev. 2076), Complaints Handling (2073, rev. 2076), Procurement, Admin & Financial, HR, M&E, Emergency Preparedness & Response, **Strategic Plan 2023-2027**. **Policy PDFs `[NEEDS ORG]`** — the profile lists titles + dates, not the documents.

### 4.6 `notices` — OPTIONAL, only if maintained
Vacancies / tenders / procurement. Nepali NGOs commonly need this. **Build only if org will keep it current** — else omit. `[NEEDS ORG decision]`

**Static pages** (no collection): Home, About, Governance, Registration, Contact, Partner-with-us.

---

## 5. Internal linking

The link graph enforces traceability. Minimum required links:

- **Home →** Projects, Impact, Reports, Partners (the four credibility anchors) + one featured project + the numbers.
- **Project detail →** its Sector(s), its Donor(s), its Municipality (Where We Work), 2–3 related projects (same sector or donor), source Report if cited.
- **Sector page →** all its Projects (live query), relevant Impact stats, any Stories in that sector.
- **Partner page →** every project that partner funded (proves the relationship is real, not a logo wall) + reference letter.
- **Story →** the Project it came from → that project's Donor.
- **Reports & Policies →** linked from About, Governance, Partners, Home footer (audited financials + safeguarding/anti-corruption policies are due-diligence gold; surface them, don't bury).
- **Governance →** links to Policies (the committee governs by them) and to Registration.
- **Breadcrumbs** on every deep page (Home › Our Work › Projects › [Project]) — orient the scrutinizing reader and feed SEO.

---

## 6. Language / bilingual plan

**Recommendation: English-complete + Nepali-partial. NOT a full mirror.** [Likely]

Reasoning: the #1 audience (donor due-diligence) reads English, so English must be 100% complete. A full parallel Nepali site doubles build and maintenance for a small NGO — and out-of-sync bilingual content reads *worse* to a scrutinizing donor than clean monolingual. But community + government (real audiences, and "social accountability" is literally a sector) are served in Nepali on the pages that matter to them.

| Page | English | Nepali (`/ne/`) |
|---|---|---|
| Home | ✅ | ✅ |
| About (+ Governance, Registration) | ✅ | ✅ |
| Our Work + sector pages | ✅ | ✅ |
| Impact | ✅ | ✅ |
| Reports / Transparency | ✅ | ✅ (notices/docs are local-facing) |
| Contact / Partner-with-us | ✅ | ✅ |
| Project detail pages | ✅ | ➖ English (donor-read) |
| Partners page | ✅ | ➖ English (donor-read) |
| Stories | ✅ | ✅ where a Nepali original exists |

**Mechanics** (verified against Astro 5):
- `astro.config` i18n: `locales: ['en','ne']`, `defaultLocale: 'en'`, default hidden from URL (English at root, Nepali at `/ne/…`).
- Language toggle top-right: switches to the current page's Nepali equivalent if it exists; if not (e.g. a project detail), it stays on the English page — no dead ends, no fake half-translations.
- `hreflang` tags on paired pages for SEO.
- **Devanagari is first-class**: Noto Sans Devanagari (locked in brand kit), matched weights, never a system-font fallback.

**This is the one decision I need you to confirm before the map locks.**

---

## 7. SEO structure

- **Own the brand terms.** Home + About must rank #1 for "Sahakarya Nepal", "Sahakarya Nepal Sindhuli", "Sahakarya Nepal annual report/registration" — the exact queries a donor runs to verify existence.
- **Long-tail via projects.** Each project page targets "[project/donor] Sindhuli" — the verification searches.
- **JSON-LD `NGO`/`Organization` schema** on Home + About: legal name, foundingDate 2004-10-10, registration IDs as `identifier` (DAO 363, SWC 21014, PAN 301753065, DUNS 557778269, EuropeAid NP-2022-AIY-1708192319), address (Kamalamai-6, Rammadi, Sindhuli), `areaServed` Sindhuli, `funder` list, `sameAs` Facebook, logo. Machine-readable credibility for search + AI.
- **Breadcrumb + per-project structured data.**
- Astro `@astrojs/sitemap` (auto XML), `robots.txt`, human-readable slugs from real project names, `hreflang` on bilingual pairs.
- **Performance = SEO here:** static output, responsive images (Astro 5.10), compressed assets. Nepal is mobile-majority on 3G; Core Web Vitals are a ranking and an access issue at once.

---

## 8. Decisions locked / rejected

**Rejected — `/news` or `/blog`.** No news content exists in the source, and an NGO news feed last updated years ago *actively damages* donor credibility — worse than absent. If the org needs to post vacancies/tenders, that's the `notices` utility (§4.6), only if maintained. Revisit only when there's a real, sustainable publishing cadence.

**Rejected — full bilingual mirror.** See §6. English-complete, Nepali-partial.

**Locked — Projects as the spine, not About.** The itemized, funded, dated project record is the strongest due-diligence asset. About establishes the institution; Projects proves it.

---

## 9. Gaps — `[NEEDS ORG]` before build

**Resolved in v0.2** (were open in v0.1): recent activity ✅ (ongoing to 2026), all 50 projects ✅, ED name ✅ (Rashmi Subedi), exec committee roster ✅, staff list ✅, governance policies ✅ (19), 3-year financials ✅, contact email ✅ (now gmail, not yahoo).

**Still open — `[NEEDS ORG]`**, ordered by impact:

1. **Existing site / redirects.** Profile lists `www.sahakaryasindhuli.org.np` as the live website. Is a site live there now? If so, its URLs need a 301 map to the new structure, or backlink equity and bookmarks break. Also confirm: does the new Astro build deploy to *that* domain? **Blocking for launch, not for architecture.**
2. **Asset extraction — not new facts, but files:**
   - **Donor logos + reference letters** — in Annex 12 (PDF). Needed for `/partners`.
   - **Real photography** — brand kit flags it; the whole design depends on it.
   - **PDFs** of audited financials + policy documents (profile lists titles/dates, not the files).
3. **Recent beneficiary stories.** The 4 named stories are from 2076-77. `stories` needs 2–4 current ones with photo consent, or it renders as a thin section.
4. **Org-domain email.** Current is `sahakarya2061@gmail.com`, but they own the domain — `info@sahakaryasindhuli.org.np` reads far better to a donor. Recommend before launch.
5. **Notices decision (§4.6).** Maintain a vacancies/tenders feed? Yes → build. No → omit cleanly.
6. **Language confirmation (§6).** Still the one blocking decision for the lock.
