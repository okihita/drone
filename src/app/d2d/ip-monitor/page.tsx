import type { Metadata } from "next";
import HeroBanner from "@/components/layout/HeroBanner";
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
    <>
      <HeroBanner
        title="IP Risk Monitor"
        description={
          <>
            How safe is your intellectual property in ASEAN? This monitor scores each country on four dimensions of IP protection — from trade secret laws and copyright safe harbors to patent enforcement and AI training data risks. <strong className="text-slate-800 dark:text-slate-200">Higher scores mean stronger IP protections</strong> for creators, innovators, and businesses operating in the region.
          </>
        }
        rightSlot={
          <div className="shrink-0 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="block font-sans text-[10px] text-slate-400 uppercase font-bold">ASEAN IP Average</span>
            <span className="font-bold text-2xl text-slate-900 dark:text-white">{avgScore}/100</span>
          </div>
        }
        concepts={[
          { title: "Trade Secret Protection", desc: "Are companies' confidential business information and trade secrets protected from theft by competitors or the state?" },
          { title: "Copyright Safe Harbors", desc: "Do internet platforms have legal immunity for user-uploaded content, or are they liable for copyright infringement?" },
          { title: "Patent Protection", desc: "Are patents enforceable, and can foreign companies obtain meaningful patent protection for their innovations?" },
          { title: "AI Training Data Risk", desc: "Can foreign AI models be trained without risk of training data being seized, copied, or reverse-engineered by local authorities?" },
        ]}
        conceptCols={4}
        howToRead={
          <>
            Each country card shows a composite IP score (0–100) and four dimension breakdowns. Green scores (≥55) indicate strong IP frameworks; amber (35–54) indicate moderate protection with gaps; red (&lt;35) indicate weak or absent IP safeguards.
          </>
        }
      />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">Country IP Risk Profiles</h2>
          <IPMonitorClientShell profiles={profiles} />
        </div>
      </main>
    </>
  );
}
