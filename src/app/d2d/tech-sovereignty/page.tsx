import type { Metadata } from "next";
import Footer from "@/components/Footer";
import TechSovereigntyRadar from "@/components/tech-sovereignty/TechSovereigntyRadar";
import ViolationTimeline from "@/components/tech-sovereignty/ViolationTimeline";
import { listAllBenchmarks } from "@/services/benchmark";
import { fetchEncryptionEvents } from "@/services/encryption";
import { Cpu, Lock, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Technology Sovereignty Radar — ASEAN Digital Rights | D.R.O.N.E.",
  description: "Interactive radar chart tracking forced technology transfer, source code protection, encryption mandates, technology choice, and authentication methods across all 11 ASEAN member states.",
};

export default function TechSovereigntyPage() {
  const allSummaries = listAllBenchmarks();
  const techPrinciples = [6, 7, 8, 9, 12]; // Technology Sovereignty cluster
  const encryptionEvents = fetchEncryptionEvents();

  // High-risk countries (avg tech sovereignty score below 40)
  const highRiskCount = allSummaries.filter((s) => {
    const techScores = s.scores.filter((sc) => techPrinciples.includes(sc.principleId));
    const avg = techScores.reduce((sum, sc) => sum + sc.score, 0) / techScores.length;
    return avg < 40;
  }).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors">
      {/* Hero Banner */}
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-asean-amber font-bold mb-2">
                <Cpu className="h-4 w-4 text-asean-amber animate-pulse" />
                <span>Digital 2 Dozen · Principles 6–9, 12</span>
                <span>·</span>
                <span className="text-slate-500 font-mono">Technology Sovereignty</span>
              </div>
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Technology Sovereignty Radar
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-sans leading-relaxed">
                How free is each ASEAN country to use and build technology? This radar measures five dimensions of government tech control across 11 countries. A <strong className="text-slate-800 dark:text-slate-200">larger pentagon means more freedom</strong> — companies keep their code private, use strong encryption, and choose their own tech. A <strong className="text-slate-800 dark:text-slate-200">smaller shape means more restrictions</strong> — forced transfers, mandatory source disclosure, and encryption backdoors.
              </p>
            </div>

            <div className="shrink-0 flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-sans">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-asean-red" />
                <div>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">High Risk</span>
                  <span className="font-bold text-slate-900 dark:text-white">{highRiskCount} of 11 Countries</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-asean-blue" />
                <div>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Encryption Events</span>
                  <span className="font-bold text-slate-900 dark:text-white">{encryptionEvents.length} Tracked</span>
                </div>
              </div>
            </div>
          </div>

          {/* Axis concept cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
              <strong className="block text-slate-800 dark:text-slate-200 mb-1">No Forced Tech Transfer</strong>
              Can foreign companies enter without handing over their technology to local partners?
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
              <strong className="block text-slate-800 dark:text-slate-200 mb-1">Source Code Protection</strong>
              Can companies keep their software secret, or must they reveal it to the government?
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
              <strong className="block text-slate-800 dark:text-slate-200 mb-1">Technology Choice</strong>
              Can businesses pick the best tech, or are they forced to use government-approved alternatives?
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
              <strong className="block text-slate-800 dark:text-slate-200 mb-1">Authentication Methods</strong>
              Can people use standard digital signatures, or are they locked into government-only ID platforms?
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
              <strong className="block text-slate-800 dark:text-slate-200 mb-1">Encryption Products</strong>
              Can citizens freely use VPNs and secure messaging, or does the government ban or weaken them?
            </div>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-3xl">
            <strong className="text-slate-500 dark:text-slate-400">How to read the radar:</strong> Select up to 4 countries from the toggles. Each axis ranges from 0 (worst) to 100 (best). Countries scoring below 40 are flagged as <span className="text-asean-red font-medium">high risk</span>. The timeline below the radar logs real-world laws and decrees — red dots signal high-impact restrictions, green dots signal positive developments.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <TechSovereigntyRadar summaries={allSummaries} principles={techPrinciples} />
        <ViolationTimeline events={encryptionEvents} />
      </main>

      <Footer />
    </div>
  );
}
