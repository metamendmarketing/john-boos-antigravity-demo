# Acceptance Tests

## A1 — Hero exact match
Requirements:
- category: compartment_sink
- compartments: 3
- max width: 90
- drainboard: both
- drainboard length: 18
- exact: true

Expected best: `3B16204-2D18-X`
Expected width remaining: 3

## A2 — 18x18 left drainboard
- max width: 80
- bowl: 18 x 18
- drainboard: left 18

Expected best: `3B184-1D18L-X`

## A3 — Physical constraint beats preference
- max width: 80
- drainboards both

`3B16204-2D18-X` must not be called an exact fit because 87 > 80.

## A4 — No boards
- 3 compartments
- no drainboards
- choose smallest suitable width

Expected best: `3B16204-X` (53 in) rather than `3B184-X` (59 in), unless bowl size preference changes scoring.

## A5 — Unknowns
If a UI field is not present for a product, it must display `Not included in demo data`, not a guessed value.

## A6 — No network dependency
Disable network access after install/build dependencies are present. Product matching must still function.

## A7 — Source traceability
Every verified product detail page must expose at least one source URL and the verification date.
