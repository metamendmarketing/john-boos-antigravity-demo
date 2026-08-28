"use client";

import React from "react";
import Link from "next/link";
import { productRepository } from "@/repositories/product-repository";
import { useCompareList } from "@/lib/compare-store";
import { useProjectSchedule } from "@/lib/project-store";
import { ProductSchematicSvg } from "@/components/schematic/ProductSchematicSvg";
import { formatDimension, formatGauge } from "@/lib/utils";
import {
  Columns2,
  Trash2,
  Plus,
  Check,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function ComparePage() {
  const { compareModels, toggleCompare, clearCompare } = useCompareList();
  const { addItem, isInProject } = useProjectSchedule();

  const products = compareModels
    .map((model) => productRepository.getByModel(model))
    .filter(Boolean) as ReturnType<typeof productRepository.list>;

  if (products.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#f4f3ef] border border-[#e5e5e2] flex items-center justify-center mx-auto text-[#756e5a]">
          <Columns2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-serif font-bold text-[#1f1f1f]">Compare Tray Empty</h1>
          <p className="text-xs text-[#756e5a] max-w-md mx-auto leading-relaxed">
            Select up to 3 products from search results or the catalog to compare their specifications side by side.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Link
            href="/catalog"
            className="px-5 py-2.5 rounded-lg bg-[#a91b1b] hover:bg-[#8b1515] text-white font-bold text-xs transition-colors"
          >
            Browse Catalog
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg bg-white hover:bg-[#f4f3ef] text-[#1f1f1f] font-semibold text-xs border border-[#d7d4c8] transition-colors"
          >
            Launch Specifier
          </Link>
        </div>
      </div>
    );
  }

  const renderVal = (val: string | number | null | undefined, unit = "in") => {
    if (val === null || val === undefined || val === "") {
      return <span className="text-[#948d77] italic text-[11px]">Not included in demo data</span>;
    }
    return <span className="font-mono text-[#1f1f1f] font-bold">{typeof val === "number" ? `${val} ${unit}` : val}</span>;
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#f4f3ef] border border-[#d7d4c8] text-[11px] font-semibold text-[#5c5645] mb-1">
            <Columns2 className="w-3 h-3 text-[#a91b1b]" />
            <span>Side-by-Side Comparison</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#1f1f1f] tracking-tight">
            Specification Comparison Matrix
          </h1>
          <p className="text-xs text-[#756e5a]">
            Comparing {products.length} selected model{products.length > 1 ? "s" : ""} (Max 3)
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={clearCompare}
            className="px-3.5 py-2 rounded-lg border border-[#d7d4c8] bg-white hover:bg-[#f4f3ef] text-[#5c5645] hover:text-[#1f1f1f] text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Tray</span>
          </button>

          <Link
            href="/catalog"
            className="px-4 py-2 rounded-lg bg-[#1f1f1f] hover:bg-[#121212] text-white text-xs font-bold transition-colors"
          >
            Add More Models
          </Link>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px] border border-[#e5e5e2] rounded-2xl bg-white shadow-xs overflow-hidden">
          {/* Header Row: Schematics & Models */}
          <div className={`grid grid-cols-${products.length + 1} divide-x divide-[#e5e5e2] border-b border-[#e5e5e2] bg-[#fbfaf8]`}>
            <div className="p-5 flex items-center justify-center font-bold text-xs uppercase tracking-wider text-[#756e5a]">
              Product Overview
            </div>
            {products.map((p) => {
              const inProject = isInProject(p.id);
              return (
                <div key={p.id} className="p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-[#f4f3ef] text-[#5c5645] text-[10px] font-mono font-bold capitalize">
                        {p.category.replace("_", " ")}
                      </span>
                      <button
                        onClick={() => toggleCompare(p.model)}
                        title="Remove"
                        className="text-[#948d77] hover:text-[#a91b1b] p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <Link
                      href={`/products/${encodeURIComponent(p.model)}`}
                      className="font-mono font-bold text-lg text-[#1f1f1f] hover:text-[#a91b1b] block transition-colors"
                    >
                      {p.model}
                    </Link>
                    <p className="text-[11px] text-[#756e5a] font-medium">{p.family}</p>
                  </div>

                  <ProductSchematicSvg product={p} className="w-full h-auto max-h-36" showLabels={false} />

                  <button
                    onClick={() => addItem(p, 1)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                      inProject
                        ? "bg-[#f4f3ef] text-emerald-800 border border-emerald-300"
                        : "bg-[#a91b1b] hover:bg-[#8b1515] text-white shadow-xs"
                    }`}
                  >
                    {inProject ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{inProject ? "In Project Schedule" : "Add to Project Schedule"}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Data Rows */}
          <div className="divide-y divide-[#e5e5e2] text-xs">
            {/* Overall Width */}
            <div className={`grid grid-cols-${products.length + 1} divide-x divide-[#e5e5e2] p-4 bg-white`}>
              <div className="font-bold text-[#1f1f1f]">Overall Width</div>
              {products.map((p) => (
                <div key={p.id} className="pl-4">{renderVal(p.overall.widthIn)}</div>
              ))}
            </div>

            {/* Overall Depth */}
            <div className={`grid grid-cols-${products.length + 1} divide-x divide-[#e5e5e2] p-4 bg-[#fbfaf8]`}>
              <div className="font-bold text-[#1f1f1f]">Overall Depth</div>
              {products.map((p) => (
                <div key={p.id} className="pl-4">{renderVal(p.overall.depthIn)}</div>
              ))}
            </div>

            {/* Height */}
            <div className={`grid grid-cols-${products.length + 1} divide-x divide-[#e5e5e2] p-4 bg-white`}>
              <div className="font-bold text-[#1f1f1f]">Working Height</div>
              {products.map((p) => (
                <div key={p.id} className="pl-4">{renderVal(p.overall.heightIn)}</div>
              ))}
            </div>

            {/* Compartments */}
            <div className={`grid grid-cols-${products.length + 1} divide-x divide-[#e5e5e2] p-4 bg-[#fbfaf8]`}>
              <div className="font-bold text-[#1f1f1f]">Compartments</div>
              {products.map((p) => (
                <div key={p.id} className="pl-4">
                  {p.sink ? renderVal(p.sink.compartments, "Bay") : <span className="text-[#948d77]">N/A</span>}
                </div>
              ))}
            </div>

            {/* Bowl Dimensions */}
            <div className={`grid grid-cols-${products.length + 1} divide-x divide-[#e5e5e2] p-4 bg-white`}>
              <div className="font-bold text-[#1f1f1f]">Bowl Dimensions (WxDxD)</div>
              {products.map((p) => (
                <div key={p.id} className="pl-4">
                  {p.sink?.bowlWidthIn
                    ? `${p.sink.bowlWidthIn}" x ${p.sink.bowlFrontToBackIn}" x ${p.sink.bowlDepthIn}"`
                    : <span className="text-[#948d77]">N/A</span>}
                </div>
              ))}
            </div>

            {/* Drainboards */}
            <div className={`grid grid-cols-${products.length + 1} divide-x divide-[#e5e5e2] p-4 bg-[#fbfaf8]`}>
              <div className="font-bold text-[#1f1f1f]">Drainboard Layout</div>
              {products.map((p) => (
                <div key={p.id} className="pl-4 font-semibold text-[#1f1f1f]">
                  {p.sink
                    ? p.sink.drainboardCount === 2
                      ? `Both (2 @ ${p.sink.leftDrainboardIn}")`
                      : p.sink.drainboardCount === 1
                      ? `One (${p.sink.leftDrainboardIn ? "Left" : "Right"} @ ${p.sink.leftDrainboardIn || p.sink.rightDrainboardIn}")`
                      : "None"
                    : "N/A"}
                </div>
              ))}
            </div>

            {/* Stainless Top Gauge */}
            <div className={`grid grid-cols-${products.length + 1} divide-x divide-[#e5e5e2] p-4 bg-white`}>
              <div className="font-bold text-[#1f1f1f]">Stainless Top Gauge</div>
              {products.map((p) => (
                <div key={p.id} className="pl-4">
                  {p.top.gauge ? `${formatGauge(p.top.gauge)} (${p.top.stainlessType || ""})` : renderVal(null)}
                </div>
              ))}
            </div>

            {/* Backsplash */}
            <div className={`grid grid-cols-${products.length + 1} divide-x divide-[#e5e5e2] p-4 bg-[#fbfaf8]`}>
              <div className="font-bold text-[#1f1f1f]">Backsplash Height</div>
              {products.map((p) => (
                <div key={p.id} className="pl-4">{renderVal(p.sink?.backsplashIn)}</div>
              ))}
            </div>

            {/* Certifications */}
            <div className={`grid grid-cols-${products.length + 1} divide-x divide-[#e5e5e2] p-4 bg-white`}>
              <div className="font-bold text-[#1f1f1f]">Certifications</div>
              {products.map((p) => (
                <div key={p.id} className="pl-4">
                  {p.certifications.length > 0
                    ? p.certifications.join(", ")
                    : <span className="text-[#948d77] italic">Not included in demo data</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
