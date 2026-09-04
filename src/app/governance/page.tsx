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
    accent: "hover:border-asean-emerald/60",
    badge: "text-asean-emerald bg-asean-emerald/10",
  },
  {
    href: "/governance/data-flows",
    title: "Cross-Border Data Flows & Localization",
    desc: "Data Free Flow with Trust (DFFT) vs domestic data residency decrees, CBPR adoption, and ASEAN Model Contractual Clauses.",
    icon: Globe,
    accent: "hover:border-asean-blue/60",
    badge: "text-asean-blue bg-asean-blue/10",
  },
  {
    href: "/governance/encryption",
    title: "Encryption & Privacy Safeguards",
    desc: "Tracking lawful intercept overreach, government backdoor mandates, VPN restrictions, and end-to-end cryptographic protections.",
    icon: Lock,
    accent: "hover:border-asean-red/60",
    badge: "text-asean-red bg-asean-red/10",
  },
  {
    href: "/governance/tech-sovereignty",
    title: "Tech Sovereignty & Compute",
    desc: "Evaluating forced technology transfer, source code non-disclosure, semiconductor compute supply chains, and open technological choice.",
    icon: Cpu,
    accent: "hover:border-asean-amber/60",
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
          { icon: Activity, iconClass: "text-slate-400", label: "Pillar Focus", value: "AI & Data Policy" },
          { icon: Layers, iconClass: "text-slate-400", label: "Specialized Modules", value: "4 Observatories" },
          { icon: Database, iconClass: "text-slate-400", label: "Member States", value: "11 Tracked" },
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full font-sans">
        <div className="space-y-10 sm:space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-slate-900 dark:text-white">
              Governance Observatories &amp; Telemetry
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Explore focused analysis across artificial intelligence, data transfers, encryption, and technological sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PILLAR_MODULES.map((mod) => (
              <Link
                key={mod.href}
                href={mod.href}
                className={`group flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 ${mod.accent} shadow-sm hover:shadow-md transition-all duration-200`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl ${mod.badge}`}>
                      <mod.icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-asean-yellow group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-xl font-bold font-serif-editorial text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-sm font-bold text-slate-500 dark:text-slate-400">
                  <span>View Detailed Dashboard</span>
                  <span className="text-asean-yellow group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
