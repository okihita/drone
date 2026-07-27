"use client";

import React from "react";
import { Shield, ExternalLink, Tag, AlertCircle, FileCheck, Layers } from "lucide-react";

export interface PolicyCardProps {
  id: string;
  title: string;
  jurisdiction: string;
  category: "DEFA" | "Cross-Border Data" | "AI Governance" | "Cybersecurity" | "Trade";
  date: string;
  threatLevel: "High Alert" | "Medium Risk" | "Rights Verified";
  summary: string;
  primarySource: string;
  sourceUrl: string;
  cinemataVideoUrl?: string;
}

export default function PolicyCard({
  title,
  jurisdiction,
  category,
  date,
  threatLevel,
  summary,
  primarySource,
  sourceUrl,
}: PolicyCardProps) {
  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between h-full group">
      <div>
        {/* Header Metadata */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {jurisdiction}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {category}
            </span>
          </div>

          {/* Threat Level Badge */}
          <span
            className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
              threatLevel === "High Alert"
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : threatLevel === "Medium Risk"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            }`}
          >
            <AlertCircle className="w-3 h-3" />
            {threatLevel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 leading-snug">
          {title}
        </h3>

        {/* Summary */}
        <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3">
          {summary}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <FileCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Source: <strong className="text-slate-300">{primarySource}</strong></span>
        </span>

        <a
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
        >
          <span>Primary Text</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
