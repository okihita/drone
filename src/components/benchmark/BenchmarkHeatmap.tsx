"use client";

import { useState } from "react";
import type { BenchmarkCountrySummary, BenchmarkPrinciple, BenchmarkScore } from "@/types/benchmark";
import { BENCHMARK_CLUSTERS } from "@/lib/constants";
import PrincipleDetailPopover from "./PrincipleDetailPopover";
import BenchmarkCellCitationModal from "./BenchmarkCellCitationModal";
import { FLAG_COMPONENTS } from "@/lib/flags";
import { heatmapCellClass } from "@/lib/colors";

interface Props {
  summaries: BenchmarkCountrySummary[];
  principles: BenchmarkPrinciple[];
  selectedCountry: string | null;
  onSelectCountry: (code: string | null) => void;
}

const CLUSTER_CHIP_CLASSES: Record<string, string> = {
  "asean-red": "bg-asean-red",
  "asean-blue": "bg-asean-blue",
  "asean-amber": "bg-asean-amber",
  "asean-emerald": "bg-asean-emerald",
  "asean-sky": "bg-asean-sky",
};

export default function BenchmarkHeatmap({ summaries, principles, selectedCountry, onSelectCountry }: Props) {
  const [hoveredPrinciple, setHoveredPrinciple] = useState<BenchmarkPrinciple | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number } | null>(null);
  const [inspectedCell, setInspectedCell] = useState<{
    countryName: string;
    countryCode: string;
    principle: BenchmarkPrinciple;
    score: BenchmarkScore;
  } | null>(null);

  const headerBg = "sticky top-0 z-10 bg-slate-100/90 dark:bg-slate-800/90 backdrop-blur-sm font-sans text-sm font-bold text-slate-700 dark:text-slate-300";

  const showPrinciple = (principle: BenchmarkPrinciple, x: number, y: number) => {
    setHoveredPrinciple(principle);
    setPopoverPos({ x, y });
  };

  const hidePrinciple = () => {
    setHoveredPrinciple(null);
    setPopoverPos(null);
  };

  const togglePrinciple = (principle: BenchmarkPrinciple, x: number, y: number) => {
    if (hoveredPrinciple?.id === principle.id) hidePrinciple();
    else showPrinciple(principle, x, y);
  };

  return (
    <section id="compliance-heatmap" className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-full scroll-mt-[calc(var(--drone-admin-bar-h,0px)_+_var(--drone-header-h,135px)_+_52px)]">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Compliance Heatmap
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-sans mt-1">
            Granular statutory and enforcement scores across all 24 USTR Digital 2 Dozen principles.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3.5 text-sm font-sans text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Score Bands:</span>
          {[
            { range: "81–100", color: "bg-asean-emerald" },
            { range: "61–80", color: "bg-asean-emerald/80" },
            { range: "41–60", color: "bg-asean-amber" },
            { range: "21–40", color: "bg-asean-red/80" },
            { range: "0–20", color: "bg-asean-red" },
          ].map((l) => (
            <span key={l.range} className="flex items-center gap-1.5">
              <span className={`inline-block w-3.5 h-3.5 rounded-sm ${l.color}`} />
              {l.range}
            </span>
          ))}
          <span className="hidden sm:inline text-slate-400 dark:text-slate-500">&bull; Click any score cell for statutory citations</span>
        </div>

        {/* Centered table inside card container */}
        <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm overflow-x-auto">
          <table className="w-full border-collapse text-sm font-sans">
            <caption className="sr-only">
              Digital 2 Dozen Compliance Heatmap — principle scores across 11 ASEAN countries
            </caption>
            <thead>
              <tr>
                <th scope="col" className={`${headerBg} p-3 text-left rounded-tl-2xl sticky left-0 z-20 shadow-[1px_0_0_0_rgba(226,232,240,0.7)] dark:shadow-[1px_0_0_0_rgba(30,41,59,0.8)]`}>Principle</th>
                <th scope="col" className={`${headerBg} p-3 text-left`}>Cluster</th>
                {summaries.map((s) => {
                  const FlagIcon = FLAG_COMPONENTS[s.countryCode];
                  return (
                    <th
                      key={s.countryCode}
                      scope="col"
                      className={`${headerBg} px-1.5 py-3 text-center cursor-pointer hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors focus-visible:ring-2 focus-visible:ring-asean-yellow/80 ${
                        selectedCountry === s.countryCode ? "bg-asean-yellow/20 dark:bg-asean-yellow/10" : ""
                      }`}
                      tabIndex={0}
                      role="button"
                      aria-pressed={selectedCountry === s.countryCode}
                      aria-label={`Select ${s.countryName} (${s.countryCode})`}
                      onClick={() => onSelectCountry(selectedCountry === s.countryCode ? null : s.countryCode)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelectCountry(selectedCountry === s.countryCode ? null : s.countryCode);
                        }
                      }}
                      title={`${s.countryName} (${s.countryCode})`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {FlagIcon ? (
                          <FlagIcon className="w-5 h-3.5 rounded-xs shadow-2xs" />
                        ) : (
                          <span className="font-sans text-sm font-extrabold">{s.countryCode}</span>
                        )}
                        <span className="font-sans text-sm font-bold text-slate-500 dark:text-slate-400">{s.countryCode}</span>
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
                    className={`border-t border-slate-200/70 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                      isFirstOfCluster ? "border-t-2 border-t-slate-300/80 dark:border-t-slate-600/80" : ""
                    }`}
                  >
                    <td
                      className="p-3 align-middle cursor-pointer sticky left-0 z-10 bg-white dark:bg-slate-900 shadow-[1px_0_0_0_rgba(226,232,240,0.7)] dark:shadow-[1px_0_0_0_rgba(30,41,59,0.8)] min-w-[140px] focus-visible:ring-2 focus-visible:ring-asean-yellow/80"
                      tabIndex={0}
                      role="button"
                      aria-haspopup="dialog"
                      aria-expanded={hoveredPrinciple?.id === principle.id}
                      onMouseEnter={(e) => showPrinciple(principle, e.clientX, e.clientY)}
                      onMouseLeave={hidePrinciple}
                      onClick={(e) => togglePrinciple(principle, e.clientX, e.clientY)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          const rect = e.currentTarget.getBoundingClientRect();
                          togglePrinciple(principle, rect.right - 8, rect.top + rect.height / 2);
                        }
                      }}
                    >
                      <span className="font-sans text-sm text-slate-400 dark:text-slate-500 mr-1.5">
                        #{principle.id}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 leading-tight">
                        {principle.shortTitle}
                      </span>
                    </td>
                    <td className="p-3 align-middle">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-sm font-bold text-white ${CLUSTER_CHIP_CLASSES[clusterInfo?.color ?? ""] ?? "bg-slate-500"}`}
                      >
                        {clusterInfo?.label ?? principle.cluster}
                      </span>
                    </td>
                    {summaries.map((s) => {
                      const scoreObj = s.scores.find((sc) => sc.principleId === principle.id);
                      const score = scoreObj?.score ?? 0;
                      const isSelected = selectedCountry === s.countryCode;
                      const inspectCell = () => {
                        if (scoreObj) {
                          setInspectedCell({
                            countryName: s.countryName,
                            countryCode: s.countryCode,
                            principle,
                            score: scoreObj,
                          });
                        }
                      };

                      return (
                        <td
                          key={s.countryCode}
                          className={`px-1 py-1.5 text-center align-middle cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-asean-yellow/80 ${
                            isSelected ? "ring-2 ring-asean-yellow ring-inset" : ""
                          }`}
                          tabIndex={0}
                          role="button"
                          aria-label={`${s.countryName}: ${score}/100 — ${principle.shortTitle}. Click to inspect statutory evidence.`}
                          aria-pressed={isSelected}
                          onClick={inspectCell}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              inspectCell();
                            }
                          }}
                        >
                          <span
                            className={`inline-flex items-center justify-center w-11 h-7.5 rounded-md font-sans text-sm font-bold ${heatmapCellClass(score)} text-white hover:scale-105 transition-transform shadow-2xs`}
                            title={`${s.countryName}: ${score}/100 — ${principle.shortTitle}. Click to inspect statutory evidence.`}
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

      {inspectedCell && (
        <BenchmarkCellCitationModal
          countryName={inspectedCell.countryName}
          countryCode={inspectedCell.countryCode}
          principle={inspectedCell.principle}
          score={inspectedCell.score}
          onClose={() => setInspectedCell(null)}
        />
      )}
    </section>
  );
}
