# 07 — Data Model

## Product
```ts
type Product = {
  id: string;
  brand: string;
  model: string;
  family: string;
  category: 'compartment_sink' | 'work_table' | 'filler_table' | 'equipment_stand';
  verificationStatus: 'verified_public' | 'partial_public' | 'illustrative_demo';
  overall: {
    widthIn?: number | null;
    depthIn?: number | null;
    heightIn?: number | null;
  };
  top?: {
    gauge?: number | null;
    stainlessType?: string | null;
  };
  sink?: {
    compartments?: number | null;
    bowlWidthIn?: number | null;
    bowlFrontToBackIn?: number | null;
    bowlDepthIn?: number | null;
    drainboardCount?: number | null;
    leftDrainboardIn?: number | null;
    rightDrainboardIn?: number | null;
    backsplashIn?: number | null;
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
```

## Requirement
```ts
type Requirements = {
  category: string;
  compartments?: number;
  maxOverallWidthIn?: number;
  maxOverallDepthIn?: number;
  bowlWidthIn?: number;
  bowlFrontToBackIn?: number;
  bowlDepthIn?: number;
  drainboardSide?: 'none' | 'left' | 'right' | 'both' | 'any';
  drainboardLengthIn?: number;
  exactFitOnly?: boolean;
  freeTextContext?: string;
}
```

## Provenance
Provenance is part of the data model, not an afterthought. The UI should never need to guess whether a field was verified.
