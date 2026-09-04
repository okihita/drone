"use client";

import { useState } from "react";
import type { NegotiationMilestone, NegotiationFramework } from "@/types/negotiation";
import { FRAMEWORK_LABELS } from "@/types/negotiation";
import { ASEAN_COLORS } from "@/lib/colors";
import { FLAG_COMPONENTS } from "@/lib/flags";
import { Clock, ExternalLink, Filter, CheckCircle2, AlertTriangle, Layers } from "lucide-react";

interface Props {
  milestones: NegotiationMilestone[];
}

export default function NegotiationTimeline({ milestones }: Props) {
  const [selectedFramework, setSelectedFramework] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");

  // Sort milestones chronologically (newest first for timeline)
  const sortedMilestones = [...milestones].sort(
    (a, b) => new Date(b.milestoneDate).getTime() - new Date(a.milestoneDate).getTime()
  );

  // Extract unique country codes (ASEAN codes present in data)
  const allCountriesSet = new Set<string>();
  milestones.forEach((m) => {
    m.countries.forEach((c) => {
      if (FLAG_COMPONENTS[c]) allCountriesSet.add(c);
    });
  });
  const availableCountries = Array.from(allCountriesSet).sort();

  // Filtered milestones
  const filteredMilestones = sortedMilestones.filter((m) => {
    const matchFramework = selectedFramework === "ALL" || m.framework === selectedFramework;
    const matchStatus = selectedStatus === "ALL" || m.status === selectedStatus;
    const matchCountry = selectedCountry === "ALL" || m.countries.includes(selectedCountry);
    return matchFramework && matchStatus && matchCountry;
  });

  const STATUS_NODE_COLORS: Record<string, string> = {
    COMPLETED: ASEAN_COLORS.emerald,
    IN_PROGRESS: ASEAN_COLORS.amber,
    UPCOMING: ASEAN_COLORS.blue,
    DELAYED: ASEAN_COLORS.red,
  };

  const    STATUS_BADGE_STYLES: Record<string, string> = {
    COMPLETED: "bg-asean-emerald/15 text-asean-emerald border border-asean-emerald/30",
    IN_PROGRESS: "bg-asean-amber/15 text-asean-amber border border-asean-amber/30",
    UPCOMING: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/70 dark:border-slate-700/80",
    DELAYED: "bg-asean-red/15 text-asean-red border border-asean-red/30",
  };

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-5 w-5 text-asean-blue shrink-0" />
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Digital Trade Negotiations &amp; Treaties Timeline
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans max-w-3xl leading-relaxed">
            Chronological vertical log of ASEAN DEFA negotiations, CPTPP accessions, DEPA expansion, and bilateral digital economy agreements affecting Southeast Asia.
          </p>
        </div>

        {/* Filter Bar Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-800/80 shadow-xs space-y-5">
          {/* Framework Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 font-sans flex items-center gap-1 mr-1">
              <Layers className="h-3.5 w-3.5 text-asean-blue" /> Framework:
            </span>
            <button
              onClick={() => setSelectedFramework("ALL")}
              className={`px-3.5 py-1.5 rounded-full text-sm font-sans font-bold transition-colors ${
                selectedFramework === "ALL"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              All Frameworks ({milestones.length})
            </button>
            {(["DEFA", "CPTPP", "DEPA", "IPEF", "BILATERAL"] as NegotiationFramework[]).map((fw) => {
              const count = milestones.filter((m) => m.framework === fw).length;
              return (
                <button
                  key={fw}
                  onClick={() => setSelectedFramework(fw)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-sans font-bold transition-colors flex items-center gap-1 ${
                    selectedFramework === fw
                      ? "bg-asean-blue text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {FRAMEWORK_LABELS[fw]} ({count})
                </button>
              );
            })}
          </div>

          {/* Status & Country Filters */}
          <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-200/70 dark:border-slate-800/80">
            {/* Status Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 font-sans flex items-center gap-1 mr-1">
                Status:
              </span>
              {["ALL", "COMPLETED", "IN_PROGRESS", "UPCOMING"].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 rounded-full text-sm font-sans font-bold transition-colors ${
                    selectedStatus === st
                      ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {st === "ALL" ? "All Statuses" : st.replace("_", " ")}
                </button>
              ))}
            </div>

            {/* Country Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 font-sans flex items-center gap-1 mr-1">
                <Filter className="h-3.5 w-3.5 text-asean-blue" /> Country:
              </span>
              <button
                onClick={() => setSelectedCountry("ALL")}
                className={`px-3 py-1 rounded-full text-sm font-sans font-bold transition-colors ${
                  selectedCountry === "ALL"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                All Nations
              </button>
              {availableCountries.map((code) => (
                <button
                  key={code}
                  onClick={() => setSelectedCountry(code)}
                  className={`px-2.5 py-1 rounded-full text-sm font-sans font-bold transition-colors ${
                    selectedCountry === code
                      ? "bg-asean-blue text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative pl-6 sm:pl-10 space-y-8 my-6 ml-3 sm:ml-5">
        {filteredMilestones.map((m, idx) => {
          const formattedDate = new Date(m.milestoneDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          const formattedEndDate = m.endDate
            ? new Date(m.endDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : null;

          const nodeColor = STATUS_NODE_COLORS[m.status] ?? ASEAN_COLORS.blue;
          const isFirst = idx === 0;
          const isLast = idx === filteredMilestones.length - 1;
          const isInProgress = m.status === "IN_PROGRESS";

          return (
            <div key={m.id} className="relative group">
              {/* Bounded Stem Line Segment */}
              {filteredMilestones.length > 1 && (
                <div
                  className={`absolute -left-[26px] sm:-left-[36px] w-0.5 bg-slate-200/80 dark:bg-slate-800/80 z-0 ${
                    isFirst
                      ? "top-7 -bottom-8"
                      : isLast
                      ? "top-0 h-7"
                      : "top-0 -bottom-8"
                  }`}
                />
              )}

              {/* Vertical Stem Marker Node */}
              <div
                className={`absolute -left-[33px] sm:-left-[43px] top-5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center z-10 transition-transform group-hover:scale-125 ${
                  isInProgress ? "animate-pulse" : ""
                }`}
                style={{ backgroundColor: nodeColor }}
                title={`Status: ${m.status}`}
              />

              {/* Milestone Event Card */}
              <div className="p-6 sm:p-7 rounded-2xl border border-slate-200/70 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Participating ASEAN Country Flags */}
                    <div className="flex items-center gap-1.5">
                      {m.countries.map((cCode) => {
                        const FlagIcon = FLAG_COMPONENTS[cCode];
                        return FlagIcon ? (
                          <span key={cCode} title={cCode}>
                            <FlagIcon className="w-5 h-3.5 rounded-[2px] shrink-0 shadow-xs" />
                          </span>
                        ) : null;
                      })}
                    </div>

                    {/* Framework Badge */}
                    <span className="font-sans text-sm font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/80">
                      {FRAMEWORK_LABELS[m.framework]}
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`text-sm px-2.5 py-0.5 rounded-lg font-sans font-bold shadow-xs flex items-center gap-1.5 ${
                        STATUS_BADGE_STYLES[m.status] ?? STATUS_BADGE_STYLES.UPCOMING
                      }`}
                    >
                      {m.status === "COMPLETED" && <CheckCircle2 className="h-3.5 w-3.5 text-asean-emerald shrink-0" />}
                      {m.status === "IN_PROGRESS" && <Clock className="h-3.5 w-3.5 text-asean-amber shrink-0" />}
                      {m.status === "DELAYED" && <AlertTriangle className="h-3.5 w-3.5 text-asean-red shrink-0" />}
                      {m.status.replace("_", " ")}
                    </span>
                  </div>

                  <span className="text-sm font-sans font-bold text-slate-400 dark:text-slate-500">
                    {formattedDate} {formattedEndDate ? `→ ${formattedEndDate}` : ""}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-asean-blue transition-colors font-serif-editorial">
                  {m.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  {m.description}
                </p>

                <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-sm font-sans">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Signatories: <strong className="text-slate-700 dark:text-slate-200">{m.countries.join(", ")}</strong>
                  </span>

                  {m.sourceUrl && (
                    <a
                      href={m.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-asean-blue dark:text-asean-sky hover:underline font-bold inline-flex items-center gap-1 text-sm ml-auto"
                    >
                      Official Document <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredMilestones.length === 0 && (
          <div className="p-8 sm:p-12 text-center border border-dashed border-slate-200/70 dark:border-slate-800/80 rounded-2xl bg-white/50 dark:bg-slate-900/50">
            <p className="text-base font-bold text-slate-700 dark:text-slate-300">
              No digital trade negotiation milestones found matching this filter.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Try selecting &quot;All Frameworks&quot; or &quot;All Statuses&quot; to view tracked negotiation milestones.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

