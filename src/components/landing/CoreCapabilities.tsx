import React from "react";
import Link from "next/link";
import {
  Map,
  BarChart3,
  Activity,
  Database,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Globe2,
  Lock,
} from "lucide-react";

interface FeatureBlock {
  number: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
  ctaText: string;
  icon: React.ComponentType<{ className?: string }>;
  stat: string;
  statLabel: string;
  pills: string[];
}

const FEATURES: FeatureBlock[] = [
  {
    number: "01",
    title: "Cartographic Jurisdiction Observatory",
    tagline: "Live Vector Visualizer & Data Flow Corridors",
    description: "Map cross-border data transfer corridors, data localization mandates (Decree 53, PP 71), and civil society threat impact scores across 11 Southeast Asian nations.",
    href: "/observatory",
    ctaText: "Launch Regional Map",
    icon: Map,
    stat: "11 States",
    statLabel: "Member States Mapped",
    pills: ["Open Transfer", "Hybrid Regimes", "Strict Localization"],
  },
  {
    number: "02",
    title: "Digital 2 Dozen Compliance Matrix",
    tagline: "Comparative Legal Trade Evaluation",
    description: "Benchmarking 11 ASEAN member states against 24 USTR digital trade principles, technology sovereignty mandates, and encryption protection standards.",
    href: "/d2d/benchmark",
    ctaText: "Explore Benchmark Matrix",
    icon: BarChart3,
    stat: "24 Principles",
    statLabel: "Evaluated & Scored",
    pills: ["Tech Sovereignty", "Source Code Audit", "Encryption Rights"],
  },
  {
    number: "03",
    title: "DEFA Ratification Tracker",
    tagline: "Treaty Pillar & Chapter Monitoring",
    description: "Granular oversight of the 9 ASEAN Digital Economy Framework Agreement negotiating chapters, tracking civil society transparency gaps and big-tech lobbying influence.",
    href: "/defa/chapters",
    ctaText: "Track DEFA Negotiation",
    icon: Activity,
    stat: "9 Pillars",
    statLabel: "Negotiating Chapters",
    pills: ["Data Flows", "AI Ethics", "Payments & Cyber"],
  },
  {
    number: "04",
    title: "Verified Regulatory Policy Ledger",
    tagline: "100% Primary Source Legal Gazette Archive",
    description: "Full-text searchable registry of official regional decrees, gazettes, ministerial rules (Kominfo, IMDA, ETDA, DICT), with secure encrypted intake for leaked texts.",
    href: "/ledger",
    ctaText: "Search Policy Ledger",
    icon: Database,
    stat: "100% Verified",
    statLabel: "Official Primary Citations",
    pills: ["Official Gazettes", "Risk Matrix", "Encrypted Intake"],
  },
];

export default function CoreCapabilities() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Section Headline */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-block rounded-full border border-slate-200 dark:border-white/15 px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Core Capabilities
        </span>
        <h2 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Engineered for Regional Digital Defense
        </h2>
        <p className="font-sans text-sm text-slate-600 dark:text-slate-400">
          Bridging technical trade treaties, algorithmic policies, and civic freedoms.
        </p>
      </div>

      {/* Feature Blocks Spread Vertically */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {FEATURES.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.number}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-slate-950/70"
            >
              <div>
                {/* Header with Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10">
                      <Icon className="h-6 w-6 text-slate-700 dark:text-slate-200 group-hover:text-asean-yellow transition-colors" />
                    </div>
                    <div>
                      <span className="font-sans text-xs font-bold text-asean-yellow block">
                        MODULE {feat.number}
                      </span>
                      <span className="font-sans text-xs text-slate-400">
                        {feat.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-sans text-base font-extrabold text-slate-900 dark:text-white block">
                      {feat.stat}
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans block">
                      {feat.statLabel}
                    </span>
                  </div>
                </div>

                <h3 className="font-serif-editorial text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors mb-3">
                  {feat.title}
                </h3>

                <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {feat.description}
                </p>
              </div>

              <div>
                {/* Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-white/5 mb-5">
                  {feat.pills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300"
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                <Link
                  href={feat.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 font-sans text-xs sm:text-sm font-bold text-white shadow-xs transition-all group-hover:bg-asean-yellow group-hover:text-slate-950 dark:bg-white/10 dark:hover:bg-asean-yellow dark:hover:text-slate-950"
                >
                  <span>{feat.ctaText}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
