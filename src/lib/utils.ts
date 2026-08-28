import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDimension(val: number | null | undefined, unit = "in"): string {
  if (val === null || val === undefined || isNaN(val)) {
    return "Not included in demo data";
  }
  return `${val} ${unit}`;
}

export function formatGauge(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) {
    return "Not included in demo data";
  }
  return `${val} Gauge`;
}
