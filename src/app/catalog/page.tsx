"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { productRepository } from "@/repositories/product-repository";
import { ProductCategory } from "@/domain/types";
import { ProductSchematicSvg } from "@/components/schematic/ProductSchematicSvg";
import { useProjectSchedule } from "@/lib/project-store";
import { useCompareList } from "@/lib/compare-store";
import {
  Layers,
  Search,
  Plus,
  Check,
  Columns2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as ProductCategory) || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const { addItem, isInProject } = useProjectSchedule();
  const { toggleCompare, isComparing } = useCompareList();

  const allProducts = useMemo(() => productRepository.list(), []);
  const categoryStats = useMemo(() => productRepository.getCategories(), []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      // Category match
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const modelMatch = p.model.toLowerCase().includes(q);
        const familyMatch = p.family.toLowerCase().includes(q);
        const featureMatch = p.features.some((f) => f.toLowerCase().includes(q));
        return modelMatch || familyMatch || featureMatch;
      }
      return true;
    });
  }, [allProducts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#f4f3ef] border border-[#d7d4c8] text-[11px] font-semibold text-[#5c5645]">
          <Layers className="w-3 h-3 text-[#a91b1b]" />
          <span>Boos Steel &amp; Commercial Truth-Set</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#1f1f1f] tracking-tight">
          Commercial Product Catalog
        </h1>
        <p className="text-xs text-[#756e5a] max-w-2xl">
          Browse all {allProducts.length} verified John Boos product records captured in the concept demonstration dataset.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5e5e2]">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-2 rounded-lg font-bold transition-all ${
              selectedCategory === "all"
                ? "bg-[#1f1f1f] text-white shadow-xs"
                : "bg-white text-[#5c5645] hover:text-[#1f1f1f] border border-[#d7d4c8]"
            }`}
          >
            All Products ({allProducts.length})
          </button>

          {categoryStats.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-3.5 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === cat.category
                  ? "bg-[#1f1f1f] text-white shadow-xs"
                  : "bg-white text-[#5c5645] hover:text-[#1f1f1f] border border-[#d7d4c8]"
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#756e5a] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by model code..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-[#d7d4c8] text-[#1f1f1f] placeholder-[#948d77] text-xs focus:ring-2 focus:ring-[#a91b1b] focus:outline-none font-medium"
          />
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => {
          const inProject = isInProject(p.id);
          const comparing = isComparing(p.model);
          const isSink = p.category === "compartment_sink";

          return (
            <div
              key={p.id}
              className="bg-white border border-[#e5e5e2] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#b8b3a0] transition-all"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-[#f4f3ef] text-[#5c5645] text-[10px] font-mono font-bold capitalize">
                    {p.category.replace("_", " ")}
                  </span>
                  <span className="flex items-center text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" />
                    Verified
                  </span>
                </div>

                <div>
                  <Link
                    href={`/products/${encodeURIComponent(p.model)}`}
                    className="font-mono font-bold text-lg text-[#1f1f1f] hover:text-[#a91b1b] transition-colors block"
                  >
                    {p.model}
                  </Link>
                  <p className="text-xs text-[#756e5a] font-medium">{p.family}</p>
                </div>

                {/* Schematic */}
                <ProductSchematicSvg product={p} className="w-full h-auto max-h-36" showLabels={false} />

                {/* Specs List */}
                <div className="p-3 rounded-xl bg-[#f4f3ef] border border-[#e5e5e2] text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#756e5a] font-medium">Dimensions:</span>
                    <span className="font-mono font-bold text-[#1f1f1f]">
                      {p.overall.widthIn}&quot;W x {p.overall.depthIn}&quot;D
                    </span>
                  </div>

                  {isSink && p.sink && (
                    <div className="flex justify-between">
                      <span className="text-[#756e5a] font-medium">Drainboards:</span>
                      <span className="font-bold text-[#1f1f1f]">
                        {p.sink.drainboardCount === 0
                          ? "None"
                          : p.sink.drainboardCount === 2
                          ? `Two (${p.sink.leftDrainboardIn}")`
                          : `One (${p.sink.leftDrainboardIn ? "Left" : "Right"})`}
                      </span>
                    </div>
                  )}

                  {p.top.gauge && (
                    <div className="flex justify-between">
                      <span className="text-[#756e5a] font-medium">Top Gauge:</span>
                      <span className="font-mono font-bold text-[#1f1f1f]">
                        {p.top.gauge}GA Stainless
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#e5e5e2] flex items-center justify-between gap-2">
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => addItem(p, 1)}
                    className={`p-2 rounded-lg text-xs font-bold flex items-center transition-all ${
                      inProject
                        ? "bg-[#f4f3ef] text-emerald-800 border border-emerald-300"
                        : "bg-[#a91b1b] hover:bg-[#8b1515] text-white shadow-2xs"
                    }`}
                    title={inProject ? "In Project" : "Add to Project Schedule"}
                  >
                    {inProject ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => toggleCompare(p.model)}
                    className={`p-2 rounded-lg text-xs font-semibold border transition-colors ${
                      comparing
                        ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                        : "bg-white hover:bg-[#f4f3ef] text-[#5c5645] border-[#d7d4c8]"
                    }`}
                    title={comparing ? "Remove from Compare" : "Add to Compare"}
                  >
                    <Columns2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Link
                  href={`/products/${encodeURIComponent(p.model)}`}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-[#1f1f1f] hover:text-[#a91b1b] transition-colors"
                >
                  <span>Specs</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#a91b1b]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-[#756e5a]">Loading catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
