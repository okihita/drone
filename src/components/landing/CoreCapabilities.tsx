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
  category: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeText: string;
  highlights: string[];
}

const CAPABILITIES: CapabilityCard[] = [
  {
    title: "Cartographic Observatory",
    category: "Geopolitical Intelligence",
    description:
      "Interactive 11-country vector observatory analyzing cross-border data flows, localization mandates, and civil society threat scores.",
    href: "/observatory",
    icon: Map,
    badgeText: "11 Member States",
    highlights: ["Data Flow Arcs", "Regime Classification", "Threat Sonar"],
  },
  {
    title: "Digital 2 Dozen Benchmark",
    category: "Trade Compliance Matrix",
    description:
      "Cross-comparative legal evaluation assessing 11 Southeast Asian member states across 24 USTR digital trade principles.",
    href: "/d2d/benchmark",
    icon: BarChart3,
    badgeText: "24 Principles",
    highlights: ["Tech Sovereignty", "Encryption Rights", "Consumer Trust"],
  },
  {
    title: "DEFA Ratification Tracker",
    category: "Treaty Monitoring",
    description:
      "Granular tracking of the 9 ASEAN Digital Economy Framework Agreement negotiating chapters and public consultation gaps.",
    href: "/defa/chapters",
    icon: Activity,
    badgeText: "9 Pillars",
    highlights: ["Cross-Border Data", "AI Governance", "Cybersecurity"],
  },
  {
    title: "Verified Policy Ledger",
    category: "Primary Source Registry",
    description:
      "Searchable repository of regional decrees, gazettes, ministerial regulations, and secure encrypted intake for leaked texts.",
    href: "/ledger",
    icon: Database,
    badgeText: "100% Verified",
    highlights: ["Official Gazettes", "Risk Ratings", "Encrypted Intake"],
  },
];

export default function CoreCapabilities() {
  return (
    <section className="px-4 py-12 sm:px-8 lg:px-12 bg-white/40 dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block rounded border border-asean-yellow/50 bg-asean-yellow/15 px-2 py-0.5 font-sans text-[10px] font-extrabold uppercase tracking-[0.2em] text-asean-yellow">
                Observatory Modules
              </span>
              <span className="text-xs text-slate-500 font-sans">Strategic Evaluation Frameworks</span>
            </div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Digital Rights Intelligence Tools
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans max-w-md">
            Bridging technical trade negotiations, data sovereignty decrees, and civic freedoms before regional bills become law.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <Link
                key={cap.title}
                href={cap.href}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-950/70"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10">
                      <Icon className="h-5 w-5 text-slate-700 dark:text-slate-200 transition-colors group-hover:text-asean-yellow" />
                    </div>
                    <span className="rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      {cap.badgeText}
                    </span>
                  </div>

                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    {cap.category}
                  </span>
                  <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed mb-4">
                    {cap.description}
                  </p>
                </div>

                <div>
                  {/* Highlight tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-white/5 mb-3">
                    {cap.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-slate-50 dark:bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs font-sans font-bold text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors">
                    <span>Explore Module</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
