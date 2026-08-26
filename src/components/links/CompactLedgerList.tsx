"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import type { CuratedLinkItem } from "@/types/links";
import { FLAG_COMPONENTS } from "@/lib/flags";

export function CompactLedgerList({ items }: { items: CuratedLinkItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const Flag = item.jurisdiction !== "ASEAN" && item.jurisdiction !== "Global" && item.jurisdiction !== "US"
          ? FLAG_COMPONENTS[item.jurisdiction]
          : null;

        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 bg-white shadow-xs transition-all hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-950/70"
          >
            <div className="flex items-start gap-3.5 flex-1 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`}
                alt={item.publisher}
                className="w-6 h-6 rounded-md object-contain bg-slate-100 p-1 dark:bg-slate-800 shrink-0 mt-1"
                loading="lazy"
              />

              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-sans text-sm font-bold text-slate-800 dark:text-slate-200">
                    {item.publisher}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-sm font-sans font-medium text-slate-600 dark:bg-white/5 dark:border-white/10 dark:text-slate-400">
                    {item.category}
                  </span>
                  {item.isPdf && (
                    <span className="rounded bg-slate-900 text-white px-1.5 py-0.5 text-sm font-sans font-bold dark:bg-white dark:text-slate-950">
                      PDF
                    </span>
                  )}
                </div>

                <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center shrink-0 text-sm font-sans text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                {Flag && <Flag className="w-4 h-3 rounded-2xs object-cover" />}
                <span className="font-bold text-slate-700 dark:text-slate-300">{item.jurisdiction}</span>
              </span>
              <span>{item.publishedDate}</span>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-asean-yellow transition-colors" />
            </div>
          </a>
        );
      })}
    </div>
  );
}
