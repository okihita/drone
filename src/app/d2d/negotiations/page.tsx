import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { fetchNegotiations } from "@/services/negotiation";
import { CheckCircle, Clock } from "lucide-react";
import NegotiationTimeline from "@/components/negotiations/NegotiationTimeline";

export const metadata: Metadata = {
  title: "Digital Trade Negotiations Timeline — ASEAN | D.R.O.N.E.",
  description: "Gantt and vertical timeline tracking DEFA, CPTPP, DEPA, IPEF, and bilateral digital economy agreement negotiations across Southeast Asia.",
};

export default function NegotiationsPage() {
  const milestones = fetchNegotiations();

  const completedCount = milestones.filter((m) => m.status === "COMPLETED").length;
  const inProgressCount = milestones.filter((m) => m.status === "IN_PROGRESS").length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors">
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-6 sm:py-9 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Digital Trade Negotiations Timeline
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-sans leading-relaxed">
                Which trade deals are shaping ASEAN&apos;s digital future? This timeline tracks every major digital trade negotiation affecting Southeast Asia — from the <strong className="text-slate-800 dark:text-slate-200">ASEAN DEFA</strong> (expected to bind all 10 member states by 2027) to <strong className="text-slate-800 dark:text-slate-200">CPTPP accessions</strong>, <strong className="text-slate-800 dark:text-slate-200">DEPA expansion</strong>, and bilateral agreements. Each entry shows what happened, when, and which countries are involved.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-sans">
              <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-asean-emerald" /><div><span className="block font-sans text-[10px] text-slate-400 uppercase font-bold">Completed</span><span className="font-bold text-slate-900 dark:text-white">{completedCount}</span></div></div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-asean-amber" /><div><span className="block font-sans text-[10px] text-slate-400 uppercase font-bold">In Progress</span><span className="font-bold text-slate-900 dark:text-white">{inProgressCount}</span></div></div>
            </div>
          </div>

          {/* Framework concept cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
            {[
              { label: "ASEAN DEFA", desc: "The Digital Economy Framework Agreement — ASEAN's flagship digital trade deal, negotiated by all 10 member states." },
              { label: "CPTPP", desc: "Comprehensive Trans-Pacific Partnership — 4 ASEAN members plus 7 Pacific nations with binding digital trade chapters." },
              { label: "DEPA", desc: "Digital Economy Partnership Agreement — modular digital trade framework pioneered by Singapore, Chile, and New Zealand." },
              { label: "IPEF", desc: "US-led Indo-Pacific Economic Framework — 7 ASEAN members participating in digital economy pillar negotiations." },
              { label: "Bilateral DEAs", desc: "Country-to-country digital trade deals — Singapore leads with agreements with Australia, UK, Korea, and EU." },
            ].map((item) => (
              <div key={item.label} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-400 leading-snug">
                <strong className="block text-slate-800 dark:text-slate-200 font-bold mb-0.5">{item.label}</strong>
                {item.desc}
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-3xl">
            <strong className="text-slate-500 dark:text-slate-400">How to read</strong>: Milestones are logged chronologically along a vertical stem track. Green dots signal completed milestones; amber dots signal active negotiations; blue dots signal upcoming events. Use the filter bar to isolate specific frameworks, statuses, or member states.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <NegotiationTimeline milestones={milestones} />
      </main>
      <Footer />
    </div>
  );
}
