"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Box,
  Layers2,
  Cpu,
  Search,
  Maximize2,
  Award,
  ChevronRight,
  Plus,
  Check,
  Columns2,
  RotateCcw,
  LayoutGrid,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { productRepository } from "@/repositories/product-repository";
import { rankProducts } from "@/domain/decision-engine";
import { Requirements, ProductCategory, DrainboardSide } from "@/domain/types";
import { ProductSchematicSvg } from "@/components/schematic/ProductSchematicSvg";
import { WidthClearanceMeter } from "@/components/results/WidthClearanceMeter";
import { useProjectSchedule } from "@/lib/project-store";
import { useCompareList } from "@/lib/compare-store";
import demoScenarios from "../../data/demo_scenarios.json";

export default function HomePage() {
  const router = useRouter();
  const { addItem, isInProject } = useProjectSchedule();
  const { toggleCompare, isComparing } = useCompareList();

  // Wizard Step State (Clean, non-overwhelming step-by-step up top)
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [category, setCategory] = useState<ProductCategory>("compartment_sink");
  const [wallSpace, setWallSpace] = useState<number>(90);
  const [compartments, setCompartments] = useState<number>(3);
  const [bowlSize, setBowlSize] = useState<string>("16x20");
  const [drainboardSide, setDrainboardSide] = useState<DrainboardSide>("both");
  const [drainboardLength, setDrainboardLength] = useState<number | null>(18);
  const [tableDepth, setTableDepth] = useState<number>(30);
  const [tableUpturn, setTableUpturn] = useState<string>("flat");

  // Advanced studio toggle & NL search toggle
  const [showAdvancedStudio, setShowAdvancedStudio] = useState<boolean>(false);
  const [showNlSearch, setShowNlSearch] = useState<boolean>(false);
  const [nlQuery, setNlQuery] = useState<string>("");
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  // Compute live match
  const liveRequirements = useMemo<Requirements>(() => {
    let bw: number | null = null;
    let bf: number | null = null;
    if (bowlSize === "16x20") {
      bw = 16;
      bf = 20;
    } else if (bowlSize === "18x18") {
      bw = 18;
      bf = 18;
    } else if (bowlSize === "20x20") {
      bw = 20;
      bf = 20;
    }

    return {
      category,
      maxOverallWidthIn: wallSpace || null,
      compartments: category === "compartment_sink" ? compartments : null,
      bowlWidthIn: category === "compartment_sink" ? bw : null,
      bowlFrontToBackIn: category === "compartment_sink" ? bf : null,
      drainboardSide: category === "compartment_sink" ? drainboardSide : null,
      drainboardLengthIn: category === "compartment_sink" ? drainboardLength : null,
      exactFitOnly: true,
      freeTextContext: null,
    };
  }, [category, wallSpace, compartments, bowlSize, drainboardSide, drainboardLength]);

  const allCategoryProducts = useMemo(() => productRepository.list(category), [category]);
  const matchResults = useMemo(() => rankProducts(allCategoryProducts, liveRequirements), [allCategoryProducts, liveRequirements]);

  const topMatch = matchResults.length > 0 ? matchResults[0] : null;

  const handleLaunchFullResults = () => {
    const params = new URLSearchParams();
    params.set("category", category);
    if (wallSpace) params.set("maxOverallWidthIn", wallSpace.toString());
    if (category === "compartment_sink") {
      params.set("compartments", compartments.toString());
      if (drainboardSide && drainboardSide !== "any") params.set("drainboardSide", drainboardSide);
      if (drainboardLength) params.set("drainboardLengthIn", drainboardLength.toString());
      if (liveRequirements.bowlWidthIn) params.set("bowlWidthIn", liveRequirements.bowlWidthIn.toString());
      if (liveRequirements.bowlFrontToBackIn) params.set("bowlFrontToBackIn", liveRequirements.bowlFrontToBackIn.toString());
    }
    params.set("exactFitOnly", "true");
    router.push(`/results?${params.toString()}`);
  };

  const handleAddProject = () => {
    if (!topMatch) return;
    addItem(topMatch.product, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="space-y-16 py-2">
      {/* Top Heritage Badge & Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#d7d4c8] text-xs font-semibold text-[#474235] shadow-2xs">
          <span className="font-serif font-bold text-[#a91b1b]">EST. 1887</span>
          <span>&bull;</span>
          <span className="uppercase tracking-widest text-[11px] font-bold text-[#1f1f1f]">
            Commercial Foodservice Sizing Engine
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1f1f1f] tracking-tight leading-tight">
          Find Your Perfect Commercial Equipment
        </h1>
        <p className="text-xs sm:text-base text-[#5c5645] max-w-xl mx-auto">
          Follow our 4-step guided configurator to size your space and resolve verified John Boos models with full clearance validation.
        </p>
      </div>

      {/* 1. UP TOP: Clean, Focused Step-by-Step Guided Wizard (Not Overwhelming) */}
      <div className="max-w-3xl mx-auto bg-white border-2 border-[#1f1f1f] rounded-3xl shadow-xl overflow-hidden">
        {/* Wizard Header Progress Bar */}
        <div className="bg-[#fbfaf8] border-b border-[#e5e5e2] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#a91b1b] text-white text-xs font-mono font-bold flex items-center justify-center">
                {wizardStep}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f]">
                {wizardStep === 1 && "Step 1 of 4: Select Product Line"}
                {wizardStep === 2 && "Step 2 of 4: Available Installation Space"}
                {wizardStep === 3 && (category === "compartment_sink" ? "Step 3 of 4: Compartment & Bowl Size" : "Step 3 of 4: Surface & Depth")}
                {wizardStep === 4 && (category === "compartment_sink" ? "Step 4 of 4: Drainboard Configuration" : "Step 4 of 4: Review & Model Resolution")}
                {wizardStep === 5 && "Verified Model Match"}
              </span>
            </div>

            {/* Step Pills */}
            <div className="flex items-center space-x-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setWizardStep(s)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    wizardStep === s
                      ? "bg-[#a91b1b] scale-125 ring-2 ring-[#a91b1b]/20"
                      : wizardStep > s
                      ? "bg-[#1f1f1f]"
                      : "bg-[#d7d4c8]"
                  }`}
                  title={`Go to Step ${s}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Wizard Step Body */}
        <div className="p-6 sm:p-10 min-h-[340px] flex flex-col justify-between space-y-6">
          {/* STEP 1: Select Category */}
          {wizardStep === 1 && (
            <div className="space-y-5 my-auto">
              <div className="text-center sm:text-left space-y-1">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1f1f1f]">
                  What type of commercial equipment do you need?
                </h2>
                <p className="text-xs text-[#756e5a]">
                  Choose from John Boos commercial product families.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: "compartment_sink",
                    title: "Compartment Sinks",
                    sub: "1 to 4-Bay B-Series stainless sinks with drainboards",
                    icon: Box,
                  },
                  {
                    id: "work_table",
                    title: "Work Tables",
                    sub: "FBLG, UFBLG, ST6 16GA, and JNS Maple wood tops",
                    icon: Layers2,
                  },
                  {
                    id: "filler_table",
                    title: "Fillers & Stands",
                    sub: "EFT8 narrow filler tables and EES8 heavy equipment stands",
                    icon: Cpu,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = category === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCategory(item.id as ProductCategory)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#f4f3ef] border-[#a91b1b] ring-4 ring-[#a91b1b]/10 shadow-sm"
                          : "bg-white border-[#e5e5e2] hover:border-[#b8b3a0]"
                      }`}
                    >
                      <Icon className={`w-8 h-8 mb-3 ${isSelected ? "text-[#a91b1b]" : "text-[#756e5a]"}`} />
                      <div>
                        <span className="font-bold text-sm text-[#1f1f1f] block mb-1">
                          {item.title}
                        </span>
                        <p className="text-[11px] text-[#5c5645] leading-relaxed">
                          {item.sub}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Wall Space & Clearance */}
          {wizardStep === 2 && (
            <div className="space-y-6 my-auto">
              <div className="text-center sm:text-left space-y-1">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1f1f1f]">
                  How much wall or floor space is available?
                </h2>
                <p className="text-xs text-[#756e5a]">
                  Select a common standard dimension or adjust the slider.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { val: 60, label: "60 inches", sub: "5.0 ft (Compact)" },
                  { val: 76, label: "76 inches", sub: "6.3 ft (Single Board)" },
                  { val: 87, label: "87 inches", sub: "7.25 ft (Exact 3-Bay)" },
                  { val: 90, label: "90 inches", sub: "7.5 ft (Hero Station)" },
                  { val: 99, label: "99 inches", sub: "8.25 ft (Extended)" },
                  { val: 105, label: "105 inches", sub: "8.75 ft (Large)" },
                  { val: 111, label: "111 inches", sub: "9.25 ft (30\" Boards)" },
                  { val: 120, label: "120 inches", sub: "10.0 ft (Full Station)" },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setWallSpace(item.val)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      wallSpace === item.val
                        ? "bg-[#f4f3ef] border-[#a91b1b] ring-2 ring-[#a91b1b]/20 font-bold"
                        : "bg-white border-[#e5e5e2] hover:border-[#b8b3a0]"
                    }`}
                  >
                    <span className="font-mono text-sm font-bold text-[#1f1f1f] block">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-[#756e5a]">{item.sub}</span>
                  </button>
                ))}
              </div>

              {/* Slider option */}
              <div className="p-4 rounded-2xl bg-[#fbfaf8] border border-[#e5e5e2] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#1f1f1f]">Fine-Tune Custom Width:</span>
                  <span className="font-mono font-black text-sm text-[#a91b1b]">{wallSpace}&quot; ({(wallSpace / 12).toFixed(1)} ft)</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="125"
                  value={wallSpace}
                  onChange={(e) => setWallSpace(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#d7d4c8] rounded-lg appearance-none cursor-pointer accent-[#a91b1b]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Compartments & Bowl Footprint (or Depth for Tables) */}
          {wizardStep === 3 && (
            <div className="space-y-6 my-auto">
              {category === "compartment_sink" ? (
                <>
                  <div className="text-center sm:text-left space-y-1">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1f1f1f]">
                      Choose your compartment count &amp; bowl footprint
                    </h2>
                    <p className="text-xs text-[#756e5a]">
                      All commercial sink bowls are heavy-duty 14&quot; water depth with 10&quot; boxed backsplash.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f] block mb-2">
                        Compartments:
                      </span>
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { num: 1, title: "1-Bay", sub: "Prep / Hand" },
                          { num: 2, title: "2-Bay", sub: "Wash & Rinse" },
                          { num: 3, title: "3-Bay", sub: "Wash/Rinse/Sanitize" },
                          { num: 4, title: "4-Bay", sub: "Commercial Soak" },
                        ].map((item) => (
                          <button
                            key={item.num}
                            type="button"
                            onClick={() => setCompartments(item.num)}
                            className={`p-3 rounded-xl border text-center transition-all ${
                              compartments === item.num
                                ? "bg-[#f4f3ef] border-[#a91b1b] ring-2 ring-[#a91b1b]/20 font-bold"
                                : "bg-white border-[#e5e5e2] hover:border-[#b8b3a0]"
                            }`}
                          >
                            <span className="font-mono text-sm font-bold text-[#1f1f1f] block">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-[#756e5a] block">{item.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f] block mb-2">
                        Bowl Dimensions:
                      </span>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: "16x20", label: "16\" W x 20\" D", sub: "Standard B-Series commercial pans" },
                          { id: "18x18", label: "18\" W x 18\" D", sub: "Square high-capacity compartments" },
                          { id: "20x20", label: "20\" W x 20\" D", sub: "Extra-large utility station" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setBowlSize(item.id)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              bowlSize === item.id
                                ? "bg-[#f4f3ef] border-[#a91b1b] ring-2 ring-[#a91b1b]/20"
                                : "bg-white border-[#e5e5e2] hover:border-[#b8b3a0]"
                            }`}
                          >
                            <span className="font-mono text-xs font-bold text-[#1f1f1f] block mb-0.5">
                              {item.label}
                            </span>
                            <span className="text-[10px] text-[#756e5a] leading-tight block">{item.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="text-center sm:text-left space-y-1">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1f1f1f]">
                      Choose table depth &amp; up-turn style
                    </h2>
                    <p className="text-xs text-[#756e5a]">
                      Select front-to-back work surface depth.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setTableDepth(30)}
                      className={`p-4 rounded-xl border text-left ${
                        tableDepth === 30 ? "bg-[#f4f3ef] border-[#a91b1b] ring-2 ring-[#a91b1b]/20" : "bg-white border-[#e5e5e2]"
                      }`}
                    >
                      <span className="font-bold text-sm text-[#1f1f1f] block">30&quot; Standard Depth</span>
                      <span className="text-xs text-[#756e5a]">Standard commercial chef line depth</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTableDepth(24)}
                      className={`p-4 rounded-xl border text-left ${
                        tableDepth === 24 ? "bg-[#f4f3ef] border-[#a91b1b] ring-2 ring-[#a91b1b]/20" : "bg-white border-[#e5e5e2]"
                      }`}
                    >
                      <span className="font-bold text-sm text-[#1f1f1f] block">24&quot; Compact Depth</span>
                      <span className="text-xs text-[#756e5a]">Narrow kitchen aisle clearance</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Drainboard Orientation & Sizing */}
          {wizardStep === 4 && (
            <div className="space-y-6 my-auto">
              <div className="text-center sm:text-left space-y-1">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1f1f1f]">
                  Select drainboard layout &amp; length
                </h2>
                <p className="text-xs text-[#756e5a]">
                  Position your dirty dish landing and clean drying surfaces.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "both", label: "Both Sides (L+R)", sub: "2 Drainboards" },
                  { id: "left", label: "Left Side Only", sub: "1 LH Drainboard" },
                  { id: "right", label: "Right Side Only", sub: "1 RH Drainboard" },
                  { id: "none", label: "No Drainboards", sub: "Compact Sinks" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDrainboardSide(item.id as DrainboardSide)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      drainboardSide === item.id
                        ? "bg-[#f4f3ef] border-[#a91b1b] ring-2 ring-[#a91b1b]/20 font-bold"
                        : "bg-white border-[#e5e5e2] hover:border-[#b8b3a0]"
                    }`}
                  >
                    <span className="font-bold text-xs text-[#1f1f1f] block mb-1">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-[#756e5a]">{item.sub}</span>
                  </button>
                ))}
              </div>

              {drainboardSide !== "none" && (
                <div className="p-4 rounded-2xl bg-[#fbfaf8] border border-[#e5e5e2] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f] block">
                    Drainboard Length:
                  </span>
                  <div className="flex gap-3">
                    {[
                      { val: 18, label: "18\" Standard Length" },
                      { val: 24, label: "24\" Extended Length" },
                      { val: 30, label: "30\" Extra-Wide Length" },
                    ].map((len) => (
                      <button
                        key={len.val}
                        type="button"
                        onClick={() => setDrainboardLength(len.val)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                          drainboardLength === len.val
                            ? "bg-[#a91b1b] text-white shadow-xs"
                            : "bg-white text-[#5c5645] hover:bg-[#e8e6df] border border-[#d7d4c8]"
                        }`}
                      >
                        {len.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Instant Live Resolution & Match Preview */}
          {wizardStep === 5 && (
            <div className="space-y-6 my-auto">
              {topMatch ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#e5e5e2] pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Exact Match Resolved</span>
                      </span>
                    </div>

                    <span className="font-mono text-xs text-[#756e5a]">
                      Score: <span className="font-black text-emerald-700 text-sm">{topMatch.explainability.score}/100</span>
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <Link
                        href={`/products/${encodeURIComponent(topMatch.product.model)}`}
                        className="font-mono font-black text-3xl text-[#1f1f1f] hover:text-[#a91b1b] transition-colors block"
                      >
                        {topMatch.product.model}
                      </Link>
                      <p className="text-xs text-[#756e5a] font-medium">{topMatch.product.family}</p>
                    </div>

                    <div className="text-right font-mono text-xs text-[#1f1f1f] font-bold">
                      {topMatch.product.overall.widthIn}&quot; W x {topMatch.product.overall.depthIn}&quot; D x {topMatch.product.overall.heightIn}&quot; H
                    </div>
                  </div>

                  {/* Schematic Drawing */}
                  <div className="p-3 rounded-2xl bg-[#f4f3ef] border border-[#e5e5e2]">
                    <ProductSchematicSvg product={topMatch.product} className="w-full h-auto max-h-40" />
                  </div>

                  {/* Clearance Meter */}
                  <WidthClearanceMeter
                    productWidth={topMatch.product.overall.widthIn}
                    maxWallWidth={wallSpace}
                  />
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
                  <h3 className="text-lg font-serif font-bold text-amber-950">
                    Exceeds Available Wall Clearance
                  </h3>
                  <p className="text-xs text-amber-900/90 max-w-md mx-auto">
                    The requested {compartments}-bay configuration with {drainboardLength}&quot; drainboards requires more than {wallSpace}&quot; of width.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Wizard Step Navigation Buttons */}
          <div className="pt-4 border-t border-[#e5e5e2] flex items-center justify-between">
            {wizardStep > 1 ? (
              <button
                type="button"
                onClick={() => setWizardStep(wizardStep - 1)}
                className="px-4 py-2.5 rounded-xl bg-[#f4f3ef] hover:bg-[#e8e6df] text-[#1f1f1f] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 border border-[#d7d4c8] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <span className="text-xs text-[#756e5a] font-mono">Step 1 of 4</span>
            )}

            {wizardStep < 5 ? (
              <button
                type="button"
                onClick={() => setWizardStep(wizardStep + 1)}
                className="px-6 py-2.5 rounded-xl bg-[#a91b1b] hover:bg-[#8b1515] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-md transition-all"
              >
                <span>{wizardStep === 4 ? "Resolve Match" : "Next Step"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleAddProject}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all ${
                    topMatch && isInProject(topMatch.product.id)
                      ? "bg-[#f4f3ef] text-emerald-800 border border-emerald-300"
                      : "bg-white hover:bg-[#f4f3ef] text-[#1f1f1f] border border-[#d7d4c8]"
                  }`}
                >
                  {topMatch && isInProject(topMatch.product.id) ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{addedNotice ? "Saved!" : topMatch && isInProject(topMatch.product.id) ? "In Schedule" : "Add to Project"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleLaunchFullResults}
                  className="px-6 py-2.5 rounded-xl bg-[#a91b1b] hover:bg-[#8b1515] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-md transition-all"
                >
                  <span>Full Spec View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. UNDERNEATH: Optional Full Interactive All-in-One Studio Matrix */}
      <div className="max-w-5xl mx-auto border border-[#e5e5e2] rounded-3xl bg-white overflow-hidden shadow-sm">
        <button
          onClick={() => setShowAdvancedStudio(!showAdvancedStudio)}
          className="w-full px-6 py-5 bg-[#fbfaf8] hover:bg-[#f4f3ef] flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#1f1f1f] text-white flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1f1f1f]">
                All-in-One Studio Control Board
              </h3>
              <p className="text-xs text-[#756e5a]">
                Directly adjust all sliders, bowl sizes, and drainboards on a single screen
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-[#a91b1b]">
            <span>{showAdvancedStudio ? "Collapse Studio" : "Expand All-in-One Studio"}</span>
            {showAdvancedStudio ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showAdvancedStudio && (
          <div className="p-6 sm:p-8 border-t border-[#e5e5e2] grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white">
            {/* Controls Left (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f]">
                  Equipment Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "compartment_sink", name: "Sinks" },
                    { id: "work_table", name: "Work Tables" },
                    { id: "filler_table", name: "Fillers & Stands" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCategory(item.id as ProductCategory)}
                      className={`p-2 rounded-lg text-xs font-bold transition-all ${
                        category === item.id
                          ? "bg-[#1f1f1f] text-white"
                          : "bg-[#f4f3ef] text-[#474235] border border-[#d7d4c8]"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>Wall Space Width:</span>
                  <span className="font-mono text-[#a91b1b]">{wallSpace}&quot;</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="125"
                  value={wallSpace}
                  onChange={(e) => setWallSpace(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#d7d4c8] rounded-lg accent-[#a91b1b]"
                />
              </div>

              {/* Compartments & Bowls */}
              {category === "compartment_sink" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f]">
                      Compartments
                    </label>
                    <div className="grid grid-cols-4 gap-1">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          onClick={() => setCompartments(num)}
                          className={`py-1.5 rounded-lg text-xs font-bold ${
                            compartments === num ? "bg-[#a91b1b] text-white" : "bg-[#f4f3ef] border border-[#d7d4c8]"
                          }`}
                        >
                          {num}B
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f]">
                      Bowl Size
                    </label>
                    <div className="grid grid-cols-2 gap-1">
                      {[
                        { id: "16x20", label: "16x20\"" },
                        { id: "18x18", label: "18x18\"" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setBowlSize(item.id)}
                          className={`py-1.5 rounded-lg text-xs font-mono font-bold ${
                            bowlSize === item.id ? "bg-[#1f1f1f] text-white" : "bg-[#f4f3ef] border border-[#d7d4c8]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Drainboard */}
              {category === "compartment_sink" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f]">
                    Drainboards
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 text-xs">
                    {[
                      { id: "both", label: "Both" },
                      { id: "left", label: "Left" },
                      { id: "right", label: "Right" },
                      { id: "none", label: "None" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setDrainboardSide(item.id as DrainboardSide)}
                        className={`py-2 rounded-lg font-bold ${
                          drainboardSide === item.id ? "bg-[#1f1f1f] text-white" : "bg-[#f4f3ef] border border-[#d7d4c8]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Live Model Right (5 cols) */}
            <div className="lg:col-span-5 bg-[#fbfaf8] p-5 rounded-2xl border border-[#e5e5e2] space-y-4">
              {topMatch ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Exact Match
                    </span>
                    <span className="font-mono text-xs font-bold">{topMatch.product.model}</span>
                  </div>
                  <ProductSchematicSvg product={topMatch.product} className="w-full h-auto max-h-36" />
                  <WidthClearanceMeter productWidth={topMatch.product.overall.widthIn} maxWallWidth={wallSpace} />
                  <button
                    onClick={handleLaunchFullResults}
                    className="w-full py-2.5 rounded-xl bg-[#a91b1b] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    View Recommendation Details
                  </button>
                </>
              ) : (
                <div className="text-xs text-amber-900 py-6 text-center">
                  Exceeds wall space limit
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. UNDERNEATH: Plain English Natural Language Search Drawer */}
      <div className="max-w-5xl mx-auto bg-[#fbfaf8] border border-[#e5e5e2] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#d7d4c8] flex items-center justify-center text-[#a91b1b]">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1f1f1f]">
                Natural Language Query Option
              </h3>
              <p className="text-xs text-[#756e5a]">
                Type custom contractor requirements in plain English or select a demonstration preset
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowNlSearch(!showNlSearch)}
            className="text-xs font-bold text-[#a91b1b] hover:underline"
          >
            {showNlSearch ? "Hide Text Input" : "Open Search Box"}
          </button>
        </div>

        {showNlSearch && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (nlQuery.trim()) router.push(`/results?q=${encodeURIComponent(nlQuery.trim())}`);
            }}
            className="space-y-3 pt-2"
          >
            <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-xl border border-[#d7d4c8] shadow-sm">
              <input
                type="text"
                value={nlQuery}
                onChange={(e) => setNlQuery(e.target.value)}
                placeholder="e.g. 90 inches wall space, 3 compartment sink with 18 inch drainboards on both sides..."
                className="w-full bg-transparent px-3 py-2 text-sm text-[#1f1f1f] placeholder-[#948d77] focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#a91b1b] hover:bg-[#8b1515] text-white font-bold text-xs uppercase tracking-wider"
              >
                Find Matches
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] font-bold text-[#756e5a] mr-1 self-center">Demo Presets:</span>
              {demoScenarios.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => router.push(`/results?q=${encodeURIComponent(s.input)}`)}
                  className="px-2.5 py-1 rounded bg-white hover:bg-[#f4f3ef] border border-[#d7d4c8] text-[11px] text-[#474235] font-mono"
                >
                  [{s.title}]
                </button>
              ))}
            </div>
          </form>
        )}
      </div>

      {/* 4. Commercial Product Line Collection Cards */}
      <div className="space-y-6 pt-2">
        <div className="border-b border-[#e5e5e2] pb-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#a91b1b] block">
            Commercial Lines
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#1f1f1f] tracking-tight">
            Explore Boos Steel™ Commercial Truth-Set
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sinks Card */}
          <div className="rounded-2xl border border-[#e5e5e2] bg-white p-6 flex flex-col justify-between space-y-4 hover:border-[#a91b1b] transition-all shadow-xs">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f4f3ef] border border-[#d7d4c8] flex items-center justify-center text-[#a91b1b]">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-[#1f1f1f] text-lg">B-Series Compartment Sinks</h3>
              <p className="text-xs text-[#5c5645] leading-relaxed">
                1 to 4-bay commercial sinks with 0, 1, or 2 drainboards in 18&quot;, 24&quot;, and 30&quot; lengths with 10&quot; boxed backsplashes.
              </p>
            </div>

            <Link
              href="/catalog?category=compartment_sink"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#a91b1b] hover:bg-[#8b1515] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs"
            >
              <span>Browse 14 Sinks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Work Tables Card */}
          <div className="rounded-2xl border border-[#e5e5e2] bg-white p-6 flex flex-col justify-between space-y-4 hover:border-[#b8b3a0] transition-all shadow-xs">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f4f3ef] border border-[#d7d4c8] flex items-center justify-center text-[#1f1f1f]">
                <Layers2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-[#1f1f1f] text-lg">Commercial Work Tables</h3>
              <p className="text-xs text-[#5c5645] leading-relaxed">
                FBLG economy flat-top tables, UFBLG 1.5&quot; rear up-turn tables, ST6 heavy-duty 16GA chef stations, and JNS Hard Rock Maple wood tops.
              </p>
            </div>

            <Link
              href="/catalog?category=work_table"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#1f1f1f] hover:bg-[#121212] text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Browse 11 Tables</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Filler Tables & Stands */}
          <div className="rounded-2xl border border-[#e5e5e2] bg-white p-6 flex flex-col justify-between space-y-4 hover:border-[#b8b3a0] transition-all shadow-xs">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f4f3ef] border border-[#d7d4c8] flex items-center justify-center text-[#1f1f1f]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-[#1f1f1f] text-lg">Filler Tables &amp; Equipment Stands</h3>
              <p className="text-xs text-[#5c5645] leading-relaxed">
                EFT8 narrow stainless gap fillers with stallion edges and EES8 heavy commercial stands with 1.5&quot; turned-up equipment lips.
              </p>
            </div>

            <Link
              href="/catalog?category=filler_table"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#1f1f1f] hover:bg-[#121212] text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Browse 4 Stands</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
