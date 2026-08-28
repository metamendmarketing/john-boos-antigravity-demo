"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { productRepository } from "@/repositories/product-repository";
import { ProductSchematicSvg } from "@/components/schematic/ProductSchematicSvg";
import { ProductSpecTable } from "@/components/product/ProductSpecTable";
import { SourceEvidenceDrawer } from "@/components/product/SourceEvidenceDrawer";
import { useProjectSchedule } from "@/lib/project-store";
import { useCompareList } from "@/lib/compare-store";
import {
  ArrowLeft,
  Plus,
  Check,
  Columns2,
  ExternalLink,
  ShieldCheck,
  FileCode,
  Layers,
  Box,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawModel = (params?.model as string) || "";
  const model = decodeURIComponent(rawModel);

  const product = productRepository.getByModel(model);
  const { addItem, isInProject } = useProjectSchedule();
  const { toggleCompare, isComparing } = useCompareList();

  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <h1 className="text-2xl font-serif font-bold text-[#1f1f1f]">Product Not Found</h1>
        <p className="text-xs text-[#756e5a]">
          The model &quot;{model}&quot; does not exist in the concept demonstration truth-set.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#a91b1b] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const inProject = isInProject(product.id);
  const comparing = isComparing(product.model);

  const handleAdd = () => {
    addItem(product, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Back link */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#756e5a] hover:text-[#1f1f1f] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Results / Catalog</span>
        </button>
      </div>

      {/* Header Profile */}
      <div className="bg-white border border-[#e5e5e2] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#f4f3ef] text-[#5c5645] border border-[#e5e5e2] text-xs font-mono font-bold capitalize">
              {product.category.replace("_", " ")}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Public Truth-Set</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#1f1f1f] tracking-tight font-mono">
            {product.model}
          </h1>
          <p className="text-sm text-[#756e5a] font-sans font-medium">
            {product.brand} &bull; {product.family}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleAdd}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-sm ${
              inProject
                ? "bg-[#f4f3ef] text-emerald-800 border border-emerald-300"
                : "bg-[#a91b1b] hover:bg-[#8b1515] text-white"
            }`}
          >
            {inProject ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{addedNotice ? "Added to Schedule!" : inProject ? "Saved in Project" : "Add to Project Schedule"}</span>
          </button>

          <button
            onClick={() => toggleCompare(product.model)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors flex items-center space-x-2 ${
              comparing
                ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                : "bg-white hover:bg-[#f4f3ef] text-[#474235] border-[#d7d4c8]"
            }`}
          >
            <Columns2 className="w-4 h-4" />
            <span>{comparing ? "In Compare Tray" : "Compare Model"}</span>
          </button>
        </div>
      </div>

      {/* Visual Technical Schematic Section */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f] flex items-center space-x-1.5">
          <Box className="w-4 h-4 text-[#a91b1b]" />
          <span>Dynamic Dimensioned Schematic Drawing</span>
        </h2>

        <ProductSchematicSvg product={product} className="w-full h-auto max-h-72" />
      </div>

      {/* Specifications Table */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f] flex items-center space-x-1.5">
          <Layers className="w-4 h-4 text-[#a91b1b]" />
          <span>Structured Technical Specifications</span>
        </h2>

        <ProductSpecTable product={product} />
      </div>

      {/* Source Provenance */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f] flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Public Source Provenance &amp; Literature Citation</span>
        </h2>

        <SourceEvidenceDrawer product={product} />
      </div>

      {/* Technical Assets / KCL CAD Handoff Callout */}
      <div className="rounded-2xl bg-[#f4f3ef] border border-[#e5e5e2] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[#1f1f1f] font-serif font-bold text-base">
            <FileCode className="w-5 h-5 text-[#a91b1b]" />
            <span>Technical Files / CAD / Revit BIM Assets</span>
          </div>
          <p className="text-xs text-[#5c5645] max-w-xl leading-relaxed">
            In a production integration, this action connects directly to John Boos’s KCL CAD model library and Revit family downloads.
          </p>
        </div>

        <a
          href="https://johnboos.kclcad.com/app/I108920834#models"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#1f1f1f] hover:bg-[#121212] text-white font-bold text-xs transition-colors flex-shrink-0"
        >
          <span>Open in KCL Model Library</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
        </a>
      </div>

      <div className="text-center text-[11px] text-[#756e5a] italic pt-2">
        Verify final specifications with the manufacturer before ordering or fabrication.
      </div>
    </div>
  );
}
