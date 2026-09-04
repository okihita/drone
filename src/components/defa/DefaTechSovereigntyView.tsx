"use client";

import React from "react";
import TechSovereigntyRadar from "@/components/tech-sovereignty/TechSovereigntyRadar";
import ViolationTimeline from "@/components/tech-sovereignty/ViolationTimeline";
import HeroBanner from "@/components/layout/HeroBanner";
import { getAllBenchmarkSummaries } from "@/lib/benchmarkData";
import { getEncryptionEvents } from "@/lib/encryptionData";
import { Lock, AlertTriangle } from "lucide-react";

export default function DefaTechSovereigntyView() {
  const allSummaries = getAllBenchmarkSummaries();
  const techPrinciples = [6, 7, 8, 9, 12]; // Technology Sovereignty cluster
  const encryptionEvents = getEncryptionEvents();

  // High-risk countries (avg tech sovereignty score below 40)
  const highRiskCount = allSummaries.filter((s) => {
    const techScores = s.scores.filter((sc) => techPrinciples.includes(sc.principleId));
    const avg = techScores.reduce((sum, sc) => sum + sc.score, 0) / techScores.length;
    return avg < 40;
  }).length;

  return (
    <>
      <HeroBanner
        title="Tech Sovereignty &amp; Compute"
        description={
          <>
            How free is each ASEAN country to use and build technology? This radar measures five dimensions of government tech control across 11 countries. A <strong className="text-slate-800 dark:text-slate-200">larger pentagon means more freedom</strong> — companies keep their code private, use strong encryption, and choose their own tech. A <strong className="text-slate-800 dark:text-slate-200">smaller shape means more restrictions</strong> — forced transfers, mandatory source disclosure, and encryption backdoors.
          </>
        }
        stats={[
          { icon: AlertTriangle, iconClass: "text-slate-400", label: "High Risk", value: `${highRiskCount} of 11 Countries` },
          { icon: Lock, iconClass: "text-slate-400", label: "Encryption Events", value: `${encryptionEvents.length} Tracked` },
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

      {/* Main Observatory Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full font-sans">
        <div className="space-y-10 sm:space-y-12">
          <TechSovereigntyRadar summaries={allSummaries} principles={techPrinciples} />
          <ViolationTimeline events={encryptionEvents} />
        </div>
      </main>
    </>
  );
}
