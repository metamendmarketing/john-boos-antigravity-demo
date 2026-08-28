"use client";

import React, { useState } from "react";
import { Product } from "@/domain/types";
import { ShieldCheck, ExternalLink, ChevronDown, ChevronUp, Calendar, FileText } from "lucide-react";

interface SourceEvidenceDrawerProps {
  product: Product;
}

export const SourceEvidenceDrawer: React.FC<SourceEvidenceDrawerProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { source, verificationStatus } = product;

  return (
    <div className="border border-[#e5e5e2] rounded-xl bg-white overflow-hidden text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#f4f3ef] transition-colors text-left"
      >
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-[#1f1f1f]">
            {verificationStatus === "verified_public" ? "Verified Public Data Truth-Set" : "Public Reference Record"}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold">
            Source Traceable
          </span>
        </div>
        <div className="flex items-center space-x-1 text-[#756e5a] text-[11px] font-medium">
          <span>{isOpen ? "Hide Provenance" : "View Source Provenance"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-2 border-t border-[#e5e5e2] space-y-3 bg-[#fbfaf8]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#474235]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#756e5a] block mb-0.5">Source Document / Page</span>
              <p className="font-semibold text-[#1f1f1f] flex items-center">
                <FileText className="w-3.5 h-3.5 mr-1 text-[#a91b1b]" />
                {source.title}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#756e5a] block mb-0.5">Verification Date</span>
              <p className="font-semibold text-[#1f1f1f] flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-[#756e5a]" />
                {source.verifiedOn}
              </p>
            </div>
          </div>

          {source.notes && (
            <div className="p-3 rounded-lg bg-white border border-[#e5e5e2] text-[#5c5645] text-[11px]">
              <span className="font-bold text-[#1f1f1f] block mb-0.5">Verification Notes:</span>
              {source.notes}
            </div>
          )}

          <div className="pt-2 flex items-center justify-between border-t border-[#e5e5e2]">
            <span className="text-[10px] text-[#756e5a]">
              Source Type: <span className="font-mono font-bold text-[#1f1f1f]">{source.sourceType}</span>
            </span>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#1f1f1f] hover:bg-[#121212] text-white font-semibold transition-colors text-[11px]"
            >
              <span>Open Original Public Reference</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
