import { describe, it, expect } from "vitest";
import { productRepository } from "../repositories/product-repository";

describe("Catalog Data Integrity Tests (Full 139 Products)", () => {
  const allProducts = productRepository.list();

  it("loads 139 total verified products", () => {
    expect(allProducts.length).toBe(139);
  });

  it("all products have unique IDs and unique models", () => {
    const ids = new Set(allProducts.map((p) => p.id));
    const models = new Set(allProducts.map((p) => p.model.toLowerCase()));
    expect(ids.size).toBe(allProducts.length);
    expect(models.size).toBe(allProducts.length);
  });

  it("all products have valid positive dimensions", () => {
    allProducts.forEach((p) => {
      expect(p.overall.widthIn).toBeGreaterThan(0);
      expect(p.overall.depthIn).toBeGreaterThan(0);
      expect(p.overall.heightIn).toBeGreaterThan(0);
    });
  });

  it("all compartment sinks have valid compartments and bowl dimensions", () => {
    const sinks = productRepository.list("compartment_sink");
    expect(sinks.length).toBe(68);
    sinks.forEach((s) => {
      expect(s.sink).toBeDefined();
      expect(s.sink?.compartments).toBeGreaterThanOrEqual(1);
      expect(s.sink?.bowlWidthIn).toBeGreaterThanOrEqual(10);
      expect(s.sink?.bowlFrontToBackIn).toBeGreaterThanOrEqual(10);
    });
  });

  it("all work tables load properly", () => {
    const tables = productRepository.list("work_table");
    expect(tables.length).toBe(54);
  });

  it("all filler tables load properly", () => {
    const fillers = productRepository.list("filler_table");
    expect(fillers.length).toBe(8);
  });

  it("all equipment stands load properly", () => {
    const stands = productRepository.list("equipment_stand");
    expect(stands.length).toBe(9);
  });
});
