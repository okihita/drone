"use client";

import { useState } from "react";
import type { BenchmarkCountrySummary, BenchmarkPrinciple } from "@/types/benchmark";
import { BENCHMARK_CLUSTERS } from "@/lib/constants";
import PrincipleDetailPopover from "./PrincipleDetailPopover";
import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";

const FLAG_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL,
};

interface Props {
  summaries: BenchmarkCountrySummary[];
  principles: BenchmarkPrinciple[];
  selectedCountry: string | null;
  onSelectCountry: (code: string | null) => void;
}

function scoreColor(score: number): string {
  if (score >= 80) return "bg-emerald-600 dark:bg-emerald-500";
  if (score >= 65) return "bg-emerald-400 dark:bg-emerald-400";
  if (score >= 50) return "bg-amber-400 dark:bg-amber-400";
  if (score >= 35) return "bg-orange-500 dark:bg-orange-400";
  if (score >= 20) return "bg-red-500 dark:bg-red-400";
  return "bg-red-700 dark:bg-red-600";
}

const CLUSTER_COLORS: Record<string, string> = {
  "asean-red": "#CC0000",
  "asean-blue": "#003399",
  "asean-amber": "#CC8800",
  "asean-emerald": "#008855",
  "asean-sky": "#0066CC",
};

export default function BenchmarkHeatmap({ summaries, principles, selectedCountry, onSelectCountry }: Props) {
  const [hoveredPrinciple, setHoveredPrinciple] = useState<BenchmarkPrinciple | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number } | null>(null);

  const headerBg = "sticky top-0 z-10 bg-slate-100 dark:bg-slate-800 font-sans text-xs font-bold text-slate-700 dark:text-slate-300";

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 max-w-full">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white mb-4">
          Compliance Heatmap
        </h2>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-[11px] font-sans text-slate-500 dark:text-slate-400">
          <span>Score:</span>
          {[
            { range: "81–100", color: "bg-emerald-600 dark:bg-emerald-500" },
            { range: "61–80", color: "bg-emerald-400" },
            { range: "41–60", color: "bg-amber-400" },
            { range: "21–40", color: "bg-red-500 dark:bg-red-400" },
            { range: "0–20", color: "bg-red-700 dark:bg-red-600" },
          ].map((l) => (
            <span key={l.range} className="flex items-center gap-1">
              <span className={`inline-block w-3 h-3 rounded-sm ${l.color}`} />
              {l.range}
            </span>
          ))}
        </div>

        {/* Centered table */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm bg-white dark:bg-slate-900 flex justify-center">
          <table className="border-collapse text-xs font-sans">
            <thead>
              <tr>
                <th className={`${headerBg} p-2 text-left rounded-tl-xl`}>Principle</th>
                <th className={`${headerBg} p-2 text-left`}>Cluster</th>
                {summaries.map((s) => {
                  const FlagIcon = FLAG_COMPONENTS[s.countryCode];
                  return (
                    <th
                      key={s.countryCode}
                      className={`${headerBg} px-1 py-2 text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
                        selectedCountry === s.countryCode ? "bg-asean-yellow/20 dark:bg-asean-yellow/10" : ""
                      }`}
                      onClick={() => onSelectCountry(selectedCountry === s.countryCode ? null : s.countryCode)}
                      title={`${s.countryName} (${s.countryCode})`}
                    >
                      {FlagIcon ? (
                        <FlagIcon className="w-5 h-3.5 rounded-xs mx-auto" />
                      ) : (
                        <span className="font-mono text-[10px] font-extrabold">{s.countryCode}</span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {principles.map((principle, pIdx) => {
                const clusterInfo = BENCHMARK_CLUSTERS.find((c) => c.id === principle.cluster);
                const isFirstOfCluster = pIdx === 0 || principles[pIdx - 1].cluster !== principle.cluster;

                return (
                  <tr
                    key={principle.id}
                    className={`border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                      isFirstOfCluster ? "border-t-2 border-t-slate-300 dark:border-t-slate-600" : ""
                    }`}
                  >
                    <td
                      className="p-2 align-middle cursor-pointer"
                      onMouseEnter={(e) => {
                        setHoveredPrinciple(principle);
                        setPopoverPos({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => { setHoveredPrinciple(null); setPopoverPos(null); }}
                    >
                      <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 mr-1.5">
                        #{principle.id}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 leading-tight">
                        {principle.shortTitle}
                      </span>
                    </td>
                    <td className="p-2 align-middle">
                      <span
                        className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold text-white"
                        style={{ backgroundColor: CLUSTER_COLORS[clusterInfo?.color ?? ""] ?? "#888" }}
                      >
                        {clusterInfo?.label ?? principle.cluster}
                      </span>
                    </td>
                    {summaries.map((s) => {
                      const score = s.scores.find((sc) => sc.principleId === principle.id)?.score ?? 0;
                      const isSelected = selectedCountry === s.countryCode;
                      return (
                        <td
                          key={s.countryCode}
                          className={`px-0.5 py-1 text-center align-middle cursor-pointer transition-all ${isSelected ? "ring-2 ring-asean-yellow ring-inset" : ""}`}
                          onClick={() => onSelectCountry(selectedCountry === s.countryCode ? null : s.countryCode)}
                        >
                          <span
                            className={`inline-flex items-center justify-center w-10 h-7 rounded-md font-mono text-[11px] font-bold ${scoreColor(score)} text-white`}
                            title={`${s.countryName}: ${score}/100 — ${principle.shortTitle}`}
                          >
                            {score}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {hoveredPrinciple && popoverPos && (
        <PrincipleDetailPopover principle={hoveredPrinciple} position={popoverPos} />
      )}
    </section>
  );
}
