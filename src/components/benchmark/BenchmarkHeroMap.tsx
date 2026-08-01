"use client";

import { useState, useMemo } from "react";
import { getRealAseanCountries } from "@/lib/aseanGeo";
import { listAllBenchmarks } from "@/services/benchmark";
import type { BenchmarkCountrySummary } from "@/types/benchmark";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";

import { ASEAN_COLORS, heatmapHex, scoreTone, toneTextClass } from "@/lib/colors";
import { FLAG_COMPONENTS } from "@/lib/flags";

function scoreBadge(score: number): string {
  return toneTextClass(scoreTone(score, 65, 40));
}

const SCORE_LEGEND = [
  { color: ASEAN_COLORS.emerald, range: "80–100" },
  { color: ASEAN_COLORS.emeraldLight, range: "65–79" },
  { color: ASEAN_COLORS.yellow, range: "50–64" },
  { color: ASEAN_COLORS.amber, range: "35–49" },
  { color: ASEAN_COLORS.red, range: "20–34" },
  { color: ASEAN_COLORS.redDark, range: "0–19" },
];

interface Props {
  selectedCountryCode: string | null;
  onSelectCountry: (code: string | null) => void;
}

export default function BenchmarkHeroMap({ selectedCountryCode, onSelectCountry }: Props) {
  const countries = useMemo(() => getRealAseanCountries(), []);
  const allSummaries = useMemo(() => listAllBenchmarks(), []);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  const scoreMap = useMemo(() => {
    const map = new Map<string, BenchmarkCountrySummary>();
    for (const s of allSummaries) map.set(s.countryCode, s);
    return map;
  }, [allSummaries]);

  const countryColors = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of allSummaries) {
      map.set(s.countryCode, heatmapHex(s.overallScore));
    }
    return map;
  }, [allSummaries]);

  const selectedSummary = selectedCountryCode ? scoreMap.get(selectedCountryCode) ?? null : null;

  return (
    <section className="relative border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 overflow-hidden px-4 sm:px-6 lg:px-8 py-6">
      <div className="absolute inset-0 bg-hud-grid pointer-events-none opacity-[0.03] dark:opacity-[0.06]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header + Legend */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif-editorial text-xl font-extrabold text-slate-900 dark:text-white">
              Geographic Compliance Overview
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
              Countries colored by overall Digital 2 Dozen compliance score. Click a flag or country to inspect.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-sans text-slate-500 dark:text-slate-400">
            {SCORE_LEGEND.map((val) => (
              <span key={val.range} className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: val.color }} />
                {val.range}
              </span>
            ))}
          </div>
        </div>

        {/* Map + Side panel row */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Map */}
          <div className="flex-1 min-w-0">
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
                  const color = countryColors.get(country.code) ?? ASEAN_COLORS.textMutedDark;
                  const isHovered = hoveredCode === country.code;
                  const isSelected = selectedCountryCode === country.code;

                  return (
                    <g key={country.code}>
                      {isSelected && (
                        <path d={country.pathD} fill="none" stroke={color} strokeWidth="8" strokeLinejoin="round" opacity="0.3" filter="url(#bm-glow)" />
                      )}
                      <path
                        d={country.pathD}
                        fill={color}
                        fillOpacity={isHovered || isSelected ? 0.9 : 0.65}
                        stroke={isHovered || isSelected ? ASEAN_COLORS.white : "transparent"}
                        strokeWidth={isHovered || isSelected ? 2 : 0}
                        strokeLinejoin="round"
                        className="cursor-pointer transition-all duration-200 focus-visible:stroke-asean-yellow focus-visible:stroke-2"
                        role="button"
                        tabIndex={0}
                        aria-label={`${country.name} — ${country.overallScore}/100 compliance`}
                        aria-pressed={isSelected}
                        onMouseEnter={() => setHoveredCode(country.code)}
                        onMouseLeave={() => setHoveredCode(null)}
                        onClick={() => onSelectCountry(selectedCountryCode === country.code ? null : country.code)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onSelectCountry(selectedCountryCode === country.code ? null : country.code);
                          }
                        }}
                      />
                      <circle cx={country.centerPos.x} cy={country.centerPos.y} r={isSelected || isHovered ? 5 : 3.5} fill={ASEAN_COLORS.white} stroke={color} strokeWidth="1.5" className="pointer-events-none" />
                      <text x={country.centerPos.x} y={country.centerPos.y + 14} textAnchor="middle" className="pointer-events-none font-sans text-[9px] font-bold uppercase select-none" fill={ASEAN_COLORS.white} style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
                        {country.code}
                      </text>
                      {isHovered && (
                        <g>
                          <rect x={country.centerPos.x - 36} y={country.centerPos.y - 32} width="72" height="18" rx="4" fill={ASEAN_COLORS.cardDark} fillOpacity="0.92" />
                          <text x={country.centerPos.x} y={country.centerPos.y - 19} textAnchor="middle" className="fill-white font-sans text-[10px] font-bold">{country.name}</text>
                        </g>
                      )}
                    </g>
                  );
                })}

                <defs>
                  <filter id="bm-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Flag dock bar — below map, no overlap */}
            <div className="flex items-center justify-center mt-3">
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar rounded-xl border border-slate-200 bg-white/90 p-1.5 shadow-xs backdrop-blur-md max-w-full dark:border-white/20 dark:bg-slate-950/85">
                {countries.map((c) => {
                  const isSelected = selectedCountryCode === c.code;
                  const FlagIcon = FLAG_COMPONENTS[c.code];
                  return (
                    <button
                      key={c.code}
                      onClick={() => onSelectCountry(selectedCountryCode === c.code ? null : c.code)}
                      title={`${c.name} — ${c.regimeType}`}
                      className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] font-bold transition-all ${
                        isSelected
                          ? "border-asean-yellow bg-asean-yellow/25 text-asean-yellow shadow-xs"
                          : "border-slate-200 bg-slate-100/80 text-slate-700 hover:border-slate-300 hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-white/25 dark:hover:bg-white/15 dark:hover:text-white"
                      }`}
                    >
                      {FlagIcon ? <FlagIcon className="w-4 h-3 rounded-xs object-cover shadow-xs" /> : <span className="font-sans text-[10px]">[{c.code}]</span>}
                      <span className="font-sans text-[11px]">{c.code}</span>
                      {c.threatScore >= 4 && <span className="h-1.5 w-1.5 rounded-full bg-asean-red animate-pulse" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected country D2D data card — slides in from right */}
          {selectedSummary && (
            <div className="lg:w-60 shrink-0 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm animate-[slideInRight_0.2s_ease-out]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-lg font-extrabold text-slate-900 dark:text-white">{selectedSummary.countryCode}</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{selectedSummary.countryName}</span>
                </div>
                <button onClick={() => onSelectCountry(null)} className="p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X className="h-3.5 w-3.5 text-slate-400" />
                </button>
              </div>

              {/* Overall score */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-slate-500">Overall</span>
                  <span className={`font-sans font-extrabold ${scoreBadge(selectedSummary.overallScore)}`}>
                    {selectedSummary.overallScore}/100
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-full rounded-full" style={{ width: `${selectedSummary.overallScore}%`, backgroundColor: selectedSummary.overallScore >= 65 ? ASEAN_COLORS.emerald : selectedSummary.overallScore >= 40 ? ASEAN_COLORS.amber : ASEAN_COLORS.red }} />
                </div>
              </div>

              {/* Best & Worst clusters */}
              <div className="space-y-2 mb-3 text-[10px]">
                {(() => {
                  const sorted = [...selectedSummary.clusters].sort((a, b) => b.averageScore - a.averageScore);
                  const best = sorted[0];
                  const worst = sorted[sorted.length - 1];
                  return (
                    <>
                      <div>
                        <span className="text-slate-500">Best</span>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="font-bold text-slate-800 dark:text-slate-200 truncate mr-1">{best.clusterLabel}</span>
                          <span className="font-sans font-bold text-asean-emerald shrink-0">{best.averageScore}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500">Worst</span>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="font-bold text-slate-800 dark:text-slate-200 truncate mr-1">{worst.clusterLabel}</span>
                          <span className="font-sans font-bold text-asean-red shrink-0">{worst.averageScore}</span>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>

              <Link
                href={`/d2d/benchmark`}
                className="flex items-center justify-center gap-1 w-full py-1.5 rounded-lg bg-asean-blue text-white text-[10px] font-sans font-bold hover:bg-asean-blue/90 transition-colors"
              >
                View in Heatmap <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
