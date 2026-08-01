import type { Metadata } from "next";
import Footer from "@/components/Footer";
import TechSovereigntyRadar from "@/components/tech-sovereignty/TechSovereigntyRadar";
import ViolationTimeline from "@/components/tech-sovereignty/ViolationTimeline";
import HeroBanner from "@/components/layout/HeroBanner";
import { listAllBenchmarks } from "@/services/benchmark";
import { fetchEncryptionEvents } from "@/services/encryption";
import { Lock, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Technology Sovereignty Radar — ASEAN Digital Rights | D.R.O.N.E.",
  description: "Interactive radar chart tracking forced technology transfer, source code protection, encryption mandates, technology choice, and authentication methods across all 11 ASEAN member states.",
};

export default function TechSovereigntyPage() {
  const allSummaries = listAllBenchmarks();
  const techPrinciples = [6, 7, 8, 9, 12]; // Technology Sovereignty cluster
  const encryptionEvents = fetchEncryptionEvents();

  // High-risk countries (avg tech sovereignty score below 40)
  const highRiskCount = allSummaries.filter((s) => {
    const techScores = s.scores.filter((sc) => techPrinciples.includes(sc.principleId));
    const avg = techScores.reduce((sum, sc) => sum + sc.score, 0) / techScores.length;
    return avg < 40;
  }).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors">
      <HeroBanner
        title="Technology Sovereignty Radar"
        description={
          <>
            How free is each ASEAN country to use and build technology? This radar measures five dimensions of government tech control across 11 countries. A <strong className="text-slate-800 dark:text-slate-200">larger pentagon means more freedom</strong> — companies keep their code private, use strong encryption, and choose their own tech. A <strong className="text-slate-800 dark:text-slate-200">smaller shape means more restrictions</strong> — forced transfers, mandatory source disclosure, and encryption backdoors.
          </>
        }
        stats={[
          { icon: AlertTriangle, iconClass: "text-asean-red", label: "High Risk", value: `${highRiskCount} of 11 Countries` },
          { icon: Lock, iconClass: "text-asean-blue", label: "Encryption Events", value: `${encryptionEvents.length} Tracked` },
        ]}
        concepts={[
          { title: "No Forced Tech Transfer", desc: "Can foreign firms enter without giving tech to local partners?" },
          { title: "Source Code Protection", desc: "Can firms keep code private without government disclosure?" },
          { title: "Technology Choice", desc: "Can firms pick best tech or forced onto local standards?" },
          { title: "Authentication Methods", desc: "Can users use open e-signatures or locked to state IDs?" },
          { title: "Encryption Products", desc: "Can citizens freely use VPNs and encryption tools?" },
        ]}
        howToRead={
          <>
            Select up to 4 countries from the toggles. Each axis ranges from 0 (worst) to 100 (best). Countries scoring below 40 are flagged as <span className="text-asean-red font-medium">high risk</span>. The timeline below the radar logs real-world laws and decrees — red dots signal high-impact restrictions, green dots signal positive developments.
          </>
        }
      />

      <main className="flex-1">
        <TechSovereigntyRadar summaries={allSummaries} principles={techPrinciples} />
        <ViolationTimeline events={encryptionEvents} />
      </main>

      <Footer />
    </div>
  );
}
