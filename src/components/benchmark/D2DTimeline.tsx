import React from "react";
import { ASEAN_COLORS } from "@/lib/colors";
import { GitCommit, Calendar, ChevronRight } from "lucide-react";

export interface TimelineMilestone {
  date: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  badgeClass: string;
}

export const D2D_TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    date: "Oct 2015",
    year: "2015",
    title: "TPP Chapter 14 Concluded",
    subtitle: "12 Pacific Rim Nations",
    description: "Negotiations wrap up in Atlanta, introducing binding rules on cross-border data & localization prohibition.",
    color: ASEAN_COLORS.blue,
    badgeClass: "bg-asean-blue/10 text-asean-blue dark:bg-asean-blue/20",
  },
  {
    date: "Apr 2016",
    year: "2016",
    title: "USTR Digital 2 Dozen",
    subtitle: "USTR Official Release",
    description: "USTR publishes the 24 core digital trade principles extracted from TPP Chapter 14 provisions.",
    color: ASEAN_COLORS.amber,
    badgeClass: "bg-asean-amber/10 text-asean-amber dark:bg-asean-amber/20",
  },
  {
    date: "Mar 2018",
    year: "2018",
    title: "CPTPP Formally Signed",
    subtitle: "11 Member States (4 ASEAN)",
    description: "Signed in Santiago after US exit; preserves Chapter 14 digital trade rules for SG, MY, VN & BN.",
    color: ASEAN_COLORS.emerald,
    badgeClass: "bg-asean-emerald/10 text-asean-emerald dark:bg-asean-emerald/20",
  },
  {
    date: "Jun 2020",
    year: "2020",
    title: "DEPA Signed",
    subtitle: "Singapore, Chile & NZ",
    description: "Pioneers modular digital trade rules (AI, digital identities, e-invoicing), expanding to S. Korea & China.",
    color: ASEAN_COLORS.sky,
    badgeClass: "bg-asean-sky/10 text-asean-sky dark:bg-asean-sky/20",
  },
  {
    date: "Sep 2023",
    year: "2023",
    title: "ASEAN DEFA Launch",
    subtitle: "10 ASEAN Member States",
    description: "Official launch of negotiations for the world's first regional digital economy agreement ($2T impact).",
    color: ASEAN_COLORS.yellow,
    badgeClass: "bg-asean-yellow/15 text-slate-800 dark:text-asean-yellow",
  },
  {
    date: "May–Nov 2026",
    year: "2026",
    title: "SEOM 57 & Summit Execution",
    subtitle: "Manila Scrubbing → 49th Summit",
    description: "Final legal scrubbing in Manila ahead of formal treaty signature at the 49th ASEAN Summit in Nov 2026.",
    color: ASEAN_COLORS.red,
    badgeClass: "bg-asean-red/10 text-asean-red dark:bg-asean-red/20",
  },
];

export default function D2DTimeline() {
  return (
    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-asean-blue shrink-0" />
          <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
            Evolution of Digital Trade Rules (2015 – 2026)
          </h3>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-sm text-slate-400 font-sans">
          Timeline of TPP, CPTPP, DEPA &amp; DEFA <ChevronRight className="h-3 w-3" />
        </span>
      </div>

      {/* Timeline track container */}
      <div className="relative overflow-x-auto no-scrollbar pb-2">
        {/* Desktop connecting line */}
        <div className="hidden md:block absolute top-7 left-6 right-6 h-0.5 bg-slate-200 dark:bg-slate-800 z-0" />

        <div className="min-w-[720px] md:min-w-0 grid grid-cols-6 gap-3 relative z-10">
          {D2D_TIMELINE_MILESTONES.map((m, idx) => {
            const isLatest = idx === D2D_TIMELINE_MILESTONES.length - 1;
            return (
              <div
                key={m.date}
                className="flex flex-col p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
              >
                {/* Node dot & date */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-3 h-3 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 ${
                        isLatest ? "animate-pulse" : ""
                      }`}
                      style={{ backgroundColor: m.color }}
                    />
                    <span className={`text-sm font-bold px-1.5 py-0.5 rounded ${m.badgeClass}`}>
                      {m.date}
                    </span>
                  </div>
                  <GitCommit className="h-3 w-3 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 transition-colors" />
                </div>

                {/* Milestone details */}
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-asean-blue transition-colors">
                  {m.title}
                </h4>
                <div className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-0.5 mb-1.5">
                  {m.subtitle}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-auto">
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
