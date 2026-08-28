# 06 — AI / Natural-Language Behavior

## Role of AI
AI is an input parser and explanation layer, not the product truth source.

## Required behavior
- convert user language into structured fields
- ask/flag ambiguity only when material
- preserve uncertainty
- do not invent model numbers
- do not invent specifications
- never override deterministic compatibility

## No-key fallback
The demo must still work without an AI provider.
Implement a local parser for common phrases:
- `under 90 inches`, `90 inch max`, `about 7 feet` → max width
- `three compartment`, `3 bay`, `3 bowl` → compartments=3
- `both sides`, `left and right` → drainboard_side=both
- `left drainboard`, `right drainboard`
- `18 inch drainboard`, `24 inch drainboard`
- `16 by 20 bowls`, `18 x 18 bowls`

Show a small `Parsed locally` label when using fallback mode.

## Optional provider adapter
If Antigravity chooses to add an LLM adapter, it must be optional and disabled by default.
Interface idea:
`parseRequirements(text) -> RequirementParseResult`

Provider implementation can be added later without changing the recommendation engine.
