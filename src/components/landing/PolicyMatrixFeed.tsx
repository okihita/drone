"use client";

import React, { useState } from "react";
import { ExternalLink, Filter } from "lucide-react";
import { REALISTIC_POLICY_ALERTS } from "@/lib/defaData";
import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";

const FLAG_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  SG, VN, ID, TH, MY, PH, MM, KH, LA, BN, TL,
};

export default function PolicyMatrixFeed() {
  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");

  const filteredAlerts = REALISTIC_POLICY_ALERTS.filter((alert) => {
    if (filterSeverity === "ALL") return true;
    if (filterSeverity === "HIGH") return alert.severity === "High Alert";
    if (filterSeverity === "MEDIUM") return alert.severity === "Medium Risk";
    if (filterSeverity === "VERIFIED") return alert.severity === "Rights Verified";
    return true;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-sans uppercase tracking-widest text-asean-yellow font-bold block mb-1.5">
            REAL-TIME POLICY TELEMETRY
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Live Policy Alert Matrix &amp; Brief Feed
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl font-sans">
            Source-verified regulatory dispatches tracking high-impact data localization decrees, AI safety frameworks, and DEFA negotiation updates.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
          <span className="text-slate-500 font-mono text-[11px] hidden sm:inline-block">
            Severity:
          </span>
          <button
            onClick={() => setFilterSeverity("ALL")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              filterSeverity === "ALL"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            All Alerts
          </button>
          <button
            onClick={() => setFilterSeverity("HIGH")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              filterSeverity === "HIGH"
                ? "bg-asean-red text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-asean-red"
            }`}
          >
            High Alert
          </button>
          <button
            onClick={() => setFilterSeverity("MEDIUM")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              filterSeverity === "MEDIUM"
                ? "bg-asean-amber text-slate-950"
                : "text-slate-600 dark:text-slate-400 hover:text-asean-amber"
            }`}
          >
            Medium Risk
          </button>
          <button
            onClick={() => setFilterSeverity("VERIFIED")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              filterSeverity === "VERIFIED"
                ? "bg-asean-emerald text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-asean-emerald"
            }`}
          >
            Rights Verified
          </button>
        </div>
      </div>

      {/* Grid of Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlerts.map((alert) => {
          const Flag = FLAG_ICONS[alert.countryCode];

          return (
            <div
              key={alert.id}
              className="group rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 hover:border-asean-yellow/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Card Top Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {Flag && <Flag className="w-5 h-3.5 rounded-xs object-cover shadow-xs" />}
                    <span className="font-bold text-xs text-slate-900 dark:text-white font-sans">
                      {alert.countryName}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">[{alert.countryCode}]</span>
                  </div>

                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold border ${
                      alert.severity === "High Alert"
                        ? "bg-asean-red/15 text-asean-red border-asean-red/30"
                        : alert.severity === "Medium Risk"
                        ? "bg-asean-amber/15 text-asean-amber border-asean-amber/30"
                        : "bg-asean-emerald/15 text-asean-emerald border-asean-emerald/30"
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>

                {/* Category & Date */}
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mb-2">
                  <span className="font-bold uppercase text-asean-yellow">{alert.category}</span>
                  <span>·</span>
                  <span>{alert.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors leading-snug mb-2">
                  {alert.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans line-clamp-3">
                  {alert.summary}
                </p>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-between text-xs font-sans">
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  Impact Rating: <strong className="text-slate-800 dark:text-slate-200">{alert.impactScore} / 5.0</strong>
                </span>
                <a
                  href={alert.primaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-asean-yellow transition-colors"
                >
                  <span>Primary Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
