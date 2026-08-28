import React from "react";
import { Product } from "@/domain/types";
import { formatDimension, formatGauge } from "@/lib/utils";

interface ProductSpecTableProps {
  product: Product;
}

export const ProductSpecTable: React.FC<ProductSpecTableProps> = ({ product }) => {
  const isSink = product.category === "compartment_sink";

  const renderVal = (val: string | number | null | undefined, unit = "in") => {
    if (val === null || val === undefined || val === "") {
      return (
        <span className="text-[#948d77] italic text-[11px]">Not included in demo data</span>
      );
    }
    return <span className="font-mono text-[#1f1f1f] font-bold">{typeof val === "number" ? `${val} ${unit}` : val}</span>;
  };

  return (
    <div className="overflow-hidden border border-[#e5e5e2] rounded-2xl bg-white shadow-xs">
      <div className="px-5 py-3 bg-[#f4f3ef] border-b border-[#e5e5e2] flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f]">
          Verified Technical Specifications
        </span>
        <span className="text-[11px] font-mono text-[#756e5a]">
          Model: <span className="text-[#1f1f1f] font-black">{product.model}</span>
        </span>
      </div>

      <div className="divide-y divide-[#e5e5e2] text-xs">
        {/* Dimensions Group */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 bg-white">
          <div>
            <span className="text-[#756e5a] block text-[11px] font-medium">Overall Width (L to R)</span>
            {renderVal(product.overall.widthIn)}
          </div>
          <div>
            <span className="text-[#756e5a] block text-[11px] font-medium">Overall Depth (F to B)</span>
            {renderVal(product.overall.depthIn)}
          </div>
          <div>
            <span className="text-[#756e5a] block text-[11px] font-medium">Overall Working Height</span>
            {renderVal(product.overall.heightIn)}
          </div>
        </div>

        {/* Sink Specific Details */}
        {isSink && product.sink && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#fbfaf8]">
            <div>
              <span className="text-[#756e5a] block text-[11px] font-medium">Compartments</span>
              {renderVal(product.sink.compartments, "Bay")}
            </div>
            <div>
              <span className="text-[#756e5a] block text-[11px] font-medium">Bowl Width x F-to-B</span>
              {product.sink.bowlWidthIn && product.sink.bowlFrontToBackIn ? (
                <span className="font-mono text-[#1f1f1f] font-bold">
                  {product.sink.bowlWidthIn}&quot; x {product.sink.bowlFrontToBackIn}&quot;
                </span>
              ) : (
                renderVal(null)
              )}
            </div>
            <div>
              <span className="text-[#756e5a] block text-[11px] font-medium">Bowl Water Depth</span>
              {renderVal(product.sink.bowlDepthIn)}
            </div>
            <div>
              <span className="text-[#756e5a] block text-[11px] font-medium">Backsplash Height</span>
              {renderVal(product.sink.backsplashIn)}
            </div>
            <div className="sm:col-span-2">
              <span className="text-[#756e5a] block text-[11px] font-medium">Left Drainboard Length</span>
              {product.sink.leftDrainboardIn && product.sink.leftDrainboardIn > 0
                ? renderVal(product.sink.leftDrainboardIn)
                : <span className="font-mono text-[#756e5a]">0 in (None)</span>}
            </div>
            <div className="sm:col-span-2">
              <span className="text-[#756e5a] block text-[11px] font-medium">Right Drainboard Length</span>
              {product.sink.rightDrainboardIn && product.sink.rightDrainboardIn > 0
                ? renderVal(product.sink.rightDrainboardIn)
                : <span className="font-mono text-[#756e5a]">0 in (None)</span>}
            </div>
          </div>
        )}

        {/* Material & Construction */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 bg-white">
          <div>
            <span className="text-[#756e5a] block text-[11px] font-medium">Top Stainless Gauge</span>
            <span className="font-mono text-[#1f1f1f] font-bold">
              {product.top.gauge ? formatGauge(product.top.gauge) : <span className="text-[#948d77] italic text-[11px]">Not included in demo data</span>}
            </span>
          </div>
          <div>
            <span className="text-[#756e5a] block text-[11px] font-medium">Stainless Series</span>
            <span className="font-mono text-[#1f1f1f] font-bold">
              {product.top.stainlessType || <span className="text-[#948d77] italic text-[11px]">Not included in demo data</span>}
            </span>
          </div>
          <div>
            <span className="text-[#756e5a] block text-[11px] font-medium">Certifications</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {product.certifications.length > 0 ? (
                product.certifications.map((c, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-[#f4f3ef] text-[#1f1f1f] text-[10px] font-mono font-bold border border-[#d7d4c8]">
                    {c}
                  </span>
                ))
              ) : (
                <span className="text-[#948d77] italic text-[11px]">Not included in demo data</span>
              )}
            </div>
          </div>
        </div>

        {/* Key Features */}
        {product.features.length > 0 && (
          <div className="p-5 bg-[#fbfaf8]">
            <span className="text-[#756e5a] block text-[11px] font-medium mb-1.5">Key Verified Construction Features</span>
            <ul className="list-disc list-inside space-y-1 text-[#474235]">
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
