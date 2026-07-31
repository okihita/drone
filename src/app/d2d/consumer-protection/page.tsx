import type { Metadata } from "next";
import Footer from "@/components/Footer";
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
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-6 sm:py-9 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Consumer Rights Matrix
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-sans leading-relaxed">
                How well are ASEAN consumers protected online? This dashboard scores each country on five dimensions of digital consumer rights — from platform accountability and data breach notifications to protections against deceptive design. <strong className="text-slate-800 dark:text-slate-200">Higher scores mean stronger safeguards</strong> against exploitative digital practices.
              </p>
            </div>

            <div className="shrink-0 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="block font-sans text-[10px] text-slate-400 uppercase font-bold">Regional Average</span>
              <span className="font-bold text-2xl text-slate-900 dark:text-white">{avgScore}/100</span>
            </div>
          </div>

          {/* Dimension concept cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
            {[
              { label: "Intermediary Liability", desc: "Are platforms held responsible for user content, or do safe harbors protect free expression?" },
              { label: "Algorithmic Audits", desc: "Are companies required to disclose how their recommendation and ranking algorithms work?" },
              { label: "Breach Notification", desc: "Must companies alert users and regulators when their personal data is compromised?" },
              { label: "Spam Regulation", desc: "Are unsolicited commercial messages regulated, and are consumers protected from spam?" },
              { label: "Dark Pattern Restrictions", desc: "Are deceptive design tricks — like hidden fees or forced subscriptions — prohibited?" },
            ].map((item) => (
              <div key={item.label} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-400 leading-snug">
                <strong className="block text-slate-800 dark:text-slate-200 font-bold mb-0.5">{item.label}</strong>
                {item.desc}
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-3xl">
            <strong className="text-slate-500 dark:text-slate-400">How to read</strong>: Each country card shows a composite score (0–100) and five dimension breakdowns. Green scores (≥60) indicate strong protections; amber (35–59) indicate moderate frameworks; red (&lt;35) indicate weak or absent safeguards.
          </p>
        </div>
      </section>

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
