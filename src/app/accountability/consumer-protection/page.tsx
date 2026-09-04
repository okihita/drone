import type { Metadata } from "next";
import HeroBanner from "@/components/layout/HeroBanner";
import { getConsumerProtectionPolicies } from "@/lib/consumerData";
import ConsumerProtectionClientShell from "@/components/consumer-protection/ConsumerProtectionClientShell";

export const metadata: Metadata = {
  title: "Consumer Redress & Deceptive AI | Platform Accountability — DRONE",
  description: "Tracking platform intermediary liability, algorithmic audits, data breach notifications, spam regulation, and dark pattern restrictions across 11 ASEAN member states.",
};

export default function ConsumerProtectionPage() {
  const policies = getConsumerProtectionPolicies();
  const avgScore = Math.round(policies.reduce((s, p) => s + p.compositeScore, 0) / policies.length);

  return (
    <>
      <HeroBanner
        title="Consumer Redress & Deceptive AI"
        description={
          <>
            How well are ASEAN consumers protected against dominant digital platforms and super-apps? This dashboard scores each country on five dimensions of consumer safeguards — from platform accountability and algorithmic transparency to protections against manipulative dark patterns and dynamic pricing. <strong className="text-slate-800 dark:text-slate-200">Higher scores mean stronger safeguards</strong> against exploitative digital practices.
          </>
        }
        rightSlot={
          <div className="shrink-0 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="block font-sans text-sm text-slate-400 uppercase font-bold">Regional Average</span>
            <span className="font-bold text-2xl text-slate-900 dark:text-white">{avgScore}/100</span>
          </div>
        }
        concepts={[
          { title: "Intermediary Liability", desc: "Are platforms held responsible for deceptive practices, or do safe harbors protect harmful algorithms?" },
          { title: "Algorithmic Audits", desc: "Are platforms required to disclose how their ranking, recommendation, and surge pricing algorithms work?" },
          { title: "Breach Notification", desc: "Must companies alert users and regulators when personal data is compromised?" },
          { title: "Spam Regulation", desc: "Are unsolicited commercial messages regulated, and are consumers protected from manipulation?" },
          { title: "Dark Pattern Restrictions", desc: "Are deceptive design tricks — like hidden checkout fees or forced subscriptions — prohibited?" },
        ]}
        howToRead={
          <>
            Each country card shows a composite score (0–100) and five dimension breakdowns. Green scores (≥60) indicate strong protections; amber (35–59) indicate moderate frameworks; red (&lt;35) indicate weak or absent safeguards.
          </>
        }
      />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">Country Consumer Protection Profiles</h2>
          <ConsumerProtectionClientShell policies={policies} />
        </div>
      </main>
    </>
  );
}
