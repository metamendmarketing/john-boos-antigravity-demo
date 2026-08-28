# 11 — Sales Demo Script

## 30-second setup
“John Boos already has a deep product catalog and KCL provides technical model access. This concept adds an intelligent decision layer before the CAD/BIM step — helping a buyer figure out what they should specify in the first place.”

## Demo 1 — Natural language
Type:
> I have 90 inches of wall space and need a 3 compartment sink with 18 inch drainboards on both sides.

Show the extracted requirements.

Click Find matches.

Expected:
**3B16204-2D18-X** — 87 in wide — 3 in remaining.

Point out:
- no model-number knowledge required
- recommendation is deterministic
- reason is visible
- public source is traceable

## Demo 2 — Change one requirement
Change wall width from 90 to 80.

The 87 in model should no longer be an exact physical fit.
Show the closest alternative and clearly identify the drainboard compromise.

## Demo 3 — Guided experience
Go to manual configurator and choose:
- 3 compartment
- 18 x 18 bowls
- left drainboard
- 18 in
- max width 80

Show the relevant 3B184 one-drainboard variant if available in the truth set.

## Demo 4 — Platform expansion
Browse Work Tables.
Explain that this same decision architecture can expand across the commercial catalog.

## Close
“In production, the local demo dataset is simply replaced by John Boos' authoritative product feed, while KCL remains the technical-asset handoff.”
