import { riskTone, toneHex, toneTextClass } from "@/lib/colors";
import { FLAG_COMPONENTS } from "@/lib/flags";

interface Props {
  summary: Record<string, { countryName: string; totalEvents: number; avgSeverity: number; worstEvent: string }>;
}

export default function EncryptionSummaryStats({ summary }: Props) {
  const entries = Object.entries(summary).sort((a, b) => b[1].avgSeverity - a[1].avgSeverity);

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {entries.map(([code, data]) => {
            const tone = riskTone(data.avgSeverity, 39, 69);
            return (
            <div key={code} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  {(() => { const FlagIcon = FLAG_COMPONENTS[code]; return FlagIcon ? <FlagIcon className="w-4 h-3 rounded-xs" /> : null; })()}
                  <span className="font-sans text-sm font-extrabold text-slate-400">{code}</span>
                </div>
                <span className={`font-sans text-sm font-extrabold ${toneTextClass(tone)}`}>
                  {data.avgSeverity}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{data.countryName}</div>
              <div className="text-sm text-slate-500 mt-1">{data.totalEvents} event{data.totalEvents !== 1 ? "s" : ""}</div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full rounded-full" style={{ width: `${data.avgSeverity}%`, backgroundColor: toneHex(tone) }} />
              </div>
            </div>
            );
          })}
          {entries.length === 0 && (
            <div className="col-span-full text-center py-8 text-sm text-slate-400">No encryption events tracked.</div>
          )}
        </div>
      </div>
    </section>
  );
}
