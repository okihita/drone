import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchEncryptionEvents, fetchEncryptionSummary } from "@/services/encryption";
import { Lock, AlertTriangle, ShieldCheck } from "lucide-react";
import EncryptionEventList from "@/components/encryption/EncryptionEventList";
import EncryptionSummaryStats from "@/components/encryption/EncryptionSummaryStats";

export const metadata: Metadata = {
  title: "Encryption & Digital Security Observatory — ASEAN | D.R.O.N.E.",
  description: "Tracking encryption regulation across Southeast Asia: VPN bans, backdoor mandates, lawful intercept expansions, key escrow requirements, and cybersecurity capacity building.",
};

export default function EncryptionPage() {
  const events = fetchEncryptionEvents();
  const summary = fetchEncryptionSummary();

  const highSeverityCount = events.filter((e) => e.severityScore >= 70).length;
  const totalCountries = Object.keys(summary).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors">
      <Header />
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-asean-red font-bold mb-2">
                <Lock className="h-4 w-4 text-asean-red animate-pulse" />
                <span>Digital 2 Dozen · Principle 12</span>
                <span>·</span>
                <span className="text-slate-500 font-mono">Encryption Observatory</span>
              </div>
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Encryption & Digital Security Observatory
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-sans">
                Monitoring encryption regulation across Southeast Asia: VPN criminalization, encryption backdoor mandates, lawful intercept expansions, key escrow requirements, and cybersecurity capacity building cooperation.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-sans">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-asean-red" />
                <div><span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">High Severity</span><span className="font-bold text-slate-900 dark:text-white">{highSeverityCount} Events</span></div>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-asean-emerald" />
                <div><span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Countries</span><span className="font-bold text-slate-900 dark:text-white">{totalCountries} Tracked</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <main className="flex-1">
        <EncryptionSummaryStats summary={summary} />
        <EncryptionEventList events={events} />
      </main>
      <Footer />
    </div>
  );
}
