import type { Metadata } from "next";
import Link from "next/link";
import { Cpu, Globe, Lock, ArrowRight, Activity, Layers, Database } from "lucide-react";
import HeroBanner from "@/components/layout/HeroBanner";

export const metadata: Metadata = {
  title: "Data & AI Governance | DRONE",
  description:
    "Regional oversight on artificial intelligence ethics, algorithmic accountability, cross-border data transfer mechanisms, cryptographic security, and technological sovereignty.",
};

const PILLAR_MODULES = [
  {
    href: "/governance/ai-ethics",
    title: "AI Ethics & Algorithmic Accountability",
    desc: "National alignment with the ASEAN Guide on AI Ethics and Governance, automated decision audit mandates, and algorithmic harm telemetry.",
    icon: Cpu,
    accent: "border-asean-emerald/30 hover:border-asean-emerald/60",
    badge: "text-asean-emerald bg-asean-emerald/10",
  },
  {
    href: "/governance/data-flows",
    title: "Cross-Border Data Flows & Localization",
    desc: "Data Free Flow with Trust (DFFT) vs domestic data residency decrees, CBPR adoption, and ASEAN Model Contractual Clauses.",
    icon: Globe,
    accent: "border-asean-blue/30 hover:border-asean-blue/60",
    badge: "text-asean-blue bg-asean-blue/10",
  },
  {
    href: "/governance/encryption",
    title: "Encryption & Privacy Safeguards",
    desc: "Tracking lawful intercept overreach, government backdoor mandates, VPN restrictions, and end-to-end cryptographic protections.",
    icon: Lock,
    accent: "border-asean-red/30 hover:border-asean-red/60",
    badge: "text-asean-red bg-asean-red/10",
  },
  {
    href: "/governance/tech-sovereignty",
    title: "Tech Sovereignty & Compute",
    desc: "Evaluating forced technology transfer, source code non-disclosure, semiconductor compute supply chains, and open technological choice.",
    icon: Cpu,
    accent: "border-asean-amber/30 hover:border-asean-amber/60",
    badge: "text-asean-amber bg-asean-amber/10",
  },
];

export default function GovernanceHubPage() {
  return (
    <>
      <HeroBanner
        title="Data & AI Governance"
        description={
          <>
            Evaluating how Southeast Asian nations govern artificial intelligence, safeguard data privacy, and protect digital freedoms. Following an empirical, evidence-based approach, this observatory synthesizes national legislative decrees, binding safeguards, and technical sovereignty across the region.
          </>
        }
        stats={[
          { icon: Activity, iconClass: "text-asean-emerald", label: "Pillar Focus", value: "AI & Data Policy" },
          { icon: Layers, iconClass: "text-asean-blue", label: "Specialized Modules", value: "4 Observatories" },
          { icon: Database, iconClass: "text-asean-amber", label: "Member States", value: "11 Tracked" },
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full font-sans">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-slate-900 dark:text-white">
            Governance Observatories & Telemetry
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Explore focused analysis across artificial intelligence, data transfers, encryption, and technological sovereignty.
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
