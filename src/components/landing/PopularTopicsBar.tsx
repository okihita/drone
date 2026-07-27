import React from "react";
import Link from "next/link";
import { POPULAR_TOPICS } from "@/lib/landingContent";

export default function PopularTopicsBar() {
  return (
    <section className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 py-2 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar text-xs">
        <span className="font-bold text-slate-600 dark:text-slate-400 uppercase text-[10px] tracking-wider whitespace-nowrap">
          POPULAR TOPICS:
        </span>
        <div className="flex items-center gap-2">
          {POPULAR_TOPICS.map((topic) => (
            <Link
              key={topic.label}
              href={topic.href}
              className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-asean-yellow hover:border-asean-yellow font-medium whitespace-nowrap transition-colors shadow-xs"
            >
              {topic.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
