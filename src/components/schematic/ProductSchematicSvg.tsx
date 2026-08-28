"use client";

import React from "react";
import { Product } from "@/domain/types";

interface ProductSchematicSvgProps {
  product: Product;
  className?: string;
  showLabels?: boolean;
}

export const ProductSchematicSvg: React.FC<ProductSchematicSvgProps> = ({
  product,
  className = "w-full h-auto max-h-56",
  showLabels = true,
}) => {
  const isSink = product.category === "compartment_sink";
  const overallWidth = product.overall.widthIn || (isSink ? 87 : 48);
  const overallDepth = product.overall.depthIn || (isSink ? 25.5 : 24);

  // SVG canvas geometry with margins for dimension lines
  const marginX = showLabels ? 42 : 10;
  const marginY = showLabels ? 36 : 10;
  const scale = 4; // pixels per inch

  const bodyW = overallWidth * scale;
  const bodyH = overallDepth * scale;
  const svgW = bodyW + marginX * 2;
  const svgH = bodyH + marginY * 2;

  if (isSink && product.sink) {
    const leftBoardIn = product.sink.leftDrainboardIn || 0;
    const rightBoardIn = product.sink.rightDrainboardIn || 0;
    const bowlWIn = product.sink.bowlWidthIn || 16;
    const bowlDepthIn = product.sink.bowlFrontToBackIn || 20;
    const compartments = product.sink.compartments || 3;

    const leftBoardPx = leftBoardIn * scale;
    const rightBoardPx = rightBoardIn * scale;
    const bowlWPx = bowlWIn * scale;
    const bowlHPx = bowlDepthIn * scale;

    const startX = marginX;
    const startY = marginY;

    // Center bowls vertically inside depth
    const bowlStartY = startY + (bodyH - bowlHPx) / 2;

    // Calculate bowl area starting X
    const bowlAreaStartX = startX + leftBoardPx + (leftBoardPx > 0 ? 4 : 8);

    return (
      <div className="flex flex-col items-center justify-center p-4 bg-[#f4f3ef] rounded-xl border border-[#e5e5e2]">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          style={{ maxWidth: "100%", height: "auto" }}
        >
          <defs>
            {/* Drainboard rib pattern */}
            <pattern id="drainRibsLight" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="12" stroke="#b8b3a0" strokeWidth="1.2" strokeOpacity="0.8" />
            </pattern>
          </defs>

          {/* Dimension line top (Overall Width) */}
          {showLabels && (
            <g className="text-[#1f1f1f] font-mono text-[10px]">
              {/* Left leader */}
              <line x1={startX} y1={marginY - 18} x2={startX} y2={marginY} stroke="#948d77" strokeWidth="1" strokeDasharray="2,2" />
              {/* Right leader */}
              <line x1={startX + bodyW} y1={marginY - 18} x2={startX + bodyW} y2={marginY} stroke="#948d77" strokeWidth="1" strokeDasharray="2,2" />
              {/* Horizontal line with arrows */}
              <line x1={startX} y1={marginY - 12} x2={startX + bodyW} y2={marginY - 12} stroke="#1f1f1f" strokeWidth="1.2" />
              <polygon points={`${startX},${marginY - 12} ${startX + 5},${marginY - 15} ${startX + 5},${marginY - 9}`} fill="#1f1f1f" />
              <polygon points={`${startX + bodyW},${marginY - 12} ${startX + bodyW - 5},${marginY - 15} ${startX + bodyW - 5},${marginY - 9}`} fill="#1f1f1f" />
              {/* Width Text */}
              <text x={startX + bodyW / 2} y={marginY - 16} textAnchor="middle" fill="#1f1f1f" fontWeight="700">
                {overallWidth}&quot; Overall Width
              </text>
            </g>
          )}

          {/* Main Outer Body */}
          <rect
            x={startX}
            y={startY}
            width={bodyW}
            height={bodyH}
            rx="4"
            fill="#e8e6df"
            stroke="#1f1f1f"
            strokeWidth="2"
          />

          {/* Left Drainboard */}
          {leftBoardPx > 0 && (
            <g>
              <rect
                x={startX + 3}
                y={startY + 3}
                width={leftBoardPx - 6}
                height={bodyH - 6}
                rx="2"
                fill="url(#drainRibsLight)"
                stroke="#948d77"
                strokeWidth="1"
              />
              {showLabels && (
                <text
                  x={startX + leftBoardPx / 2}
                  y={startY + bodyH / 2 + 3}
                  textAnchor="middle"
                  fill="#474235"
                  className="font-mono text-[9px] font-bold select-none"
                >
                  {leftBoardIn}&quot; LH Board
                </text>
              )}
            </g>
          )}

          {/* Compartment Bowls */}
          {Array.from({ length: compartments }).map((_, idx) => {
            const bx = bowlAreaStartX + idx * (bowlWPx + 6);
            return (
              <g key={idx}>
                {/* Bowl Cavity */}
                <rect
                  x={bx}
                  y={bowlStartY}
                  width={bowlWPx}
                  height={bowlHPx}
                  rx="6"
                  fill="#ffffff"
                  stroke="#1f1f1f"
                  strokeWidth="1.5"
                />
                {/* Drain circle */}
                <circle cx={bx + bowlWPx / 2} cy={bowlStartY + bowlHPx / 2} r="5" fill="#d7d4c8" stroke="#756e5a" strokeWidth="1" />
                <circle cx={bx + bowlWPx / 2} cy={bowlStartY + bowlHPx / 2} r="2" fill="#1f1f1f" />

                {/* Inner bowl label on first bowl */}
                {idx === 0 && showLabels && (
                  <text
                    x={bx + bowlWPx / 2}
                    y={bowlStartY + bowlHPx - 8}
                    textAnchor="middle"
                    fill="#756e5a"
                    className="font-mono text-[8px] font-bold select-none"
                  >
                    {bowlWIn}&quot;x{bowlDepthIn}&quot;
                  </text>
                )}
              </g>
            );
          })}

          {/* Right Drainboard */}
          {rightBoardPx > 0 && (
            <g>
              <rect
                x={startX + bodyW - rightBoardPx + 3}
                y={startY + 3}
                width={rightBoardPx - 6}
                height={bodyH - 6}
                rx="2"
                fill="url(#drainRibsLight)"
                stroke="#948d77"
                strokeWidth="1"
              />
              {showLabels && (
                <text
                  x={startX + bodyW - rightBoardPx / 2}
                  y={startY + bodyH / 2 + 3}
                  textAnchor="middle"
                  fill="#474235"
                  className="font-mono text-[9px] font-bold select-none"
                >
                  {rightBoardIn}&quot; RH Board
                </text>
              )}
            </g>
          )}

          {/* Backsplash indicator across top edge */}
          <line
            x1={startX + 2}
            y1={startY + 2}
            x2={startX + bodyW - 2}
            y2={startY + 2}
            stroke="#a91b1b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[10px] text-[#756e5a] mt-2 font-mono font-medium">
          Top-down schematic (scale proportional to {overallWidth}&quot;W x {overallDepth}&quot;D)
        </span>
      </div>
    );
  }

  // Non-sink technical diagram (Work tables, Filler tables, Equipment stands)
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#f4f3ef] rounded-xl border border-[#e5e5e2]">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        {/* Width Dimension */}
        {showLabels && (
          <g className="text-[#1f1f1f] font-mono text-[10px]">
            <line x1={marginX} y1={marginY - 12} x2={marginX + bodyW} y2={marginY - 12} stroke="#1f1f1f" strokeWidth="1.2" />
            <polygon points={`${marginX},${marginY - 12} ${marginX + 5},${marginY - 15} ${marginX + 5},${marginY - 9}`} fill="#1f1f1f" />
            <polygon points={`${marginX + bodyW},${marginY - 12} ${marginX + bodyW - 5},${marginY - 15} ${marginX + bodyW - 5},${marginY - 9}`} fill="#1f1f1f" />
            <text x={marginX + bodyW / 2} y={marginY - 16} textAnchor="middle" fill="#1f1f1f" fontWeight="700">
              {overallWidth}&quot; Length / Width
            </text>
          </g>
        )}

        {/* Table Top Surface */}
        <rect
          x={marginX}
          y={marginY}
          width={bodyW}
          height={bodyH}
          rx="4"
          fill="#e8e6df"
          stroke="#1f1f1f"
          strokeWidth="2"
        />

        {/* Table Surface Texture Lines */}
        <line x1={marginX + 10} y1={marginY + bodyH / 2} x2={marginX + bodyW - 10} y2={marginY + bodyH / 2} stroke="#b8b3a0" strokeWidth="1" strokeDasharray="4,4" />

        {/* Center Label */}
        <text
          x={marginX + bodyW / 2}
          y={marginY + bodyH / 2 + 4}
          textAnchor="middle"
          fill="#1f1f1f"
          className="font-mono text-[10px] font-bold"
        >
          {product.top.gauge ? `${product.top.gauge}GA ` : ""}Stainless Work Surface ({overallWidth}&quot; x {overallDepth}&quot;)
        </text>

        {/* Rear up-turn / Backsplash if any */}
        <line
          x1={marginX + 2}
          y1={marginY + 2}
          x2={marginX + bodyW - 2}
          y2={marginY + 2}
          stroke="#a91b1b"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[10px] text-[#756e5a] mt-2 font-mono font-medium">
        Top surface schematic ({overallWidth}&quot;W x {overallDepth}&quot;D)
      </span>
    </div>
  );
};
