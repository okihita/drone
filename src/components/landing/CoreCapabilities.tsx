import React from "react";
import Link from "next/link";
import {
  Map,
  BarChart3,
  Activity,
  Database,
  ArrowRight,
} from "lucide-react";

interface CapabilityCard {
  title: string;
  tagline: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  stat: string;
}

const CAPABILITIES: CapabilityCard[] = [
  {
    title: "Jurisdiction Observatory",
    tagline: "Live 11-country map of cross-border data flows & localization regimes.",
    href: "/observatory",
    icon: Map,
    stat: "11 States",
  },
  {
    title: "Digital 2 Dozen Benchmark",
    tagline: "Legal compliance scorecard across 24 USTR digital trade principles.",
    href: "/d2d/benchmark",
    icon: BarChart3,
    stat: "24 Metrics",
  },
  {
    title: "DEFA Treaty Tracker",
    tagline: "Monitoring 9 negotiating chapters & civil society consultation gaps.",
    href: "/defa/chapters",
    icon: Activity,
    stat: "9 Chapters",
  },
  {
    title: "Verified Policy Ledger",
    tagline: "Primary regulatory decrees, gazettes, and encrypted dossier intake.",
    href: "/ledger",
    icon: Database,
    stat: "100+ Acts",
  },
];

export default function CoreCapabilities() {
  return (
    <section className="px-4 py-8 sm:px-8 lg:px-12 bg-white/40 dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <Link
                key={cap.title}
                href={cap.href}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-950/70 dark:hover:border-white/20"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10">
                      <Icon className="h-4 w-4 text-slate-700 dark:text-slate-200 group-hover:text-asean-yellow transition-colors" />
                    </div>
                    <span className="rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 px-2 py-0.5 font-sans text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      {cap.stat}
                    </span>
                  </div>

                  <h3 className="font-serif-editorial text-base font-bold text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors mb-1">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-normal">
                    {cap.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-sans font-bold text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors pt-3">
                  <span>Explore</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
