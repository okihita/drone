import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { fetchConsumerProtectionPolicies } from "@/services/consumer_protection";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Consumer Protection Dashboard — ASEAN Digital Rights | D.R.O.N.E.",
  description: "Tracking platform liability, algorithmic audits, data breach notifications, spam regulation, and dark pattern restrictions across 11 ASEAN member states.",
};

export default function ConsumerProtectionPage() {
  const policies = fetchConsumerProtectionPolicies();
  const avgScore = Math.round(policies.reduce((s, p) => s + p.compositeScore, 0) / policies.length);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors">
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-asean-emerald font-bold mb-2">
                <Shield className="h-4 w-4 text-asean-emerald animate-pulse" />
                <span>Digital 2 Dozen · Principle 10</span>
                <span>·</span>
                <span className="text-slate-500 font-mono">Consumer Protections</span>
              </div>
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Consumer Protection Dashboard
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-sans">
                Tracking platform intermediary liability, algorithmic transparency audits, data breach notification mandates, spam regulation, and dark pattern restrictions across Southeast Asia.
              </p>
            </div>
            <div className="shrink-0 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Regional Average</span>
              <span className="font-bold text-2xl text-slate-900 dark:text-white">{avgScore}/100</span>
            </div>
          </div>
        </div>
      </section>
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">Country Profiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {policies.map((policy) => (
              <div key={policy.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-extrabold">{policy.countryCode}</span>
                    <span className="ml-2 text-sm font-bold text-slate-800 dark:text-slate-200">{policy.countryName}</span>
                  </div>
                  <span className={`text-sm font-mono font-extrabold ${policy.compositeScore >= 60 ? "text-emerald-600" : policy.compositeScore >= 35 ? "text-amber-600" : "text-red-600"}`}>
                    {policy.compositeScore}/100
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 mb-3">
                  <div className="h-full rounded-full" style={{ width: `${policy.compositeScore}%`, backgroundColor: policy.compositeScore >= 60 ? "#059669" : policy.compositeScore >= 35 ? "#d97706" : "#dc2626" }} />
                </div>

                {/* 5 dimension scores */}
                <div className="space-y-1.5 text-[11px]">
                  {[
                    { label: "Intermediary Liability", score: policy.intermediaryLiabilityScore },
                    { label: "Algorithmic Audits", score: policy.algorithmicAuditScore },
                    { label: "Breach Notification", score: policy.breachNotificationScore },
                    { label: "Spam Regulation", score: policy.spamRegulationScore },
                    { label: "Dark Pattern Restrictions", score: policy.darkPatternScore },
                  ].map((d) => (
                    <div key={d.label} className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">{d.label}</span>
                      <span className={`font-mono font-bold ${d.score >= 60 ? "text-emerald-600" : d.score >= 35 ? "text-amber-600" : "text-red-600"}`}>
                        {d.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
