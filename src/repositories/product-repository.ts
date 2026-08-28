import productsData from "../../data/verified_public_products.json";
import { Product, RawProductRecord, ProductCategory, VerificationStatus } from "../domain/types";

function parseNum(val: number | string | null | undefined): number | null {
  if (val === null || val === undefined || val === "") return null;
  const n = typeof val === "number" ? val : parseFloat(String(val).trim());
  return isNaN(n) ? null : n;
}

function parseFeatures(featuresStr?: string | null): string[] {
  if (!featuresStr || !featuresStr.trim()) return [];
  return featuresStr
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseCertifications(certsStr?: string | null): string[] {
  if (!certsStr || !certsStr.trim()) return [];
  return certsStr
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function normalizeProduct(raw: RawProductRecord): Product {
  const category = raw.category as ProductCategory;
  const isSink = category === "compartment_sink";

  return {
    id: raw.id,
    brand: raw.brand || "John Boos",
    model: raw.model,
    family: raw.family,
    category,
    verificationStatus: (raw.verification_status || "verified_public") as VerificationStatus,
    overall: {
      widthIn: parseNum(raw.overall_width_in),
      depthIn: parseNum(raw.overall_depth_in),
      heightIn: parseNum(raw.overall_height_in),
    },
    top: {
      gauge: parseNum(raw.top_gauge),
      stainlessType: raw.stainless_type && raw.stainless_type.trim() ? raw.stainless_type.trim() : null,
    },
    sink: isSink
      ? {
          compartments: parseNum(raw.compartments),
          bowlWidthIn: parseNum(raw.bowl_width_in),
          bowlFrontToBackIn: parseNum(raw.bowl_front_to_back_in),
          bowlDepthIn: parseNum(raw.bowl_depth_in),
          drainboardCount: parseNum(raw.drainboard_count),
          leftDrainboardIn: parseNum(raw.left_drainboard_in),
          rightDrainboardIn: parseNum(raw.right_drainboard_in),
          backsplashIn: parseNum(raw.backsplash_in),
        }
      : undefined,
    features: parseFeatures(raw.features),
    certifications: parseCertifications(raw.certifications),
    source: {
      title: raw.source_title,
      url: raw.source_url,
      sourceType: raw.source_type,
      verifiedOn: raw.verified_on,
      notes: raw.source_notes || undefined,
    },
  };
}

class ProductRepository {
  private products: Product[];

  constructor() {
    this.products = (productsData as unknown as RawProductRecord[]).map(normalizeProduct);
  }

  list(category?: ProductCategory): Product[] {
    if (!category) return [...this.products];
    return this.products.filter((p) => p.category === category);
  }

  getByModel(model: string): Product | null {
    const clean = model.trim().toLowerCase();
    return this.products.find((p) => p.model.toLowerCase() === clean) || null;
  }

  getById(id: string): Product | null {
    return this.products.find((p) => p.id === id) || null;
  }

  getCategories(): { category: ProductCategory; name: string; count: number; description: string }[] {
    const categoryInfo: Record<ProductCategory, { name: string; description: string }> = {
      compartment_sink: {
        name: "Compartment Sinks",
        description: "B-Series 3-compartment commercial sinks with optional drainboard configurations.",
      },
      work_table: {
        name: "Work Tables",
        description: "Stainless Cucina Classico, JNS wood-top, and FBLG / UFBLG economy work tables.",
      },
      filler_table: {
        name: "Filler Tables",
        description: "EFT8 series narrow stainless filler tables with stallion edges.",
      },
      equipment_stand: {
        name: "Equipment Stands",
        description: "EES8 series commercial equipment stands with 1.5 in turned-up edges.",
      },
    };

    const categories: ProductCategory[] = [
      "compartment_sink",
      "work_table",
      "filler_table",
      "equipment_stand",
    ];

    return categories.map((cat) => {
      const count = this.products.filter((p) => p.category === cat).length;
      return {
        category: cat,
        name: categoryInfo[cat].name,
        description: categoryInfo[cat].description,
        count,
      };
    });
  }
}

export const productRepository = new ProductRepository();
