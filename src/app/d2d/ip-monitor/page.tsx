import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { fetchIPProfiles } from "@/services/ip_monitor";
import IPMonitorClientShell from "@/components/ip-monitor/IPMonitorClientShell";

export const metadata: Metadata = {
  title: "IP & Trade Secret Risk Monitor — ASEAN | D.R.O.N.E.",
  description: "Tracking intellectual property protection, trade secret theft risk, copyright safe harbors, patent disclosure mandates, and AI model exfiltration risk across Southeast Asia.",
};

export default function IPMonitorPage() {
  const profiles = fetchIPProfiles();
  const avgScore = Math.round(profiles.reduce((s, p) => s + p.compositeScore, 0) / profiles.length);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors">
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-6 sm:py-9 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                IP Risk Monitor
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-sans leading-relaxed">
                How safe is your intellectual property in ASEAN? This monitor scores each country on four dimensions of IP protection — from trade secret laws and copyright safe harbors to patent enforcement and AI training data risks. <strong className="text-slate-800 dark:text-slate-200">Higher scores mean stronger IP protections</strong> for creators, innovators, and businesses operating in the region.
              </p>
            </div>

            <div className="shrink-0 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="block font-sans text-[10px] text-slate-400 uppercase font-bold">ASEAN IP Average</span>
              <span className="font-bold text-2xl text-slate-900 dark:text-white">{avgScore}/100</span>
            </div>
          </div>

          {/* Dimension concept cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 mb-5">
            {[
              { label: "Trade Secret Protection", desc: "Are companies' confidential business information and trade secrets protected from theft by competitors or the state?" },
              { label: "Copyright Safe Harbors", desc: "Do internet platforms have legal immunity for user-uploaded content, or are they liable for copyright infringement?" },
              { label: "Patent Protection", desc: "Are patents enforceable, and can foreign companies obtain meaningful patent protection for their innovations?" },
              { label: "AI Training Data Risk", desc: "Can foreign AI models be trained without risk of training data being seized, copied, or reverse-engineered by local authorities?" },
            ].map((item) => (
              <div key={item.label} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-400 leading-snug">
                <strong className="block text-slate-800 dark:text-slate-200 font-bold mb-0.5">{item.label}</strong>
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
          <IPMonitorClientShell profiles={profiles} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
