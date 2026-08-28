import { Requirements, ProductCategory, DrainboardSide } from "./types";

export interface ParseResult {
  requirements: Requirements;
  isFallback: boolean;
  confidence: number;
  rawText: string;
}

export function parseRequirementsLocally(text: string): ParseResult {
  const normalized = text.toLowerCase().trim();
  const uncertainties: string[] = [];

  // 1. Detect Category
  let category: ProductCategory = "compartment_sink";
  if (normalized.includes("filler table") || normalized.includes("eft8")) {
    category = "filler_table";
  } else if (normalized.includes("equipment stand") || normalized.includes("ees8")) {
    category = "equipment_stand";
  } else if (normalized.includes("work table") || normalized.includes("table") || normalized.includes("cucina") || normalized.includes("fblg")) {
    category = "work_table";
  } else if (normalized.includes("sink") || normalized.includes("compartment") || normalized.includes("bay") || normalized.includes("bowl")) {
    category = "compartment_sink";
  }

  // 2. Detect Compartments
  let compartments: number | null = null;
  if (
    normalized.includes("3 compartment") ||
    normalized.includes("3-compartment") ||
    normalized.includes("three compartment") ||
    normalized.includes("three-compartment") ||
    normalized.includes("3 bay") ||
    normalized.includes("three bay") ||
    normalized.includes("3 bowl") ||
    normalized.includes("three bowl") ||
    normalized.includes("3-bay") ||
    normalized.includes("3-bowl")
  ) {
    compartments = 3;
  } else if (
    normalized.includes("2 compartment") ||
    normalized.includes("two compartment") ||
    normalized.includes("2 bay") ||
    normalized.includes("2 bowl")
  ) {
    compartments = 2;
  } else if (
    normalized.includes("1 compartment") ||
    normalized.includes("single compartment") ||
    normalized.includes("1 bay") ||
    normalized.includes("1 bowl")
  ) {
    compartments = 1;
  } else if (category === "compartment_sink") {
    // Default to 3 for sink demo if not specified
    compartments = 3;
  }

  // 3. Detect Max Wall Width (Inches or Feet)
  let maxOverallWidthIn: number | null = null;

  // Feet match: e.g. "7 foot", "7 feet", "7 ft", "seven foot", "seven feet", "8 ft", "6 ft"
  const feetWordMap: Record<string, number> = {
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
  };

  const feetRegex = /(\b\d+(?:\.\d+)?|\bseven|\bsix|\bfive|\bfour|\beight|\bnine|\bten)\s*(?:foot|feet|ft|')/i;
  const feetMatch = normalized.match(feetRegex);
  if (feetMatch) {
    const rawVal = feetMatch[1].toLowerCase();
    const feetNum = feetWordMap[rawVal] || parseFloat(rawVal);
    if (!isNaN(feetNum)) {
      maxOverallWidthIn = feetNum * 12;
    }
  }

  // Inches match: e.g. "90 inches", "under 90 in", "90 in", "80\"", "80 inch max", "80 inches of wall space"
  if (!maxOverallWidthIn) {
    const inchRegex = /(?:under|max|available|space|wall|width|up to)?\s*(\d+(?:\.\d+)?)\s*(?:inches|inch|in|\"|'')/i;
    const inchMatch = normalized.match(inchRegex);
    if (inchMatch) {
      const parsed = parseFloat(inchMatch[1]);
      if (!isNaN(parsed) && parsed > 20) {
        // Only treat as overall width if reasonable table/sink size (e.g. > 24)
        maxOverallWidthIn = parsed;
      }
    }
  }

  // Direct number before "wall" or "inches"
  if (!maxOverallWidthIn) {
    const directRegex = /(\d{2,3})\s*(?:inches|in|")/i;
    const directMatch = normalized.match(directRegex);
    if (directMatch) {
      maxOverallWidthIn = parseFloat(directMatch[1]);
    }
  }

  // 4. Detect Drainboard Side / Layout
  let drainboardSide: DrainboardSide | null = null;

  if (
    normalized.includes("both sides") ||
    normalized.includes("two drainboards") ||
    normalized.includes("2 drainboards") ||
    normalized.includes("drainboards on both") ||
    normalized.includes("left and right") ||
    normalized.includes("l and r") ||
    normalized.includes("double drainboard")
  ) {
    drainboardSide = "both";
  } else if (
    normalized.includes("left drainboard") ||
    normalized.includes("drainboard on the left") ||
    normalized.includes("left side drainboard") ||
    normalized.includes("drainboard on left") ||
    normalized.includes("left board")
  ) {
    drainboardSide = "left";
  } else if (
    normalized.includes("right drainboard") ||
    normalized.includes("drainboard on the right") ||
    normalized.includes("right side drainboard") ||
    normalized.includes("drainboard on right") ||
    normalized.includes("right board")
  ) {
    drainboardSide = "right";
  } else if (
    normalized.includes("no drainboard") ||
    normalized.includes("no drainboards") ||
    normalized.includes("without drainboard") ||
    normalized.includes("no boards")
  ) {
    drainboardSide = "none";
  }

  // 5. Detect Drainboard Length
  let drainboardLengthIn: number | null = null;
  const dbLenRegex = /(\d{2})\s*(?:inch|in|\")\s*(?:drainboard|board)/i;
  const dbLenMatch = normalized.match(dbLenRegex);
  if (dbLenMatch) {
    drainboardLengthIn = parseFloat(dbLenMatch[1]);
  } else if (normalized.includes("18 inch drainboard") || normalized.includes("18 in drainboard") || normalized.includes("18\" drainboard")) {
    drainboardLengthIn = 18;
  } else if (normalized.includes("24 inch drainboard") || normalized.includes("24 in drainboard") || normalized.includes("24\" drainboard")) {
    drainboardLengthIn = 24;
  }

  // 6. Detect Bowl Dimensions (e.g. "16 x 20", "16x20", "18 x 18", "18 by 18")
  let bowlWidthIn: number | null = null;
  let bowlFrontToBackIn: number | null = null;

  const bowlRegex = /(\d{2})\s*(?:x|by|\*)\s*(\d{2})\s*(?:bowl|bay|compartment|size)?/i;
  const bowlMatch = normalized.match(bowlRegex);
  if (bowlMatch) {
    bowlWidthIn = parseFloat(bowlMatch[1]);
    bowlFrontToBackIn = parseFloat(bowlMatch[2]);
  } else if (normalized.includes("16x20") || normalized.includes("16 x 20") || normalized.includes("16 by 20")) {
    bowlWidthIn = 16;
    bowlFrontToBackIn = 20;
  } else if (normalized.includes("18x18") || normalized.includes("18 x 18") || normalized.includes("18 by 18")) {
    bowlWidthIn = 18;
    bowlFrontToBackIn = 18;
  }

  // 7. Detect Gauge / Material
  let topGauge: number | null = null;
  if (normalized.includes("16 gauge") || normalized.includes("16 ga") || normalized.includes("16ga")) {
    topGauge = 16;
  } else if (normalized.includes("18 gauge") || normalized.includes("18 ga") || normalized.includes("18ga")) {
    topGauge = 18;
  } else if (normalized.includes("14 gauge") || normalized.includes("14 ga") || normalized.includes("14ga")) {
    topGauge = 14;
  }

  // Check for any ambiguities to document
  if (!maxOverallWidthIn && normalized.includes("fit") && !normalized.includes("smallest")) {
    uncertainties.push("No maximum wall width specified; showing all compatible models");
  }

  return {
    requirements: {
      category,
      compartments,
      maxOverallWidthIn,
      bowlWidthIn,
      bowlFrontToBackIn,
      drainboardSide,
      drainboardLengthIn,
      topGauge,
      exactFitOnly: true,
      freeTextContext: text,
      uncertainties,
    },
    isFallback: true,
    confidence: 0.95,
    rawText: text,
  };
}
