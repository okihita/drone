"use client";

import type { EncryptionEvent } from "@/types/encryption";
import { ENCRYPTION_EVENT_LABELS } from "@/types/encryption";
import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";
import { ASEAN_COLORS } from "@/lib/colors";

const FLAG_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL,
};

interface Props {
  events: EncryptionEvent[];
}

export default function ViolationTimeline({ events }: Props) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white mb-4">
          Technology Sovereignty Violations & Events
        </h2>
        <div className="space-y-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              {/* Severity indicator */}
              <div
                className="shrink-0 w-2 h-2 mt-1.5 rounded-full"
                style={{
                  backgroundColor: event.severityScore >= 70 ? ASEAN_COLORS.red
                    : event.severityScore >= 40 ? ASEAN_COLORS.amber
                    : ASEAN_COLORS.emerald,
                }}
                title={`Severity: ${event.severityScore}/100`}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {(() => { const FlagIcon = FLAG_COMPONENTS[event.countryCode]; return FlagIcon ? <FlagIcon className="w-4 h-3 rounded-xs shrink-0" /> : null; })()}
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {event.countryCode}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold text-white" style={{
                    backgroundColor: event.severityScore >= 70 ? ASEAN_COLORS.red
                      : event.severityScore >= 40 ? ASEAN_COLORS.amber
                      : ASEAN_COLORS.emerald,
                  }}>
                    {ENCRYPTION_EVENT_LABELS[event.eventType] ?? event.eventType}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    {new Date(event.eventDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{event.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">{event.summary}</p>
              </div>

              <div className="shrink-0 text-right">
                <span className={`text-xs font-mono font-bold ${
                  event.severityScore >= 70 ? "text-asean-red"
                  : event.severityScore >= 40 ? "text-asean-amber"
                  : "text-asean-emerald"
                }`}>
                  {event.severityScore}/100
                </span>
                <div className="text-[9px] text-slate-400 dark:text-slate-500">{event.countryName}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
