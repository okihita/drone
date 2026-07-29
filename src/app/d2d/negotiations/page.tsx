import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { fetchNegotiations, fetchNegotiationsGrouped } from "@/services/negotiation";
import { FRAMEWORK_LABELS, FRAMEWORK_COLORS } from "@/types/negotiation";
import type { NegotiationFramework, NegotiationMilestone } from "@/types/negotiation";
import { Calendar, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Trade Negotiations Timeline — ASEAN | D.R.O.N.E.",
  description: "Gantt-style timeline tracking DEFA, CPTPP, DEPA, IPEF, and bilateral digital economy agreement negotiations across Southeast Asia.",
};

export default function NegotiationsPage() {
  const milestones = fetchNegotiations();
  const grouped = fetchNegotiationsGrouped();

  const completedCount = milestones.filter((m) => m.status === "COMPLETED").length;
  const inProgressCount = milestones.filter((m) => m.status === "IN_PROGRESS").length;

  const STATUS_ICONS: Record<string, typeof CheckCircle> = {
    COMPLETED: CheckCircle,
    IN_PROGRESS: Clock,
    UPCOMING: AlertTriangle,
    DELAYED: AlertTriangle,
  };

  const STATUS_COLORS: Record<string, string> = {
    COMPLETED: "text-emerald-500",
    IN_PROGRESS: "text-asean-amber",
    UPCOMING: "text-slate-400",
    DELAYED: "text-red-500",
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors">
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-asean-sky font-bold mb-2">
                <Calendar className="h-4 w-4 text-asean-sky animate-pulse" />
                <span>Digital Trade Negotiations</span>
                <span>·</span>
                <span className="text-slate-500 font-mono">DEFA · CPTPP · DEPA · IPEF</span>
              </div>
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Digital Trade Negotiations Timeline
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-sans">
                Tracking multilateral and bilateral digital trade agreement negotiations across Southeast Asia: ASEAN DEFA, CPTPP accessions, DEPA expansion, IPEF digital pillar, and Singapore-led bilateral Digital Economy Agreements.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-sans">
              <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-emerald-500" /><div><span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Completed</span><span className="font-bold text-slate-900 dark:text-white">{completedCount}</span></div></div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-asean-amber" /><div><span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">In Progress</span><span className="font-bold text-slate-900 dark:text-white">{inProgressCount}</span></div></div>
            </div>
          </div>
        </div>
      </section>
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {Object.entries(grouped).map(([framework, fMilestones]) => (
            <section key={framework}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-3 h-3 rounded-full ${FRAMEWORK_COLORS[framework as NegotiationFramework] ?? "bg-slate-400"}`} />
                <h2 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
                  {FRAMEWORK_LABELS[framework as NegotiationFramework] ?? framework}
                </h2>
              </div>
              <div className="space-y-2">
                {fMilestones.sort((a, b) => a.milestoneDate.localeCompare(b.milestoneDate)).map((m: NegotiationMilestone) => {
                  const Icon = STATUS_ICONS[m.status] ?? Clock;
                  return (
                    <div key={m.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                      <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${STATUS_COLORS[m.status] ?? "text-slate-400"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{m.title}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            m.status === "COMPLETED" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : m.status === "IN_PROGRESS" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                          }`}>
                            {m.status.replace("_", " ")}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{m.description}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-mono">
                          <span>{new Date(m.milestoneDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                          {m.endDate && <span>→ {new Date(m.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>}
                          <span className="text-slate-500">· {m.countries.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
