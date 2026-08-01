import type { Metadata } from "next";
import HeroBanner from "@/components/layout/HeroBanner";
import { fetchEncryptionEvents, fetchEncryptionSummary } from "@/services/encryption";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import EncryptionEventList from "@/components/encryption/EncryptionEventList";
import EncryptionSummaryStats from "@/components/encryption/EncryptionSummaryStats";

export const metadata: Metadata = {
  title: "Encryption & Digital Security Observatory — ASEAN | D.R.O.N.E.",
  description: "Tracking encryption regulation across Southeast Asia: VPN bans, backdoor mandates, lawful intercept expansions, key escrow requirements, and cybersecurity capacity building.",
};

export default function EncryptionPage() {
  const events = fetchEncryptionEvents();
  const summary = fetchEncryptionSummary();

  const highSeverityCount = events.filter((e) => e.severityScore >= 70).length;
  const totalCountries = Object.keys(summary).length;

  return (
    <>
      <HeroBanner
        title="Encryption & Digital Security Observatory"
        description={
          <>
            Can citizens freely encrypt their communications? This observatory tracks government efforts to weaken, restrict, or ban encryption across Southeast Asia — from VPN criminalization and backdoor mandates to positive capacity building. <strong className="text-slate-800 dark:text-slate-200">Red events signal high-impact restrictions</strong> (severity ≥ 70); <strong className="text-slate-800 dark:text-slate-200">green events signal capacity building</strong> and cooperative developments.
          </>
        }
        stats={[
          { icon: AlertTriangle, iconClass: "text-asean-red", label: "High Severity", value: `${highSeverityCount} Events` },
          { icon: ShieldCheck, iconClass: "text-asean-emerald", label: "Countries", value: `${totalCountries} Tracked` },
        ]}
        concepts={[
          { title: "VPN Ban", desc: "Government criminalizes or restricts VPN usage for citizens." },
          { title: "Backdoor Mandate", desc: "Companies forced to build decryption access for authorities." },
          { title: "Key Escrow", desc: "Encryption keys must be deposited with the government." },
          { title: "Intercept Expansion", desc: "Lawful intercept powers expanded to cover more services." },
          { title: "E2EE Restriction", desc: "End-to-end encryption limited or weakened by regulation." },
          { title: "Capacity Building", desc: "Positive: training, standards, and cooperative security efforts." },
        ]}
        conceptCols={6}
        howToRead={
          <>
            Each event is scored from 0–100 severity. Red dots (≥70) represent severe restrictions; orange dots (40–69) represent moderate concern; green dots (&lt;40) represent positive or low-impact developments. The summary stats above the event list show per-country averages.
          </>
        }
      />

      <main className="flex-1">
        <EncryptionSummaryStats summary={summary} />
        <EncryptionEventList events={events} />
      </main>
    </>
  );
}
