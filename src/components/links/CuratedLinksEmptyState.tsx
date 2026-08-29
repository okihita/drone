"use client";

import React from "react";
import { SearchX, RotateCcw, Database } from "lucide-react";

interface CuratedLinksEmptyStateProps {
  totalLinksCount: number;
  searchQuery: string;
  selectedCategory: string;
  selectedJurisdiction: string;
  onResetFilters: () => void;
}

export function CuratedLinksEmptyState({
  totalLinksCount,
  searchQuery,
  selectedCategory,
  selectedJurisdiction,
  onResetFilters,
}: CuratedLinksEmptyStateProps) {
  const isFiltered = totalLinksCount > 0;

  if (isFiltered) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-linear-to-b from-white/80 via-slate-50/50 to-white/40 dark:from-slate-900/60 dark:via-slate-900/30 dark:to-slate-950/60 p-10 sm:p-14 text-center backdrop-blur-md shadow-xs">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs mb-5">
          <SearchX className="h-7 w-7 text-slate-400" />
        </div>

        <span className="inline-block rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 text-sm font-sans font-medium text-slate-600 dark:text-slate-400 mb-3">
          Zero Search Matches
        </span>

        <h3 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
          No Intelligence Records Found
        </h3>

        <p className="font-sans text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mb-6">
          No curated documents matched your current criteria
          {searchQuery ? ` matching "${searchQuery}"` : ""}
          {selectedCategory !== "ALL" ? ` under "${selectedCategory}"` : ""}
          {selectedJurisdiction !== "ALL" ? ` for jurisdiction "${selectedJurisdiction}"` : ""}.
        </p>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 rounded-xl bg-asean-yellow px-5 py-2.5 text-sm font-sans font-bold text-slate-950 shadow-xs hover:bg-asean-yellow-hover transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset All Search Filters</span>
          </button>
        </div>
      </div>
    );
  }

  // Pure Empty CMS State
  return (
    <div className="relative overflow-hidden rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-linear-to-b from-white/80 via-slate-50/50 to-white/40 dark:from-slate-900/60 dark:via-slate-900/30 dark:to-slate-950/60 p-10 sm:p-14 text-center backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs mb-5">
        <Database className="h-7 w-7 text-slate-400" />
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-asean-emerald/30 bg-asean-emerald/10 px-3 py-1 text-sm font-sans font-semibold text-asean-emerald-dark dark:text-asean-emerald mb-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-asean-emerald opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-asean-emerald" />
        </span>
        <span>Airtable CMS Connected · 60s Revalidation</span>
      </div>

      <h3 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
        Dossier Archive Initializing
      </h3>

      <p className="font-sans text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mb-6">
        Curated policy dossiers are dynamically managed via the EngageMedia Airtable repository. Links marked for publication will appear here automatically within 60 seconds.
      </p>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-sans font-bold text-slate-800 dark:text-slate-200 shadow-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          <RotateCcw className="h-4 w-4 text-slate-400" />
          <span>Refresh Feed</span>
        </button>
      </div>
    </div>
  );
}
