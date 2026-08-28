import { Product, Requirements, ProductMatchResult, MatchExplainability, ScoreComponent } from "./types";

export function evaluateProduct(product: Product, req: Requirements): MatchExplainability {
  const hardFailures: string[] = [];
  const matchedRequirements: string[] = [];
  const compromises: string[] = [];
  const unknowns: string[] = [];
  const scoreComponents: ScoreComponent[] = [];

  let score = 100;
  const isExactMode = req.exactFitOnly ?? true;

  // 1. Category Check
  if (product.category !== req.category) {
    hardFailures.push(`Category mismatch: required ${req.category}, product is ${product.category}`);
  } else {
    matchedRequirements.push(`Category: ${product.category.replace("_", " ")}`);
  }

  // 2. Compartments Check (for compartment sinks)
  if (req.compartments !== null && req.compartments !== undefined && product.sink?.compartments !== null && product.sink?.compartments !== undefined) {
    if (product.sink.compartments !== req.compartments) {
      hardFailures.push(`Requires ${req.compartments} compartments, product has ${product.sink.compartments}`);
    } else {
      matchedRequirements.push(`${product.sink.compartments} compartments`);
    }
  }

  // 3. Max Overall Width Check
  let widthRemaining: number | null = null;
  if (req.maxOverallWidthIn !== null && req.maxOverallWidthIn !== undefined) {
    if (product.overall.widthIn !== null && product.overall.widthIn !== undefined) {
      if (product.overall.widthIn > req.maxOverallWidthIn) {
        const excess = product.overall.widthIn - req.maxOverallWidthIn;
        hardFailures.push(`Exceeds maximum available wall width by ${excess} in (width: ${product.overall.widthIn} in, max: ${req.maxOverallWidthIn} in)`);
      } else {
        widthRemaining = req.maxOverallWidthIn - product.overall.widthIn;
        matchedRequirements.push(`Overall width ${product.overall.widthIn} in fits within ${req.maxOverallWidthIn} in space (${widthRemaining} in clearance)`);

        // Unused width penalty: -0.15 per inch, capped at -15
        const unusedPenalty = Math.max(-15, -0.15 * widthRemaining);
        if (unusedPenalty < 0) {
          scoreComponents.push({
            name: "Unused Width",
            delta: Math.round(unusedPenalty * 10) / 10,
            description: `${widthRemaining} in remaining clearance (-0.15/in)`,
          });
          score += unusedPenalty;
        }
      }
    } else {
      unknowns.push("Overall width is not listed in verified dataset");
    }
  }

  // 4. Drainboard Layout Check
  if (req.drainboardSide && req.drainboardSide !== "any") {
    if (product.sink) {
      const left = (product.sink.leftDrainboardIn || 0) > 0;
      const right = (product.sink.rightDrainboardIn || 0) > 0;
      const count = product.sink.drainboardCount || 0;

      let layoutMatched = false;
      let layoutDescription = "";

      if (req.drainboardSide === "none") {
        layoutMatched = count === 0 && !left && !right;
        layoutDescription = "No drainboards";
      } else if (req.drainboardSide === "left") {
        layoutMatched = left && !right;
        layoutDescription = "Left-side drainboard";
      } else if (req.drainboardSide === "right") {
        layoutMatched = right && !left;
        layoutDescription = "Right-side drainboard";
      } else if (req.drainboardSide === "both") {
        layoutMatched = left && right;
        layoutDescription = "Drainboards on both sides";
      }

      if (layoutMatched) {
        matchedRequirements.push(layoutDescription);
        score += 10;
        scoreComponents.push({
          name: "Exact Drainboard Layout",
          delta: 10,
          description: `Matches requested layout: ${layoutDescription}`,
        });
      } else {
        const actualLayout = count === 0 ? "no drainboards" : left && right ? "both sides" : left ? "left side only" : right ? "right side only" : "custom";
        const compromiseMsg = `Requested drainboards '${req.drainboardSide}', but product has ${actualLayout}`;
        
        if (isExactMode) {
          hardFailures.push(compromiseMsg);
        } else {
          compromises.push(compromiseMsg);
          score -= 45;
          scoreComponents.push({
            name: "Drainboard Layout Mismatch",
            delta: -45,
            description: compromiseMsg,
          });
        }
      }
    } else {
      unknowns.push("Drainboard layout is not applicable or not verified");
    }
  }

  // 5. Drainboard Length Check
  if (req.drainboardLengthIn !== null && req.drainboardLengthIn !== undefined && req.drainboardSide !== "none") {
    if (product.sink) {
      const leftLen = product.sink.leftDrainboardIn;
      const rightLen = product.sink.rightDrainboardIn;
      
      const hasLength = (leftLen && leftLen === req.drainboardLengthIn) || (rightLen && rightLen === req.drainboardLengthIn);
      const isBoardPresent = (leftLen && leftLen > 0) || (rightLen && rightLen > 0);

      if (isBoardPresent) {
        if (hasLength) {
          matchedRequirements.push(`${req.drainboardLengthIn} in drainboard length`);
        } else {
          const actualLen = leftLen || rightLen || 0;
          const lenMsg = `Requested ${req.drainboardLengthIn} in drainboard length, product has ${actualLen} in`;
          if (isExactMode) {
            hardFailures.push(lenMsg);
          } else {
            compromises.push(lenMsg);
            score -= 20;
            scoreComponents.push({
              name: "Drainboard Length Mismatch",
              delta: -20,
              description: lenMsg,
            });
          }
        }
      }
    }
  }

  // 6. Bowl Dimensions Check
  if (req.bowlWidthIn !== null && req.bowlWidthIn !== undefined && req.bowlFrontToBackIn !== null && req.bowlFrontToBackIn !== undefined) {
    if (product.sink?.bowlWidthIn && product.sink?.bowlFrontToBackIn) {
      const matchBowl = product.sink.bowlWidthIn === req.bowlWidthIn && product.sink.bowlFrontToBackIn === req.bowlFrontToBackIn;
      if (matchBowl) {
        matchedRequirements.push(`Exact bowl size: ${req.bowlWidthIn} x ${req.bowlFrontToBackIn} in`);
        score += 5;
        scoreComponents.push({
          name: "Exact Bowl Size",
          delta: 5,
          description: `Exact ${req.bowlWidthIn} x ${req.bowlFrontToBackIn} in bowl dimensions`,
        });
      } else {
        const bowlMsg = `Requested bowl ${req.bowlWidthIn} x ${req.bowlFrontToBackIn} in, product has ${product.sink.bowlWidthIn} x ${product.sink.bowlFrontToBackIn} in`;
        if (isExactMode) {
          hardFailures.push(bowlMsg);
        } else {
          compromises.push(bowlMsg);
          score -= 15;
          scoreComponents.push({
            name: "Bowl Size Mismatch",
            delta: -15,
            description: bowlMsg,
          });
        }
      }
    } else {
      unknowns.push("Bowl dimensions not recorded for product");
    }
  }

  // 7. Verified Public Data Bonus & Data Completeness
  if (product.verificationStatus === "verified_public") {
    score += 5;
    scoreComponents.push({
      name: "Verified Public Record",
      delta: 5,
      description: "Data verified from cited public literature or spec sheet",
    });
  }

  // Calculate completeness score (0-100)
  let verifiedFieldCount = 0;
  let totalFieldCount = 6;
  if (product.overall.widthIn !== null) verifiedFieldCount++;
  if (product.overall.depthIn !== null) verifiedFieldCount++;
  if (product.top.gauge !== null) verifiedFieldCount++;
  if (product.sink) {
    totalFieldCount += 4;
    if (product.sink.bowlWidthIn !== null) verifiedFieldCount++;
    if (product.sink.bowlDepthIn !== null) verifiedFieldCount++;
    if (product.sink.drainboardCount !== null) verifiedFieldCount++;
    if (product.sink.backsplashIn !== null) verifiedFieldCount++;
  }
  const completeness = Math.round((verifiedFieldCount / totalFieldCount) * 100);
  if (completeness >= 80) {
    score += 3;
    scoreComponents.push({
      name: "High Data Completeness",
      delta: 3,
      description: `${completeness}% of key product fields verified`,
    });
  }

  // Clamp final score
  const finalScore = Math.max(0, Math.min(100, Math.round(score)));
  const isExactMatch = hardFailures.length === 0;

  return {
    score: finalScore,
    matchRank: 1,
    isExactMatch,
    hardFailures,
    matchedRequirements,
    compromises,
    unknowns,
    scoreComponents,
    widthRemainingIn: widthRemaining,
    dataCompletenessScore: completeness,
  };
}

export function rankProducts(products: Product[], req: Requirements): ProductMatchResult[] {
  // First evaluate all products
  const evaluated: ProductMatchResult[] = products.map((product) => ({
    product,
    explainability: evaluateProduct(product, req),
  }));

  // Separate exact matches from near matches
  const exactMatches = evaluated.filter((r) => r.explainability.isExactMatch);
  const nearMatches = evaluated.filter((r) => !r.explainability.isExactMatch);

  // Sorting function adhering to decision_rules.json:
  // 1. score_desc
  // 2. compromise_count_asc
  // 3. unused_width_asc (smaller remaining clearance is preferred)
  // 4. data_completeness_desc
  // 5. model_asc
  const sortFn = (a: ProductMatchResult, b: ProductMatchResult) => {
    // 1. Score desc
    if (b.explainability.score !== a.explainability.score) {
      return b.explainability.score - a.explainability.score;
    }
    // 2. Compromises asc
    if (a.explainability.compromises.length !== b.explainability.compromises.length) {
      return a.explainability.compromises.length - b.explainability.compromises.length;
    }
    // 3. Unused width asc (closer to max width is preferred fit)
    const widthA = a.explainability.widthRemainingIn ?? 999;
    const widthB = b.explainability.widthRemainingIn ?? 999;
    if (widthA !== widthB) {
      return widthA - widthB;
    }
    // 4. Data completeness desc
    if (b.explainability.dataCompletenessScore !== a.explainability.dataCompletenessScore) {
      return b.explainability.dataCompletenessScore - a.explainability.dataCompletenessScore;
    }
    // 5. Model name asc
    return a.product.model.localeCompare(b.product.model);
  };

  exactMatches.sort(sortFn);
  nearMatches.sort(sortFn);

  const combined = [...exactMatches, ...nearMatches];
  combined.forEach((item, index) => {
    item.explainability.matchRank = index + 1;
  });

  return combined;
}
