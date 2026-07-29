"use client";

import type { BenchmarkCountrySummary } from "@/types/benchmark";
import { Download } from "lucide-react";
import { useState } from "react";

interface Props {
  summaries: BenchmarkCountrySummary[];
}

export default function BenchmarkExport({ summaries }: Props) {
  const [downloaded, setDownloaded] = useState(false);

  function exportCSV() {
    const headers = ["Country", "Country Code", "Overall Score"];
    // Add cluster headers
    const clusterIds = summaries[0]?.clusters.map((c) => c.clusterId) ?? [];
    clusterIds.forEach((id) => headers.push(`Cluster: ${id}`));

    const rows = summaries.map((s) => {
      const row = [s.countryName, s.countryCode, String(s.overallScore)];
      clusterIds.forEach((id) => {
        const cluster = s.clusters.find((c) => c.clusterId === id);
        row.push(String(cluster?.averageScore ?? 0));
      });
      return row.join(",");
    });

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `drone-digital-2-dozen-benchmark-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  }

  function exportJSON() {
    const json = JSON.stringify(summaries, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `drone-digital-2-dozen-benchmark-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <span className="text-sm font-sans font-bold text-slate-700 dark:text-slate-300">Export:</span>
        <button
          onClick={exportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-sans font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
        >
          <Download className="h-3.5 w-3.5" /> CSV
        </button>
        <button
          onClick={exportJSON}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-sans font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
        >
          <Download className="h-3.5 w-3.5" /> JSON
        </button>
        {downloaded && (
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-sans animate-pulse">Downloaded!</span>
        )}
      </div>
    </section>
  );
}
