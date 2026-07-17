# Codex Prompt 01 — Project Scaffold (Sahakarya Nepal)

Copy everything below the line into Codex. It is self-contained.

---

## ROLE & SCOPE

You are scaffolding a new **Astro 6** static website for **Sahakarya Nepal**, a Nepali development NGO. This task is **infrastructure only**: project config, internationalization, content-collection schemas, design tokens, and SEO plumbing.

**Repository:** `github.com/yogeshkaphle/sahakaryanepal`. Work in this repo. Create a branch `chore/scaffold`, commit there, push, and open a PR against `main`. **Confirm in your output that you pushed to that exact remote — not a local sandbox or a fork.**

### HARD GUARDRAILS — do not violate
1. **Do NOT create any page routes, navigation, hero, sections, or UI components** beyond the two base files specified below (`BaseHead.astro`, `BaseLayout.astro`). Pages come in a later task after a design system is locked.
2. **Do NOT write any organizational content** — no project names, no statistics, no policy text, no staff names, no copy. Content collections must be created **empty** (schema + folder + `.gitkeep` only). Real content is supplied in a separate task. Inventing org data is a critical failure.
3. **Do NOT style anything.** `BaseLayout.astro` is an unstyled shell. Tokens are defined as CSS variables but not applied to components.
4. The only real-world values you may transcribe are the exact ones given in this prompt (design tokens, org schema). Do not add, embellish, or infer others.
5. If a version/API detail here conflicts with the current Astro docs you observe, follow the current docs and note the deviation in your PR description.

---

## STACK

- **Astro 6** (latest stable): `npm create astro@latest . -- --template minimal --typescript strict --no-install --git=false` (run inside the repo; adapt flags as needed). Then install deps.
- Output: **static** (default). No SSR adapter.
- Package manager: npm.
- Node: LTS.

### Integrations / packages
- `@astrojs/sitemap`
- `@fontsource-variable/noto-sans` and `@fontsource-variable/noto-sans-devanagari` (self-hosted fonts — do NOT use Google Fonts CDN; users are on slow mobile connections and we want no third-party requests).

---

## astro.config.mjs

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.sahakaryasindhuli.org.np',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    locales: ['en', 'ne'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false, // English at root (/), Nepali under /ne/
      redirectToDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
});
```

**Language model for this site:** English is the complete, default site at root. Nepali is a **partial** locale under `/ne/` (only a subset of pages will ever be translated). The config above supports that — it must NOT force a Nepali version of every route. Do not scaffold any `/ne/` routes now.

---

## CONTENT COLLECTIONS — `src/content.config.ts`

Use the Astro Content Layer API (`glob` loader + Zod). Create the file with these six collections. Then create the matching **empty** folders under `src/content/<name>/` each containing a `.gitkeep` and a `_README.md` that says: *"Content supplied separately. Do not add entries by hand or invent data."*

```ts
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    status: z.enum(['ongoing', 'completed']),
    featured: z.boolean().default(false),
    sectors: z.array(z.string()),          // slugs matching the `sectors` collection
    donors: z.array(z.string()),           // display names
    municipalities: z.array(z.string()),
    wards: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),   // omit for ongoing
    budgetNPR: z.number().optional(),
    summary: z.string(),
    objectives: z.array(z.string()).default([]),
    achievements: z.array(z.string()).default([]),
    sdgs: z.array(z.number()).default([]),
    heroImage: image().optional(),
    gallery: z.array(image()).default([]),
  }),
});

const sectors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/sectors' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    order: z.number().default(0),
    description: z.string(),
    icon: z.string().optional(),
    heroImage: image().optional(),
  }),
});

const partners = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/partners' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    type: z.enum(['multilateral', 'bilateral', 'ingo', 'government', 'local-government', 'other']),
    logo: image().optional(),
    relationship: z.string().optional(),
    referenceLetter: z.string().optional(), // path to PDF
    url: z.string().url().optional(),
  }),
});

const stories = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/stories' }),
  schema: ({ image }) => z.object({
    person: z.string(),
    place: z.string(),
    sector: z.string().optional(),
    project: reference('projects').optional(),
    quote: z.string().optional(),
    photo: image().optional(),
    date: z.coerce.date().optional(),
  }),
});

const reports = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/reports' }),
  schema: z.object({
    title: z.string(),
    yearBS: z.string(),
    yearAD: z.number(),
    type: z.enum(['annual-report', 'audited-financials', 'financial-summary']),
    language: z.enum(['en', 'ne', 'bilingual']).default('en'),
    file: z.string(),        // path to PDF
    summary: z.string().optional(),
  }),
});

const policies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/policies' }),
  schema: z.object({
    name: z.string(),
    category: z.enum(['financial', 'hr', 'safeguarding', 'governance', 'operational']),
    yearBS: z.string().optional(),
    lastRevised: z.string().optional(),
    file: z.string().optional(),
  }),
});

export const collections = { projects, sectors, partners, stories, reports, policies };
```

The build must pass `astro check` with these schemas and empty collections.

---

## DESIGN TOKENS — `src/styles/tokens.css`

Define these as CSS custom properties on `:root`. **Transcribe the hex values exactly.** Do not apply them to any element yet — just declare them.

```css
:root {
  /* Palette (refined for web, WCAG-checked) */
  --color-deep-blue: #16386E;     /* primary: structure, headers, links, trust */
  --color-hill-green: #2F6B45;    /* secondary: the work, programs, land */
  --color-marigold: #E4832A;      /* accent: people, get-involved (accent only) */
  --color-deep-marigold: #B85F17; /* CTA variant that carries white text */
  --color-ink: #1D2430;           /* body + headings (warm near-black) */
  --color-slate: #55606E;         /* captions, metadata, secondary text */
  --color-stone: #F5F3EE;         /* subtle section backgrounds */
  --color-white: #FFFFFF;

  /* Type */
  --font-sans: 'Noto Sans Variable', 'Noto Sans', system-ui, sans-serif;
  --font-devanagari: 'Noto Sans Devanagari Variable', 'Noto Sans Devanagari', sans-serif;
  --line-height-body: 1.6;
  --weight-body: 400;
  --weight-medium: 500;
  --weight-heading: 700;
}
```

Import the two Fontsource variable packages once in a global stylesheet (`src/styles/global.css`) that also imports `tokens.css`. `global.css` should include only: the font imports, `tokens.css`, a minimal modern reset (box-sizing, margin reset, `img { max-width: 100% }`), and a base `body { font-family: var(--font-sans); line-height: var(--line-height-body); color: var(--color-ink); background: var(--color-white); }`. Nothing more.

**Accessibility baseline in global.css:** include a visible `:focus-visible` outline and a `@media (prefers-reduced-motion: reduce)` block that disables animations/transitions. (These are baseline rules, not design.)

---

## `src/components/BaseHead.astro`

A reusable `<head>` partial. Props: `title`, `description`, optional `image`, optional `lang` (default `'en'`). It must output:
- charset, viewport, `<title>`, meta description
- canonical link (built from `Astro.url` + `site`)
- Open Graph + Twitter card basics
- `hreflang` alternate link scaffolding (en ↔ ne) — helper that, given the current path, emits alternates; safe to no-op when no translation exists
- the global stylesheet import
- **One JSON-LD block** of type `NGO`, transcribed exactly from these values:

```json
{
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Sahakarya Nepal",
  "alternateName": "Sahakarya Nepal, Sindhuli",
  "url": "https://www.sahakaryasindhuli.org.np",
  "foundingDate": "2004-10-10",
  "email": "sahakarya2061@gmail.com",
  "telephone": "+977-047-520863",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kamalamai Municipality-6, Rammadi",
    "addressLocality": "Sindhuli",
    "addressCountry": "NP"
  },
  "areaServed": "Sindhuli District, Nepal",
  "sameAs": ["https://www.facebook.com/Sahakaryasindhuli"],
  "identifier": [
    { "@type": "PropertyValue", "propertyID": "DAO Sindhuli Reg.", "value": "363" },
    { "@type": "PropertyValue", "propertyID": "Social Welfare Council", "value": "21014" },
    { "@type": "PropertyValue", "propertyID": "NGO Federation", "value": "CR-SIN-68" },
    { "@type": "PropertyValue", "propertyID": "PAN", "value": "301753065" },
    { "@type": "PropertyValue", "propertyID": "DUNS", "value": "557778269" },
    { "@type": "PropertyValue", "propertyID": "NCAGE", "value": "SHNW8" },
    { "@type": "PropertyValue", "propertyID": "EuropeAid PADOR", "value": "NP-2022-AIY-1708192319" }
  ]
}
```

---

## `src/layouts/BaseLayout.astro`

An **unstyled** document shell only:
- `<html lang={lang}>` (default `en`; accept a `lang` prop)
- renders `<BaseHead>` with passed props
- `<body><slot /></body>`
- No header, no nav, no footer, no container, no styling. Those are later tasks.

---

## ACCEPTANCE CRITERIA

- `npm run build` and `astro check` both pass with zero errors.
- Six content collections registered; six empty content folders exist with `.gitkeep` + `_README.md`.
- `astro.config.mjs` has the exact `site`, `i18n`, and `sitemap` config above.
- `tokens.css` declares every listed variable with the exact hex values.
- Self-hosted Noto Sans + Noto Sans Devanagari load with no external font requests.
- `BaseHead.astro` emits the NGO JSON-LD exactly as given.
- No page routes, no components beyond `BaseHead` and `BaseLayout`, no org content anywhere.
- Pushed to `github.com/yogeshkaphle/sahakaryanepal` on branch `chore/scaffold` with an open PR. State the commit SHA and PR link in your output.

## OUTPUT

Report: the Astro version installed, the file tree created, the results of `npm run build` and `astro check`, and confirmation of the push (remote URL, branch, commit SHA, PR link).
