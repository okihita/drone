"use client";

import React from "react";
import { getDefaAiEthicsStates } from "@/services/defa";
import { ASEAN_MEMBER_STATES } from "@/lib/countries";
import { Cpu, Check, X, AlertTriangle, ShieldCheck, Activity } from "lucide-react";
import Footer from "@/components/Footer";

export default function DefaAiEthicsView() {
  const aiStates = getDefaAiEthicsStates();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans">
      {/* Header Banner */}
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans uppercase tracking-widest text-asean-emerald font-bold">
            <Cpu className="h-4 w-4 text-asean-emerald animate-pulse" />
            <span>DEFA Chapter 5 Observatory</span>
            <span>·</span>
            <span className="text-slate-500 font-mono">ASEAN AI Ethics Guide 2024</span>
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            ASEAN AI Governance &amp; Ethics Alignment
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-sans leading-relaxed">
            Evaluating member state alignment with the regional AI ethics framework, algorithmic transparency mandates, AI training copyright exemptions, and algorithmic harm incident telemetry.
          </p>
        </div>
      </section>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-slate-400">Full AI Guide Adoption</span>
              <div className="font-serif-editorial text-3xl font-bold text-asean-emerald mt-1">5 Nations</div>
              <span className="text-[11px] text-slate-500">SG, MY, ID, TH, PH</span>
            </div>
            <ShieldCheck className="w-8 h-8 text-asean-emerald opacity-80" />
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-slate-400">AI Copyright Exemption</span>
              <div className="font-serif-editorial text-3xl font-bold text-asean-blue mt-1">3 Nations</div>
              <span className="text-[11px] text-slate-500">SG, MY, TH</span>
            </div>
            <Cpu className="w-8 h-8 text-asean-blue opacity-80" />
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-slate-400">Recorded Algorithmic Harms</span>
              <div className="font-serif-editorial text-3xl font-bold text-asean-amber mt-1">173 Incidents</div>
              <span className="text-[11px] text-slate-500">MMAI Telemetry Feed</span>
            </div>
            <Activity className="w-8 h-8 text-asean-amber opacity-80" />
          </div>
        </div>

        {/* AI Alignment Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 uppercase tracking-wider font-bold">
                <th className="p-4">ASEAN Member State</th>
                <th className="p-4">ASEAN AI Guide Alignment</th>
                <th className="p-4 text-center">AI Training Copyright Exemption</th>
                <th className="p-4 text-center">Algorithmic Risk Classification</th>
                <th className="p-4 text-center">State Audit Rights</th>
                <th className="p-4 text-center">Harm Incidents</th>
                <th className="p-4 text-right">Readiness Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {aiStates.map((st) => {
                const country = ASEAN_MEMBER_STATES.find((m) => m.code === st.countryCode);

                return (
                  <tr key={st.countryCode} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                      {country && <country.Flag className="w-5 h-3.5 object-cover rounded-[2px]" />}
                      <span>{country?.name}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          st.aseanAiGuideAlignment === "Full Adoption"
                            ? "bg-asean-emerald/15 text-asean-emerald border-asean-emerald/40"
                            : st.aseanAiGuideAlignment === "Draft Framework"
                            ? "bg-asean-amber/15 text-asean-amber border-asean-amber/40"
                            : "bg-asean-red/15 text-asean-red border-asean-red/40"
                        }`}
                      >
                        {st.aseanAiGuideAlignment}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {st.aiTrainingCopyrightExemption ? (
                        <Check className="w-4 h-4 text-asean-emerald mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-400 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {st.algorithmicRiskClassification ? (
                        <Check className="w-4 h-4 text-asean-emerald mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-400 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {st.stateAuditRights ? (
                        <Check className="w-4 h-4 text-asean-amber mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-400 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center font-mono font-bold text-asean-red">
                      {st.mmaiHarmIncidentsCount}
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-asean-blue">
                      {st.readinessScore} / 100
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
