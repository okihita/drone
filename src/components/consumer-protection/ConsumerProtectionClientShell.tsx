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
          All Nations ({policies.length})
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

      {/* Grid of Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((policy) => (
          <ConsumerProtectionCard key={policy.id} policy={policy} />
        ))}
      </div>
    </div>
  );
}
