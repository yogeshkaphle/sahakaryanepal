# Sahakarya Nepal — Project Memory

Static marketing/impact website for Sahakarya Nepal. **Astro 6, static output → deploys to Vercel.**

## Source of truth (read before changing anything)

The planning specs in `/docs/` are authoritative. Do not contradict them.

- `docs/sahakarya-architecture.md` — site structure, URL map, content model
- `docs/sahakarya-design-system.md` — the locked visual system (obey exactly)
- `docs/sahakarya-brand-kit.md` — palette + type

## Non-negotiables

1. **Never invent organizational content.** No project names, stats, quotes, or
   copy that isn't in the source docs/content. If a fact is missing, leave it
   empty and flag it as `[NEEDS ORG]` — do not fill the gap.
2. **Obey the design system.** In particular:
   - Marigold `#E4832A` is **accent-only** — NEVER used for text and never under
     white text.
   - CTA fills use Deep Marigold `#B85F17`.
   - One accent per view. No gradients, no drop shadows.

## Content model

Collections (defined in `src/content.config.ts`): `projects`, `sectors`,
`partners`, `stories`, `reports`, `policies`.

- Content is authored as markdown with frontmatter under `src/content/<collection>/`.
- Content values are never invented — they come from the org's real records.
- `_README.md` placeholder files are excluded from globs via `'!**/_*'`.
- Photos for `astro:assets` live in `src/assets/photos/` — never in `/docs/`
  (`/docs/` holds only the markdown specs).

## Build / verify

```bash
npm install
npx astro check      # type + content schema check
npm run build        # static build
```

## Preview

`src/pages/_preview.astro` renders all 13 components with fake sample props.
Delete before launch. Do not add new pages beyond this preview.
