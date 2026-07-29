"use client";

import type { BenchmarkCountrySummary } from "@/types/benchmark";
import { X } from "lucide-react";

interface Props {
  summary: BenchmarkCountrySummary;
  onClose: () => void;
}

export default function CountryDetailPanel({ summary, onClose }: Props) {
  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-y-auto animate-[fadeIn_0.15s_ease-out]">
      <div className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="font-serif-editorial text-lg font-extrabold text-slate-900 dark:text-white">
            {summary.countryName}
          </h3>
          <p className="text-xs font-sans text-slate-500 dark:text-slate-400">
            Overall Score: <span className="font-bold text-slate-900 dark:text-white">{summary.overallScore}/100</span> across 24 principles
          </p>
        </div>
        <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 space-y-4 font-sans">
        {/* Cluster Summary Cards */}
        {summary.clusters.map((cluster) => (
          <div key={cluster.clusterId} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{cluster.clusterLabel}</span>
              <span className={`text-xs font-mono font-bold ${
                cluster.averageScore >= 65 ? "text-emerald-600 dark:text-emerald-400"
                : cluster.averageScore >= 40 ? "text-amber-600 dark:text-amber-400"
                : "text-red-600 dark:text-red-400"
              }`}>
                {cluster.averageScore}/100
              </span>
            </div>
            {/* Mini progress bar */}
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${cluster.averageScore}%`,
                  backgroundColor: cluster.averageScore >= 65 ? "#059669"
                    : cluster.averageScore >= 40 ? "#d97706"
                    : "#dc2626",
                }}
              />
            </div>
          </div>
        ))}

        {/* Per-Principle Scores */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Principle Scores</h4>
          {[...summary.scores].sort((a, b) => a.principleId - b.principleId).map((sc) => (
            <div key={sc.principleId} className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/50 text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">#{sc.principleId}</span>
              <span className={`font-mono font-bold ${
                sc.score >= 65 ? "text-emerald-600"
                : sc.score >= 40 ? "text-amber-600"
                : "text-red-600"
              }`}>
                {sc.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
