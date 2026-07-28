"use client";

import React from "react";
import { AlertTriangle, Zap } from "lucide-react";
import type { GeoCountryData } from "@/lib/aseanGeo";

interface HeroMapTooltipProps {
  country: GeoCountryData;
  pos: { x: number; y: number };
}

export default function HeroMapTooltip({ country, pos }: HeroMapTooltipProps) {
  return (
    <div
      className="pointer-events-none absolute z-40 max-w-xs -translate-x-1/2 -translate-y-full transform rounded-xl border border-white/20 bg-slate-900/90 p-3 shadow-2xl backdrop-blur-md transition-all duration-75"
      style={{ left: `${pos.x}px`, top: `${pos.y - 12}px` }}
    >
      <div className="flex items-center justify-between gap-3 font-sans">
        <span className="font-serif-editorial text-sm font-bold text-white">
          {country.name}
        </span>
        <span
          className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
            country.regimeType === "Strict Localization"
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : country.regimeType === "Hybrid"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
          }`}
        >
          {country.regimeType}
        </span>
      </div>

      <div className="mt-1.5 flex items-center gap-2 text-[10px] text-slate-300 font-sans">
        <span className="flex items-center gap-1 font-semibold text-amber-400">
          <AlertTriangle className="h-3 w-3" />
          Threat: {country.threatScore}/5
        </span>
        <span className="text-slate-600">·</span>
        <span className="text-slate-400">{country.capital}</span>
      </div>

      <p className="mt-1 font-sans text-[10px] text-slate-400 line-clamp-2 leading-tight">
        {country.dataFlowPolicy}
      </p>

      <div className="mt-2 flex items-center gap-1 font-sans text-[9px] font-bold text-asean-yellow">
        <Zap className="h-3 w-3" />
        <span>CLICK TO INSPECT FULL DOSSIER</span>
      </div>
    </div>
  );
}
