import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface WidthClearanceMeterProps {
  productWidth: number | null;
  maxWallWidth?: number | null;
}

export const WidthClearanceMeter: React.FC<WidthClearanceMeterProps> = ({
  productWidth,
  maxWallWidth,
}) => {
  if (!productWidth) return null;

  if (!maxWallWidth) {
    return (
      <div className="p-3 rounded-xl bg-[#f4f3ef] border border-[#e5e5e2] flex items-center justify-between text-xs">
        <span className="text-[#756e5a] font-medium">Overall Width:</span>
        <span className="font-mono font-bold text-[#1f1f1f]">{productWidth}&quot;</span>
      </div>
    );
  }

  const remaining = maxWallWidth - productWidth;
  const isFit = remaining >= 0;
  const percentage = Math.min(100, Math.max(0, (productWidth / maxWallWidth) * 100));

  return (
    <div className="p-3.5 rounded-xl bg-[#f4f3ef] border border-[#e5e5e2] space-y-2.5 text-xs">
      <div className="flex items-center justify-between">
        <span className="text-[#1f1f1f] flex items-center space-x-1.5 font-bold">
          {isFit ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <XCircle className="w-4 h-4 text-red-600" />
          )}
          <span>
            {isFit ? "Fits Available Wall Space" : "Exceeds Available Space"}
          </span>
        </span>
        <span className="font-mono text-[11px] text-[#5c5645] font-semibold">
          {productWidth}&quot; / {maxWallWidth}&quot; Space
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 bg-[#d7d4c8] rounded-full overflow-hidden flex">
        <div
          className={`h-full rounded-full transition-all ${
            isFit ? "bg-emerald-600" : "bg-red-600"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#5c5645]">
        <span>Wall limit: {maxWallWidth}&quot;</span>
        <span className={`font-mono font-bold ${isFit ? "text-emerald-700" : "text-red-700"}`}>
          {isFit ? `${remaining}" Remaining Clearance` : `${Math.abs(remaining)}" Too Wide`}
        </span>
      </div>
    </div>
  );
};
