import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INTELLIGENCE_MODULES } from "@/lib/landingContent";

export default function IntelligenceSuite() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
      <div className="mb-8">
        <span className="text-xs font-sans uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold block mb-1">
          SPECIALIZED INTELLIGENCE TOOLS
        </span>
        <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Observatory Modules &amp; Repositories
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
        {INTELLIGENCE_MODULES.map((mod) => (
          <Link
            key={mod.number}
            href={mod.href}
            className={`group p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${mod.hoverBorder} transition-all flex flex-col justify-between shadow-sm dark:shadow-none`}
          >
            <div className="space-y-3">
              <span
                className={`font-serif-editorial text-3xl font-extrabold text-slate-300 dark:text-slate-700 ${mod.hoverText} transition-colors`}
              >
                {mod.number}
              </span>
              <h3
                className={`font-serif-editorial font-bold text-slate-900 dark:text-white text-lg ${mod.hoverText} transition-colors`}
              >
                {mod.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-sans">
                {mod.description}
              </p>
            </div>
            <div className={`pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-sans text-${mod.accentColor} font-semibold`}>
              <span>{mod.ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
