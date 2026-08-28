# 04 — UX Flow

## Flow A — Natural language
1. Landing prompt
2. User describes need
3. Parse to structured requirements
4. Show editable interpretation
5. User confirms / edits
6. Deterministic match
7. Best result + alternatives
8. Compare / add to project / open source

## Flow B — Guided configurator
1. Pick category
2. Enter installation constraints
3. Choose functional preferences
4. Results update live or on submit
5. Explain match

## Sink wizard questions
### Step 1: Space
- Maximum available wall width (inches)

### Step 2: Bowls
- 3 compartments (fixed in primary demo)
- bowl size: Recommend / 16 x 20 / 18 x 18

### Step 3: Drainboards
- None
- Left
- Right
- Both

If drainboard selected:
- 18 inches
- 24 inches
- No preference

### Step 4: Review
Show:
- max width
- bowl preference
- drainboard layout
- drainboard length

Then Find matches.

## Results card
Each card should display:
- match label (Best / Alternative / Near match)
- model
- compact schematic
- overall dimensions
- bowl size
- drainboard layout
- “Why this fits” bullets
- width remaining if a max width exists
- verification badge

## Empty exact-match state
Do not dead-end.
Display:
“No exact match in the demo data.”
Then show closest products with red/amber constraint differences.

## Source/evidence UX
Provide a small `Verified public data` badge.
On click/expand:
- source title
- source type
- source URL
- verified date
- exact fields supported by source
