"use client";

import React, { useState } from "react";
import { getDefaDataGovernanceStates } from "@/services/defa";
import { ASEAN_MEMBER_STATES } from "@/lib/countries";
import { DataRegimeTier } from "@/types/defa";
import { Globe, Layers } from "lucide-react";
import Footer from "@/components/Footer";

export default function DefaDataGovernanceView() {
  const dataStates = getDefaDataGovernanceStates();
  const [selectedRegimeFilter, setSelectedRegimeFilter] = useState<DataRegimeTier | "ALL">("ALL");

  const filteredStates = selectedRegimeFilter === "ALL"
    ? dataStates
    : dataStates.filter((s) => s.regimeTier === selectedRegimeFilter);

  const getTierBadge = (tier: DataRegimeTier) => {
    switch (tier) {
      case "OPEN_TRANSFER":
        return { label: "Open Transfer Regime", className: "bg-asean-emerald/15 text-asean-emerald border-asean-emerald/40" };
      case "HYBRID_CONDITIONAL":
        return { label: "Hybrid / Conditional Regime", className: "bg-asean-amber/15 text-asean-amber border-asean-amber/40" };
      case "STRICT_LOCALIZATION":
      default:
        return { label: "Strict Localization Regime", className: "bg-asean-red/15 text-asean-red border-asean-red/40" };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans">
      {/* Header Banner */}
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Cross-Border Data Flows &amp; Localization Regimes
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-sans leading-relaxed">
                Cross-border data movement is the central economic engine of DEFA, projected to unlock <strong className="text-slate-800 dark:text-slate-200">$2 Trillion USD</strong> in regional value by 2030. However, data flows represent Southeast Asia&apos;s most contentious policy battlefield. This dashboard evaluates the 3-tier regulatory spectrum across all 11 ASEAN nations—contrasting open data transfer regimes against conditional models and strict domestic server localization mandates that restrict civil society and digital rights.
              </p>
            </div>

            {/* Stat Pill */}
            <div className="shrink-0 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-sans space-y-1">
              <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Data Regime Spectrum</span>
              <div className="font-bold text-slate-900 dark:text-white text-sm">3 Tiers Across 11 Nations</div>
              <span className="text-asean-emerald font-bold">3 Open</span> · <span className="text-asean-amber font-bold">4 Hybrid</span> · <span className="text-asean-red font-bold">4 Strict</span>
            </div>
          </div>

          {/* 5 Concept Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            {[
              { title: "Open Transfer Regimes", desc: "Permitting cross-border data flows by default under comparable privacy baselines (SG, PH, MY)." },
              { title: "Hybrid Regimes", desc: "Public sector data localization paired with private sector contractual transfer safeguards (ID, TH)." },
              { title: "Strict Localization", desc: "Mandatory domestic server storage and state law enforcement access mandates (VN, MM, KH)." },
              { title: "ASEAN Model Clauses", desc: "Voluntary regional template clauses facilitating legally compliant personal data transfers." },
              { title: "Legal Data Friction", desc: "Quantitative index rating cross-border data restrictions for NGOs, journalists, and cloud services." },
            ].map((card) => (
              <div key={card.title} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-sans">
                <strong className="block text-slate-900 dark:text-white font-bold mb-1">{card.title}</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-normal">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* How to Read Note */}
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed max-w-4xl pt-1">
            <strong className="text-slate-700 dark:text-slate-300 font-bold">How to read</strong>: Each country card breaks down primary data protection laws, localization decrees, and ASEAN MCC integration. <span className="text-asean-emerald font-bold">Low friction scores (0–30)</span> indicate open data regimes; <span className="text-asean-amber font-bold">Moderate scores (31–65)</span> represent hybrid regimes; <span className="text-asean-red font-bold">High scores (&gt;65)</span> flag heavy data localization mandates and elevated state surveillance risks.
          </p>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Tier Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-asean-blue" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Filter Data Regimes ({filteredStates.length})
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
            <button
              type="button"
              onClick={() => setSelectedRegimeFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                selectedRegimeFilter === "ALL"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
              }`}
            >
              All Regimes (11)
            </button>
            <button
              type="button"
              onClick={() => setSelectedRegimeFilter("OPEN_TRANSFER")}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                selectedRegimeFilter === "OPEN_TRANSFER"
                  ? "bg-asean-emerald text-white border-asean-emerald shadow-xs"
                  : "bg-asean-emerald/10 text-asean-emerald border-asean-emerald/30"
              }`}
            >
              Open Transfer (3)
            </button>
            <button
              type="button"
              onClick={() => setSelectedRegimeFilter("HYBRID_CONDITIONAL")}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                selectedRegimeFilter === "HYBRID_CONDITIONAL"
                  ? "bg-asean-amber text-slate-900 border-asean-amber shadow-xs"
                  : "bg-asean-amber/10 text-asean-amber border-asean-amber/30"
              }`}
            >
              Hybrid / Conditional (4)
            </button>
            <button
              type="button"
              onClick={() => setSelectedRegimeFilter("STRICT_LOCALIZATION")}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                selectedRegimeFilter === "STRICT_LOCALIZATION"
                  ? "bg-asean-red text-white border-asean-red shadow-xs"
                  : "bg-asean-red/10 text-asean-red border-asean-red/30"
              }`}
            >
              Strict Localization (4)
            </button>
          </div>
        </div>

        {/* Member State Data Governance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStates.map((state) => {
            const country = ASEAN_MEMBER_STATES.find((m) => m.code === state.countryCode);
            const badge = getTierBadge(state.regimeTier);

            return (
              <div
                key={state.countryCode}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      {country && <country.Flag className="w-5 h-3.5 object-cover rounded-[2px]" />}
                      <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
                        {country?.name}
                      </h3>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.className}`}>
                      {badge.label}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-sans">
                    <div>
                      <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block">Primary Privacy Law</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{state.primaryDataLaw}</span>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block">Localization Mandate</span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                        {state.dataLocalizationMandate}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                      <span className="text-slate-500">ASEAN MCCs Status:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{state.mccAdoptionStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Legal Friction Meter */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-sans">
                    <span className="text-slate-500 font-semibold">Legal Data Friction Score</span>
                    <span className={`font-mono font-bold ${
                      state.legalFrictionScore > 70 ? "text-asean-red" : state.legalFrictionScore > 40 ? "text-asean-amber" : "text-asean-emerald"
                    }`}>
                      {state.legalFrictionScore} / 100
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full ${
                        state.legalFrictionScore > 70 ? "bg-asean-red" : state.legalFrictionScore > 40 ? "bg-asean-amber" : "bg-asean-emerald"
                      }`}
                      style={{ width: `${state.legalFrictionScore}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
