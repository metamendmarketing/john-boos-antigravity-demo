import { z } from "zod";

export type ProductCategory =
  | "compartment_sink"
  | "work_table"
  | "filler_table"
  | "equipment_stand";

export type VerificationStatus =
  | "verified_public"
  | "partial_public"
  | "illustrative_demo";

export interface RawProductRecord {
  id: string;
  brand: string;
  model: string;
  family: string;
  category: string;
  verification_status: string;
  overall_width_in?: number | string | null;
  overall_depth_in?: number | string | null;
  overall_height_in?: number | string | null;
  compartments?: number | string | null;
  bowl_width_in?: number | string | null;
  bowl_front_to_back_in?: number | string | null;
  bowl_depth_in?: number | string | null;
  drainboard_count?: number | string | null;
  left_drainboard_in?: number | string | null;
  right_drainboard_in?: number | string | null;
  backsplash_in?: number | string | null;
  top_gauge?: number | string | null;
  stainless_type?: string | null;
  features?: string | null;
  certifications?: string | null;
  source_title: string;
  source_url: string;
  source_type: string;
  verified_on: string;
  source_notes?: string | null;
}

export interface Product {
  id: string;
  brand: string;
  model: string;
  family: string;
  category: ProductCategory;
  verificationStatus: VerificationStatus;
  overall: {
    widthIn: number | null;
    depthIn: number | null;
    heightIn: number | null;
  };
  top: {
    gauge: number | null;
    stainlessType: string | null;
  };
  sink?: {
    compartments: number | null;
    bowlWidthIn: number | null;
    bowlFrontToBackIn: number | null;
    bowlDepthIn: number | null;
    drainboardCount: number | null;
    leftDrainboardIn: number | null;
    rightDrainboardIn: number | null;
    backsplashIn: number | null;
  };
  features: string[];
  certifications: string[];
  source: {
    title: string;
    url: string;
    sourceType: string;
    verifiedOn: string;
    notes?: string;
  };
}

export type DrainboardSide = "none" | "left" | "right" | "both" | "any";

export interface Requirements {
  category: ProductCategory;
  compartments?: number | null;
  maxOverallWidthIn?: number | null;
  maxOverallDepthIn?: number | null;
  bowlWidthIn?: number | null;
  bowlFrontToBackIn?: number | null;
  bowlDepthIn?: number | null;
  drainboardSide?: DrainboardSide | null;
  drainboardLengthIn?: number | null;
  topGauge?: number | null;
  exactFitOnly?: boolean;
  freeTextContext?: string | null;
  uncertainties?: string[];
}

export interface ScoreComponent {
  name: string;
  delta: number;
  description: string;
}

export interface MatchExplainability {
  score: number;
  matchRank: number;
  isExactMatch: boolean;
  hardFailures: string[];
  matchedRequirements: string[];
  compromises: string[];
  unknowns: string[];
  scoreComponents: ScoreComponent[];
  widthRemainingIn: number | null;
  dataCompletenessScore: number;
}

export interface ProductMatchResult {
  product: Product;
  explainability: MatchExplainability;
}

export interface SavedProjectItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  notes: string;
  addedAt: string;
}
