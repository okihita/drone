"use client";

import { useState } from "react";
import type { BenchmarkCountrySummary, BenchmarkPrinciple } from "@/types/benchmark";
import { BENCHMARK_CLUSTERS } from "@/lib/constants";
import { ChevronRight, ChevronDown } from "lucide-react";

interface Props {
  summaries: BenchmarkCountrySummary[];
  principles: BenchmarkPrinciple[];
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

export default function BenchmarkHeatmap({ summaries, principles }: Props) {
  const [activeCluster, setActiveCluster] = useState<string>("ALL");
  const [expandedClusters, setExpandedClusters] = useState<Set<string>>(
    () => new Set(BENCHMARK_CLUSTERS.map((c) => c.id)),
  );
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredPrinciple, setHoveredPrinciple] = useState<BenchmarkPrinciple | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number } | null>(null);

  const toggleCluster = (id: string) => {
    setExpandedClusters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const headerBg = "sticky top-0 z-10 bg-slate-100 dark:bg-slate-800 font-sans text-xs font-bold text-slate-700 dark:text-slate-300";

  // Build rows: cluster summary + optionally expanded principle rows
  const rows: Array<
    | { type: "cluster"; cluster: (typeof BENCHMARK_CLUSTERS)[number] }
    | { type: "principle"; principle: BenchmarkPrinciple; clusterId: string }
  > = [];

  for (const cluster of BENCHMARK_CLUSTERS) {
    if (activeCluster !== "ALL" && cluster.id !== activeCluster) continue;
    rows.push({ type: "cluster", cluster });
    if (expandedClusters.has(cluster.id)) {
      const children = principles.filter((p) => p.cluster === cluster.id);
      for (const p of children) rows.push({ type: "principle", principle: p, clusterId: cluster.id });
    }
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 max-w-full">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
            Compliance Heatmap
          </h2>
          <ClusterFilter active={activeCluster} onChange={setActiveCluster} />
        </div>

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

        {/* Grid */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm bg-white dark:bg-slate-900">
          <table className="w-full border-collapse text-xs font-sans">
            <thead>
              <tr>
                <th className={`${headerBg} p-2 text-left min-w-[220px] rounded-tl-xl`}>Principle</th>
                {summaries.map((s) => (
                  <th
                    key={s.countryCode}
                    className={`${headerBg} p-2 text-center min-w-[60px] cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
                      selectedCountry === s.countryCode ? "bg-asean-yellow/20 dark:bg-asean-yellow/10" : ""
                    }`}
                    onClick={() => setSelectedCountry(selectedCountry === s.countryCode ? null : s.countryCode)}
                  >
                    <div className="font-mono text-[10px] font-extrabold">{s.countryCode}</div>
                    <div className="text-[9px] font-normal truncate max-w-[60px]">{s.countryName}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                if (row.type === "cluster") {
                  const isExpanded = expandedClusters.has(row.cluster.id);
                  const clusterColor = CLUSTER_COLORS[row.cluster.color] ?? "#888";
                  return (
                    <tr
                      key={row.cluster.id}
                      className="border-t-2 border-t-slate-300 dark:border-t-slate-600 bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                      onClick={() => toggleCluster(row.cluster.id)}
                    >
                      <td className="p-2.5 align-middle">
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                          <span
                            className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold text-white shrink-0"
                            style={{ backgroundColor: clusterColor }}
                          >
                            {row.cluster.principles.length}
                          </span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {row.cluster.label}
                          </span>
                        </div>
                      </td>
                      {summaries.map((s) => {
                        const clusterScores = s.scores.filter((sc) =>
                          (row.cluster.principles as readonly number[]).includes(sc.principleId),
                        );
                        const avg = Math.round(
                          clusterScores.reduce((sum, sc) => sum + sc.score, 0) / clusterScores.length,
                        );
                        const isSelected = selectedCountry === s.countryCode;
                        return (
                          <td
                            key={s.countryCode}
                            className={`p-1 text-center align-middle ${isSelected ? "ring-2 ring-asean-yellow ring-inset" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCountry(selectedCountry === s.countryCode ? null : s.countryCode);
                            }}
                          >
                            <span
                              className={`inline-flex items-center justify-center w-10 h-7 rounded-md font-mono text-[11px] font-bold ${scoreColor(avg)} text-white`}
                              title={`${s.countryName}: avg ${avg}/100 across ${clusterScores.length} principles`}
                            >
                              {avg}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                }

                // Principle row (indented)
                return (
                  <tr
                    key={row.principle.id}
                    className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td
                      className="p-2 pl-8 align-middle cursor-pointer"
                      onMouseEnter={(e) => {
                        setHoveredPrinciple(row.principle);
                        setPopoverPos({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => { setHoveredPrinciple(null); setPopoverPos(null); }}
                    >
                      <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 mr-1.5">
                        P{row.principle.id}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 leading-tight">
                        {row.principle.shortTitle}
                      </span>
                    </td>
                    {summaries.map((s) => {
                      const score = s.scores.find((sc) => sc.principleId === row.principle.id)?.score ?? 0;
                      const isSelected = selectedCountry === s.countryCode;
                      return (
                        <td
                          key={s.countryCode}
                          className={`p-1 text-center align-middle cursor-pointer transition-all ${isSelected ? "ring-2 ring-asean-yellow ring-inset" : ""}`}
                          onClick={() => setSelectedCountry(selectedCountry === s.countryCode ? null : s.countryCode)}
                        >
                          <span
                            className={`inline-flex items-center justify-center w-10 h-7 rounded-md font-mono text-[11px] font-bold ${scoreColor(score)} text-white`}
                            title={`${s.countryName}: ${score}/100 — ${row.principle.shortTitle}`}
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
