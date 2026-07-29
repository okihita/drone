import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenchmarkHeatmap from "@/components/benchmark/BenchmarkHeatmap";
import ClusterFilter from "@/components/benchmark/ClusterFilter";
import BenchmarkExport from "@/components/benchmark/BenchmarkExport";
import BenchmarkSummaryCard from "@/components/benchmark/BenchmarkSummaryCard";
import { listAllBenchmarks, listPrinciples } from "@/services/benchmark";
import { BarChart3, Globe, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital 2 Dozen Benchmark — ASEAN Digital Trade Compliance | D.R.O.N.E.",
  description: "Comprehensive compliance heatmap mapping all 24 USTR Digital 2 Dozen principles against 11 ASEAN member states. Interactive benchmark scores, cluster analysis, and exportable data.",
};

export default function BenchmarkPage() {
  const allSummaries = listAllBenchmarks();
  const principles = listPrinciples();

  // Average across all countries for hero stat
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
      <Header />

      {/* Hero Banner */}
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-asean-blue font-bold mb-2">
                <BarChart3 className="h-4 w-4 text-asean-blue animate-pulse" />
                <span>USTR Digital 2 Dozen — TPP Benchmark</span>
                <span>·</span>
                <span className="text-slate-500 font-mono">24 Principles × 11 States</span>
              </div>
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Digital 2 Dozen Compliance Matrix
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-sans">
                Independent benchmarking of all 11 ASEAN member states against the 24 USTR Digital 2 Dozen digital trade principles drawn from the Trans-Pacific Partnership (TPP). Scores reflect legislative alignment, enforcement practice, and regulatory environment.
              </p>
            </div>

            {/* Hero Stats */}
            <div className="shrink-0 flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-sans">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-asean-emerald" />
                <div>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">ASEAN Average</span>
                  <span className="font-bold text-slate-900 dark:text-white">{globalAverage}/100</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-asean-blue" />
                <div>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Highest</span>
                  <span className="font-bold text-slate-900 dark:text-white">{highestCountry.countryName} ({highestCountry.overallScore})</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-asean-red" />
                <div>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Lowest</span>
                  <span className="font-bold text-slate-900 dark:text-white">{lowestCountry.countryName} ({lowestCountry.overallScore})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1">
        <BenchmarkSummaryCard summaries={allSummaries} />
        <BenchmarkHeatmap summaries={allSummaries} principles={principles} />
        <BenchmarkExport summaries={allSummaries} />
      </main>

      <Footer />
    </div>
  );
}
