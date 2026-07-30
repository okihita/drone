"use client";

import type { EncryptionEvent } from "@/types/encryption";
import { ENCRYPTION_EVENT_LABELS } from "@/types/encryption";
import { useState } from "react";
import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";

const FLAG_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL,
};

interface Props {
  events: EncryptionEvent[];
}

export default function EncryptionEventList({ events }: Props) {
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  const filtered = typeFilter === "ALL"
    ? events
    : events.filter((e) => e.eventType === typeFilter);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white mb-4">
          Encryption Regulation Events
        </h2>

        {/* Type Filter */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <button onClick={() => setTypeFilter("ALL")} className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${typeFilter === "ALL" ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
            All Types
          </button>
          {Object.entries(ENCRYPTION_EVENT_LABELS).map(([key, label]) => (
            <button key={key} onClick={() => setTypeFilter(key)} className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${typeFilter === key ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Event Cards */}
        <div className="space-y-2">
          {filtered.map((event) => (
            <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="shrink-0 w-2 h-2 mt-1.5 rounded-full" style={{ backgroundColor: event.severityScore >= 70 ? "#CC0000" : event.severityScore >= 40 ? "#CC8800" : "#008855" }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {(() => { const FlagIcon = FLAG_COMPONENTS[event.countryCode]; return FlagIcon ? <FlagIcon className="w-4 h-3 rounded-xs shrink-0" /> : null; })()}
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800">{event.countryCode}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold text-white" style={{ backgroundColor: event.severityScore >= 70 ? "#CC0000" : event.severityScore >= 40 ? "#CC8800" : "#008855" }}>
                    {ENCRYPTION_EVENT_LABELS[event.eventType]}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{new Date(event.eventDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{event.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{event.summary}</p>
                {event.sourceUrl && (
                  <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-asean-blue hover:underline mt-1 inline-block">Source ↗</a>
                )}
              </div>
              <div className="shrink-0 text-right">
                <span className={`text-xs font-mono font-bold ${event.severityScore >= 70 ? "text-red-600" : event.severityScore >= 40 ? "text-amber-600" : "text-emerald-600"}`}>
                  {event.severityScore}/100
                </span>
                <div className="text-[9px] text-slate-400">{event.countryName}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
