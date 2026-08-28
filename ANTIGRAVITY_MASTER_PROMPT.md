# Master Build Prompt for Antigravity

You are building a polished private concept demo called **John Boos Intelligent Specifier**.

Read the entire repository before making architecture decisions. Treat the docs and data as the source of truth.

## Product objective
Create an intelligent product-selection experience for commercial kitchen equipment. A user can describe a need in natural language or use a guided wizard. The application converts the requirement into structured constraints, applies deterministic compatibility/ranking rules to a local product dataset, and returns a small number of explainable recommendations.

The demo should prove that a manufacturer can put an intelligent decision layer in front of a traditional catalog/CAD/BIM library.

## Non-negotiable constraints
- No private John Boos credentials or access.
- No KCL login or KCL API dependency.
- No scraping/crawling.
- No live ecommerce, PIM, ERP, CRM, distributor, inventory, or pricing integrations.
- No API key required to run the demo.
- Do not fabricate missing product specifications.
- When a field is missing, show it as unknown/not included in demo data.
- Keep provenance visible in an expandable “Source & verification” area.
- Do not present the demo as commissioned, approved, or endorsed by John Boos.
- Include a discreet footer: “Private concept demonstration by Metamend. Not affiliated with or endorsed by John Boos & Co.”

## Technology
Use:
- Next.js App Router + TypeScript
- Tailwind
- accessible component primitives
- local JSON data adapter
- Zod schemas
- SVG schematic renderer

Do not add a database unless absolutely necessary. It is not necessary for this demo.

## Core experience
### 1. Landing
Hero:
**Find the right commercial kitchen equipment without searching a catalog.**

Prompt example placeholder:
“I need a 3-compartment sink under 90 inches wide with drainboards on both sides.”

Actions:
- Describe your project
- Configure manually
- Browse demo catalog

Also show three category cards: Compartment Sinks, Work Tables, Filler Tables.

### 2. Natural-language parsing
Parse the user's input into a typed requirement object. Must work with a local deterministic parser if no AI provider exists.

For sink intent, detect where possible:
- category
- compartments
- max width
- desired depth / max depth
- bowl width
- bowl front-to-back
- bowl depth
- drainboard count
- drainboard side
- drainboard length
- material/gauge
- backsplash requirement
- operational context

Always show the extracted requirements as editable chips/fields before final recommendation.

### 3. Guided configurator
For 3-compartment sinks ask only relevant questions:
- available wall width
- bowl size preference (16x20, 18x18, recommend)
- drainboards (none, left, right, both)
- preferred drainboard length (18, 24, no preference)
- commercial intensity / use case
- “show only exact fits” toggle

Avoid questions unsupported by the demo dataset.

### 4. Recommendation engine
Use the deterministic rules in `data/decision_rules.json` and the detailed behavior in `docs/05_DECISION_ENGINE.md`.

Hard constraints eliminate products. Soft preferences rank remaining products.

Return:
- Best match
- Up to 2 alternatives
- Why it matched
- Any compromises
- Remaining clearance based on max width
- Data confidence / verification badge

### 5. Product visualization
Do not require manufacturer product images.
Generate a clean proportional SVG front/top schematic from dimensions:
- overall length/width
- three bowl blocks
- left/right drainboards
- labels and dimension arrows

This visualization is conceptual, not fabrication-grade.

### 6. Product detail
Show:
- model
- family/category
- verified dimensions
- bowl details
- drainboard layout
- gauge/material when known
- NSF when known
- explanation of fit
- source provenance
- “Open source” link
- “Technical files / CAD / BIM” button that can point to the KCL concept landing URL or display “Available through manufacturer/KCL in a production integration.”

### 7. Compare
Allow up to 3 products side-by-side.
Highlight:
- exact matches
- differences
- width consumed
- drainboard layout
- bowl size
- gauge
- verification status

### 8. Project / equipment schedule
A user can add products to a local project. Store in localStorage.
Show a simple schedule table with model, category, dimensions, qty, notes.
Allow Print / Export JSON. CSV export is optional.

## Demo behavior examples
The queries in `tests/sample_queries.json` should work.

A key demo query:
“I have 90 inches of wall space and need a 3 compartment sink with 18 inch drainboards on both sides.”

The engine should strongly prefer `3B16204-2D18-X` because the bundled public sample lists it at 87 inches overall with two 18-inch drainboards. It should clearly show 3 inches of remaining width.

If a request asks for something not represented in the data, do not hallucinate a model. Say:
“No exact product in the demo dataset meets all of these requirements.”
Then show the nearest alternatives and which constraint they fail.

## Design direction
Commercial, technical, premium, simple.
- white / warm neutral background
- charcoal text
- stainless/steel visual cues using neutral grays
- restrained accent color
- strong typography
- generous whitespace
- clear spec tables
- no gimmicky gradients
- no chatbot-first UI

The AI text box is an input method, not the product.

## Build sequence
1. Read docs/data.
2. Define Zod types.
3. Create data adapter.
4. Build deterministic engine and tests.
5. Build requirement parser + fallback.
6. Build sink configurator.
7. Build results and comparison.
8. Add SVG schematic.
9. Add work table/filler table browsing.
10. Add project schedule.
11. Polish responsive UI.
12. Run acceptance tests.

## Definition of done
The demo must run locally with one install and one dev command, without secrets. It must successfully handle the acceptance scenarios and clearly distinguish verified facts from inference/unknown fields.
