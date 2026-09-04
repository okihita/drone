import React from "react";
import Link from "next/link";
import { ArrowRight, AlertOctagon } from "lucide-react";
import { EXECUTIVE_INSIGHTS } from "@/lib/landingContent";

export default function ExecutiveInsightsCard() {
  const insights = EXECUTIVE_INSIGHTS;

  return (
    <section
      aria-labelledby="executive-insights-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
    >
      <div className="rounded-3xl border border-slate-200/70 bg-white p-7 sm:p-10 lg:p-12 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Column 1: Narrative & Drop-Cap */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 font-sans text-sm font-bold tracking-wider text-asean-yellow-dark dark:text-asean-yellow uppercase">
              <AlertOctagon className="w-4 h-4 text-asean-yellow" />
              <span>{insights.kebab}</span>
            </div>

            <h2
              id="executive-insights-heading"
              className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight"
            >
              {insights.heading}
            </h2>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans pt-1">
              <span className="float-left text-4xl sm:text-5xl font-serif-editorial font-extrabold pr-2.5 pt-0.5 text-asean-yellow leading-none select-none">
                {insights.bodyLeadChar}
              </span>
              {insights.bodyPrefix}
              <strong className="text-slate-900 dark:text-white font-bold">
                US$2.0 Trillion by 2030
              </strong>
              {insights.bodySuffix}
            </p>

            <div className="pt-2 font-sans">
              <Link
                href={insights.ctaHref}
                className="inline-flex items-center gap-2 text-sm font-bold text-asean-blue dark:text-asean-yellow hover:underline group"
              >
                <span>{insights.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Column 2: Primary Friction Points Box */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/70 p-6 sm:p-7 space-y-4 font-sans shadow-xs">
            <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              {insights.frictionHeading}
            </h3>

            <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
              {insights.frictionPoints.map((fp) => (
                <li key={fp.label} className="flex items-start gap-2.5">
                  <span className="text-asean-yellow font-extrabold text-base leading-none mt-0.5">
                    •
                  </span>
                  <div className="leading-relaxed">
                    <strong className="text-slate-900 dark:text-white font-semibold mr-1">
                      {fp.label}
                    </strong>
                    {fp.description}
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-slate-200/70 dark:border-slate-700/70 text-sm text-slate-500 dark:text-slate-400">
              Analysis verified by EngageMedia Research Team
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
