"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SlidersHorizontal,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Maximize2,
  Box,
  LayoutGrid,
} from "lucide-react";
import { DrainboardSide } from "@/domain/types";

export default function ConfigurePage() {
  const router = useRouter();

  // Wizard state
  const [step, setStep] = useState(1);
  const [wallWidth, setWallWidth] = useState<string>("90");
  const [bowlSize, setBowlSize] = useState<string>("recommend");
  const [drainboardSide, setDrainboardSide] = useState<DrainboardSide>("both");
  const [drainboardLength, setDrainboardLength] = useState<string>("18");
  const [exactFitOnly, setExactFitOnly] = useState<boolean>(true);

  const handleFinish = () => {
    const params = new URLSearchParams();
    params.set("category", "compartment_sink");
    params.set("compartments", "3");
    if (wallWidth) params.set("maxOverallWidthIn", wallWidth);
    if (drainboardSide && drainboardSide !== "any") params.set("drainboardSide", drainboardSide);
    if (drainboardLength) params.set("drainboardLengthIn", drainboardLength);
    if (bowlSize === "16x20") {
      params.set("bowlWidthIn", "16");
      params.set("bowlFrontToBackIn", "20");
    } else if (bowlSize === "18x18") {
      params.set("bowlWidthIn", "18");
      params.set("bowlFrontToBackIn", "18");
    }
    params.set("exactFitOnly", exactFitOnly ? "true" : "false");

    router.push(`/results?${params.toString()}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Wizard Header */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#f4f3ef] border border-[#d7d4c8] text-xs font-semibold text-[#5c5645]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#a91b1b]" />
          <span>Guided B-Series Sink Configurator</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#1f1f1f] tracking-tight">
          Configure Your 3-Compartment Sink
        </h1>
        <p className="text-xs sm:text-sm text-[#756e5a] max-w-xl mx-auto">
          Specify your available installation clearance and operational preferences to find the verified John Boos model that fits.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between relative px-6">
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-[#e5e5e2] -z-0" />
        {[
          { num: 1, label: "Wall Space", icon: Maximize2 },
          { num: 2, label: "Bowl Size", icon: Box },
          { num: 3, label: "Drainboards", icon: LayoutGrid },
          { num: 4, label: "Review & Match", icon: Sparkles },
        ].map((s) => {
          const isCurrent = step === s.num;
          const isDone = step > s.num;
          return (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <button
                onClick={() => setStep(s.num)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                  isCurrent
                    ? "bg-[#a91b1b] text-white ring-4 ring-[#a91b1b]/20"
                    : isDone
                    ? "bg-[#1f1f1f] text-white"
                    : "bg-white text-[#756e5a] border-2 border-[#d7d4c8]"
                }`}
              >
                {isDone ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : s.num}
              </button>
              <span
                className={`text-[11px] font-semibold mt-2 hidden sm:block ${
                  isCurrent ? "text-[#a91b1b]" : "text-[#756e5a]"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content Card */}
      <div className="bg-white border border-[#e5e5e2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Step 1: Space */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#1f1f1f] mb-1">
                What is your available wall space?
              </h2>
              <p className="text-xs text-[#756e5a]">
                Specify the maximum physical wall clearance in inches.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { val: "90", label: "90 inches", sub: "Standard Hero" },
                { val: "80", label: "80 inches", sub: "Medium Wall" },
                { val: "60", label: "60 inches", sub: "Compact Space" },
                { val: "100", label: "100+ inches", sub: "Large Station" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setWallWidth(opt.val)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    wallWidth === opt.val
                      ? "bg-[#f4f3ef] border-[#a91b1b] ring-2 ring-[#a91b1b]/20"
                      : "bg-white border-[#e5e5e2] hover:border-[#b8b3a0]"
                  }`}
                >
                  <span className="font-mono text-sm font-bold text-[#1f1f1f] block">
                    {opt.label}
                  </span>
                  <span className="text-[10px] text-[#756e5a]">{opt.sub}</span>
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-[#1f1f1f] mb-1.5">
                Or enter custom wall width (inches):
              </label>
              <input
                type="number"
                value={wallWidth}
                onChange={(e) => setWallWidth(e.target.value)}
                placeholder="e.g. 87"
                className="w-full max-w-xs px-3.5 py-2.5 rounded-lg bg-[#fbfaf8] border border-[#d7d4c8] text-[#1f1f1f] font-mono text-sm focus:ring-2 focus:ring-[#a91b1b] focus:outline-none font-bold"
              />
            </div>
          </div>
        )}

        {/* Step 2: Bowls */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#1f1f1f] mb-1">
                Choose your bowl dimension preference
              </h2>
              <p className="text-xs text-[#756e5a]">
                All sinks in the primary demo feature 3 compartments with 14-inch water depth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  id: "recommend",
                  title: "Recommend Best Fit",
                  desc: "Let the engine pick between 16x20 and 18x18 based on remaining wall clearance.",
                },
                {
                  id: "16x20",
                  title: "16\" W x 20\" D Bowls",
                  desc: "John Boos standard commercial B-Series footprint. Excellent pan handling.",
                },
                {
                  id: "18x18",
                  title: "18\" W x 18\" D Bowls",
                  desc: "Square compartment footprint for equal lateral wash/rinse/sanitize volumes.",
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setBowlSize(opt.id)}
                  className={`p-5 rounded-xl border text-left transition-all ${
                    bowlSize === opt.id
                      ? "bg-[#f4f3ef] border-[#a91b1b] ring-2 ring-[#a91b1b]/20"
                      : "bg-white border-[#e5e5e2] hover:border-[#b8b3a0]"
                  }`}
                >
                  <span className="font-bold text-sm text-[#1f1f1f] block mb-1">
                    {opt.title}
                  </span>
                  <p className="text-[11px] text-[#5c5645] leading-relaxed">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Drainboards */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#1f1f1f] mb-1">
                Select drainboard orientation &amp; size
              </h2>
              <p className="text-xs text-[#756e5a]">
                Choose where dirty dish landing and clean drying surfaces should be placed.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "both", label: "Both Sides", sub: "2 Drainboards (L+R)" },
                { id: "left", label: "Left Side Only", sub: "1 Drainboard (L)" },
                { id: "right", label: "Right Side Only", sub: "1 Drainboard (R)" },
                { id: "none", label: "No Drainboards", sub: "Compact Sinks Only" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDrainboardSide(opt.id as DrainboardSide)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    drainboardSide === opt.id
                      ? "bg-[#f4f3ef] border-[#a91b1b] ring-2 ring-[#a91b1b]/20"
                      : "bg-white border-[#e5e5e2] hover:border-[#b8b3a0]"
                  }`}
                >
                  <span className="font-bold text-xs text-[#1f1f1f] block mb-0.5">
                    {opt.label}
                  </span>
                  <span className="text-[10px] text-[#756e5a]">{opt.sub}</span>
                </button>
              ))}
            </div>

            {drainboardSide !== "none" && (
              <div className="pt-3 border-t border-[#e5e5e2]">
                <span className="block text-xs font-bold text-[#1f1f1f] mb-2">
                  Preferred Drainboard Length:
                </span>
                <div className="flex gap-3">
                  {[
                    { val: "18", label: "18 Inches (Standard)" },
                    { val: "24", label: "24 Inches (Extended)" },
                    { val: "", label: "No Preference" },
                  ].map((len) => (
                    <button
                      key={len.val}
                      type="button"
                      onClick={() => setDrainboardLength(len.val)}
                      className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-all ${
                        drainboardLength === len.val
                          ? "bg-[#a91b1b] text-white border-[#a91b1b]"
                          : "bg-white border-[#d7d4c8] text-[#5c5645] hover:text-[#1f1f1f]"
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

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#1f1f1f] mb-1">
                Review Your Configuration Constraints
              </h2>
              <p className="text-xs text-[#756e5a]">
                Verify parameters before running the deterministic recommendation engine.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#f4f3ef] border border-[#e5e5e2] text-xs">
              <div>
                <span className="text-[#756e5a] block text-[10px] uppercase font-semibold">Available Width</span>
                <span className="font-mono font-bold text-[#a91b1b] text-sm">
                  {wallWidth ? `${wallWidth}" Max` : "Unlimited"}
                </span>
              </div>

              <div>
                <span className="text-[#756e5a] block text-[10px] uppercase font-semibold">Compartments</span>
                <span className="font-mono font-bold text-[#1f1f1f]">3 Bay</span>
              </div>

              <div>
                <span className="text-[#756e5a] block text-[10px] uppercase font-semibold">Drainboards</span>
                <span className="font-bold text-[#1f1f1f] capitalize">
                  {drainboardSide === "none" ? "None" : `${drainboardSide} (${drainboardLength || "any"}")`}
                </span>
              </div>

              <div>
                <span className="text-[#756e5a] block text-[10px] uppercase font-semibold">Bowl Preference</span>
                <span className="font-bold text-[#1f1f1f] capitalize">
                  {bowlSize}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f4f3ef] border border-[#e5e5e2] flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-[#474235] cursor-pointer">
                <input
                  type="checkbox"
                  checked={exactFitOnly}
                  onChange={(e) => setExactFitOnly(e.target.checked)}
                  className="rounded border-[#d7d4c8] text-[#a91b1b] focus:ring-0"
                />
                <span className="font-medium">Strict physical fits only (exclude models that exceed max space)</span>
              </label>
            </div>
          </div>
        )}

        {/* Wizard Navigation Bar */}
        <div className="pt-4 border-t border-[#e5e5e2] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-lg bg-[#f4f3ef] hover:bg-[#e8e6df] text-[#1f1f1f] text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-[#d7d4c8]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <Link
              href="/"
              className="px-4 py-2.5 rounded-lg bg-[#f4f3ef] hover:bg-[#e8e6df] text-[#756e5a] hover:text-[#1f1f1f] text-xs font-semibold transition-colors"
            >
              Cancel
            </Link>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-lg bg-[#a91b1b] hover:bg-[#8b1515] text-white text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-lg bg-[#a91b1b] hover:bg-[#8b1515] text-white text-xs font-bold flex items-center space-x-2 transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Find Matching Products</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
