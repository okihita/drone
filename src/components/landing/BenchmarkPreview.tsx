import { listAllBenchmarks } from "@/services/benchmark";
import { BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BenchmarkPreview() {
  const summaries = listAllBenchmarks();
  const sorted = [...summaries].sort((a, b) => b.overallScore - a.overallScore);
  const top3 = sorted.slice(0, 3);
  const bottom3 = sorted.slice(-3).reverse();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-asean-blue" />
            <div>
              <h2 className="font-serif-editorial text-xl font-extrabold text-slate-900 dark:text-white">
                Digital 2 Dozen Benchmark
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                24 USTR digital trade principles × 11 ASEAN states
              </p>
            </div>
          </div>
          <Link
            href="/d2d/benchmark"
            className="flex items-center gap-1 text-xs font-sans font-bold text-asean-blue hover:text-asean-blue/80 transition-colors"
          >
            Full Benchmark <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {top3.map((s, i) => (
            <div key={s.countryCode} className="p-3 rounded-lg border border-asean-emerald/30 dark:border-asean-emerald/40 bg-asean-emerald/10 dark:bg-asean-emerald/20">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] font-extrabold text-slate-400">#{i + 1}</span>
                  <span className="ml-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">{s.countryName}</span>
                </div>
                <span className="font-mono text-sm font-extrabold text-asean-emerald">{s.overallScore}/100</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full rounded-full bg-asean-emerald" style={{ width: `${s.overallScore}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {bottom3.map((s, i) => (
            <div key={s.countryCode} className="p-3 rounded-lg border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] font-extrabold text-slate-400">#{11 - i}</span>
                  <span className="ml-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">{s.countryName}</span>
                </div>
                <span className="font-mono text-sm font-extrabold text-red-600 dark:text-red-400">{s.overallScore}/100</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full rounded-full bg-red-600 dark:bg-red-500" style={{ width: `${s.overallScore}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
