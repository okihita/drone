import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { fetchNegotiations } from "@/services/negotiation";
import { CheckCircle, Clock } from "lucide-react";
import NegotiationTimeline from "@/components/negotiations/NegotiationTimeline";
import HeroBanner from "@/components/layout/HeroBanner";

export const metadata: Metadata = {
  title: "Digital Trade Negotiations Timeline — ASEAN | D.R.O.N.E.",
  description: "Gantt and vertical timeline tracking DEFA, CPTPP, DEPA, IPEF, and bilateral digital economy agreement negotiations across Southeast Asia.",
};

export default function NegotiationsPage() {
  const milestones = fetchNegotiations();

  const completedCount = milestones.filter((m) => m.status === "COMPLETED").length;
  const inProgressCount = milestones.filter((m) => m.status === "IN_PROGRESS").length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors">
      <HeroBanner
        title="Digital Trade Negotiations Timeline"
        description={
          <>
            Which trade deals are shaping ASEAN&apos;s digital future? This timeline tracks every major digital trade negotiation affecting Southeast Asia — from the <strong className="text-slate-800 dark:text-slate-200">ASEAN DEFA</strong> (expected to bind all 10 member states by 2027) to <strong className="text-slate-800 dark:text-slate-200">CPTPP accessions</strong>, <strong className="text-slate-800 dark:text-slate-200">DEPA expansion</strong>, and bilateral agreements. Each entry shows what happened, when, and which countries are involved.
          </>
        }
        stats={[
          { icon: CheckCircle, iconClass: "text-asean-emerald", label: "Completed", value: completedCount },
          { icon: Clock, iconClass: "text-asean-amber", label: "In Progress", value: inProgressCount },
        ]}
        concepts={[
          { title: "ASEAN DEFA", desc: "The Digital Economy Framework Agreement — ASEAN's flagship digital trade deal, negotiated by all 10 member states." },
          { title: "CPTPP", desc: "Comprehensive Trans-Pacific Partnership — 4 ASEAN members plus 7 Pacific nations with binding digital trade chapters." },
          { title: "DEPA", desc: "Digital Economy Partnership Agreement — modular digital trade framework pioneered by Singapore, Chile, and New Zealand." },
          { title: "IPEF", desc: "US-led Indo-Pacific Economic Framework — 7 ASEAN members participating in digital economy pillar negotiations." },
          { title: "Bilateral DEAs", desc: "Country-to-country digital trade deals — Singapore leads with agreements with Australia, UK, Korea, and EU." },
        ]}
        howToRead={
          <>
            Milestones are logged chronologically along a vertical stem track. Green dots signal completed milestones; amber dots signal active negotiations; blue dots signal upcoming events. Use the filter bar to isolate specific frameworks, statuses, or member states.
          </>
        }
      />

      <main className="flex-1">
        <NegotiationTimeline milestones={milestones} />
      </main>
      <Footer />
    </div>
  );
}
