"use client";

import { useState } from "react";
import type { BenchmarkCountrySummary, BenchmarkPrinciple } from "@/types/benchmark";
import { BENCHMARK_CLUSTERS } from "@/lib/constants";
import PrincipleDetailPopover from "./PrincipleDetailPopover";
import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";

const FLAG_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL,
};

import { ASEAN_COLORS } from "@/lib/colors";

interface Props {
  summaries: BenchmarkCountrySummary[];
  principles: BenchmarkPrinciple[];
  selectedCountry: string | null;
  onSelectCountry: (code: string | null) => void;
}

function scoreColor(score: number): string {
  if (score >= 80) return "bg-asean-emerald";
  if (score >= 65) return "bg-asean-emerald/80";
  if (score >= 50) return "bg-asean-amber";
  if (score >= 35) return "bg-asean-amber/80";
  if (score >= 20) return "bg-asean-red/80";
  return "bg-asean-red";
}

const CLUSTER_COLORS: Record<string, string> = {
  "asean-red": ASEAN_COLORS.red,
  "asean-blue": ASEAN_COLORS.blue,
  "asean-amber": ASEAN_COLORS.amber,
  "asean-emerald": ASEAN_COLORS.emerald,
  "asean-sky": ASEAN_COLORS.sky,
};

export default function BenchmarkHeatmap({ summaries, principles, selectedCountry, onSelectCountry }: Props) {
  const [hoveredPrinciple, setHoveredPrinciple] = useState<BenchmarkPrinciple | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number } | null>(null);

  const headerBg = "sticky top-0 z-10 bg-slate-100 dark:bg-slate-800 font-sans text-xs font-bold text-slate-700 dark:text-slate-300";

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 max-w-full">
      <div className="max-w-7xl mx-auto">
        <span className="text-xs font-sans uppercase tracking-widest text-asean-blue font-bold">
          PRINCIPLE-BY-PRINCIPLE SCORES
        </span>
        <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white mb-4 mt-1">
          Compliance Heatmap
        </h2>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-[11px] font-sans text-slate-500 dark:text-slate-400">
          <span>Score:</span>
          {[
            { range: "81–100", color: "bg-asean-emerald" },
            { range: "61–80", color: "bg-asean-emerald/80" },
            { range: "41–60", color: "bg-asean-amber" },
            { range: "21–40", color: "bg-asean-red/80" },
            { range: "0–20", color: "bg-asean-red" },
          ].map((l) => (
            <span key={l.range} className="flex items-center gap-1">
              <span className={`inline-block w-3 h-3 rounded-sm ${l.color}`} />
              {l.range}
            </span>
          ))}
        </div>

        {/* Centered table inside card container */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-x-auto">
          <table className="w-full border-collapse text-xs font-sans">
            <caption className="sr-only">
              Digital 2 Dozen Compliance Heatmap — principle scores across 11 ASEAN countries
            </caption>
            <thead>
              <tr>
                <th scope="col" className={`${headerBg} p-2 text-left rounded-tl-xl sticky left-0 z-20 shadow-[1px_0_0_0_rgba(226,232,240,1)] dark:shadow-[1px_0_0_0_rgba(30,41,59,1)]`}>Principle</th>
                <th scope="col" className={`${headerBg} p-2 text-left`}>Cluster</th>
                {summaries.map((s) => {
                  const FlagIcon = FLAG_COMPONENTS[s.countryCode];
                  return (
                    <th
                      key={s.countryCode}
                      scope="col"
                      className={`${headerBg} px-1 py-2 text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
                        selectedCountry === s.countryCode ? "bg-asean-yellow/20 dark:bg-asean-yellow/10" : ""
                      }`}
                      onClick={() => onSelectCountry(selectedCountry === s.countryCode ? null : s.countryCode)}
                      title={`${s.countryName} (${s.countryCode})`}
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        {FlagIcon ? (
                          <FlagIcon className="w-5 h-3.5 rounded-xs" />
                        ) : (
                          <span className="font-sans text-[10px] font-extrabold">{s.countryCode}</span>
                        )}
                        <span className="font-sans text-[9px] font-bold text-slate-500 dark:text-slate-400">{s.countryCode}</span>
                      </div>
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
                      className="p-2 align-middle cursor-pointer sticky left-0 z-10 bg-white dark:bg-slate-900 shadow-[1px_0_0_0_rgba(226,232,240,1)] dark:shadow-[1px_0_0_0_rgba(30,41,59,1)] min-w-[130px]"
                      onMouseEnter={(e) => {
                        setHoveredPrinciple(principle);
                        setPopoverPos({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => { setHoveredPrinciple(null); setPopoverPos(null); }}
                      onClick={(e) => {
                        // Touch fallback: toggle popover on tap
                        if (hoveredPrinciple?.id === principle.id) {
                          setHoveredPrinciple(null);
                          setPopoverPos(null);
                        } else {
                          setHoveredPrinciple(principle);
                          setPopoverPos({ x: e.clientX, y: e.clientY });
                        }
                      }}
                    >
                      <span className="font-sans text-[10px] text-slate-400 dark:text-slate-500 mr-1.5">
                        #{principle.id}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 leading-tight">
                        {principle.shortTitle}
                      </span>
                    </td>
                    <td className="p-2 align-middle">
                      <span
                        className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold text-white"
                        style={{ backgroundColor: CLUSTER_COLORS[clusterInfo?.color ?? ""] ?? ASEAN_COLORS.textMutedLight }}
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
                            className={`inline-flex items-center justify-center w-10 h-7 rounded-md font-sans text-[11px] font-bold ${scoreColor(score)} text-white`}
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
        <PrincipleDetailPopover principle={hoveredPrinciple} position={popoverPos} onClose={() => setHoveredPrinciple(null)} />
      )}
    </section>
  );
}
