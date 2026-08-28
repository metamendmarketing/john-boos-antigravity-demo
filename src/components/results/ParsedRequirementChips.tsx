"use client";

import React, { useState } from "react";
import { Requirements, DrainboardSide } from "@/domain/types";
import { Edit3, Check, Sparkles, Filter } from "lucide-react";

interface ParsedRequirementChipsProps {
  requirements: Requirements;
  onUpdate: (updated: Requirements) => void;
  isFallback?: boolean;
}

export const ParsedRequirementChips: React.FC<ParsedRequirementChipsProps> = ({
  requirements,
  onUpdate,
  isFallback = true,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [maxWidth, setMaxWidth] = useState(requirements.maxOverallWidthIn?.toString() || "");
  const [drainboardSide, setDrainboardSide] = useState<DrainboardSide>(requirements.drainboardSide || "any");
  const [drainboardLength, setDrainboardLength] = useState(requirements.drainboardLengthIn?.toString() || "");
  const [bowlSize, setBowlSize] = useState(
    requirements.bowlWidthIn && requirements.bowlFrontToBackIn
      ? `${requirements.bowlWidthIn}x${requirements.bowlFrontToBackIn}`
      : "any"
  );
  const [exactFit, setExactFit] = useState(requirements.exactFitOnly ?? true);

  const handleSave = () => {
    let bw: number | null = null;
    let bf: number | null = null;
    if (bowlSize === "16x20") {
      bw = 16;
      bf = 20;
    } else if (bowlSize === "18x18") {
      bw = 18;
      bf = 18;
    }

    onUpdate({
      ...requirements,
      maxOverallWidthIn: maxWidth ? parseFloat(maxWidth) : null,
      drainboardSide: drainboardSide === "any" ? null : drainboardSide,
      drainboardLengthIn: drainboardLength ? parseFloat(drainboardLength) : null,
      bowlWidthIn: bw,
      bowlFrontToBackIn: bf,
      exactFitOnly: exactFit,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-[#e5e5e2] rounded-2xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#e5e5e2]">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#f4f3ef] border border-[#d7d4c8] flex items-center justify-center text-[#a91b1b]">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1f1f1f] tracking-tight">Active Requirement Constraints</h3>
            <p className="text-[11px] text-[#756e5a]">
              Evaluated deterministically against verified catalog records
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#f4f3ef] border border-[#d7d4c8] text-[11px] font-mono text-[#5c5645] font-semibold">
            <Sparkles className="w-3 h-3 mr-1 text-[#a91b1b]" />
            {isFallback ? "Parsed locally" : "AI Parsed"}
          </span>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 rounded-lg bg-[#1f1f1f] hover:bg-[#121212] text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Edit3 className="w-3 h-3" />
            <span>{isEditing ? "Close Editor" : "Adjust Constraints"}</span>
          </button>
        </div>
      </div>

      {!isEditing ? (
        <div className="flex flex-wrap gap-2 text-xs">
          {/* Category Chip */}
          <div className="px-3 py-1 rounded-lg bg-[#f4f3ef] border border-[#e5e5e2] text-[#1f1f1f] flex items-center space-x-1.5">
            <span className="text-[#756e5a]">Category:</span>
            <span className="font-bold capitalize">
              {requirements.category.replace("_", " ")}
            </span>
          </div>

          {/* Max Width Chip */}
          <div className="px-3 py-1 rounded-lg bg-[#f4f3ef] border border-[#e5e5e2] text-[#1f1f1f] flex items-center space-x-1.5">
            <span className="text-[#756e5a]">Max Width:</span>
            <span className="font-mono font-bold text-[#a91b1b]">
              {requirements.maxOverallWidthIn ? `${requirements.maxOverallWidthIn}"` : "Any"}
            </span>
          </div>

          {/* Compartments */}
          {requirements.compartments && (
            <div className="px-3 py-1 rounded-lg bg-[#f4f3ef] border border-[#e5e5e2] text-[#1f1f1f] flex items-center space-x-1.5">
              <span className="text-[#756e5a]">Compartments:</span>
              <span className="font-mono font-bold">{requirements.compartments} Bay</span>
            </div>
          )}

          {/* Drainboards */}
          <div className="px-3 py-1 rounded-lg bg-[#f4f3ef] border border-[#e5e5e2] text-[#1f1f1f] flex items-center space-x-1.5">
            <span className="text-[#756e5a]">Drainboards:</span>
            <span className="font-bold capitalize">
              {requirements.drainboardSide || "Any layout"}
            </span>
            {requirements.drainboardLengthIn && (
              <span className="text-[#756e5a] font-mono">({requirements.drainboardLengthIn}&quot;)</span>
            )}
          </div>

          {/* Bowl size */}
          {(requirements.bowlWidthIn && requirements.bowlFrontToBackIn) && (
            <div className="px-3 py-1 rounded-lg bg-[#f4f3ef] border border-[#e5e5e2] text-[#1f1f1f] flex items-center space-x-1.5">
              <span className="text-[#756e5a]">Bowl Size:</span>
              <span className="font-mono font-bold">
                {requirements.bowlWidthIn}&quot; x {requirements.bowlFrontToBackIn}&quot;
              </span>
            </div>
          )}

          {/* Mode */}
          <div className="px-3 py-1 rounded-lg bg-[#f4f3ef] border border-[#e5e5e2] text-[#1f1f1f] flex items-center space-x-1.5">
            <span className="text-[#756e5a]">Mode:</span>
            <span className={`font-bold ${requirements.exactFitOnly ? "text-emerald-700" : "text-amber-700"}`}>
              {requirements.exactFitOnly ? "Exact Fits Only" : "Include Near Fits"}
            </span>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-[#f4f3ef] border border-[#e5e5e2] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-[#1f1f1f] font-bold mb-1">Max Wall Width (in)</label>
              <input
                type="number"
                value={maxWidth}
                onChange={(e) => setMaxWidth(e.target.value)}
                placeholder="e.g. 90"
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#d7d4c8] text-[#1f1f1f] font-mono text-xs focus:ring-2 focus:ring-[#a91b1b] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#1f1f1f] font-bold mb-1">Drainboard Layout</label>
              <select
                value={drainboardSide}
                onChange={(e) => setDrainboardSide(e.target.value as DrainboardSide)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#d7d4c8] text-[#1f1f1f] text-xs focus:ring-2 focus:ring-[#a91b1b] focus:outline-none font-medium"
              >
                <option value="any">Any / No Preference</option>
                <option value="both">Both Sides (2 Drainboards)</option>
                <option value="left">Left Side Only</option>
                <option value="right">Right Side Only</option>
                <option value="none">No Drainboards</option>
              </select>
            </div>

            <div>
              <label className="block text-[#1f1f1f] font-bold mb-1">Drainboard Length</label>
              <select
                value={drainboardLength}
                onChange={(e) => setDrainboardLength(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#d7d4c8] text-[#1f1f1f] text-xs focus:ring-2 focus:ring-[#a91b1b] focus:outline-none font-medium"
              >
                <option value="">No Preference</option>
                <option value="18">18 Inches</option>
                <option value="24">24 Inches</option>
              </select>
            </div>

            <div>
              <label className="block text-[#1f1f1f] font-bold mb-1">Bowl Dimensions</label>
              <select
                value={bowlSize}
                onChange={(e) => setBowlSize(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#d7d4c8] text-[#1f1f1f] text-xs focus:ring-2 focus:ring-[#a91b1b] focus:outline-none font-medium"
              >
                <option value="any">Any Bowl Size</option>
                <option value="16x20">16&quot; x 20&quot; (B-Series Standard)</option>
                <option value="18x18">18&quot; x 18&quot; (Square Family)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#e5e5e2]">
            <label className="flex items-center space-x-2 text-xs text-[#5c5645] cursor-pointer">
              <input
                type="checkbox"
                checked={exactFit}
                onChange={(e) => setExactFit(e.target.checked)}
                className="rounded border-[#d7d4c8] text-[#a91b1b] focus:ring-0"
              />
              <span>Strict physical fit only (hide products that exceed max width or mismatch layout)</span>
            </label>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#e8e6df] text-[#5c5645] text-xs font-semibold border border-[#d7d4c8]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3.5 py-1.5 rounded-lg bg-[#a91b1b] hover:bg-[#8b1515] text-white text-xs font-bold flex items-center space-x-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Re-Rank Catalog</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
