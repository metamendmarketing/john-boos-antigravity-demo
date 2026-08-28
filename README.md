# John Boos Intelligent Specifier — Concept Demo

Private concept demonstration prepared for a pre-engagement sales conversation.

## Build philosophy
1. Deterministic product compatibility first.
2. AI/natural-language parsing second.
3. Every recommendation is traceable to structured fields and explicit rules.
4. Missing data is displayed as unknown, never invented.
5. Public-source provenance is retained on each verified product.
6. No dependency on private manufacturer systems.

## Suggested stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui or similarly clean accessible primitives
- Local static JSON as the default data adapter
- Zod for schemas/validation
- Optional LLM adapter behind an interface, with a rule-based fallback
- SVG for proportional product diagrams
- No database required for the demo
- No auth required for the demo

## Main screens
- `/` — landing + natural-language requirement box
- `/configure` — guided configuration wizard
- `/results` — ranked matching products
- `/products/[model]` — product detail / evidence panel
- `/compare` — side-by-side comparison
- `/project` — lightweight equipment schedule / saved selections
- `/about-demo` — concept disclaimer + data/source explanation

## Data
See `data/verified_public_products.csv` and `data/verified_public_products.json`.

All rows include a `verification_status`. A row marked `verified_public` is based on a cited public source. Missing facts remain blank/null.

## Important
Do not create a crawler or scraper as part of this build. The demo data is intentionally finite and local.
