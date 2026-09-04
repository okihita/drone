"use client";

import React from "react";
import { getDefaAiEthicsStates } from "@/services/defa";
import { ASEAN_MEMBER_STATES } from "@/lib/countries";
import { Cpu, Check, X, ShieldCheck, Activity } from "lucide-react";
import HeroBanner from "@/components/layout/HeroBanner";

export default function DefaAiEthicsView() {
  const aiStates = getDefaAiEthicsStates();

  const fullAdoptionStates = aiStates.filter((s) => s.aseanAiGuideAlignment === "Full Adoption");
  const copyrightExemptionStates = aiStates.filter((s) => s.aiTrainingCopyrightExemption);
  const totalHarmIncidents = aiStates.reduce((sum, s) => sum + s.mmaiHarmIncidentsCount, 0);

  return (
    <>
      <HeroBanner
        title="AI Ethics &amp; Governance"
        description={
          <>
            As artificial intelligence deployment accelerates across Southeast Asia, DEFA Chapter 5 seeks to establish common AI safety and governance baselines. This dashboard measures national alignment with the landmark <strong className="text-slate-800 dark:text-slate-200">ASEAN Guide on AI Ethics and Governance (2024)</strong>, evaluating algorithmic risk classification, AI training copyright exemptions, state automated decision audit rights, and real-time algorithmic harm telemetry.
          </>
        }
        rightSlot={
          <div className="shrink-0 p-5 sm:p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-800/80 shadow-xs text-sm font-sans space-y-1.5">
            <span className="block font-sans text-sm text-slate-400 uppercase font-bold tracking-wider">Regional Alignment</span>
            <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{fullAdoptionStates.length} Full Adoption Nations</div>
            <span className="text-asean-emerald font-bold">{fullAdoptionStates.map((s) => s.countryCode).join(", ")}</span>
          </div>
        }
        concepts={[
          { title: "ASEAN AI Guide", desc: "Adoption of regional ethical principles covering fairness, transparency, and human oversight." },
          { title: "AI Copyright Exemption", desc: "Statutory exceptions allowing text and data mining (TDM) for AI model training." },
          { title: "Risk Classification", desc: "Categorizing high-risk AI deployments in healthcare, finance, and law enforcement." },
          { title: "State Audit Rights", desc: "Regulating government access to inspect proprietary AI algorithms and training datasets." },
          { title: "Harm Telemetry", desc: "Connecting reported algorithmic discrimination incidents from DRONE Media AI." },
        ]}
        howToRead={
          <>
            Each country row rates statutory compliance across 5 dimensions. <span className="text-asean-emerald font-bold">Higher readiness scores (&ge;75)</span> represent advanced legal frameworks that balance innovation with ethical AI safeguards; <span className="text-asean-amber font-bold">Moderate scores (45–74)</span> indicate draft or voluntary frameworks; <span className="text-asean-red font-bold">Red indicators (&lt;45)</span> reflect absent AI governance or unconstrained state algorithmic surveillance.
          </>
        }
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full font-sans">
        <div className="space-y-10 sm:space-y-12">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 font-sans">
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
              <div>
                <span className="font-sans text-sm uppercase font-bold text-slate-400 tracking-wider">Full AI Guide Adoption</span>
                <div className="font-serif-editorial text-3xl font-bold text-asean-emerald mt-1.5">{fullAdoptionStates.length} Nations</div>
                <span className="text-sm text-slate-500 mt-1 block">{fullAdoptionStates.map((s) => s.countryCode).join(", ")}</span>
              </div>
              <ShieldCheck className="w-9 h-9 text-asean-emerald opacity-80 shrink-0" />
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
              <div>
                <span className="font-sans text-sm uppercase font-bold text-slate-400 tracking-wider">AI Copyright Exemption</span>
                <div className="font-serif-editorial text-3xl font-bold text-asean-blue mt-1.5">{copyrightExemptionStates.length} Nations</div>
                <span className="text-sm text-slate-500 mt-1 block">{copyrightExemptionStates.map((s) => s.countryCode).join(", ")}</span>
              </div>
              <Cpu className="w-9 h-9 text-asean-blue opacity-80 shrink-0" />
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
              <div>
                <span className="font-sans text-sm uppercase font-bold text-slate-400 tracking-wider">Recorded Algorithmic Harms</span>
                <div className="font-serif-editorial text-3xl font-bold text-asean-amber mt-1.5">{totalHarmIncidents} Incidents</div>
                <span className="text-sm text-slate-500 mt-1 block">MMAI Telemetry Feed</span>
              </div>
              <Activity className="w-9 h-9 text-asean-amber opacity-80 shrink-0" />
            </div>
          </div>

          {/* AI Alignment Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200/70 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-left text-sm font-sans">
              <thead>
                <tr className="border-b border-slate-200/70 dark:border-slate-800/80 bg-slate-100/70 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 uppercase tracking-wider font-bold">
                  <th className="p-4 sm:p-5">ASEAN Member State</th>
                  <th className="p-4 sm:p-5">ASEAN AI Guide Alignment</th>
                  <th className="p-4 sm:p-5 text-center">AI Training Copyright Exemption</th>
                  <th className="p-4 sm:p-5 text-center">Algorithmic Risk Classification</th>
                  <th className="p-4 sm:p-5 text-center">State Audit Rights</th>
                  <th className="p-4 sm:p-5 text-center">Harm Incidents</th>
                  <th className="p-4 sm:p-5 text-right">Readiness Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/80">
                {aiStates.map((st) => {
                  const country = ASEAN_MEMBER_STATES.find((m) => m.code === st.countryCode);

                  return (
                    <tr key={st.countryCode} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white align-middle">
                        <div className="flex items-center gap-2.5">
                          {country && <country.Flag className="w-5 h-3.5 object-cover rounded-[2px]" />}
                          <span>{country?.name}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border ${
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
                      <td className="p-4 sm:p-5 text-center">
                        {st.aiTrainingCopyrightExemption ? (
                          <Check className="w-4 h-4 text-asean-emerald mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-400 mx-auto" />
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-center">
                        {st.algorithmicRiskClassification ? (
                          <Check className="w-4 h-4 text-asean-emerald mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-400 mx-auto" />
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-center">
                        {st.stateAuditRights ? (
                          <Check className="w-4 h-4 text-asean-amber mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-400 mx-auto" />
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-center font-sans font-bold text-asean-red">
                        {st.mmaiHarmIncidentsCount}
                      </td>
                      <td className="p-4 sm:p-5 text-right font-sans font-bold text-asean-blue">
                        {st.readinessScore} / 100
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
