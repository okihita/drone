import type { Metadata } from "next";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/layout/HeroBanner";
import { fetchConsumerProtectionPolicies } from "@/services/consumer_protection";
import ConsumerProtectionClientShell from "@/components/consumer-protection/ConsumerProtectionClientShell";

export const metadata: Metadata = {
  title: "Consumer Protection Dashboard — ASEAN Digital Rights | D.R.O.N.E.",
  description: "Tracking platform liability, algorithmic audits, data breach notifications, spam regulation, and dark pattern restrictions across 11 ASEAN member states.",
};

export default function ConsumerProtectionPage() {
  const policies = fetchConsumerProtectionPolicies();
  const avgScore = Math.round(policies.reduce((s, p) => s + p.compositeScore, 0) / policies.length);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors">
      <HeroBanner
        title="Consumer Rights Matrix"
        description={
          <>
            How well are ASEAN consumers protected online? This dashboard scores each country on five dimensions of digital consumer rights — from platform accountability and data breach notifications to protections against deceptive design. <strong className="text-slate-800 dark:text-slate-200">Higher scores mean stronger safeguards</strong> against exploitative digital practices.
          </>
        }
        rightSlot={
          <div className="shrink-0 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="block font-sans text-[10px] text-slate-400 uppercase font-bold">Regional Average</span>
            <span className="font-bold text-2xl text-slate-900 dark:text-white">{avgScore}/100</span>
          </div>
        }
        concepts={[
          { title: "Intermediary Liability", desc: "Are platforms held responsible for user content, or do safe harbors protect free expression?" },
          { title: "Algorithmic Audits", desc: "Are companies required to disclose how their recommendation and ranking algorithms work?" },
          { title: "Breach Notification", desc: "Must companies alert users and regulators when their personal data is compromised?" },
          { title: "Spam Regulation", desc: "Are unsolicited commercial messages regulated, and are consumers protected from spam?" },
          { title: "Dark Pattern Restrictions", desc: "Are deceptive design tricks — like hidden fees or forced subscriptions — prohibited?" },
        ]}
        howToRead={
          <>
            Each country card shows a composite score (0–100) and five dimension breakdowns. Green scores (≥60) indicate strong protections; amber (35–59) indicate moderate frameworks; red (&lt;35) indicate weak or absent safeguards.
          </>
        }
      />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">Country Profiles</h2>
          <ConsumerProtectionClientShell policies={policies} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
