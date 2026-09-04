import { Suspense } from "react";
import type { Metadata } from "next";
import BenchmarkClientShell from "@/components/benchmark/BenchmarkClientShell";
import D2DTimeline from "@/components/benchmark/D2DTimeline";
import HeroBanner from "@/components/layout/HeroBanner";
import { getAllBenchmarkSummaries } from "@/lib/benchmarkData";
import { DIGITAL_2_DOZEN_PRINCIPLES } from "@/lib/digital2dozen";
import { Globe, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Platform AI & Rights Benchmark | Platform Accountability — DRONE",
  description: "Comprehensive compliance heatmap mapping all 24 USTR Digital 2 Dozen principles against 11 ASEAN member states and major digital platforms.",
};

export default function PlatformBenchmarkPage() {
  const allSummaries = getAllBenchmarkSummaries();
  const principles = DIGITAL_2_DOZEN_PRINCIPLES;

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
    <>
      <HeroBanner
        title="Platform AI & Rights Benchmark"
        stats={[
          { icon: Globe, iconClass: "text-asean-emerald", label: "ASEAN Avg", value: `${globalAverage}/100` },
          { icon: Shield, iconClass: "text-asean-blue", label: "Highest", value: `${highestCountry.countryName} (${highestCountry.overallScore})` },
          { icon: Shield, iconClass: "text-asean-red", label: "Lowest", value: `${lowestCountry.countryName} (${lowestCountry.overallScore})` },
        ]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-sans space-y-3">
            <p>
              The <strong className="text-slate-900 dark:text-white">Digital 2 Dozen Benchmark</strong> evaluates digital trade and platform compliance against 24 baseline digital rights principles. Derived from foundational international trade pacts and civil society covenants, these principles assess intermediary liability, algorithmic transparency, encryption protection, and data governance.
            </p>
            <p>
              This benchmark scores all 11 ASEAN member states on a <strong className="text-slate-900 dark:text-white">0–100 compliance scale</strong> based on enacted legislation and corporate enforcement practice — not aspirational promises. <span className="text-asean-emerald font-bold">80+</span> signals full alignment; <span className="text-asean-red font-bold">below 20</span> signals severe non-compliance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-asean-blue/5 dark:bg-asean-blue/10 border border-asean-blue/20">
              <div className="text-sm uppercase tracking-wider font-bold text-asean-blue mb-0.5">Origin</div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">International Trade &amp; Rights Standards</p>
            </div>
            <div className="p-3 rounded-xl bg-asean-amber/5 dark:bg-asean-amber/10 border border-asean-amber/20">
              <div className="text-sm uppercase tracking-wider font-bold text-asean-amber mb-0.5">Scope</div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">24 principles · 5 clusters · 11 countries</p>
            </div>
            <div className="p-3 rounded-xl bg-asean-emerald/5 dark:bg-asean-emerald/10 border border-asean-emerald/20">
              <div className="text-sm uppercase tracking-wider font-bold text-asean-emerald mb-0.5">Why</div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">Evaluating state &amp; platform power over 680M users.</p>
            </div>
            <div className="p-3 rounded-xl bg-asean-red/5 dark:bg-asean-red/10 border border-asean-red/20">
              <div className="text-sm uppercase tracking-wider font-bold text-asean-red mb-0.5">How</div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">Click cells for detail · Filter by cluster</p>
            </div>
          </div>
        </div>

        <D2DTimeline />

        <p className="text-sm text-slate-400 dark:text-slate-500 mt-6 max-w-3xl">
          <strong className="text-slate-500 dark:text-slate-400">How to read</strong>: Click any country on the map to see its detailed scores. Hover over heatmap cells for statutory citations. Green cells (80+) indicate full compliance; red cells (&lt;20) indicate severe non-compliance.
        </p>

        <div className="mt-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm font-sans text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-asean-emerald animate-pulse motion-reduce:animate-none shrink-0" />
            <span><strong>Data Integrity Audit</strong>: Verified against OECD DSTRI, Freedom House, and national statutory instruments across 264 data points.</span>
          </div>
          <span className="text-sm font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">100% Empirically Cited</span>
        </div>
      </HeroBanner>

      <Suspense fallback={null}>
        <BenchmarkClientShell summaries={allSummaries} principles={principles} />
      </Suspense>
    </>
  );
}
