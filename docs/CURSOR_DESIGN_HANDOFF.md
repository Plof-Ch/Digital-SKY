# Cursor Design Handoff — Digital Sky

## Goal
A polished, visually exceptional research-stage fintech website **already exists** in this repository. Your task is an iterative redesign and enhancement, NOT a rewrite from scratch.

## Priority instructions

1. Preserve all ten routes and existing page text unless explicitly revised by the product owner.
2. Prioritize visual polish: grid, typography, hero composition, transitions, intentional use of space, illustration and responsive refinement.
3. The `/research/` page is the project's evidence center. Keep its 11 subsections, financial charts, technical metrics, original screenshots, financial-model caveats, and document sources.
4. Preserve functioning 6-step transaction flow, clickable prototype gallery, forecast select/CSV, and FAQ.
5. Do not invent figures, banks/CB partnerships, licenses, registration flows, wallets, completed transfers, API endpoints or real production KPIs.
6. VTB, ICBC, CBR and Chinese central bank are illustrative actors from source scenarios only — not officially confirmed project partners.
7. Do not present estimates from the separate coursework document as proven metrics of a live Digital Sky deployment.
8. All numerical financial charts come from `assets/site-data.js`. In particular, forecast bank-count interpretation and claimed savings require validation.
9. Public site does NOT need authentication; the future banking platform must be developed separately (see `FUTURE_PLATFORM_INTEGRATION.md`).
10. Avoid generic AI-generated background art. Favor deliberate vector diagrams, realistic product screen mockups extracted from the source, and restrained financial UI aesthetics.

## Existing pages

`/`, `/platform/`, `/how-it-works/`, `/technology/`, `/audiences/`, `/security/`, `/research/`, `/roadmap/`, `/about/`, `/contacts/`.

## Technical details

Pure HTML + vanilla JavaScript + CSS. Entries are prerendered; frontend interactions attach in `assets/site.js`. No bundling, no API. All links are real routes with directory `index.html` files. `scripts/smoke_test.cjs` runs rendering tests, `scripts/prerender.cjs` generates static content. If you change displayed texts in site.js, regenerate routes by:

```
python scripts/generate_pages.py
node scripts/prerender.cjs
node scripts/smoke_test.cjs
```

Do not run `generate_pages.py` by itself right before publishing; it rebuilds HTML shells without pre-rendered content until `prerender.cjs` is run.

## UX acceptance

- Entire site fully readable at 360 px, 768 px and 1440 px.
- Every main navigation item leads to a populated page.
- Each chart displays source, unit and data status.
- Every CTA goes to an actual page or email action.
- Buttons, charts and lightboxes work with keyboard interaction where practical.
- No layout overflow or unreadable charts on mobile.
- Fast loading: no mandatory third-party libraries.
- Strong contrast, reduced-motion support, alt text for genuine prototype screenshots.
- SEO meta per page; remove noindex only when owner approves public release.

## Next-phase evolution

When the banking system is authorized and built later, expose it as a clearly separate authenticated product, not as a simulated tab in the research website. Requirements and backend interfaces must be independently approved.
