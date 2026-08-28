"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductMatchResult, Requirements } from "@/domain/types";
import { ProductSchematicSvg } from "../schematic/ProductSchematicSvg";
import { WidthClearanceMeter } from "./WidthClearanceMeter";
import { SourceEvidenceDrawer } from "../product/SourceEvidenceDrawer";
import { useProjectSchedule } from "@/lib/project-store";
import { useCompareList } from "@/lib/compare-store";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  Check,
  Columns2,
  ChevronRight,
  Award,
} from "lucide-react";

interface ProductMatchCardProps {
  match: ProductMatchResult;
  requirements: Requirements;
  isBest?: boolean;
}

export const ProductMatchCard: React.FC<ProductMatchCardProps> = ({
  match,
  requirements,
  isBest = false,
}) => {
  const { product, explainability } = match;
  const { addItem, isInProject } = useProjectSchedule();
  const { toggleCompare, isComparing } = useCompareList();

  const [addedNotice, setAddedNotice] = useState(false);

  const inProject = isInProject(product.id);
  const comparing = isComparing(product.model);

  const handleAddProject = () => {
    addItem(product, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const getRankBadge = () => {
    if (explainability.matchRank === 1 && explainability.isExactMatch) {
      return (
        <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-1 shadow-2xs">
          <Award className="w-3.5 h-3.5 text-emerald-700" />
          <span>Best Exact Fit</span>
        </span>
      );
    }
    if (explainability.isExactMatch) {
      return (
        <span className="px-2.5 py-1 rounded-md bg-[#f4f3ef] text-[#1f1f1f] border border-[#d7d4c8] text-xs font-semibold uppercase tracking-wider">
          Alternative #{explainability.matchRank}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-300 text-xs font-semibold uppercase tracking-wider flex items-center space-x-1">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
        <span>Near Match #{explainability.matchRank}</span>
      </span>
    );
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white shadow-xs ${
        isBest
          ? "border-2 border-[#a91b1b] ring-4 ring-[#a91b1b]/10 shadow-md"
          : "border-[#e5e5e2] hover:border-[#b8b3a0]"
      }`}
    >
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-[#e5e5e2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#fbfaf8]">
        <div className="flex items-center space-x-3">
          {getRankBadge()}
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-[#1f1f1f] tracking-tight font-mono">
                {product.model}
              </h3>
              <span className="text-xs text-[#756e5a] font-sans hidden sm:inline">
                ({product.family})
              </span>
            </div>
          </div>
        </div>

        {/* Score indicator */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] uppercase font-semibold text-[#756e5a] block -mb-0.5">
              Fit Score
            </span>
            <span
              className={`font-mono text-base font-black ${
                explainability.score >= 90
                  ? "text-emerald-700"
                  : explainability.score >= 70
                  ? "text-amber-700"
                  : "text-red-700"
              }`}
            >
              {explainability.score}
              <span className="text-xs font-normal text-[#948d77]">/100</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Schematic Diagram (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <ProductSchematicSvg product={product} />

          <WidthClearanceMeter
            productWidth={product.overall.widthIn}
            maxWallWidth={requirements.maxOverallWidthIn}
          />
        </div>

        {/* Right: Fit Explanation & Specs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Quick Specs Grid */}
            <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-[#f4f3ef] border border-[#e5e5e2] text-xs">
              <div>
                <span className="text-[#756e5a] block text-[10px] uppercase font-semibold">Overall Size</span>
                <span className="font-mono text-[#1f1f1f] font-bold">
                  {product.overall.widthIn}&quot; x {product.overall.depthIn}&quot;
                </span>
              </div>
              <div>
                <span className="text-[#756e5a] block text-[10px] uppercase font-semibold">Bowls</span>
                <span className="font-mono text-[#1f1f1f] font-bold">
                  {product.sink?.bowlWidthIn && product.sink?.bowlFrontToBackIn
                    ? `3 @ ${product.sink.bowlWidthIn}x${product.sink.bowlFrontToBackIn}"`
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="text-[#756e5a] block text-[10px] uppercase font-semibold">Drainboards</span>
                <span className="font-mono text-[#1f1f1f] font-bold">
                  {product.sink?.drainboardCount === 0
                    ? "None"
                    : product.sink?.drainboardCount === 2
                    ? `Two @ ${product.sink.leftDrainboardIn}"`
                    : `One (${product.sink?.leftDrainboardIn ? "L" : "R"})`}
                </span>
              </div>
            </div>

            {/* Why This Fits */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f] mb-2 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Deterministic Fit Rationale</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#474235]">
                {explainability.matchedRequirements.map((m, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compromises / Hard failures */}
            {explainability.compromises.length > 0 && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                <span className="font-semibold text-amber-900 flex items-center space-x-1 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Compromises from Request:</span>
                </span>
                <ul className="space-y-1 text-amber-900/90 pl-4 list-disc text-[11px]">
                  {explainability.compromises.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {explainability.hardFailures.length > 0 && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs">
                <span className="font-semibold text-red-900 flex items-center space-x-1 mb-1">
                  <XCircle className="w-4 h-4 text-red-700" />
                  <span>Physical Space / Hard Conflict:</span>
                </span>
                <ul className="space-y-1 text-red-900/90 pl-4 list-disc text-[11px]">
                  {explainability.hardFailures.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-[#e5e5e2] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAddProject}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-xs ${
                  inProject
                    ? "bg-[#f4f3ef] text-emerald-800 border border-emerald-300"
                    : "bg-[#a91b1b] hover:bg-[#8b1515] text-white shadow-sm"
                }`}
              >
                {inProject ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                <span>{addedNotice ? "Added to Schedule!" : inProject ? "Saved in Project" : "Add to Project"}</span>
              </button>

              <button
                onClick={() => toggleCompare(product.model)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors flex items-center space-x-1.5 ${
                  comparing
                    ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                    : "bg-white hover:bg-[#f4f3ef] text-[#474235] border-[#d7d4c8]"
                }`}
              >
                <Columns2 className="w-3.5 h-3.5" />
                <span>{comparing ? "In Compare Tray" : "Compare"}</span>
              </button>
            </div>

            <Link
              href={`/products/${encodeURIComponent(product.model)}`}
              className="inline-flex items-center space-x-1 text-xs font-bold text-[#1f1f1f] hover:text-[#a91b1b] transition-colors"
            >
              <span>Full Specifications</span>
              <ChevronRight className="w-4 h-4 text-[#a91b1b]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Expandable Source Evidence Bar */}
      <div className="border-t border-[#e5e5e2] bg-[#fbfaf8] px-6 py-3">
        <SourceEvidenceDrawer product={product} />
      </div>
    </div>
  );
};
