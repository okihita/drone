import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { FileKey } from "lucide-react";
import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";

const FLAG_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL,
};

// IP risk profiles — hardcoded inline for the monitor page
const IP_PROFILES = [
  { countryCode: "SG", countryName: "Singapore", tradeSecretScore: 85, copyrightSafeHarborScore: 80, patentScore: 90, aiRiskScore: 75, compositeScore: 83 },
  { countryCode: "MY", countryName: "Malaysia", tradeSecretScore: 65, copyrightSafeHarborScore: 55, patentScore: 75, aiRiskScore: 60, compositeScore: 64 },
  { countryCode: "VN", countryName: "Vietnam", tradeSecretScore: 30, copyrightSafeHarborScore: 35, patentScore: 45, aiRiskScore: 20, compositeScore: 33 },
  { countryCode: "ID", countryName: "Indonesia", tradeSecretScore: 35, copyrightSafeHarborScore: 40, patentScore: 50, aiRiskScore: 30, compositeScore: 39 },
  { countryCode: "TH", countryName: "Thailand", tradeSecretScore: 45, copyrightSafeHarborScore: 50, patentScore: 60, aiRiskScore: 40, compositeScore: 49 },
  { countryCode: "PH", countryName: "Philippines", tradeSecretScore: 50, copyrightSafeHarborScore: 55, patentScore: 60, aiRiskScore: 45, compositeScore: 53 },
  { countryCode: "MM", countryName: "Myanmar", tradeSecretScore: 5, copyrightSafeHarborScore: 10, patentScore: 15, aiRiskScore: 5, compositeScore: 9 },
  { countryCode: "KH", countryName: "Cambodia", tradeSecretScore: 20, copyrightSafeHarborScore: 25, patentScore: 30, aiRiskScore: 15, compositeScore: 23 },
  { countryCode: "LA", countryName: "Laos", tradeSecretScore: 20, copyrightSafeHarborScore: 25, patentScore: 30, aiRiskScore: 15, compositeScore: 23 },
  { countryCode: "BN", countryName: "Brunei", tradeSecretScore: 50, copyrightSafeHarborScore: 55, patentScore: 55, aiRiskScore: 45, compositeScore: 51 },
  { countryCode: "TL", countryName: "Timor-Leste", tradeSecretScore: 30, copyrightSafeHarborScore: 35, patentScore: 35, aiRiskScore: 25, compositeScore: 31 },
];

const DIMENSIONS = [
  { key: "tradeSecretScore", label: "Trade Secret Protection" },
  { key: "copyrightSafeHarborScore", label: "Copyright Safe Harbors" },
  { key: "patentScore", label: "Patent Protection" },
  { key: "aiRiskScore", label: "AI Training Data Risk" },
] as const;

export const metadata: Metadata = {
  title: "IP & Trade Secret Risk Monitor — ASEAN | D.R.O.N.E.",
  description: "Tracking intellectual property protection, trade secret theft risk, copyright safe harbors, patent disclosure mandates, and AI model exfiltration risk across Southeast Asia.",
};

export default function IPMonitorPage() {
  const avgScore = Math.round(IP_PROFILES.reduce((s, p) => s + p.compositeScore, 0) / IP_PROFILES.length);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors">
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0 text-xs font-sans uppercase tracking-widest text-asean-blue font-bold mb-2">
                <FileKey className="h-4 w-4 text-asean-blue animate-pulse" />
                <span>Digital 2 Dozen · Principles 21–24</span>
                <span className="hidden sm:inline">·</span>
                <span className="text-slate-500 font-mono">IP & Trade Secrets</span>
              </div>
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                IP & Trade Secret Risk Monitor
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-sans leading-relaxed">
                How safe is your intellectual property in ASEAN? This monitor scores each country on four dimensions of IP protection — from trade secret laws and copyright safe harbors to patent enforcement and AI training data risks. <strong className="text-slate-800 dark:text-slate-200">Higher scores mean stronger IP protections</strong> for creators, innovators, and businesses operating in the region.
              </p>
            </div>

            <div className="shrink-0 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">ASEAN IP Average</span>
              <span className="font-bold text-2xl text-slate-900 dark:text-white">{avgScore}/100</span>
            </div>
          </div>

          {/* Dimension concept cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Trade Secret Protection", desc: "Are companies' confidential business information and trade secrets protected from theft by competitors or the state?" },
              { label: "Copyright Safe Harbors", desc: "Do internet platforms have legal immunity for user-uploaded content, or are they liable for copyright infringement?" },
              { label: "Patent Protection", desc: "Are patents enforceable, and can foreign companies obtain meaningful patent protection for their innovations?" },
              { label: "AI Training Data Risk", desc: "Can foreign AI models be trained without risk of training data being seized, copied, or reverse-engineered by local authorities?" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
                <strong className="block text-slate-800 dark:text-slate-200 mb-1">{item.label}</strong>
                {item.desc}
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-3xl">
            <strong className="text-slate-500 dark:text-slate-400">How to read</strong>: Each country card shows a composite IP score (0–100) and four dimension breakdowns. Green scores (≥55) indicate strong IP frameworks; amber (35–54) indicate moderate protection with gaps; red (&lt;35) indicate weak or absent IP safeguards.
          </p>
        </div>
      </section>

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">Country IP Risk Profiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {IP_PROFILES.map((profile) => (
              <div key={profile.countryCode} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  {(() => { const FlagIcon = FLAG_COMPONENTS[profile.countryCode]; return FlagIcon ? <FlagIcon className="w-4 h-3 rounded-xs shrink-0" /> : null; })()}
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-extrabold">{profile.countryCode}</span>
                    <span className="ml-2 text-sm font-bold text-slate-800 dark:text-slate-200">{profile.countryName}</span>
                  </div>
                  <span className={`text-sm font-mono font-extrabold ${profile.compositeScore >= 55 ? "text-emerald-600" : profile.compositeScore >= 35 ? "text-amber-600" : "text-red-600"}`}>
                    {profile.compositeScore}/100
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 mb-3">
                  <div className="h-full rounded-full" style={{ width: `${profile.compositeScore}%`, backgroundColor: profile.compositeScore >= 55 ? "#059669" : profile.compositeScore >= 35 ? "#d97706" : "#dc2626" }} />
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {DIMENSIONS.map((d) => {
                    const score = profile[d.key];
                    return (
                      <div key={d.key} className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">{d.label}</span>
                        <span className={`font-mono font-bold ${score >= 55 ? "text-emerald-600" : score >= 35 ? "text-amber-600" : "text-red-600"}`}>
                          {score}
                        </span>
                      </div>
                    );
                  })}
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
