"use client";

import { useState } from "react";
import type { IPProfile } from "@/services/ip_monitor";
import { scoreTone, toneHex, toneTextClass } from "@/lib/colors";
import { FLAG_COMPONENTS } from "@/lib/flags";
import { ExternalLink, Filter } from "lucide-react";

const DIMENSIONS = [
  { key: "tradeSecretScore", label: "Trade Secret Protection" },
  { key: "copyrightSafeHarborScore", label: "Copyright Safe Harbors" },
  { key: "patentScore", label: "Patent Protection" },
  { key: "aiRiskScore", label: "AI Training Data Risk" },
] as const;

interface Props {
  profiles: IPProfile[];
}

const GOOD_SCORE = 55;
const BAD_SCORE = 35;

export default function IPMonitorClientShell({ profiles }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");

  const filtered = selectedCountry === "ALL"
    ? profiles
    : profiles.filter((p) => p.countryCode === selectedCountry);

  const availableCountries = Array.from(new Set(profiles.map((p) => p.countryCode))).sort();

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400 font-sans flex items-center gap-1 mr-1">
          <Filter className="h-3.5 w-3.5 text-asean-blue" /> Filter by Country:
        </span>
        <button
          onClick={() => setSelectedCountry("ALL")}
          className={`px-3 py-1 rounded-full text-sm font-sans font-bold transition-colors ${
            selectedCountry === "ALL"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
              : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          All Nations ({profiles.length})
        </button>
        {availableCountries.map((code) => {
          const Flag = FLAG_COMPONENTS[code];
          return (
            <button
              key={code}
              onClick={() => setSelectedCountry(code)}
              className={`px-3 py-1 rounded-full text-sm font-sans font-bold transition-colors flex items-center gap-1.5 ${
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

      {/* Grid of Country IP Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((profile) => {
          const FlagIcon = FLAG_COMPONENTS[profile.countryCode];
          const compositeTone = scoreTone(profile.compositeScore, GOOD_SCORE, BAD_SCORE);
          return (
            <div key={profile.countryCode} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {FlagIcon && <FlagIcon className="w-4 h-3 rounded-xs shrink-0 shadow-xs" />}
                    <span className="font-sans text-sm font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {profile.countryCode}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{profile.countryName}</span>
                  </div>
                  <span className={`text-sm font-sans font-extrabold ${toneTextClass(compositeTone)}`}>
                    {profile.compositeScore}/100
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 mb-3 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${profile.compositeScore}%`, backgroundColor: toneHex(compositeTone) }} />
                </div>

                <div className="space-y-1.5 text-sm font-sans">
                  {DIMENSIONS.map((d) => {
                    const score = profile[d.key];
                    return (
                      <div key={d.key} className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">{d.label}</span>
                        <span className={`font-sans font-bold ${toneTextClass(scoreTone(score, GOOD_SCORE, BAD_SCORE))}`}>
                          {score}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {profile.sourceUrl && (
                <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-sm font-sans">
                  <span className="text-sm text-slate-400">Statutory Framework</span>
                  <a
                    href={profile.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-asean-blue dark:text-asean-sky hover:underline font-bold inline-flex items-center gap-1 text-sm"
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
