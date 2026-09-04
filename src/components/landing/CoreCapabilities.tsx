import React from "react";
import Link from "next/link";
import {
  Map,
  BarChart3,
  Activity,
  Database,
  ArrowRight,
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
    title: "Data & AI Governance",
    tagline: "Algorithmic Accountability & Privacy Telemetry",
    description: "Regional oversight tracking AI ethics guidelines, cross-border data transfer corridors, lawful intercept backdoors, and technology sovereignty across 11 nations.",
    href: "/governance",
    ctaText: "Explore Governance Hub",
    icon: Activity,
    stat: "4 Modules",
    statLabel: "Specialized Trackers",
    pills: ["AI Ethics", "Data Flows", "Encryption Rights", "Tech Sovereignty"],
  },
  {
    number: "02",
    title: "Digital Trade Agreements",
    tagline: "Treaty Pillar & Negotiation Monitoring",
    description: "Granular oversight of the 9 ASEAN DEFA negotiating chapters, multilateral agreements (IPEF, CPTPP), digital trade secrets, and cross-border QR payment pacts.",
    href: "/trade",
    ctaText: "Track Trade Pacts",
    icon: BarChart3,
    stat: "9 Chapters",
    statLabel: "DEFA Negotiation Pillars",
    pills: ["ASEAN DEFA", "Trade Treaties", "IP Monitor", "Digital Payments"],
  },
  {
    number: "03",
    title: "Platform Accountability",
    tagline: "Super-App Oversight & Digital Labor Watchdog",
    description: "Holding Southeast Asian platforms (Gojek, Grab, Tokopedia, Blibli, Sea) accountable for algorithmic dispatch, dynamic pricing, dark patterns, and civic rights.",
    href: "/accountability",
    ctaText: "Audit Tech Platforms",
    icon: Database,
    stat: "24 Principles",
    statLabel: "Evaluated & Benchmarked",
    pills: ["Platform Benchmark", "Consumer Redress", "Gig Labor", "Field Exposés"],
  },
  {
    number: "04",
    title: "Observatory & Verified Ledger",
    tagline: "Live Cartography & Primary Gazette Registry",
    description: "Interactive Natural Earth GeoJSON vector map of regional regime classifications, full-text verified decrees, and an encrypted intake portal for leaked texts.",
    href: "/observatory",
    ctaText: "Launch Regional Map",
    icon: Map,
    stat: "100% Verified",
    statLabel: "Primary Source Citations",
    pills: ["Vector Radar", "Statutory Ledger", "Knowledge Hub", "Encrypted Leaks"],
  },
];

export default function CoreCapabilities() {
  return (
    <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16">
      
      {/* Section Headline */}
      <div className="text-center max-w-2xl mx-auto space-y-3.5">
        <span className="inline-block rounded-full border border-slate-200/70 dark:border-slate-800/80 px-4 py-1 font-sans text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Core Capabilities
        </span>
        <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
          Engineered for Regional Digital Defense
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Bridging technical trade treaties, algorithmic policies, and civic freedoms.
        </p>
      </div>

      {/* Feature Blocks Spread Vertically */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        {FEATURES.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.number}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/70 bg-white p-7 sm:p-9 lg:p-10 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:border-slate-800/80 dark:bg-slate-950/70"
            >
              <div>
                {/* Header with Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80">
                      <Icon className="h-6 w-6 text-slate-700 dark:text-slate-200 group-hover:text-asean-yellow transition-colors" />
                    </div>
                    <div>
                      <span className="font-sans text-sm font-bold text-asean-yellow-dark dark:text-asean-yellow block">
                        MODULE {feat.number}
                      </span>
                      <span className="font-sans text-sm text-slate-500 dark:text-slate-400">
                        {feat.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-sans text-base font-extrabold text-slate-900 dark:text-white block">
                      {feat.stat}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-sans block font-medium">
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
                <div className="flex flex-wrap gap-2.5 pt-5 border-t border-slate-100 dark:border-slate-800/60 mb-6">
                  {feat.pills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-slate-800/80 px-3 py-1 text-sm font-semibold text-slate-600 dark:text-slate-300"
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                <Link
                  href={feat.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-sans text-sm font-bold text-white shadow-xs transition-all group-hover:bg-asean-yellow group-hover:text-slate-950 dark:bg-white/10 dark:hover:bg-asean-yellow dark:hover:text-slate-950"
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
