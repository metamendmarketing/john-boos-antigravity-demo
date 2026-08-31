import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  Lock,
  Sparkles,
  SlidersHorizontal,
  History,
  Award,
  TreePine,
  Factory,
  ArrowRight,
} from "lucide-react";

export default function AboutDemoPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 text-[#474235]">
      {/* Title & Badge */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#f4f3ef] border border-[#d7d4c8] text-xs font-bold uppercase tracking-wider text-[#6f2e18] shadow-2xs">
          <History className="w-4 h-4 text-[#6f2e18]" />
          <span>Heritage &amp; Technology Brief • Since 1887</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1f1f1f] tracking-tight">
          Craftsmanship Since 1887. <br className="hidden sm:inline" />
          <span className="text-[#6f2e18]">Intelligent Specification Today.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#5c5645] leading-relaxed max-w-3xl">
          Honoring over 138 years of American foodservice engineering in Effingham, Illinois by pairing Boos&apos; authentic product truth-set with an intelligent parametric decision engine.
        </p>
      </div>

      {/* Hero Heritage Section */}
      <div className="bg-white border border-[#e5e5e2] rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        <div className="border-b border-[#e5e5e2] pb-6 space-y-3">
          <div className="flex items-center space-x-2.5 text-[#6f2e18]">
            <Award className="w-6 h-6" />
            <h2 className="text-2xl font-serif font-bold text-[#1f1f1f] tracking-tight">
              The John Boos Heritage
            </h2>
          </div>
          <p className="text-sm text-[#5c5645] leading-relaxed">
            In 1887, founder Conrad Boos crafted the very first Boos Block in Effingham, Illinois from a local sycamore tree to absorb the rigorous hammering blows of a blacksmith shop. When a local butcher saw its exceptional durability, he requested one for his meat market—igniting a legacy of culinary and commercial foodservice standard-setting that spans three centuries.
          </p>
        </div>

        {/* 3 Heritage Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#faf9f5] border border-[#e5e5e2] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#6f2e18]/10 flex items-center justify-center text-[#6f2e18]">
              <TreePine className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-[#1f1f1f] text-base">
              Hard Rock Maple
            </h3>
            <p className="text-xs text-[#5c5645] leading-relaxed">
              Sustainably harvested Northern Hard Rock Maple, kiln-dried and finished with Boos Block Cream and Beeswax, providing the world standard in commercial baker and food prep tables.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#faf9f5] border border-[#e5e5e2] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#6f2e18]/10 flex items-center justify-center text-[#6f2e18]">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-[#1f1f1f] text-base">
              Commercial Stainless
            </h3>
            <p className="text-xs text-[#5c5645] leading-relaxed">
              Precision fabricated 16GA and 18GA Type 300 / 430 commercial stainless steel compartment sinks, work tables, and equipment stands with stallion safety edges and boxed backsplashes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#faf9f5] border border-[#e5e5e2] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#6f2e18]/10 flex items-center justify-center text-[#6f2e18]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-[#1f1f1f] text-base">
              Sanitation Certified
            </h3>
            <p className="text-xs text-[#5c5645] leading-relaxed">
              Full compliance with NSF International standard 2 and CSA Sanitation certifications for commercial foodservice hygiene, durability, and cleanability.
            </p>
          </div>
        </div>
      </div>

      {/* The Specifier Thesis */}
      <div className="bg-[#121212] text-[#fcfbf9] rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
        <div className="flex items-center space-x-2.5 text-amber-300">
          <Cpu className="w-6 h-6" />
          <h2 className="text-2xl font-serif font-bold tracking-tight text-white">
            The Modern Specifier Challenge
          </h2>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
          While John Boos offers hundreds of standard models across varying bowl dimensions, drainboard lengths, table depths, and gauges, kitchen designers and dealer reps often spend valuable hours cross-referencing multi-page PDF catalogs and KCL CAD libraries to find the exact model matching a customer&apos;s physical wall clearance:
        </p>

        <blockquote className="p-6 rounded-2xl bg-zinc-900 border-l-4 border-amber-400 text-zinc-100 text-sm italic font-serif leading-relaxed">
          &ldquo;Instead of expecting a customer, dealer, or designer to decipher model numbers like 3B16204-2D18-X, the Intelligent Specifier lets them express their spatial and operational requirements naturally—instantly surfacing the exact verified model with millimeter-precise clearance math.&rdquo;
        </blockquote>
      </div>

      {/* Two Core Technical Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#e5e5e2] rounded-3xl p-6 sm:p-8 space-y-3.5 shadow-xs">
          <div className="flex items-center space-x-2 text-[#6f2e18]">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-serif font-bold text-[#1f1f1f] text-lg">
              Deterministic Compatibility Engine
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#5c5645] leading-relaxed">
            AI is strictly utilized as a natural language parser to extract structured physical parameters. Physical compatibility, clearance limits, bowl area computations, and fit scoring are computed with 100% auditable TypeScript logic—never probabilistic guesswork.
          </p>
        </div>

        <div className="bg-white border border-[#e5e5e2] rounded-3xl p-6 sm:p-8 space-y-3.5 shadow-xs">
          <div className="flex items-center space-x-2 text-[#6f2e18]">
            <Lock className="w-5 h-5 text-emerald-600" />
            <h3 className="font-serif font-bold text-[#1f1f1f] text-lg">
              Zero Hallucination Guardrail
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#5c5645] leading-relaxed">
            If a customer requests a dimension or configuration unsupported by the catalog, the engine states an honest &ldquo;No exact match&rdquo; and displays the closest legitimate alternatives with explainable compromise notes, rather than fabricating non-existent model numbers.
          </p>
        </div>
      </div>

      {/* Public Data Sources & Comprehensive 139 Truth-Set */}
      <div className="bg-white border border-[#e5e5e2] rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center space-x-2.5 text-[#6f2e18]">
          <Layers className="w-6 h-6" />
          <h2 className="text-2xl font-serif font-bold text-[#1f1f1f] tracking-tight">
            Verified Truth-Set Catalog (139 Models)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#5c5645] leading-relaxed">
          The system indexes a comprehensive, publicly verified truth-set of 139 commercial John Boos product models captured from public specification sheets, NSF registration records, and KCL CAD libraries:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#faf9f5] border border-[#e5e5e2] space-y-1.5">
            <span className="font-bold text-[#1f1f1f] block text-sm">Compartment Sinks</span>
            <span className="text-2xl font-black text-[#6f2e18] block font-serif">68 Models</span>
            <span className="text-[11px] text-[#756e5a] block leading-normal">
              1, 2, 3, and 4-bay sinks across 16x20, 18x18, 20x20, and 24x24 bowl sizes with 0, 1, or 2 drainboards.
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-[#faf9f5] border border-[#e5e5e2] space-y-1.5">
            <span className="font-bold text-[#1f1f1f] block text-sm">Commercial Work Tables</span>
            <span className="text-2xl font-black text-[#6f2e18] block font-serif">54 Models</span>
            <span className="text-[11px] text-[#756e5a] block leading-normal">
              FBLG flat top, UFBLG 5 in backsplash, FBLS all-stainless, ST6 16GA, and JNS Hard Rock Maple tops from 24 in to 120 in.
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-[#faf9f5] border border-[#e5e5e2] space-y-1.5">
            <span className="font-bold text-[#1f1f1f] block text-sm">Filler Tables</span>
            <span className="text-2xl font-black text-[#6f2e18] block font-serif">8 Models</span>
            <span className="text-[11px] text-[#756e5a] block leading-normal">
              EFT8 series for 24 in and 30 in depths across 12 in, 15 in, 18 in, and 24 in equipment gap widths.
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-[#faf9f5] border border-[#e5e5e2] space-y-1.5">
            <span className="font-bold text-[#1f1f1f] block text-sm">Equipment Stands</span>
            <span className="text-2xl font-black text-[#6f2e18] block font-serif">9 Models</span>
            <span className="text-[11px] text-[#756e5a] block leading-normal">
              EES8 and EESS8 heavy-duty appliance stands with 1.5 in marine lip at ergonomic 24 in working height.
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="p-8 rounded-3xl bg-[#eeece5] border border-[#dbd6c7] text-center space-y-5">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1f1f1f]">
          Experience the Sizing Engine
        </h3>
        <p className="text-xs sm:text-sm text-[#5c5645] max-w-xl mx-auto">
          Try a natural language specification query, manually configure a custom layout, or explore the complete 139-product catalogue.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#6f2e18] text-[#fcfbf9] hover:bg-[#5a2412] text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Launch Specifier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/configure"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white border border-[#d7d4c8] text-[#1f1f1f] hover:bg-[#f5f4ef] text-xs font-bold uppercase tracking-wider shadow-2xs transition-all"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#6f2e18]" />
            <span>Open Configurator</span>
          </Link>
          <Link
            href="/catalog"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white border border-[#d7d4c8] text-[#1f1f1f] hover:bg-[#f5f4ef] text-xs font-bold uppercase tracking-wider shadow-2xs transition-all"
          >
            <Layers className="w-4 h-4 text-[#6f2e18]" />
            <span>Browse Catalogue</span>
          </Link>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-6 rounded-2xl bg-white border border-[#e5e5e2] text-xs text-[#756e5a] space-y-2 shadow-xs">
        <h4 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-[11px]">
          Concept Demonstration Notice
        </h4>
        <p className="leading-relaxed">
          Concept demonstration designed by Metamend. All product models, dimensions, and specifications are derived from publicly accessible John Boos &amp; Co. literature, NSF International certification listings, and KCL CAD library records. All trademarks and brand names are property of their respective owners.
        </p>
      </div>
    </div>
  );
}
