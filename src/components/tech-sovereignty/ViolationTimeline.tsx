"use client";

import { useState } from "react";
import type { EncryptionEvent } from "@/types/encryption";
import { ENCRYPTION_EVENT_LABELS } from "@/types/encryption";
import { riskTone, toneHex, toneTextClass } from "@/lib/colors";
import { FLAG_COMPONENTS } from "@/lib/flags";
import { Clock, ExternalLink, Filter } from "lucide-react";

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
    <section className="w-full space-y-8">
      <div>
        <div className="flex items-center gap-2.5 mb-2">
          <Clock className="h-5 w-5 text-asean-blue shrink-0" />
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Technology Sovereignty &amp; Interventions Timeline
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans max-w-3xl leading-relaxed">
          Chronological vertical log of government tech interventions, source code disclosure mandates, VPN bans, and encryption backdoors across ASEAN.
        </p>
      </div>

      {/* Filter Pills Bar */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400 font-sans flex items-center gap-1.5 mr-1">
            <Filter className="h-4 w-4 text-asean-blue" /> Filter by Country:
          </span>
          <button
            onClick={() => setSelectedCountry("ALL")}
            className={`px-3.5 py-1.5 rounded-full text-sm font-sans font-bold transition-all ${
              selectedCountry === "ALL"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            All Nations ({events.length})
          </button>
          {availableCountries.map((code) => {
            const count = events.filter((e) => e.countryCode === code).length;
            return (
              <button
                key={code}
                onClick={() => setSelectedCountry(code)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-sans font-bold transition-all flex items-center gap-1.5 ${
                  selectedCountry === code
                    ? "bg-asean-blue text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {code} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative pl-6 sm:pl-8 space-y-8 sm:space-y-10 my-8 ml-3 sm:ml-4">
        {filteredEvents.map((event, idx) => {
          const FlagIcon = FLAG_COMPONENTS[event.countryCode];
          const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          const tone = riskTone(event.severityScore, 39, 69);
          const isHighSeverity = tone === "danger";
          const nodeColor = toneHex(tone);
          const severityTextClass = toneTextClass(tone);

          const isFirst = idx === 0;
          const isLast = idx === filteredEvents.length - 1;

          return (
            <div key={event.id} className="relative group">
              {/* Bounded Stem Line Segment (Starts at first dot, terminates at last dot) */}
              {filteredEvents.length > 1 && (
                <div
                  className={`absolute -left-[26px] sm:-left-[34px] w-0.5 bg-slate-200/70 dark:bg-slate-800/80 z-0 ${
                    isFirst
                      ? "top-6 -bottom-6"
                      : isLast
                      ? "top-0 h-6"
                      : "top-0 -bottom-6"
                  }`}
                />
              )}

              {/* Vertical Stem Marker Node (Exactly centered on line) */}
              <div
                className={`absolute -left-[33px] sm:-left-[41px] top-4 w-4 h-4 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center z-10 transition-transform group-hover:scale-125 ${
                  isHighSeverity ? "animate-pulse" : ""
                }`}
                style={{ backgroundColor: nodeColor }}
                title={`Severity Score: ${event.severityScore}/100`}
              />

              {/* Event Card */}
              <div className="p-6 sm:p-7 rounded-2xl border border-slate-200/70 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {FlagIcon && <FlagIcon className="w-4 h-3 rounded-[2px] shrink-0 shadow-xs" />}
                    <span className="font-sans text-sm font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {event.countryName} ({event.countryCode})
                    </span>
                    <span
                      className={`text-sm px-2.5 py-0.5 rounded-full font-sans font-bold shadow-xs ${
                        event.eventType === "CAPACITY_BUILDING"
                          ? "bg-asean-sky/15 text-asean-sky border border-asean-sky/30"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/80"
                      }`}
                    >
                      {ENCRYPTION_EVENT_LABELS[event.eventType] ?? event.eventType}
                    </span>
                  </div>

                  <span className="text-sm font-sans font-bold text-slate-400 dark:text-slate-500">
                    {formattedDate}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-serif-editorial text-slate-900 dark:text-white leading-snug group-hover:text-asean-blue transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                  {event.summary}
                </p>

                <div className="pt-3.5 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-sm font-sans">
                  {/* Visual Risk Meter */}
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Risk Meter</span>
                    <div className="w-24 sm:w-32 h-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 overflow-hidden relative shrink-0">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${event.severityScore}%`,
                          backgroundColor: nodeColor,
                        }}
                      />
                    </div>
                    <span
                      className={`text-sm font-sans font-extrabold ${severityTextClass}`}
                    >
                      {event.severityScore}/100
                    </span>
                  </div>

                  {event.sourceUrl && (
                    <a
                      href={event.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-asean-blue dark:text-asean-sky hover:underline font-bold inline-flex items-center gap-1.5 text-sm ml-auto"
                    >
                      Official Document <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="p-10 text-center border border-dashed border-slate-200/70 dark:border-slate-800/80 rounded-2xl bg-white/50 dark:bg-slate-900/50">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No technology sovereignty events found for this filter.
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Select &quot;All Nations&quot; to view the full timeline.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
