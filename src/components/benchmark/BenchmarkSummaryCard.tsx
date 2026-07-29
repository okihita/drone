import type { BenchmarkCountrySummary } from "@/types/benchmark";

interface Props {
  summaries: BenchmarkCountrySummary[];
}

export default function BenchmarkSummaryCard({ summaries }: Props) {
  const sorted = [...summaries].sort((a, b) => b.overallScore - a.overallScore);

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-3">
          {sorted.map((s) => {
            let rankColor: string;
            if (s.overallScore >= 65) rankColor = "border-emerald-400 dark:border-emerald-500";
            else if (s.overallScore >= 40) rankColor = "border-amber-400 dark:border-amber-500";
            else rankColor = "border-red-400 dark:border-red-500";

            return (
              <div
                key={s.countryCode}
                className={`p-3 rounded-xl border-2 ${rankColor} bg-white dark:bg-slate-900 shadow-sm`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-extrabold text-slate-400 dark:text-slate-500">{s.countryCode}</span>
                  <span className={`font-mono text-sm font-extrabold ${
                    s.overallScore >= 65 ? "text-emerald-600 dark:text-emerald-400"
                    : s.overallScore >= 40 ? "text-amber-600 dark:text-amber-400"
                    : "text-red-600 dark:text-red-400"
                  }`}>
                    {s.overallScore}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{s.countryName}</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.overallScore}%`,
                      backgroundColor: s.overallScore >= 65 ? "#059669"
                        : s.overallScore >= 40 ? "#d97706"
                        : "#dc2626",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
