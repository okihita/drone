import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenchmarkHeatmap from "@/components/benchmark/BenchmarkHeatmap";
import BenchmarkExport from "@/components/benchmark/BenchmarkExport";
import BenchmarkSummaryCard from "@/components/benchmark/BenchmarkSummaryCard";
import { listAllBenchmarks, listPrinciples } from "@/services/benchmark";
import { BarChart3, Globe, Shield, Info } from "lucide-react";

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

      {/* What is the Digital 2 Dozen? */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Explanation */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-asean-blue" />
                <h2 className="font-serif-editorial text-xl font-extrabold text-slate-900 dark:text-white">
                  What is the Digital 2 Dozen?
                </h2>
              </div>
              <div className="prose prose-sm prose-slate dark:prose-invert max-w-none font-sans space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                <p>
                  The <strong className="text-slate-900 dark:text-white">Digital 2 Dozen</strong> is a set of 24 digital trade principles published by the United States Trade Representative (USTR) in April 2016. These principles were drawn from the <strong className="text-slate-900 dark:text-white">Trans-Pacific Partnership (TPP)</strong>, the most ambitious digital trade agreement ever negotiated, and have since become the <em>de facto global benchmark</em> for what a modern digital trade framework should look like.
                </p>
                <p>
                  Though the United States withdrew from the TPP in 2017, these 24 principles live on through successor agreements like the <strong className="text-slate-900 dark:text-white">CPTPP</strong> (which four ASEAN nations have joined), the <strong className="text-slate-900 dark:text-white">Digital Economy Partnership Agreement (DEPA)</strong>, and most critically, the <strong className="text-slate-900 dark:text-white">ASEAN Digital Economy Framework Agreement (DEFA)</strong> currently under negotiation — which will bind all of Southeast Asia to new digital trade rules.
                </p>
                <p>
                  This benchmark scores all 11 ASEAN member states against every principle on a <strong className="text-slate-900 dark:text-white">0–100 compliance scale</strong>. Scores are based on enacted legislation, enforcement practice, and regulatory environment — not aspirational commitments. A score of <span className="text-emerald-600 dark:text-emerald-400 font-bold">80+</span> means the country is fully aligned; <span className="text-red-600 dark:text-red-400 font-bold">below 20</span> means severe non-compliance.
                </p>
              </div>
            </div>

            {/* Right: Key Facts */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-asean-blue/5 dark:bg-asean-blue/10 border border-asean-blue/20">
                <div className="text-[10px] uppercase tracking-wider font-bold text-asean-blue mb-1">Origin</div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Published by the USTR in April 2016. Extracted from the Trans-Pacific Partnership (TPP) negotiated across 12 Pacific Rim nations.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-asean-amber/5 dark:bg-asean-amber/10 border border-asean-amber/20">
                <div className="text-[10px] uppercase tracking-wider font-bold text-asean-amber mb-1">Scope</div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  24 principles across 5 clusters: Infrastructure, Data Flows, Technology Sovereignty, Consumer Trust, and Intellectual Property.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-asean-emerald/5 dark:bg-asean-emerald/10 border border-asean-emerald/20">
                <div className="text-[10px] uppercase tracking-wider font-bold text-asean-emerald mb-1">Why It Matters</div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  ASEAN&apos;s DEFA negotiations will shape digital rights for 680 million people. These 24 principles are the yardstick against which DEFA&apos;s ambition should be measured.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-asean-red/5 dark:bg-asean-red/10 border border-asean-red/20">
                <div className="text-[10px] uppercase tracking-wider font-bold text-asean-red mb-1">How to Read</div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Click any cell to see the country&apos;s detailed scorecard. Hover over any principle name to read the original TPP provision text. Use the cluster filters above the heatmap to focus on specific policy areas.
                </p>
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
