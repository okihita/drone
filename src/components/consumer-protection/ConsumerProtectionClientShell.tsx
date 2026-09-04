"use client";

import { useState } from "react";
import type { ConsumerProtectionPolicy } from "@/types/consumer_protection";
import { FLAG_COMPONENTS } from "@/lib/flags";
import { Filter } from "lucide-react";
import ConsumerProtectionCard from "./ConsumerProtectionCard";

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
    <div className="space-y-10 sm:space-y-12">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-2 pb-6 border-b border-slate-200/70 dark:border-slate-800/80">
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400 font-sans flex items-center gap-1 mr-2">
          <Filter className="h-4 w-4 text-asean-blue" /> Filter by Country:
        </span>
        <button
          onClick={() => setSelectedCountry("ALL")}
          className={`px-3.5 py-1.5 rounded-full text-sm font-sans font-bold transition-all shadow-xs ${
            selectedCountry === "ALL"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
              : "bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
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
              className={`px-3.5 py-1.5 rounded-full text-sm font-sans font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                selectedCountry === code
                  ? "bg-asean-blue text-white"
                  : "bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {Flag && <Flag className="w-4 h-3 rounded-xs shrink-0 shadow-2xs" />}
              {code}
            </button>
          );
        })}
      </div>

      {/* Grid of Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filtered.map((policy) => (
          <ConsumerProtectionCard key={policy.id} policy={policy} />
        ))}
      </div>
    </div>
  );
}
