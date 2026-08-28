# 08 — Technical Architecture

## Layers
### UI
Next.js routes/components.

### Requirement parser
- local deterministic parser by default
- optional LLM provider adapter

### Recommendation engine
Pure TypeScript functions. No network calls.

### Data adapter
Interface:
```ts
interface ProductRepository {
  list(): Promise<Product[]>;
  getByModel(model: string): Promise<Product | null>;
}
```

Initial implementation reads local JSON.
Future implementation can read PIM/API/database.

### Project state
localStorage for saved products/notes.

### Visualization
Pure SVG React component generated from dimensions.

## Suggested source layout
```text
src/
  app/
  components/
  data/
  domain/
    schemas.ts
    recommendation-engine.ts
    requirement-parser.ts
    explain.ts
  repositories/
    local-product-repository.ts
  lib/
  tests/
```

## Important architecture rule
Keep manufacturer-specific data/rules out of page components. Pages consume typed domain services so the prototype can later swap in authoritative feeds.
