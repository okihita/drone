"use client";

import { BENCHMARK_CLUSTERS } from "@/lib/constants";

interface Props {
  active: string;
  onChange: (cluster: string) => void;
}

export default function ClusterFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        onClick={() => onChange("ALL")}
        className={`px-3 py-1 rounded-full text-[11px] font-sans font-bold transition-colors ${
          active === "ALL"
            ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900"
            : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
        }`}
      >
        All 24 Principles
      </button>
      {BENCHMARK_CLUSTERS.map((cluster) => {
        const colorMap: Record<string, string> = {
          "asean-red": "border-l-asean-red",
          "asean-blue": "border-l-asean-blue",
          "asean-amber": "border-l-asean-amber",
          "asean-emerald": "border-l-asean-emerald",
          "asean-sky": "border-l-asean-sky",
        };
        return (
          <button
            key={cluster.id}
            onClick={() => onChange(cluster.id)}
            className={`px-3 py-1 rounded-full text-[11px] font-sans font-bold transition-colors border-l-2 ${
              colorMap[cluster.color] ?? "border-l-slate-400"
            } ${
              active === cluster.id
                ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900"
                : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {cluster.label}
          </button>
        );
      })}
    </div>
  );
}
