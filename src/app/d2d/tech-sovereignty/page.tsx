import type { Metadata } from "next";
import Header from "@/components/Header";
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
      <Header />

      {/* Hero Banner */}
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
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
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-sans">
                Tracking forced technology transfers, mandatory source code disclosure, encryption mandates, technology choice restrictions, and authentication barriers across Southeast Asia. Each axis represents a Digital 2 Dozen principle scored 0–100.
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
