"use client";

import { useEffect, useRef } from "react";
import type { BenchmarkPrinciple, BenchmarkScore } from "@/types/benchmark";
import { FLAG_COMPONENTS } from "@/lib/flags";
import { BENCHMARK_CLUSTERS } from "@/lib/constants";
import { heatmapCellClass } from "@/lib/colors";
import { ExternalLink, X, ShieldCheck, BookOpen, Calendar, Scale } from "lucide-react";

interface Props {
  countryName: string;
  countryCode: string;
  principle: BenchmarkPrinciple;
  score: BenchmarkScore;
  onClose: () => void;
}

const CLUSTER_CHIP_CLASSES: Record<string, string> = {
  "asean-red": "bg-asean-red text-white",
  "asean-blue": "bg-asean-blue text-white",
  "asean-amber": "bg-asean-amber text-slate-900",
  "asean-emerald": "bg-asean-emerald text-white",
  "asean-sky": "bg-asean-sky text-white",
};

export default function BenchmarkCellCitationModal({
  countryName,
  countryCode,
  principle,
  score,
  onClose,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const FlagIcon = FLAG_COMPONENTS[countryCode];
  const clusterInfo = BENCHMARK_CLUSTERS.find((c) => c.id === principle.cluster);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs font-sans animate-[fadeIn_0.15s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cell-citation-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-5"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            {FlagIcon ? (
              <FlagIcon className="w-8 h-5 rounded-xs shrink-0 shadow-xs" />
            ) : (
              <span className="font-sans text-lg font-bold">{countryCode}</span>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 id="cell-citation-title" className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
                  {countryName}
                </h3>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                  ({countryCode})
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Principle #{principle.id}: {principle.shortTitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Close statutory evidence modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score & Cluster Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center justify-center px-3 py-1 rounded-lg text-sm font-extrabold ${heatmapCellClass(
                score.score,
              )} text-white shadow-xs`}
            >
              Score: {score.score} / 100
            </span>
            <span
              className={`inline-block px-2 py-0.5 rounded text-sm font-bold ${
                CLUSTER_CHIP_CLASSES[clusterInfo?.color ?? ""] ?? "bg-slate-600 text-white"
              }`}
            >
              {clusterInfo?.label ?? principle.cluster}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Reviewed: {score.lastReviewed}</span>
          </div>
        </div>

        {/* Statutory Evidence Assessment Rationale */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
            <ShieldCheck className="w-4 h-4 text-asean-emerald" />
            <span>Statutory Assessment & Evidence Rationale</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {score.evidence}
          </div>
        </div>

        {/* International Trade Baseline (TPP Source) */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
            <Scale className="w-4 h-4 text-asean-blue" />
            <span>International Standard (TPP Source: {principle.tppSource})</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/70 dark:border-slate-800/70 text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed">
            &ldquo;{principle.provisionText}&rdquo;
          </div>
        </div>

        {/* Source Citation & Close Action */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {score.sourceUrl ? (
            <a
              href={score.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-asean-blue dark:text-asean-sky hover:underline"
            >
              <BookOpen className="w-4 h-4" />
              <span>Access Official Legal Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-sm text-slate-400">Official gazette citation in review</span>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
