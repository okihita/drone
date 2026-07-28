"use client";

import React, { useState } from "react";
import {
  ArrowRightLeft,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Building2,
  Scale,
  Database,
} from "lucide-react";
import { REALISTIC_COUNTRY_PROFILES, type CountryRegulatoryProfile } from "@/lib/defaData";
import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";

const FLAG_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  SG, VN, ID, TH, MY, PH, MM, KH, LA, BN, TL,
};

export default function JurisdictionComparator() {
  const [countryAId, setCountryAId] = useState<string>("sg");
  const [countryBId, setCountryBId] = useState<string>("vn");

  const countryA = REALISTIC_COUNTRY_PROFILES.find((c) => c.id === countryAId) ?? REALISTIC_COUNTRY_PROFILES[0];
  const countryB = REALISTIC_COUNTRY_PROFILES.find((c) => c.id === countryBId) ?? REALISTIC_COUNTRY_PROFILES[1];

  const handleSwap = () => {
    setCountryAId(countryBId);
    setCountryBId(countryAId);
  };

  const handlePreset = (a: string, b: string) => {
    setCountryAId(a);
    setCountryBId(b);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-sans uppercase tracking-widest text-asean-yellow font-bold block mb-1.5">
            LEGAL ARCHITECTURE COMPARATOR
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Side-by-Side Jurisdiction Dossier Analysis
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl font-sans">
            Compare data localization mandates, cross-border transfer mechanisms, threat levels, and regulatory penalties between any two ASEAN member states.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 text-[11px] font-mono">Quick Presets:</span>
          <button
            onClick={() => handlePreset("sg", "vn")}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-asean-yellow hover:text-asean-yellow transition-all font-semibold"
          >
            SG vs VN (Open vs Strict)
          </button>
          <button
            onClick={() => handlePreset("id", "my")}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-asean-yellow hover:text-asean-yellow transition-all font-semibold"
          >
            ID vs MY (Hybrid vs Open)
          </button>
          <button
            onClick={() => handlePreset("th", "ph")}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-asean-yellow hover:text-asean-yellow transition-all font-semibold"
          >
            TH vs PH (GDPR vs CBPR)
          </button>
        </div>
      </div>

      {/* Main Comparison Container */}
      <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 p-6 sm:p-8">
        {/* Country Selectors Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
          {/* Selector A */}
          <div className="md:col-span-5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5 font-bold">
              Jurisdiction A
            </label>
            <select
              value={countryAId}
              onChange={(e) => setCountryAId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-asean-yellow"
            >
              {REALISTIC_COUNTRY_PROFILES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} [{c.code}] — {c.regimeType}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-2 flex justify-center pt-2 md:pt-4">
            <button
              onClick={handleSwap}
              title="Swap Countries"
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-asean-yellow hover:text-slate-950 transition-all shadow-md"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </button>
          </div>

          {/* Selector B */}
          <div className="md:col-span-5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5 font-bold">
              Jurisdiction B
            </label>
            <select
              value={countryBId}
              onChange={(e) => setCountryBId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-asean-yellow"
            >
              {REALISTIC_COUNTRY_PROFILES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} [{c.code}] — {c.regimeType}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-Side Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <CountryComparisonCard country={countryA} isPrimary />
          <CountryComparisonCard country={countryB} />
        </div>
      </div>
    </section>
  );
}

function CountryComparisonCard({
  country,
  isPrimary,
}: {
  country: CountryRegulatoryProfile;
  isPrimary?: boolean;
}) {
  const Flag = FLAG_ICONS[country.code];

  return (
    <div
      className={`rounded-xl border p-6 flex flex-col justify-between space-y-6 ${
        isPrimary
          ? "border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40"
          : "border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20"
      }`}
    >
      {/* Header Info */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            {Flag && <Flag className="w-7 h-5 rounded-xs object-cover shadow-sm" />}
            <div>
              <h3 className="font-serif-editorial text-2xl font-extrabold text-slate-900 dark:text-white">
                {country.name}
              </h3>
              <span className="text-xs text-slate-500 font-mono">Capital: {country.capital}</span>
            </div>
          </div>

          <span
            className={`rounded-lg px-3 py-1 text-xs font-bold border ${
              country.regimeType === "Strict Localization"
                ? "bg-asean-red/15 text-asean-red border-asean-red/30"
                : country.regimeType === "Hybrid"
                ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
                : "bg-asean-yellow/15 text-asean-yellow border-asean-yellow/30"
            }`}
          >
            {country.regimeType}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans mt-3">
          {country.description}
        </p>
      </div>

      {/* 6 Key Regulatory Dimensions Breakdown */}
      <div className="space-y-3 font-sans text-xs">
        {/* Dimension 1: Threat Score Meter */}
        <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-bold flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-asean-yellow" /> Threat Score Index
            </span>
            <span
              className={`font-bold text-xs ${
                country.threatScore >= 4
                  ? "text-asean-red"
                  : country.threatScore === 3
                  ? "text-asean-amber"
                  : "text-asean-emerald"
              }`}
            >
              {country.threatScore} / 5
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all ${
                country.threatScore >= 4
                  ? "bg-asean-red"
                  : country.threatScore === 3
                  ? "bg-asean-amber"
                  : "bg-asean-emerald"
              }`}
              style={{ width: `${(country.threatScore / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Dimension 2: Primary Enforcement Agency */}
        <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
            <Building2 className="h-3 w-3 text-slate-400" /> Primary Enforcement Authority
          </span>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{country.primaryAgency}</p>
        </div>

        {/* Dimension 3: Key Legislation */}
        <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
            <FileCheck2 className="h-3 w-3 text-slate-400" /> Key Digital Legislation
          </span>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{country.keyLegislation}</p>
        </div>

        {/* Dimension 4: Transfer Mechanism */}
        <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-slate-400" /> Cross-Border Transfer Protocol
          </span>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{country.transferMechanism}</p>
        </div>

        {/* Dimension 5: Maximum Penalties */}
        <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
            <Scale className="h-3 w-3 text-slate-400" /> Statutory Penalties
          </span>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{country.maxPenalty}</p>
        </div>

        {/* Dimension 6: Ingested Decrees */}
        <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold flex items-center gap-1">
            <Database className="h-3 w-3 text-slate-400" /> Ingested Observatory Decrees
          </span>
          <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">
            {country.activePoliciesCount} Decrees
          </span>
        </div>
      </div>
    </div>
  );
}
