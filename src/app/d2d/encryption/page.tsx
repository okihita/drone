import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { fetchEncryptionEvents, fetchEncryptionSummary } from "@/services/encryption";
import { AlertTriangle, ShieldCheck } from "lucide-react";
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
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-6 sm:py-9 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Encryption & Digital Security Observatory
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-sans leading-relaxed">
                Can citizens freely encrypt their communications? This observatory tracks government efforts to weaken, restrict, or ban encryption across Southeast Asia — from VPN criminalization and backdoor mandates to positive capacity building. <strong className="text-slate-800 dark:text-slate-200">Red events signal high-impact restrictions</strong> (severity ≥ 70); <strong className="text-slate-800 dark:text-slate-200">green events signal capacity building</strong> and cooperative developments.
              </p>
            </div>

            <div className="shrink-0 flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-sans">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-asean-red" />
                <div><span className="block font-sans text-[10px] text-slate-400 uppercase font-bold">High Severity</span><span className="font-bold text-slate-900 dark:text-white">{highSeverityCount} Events</span></div>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-asean-emerald" />
                <div><span className="block font-sans text-[10px] text-slate-400 uppercase font-bold">Countries</span><span className="font-bold text-slate-900 dark:text-white">{totalCountries} Tracked</span></div>
              </div>
            </div>
          </div>

          {/* Event type concept cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-5">
            {[
              { label: "VPN Ban", desc: "Government criminalizes or restricts VPN usage for citizens." },
              { label: "Backdoor Mandate", desc: "Companies forced to build decryption access for authorities." },
              { label: "Key Escrow", desc: "Encryption keys must be deposited with the government." },
              { label: "Intercept Expansion", desc: "Lawful intercept powers expanded to cover more services." },
              { label: "E2EE Restriction", desc: "End-to-end encryption limited or weakened by regulation." },
              { label: "Capacity Building", desc: "Positive: training, standards, and cooperative security efforts." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
                <strong className="block text-slate-800 dark:text-slate-200 mb-1">{item.label}</strong>
                {item.desc}
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-3xl">
            <strong className="text-slate-500 dark:text-slate-400">How to read</strong>: Each event is scored from 0–100 severity. Red dots (≥70) represent severe restrictions; orange dots (40–69) represent moderate concern; green dots (&lt;40) represent positive or low-impact developments. The summary stats above the event list show per-country averages.
          </p>
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
