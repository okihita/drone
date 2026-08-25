import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Database, Map } from "lucide-react";

export default function MissionCTA() {
  return (
    <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-8 sm:p-14 text-center shadow-lg relative overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-asean-yellow/10 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-asean-yellow/40 bg-asean-yellow/10 px-3.5 py-1 text-xs font-bold text-asean-yellow font-sans">
            <ShieldCheck className="w-4 h-4" />
            Independent Civil Society Observatory
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Safeguarding Digital Rights Across Southeast Asia
          </h2>

          <p className="font-sans text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Equipping regional researchers, frontline advocates, and independent journalists with actionable data before bills become law.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-sans">
            <Link
              href="/observatory"
              className="inline-flex items-center gap-2 rounded-xl bg-asean-yellow px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-asean-yellow-hover hover:scale-105"
            >
              <Map className="h-4 w-4" />
              <span>Explore Regional Map</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/intake"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-white/15 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Database className="h-4 w-4 text-asean-red" />
              <span>Submit Leaked Dossier</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
