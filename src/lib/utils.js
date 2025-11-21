import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function SmartSplit(text) {
  if (!text) return null;

  const cleaned = text.trim();

  // Middle index of the text
  const mid = Math.floor(cleaned.length / 2);

  // Find nearest full stop after the midpoint
  let splitIndex = cleaned.indexOf(".", mid);

  // If no full stop after the midpoint, find before midpoint
  if (splitIndex === -1) {
    splitIndex = cleaned.lastIndexOf(".", mid);
  }

  // Fallback: if still no full stop (rare), split at the midpoint
  if (splitIndex === -1) {
    splitIndex = mid;
  }

  const firstPara = cleaned.slice(0, splitIndex + 1);
  const secondPara = cleaned.slice(splitIndex + 1).trim();

  return [firstPara, secondPara];
}
