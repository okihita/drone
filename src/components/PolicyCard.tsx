"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldAlert, CheckCircle, FileText } from "lucide-react";

export interface PolicyCardProps {
  id: string;
  title: string;
  jurisdiction: string;
  category: string;
  threatLevel: "High Alert" | "Medium Risk" | "Rights Verified";
  date: string;
  summary: string;
}

export default function PolicyCard({
  title,
  jurisdiction,
  category,
  threatLevel,
  date,
  summary,
}: PolicyCardProps) {
  return (
    <article className="editorial-card p-6 rounded-xl space-y-4 flex flex-col justify-between shadow-sm dark:shadow-none group font-sans">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs font-sans">
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            {jurisdiction}
          </span>
          <span className="text-[10px] text-slate-500 font-sans">{date}</span>
        </div>

        <div className="flex items-center gap-2 font-sans">
          <span className="text-[11px] font-sans px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
            {category}
          </span>

          {threatLevel === "High Alert" && (
            <span className="text-[11px] font-sans px-2 py-0.5 rounded bg-asean-red/10 text-asean-red border border-asean-red/30 font-semibold flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              <span>[High Alert]</span>
            </span>
          )}

          {threatLevel !== "High Alert" && (
            <span className="text-[11px] font-sans px-2 py-0.5 rounded bg-asean-yellow/20 text-asean-yellow border border-asean-yellow/30 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>[{threatLevel}]</span>
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors mb-2 leading-snug font-serif-editorial">
          {title}
        </h3>

        <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3 font-sans">
          {summary}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-sans">
        <span className="text-slate-500 text-[11px]">100% Primary Source Verified</span>

        <Link
          href="/ledger"
          className="inline-flex items-center gap-1 text-asean-yellow hover:text-asean-yellow-hover font-semibold transition-colors"
        >
          <span>View Decree</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
