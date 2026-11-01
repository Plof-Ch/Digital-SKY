# Digital Sky — working public website

An editable, **working website** for a research-stage cross-border CBDC settlement project, based on the user's diploma, term paper, research articles and presentations.

## Quick start in Cursor

1. Unzip the project and **open `Digital_Sky_Site` as a folder in Cursor**.
2. Use Cursor's *Open with Live Server* (if enabled), or run `python -m http.server 8080` in the project root.
3. Open `http://localhost:8080/`.
4. Pages are real static routes: `/platform/`, `/how-it-works/`, `/technology/`, `/audiences/`, `/security/`, `/research/`, `/roadmap/`, `/about/`, `/contacts/`.

**No npm install required.** HTML + CSS + vanilla JS. Deployable as a static site.

## Architecture

- `assets/style.css` — all design rules, responsive layouts and charts.
- `assets/site-data.js` — extracted project figures, texts in tables, source metadata, step descriptions, FAQs and SEO metadata.
- `assets/site.js` — reusable components, page content, illustrations and interactions.
- `assets/prototype/` — 5 genuine interface illustrations extracted from the supplied diploma (do not present as proof of bank integrations).
- `*/index.html` — generated route entry points with SEO titles.
- `scripts/generate_pages.py` — regenerates route entry points.
- `docs/` — source-based product positioning, page texts, implementation brief and fact-check guidance prepared earlier.

## Working interactions

- responsive desktop/mobile navigation;
- six-step interactive transaction walkthrough;
- research charts for CAPEX, OPEX and projected economics;
- selectable forecast metrics and downloadable CSV;
- before/after metrics marked as **estimates from a coursework document**;
- expandable detailed source tables, FAQ and lightbox for original prototype screenshots;
- responsive research subsections and anchors.

## Editorial policy

**Research prototype, not payment infrastructure.** The site does not process payments, does not create real wallets, and makes no claims of operating integrations with central/commercial banks. The example mentions VTB and ICBC **only as illustrative scenario participants**.

All figures are based on supplied sources and clearly labelled as estimations or projections. The diploma's financial forecast has unresolved ambiguity about cumulative versus newly connected banks, and its >98% savings is not validated as a full cost comparison. Security/efficiency estimates from coursework are not represented as live Digital Sky metrics.

Before public launch:
- approve contact address used in 2026 pitch presentation;
- approve team names, logos, document copyright and publication rights;
- review legal and privacy notices;
- connect the appropriate domain and configure OG/social images;
- **remove `noindex,nofollow` only after final content sign-off**;
- run technical QA and accessibility review.

## Suggested instruction to Cursor

> This is an existing working Digital Sky website, not a blank project. Start by reviewing `README.md`, `docs/`, `assets/site-data.js` and `assets/site.js`. Modernize the visual design while preserving all ten routes, the research charts, the genuine source-derived figures, the financial-model caveats, transaction walkthrough, source references and prototype screenshots. Do not invent partners, bank integrations, live transfers or product readiness. Preserve working interactions and mobile support. Test every route after changes.
