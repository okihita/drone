"use client";

import React from "react";
import { FileText, Globe, ShieldAlert, Landmark, Scale, Sparkles } from "lucide-react";
import type { CuratedLinkCategory, CuratedLinkItem } from "@/types/links";

export function CategoryIcon({ category }: { category: CuratedLinkCategory }) {
  switch (category) {
    case "Trade & Tariffs":
      return <Scale className="w-4 h-4 text-slate-500" />;
    case "DEFA & Treaties":
      return <Globe className="w-4 h-4 text-slate-500" />;
    case "Data Governance":
      return <Landmark className="w-4 h-4 text-slate-500" />;
    case "Tech Sovereignty":
      return <ShieldAlert className="w-4 h-4 text-slate-500" />;
    case "AI & Labor":
      return <Sparkles className="w-4 h-4 text-slate-500" />;
    default:
      return <FileText className="w-4 h-4 text-slate-500" />;
  }
}

export function FallbackDossierBanner({ item }: { item: CuratedLinkItem }) {
  return (
    <div className="relative w-full h-40 sm:h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-white/10 p-5 flex flex-col justify-between overflow-hidden">
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-hud-grid opacity-30 pointer-events-none" />

      {/* Top Header info */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Google High-Res Favicon */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`}
            alt={item.publisher}
            className="w-5 h-5 rounded-sm object-contain bg-white p-0.5 shadow-xs"
            loading="lazy"
          />
          <span className="font-sans text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
            {item.publisher}
          </span>
        </div>

        {item.isPdf ? (
          <span className="inline-flex items-center gap-1 rounded bg-slate-900 text-white px-2 py-0.5 text-sm font-sans font-bold shadow-xs dark:bg-white dark:text-slate-950">
            <FileText className="w-3.5 h-3.5" />
            PDF DOSSIER
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded bg-slate-200/80 text-slate-700 px-2 py-0.5 text-sm font-sans font-bold dark:bg-white/10 dark:text-slate-300">
            PRIMARY SOURCE
          </span>
        )}
      </div>

      {/* Center Watermark & Domain */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-sans font-medium">
          <CategoryIcon category={item.category} />
          <span>{item.category}</span>
        </div>
        <span className="text-sm font-sans text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          {item.domain}
        </span>
      </div>
    </div>
  );
}
