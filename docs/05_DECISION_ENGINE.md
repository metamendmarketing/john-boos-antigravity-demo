# 05 — Deterministic Decision Engine

## Principle
AI may understand intent. AI does not decide product compatibility.

## Input schema
See `prompts/extraction_schema.json`.

## Hard constraints for compartment sinks
A product is excluded when a known requested requirement conflicts with a known product fact.

1. `category == compartment_sink`
2. requested compartments must equal product compartments when both known
3. if `max_overall_width_in` exists and product overall width is known, product width must be <= max
4. drainboard layout:
   - none => drainboard_count == 0
   - left => left drainboard exists
   - right => right drainboard exists
   - both => left and right exist
5. if requested drainboard length is exact and product value is known, exact match required in exact-match mode
6. if bowl size is exact and product bowl dimensions are known, exact match required in exact-match mode

## Near-match mode
When exact-match mode is off, hard constraints are limited to:
- category
- compartment count
- physical maximum width

Preferences become scoring penalties rather than exclusions.

## Scoring
Base = 100.

Suggested penalties:
- requested drainboard layout mismatch: -45
- drainboard length mismatch: -20
- bowl size mismatch: -15
- unknown requested field on product: -8 per important field
- excess unused wall space: -0.15 per unused inch (capped)

Bonuses:
- exact drainboard layout: +10
- exact bowl size: +5
- verified public status: +5
- high data completeness: +3

Clamp to 0–100.

## Tie break
1. higher score
2. fewer compromises
3. smaller unused wall space
4. more complete verified data
5. model alphabetical for stable output

## Explainability object
Every match should return:
- `hard_failures[]`
- `matched_requirements[]`
- `compromises[]`
- `unknowns[]`
- `score_components[]`
- `width_remaining_in`

## Important
Do not use prices in ranking. Public reseller prices change and are not authoritative for this concept.
