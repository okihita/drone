import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, ShieldCheck, Shield, BookOpen, ArrowRight, Activity, Users, Building2 } from "lucide-react";
import HeroBanner from "@/components/layout/HeroBanner";

export const metadata: Metadata = {
  title: "Platform Accountability | DRONE",
  description:
    "Holding Southeast Asian digital platforms and super-apps (Gojek, Grab, Tokopedia, Blibli, Sea) accountable for algorithmic transparency, consumer rights, gig labor algorithms, and public interest AI use.",
};

const PILLAR_MODULES = [
  {
    href: "/accountability/benchmark",
    title: "Platform AI & Rights Benchmark",
    desc: "24-principle digital rights scorecard evaluating state regulations and corporate platform compliance across privacy, encryption, and open standards.",
    icon: BarChart3,
    accent: "border-asean-blue/30 hover:border-asean-blue/60",
    badge: "text-asean-blue bg-asean-blue/10",
  },
  {
    href: "/accountability/consumer-protection",
    title: "Consumer Redress & Deceptive AI",
    desc: "Scrutinizing dynamic surge pricing, dark patterns, opaque recommender algorithms, platform intermediary liability, and consumer dispute redress.",
    icon: ShieldCheck,
    accent: "border-asean-emerald/30 hover:border-asean-emerald/60",
    badge: "text-asean-emerald bg-asean-emerald/10",
  },
  {
    href: "/accountability/civil-society",
    title: "Digital Labor & Platform Watchdog",
    desc: "Monitoring algorithmic dispatch of gig workers, driver evaluation metrics, surveillance overreach, and civil society pressure on Big Tech.",
    icon: Shield,
    accent: "border-asean-red/30 hover:border-asean-red/60",
    badge: "text-asean-red bg-asean-red/10",
  },
  {
    href: "/accountability/investigations",
    title: "Platform Investigations & Field Exposés",
    desc: "Independent, source-verified investigative journalism examining platform monopoly power, corporate lobbying, and algorithmic impacts.",
    icon: BookOpen,
    accent: "border-asean-yellow/30 hover:border-asean-yellow/60",
    badge: "text-asean-yellow-dark dark:text-asean-yellow bg-asean-yellow/10",
  },
];

const TARGET_PLATFORMS = [
  { name: "Grab", role: "Ride-hailing, Logistics & FinTech", focus: "Dispatch & Surge Algorithms" },
  { name: "Gojek / GoTo", role: "On-Demand Super-App", focus: "Labor Routing & Scoring" },
  { name: "Tokopedia", role: "E-Commerce Intermediary", focus: "Search Rankings & Dark Patterns" },
  { name: "Blibli", role: "Retail & Marketplace", focus: "Consumer Data Retention" },
  { name: "Shopee / Sea", role: "Cross-Border Marketplace & Payments", focus: "Dynamic Pricing & Seller Lock-In" },
];

export default function AccountabilityHubPage() {
  return (
    <>
      <HeroBanner
        title="Platform Accountability"
        description={
          <>
            Southeast Asia&apos;s digital economy is dominated by regional super-apps and digital intermediaries. This observatory provides civil society oversight to hold companies like <strong className="text-slate-800 dark:text-slate-200">Gojek, Grab, Tokopedia, Blibli, and Shopee</strong> accountable for their automated decision-making, algorithmic labor dispatch, data harvesting, and consumer rights practices.
          </>
        }
        stats={[
          { icon: Building2, iconClass: "text-asean-blue", label: "Oversight Focus", value: "Super-Apps & Platforms" },
          { icon: Users, iconClass: "text-asean-emerald", label: "Public Interest", value: "Gig Labor & Consumers" },
          { icon: Activity, iconClass: "text-asean-yellow", label: "Telemetry", value: "Algorithmic Audits" },
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full font-sans">
        {/* Monitored Ecosystem Callout */}
        <section className="mb-12 p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-asean-blue">Corporate AI Telemetry</span>
              <h2 className="text-lg sm:text-xl font-bold font-serif-editorial text-slate-900 dark:text-white mt-0.5">
                Regional Platform Accountability Framework
              </h2>
            </div>
            <span className="inline-flex items-center text-sm font-semibold px-3 py-1 rounded-full bg-asean-amber/15 text-asean-amber border border-asean-amber/30 w-fit">
              Active Civil Society Pressure Track
            </span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 max-w-3xl leading-relaxed">
            As tech conglomerates integrate proprietary machine learning models into dispatching, algorithmic credit scoring, and automated penalties, DRONE monitors compliance against international human rights covenants and the ASEAN Guide on AI Ethics.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {TARGET_PLATFORMS.map((platform) => (
              <div
                key={platform.name}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs"
              >
                <div className="font-bold text-sm text-slate-900 dark:text-white">{platform.name}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{platform.role}</div>
                <div className="text-sm font-semibold text-asean-blue mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                  {platform.focus}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pillar Observatories Grid */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-slate-900 dark:text-white">
            Accountability Observatories & Evidence
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access empirical scorecards, consumer protection metrics, civil society telemetry, and investigative reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLAR_MODULES.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className={`group flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900/60 border ${mod.accent} shadow-xs hover:shadow-md transition-all duration-200`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${mod.badge}`}>
                    <mod.icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-asean-yellow group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors">
                  {mod.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {mod.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-sm font-semibold text-slate-500 dark:text-slate-400">
                <span>View Detailed Dashboard</span>
                <span className="text-asean-yellow group-hover:underline">Explore &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
