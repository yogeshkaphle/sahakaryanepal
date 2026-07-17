# Design System — Sahakarya Nepal

**Status:** DRAFT v0.1 — awaiting sign-off. Once locked, every page and every Codex prompt inherits this. Deviations get flagged with a reason.
**Inherits from:** brand kit v0.2 (palette + type locked there) and architecture v0.2.
**Depends on decisions:** language = English-complete + Nepali-partial (locked).

---

## 1. Thesis

The site is a **due-diligence instrument**. Its credibility must be visible, not asserted. So the design makes the organization's one real differentiator — a traceable 20-year record — into the visual identity. Distinctiveness comes from **structure and a signature treatment**, not from a novelty typeface (the brand kit locks Noto Sans for both scripts, for Devanagari–Latin harmony). Everything is quiet and institutional except one marigold moment per view.

**The one aesthetic risk (justified):** lead with *receipts, not emotion*. NGO sites default to emotive photography; this one leads with specific, sourced facts because the audience is a donor who trusts specifics over sentiment, and the record is the actual differentiator.

---

## 2. Signature element — the provenance line

The thing the site is remembered by. A compact, tabular-figure metadata line that carries the source of any claim:

```
UNDP · Phikkal Rural Municipality · 2022–23 · NPR 29.9M
```

- Set in **tabular lining figures**, Slate `#55606E`, ~0.85rem, `·` separators (thin space each side).
- Appears under: hero anchor stats, every project card, project detail header, impact numbers, story attributions.
- It is never decorative. If a datum isn't verifiable, the line doesn't render it.
- This is the through-line that ties Impact → Projects → Partners together visually, mirroring the architecture's "every number traces to a project."

Do not add other structural gimmicks (no `01/02/03` numbering unless content is a real sequence). Spend the boldness here and nowhere else.

---

## 3. Color application

Palette is locked in the brand kit. Rules for *use*:

| Token | Hex | Role | Text-safe on white? |
|---|---|---|---|
| Deep Blue | `#16386E` | Primary. Headers, links, structure. **Leads every view.** | ✅ ~9.3:1 |
| Hill Green | `#2F6B45` | The work. Program/project context, sector tags. | ✅ ~6.5:1 |
| Marigold | `#E4832A` | **Accent only** — bars, underlines, icons, fills. **Never text.** | ❌ ~2.5:1 |
| Deep Marigold | `#B85F17` | CTA fills (with white text), marigold text when needed. | ✅ ~4.9:1 |
| Ink | `#1D2430` | Body text, headings. | ✅ ~15:1 |
| Slate | `#55606E` | Secondary text, captions, provenance line. | ✅ ~5.8:1 |
| Stone | `#F5F3EE` | Section-band backgrounds. | — |
| White | `#FFFFFF` | Base background. | — |

**Hard rules:**
- **One accent per view.** Blue leads; exactly one marigold moment (the primary CTA, or a single highlighted figure). If two things are marigold, one is wrong.
- **Marigold never carries text and never sits under white text.** Buttons = Deep Marigold fill. Marigold `#E4832A` is for non-text accents only.
- Hill Green is the "work" color — sector tags, program headers, project accents — so blue stays for site structure and green signals *the doing*.
- No gradients anywhere. Flat fills only.

---

## 4. Typography

**Faces (locked):** Noto Sans (Latin) + Noto Sans Devanagari. Self-hosted, subset. No third face. Personality comes from *scale and weight contrast*, not novelty.

**Scale** (rem, 1rem = 16px; fluid clamp between mobile→desktop):

| Role | Size | Weight | Notes |
|---|---|---|---|
| Display (hero H1) | 2.5 → 3.5 | 700 | tight tracking (−0.01em), short measure |
| H2 (section) | 1.75 → 2.25 | 700 | |
| H3 (card/sub) | 1.25 → 1.5 | 600 | |
| Body | 1.0 → 1.0625 | 400 | line-height 1.6, measure ≤ 68ch |
| Body-strong | 1.0 | 500 | |
| Eyebrow/label | 0.8125 | 600 | uppercase, letter-spacing 0.08em, Hill Green or Slate |
| Provenance / data | 0.85 | 500 | **tabular figures**, Slate |
| Big-figure (stats) | 2.75 → 4.0 | 700 | tabular figures, Deep Blue |

**Devanagari rules:** identical scale, **line-height +0.15** over Latin (Devanagari needs vertical room), weights matched to nearest available. Never fall back to a system font — if Noto Sans Devanagari fails to load, that's a build error, not a silent swap. Mixed-script lines (a Nepali place name in an English sentence) must not jump baselines — set a shared `font-size` and let both faces share the line box.

---

## 5. Layout & rhythm

- **Grid:** 12-col, max content width ~1200px, 24px gutters desktop / 16px mobile. Text blocks cap at ~68ch regardless of column.
- **Vertical rhythm:** section padding 4rem mobile → 6rem desktop. One consistent scale (multiples of 0.5rem). Generous whitespace = institutional calm.
- **Section bands:** alternate White and Stone `#F5F3EE` to separate zones. No borders/hairlines as the separation device (that's a generic-broadsheet tell); use the Stone band + spacing.
- **Alignment:** left-aligned throughout. No centered body text. Centered layouts read as brochure.

---

## 6. Hero pattern (photo-optional)

Two columns desktop, stacked mobile. **No gradient. No stock photo.** Blue leads, one marigold moment (the CTA).

```
┌────────────────────────────────────────────────────────────┐
│  EYEBROW (Hill Green, uppercase)                             │
│                                                              │
│  Factual headline set as a verifiable claim,        ┌──────┐│
│  not a slogan. Two lines max.                       │ 20   ││
│                                                     │ yrs  ││
│  One-line factual subhead in Slate.                 │ prov ││
│                                                     ├──────┤│
│  [ Partner with us ]  ← Deep Marigold, white text   │ 50   ││
│   (the single marigold moment)                      │ proj ││
│                                                     │ prov ││
│                                                     ├──────┤│
│                                                     │ 300k ││
│                                                     │ prov ││
│                                                     └──────┘│
│                                          the "record panel" │
└────────────────────────────────────────────────────────────┘
```

- **Right = record panel:** the four anchor figures (20 years · 50 projects · ~300,000 people · female-led) in big tabular figures, each with a provenance micro-line. This is the hero's proof.
- **Headline copy:** a specific truth, active voice, no hype. Not "Empowering communities…". Content-owned; the design just holds it.
- **Photo variant:** when a real hero photo exists, it replaces the record panel's *background* as a bounded, captioned image (caption = place · year, in the provenance style), and the four figures move to a band directly below the hero. Photo is never full-bleed mood; it's evidence, captioned.
- **No-photo state is the default and must look finished** — the record panel carries the hero on its own.

---

## 7. Components

Each is defined once here and reused. Codex builds these as Astro components.

**Button** — Primary: Deep Marigold `#B85F17` fill, white text, 0.75rem radius, no shadow. Secondary: Deep Blue outline + Deep Blue text, transparent fill. Label says what happens ("Partner with us", "Read the report"), never "Submit"/"Learn more". Visible focus ring (Deep Blue, 2px offset).

**Provenance line** — §2. The atom.

**Anchor stat** — big-figure (Deep Blue, tabular) + label (Slate) + provenance line. Used in hero, Impact, program pages.

**Project card** — Hill Green sector tag (top) · title (H3) · one-line summary · provenance line (donor · place · years · budget) · status pill (green "Completed" / marigold-accent "Ongoing"). **Featured variant:** wider, larger title, optional image. **Archive variant:** compact row (title + provenance) for the long tail — the 50 don't render as 50 equal cards (see architecture §4.1).

**Project filters** — sector · donor · municipality · year · status. Chips/selects, Deep Blue active state. Minimal JS (Astro island only here). Filter labels are plain nouns.

**Partner card / logo strip** — grayscale logos on Stone, color on hover; card = name + type + "projects funded: N" linking to filtered projects.

**Report / policy row** — title · year (BS + AD) · type tag · download affordance ("PDF, 2.1MB"). Tabular, scannable. Policies grouped by category.

**Nav** — 6 items (About · Our Work · Impact · Reports · Partners · Contact) + Deep Marigold CTA + language toggle (EN/ने, top-right). Sticky, White, thin Stone bottom edge on scroll. Mobile: full-screen sheet, items expand inline (no hover dropdowns).

**Footer** — the due-diligence surface. Registration numbers block (Reg 363 · SWC 21014 · PAN · etc.) in tabular figures · full sitemap · donor logo strip · Reports link · contact. Deep Blue background, white/Stone text.

**Breadcrumbs** — Home › Our Work › Projects › [Project]. Slate, on deep pages. Orients the scrutinizing reader; feeds SEO.

**Story card** — photo (or Stone fallback) · pull-quote · person + place + linked project (provenance style). Only real, consented stories.

**Section header** — eyebrow (Hill Green) + H2. That's the whole device. No extra rules.

---

## 8. Photography treatment

- **When present:** real photos of real work in Sindhuli. Consistent aspect ratios (16:9 hero, 4:3 cards). Every photo gets a caption in provenance style (place · year). Compressed, responsive (`srcset`), lazy-loaded below fold, AVIF/WebP with fallback.
- **When absent (launch reality):** never a stock image, never an illustration of smiling children, never a placeholder gradient. Use a Stone block, the record panel, or a data treatment. The site must look complete with zero photos.
- No image carries meaning that isn't also in text (alt text is factual: what/where/when).

---

## 9. Motion

Minimal and deliberate — extra animation reads as AI-generated.
- One page-load: hero figures count-up **once**, fast (≤600ms), `prefers-reduced-motion` disables it to static numbers.
- Hover: buttons/cards shift background or border only (no scale/lift bounce).
- Scroll reveals: none, or a single quiet fade on section entry, reduced-motion-off. When in doubt, none.

---

## 10. Accessibility floor (non-negotiable)

- WCAG **AA** contrast — the §3 table is the source of truth; Marigold text is banned on white.
- Visible `:focus-visible` ring everywhere (Deep Blue, 2px, 2px offset).
- `prefers-reduced-motion: reduce` disables all motion.
- Full keyboard operability; skip-to-content link; landmark regions.
- Devanagari and English both meet the same standards; language toggle has an accessible name in both.
- Tap targets ≥ 44px. Forms: label every field, errors explain the fix in the interface's voice.

---

## 11. Performance / low-bandwidth budget

Nepal is mobile-majority on slow connections; this is an access requirement, not a nicety.
- Static output. **Zero JS by default**; islands only for project filters and the toggle.
- Fonts self-hosted, subset, `font-display: swap`, preloaded.
- Image budget: hero ≤ 150KB, cards lazy. AVIF/WebP.
- Target: usable first paint on 3G; total initial page weight ≤ ~500KB.
- No third-party requests (no Google Fonts CDN, no analytics that block render).

---

## 12. What Codex inherits

Every page-build Codex prompt must carry, inline: the §3 color rules (esp. the Marigold-text ban), the §4 type scale, the relevant component specs from §7, and the §10 a11y floor. Codex cannot see this file — so the prompts quote it. Build order after lock: base tokens/components → Home → Projects (index + detail) → the rest per architecture.
