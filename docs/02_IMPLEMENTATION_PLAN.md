# 02 — Implementation Plan Without Full Access

## Phase 0 — Guardrails
**Objective:** create a private proof of concept without private manufacturer systems.

Inputs allowed:
- Public manufacturer pages/literature
- Publicly accessible product/specification references
- Manually normalized sample data
- Neutral diagrams generated from structured dimensions

Do not rely on:
- scraping
- credentialed KCL access
- dealer portals
- pricing feeds
- PIM/ERP
- proprietary CAD files

## Phase 1 — Build a “truth set”
Start with a deliberately small data set.

### Primary demo family
3-compartment sinks.

Why:
- strong dimensional constraints
- model variants encode meaningful differences
- drainboard layout is easy to understand visually
- a recommendation can be objectively explained

### Secondary categories
- work tables
- filler tables
- equipment stand

These make the demo feel extensible.

## Phase 2 — Normalize public facts
Create one canonical product object per model.
Track:
- model
- category/family
- dimensions
- bowl dimensions/count
- drainboard count/side/length
- material/gauge where known
- certifications where known
- source URL
- verification date
- confidence/status

Never infer a missing dimensional value from a model code unless the value is explicitly marked `derived_demo_only` and kept out of product facts. For this bundle, verified rows contain only facts we captured from public sources.

## Phase 3 — Deterministic decision engine
Implement compatibility before AI.

Hard constraints examples:
- category mismatch
- required number of compartments
- product exceeds max wall width
- required drainboard side/count unavailable
- requested drainboard length conflicts with known value

Soft scoring examples:
- smallest unused wall space
- exact bowl preference
- exact drainboard preference
- verified data completeness

Return reasons with each score.

## Phase 4 — Natural-language requirement parser
The parser maps text to the same structured requirement object used by the manual wizard.

Important architecture:
`text → structured requirements → deterministic engine`

Never:
`text → LLM invents product answer`

The recommendation engine must not depend on the LLM.

## Phase 5 — Visual product schematic
Generate SVG from structured fields.

For sink families:
- outer rectangle proportional to overall length/depth
- three bowl rectangles
- optional left/right drainboard zones
- dimensional labels

Do not claim drawing accuracy beyond the structured dimensions.

## Phase 6 — Sales-ready experience
Add:
- landing page
- editable parsed requirements
- guided wizard
- ranked results
- best-match rationale
- comparison
- product evidence/source drawer
- project/equipment schedule
- production-integration teaser

## Phase 7 — Demo polish
Use preloaded scenarios that make the value obvious.

Recommended hero demo:
- Max wall width: 90 in
- 3 compartments
- 18 in drainboard both sides
- result: 3B16204-2D18-X at 87 in
- remaining clearance: 3 in

## Phase 8 — What happens if John Boos engages
Replace the local static adapter incrementally:
1. Obtain authoritative catalog export.
2. Map product hierarchy/options.
3. Validate configuration rules with product team.
4. Connect technical asset URLs.
5. Add real pricing/availability only if desired.
6. Add dealer/RFQ handoff.
7. Add analytics on abandoned/unsatisfied requirements.

The demo architecture should allow these adapters to change without rebuilding the recommendation UX.
