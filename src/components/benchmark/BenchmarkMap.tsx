"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getRealAseanCountries } from "@/lib/aseanGeo";
import type { BenchmarkCountrySummary } from "@/types/benchmark";
import { ArrowRight, X } from "lucide-react";

interface Props {
  summaries: BenchmarkCountrySummary[];
}

function scoreColor(score: number): string {
  if (score >= 80) return "#059669";
  if (score >= 65) return "#22c55e";
  if (score >= 50) return "#eab308";
  if (score >= 35) return "#f97316";
  if (score >= 20) return "#dc2626";
  return "#991b1b";
}

export default function BenchmarkMap({ summaries }: Props) {
  const countries = useMemo(() => getRealAseanCountries(), []);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const scoreMap = useMemo(() => {
    const map = new Map<string, BenchmarkCountrySummary>();
    for (const s of summaries) map.set(s.countryCode, s);
    return map;
  }, [summaries]);

  const selectedSummary = selectedCode ? scoreMap.get(selectedCode) : null;

  return (
    <section className="relative border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 overflow-hidden">
      {/* Subtle grid background — matching homepage */}
      <div className="absolute inset-0 bg-hud-grid pointer-events-none opacity-[0.04] dark:opacity-[0.08]" />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif-editorial text-xl font-extrabold text-slate-900 dark:text-white">
              Geographic Compliance Overview
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">
              Countries colored by overall Digital 2 Dozen score. Hover for details, click for full breakdown.
            </p>
          </div>
          {/* Legend */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-sans text-slate-500 dark:text-slate-400">
            {[
              { label: "80+", color: "#059669" },
              { label: "65–79", color: "#22c55e" },
              { label: "50–64", color: "#eab308" },
              { label: "35–49", color: "#f97316" },
              { label: "20–34", color: "#dc2626" },
              { label: "<20", color: "#991b1b" },
            ].map((l) => (
              <span key={l.label} className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: l.color }} />
                {l.label}
              </span>
            ))}
          </div>
        </div>

        {/* Map container — matching observatory map sizing */}
        <div className="w-full aspect-[16/9] max-h-[460px] relative">
          <svg
            viewBox="0 0 570 450"
            preserveAspectRatio="xMidYMin meet"
            className="w-full h-full"
            role="img"
            aria-label="ASEAN Digital 2 Dozen compliance map"
          >
            {/* Ocean background */}
            <rect width="570" height="450" fill="none" />

            {countries.map((country) => {
              const summary = scoreMap.get(country.code);
              const overall = summary?.overallScore ?? 0;
              const fill = overall > 0 ? scoreColor(overall) : "#94a3b8";
              const isHovered = hoveredCode === country.code;
              const isSelected = selectedCode === country.code;

              return (
                <g
                  key={country.code}
                  className="cursor-pointer transition-opacity duration-200"
                >
                  {/* Glow for selected country */}
                  {isSelected && (
                    <path
                      d={country.pathD}
                      fill="none"
                      stroke={fill}
                      strokeWidth="8"
                      strokeLinejoin="round"
                      opacity="0.3"
                      filter="url(#bm-glow)"
                    />
                  )}
                  <path
                    d={country.pathD}
                    fill={fill}
                    fillOpacity={isHovered || isSelected ? 1 : 0.8}
                    stroke={isHovered || isSelected ? "#fff" : "transparent"}
                    strokeWidth={isHovered || isSelected ? 2 : 0}
                    strokeLinejoin="round"
                    className="transition-all duration-200"
                    onMouseEnter={() => setHoveredCode(country.code)}
                    onMouseLeave={() => setHoveredCode(null)}
                    onClick={() => setSelectedCode(selectedCode === country.code ? null : country.code)}
                  />
                  {/* Center dot */}
                  <circle
                    cx={country.centerPos.x}
                    cy={country.centerPos.y}
                    r={isSelected || isHovered ? 5 : 3.5}
                    fill="#fff"
                    stroke={fill}
                    strokeWidth="1.5"
                    className="pointer-events-none"
                  />
                  {/* Country label */}
                  <text
                    x={country.centerPos.x}
                    y={country.centerPos.y + 14}
                    textAnchor="middle"
                    className="pointer-events-none font-sans text-[9px] font-bold uppercase tracking-wider select-none"
                    fill="#fff"
                    style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                  >
                    {country.code}
                  </text>

                  {/* Hover tooltip */}
                  {isHovered && overall > 0 && (
                    <g>
                      <rect
                        x={country.centerPos.x - 38}
                        y={country.centerPos.y - 32}
                        width="76"
                        height="20"
                        rx="4"
                        fill="#0f172a"
                        fillOpacity="0.92"
                      />
                      <text
                        x={country.centerPos.x}
                        y={country.centerPos.y - 18}
                        textAnchor="middle"
                        className="fill-white font-sans text-[11px] font-bold"
                      >
                        {country.name}: {overall}/100
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Glow filter */}
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

          {/* Selected country panel — overlay on map */}
          {selectedSummary && (
            <div className="absolute top-4 right-4 w-64 p-4 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-xl z-10 animate-[fadeIn_0.15s_ease-out]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-extrabold text-slate-600 dark:text-slate-400">
                    {selectedSummary.countryCode}
                  </span>
                  <h3 className="font-serif-editorial text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                    {selectedSummary.countryName}
                  </h3>
                </div>
                <button onClick={() => setSelectedCode(null)} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Overall Score</span>
                  <span className="font-mono font-extrabold text-slate-900 dark:text-white">{selectedSummary.overallScore}/100</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${selectedSummary.overallScore}%`,
                      backgroundColor: scoreColor(selectedSummary.overallScore),
                    }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                {selectedSummary.clusters.map((cluster) => (
                  <div key={cluster.clusterId} className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 dark:text-slate-400 truncate mr-2">{cluster.clusterLabel}</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{cluster.averageScore}/100</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/benchmark?country=${selectedSummary.countryCode}`}
                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-asean-blue text-white text-xs font-sans font-bold hover:bg-asean-blue/90 transition-colors"
              >
                View in Heatmap <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile legend */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-3 text-[10px] font-sans text-slate-500 dark:text-slate-400">
          {[
            { label: "80+", color: "#059669" },
            { label: "50–79", color: "#eab308" },
            { label: "<50", color: "#dc2626" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
