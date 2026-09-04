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
    <div className="space-y-10 sm:space-y-12">
      {/* Filter Bar Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-800/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-asean-blue" />
          <span className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-sans">
            Filter by Country
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/70 dark:border-slate-800/80">
          <button
            onClick={() => setSelectedCountry("ALL")}
            className={`px-3.5 py-1.5 rounded-full text-sm font-sans font-bold transition-colors ${
              selectedCountry === "ALL"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
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
                className={`px-3 py-1.5 rounded-full text-sm font-sans font-bold transition-colors flex items-center gap-2 ${
                  selectedCountry === code
                    ? "bg-asean-blue text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {Flag && <Flag className="w-4 h-3 rounded-[2px] shrink-0 shadow-xs" />}
                {code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Country IP Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filtered.map((profile) => {
          const FlagIcon = FLAG_COMPONENTS[profile.countryCode];
          const compositeTone = scoreTone(profile.compositeScore, GOOD_SCORE, BAD_SCORE);
          return (
            <div
              key={profile.countryCode}
              className="p-6 sm:p-7 rounded-2xl border border-slate-200/70 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 dark:border-slate-800/80 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    {FlagIcon && <FlagIcon className="w-5 h-3.5 rounded-[2px] shrink-0 shadow-xs" />}
                    <span className="font-sans text-sm font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/80">
                      {profile.countryCode}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-serif-editorial">
                      {profile.countryName}
                    </h3>
                  </div>
                  <span className={`text-sm font-sans font-extrabold ${toneTextClass(compositeTone)}`}>
                    {profile.compositeScore} / 100
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${profile.compositeScore}%`, backgroundColor: toneHex(compositeTone) }}
                  />
                </div>

                <div className="space-y-2.5 text-sm font-sans pt-1">
                  {DIMENSIONS.map((d) => {
                    const score = profile[d.key];
                    const dimTone = scoreTone(score, GOOD_SCORE, BAD_SCORE);
                    return (
                      <div key={d.key} className="flex items-center justify-between gap-2">
                        <span className="text-slate-600 dark:text-slate-400">{d.label}</span>
                        <span className={`font-sans font-bold ${toneTextClass(dimTone)}`}>
                          {score}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {profile.sourceUrl && (
                <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-sm font-sans">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Statutory Framework</span>
                  <a
                    href={profile.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-asean-blue dark:text-asean-sky hover:underline font-bold inline-flex items-center gap-1.5 text-sm"
                  >
                    Official Document <ExternalLink className="h-3.5 w-3.5" />
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
