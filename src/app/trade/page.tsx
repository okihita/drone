import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Calendar, FileKey, CreditCard, ArrowRight, Activity, Globe, Shield } from "lucide-react";
import HeroBanner from "@/components/layout/HeroBanner";

export const metadata: Metadata = {
  title: "Digital Trade Agreements | DRONE",
  description:
    "Comprehensive tracking of ASEAN digital trade pacts, the ASEAN Digital Economy Framework Agreement (DEFA), multilateral treaties, intellectual property, and cybersecurity covenants.",
};

const PILLAR_MODULES = [
  {
    href: "/trade/defa",
    title: "ASEAN DEFA Ratification Tracker",
    desc: "Chapter-by-chapter negotiation tracker mapping all 11 ASEAN member states across the 9 official Digital Economy Framework Agreement chapters.",
    icon: FileText,
    accent: "border-asean-yellow/30 hover:border-asean-yellow/60",
    badge: "text-asean-yellow-dark dark:text-asean-yellow bg-asean-yellow/10",
  },
  {
    href: "/trade/negotiations",
    title: "Trade Deals & Treaties Timeline",
    desc: "Multilateral & bilateral digital trade negotiations across Southeast Asia, including DEFA, CPTPP, DEPA, IPEF, and bilateral digital economy pacts.",
    icon: Calendar,
    accent: "border-asean-sky/30 hover:border-asean-sky/60",
    badge: "text-asean-sky bg-asean-sky/10",
  },
  {
    href: "/trade/ip-monitor",
    title: "IP & Trade Secret Risk Monitor",
    desc: "Tracking trade secret protection, copyright safe harbors for platforms, patent disclosures, and AI training data seizure risks.",
    icon: FileKey,
    accent: "border-asean-blue/30 hover:border-asean-blue/60",
    badge: "text-asean-blue bg-asean-blue/10",
  },
  {
    href: "/trade/payments-cyber",
    title: "Payments & Cybersecurity Pacts",
    desc: "ASEAN Regional Payment Connectivity (RPC) QR code corridors, cross-border paperless trade, and reciprocal cybersecurity emergency cooperation.",
    icon: CreditCard,
    accent: "border-asean-amber/30 hover:border-asean-amber/60",
    badge: "text-asean-amber bg-asean-amber/10",
  },
];

export default function TradeHubPage() {
  return (
    <>
      <HeroBanner
        title="Digital Trade Agreements"
        description={
          <>
            Southeast Asia is negotiating the world&apos;s first region-wide digital trade treaty — the <strong className="text-slate-800 dark:text-slate-200">ASEAN DEFA</strong>. This suite monitors formal treaty negotiations, bilateral agreements (IPEF, CPTPP, DEPA), cross-border payments interoperability, and intellectual property mandates shaping commerce and digital human rights.
          </>
        }
        stats={[
          { icon: Activity, iconClass: "text-asean-yellow", label: "Flagship Treaty", value: "ASEAN DEFA" },
          { icon: Globe, iconClass: "text-asean-blue", label: "Negotiation Scope", value: "9 Chapters" },
          { icon: Shield, iconClass: "text-asean-emerald", label: "Target Ratification", value: "2027 In Force" },
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full font-sans">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-slate-900 dark:text-white">
            Treaty Observatories & Frameworks
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track binding commitments, ministerial milestones, trade chapters, and regional payment corridors.
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
