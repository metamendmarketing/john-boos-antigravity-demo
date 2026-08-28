# 10 — Acceptance Criteria

## Runability
- installs and runs without secrets
- no database setup
- no authenticated external service
- no runtime scraping

## Recommendation correctness
- hard max-width constraint is respected
- drainboard side/count is interpreted correctly
- exact mode excludes known mismatches
- near-match mode explains compromises
- unknown product data is never treated as a match

## Traceability
- every verified product has a source link
- product detail shows verification status
- missing fields display as unknown/not included

## User experience
- user can complete hero sink flow in under 60 seconds
- natural-language input can be edited before matching
- results show no more than 3 primary recommendations
- comparison can show up to 3 products
- schematic is clear at desktop and mobile widths

## Demo query
Input:
“I have 90 inches of wall space and need a 3 compartment sink with 18 inch drainboards on both sides.”

Expected best match:
`3B16204-2D18-X`

Expected explanation includes:
- 87 in overall width
- fits within 90 in
- 3 in remaining
- three 16 x 20 x 14 in bowls
- two 18 in drainboards

## Failure behavior
A request for a product beyond the demo data must result in an honest no-exact-match state, not an invented model.
