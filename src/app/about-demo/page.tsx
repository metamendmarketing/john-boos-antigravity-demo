import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function AboutDemoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-4 text-[#474235]">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#f4f3ef] border border-[#d7d4c8] text-xs font-semibold text-[#5c5645]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Concept Demonstration Brief</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1f1f1f] tracking-tight">
          About the John Boos Intelligent Specifier
        </h1>
        <p className="text-base text-[#5c5645] leading-relaxed max-w-2xl">
          A concept demonstration proving the business and operational value of an intelligent product decision layer for commercial kitchen equipment.
        </p>
      </div>

      {/* The Thesis */}
      <div className="bg-white border border-[#e5e5e2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-serif font-bold text-[#1f1f1f] tracking-tight flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-[#a91b1b]" />
          <span>The Business Thesis</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#5c5645] leading-relaxed">
          Manufacturers possess deep product catalogs, CAD/BIM libraries on platforms like KCL, and traditional PDF price books. However, commercial kitchen buyers, consultants, and dealer reps frequently struggle with model configuration complexity:
        </p>
        <blockquote className="p-5 rounded-xl bg-[#f4f3ef] border-l-4 border-[#a91b1b] text-[#1f1f1f] text-sm italic font-serif leading-relaxed">
          &ldquo;Instead of expecting a customer or dealer to memorize complex John Boos model numbering, we can ask what space and operations they are designing for and guide them directly to the right product record.&rdquo;
        </blockquote>
      </div>

      {/* Decision Engine Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#e5e5e2] rounded-2xl p-6 space-y-3 shadow-xs">
          <h3 className="font-serif font-bold text-[#1f1f1f] text-base flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Deterministic Compatibility</span>
          </h3>
          <p className="text-xs text-[#5c5645] leading-relaxed">
            AI is strictly utilized as a natural language parser to extract structured parameters. Physical compatibility, clearance limits, and ranking are computed with 100% auditable TypeScript rules.
          </p>
        </div>

        <div className="bg-white border border-[#e5e5e2] rounded-2xl p-6 space-y-3 shadow-xs">
          <h3 className="font-serif font-bold text-[#1f1f1f] text-base flex items-center space-x-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            <span>Zero Hallucination Guardrail</span>
          </h3>
          <p className="text-xs text-[#5c5645] leading-relaxed">
            If a customer requests a dimension or layout unsupported by the catalog, the engine states an honest &ldquo;No exact match&rdquo; and displays the closest alternatives rather than fabricating model numbers.
          </p>
        </div>
      </div>

      {/* Public Data Sources & Methodology */}
      <div className="bg-white border border-[#e5e5e2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-serif font-bold text-[#1f1f1f] tracking-tight flex items-center space-x-2">
          <Layers className="w-5 h-5 text-[#a91b1b]" />
          <span>Data Acquisition &amp; Verification Methodology</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#5c5645] leading-relaxed">
          This demonstration features a comprehensive, verified commercial truth-set of 139 John Boos product models captured from public specification sheets, NSF registries, and KCL CAD libraries:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-[#f4f3ef] border border-[#e5e5e2] text-xs">
            <span className="font-bold text-[#1f1f1f] block mb-1">Compartment Sinks</span>
            <span className="text-[11px] text-[#756e5a]">68 models spanning 1, 2, 3, and 4 compartment configurations across all standard bowl sizes and drainboards.</span>
          </div>
          <div className="p-4 rounded-xl bg-[#f4f3ef] border border-[#e5e5e2] text-xs">
            <span className="font-bold text-[#1f1f1f] block mb-1">Commercial Work Tables</span>
            <span className="text-[11px] text-[#756e5a]">54 models across FBLG flat-top, UFBLG backsplash, FBLS all-stainless, ST6 16GA, and JNS Maple butcher block.</span>
          </div>
          <div className="p-4 rounded-xl bg-[#f4f3ef] border border-[#e5e5e2] text-xs">
            <span className="font-bold text-[#1f1f1f] block mb-1">Filler Tables</span>
            <span className="text-[11px] text-[#756e5a]">8 models in the EFT8 series for 24 in and 30 in depths from 12 in to 24 in widths.</span>
          </div>
          <div className="p-4 rounded-xl bg-[#f4f3ef] border border-[#e5e5e2] text-xs">
            <span className="font-bold text-[#1f1f1f] block mb-1">Equipment Stands</span>
            <span className="text-[11px] text-[#756e5a]">9 models across EES8 and EESS8 all-stainless heavy-duty appliance stands.</span>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-6 rounded-2xl bg-white border border-[#e5e5e2] text-xs text-[#756e5a] space-y-2 shadow-xs">
        <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-[11px]">
          Concept Demonstration Notice
        </h3>
        <p className="leading-relaxed">
          Private concept demonstration by Metamend. Not affiliated with or endorsed by John Boos &amp; Co. All product names, trademarks, and registered trademarks cited in this demonstration are property of their respective owners.
        </p>
      </div>
    </div>
  );
}
