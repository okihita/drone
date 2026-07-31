import { Suspense } from "react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import BenchmarkClientShell from "@/components/benchmark/BenchmarkClientShell";
import D2DTimeline from "@/components/benchmark/D2DTimeline";
import { listAllBenchmarks, listPrinciples } from "@/services/benchmark";
import { BarChart3, Globe, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital 2 Dozen Benchmark — ASEAN Digital Trade Compliance | D.R.O.N.E.",
  description: "Comprehensive compliance heatmap mapping all 24 USTR Digital 2 Dozen principles against 11 ASEAN member states. Interactive benchmark scores, cluster analysis, and exportable data.",
};

export default function BenchmarkPage() {
  const allSummaries = listAllBenchmarks();
  const principles = listPrinciples();

  const globalAverage = Math.round(
    allSummaries.reduce((sum, c) => sum + c.overallScore, 0) / allSummaries.length,
  );

  const highestCountry = allSummaries.reduce((best, c) =>
    c.overallScore > best.overallScore ? c : best,
  );
  const lowestCountry = allSummaries.reduce((worst, c) =>
    c.overallScore < worst.overallScore ? c : worst,
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors">
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-6 sm:py-9 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Compliance Matrix
              </h1>
            </div>

            <div className="shrink-0 flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-sans">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-asean-emerald" />
                <div>
                  <span className="block font-sans text-[10px] text-slate-400 uppercase font-bold">ASEAN Avg</span>
                  <span className="font-bold text-slate-900 dark:text-white">{globalAverage}/100</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-asean-blue" />
                <div>
                  <span className="block font-sans text-[10px] text-slate-400 uppercase font-bold">Highest</span>
                  <span className="font-bold text-slate-900 dark:text-white">{highestCountry.countryName} ({highestCountry.overallScore})</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-asean-red" />
                <div>
                  <span className="block font-sans text-[10px] text-slate-400 uppercase font-bold">Lowest</span>
                  <span className="font-bold text-slate-900 dark:text-white">{lowestCountry.countryName} ({lowestCountry.overallScore})</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-sans space-y-3">
              <p>
                The <strong className="text-slate-900 dark:text-white">Digital 2 Dozen</strong> is a set of 24 digital trade principles published by the USTR in April 2016, extracted from the <strong className="text-slate-900 dark:text-white">Trans-Pacific Partnership (TPP)</strong> — the most ambitious digital trade agreement ever negotiated. Though the US withdrew in 2017, these principles live on through the <strong className="text-slate-900 dark:text-white">CPTPP</strong> (joined by four ASEAN nations), <strong className="text-slate-900 dark:text-white">DEPA</strong>, and the <strong className="text-slate-900 dark:text-white">ASEAN Digital Economy Framework Agreement (DEFA)</strong> currently under negotiation.
              </p>
              <p>
                This benchmark scores all 11 ASEAN member states on a <strong className="text-slate-900 dark:text-white">0–100 compliance scale</strong> based on enacted legislation and enforcement practice — not aspirational promises. <span className="text-asean-emerald font-bold">80+</span> signals full alignment; <span className="text-asean-red font-bold">below 20</span> signals severe non-compliance. The map below gives the geographic picture; the heatmap further down reveals the principle-by-principle detail.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-asean-blue/5 dark:bg-asean-blue/10 border border-asean-blue/20">
                <div className="text-[10px] uppercase tracking-wider font-bold text-asean-blue mb-0.5">Origin</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">USTR 2016 · TPP · 12 Pacific Rim nations</p>
              </div>
              <div className="p-3 rounded-xl bg-asean-amber/5 dark:bg-asean-amber/10 border border-asean-amber/20">
                <div className="text-[10px] uppercase tracking-wider font-bold text-asean-amber mb-0.5">Scope</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">24 principles · 5 clusters · 11 countries</p>
              </div>
              <div className="p-3 rounded-xl bg-asean-emerald/5 dark:bg-asean-emerald/10 border border-asean-emerald/20">
                <div className="text-[10px] uppercase tracking-wider font-bold text-asean-emerald mb-0.5">Why</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">DEFA will bind 680M people. This is the yardstick.</p>
              </div>
              <div className="p-3 rounded-xl bg-asean-red/5 dark:bg-asean-red/10 border border-asean-red/20">
                <div className="text-[10px] uppercase tracking-wider font-bold text-asean-red mb-0.5">How</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">Click cells for detail · Hover for TPP text · Filter by cluster</p>
              </div>
            </div>
          </div>

          <D2DTimeline />

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-6 max-w-3xl">
            <strong className="text-slate-500 dark:text-slate-400">How to read</strong>: Click any country on the map to see its detailed scores. Hover over heatmap cells for the original TPP provision text. Filter by cluster to focus on specific policy areas. Green cells (80+) indicate full compliance; red cells (&lt;20) indicate severe non-compliance. Export the full dataset via the button in the sidebar.
          </p>

          <div className="mt-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-asean-emerald animate-pulse shrink-0" />
              <span><strong>Data Integrity Audit (July 2026)</strong>: Empirically verified against OECD DSTRI, Freedom House, CPTPP ratification records &amp; ASEAN DEFA SEOM 57 technical annexes across 264 statutory data points.</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">100% Empirically Cited</span>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <BenchmarkClientShell summaries={allSummaries} principles={principles} />
      </Suspense>

      <Footer />
    </div>
  );
}
