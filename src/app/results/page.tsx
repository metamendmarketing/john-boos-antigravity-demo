"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { productRepository } from "@/repositories/product-repository";
import { parseRequirementsLocally } from "@/domain/requirement-parser";
import { rankProducts } from "@/domain/decision-engine";
import { Requirements, ProductMatchResult, ProductCategory, DrainboardSide } from "@/domain/types";
import { ParsedRequirementChips } from "@/components/results/ParsedRequirementChips";
import { ProductMatchCard } from "@/components/results/ProductMatchCard";
import { useCompareList } from "@/lib/compare-store";
import {
  Sparkles,
  AlertCircle,
  SlidersHorizontal,
  ArrowRight,
  Columns2,
  CheckCircle2,
} from "lucide-react";

function ResultsContent() {
  const searchParams = useSearchParams();

  // Extract initial parameters
  const q = searchParams.get("q");
  const catParam = (searchParams.get("category") as ProductCategory) || "compartment_sink";
  const compParam = searchParams.get("compartments");
  const maxWParam = searchParams.get("maxOverallWidthIn");
  const dbSideParam = searchParams.get("drainboardSide") as DrainboardSide;
  const dbLenParam = searchParams.get("drainboardLengthIn");
  const bwParam = searchParams.get("bowlWidthIn");
  const bfParam = searchParams.get("bowlFrontToBackIn");
  const exactParam = searchParams.get("exactFitOnly");

  // State
  const [requirements, setRequirements] = useState<Requirements>(() => {
    if (q) {
      const parsed = parseRequirementsLocally(q);
      return parsed.requirements;
    }
    return {
      category: catParam,
      compartments: compParam ? parseInt(compParam) : 3,
      maxOverallWidthIn: maxWParam ? parseFloat(maxWParam) : null,
      drainboardSide: dbSideParam || null,
      drainboardLengthIn: dbLenParam ? parseFloat(dbLenParam) : null,
      bowlWidthIn: bwParam ? parseFloat(bwParam) : null,
      bowlFrontToBackIn: bfParam ? parseFloat(bfParam) : null,
      exactFitOnly: exactParam !== "false",
      freeTextContext: q || null,
    };
  });

  const { compareModels, compareCount } = useCompareList();

  // Re-parse if search query changes in URL
  useEffect(() => {
    if (q) {
      const parsed = parseRequirementsLocally(q);
      setRequirements(parsed.requirements);
    }
  }, [q]);

  // Evaluate matches
  const allProducts = useMemo(() => productRepository.list(requirements.category), [requirements.category]);
  const matchResults = useMemo(() => rankProducts(allProducts, requirements), [allProducts, requirements]);

  const exactMatches = matchResults.filter((m) => m.explainability.isExactMatch);
  const nearMatches = matchResults.filter((m) => !m.explainability.isExactMatch);

  const bestMatch = exactMatches.length > 0 ? exactMatches[0] : null;
  const alternatives = exactMatches.slice(1, 3);
  const displayedNearMatches = nearMatches.slice(0, 3);

  return (
    <div className="space-y-8 py-4">
      {/* Top Banner / Requirement Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#f4f3ef] border border-[#d7d4c8] text-[11px] font-semibold text-[#5c5645] mb-1">
              <Sparkles className="w-3 h-3 text-[#a91b1b]" />
              <span>Deterministic Recommendation Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#1f1f1f] tracking-tight">
              Product Fit Recommendations
            </h1>
          </div>

          <Link
            href="/configure"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg bg-[#1f1f1f] hover:bg-[#121212] text-white text-xs font-semibold transition-colors self-start sm:self-auto shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-300" />
            <span>Open Guided Configurator</span>
          </Link>
        </div>

        {/* Editable Requirement Chips */}
        <ParsedRequirementChips
          requirements={requirements}
          onUpdate={(updated) => setRequirements(updated)}
          isFallback={true}
        />
      </div>

      {/* Main Results Section */}
      {exactMatches.length > 0 ? (
        <div className="space-y-8">
          {/* Hero Best Match */}
          {bestMatch && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Primary Recommendation ({exactMatches.length} exact fits found)</span>
                </h2>
                {requirements.maxOverallWidthIn && bestMatch.explainability.widthRemainingIn !== null && (
                  <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    {bestMatch.explainability.widthRemainingIn}&quot; Remaining Clearance
                  </span>
                )}
              </div>

              <ProductMatchCard
                match={bestMatch}
                requirements={requirements}
                isBest={true}
              />
            </div>
          )}

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-[#e5e5e2]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f]">
                Alternative Compatible Configurations ({alternatives.length})
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {alternatives.map((alt) => (
                  <ProductMatchCard
                    key={alt.product.id}
                    match={alt}
                    requirements={requirements}
                    isBest={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty / No Exact Match State */
        <div className="space-y-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 flex-shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-serif font-bold text-amber-950 tracking-tight">
                  No exact product in the demo dataset meets all constraints.
                </h2>
                <p className="text-xs text-amber-900/90 leading-relaxed max-w-2xl">
                  {requirements.maxOverallWidthIn
                    ? `None of the verified models with the requested configuration fit strictly within the ${requirements.maxOverallWidthIn}-inch space limit.`
                    : "No verified model matches all requested attributes."}{" "}
                  Below are the closest alternative models with highlighted compromises.
                </p>
              </div>
            </div>
          </div>

          {/* Closest Near Matches */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f]">
              Closest Available Options in Truth-Set ({displayedNearMatches.length})
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {displayedNearMatches.map((near) => (
                <ProductMatchCard
                  key={near.product.id}
                  match={near}
                  requirements={requirements}
                  isBest={false}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Compare Tray Notification */}
      {compareCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40 bg-[#1f1f1f] text-white border border-zinc-700 rounded-2xl p-4 shadow-2xl flex items-center space-x-4">
          <div>
            <span className="text-xs font-bold text-white block">
              {compareCount} Model{compareCount > 1 ? "s" : ""} Selected
            </span>
            <span className="text-[11px] text-zinc-400">
              Ready for side-by-side spec comparison
            </span>
          </div>

          <Link
            href="/compare"
            className="px-4 py-2 rounded-lg bg-[#a91b1b] hover:bg-[#8b1515] text-white text-xs font-bold flex items-center space-x-1.5 transition-colors shadow"
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span>Open Compare ({compareCount})</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-[#756e5a]">Loading recommendations...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
