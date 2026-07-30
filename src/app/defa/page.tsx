import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DefaChapterTracker from "@/components/landing/DefaChapterTracker";
import JurisdictionComparator from "@/components/landing/JurisdictionComparator";
import PolicyMatrixFeed from "@/components/landing/PolicyMatrixFeed";
import { Activity, ShieldCheck, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DEFA Compliance & Chapter Ratification Tracker | D.R.O.N.E.",
  description: "Real-time compliance telemetry mapping all 11 ASEAN member states across key Digital Economy Framework Agreement (DEFA) negotiation pillars.",
};

export default function DefaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors">
      <Header />

      {/* Dedicated Page Hero Banner */}
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0 text-xs font-sans uppercase tracking-widest text-asean-yellow font-bold mb-2">
                <Activity className="h-4 w-4 text-asean-amber animate-pulse" />
                <span>ASEAN Secretarial Telemetry</span>
                <span className="hidden sm:inline">·</span>
                <span className="text-slate-500 font-mono">SEOM DEFA 2026</span>
              </div>
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                DEFA Chapter Ratification &amp; Jurisdiction Observatory
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-sans">
                Independent oversight tracking compliance, cross-border data transfer safeguards, and regulatory friction across all 11 Southeast Asian member states under the Digital Economy Framework Agreement.
              </p>
            </div>

            {/* Quick Stat Pill Card */}
            <div className="shrink-0 flex items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-sans">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-asean-emerald" />
                <div>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">11 Member States</span>
                  <span className="font-bold text-slate-900 dark:text-white">Active Telemetry</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-asean-sky" />
                <div>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">6 DEFA Pillars</span>
                  <span className="font-bold text-slate-900 dark:text-white">38% Ratified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Observatory Suite Components */}
      <main className="flex-1">
        <DefaChapterTracker />
        <JurisdictionComparator />
        <PolicyMatrixFeed />
      </main>

      <Footer />
    </div>
  );
}
