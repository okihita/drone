"use client";

import React from "react";
import { getDefaCivilSocietyStates } from "@/services/defa";
import { ASEAN_MEMBER_STATES } from "@/lib/countries";
import { Shield, ShieldAlert } from "lucide-react";
import DEFARadarChart from "@/components/defa/DEFARadarChart";
import DEFABenchmarkExport from "@/components/defa/DEFABenchmarkExport";
import Footer from "@/components/Footer";

export default function DefaCivilSocietyView() {
  const csStates = getDefaCivilSocietyStates();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans">
      {/* Header Banner */}
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans uppercase tracking-widest text-asean-red font-bold">
            <Shield className="h-4 w-4 text-asean-red animate-pulse" />
            <span>Civil Society &amp; Public Interest Observatory</span>
            <span>·</span>
            <span className="text-slate-500 font-mono">SEOM Transparency &amp; Big Tech Pressure</span>
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Civil Society Threat Matrix &amp; DEFA Readiness
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-sans leading-relaxed">
            Critical analysis evaluating democratic deficit in closed-door SEOM negotiations, Big Tech deregulatory lobby pressure, and the digital divide separating high-tech member states from developing nations.
          </p>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Civil Society Warning Callout */}
        <div className="p-5 rounded-2xl bg-asean-red/10 border border-asean-red/30 text-slate-900 dark:text-white flex items-start gap-4 text-xs font-sans">
          <ShieldAlert className="w-6 h-6 text-asean-red shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-asean-red uppercase tracking-wider">
              Critical Warning: Closed-Door SEOM Negotiations &amp; Corporate Capture
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Official DEFA text negotiations were conducted exclusively by Senior Economic Officials Meetings (SEOM) without consultation from regional civil society, human rights defenders, or independent labor unions. Overly restrictive digital trade provisions risk prohibiting mandatory source code audits and dismantling domestic privacy safeguards.
            </p>
          </div>
        </div>

        {/* 11-Nation Readiness Radar */}
        <DEFARadarChart />

        {/* Civil Society Country Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {csStates.map((st) => {
            const country = ASEAN_MEMBER_STATES.find((m) => m.code === st.countryCode);

            return (
              <div
                key={st.countryCode}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    {country && <country.Flag className="w-5 h-3.5 object-cover rounded-[2px]" />}
                    <h4 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
                      {country?.name}
                    </h4>
                  </div>
                  <span className="font-mono text-xs font-bold text-asean-blue bg-asean-blue/10 px-2.5 py-0.5 rounded-full border border-asean-blue/30">
                    Readiness: {st.overallReadinessIndex}/100
                  </span>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                      <span>SEOM Negotiation Transparency</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{st.seomTransparencyIndex} / 100</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-asean-emerald" style={{ width: `${st.seomTransparencyIndex}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                      <span>Big Tech Lobby Pressure</span>
                      <span className="font-mono font-bold text-asean-red">{st.bigTechPressureScore} / 100</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-asean-red" style={{ width: `${st.bigTechPressureScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                      <span>Digital Divide Equity Gap</span>
                      <span className="font-mono font-bold text-asean-amber">{st.digitalDivideGapScore} / 100</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-asean-amber" style={{ width: `${st.digitalDivideGapScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dataset Downloader */}
        <DEFABenchmarkExport />
      </main>

      <Footer />
    </div>
  );
}
