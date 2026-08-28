"use client";

import React from "react";
import Link from "next/link";
import { useProjectSchedule } from "@/lib/project-store";
import {
  FolderKanban,
  Printer,
  Download,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function ProjectSchedulePage() {
  const {
    items,
    itemCount,
    isLoaded,
    removeItem,
    updateQuantity,
    updateNotes,
    clearProject,
  } = useProjectSchedule();

  const handleExportJson = () => {
    const exportData = {
      projectTitle: "John Boos Commercial Kitchen Equipment Schedule",
      exportedAt: new Date().toISOString(),
      itemCount,
      disclaimer: "Private concept demonstration by Metamend. Not affiliated with or endorsed by John Boos & Co.",
      items: items.map((i) => ({
        model: i.product.model,
        brand: i.product.brand,
        category: i.product.category,
        dimensions: {
          widthIn: i.product.overall.widthIn,
          depthIn: i.product.overall.depthIn,
          heightIn: i.product.overall.heightIn,
        },
        sinkDetails: i.product.sink || null,
        topDetails: i.product.top || null,
        quantity: i.quantity,
        notes: i.notes,
        source: i.product.source,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `john-boos-equipment-schedule-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isLoaded) {
    return <div className="py-12 text-center text-[#756e5a]">Loading equipment schedule...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#f4f3ef] border border-[#e5e5e2] flex items-center justify-center mx-auto text-[#756e5a]">
          <FolderKanban className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-serif font-bold text-[#1f1f1f]">Project Schedule Empty</h1>
          <p className="text-xs text-[#756e5a] max-w-md mx-auto leading-relaxed">
            You have not added any commercial equipment to your local project schedule yet.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg bg-[#a91b1b] hover:bg-[#8b1515] text-white font-bold text-xs transition-colors"
          >
            Launch Specifier
          </Link>
          <Link
            href="/catalog"
            className="px-5 py-2.5 rounded-lg bg-white hover:bg-[#f4f3ef] text-[#1f1f1f] font-semibold text-xs border border-[#d7d4c8] transition-colors"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#f4f3ef] border border-[#d7d4c8] text-[11px] font-semibold text-[#5c5645] mb-1">
            <FolderKanban className="w-3 h-3 text-[#a91b1b]" />
            <span>Specification Schedule</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#1f1f1f] tracking-tight">
            Commercial Equipment Schedule
          </h1>
          <p className="text-xs text-[#756e5a]">
            {items.length} line item{items.length > 1 ? "s" : ""} ({itemCount} total units) saved in local project session
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportJson}
            className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#f4f3ef] text-[#1f1f1f] border border-[#d7d4c8] text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#a91b1b]" />
            <span>Export Schedule JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-lg bg-[#a91b1b] hover:bg-[#8b1515] text-white text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Specification Sheet</span>
          </button>

          <button
            onClick={clearProject}
            className="p-2.5 rounded-lg bg-white hover:bg-[#f4f3ef] border border-[#d7d4c8] text-[#756e5a] hover:text-[#a91b1b] transition-colors"
            title="Clear all items"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Print-Only Header */}
      <div className="hidden print-only text-black mb-6">
        <h1 className="text-2xl font-bold font-serif">John Boos &amp; Co. &bull; Commercial Equipment Schedule</h1>
        <p className="text-sm text-gray-600">
          Commercial Kitchen Specification Sheet &bull; Metamend Specifier
        </p>
        <p className="text-xs text-gray-500 mt-1">Date: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Schedule Table */}
      <div className="border border-[#e5e5e2] rounded-2xl bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f4f3ef] border-b border-[#e5e5e2] text-[11px] font-bold uppercase tracking-wider text-[#1f1f1f]">
              <tr>
                <th className="py-4 px-4">Line</th>
                <th className="py-4 px-4">Model &amp; Family</th>
                <th className="py-4 px-4">Dimensions (WxDxH)</th>
                <th className="py-4 px-4">Key Specifications</th>
                <th className="py-4 px-4 text-center">Qty</th>
                <th className="py-4 px-4">Location / Station Notes</th>
                <th className="py-4 px-4 text-right no-print">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#e5e5e2] text-[#474235]">
              {items.map((item, idx) => {
                const p = item.product;
                const isSink = p.category === "compartment_sink";
                return (
                  <tr key={item.id} className="hover:bg-[#fbfaf8] transition-colors">
                    {/* Line # */}
                    <td className="py-4 px-4 font-mono text-[#756e5a] font-bold">
                      {(idx + 1).toString().padStart(2, "0")}
                    </td>

                    {/* Model */}
                    <td className="py-4 px-4 space-y-0.5">
                      <Link
                        href={`/products/${encodeURIComponent(p.model)}`}
                        className="font-mono font-bold text-base text-[#1f1f1f] hover:text-[#a91b1b] transition-colors block"
                      >
                        {p.model}
                      </Link>
                      <span className="text-[11px] text-[#756e5a] block font-medium">{p.family}</span>
                    </td>

                    {/* Dimensions */}
                    <td className="py-4 px-4 font-mono font-medium">
                      <div>{p.overall.widthIn}&quot; W x {p.overall.depthIn}&quot; D</div>
                      {p.overall.heightIn && (
                        <div className="text-[#756e5a] text-[11px]">{p.overall.heightIn}&quot; H</div>
                      )}
                    </td>

                    {/* Key Specs */}
                    <td className="py-4 px-4 space-y-0.5">
                      {isSink && p.sink ? (
                        <>
                          <div className="font-bold text-[#1f1f1f]">
                            3 Bay &bull; {p.sink.bowlWidthIn}&quot;x{p.sink.bowlFrontToBackIn}&quot; Bowls
                          </div>
                          <div className="text-[11px] text-[#756e5a]">
                            {p.sink.drainboardCount === 0
                              ? "No drainboards"
                              : p.sink.drainboardCount === 2
                              ? `Two ${p.sink.leftDrainboardIn}" Drainboards`
                              : `One ${p.sink.leftDrainboardIn || p.sink.rightDrainboardIn}" Drainboard`}
                          </div>
                        </>
                      ) : (
                        <div className="font-semibold text-[#1f1f1f]">
                          {p.top.gauge ? `${p.top.gauge}GA Stainless Top` : "Commercial Grade Table"}
                        </div>
                      )}
                    </td>

                    {/* Qty Control */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center space-x-1.5 bg-[#f4f3ef] px-2.5 py-1 rounded-lg border border-[#d7d4c8]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-[#756e5a] hover:text-[#1f1f1f] p-0.5 no-print"
                          title="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-[#1f1f1f] px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-[#756e5a] hover:text-[#1f1f1f] p-0.5 no-print"
                          title="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Notes */}
                    <td className="py-4 px-4">
                      <input
                        type="text"
                        value={item.notes}
                        onChange={(e) => updateNotes(item.id, e.target.value)}
                        placeholder="e.g. Dishwashing Area, Station 2..."
                        className="w-full bg-[#fbfaf8] border border-[#d7d4c8] rounded-md px-3 py-1.5 text-xs text-[#1f1f1f] placeholder-[#948d77] focus:outline-none focus:border-[#a91b1b]"
                      />
                    </td>

                    {/* Remove Action */}
                    <td className="py-4 px-4 text-right no-print">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded text-[#948d77] hover:text-[#a91b1b] hover:bg-[#f4f3ef] transition-colors"
                        title="Remove from schedule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="p-5 rounded-2xl bg-white border border-[#e5e5e2] text-xs text-[#5c5645] space-y-1">
        <p className="font-bold text-[#1f1f1f]">Specification Schedule Notice:</p>
        <p className="leading-relaxed">
          All line items in this concept demonstration are based on public manufacturer documentation. Final field measurements, plumbing connections, and code requirements must be verified with John Boos &amp; Co. prior to fabrication.
        </p>
      </div>
    </div>
  );
}
