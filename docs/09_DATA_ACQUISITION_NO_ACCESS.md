# 09 — Data Acquisition Without Manufacturer Access

## Objective
Create enough high-confidence product coverage to prove the experience, not to clone the catalog.

## Allowed workflow
1. Identify a narrow product family.
2. Use public manufacturer literature/pages and public spec references.
3. Manually capture structured facts.
4. Save source URL and verification date.
5. Cross-check critical fields when practical.
6. Leave uncertain values blank.
7. Build the decision experience around fields that are actually present.

## Do not
- build a crawler
- bulk-download protected CAD/BIM libraries
- bypass access controls
- assume model-code semantics are authoritative configuration rules
- imply the sample dataset is complete/current production data

## Recommended sample size
For a compelling demo, 10–30 carefully selected variants is enough.

This bundle contains a smaller verified starter truth set. Antigravity should make it easy to add rows later without code changes.

## Production transition
If the prospect engages, request:
- authoritative product export (CSV/JSON/XML/API)
- category hierarchy
- option/variant relationships
- discontinued/current flags
- compatible accessories
- technical asset URLs
- authoritative product rules
- pricing/availability only if the use case needs it
