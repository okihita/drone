"use client";

import React, { useState } from "react";
import { getDefaDataGovernanceStates } from "@/services/defa";
import { ASEAN_MEMBER_STATES } from "@/lib/countries";
import { DataRegimeTier } from "@/types/defa";
import { Layers } from "lucide-react";
import { riskTone, toneTextClass, toneBarClass } from "@/lib/colors";
import HeroBanner from "@/components/layout/HeroBanner";

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

  const getSurveillanceBadge = (risk: "High" | "Medium" | "Low") => {
    switch (risk) {
      case "High":
        return { label: "High Surveillance Risk", className: "bg-asean-red/15 text-asean-red border-asean-red/40" };
      case "Medium":
        return { label: "Medium Surveillance Risk", className: "bg-asean-amber/15 text-asean-amber border-asean-amber/40" };
      case "Low":
      default:
        return { label: "Low Surveillance Risk", className: "bg-asean-emerald/15 text-asean-emerald border-asean-emerald/40" };
    }
  };

  return (
    <>
      <HeroBanner
        title="Cross-Border Data &amp; Localization"
        description={
          <>
            Cross-border data movement is the central economic engine of DEFA, projected to unlock <strong className="text-slate-800 dark:text-slate-200">$2 Trillion USD</strong> in regional value by 2030. However, data flows represent Southeast Asia&apos;s most contentious policy battlefield. This dashboard evaluates the 3-tier regulatory spectrum across all 11 ASEAN nations—contrasting open data transfer regimes against conditional models and strict domestic server localization mandates that restrict civil society and digital rights.
          </>
        }
        rightSlot={
          <div className="shrink-0 p-5 sm:p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-800/80 shadow-xs text-sm font-sans space-y-1.5">
            <span className="block font-sans text-sm text-slate-400 uppercase font-bold tracking-wider">Data Regime Spectrum</span>
            <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">3 Tiers Across 11 Nations</div>
            <span className="text-asean-emerald font-bold">3 Open</span> · <span className="text-asean-amber font-bold">4 Hybrid</span> · <span className="text-asean-red font-bold">4 Strict</span>
          </div>
        }
        concepts={[
          { title: "Open Transfer Regimes", desc: "Permitting cross-border data flows by default under comparable privacy baselines (SG, PH, MY)." },
          { title: "Hybrid Regimes", desc: "Public sector data localization paired with private sector contractual transfer safeguards (ID, TH)." },
          { title: "Strict Localization", desc: "Mandatory domestic server storage and state law enforcement access mandates (VN, MM, KH)." },
          { title: "ASEAN Model Clauses", desc: "Voluntary regional template clauses facilitating legally compliant personal data transfers." },
          { title: "Legal Data Friction", desc: "Quantitative index rating cross-border data restrictions for NGOs, journalists, and cloud services." },
        ]}
        howToRead={
          <>
            Each country card breaks down primary data protection laws, localization decrees, and ASEAN MCC integration. <span className="text-asean-emerald font-bold">Low friction scores (0–30)</span> indicate open data regimes; <span className="text-asean-amber font-bold">Moderate scores (31–65)</span> represent hybrid regimes; <span className="text-asean-red font-bold">High scores (&gt;65)</span> flag heavy data localization mandates and elevated state surveillance risks.
          </>
        }
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full font-sans">
        <div className="space-y-10 sm:space-y-12">
          {/* Tier Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 shadow-sm">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-asean-blue" />
              <span className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Filter Data Regimes ({filteredStates.length})
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-sans">
              <button
                type="button"
                onClick={() => setSelectedRegimeFilter("ALL")}
                className={`px-3.5 py-1.5 rounded-xl border font-bold text-sm transition-all ${
                  selectedRegimeFilter === "ALL"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200/70 dark:border-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                All Regimes (11)
              </button>
              <button
                type="button"
                onClick={() => setSelectedRegimeFilter("OPEN_TRANSFER")}
                className={`px-3.5 py-1.5 rounded-xl border font-bold text-sm transition-all ${
                  selectedRegimeFilter === "OPEN_TRANSFER"
                    ? "bg-asean-emerald text-white border-asean-emerald shadow-xs"
                    : "bg-asean-emerald/10 text-asean-emerald border-asean-emerald/30 hover:bg-asean-emerald/20"
                }`}
              >
                Open Transfer (3)
              </button>
              <button
                type="button"
                onClick={() => setSelectedRegimeFilter("HYBRID_CONDITIONAL")}
                className={`px-3.5 py-1.5 rounded-xl border font-bold text-sm transition-all ${
                  selectedRegimeFilter === "HYBRID_CONDITIONAL"
                    ? "bg-asean-amber text-slate-900 border-asean-amber shadow-xs"
                    : "bg-asean-amber/10 text-asean-amber border-asean-amber/30 hover:bg-asean-amber/20"
                }`}
              >
                Hybrid / Conditional (4)
              </button>
              <button
                type="button"
                onClick={() => setSelectedRegimeFilter("STRICT_LOCALIZATION")}
                className={`px-3.5 py-1.5 rounded-xl border font-bold text-sm transition-all ${
                  selectedRegimeFilter === "STRICT_LOCALIZATION"
                    ? "bg-asean-red text-white border-asean-red shadow-xs"
                    : "bg-asean-red/10 text-asean-red border-asean-red/30 hover:bg-asean-red/20"
                }`}
              >
                Strict Localization (4)
              </button>
            </div>
          </div>

          {/* Member State Data Governance Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStates.map((state) => {
              const country = ASEAN_MEMBER_STATES.find((m) => m.code === state.countryCode);
              const badge = getTierBadge(state.regimeTier);
              const survBadge = getSurveillanceBadge(state.surveillanceRisk);

              return (
                <div
                  key={state.countryCode}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800/80 pb-4">
                      <div className="flex items-center gap-2.5">
                        {country && <country.Flag className="w-5 h-3.5 object-cover rounded-[2px]" />}
                        <h3 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
                          {country?.name}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`px-2.5 py-1 rounded-full text-sm font-bold border ${badge.className}`}>
                          {badge.label}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-sm font-bold border ${survBadge.className}`}>
                          {survBadge.label}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm font-sans">
                      <div>
                        <span className="font-sans text-sm text-slate-400 uppercase font-bold tracking-wider block">Primary Privacy Law</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">{state.primaryDataLaw}</span>
                      </div>

                      <div>
                        <span className="font-sans text-sm text-slate-400 uppercase font-bold tracking-wider block">Localization Mandate</span>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mt-0.5">
                          {state.dataLocalizationMandate}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-200/70 dark:border-slate-800/80 text-sm">
                        <span className="text-slate-500">ASEAN MCCs Status:</span>
                        <span className="font-bold text-slate-900 dark:text-white">{state.mccAdoptionStatus}</span>
                      </div>
                    </div>
                  </div>

                  {/* Legal Friction Meter */}
                  <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-sm font-sans">
                      <span className="text-slate-500 font-semibold">Legal Data Friction Score</span>
                      <span className={`font-sans font-bold ${toneTextClass(riskTone(state.legalFrictionScore, 40, 70))}`}>
                        {state.legalFrictionScore} / 100
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full ${toneBarClass(riskTone(state.legalFrictionScore, 40, 70))}`}
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
    </>
  );
}
