# Routes

| Route | Purpose |
|---|---|
| `/` | Hero, NL input, example scenarios, categories |
| `/configure?category=compartment_sink` | Guided config wizard |
| `/results` | Ranked results + requirement summary |
| `/products/[model]` | Product specs, schematic, source evidence |
| `/compare` | Compare up to 3 products |
| `/project` | Local equipment schedule |
| `/catalog` | Browse local demo products |
| `/about-demo` | Scope, disclaimer, source methodology |

Use URL-safe encoded requirement state or a small client state store so results can be revisited without a backend.
