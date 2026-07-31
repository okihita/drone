"use client";

import React, { useState } from "react";
import type { ConsumerProtectionPolicy } from "@/types/consumer_protection";
import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";
import { ASEAN_COLORS } from "@/lib/colors";
import { ExternalLink, Filter } from "lucide-react";

const FLAG_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL,
};

interface Props {
  policies: ConsumerProtectionPolicy[];
}

export default function ConsumerProtectionClientShell({ policies }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");

  const filtered = selectedCountry === "ALL"
    ? policies
    : policies.filter((p) => p.countryCode === selectedCountry);

  const availableCountries = Array.from(new Set(policies.map((p) => p.countryCode))).sort();

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans flex items-center gap-1 mr-1">
          <Filter className="h-3.5 w-3.5 text-asean-blue" /> Filter by Country:
        </span>
        <button
          onClick={() => setSelectedCountry("ALL")}
          className={`px-3 py-1 rounded-full text-[11px] font-sans font-bold transition-colors ${
            selectedCountry === "ALL"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
              : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          All Nations ({policies.length})
        </button>
        {availableCountries.map((code) => {
          const Flag = FLAG_COMPONENTS[code];
          return (
            <button
              key={code}
              onClick={() => setSelectedCountry(code)}
              className={`px-3 py-1 rounded-full text-[11px] font-sans font-bold transition-colors flex items-center gap-1.5 ${
                selectedCountry === code
                  ? "bg-asean-blue text-white shadow-xs"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {Flag && <Flag className="w-3.5 h-2.5 rounded-xs shrink-0" />}
              {code}
            </button>
          );
        })}
      </div>

      {/* Grid of Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((policy) => {
          const FlagIcon = FLAG_COMPONENTS[policy.countryCode];
          return (
            <div key={policy.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {FlagIcon && <FlagIcon className="w-4 h-3 rounded-xs shrink-0 shadow-xs" />}
                    <span className="font-sans text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {policy.countryCode}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{policy.countryName}</span>
                  </div>
                  <span className={`text-sm font-sans font-extrabold ${policy.compositeScore >= 60 ? "text-asean-emerald" : policy.compositeScore >= 35 ? "text-asean-amber" : "text-asean-red"}`}>
                    {policy.compositeScore}/100
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 mb-3 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${policy.compositeScore}%`, backgroundColor: policy.compositeScore >= 60 ? ASEAN_COLORS.emerald : policy.compositeScore >= 35 ? ASEAN_COLORS.amber : ASEAN_COLORS.red }} />
                </div>

                <div className="space-y-1.5 text-[11px] font-sans">
                  {[
                    { label: "Intermediary Liability", score: policy.intermediaryLiabilityScore },
                    { label: "Algorithmic Audits", score: policy.algorithmicAuditScore },
                    { label: "Breach Notification", score: policy.breachNotificationScore },
                    { label: "Spam Regulation", score: policy.spamRegulationScore },
                    { label: "Dark Pattern Restrictions", score: policy.darkPatternScore },
                  ].map((d) => (
                    <div key={d.label} className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">{d.label}</span>
                      <span className={`font-sans font-bold ${d.score >= 60 ? "text-asean-emerald" : d.score >= 35 ? "text-asean-amber" : "text-asean-red"}`}>
                        {d.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {policy.sourceUrl && (
                <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-sans">
                  <span className="text-[10px] text-slate-400">Statutory Framework</span>
                  <a
                    href={policy.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-asean-blue dark:text-asean-sky hover:underline font-bold inline-flex items-center gap-1 text-[11px]"
                  >
                    Official Document <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
