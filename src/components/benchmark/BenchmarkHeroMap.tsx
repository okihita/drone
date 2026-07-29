"use client";

import React, { useState, useMemo } from "react";
import { getRealAseanCountries } from "@/lib/aseanGeo";
import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";

const FLAG_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL,
};

/** Digital 2 Dozen cluster → color for the legend */
const CLUSTER_LEGEND = [
  { fill: "#CC0000", label: "Infrastructure & Access" },
  { fill: "#003399", label: "Data Governance & Flows" },
  { fill: "#CC8800", label: "Technology Sovereignty" },
  { fill: "#008855", label: "Consumer Trust & Security" },
  { fill: "#0066CC", label: "IP & Standards" },
];

export default function BenchmarkHeroMap() {
  const countries = useMemo(() => getRealAseanCountries(), []);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  // Color countries by threatScore → cluster mapping for visual grouping
  const countryColors = useMemo(() => {
    const map = new Map<string, string>();
    const colors = CLUSTER_LEGEND.map((l) => l.fill);
    for (const c of countries) {
      const idx = c.threatScore >= 4 ? 0 : c.threatScore === 3 ? 2 : c.threatScore === 2 ? 3 : 4;
      map.set(c.code, colors[idx]);
    }
    return map;
  }, [countries]);

  return (
    <section className="relative border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-hud-grid pointer-events-none opacity-[0.03] dark:opacity-[0.06]" />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header + Legend */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif-editorial text-xl font-extrabold text-slate-900 dark:text-white">
              Geographic Compliance Overview
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
              Countries colored by primary Digital 2 Dozen risk profile. Click a flag or country to inspect.
            </p>
          </div>

          {/* Cluster legend */}
          <div className="hidden sm:flex items-center gap-3">
            {CLUSTER_LEGEND.map((val) => (
              <div key={val.label} className="flex items-center gap-1.5 text-[10px] font-sans text-slate-500 dark:text-slate-400">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: val.fill }} />
                <span className="hidden lg:inline">{val.label.split(" & ")[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map area */}
        <div className="relative w-full aspect-[16/9] max-h-[460px]">
          <svg
            viewBox="0 0 570 450"
            preserveAspectRatio="xMidYMin meet"
            className="w-full h-full"
            role="img"
            aria-label="ASEAN Digital 2 Dozen geographic overview"
          >
            <rect width="570" height="450" fill="none" />

            {countries.map((country) => {
              const color = countryColors.get(country.code) ?? "#94a3b8";
              const isHovered = hoveredCode === country.code;
              const isSelected = selectedCode === country.code;

              return (
                <g key={country.code}>
                  {isSelected && (
                    <path
                      d={country.pathD}
                      fill="none"
                      stroke={color}
                      strokeWidth="8"
                      strokeLinejoin="round"
                      opacity="0.3"
                      filter="url(#bm-glow)"
                    />
                  )}
                  <path
                    d={country.pathD}
                    fill={color}
                    fillOpacity={isHovered || isSelected ? 0.9 : 0.65}
                    stroke={isHovered || isSelected ? "#fff" : "transparent"}
                    strokeWidth={isHovered || isSelected ? 2 : 0}
                    strokeLinejoin="round"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredCode(country.code)}
                    onMouseLeave={() => setHoveredCode(null)}
                    onClick={() => setSelectedCode(selectedCode === country.code ? null : country.code)}
                  />
                  <circle
                    cx={country.centerPos.x}
                    cy={country.centerPos.y}
                    r={isSelected || isHovered ? 5 : 3.5}
                    fill="#fff"
                    stroke={color}
                    strokeWidth="1.5"
                    className="pointer-events-none"
                  />
                  <text
                    x={country.centerPos.x}
                    y={country.centerPos.y + 14}
                    textAnchor="middle"
                    className="pointer-events-none font-sans text-[9px] font-bold uppercase select-none"
                    fill="#fff"
                    style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                  >
                    {country.code}
                  </text>

                  {isHovered && (
                    <g>
                      <rect x={country.centerPos.x - 36} y={country.centerPos.y - 32} width="72" height="18" rx="4" fill="#0f172a" fillOpacity="0.92" />
                      <text x={country.centerPos.x} y={country.centerPos.y - 19} textAnchor="middle" className="fill-white font-sans text-[10px] font-bold">
                        {country.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            <defs>
              <filter id="bm-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Country flag dock bar */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-center">
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar rounded-xl border border-slate-200 bg-white/90 p-1.5 shadow-xs backdrop-blur-md max-w-full dark:border-white/20 dark:bg-slate-950/85">
              {countries.map((c) => {
                const isSelected = selectedCode === c.code;
                const FlagIcon = FLAG_COMPONENTS[c.code];

                return (
                  <button
                    key={c.code}
                    onClick={() => setSelectedCode(selectedCode === c.code ? null : c.code)}
                    title={`${c.name} — ${c.regimeType}`}
                    className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] font-bold transition-all ${
                      isSelected
                        ? "border-asean-yellow bg-asean-yellow/25 text-asean-yellow shadow-xs"
                        : "border-slate-200 bg-slate-100/80 text-slate-700 hover:border-slate-300 hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-white/25 dark:hover:bg-white/15 dark:hover:text-white"
                    }`}
                  >
                    {FlagIcon ? (
                      <FlagIcon className="w-4 h-3 rounded-xs object-cover shadow-xs" />
                    ) : (
                      <span className="font-mono text-[10px]">[{c.code}]</span>
                    )}
                    <span className="font-mono text-[11px]">{c.code}</span>
                    {c.threatScore >= 4 && (
                      <span className="h-1.5 w-1.5 rounded-full bg-asean-red animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected country quick card */}
        {selectedCode && (
          <div className="mt-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm animate-[fadeIn_0.15s_ease-out]">
            {(() => {
              const c = countries.find((x) => x.code === selectedCode);
              if (!c) return null;
              return (
                <div className="flex flex-wrap items-center gap-4 text-xs font-sans">
                  <span className="font-mono text-lg font-extrabold text-slate-900 dark:text-white">{c.code}</span>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{c.name}</span>
                    <span className="ml-2 text-slate-500">{c.capital}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white" style={{ backgroundColor: countryColors.get(c.code) ?? "#94a3b8" }}>
                    {c.regimeType}
                  </span>
                  <span className="text-slate-400">Threat: <strong className="text-slate-700 dark:text-slate-300">{c.threatScore}/5</strong></span>
                  <span className="text-slate-400">Policies: <strong className="text-slate-700 dark:text-slate-300">{c.activePoliciesCount}</strong></span>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}
