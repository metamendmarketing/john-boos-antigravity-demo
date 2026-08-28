import { describe, it, expect } from "vitest";
import { productRepository } from "../repositories/product-repository";
import { rankProducts, evaluateProduct } from "../domain/decision-engine";
import { parseRequirementsLocally } from "../domain/requirement-parser";
import { Requirements } from "../domain/types";

describe("John Boos Intelligent Specifier - Decision Engine", () => {
  const sinks = productRepository.list("compartment_sink");

  it("Scenario 1 (Hero): 90-inch wall / 3 bay / 18in boards both sides matches 3B16204-2D18-X with 3in remaining", () => {
    const req: Requirements = {
      category: "compartment_sink",
      compartments: 3,
      maxOverallWidthIn: 90,
      drainboardSide: "both",
      drainboardLengthIn: 18,
      exactFitOnly: true,
    };

    const results = rankProducts(sinks, req);
    expect(results.length).toBeGreaterThan(0);

    const best = results[0];
    expect(best.explainability.isExactMatch).toBe(true);
    expect(best.product.model).toBe("3B16204-2D18-X");
    expect(best.product.overall.widthIn).toBe(87);
    expect(best.explainability.widthRemainingIn).toBe(3);
  });

  it("Scenario 2 (Left 18x18): 80-inch max / 18x18 bowls / left 18in board matches 3B184-1D18L-X with 4in remaining", () => {
    const req: Requirements = {
      category: "compartment_sink",
      compartments: 3,
      maxOverallWidthIn: 80,
      bowlWidthIn: 18,
      bowlFrontToBackIn: 18,
      drainboardSide: "left",
      drainboardLengthIn: 18,
      exactFitOnly: true,
    };

    const results = rankProducts(sinks, req);
    expect(results.length).toBeGreaterThan(0);

    const best = results[0];
    expect(best.explainability.isExactMatch).toBe(true);
    expect(best.product.model).toBe("3B184-1D18L-X");
    expect(best.product.overall.widthIn).toBe(76);
    expect(best.explainability.widthRemainingIn).toBe(4);
  });

  it("Scenario 3 (Too Narrow): 80-inch max with both drainboards has no exact match because 87 > 80", () => {
    const req: Requirements = {
      category: "compartment_sink",
      compartments: 3,
      maxOverallWidthIn: 80,
      drainboardSide: "both",
      exactFitOnly: true,
    };

    const results = rankProducts(sinks, req);
    const exact = results.filter((r) => r.explainability.isExactMatch);
    expect(exact.length).toBe(0);

    // Near matches should still be returned
    const near = results.filter((r) => !r.explainability.isExactMatch);
    expect(near.length).toBeGreaterThan(0);

    // Specifically verify that 3B16204-2D18-X failed due to exceeding max width
    const twoBoardModel = near.find((m) => m.product.model === "3B16204-2D18-X");
    expect(twoBoardModel).toBeDefined();
    expect(
      twoBoardModel!.explainability.hardFailures.some((f) =>
        f.includes("Exceeds maximum available wall width")
      )
    ).toBe(true);
  });

  it("Scenario 4 (Compact): Smallest 3-compartment sink with no drainboards matches 3B16204-X (53in)", () => {
    const req: Requirements = {
      category: "compartment_sink",
      compartments: 3,
      drainboardSide: "none",
      exactFitOnly: true,
    };

    const results = rankProducts(sinks, req);
    const best = results[0];
    expect(best.explainability.isExactMatch).toBe(true);
    expect(best.product.model).toBe("3B16204-X");
    expect(best.product.overall.widthIn).toBe(53);
  });
});

describe("Natural Language Requirement Parser", () => {
  it("parses hero query correctly", () => {
    const text = "I have 90 inches of wall space and need a 3 compartment sink with 18 inch drainboards on both sides.";
    const result = parseRequirementsLocally(text);

    expect(result.requirements.maxOverallWidthIn).toBe(90);
    expect(result.requirements.compartments).toBe(3);
    expect(result.requirements.drainboardSide).toBe("both");
    expect(result.requirements.drainboardLengthIn).toBe(18);
  });

  it("parses 18x18 bowls and left board", () => {
    const text = "Need a three bay sink under 80 inches, 18 x 18 bowls and a left drainboard.";
    const result = parseRequirementsLocally(text);

    expect(result.requirements.maxOverallWidthIn).toBe(80);
    expect(result.requirements.compartments).toBe(3);
    expect(result.requirements.bowlWidthIn).toBe(18);
    expect(result.requirements.bowlFrontToBackIn).toBe(18);
    expect(result.requirements.drainboardSide).toBe("left");
  });

  it("parses feet conversion (seven foot -> 84 inches)", () => {
    const text = "I have a seven foot wall for a 3 bowl sink, drainboard on the right.";
    const result = parseRequirementsLocally(text);

    expect(result.requirements.maxOverallWidthIn).toBe(84);
    expect(result.requirements.compartments).toBe(3);
    expect(result.requirements.drainboardSide).toBe("right");
  });
});
