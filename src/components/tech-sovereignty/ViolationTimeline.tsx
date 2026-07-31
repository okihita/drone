"use client";

import React, { useState } from "react";
import type { EncryptionEvent } from "@/types/encryption";
import { ENCRYPTION_EVENT_LABELS } from "@/types/encryption";
import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";
import { ASEAN_COLORS } from "@/lib/colors";
import { Clock, ExternalLink, Filter } from "lucide-react";

const FLAG_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL,
};

interface Props {
  events: EncryptionEvent[];
}

export default function ViolationTimeline({ events }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");

  // Sort events chronologically (newest first)
  const sortedEvents = [...events].sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

  // Filter by country if selected
  const filteredEvents = selectedCountry === "ALL" 
    ? sortedEvents 
    : sortedEvents.filter(e => e.countryCode === selectedCountry);

  // Extract unique country codes for filter pills
  const availableCountries = Array.from(new Set(events.map(e => e.countryCode))).sort();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-5 w-5 text-asean-blue shrink-0" />
              <h2 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
                Technology Sovereignty &amp; Interventions Timeline
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans max-w-3xl">
              Chronological vertical log of government tech interventions, source code disclosure mandates, VPN bans, and encryption backdoors across ASEAN.
            </p>
          </div>

          {/* Filter Pills Bar */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans flex items-center gap-1 mr-1">
              <Filter className="h-3.5 w-3.5 text-asean-blue" /> Filter by Country:
            </span>
            <button
              onClick={() => setSelectedCountry("ALL")}
              className={`px-3 py-1 rounded-full text-[11px] font-sans font-bold transition-colors ${
                selectedCountry === "ALL"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              All Nations ({events.length})
            </button>
            {availableCountries.map((code) => {
              const count = events.filter(e => e.countryCode === code).length;
              return (
                <button
                  key={code}
                  onClick={() => setSelectedCountry(code)}
                  className={`px-3 py-1 rounded-full text-[11px] font-sans font-bold transition-colors flex items-center gap-1 ${
                    selectedCountry === code
                      ? "bg-asean-blue text-white shadow-xs"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {code} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-6 my-6 ml-3 sm:ml-4">
          {filteredEvents.map((event) => {
            const FlagIcon = FLAG_COMPONENTS[event.countryCode];
            const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            const isHighSeverity = event.severityScore >= 70;
            const nodeColor = isHighSeverity
              ? ASEAN_COLORS.red
              : event.severityScore >= 40
              ? ASEAN_COLORS.amber
              : ASEAN_COLORS.emerald;

            return (
              <div key={event.id} className="relative group">
                {/* Vertical Stem Marker Node (Exactly centered on border-l-2) */}
                <div
                  className={`absolute -left-[33px] sm:-left-[41px] top-4 w-4 h-4 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center transition-transform group-hover:scale-125 ${
                    isHighSeverity ? "animate-pulse" : ""
                  }`}
                  style={{ backgroundColor: nodeColor }}
                  title={`Severity Score: ${event.severityScore}/100`}
                />

                {/* Event Card */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {FlagIcon && <FlagIcon className="w-4 h-3 rounded-xs shrink-0 shadow-xs" />}
                      <span className="font-sans text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {event.countryName} ({event.countryCode})
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded font-sans font-bold text-white shadow-xs"
                        style={{ backgroundColor: nodeColor }}
                      >
                        {ENCRYPTION_EVENT_LABELS[event.eventType] ?? event.eventType}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-sans font-bold text-slate-400 dark:text-slate-500">
                        {formattedDate}
                      </span>
                      <span
                        className={`text-xs font-sans font-extrabold ${
                          isHighSeverity
                            ? "text-asean-red"
                            : event.severityScore >= 40
                            ? "text-asean-amber"
                            : "text-asean-emerald"
                        }`}
                      >
                        {event.severityScore}/100 Risk
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-asean-blue transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 font-sans leading-relaxed">
                    {event.summary}
                  </p>

                  {event.sourceUrl && (
                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-sans">
                      <span className="text-slate-400 text-[10px]">Verified Regulatory Telemetry</span>
                      <a
                        href={event.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-asean-blue dark:text-asean-sky hover:underline font-bold inline-flex items-center gap-1"
                      >
                        Official Document <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {filteredEvents.length === 0 && (
            <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-white/50 dark:bg-slate-900/50">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No technology sovereignty events found for this filter.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Select &quot;All Nations&quot; to view the full timeline.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
