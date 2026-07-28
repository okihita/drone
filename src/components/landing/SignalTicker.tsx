"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { ThreatLevel } from "@/lib/constants";

// ── Mocked signal feed ───────────────────────────────────────────────────────
// Shape mirrors a future /api/alerts payload — swap the array, keep the UI.

interface Signal {
  code: string;
  severity: ThreatLevel;
  text: string;
  time: string;
}

const MOCK_SIGNALS: ReadonlyArray<Signal> = [
  { code: "VN", severity: "High Alert", text: "Decree 147 amendment expands real-name verification mandates", time: "09:42" },
  { code: "ASEAN", severity: "Medium Risk", text: "DEFA negotiating text — new cross-border data annex circulated", time: "09:15" },
  { code: "MM", severity: "High Alert", text: "Draft Cybersecurity Law grants police warrantless data access", time: "08:57" },
  { code: "ID", severity: "Medium Risk", text: "MR5 enforcement: 24h content-removal requests up 40% QoQ", time: "08:31" },
  { code: "PH", severity: "Rights Verified", text: "NPC safeguards upheld in 57th SEOM DEFA session", time: "07:58" },
  { code: "KH", severity: "High Alert", text: "National Internet Gateway sub-decree implementation imminent", time: "07:22" },
  { code: "TH", severity: "Medium Risk", text: "Royal Decree on Digital Platforms — new reporting duties", time: "06:44" },
  { code: "SG", severity: "Rights Verified", text: "AI Verify framework extended to foundation models", time: "06:10" },
  { code: "MY", severity: "Medium Risk", text: "PDPA amendment bill introduces mandatory breach notification", time: "05:38" },
  { code: "LA", severity: "Medium Risk", text: "Draft Data Protection Law enters final consultation", time: "05:02" },
];

const SEVERITY_DOT_CLASSES: Record<ThreatLevel, string> = {
  "High Alert": "bg-asean-red",
  "Medium Risk": "bg-asean-amber",
  "Rights Verified": "bg-asean-emerald",
};

// ── Component ────────────────────────────────────────────────────────────────

function SignalItem({ signal }: { signal: Signal }) {
  return (
    <span className="flex shrink-0 items-center gap-2 px-5 text-[11px] font-sans text-slate-400">
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", SEVERITY_DOT_CLASSES[signal.severity])} />
      <span className="font-bold uppercase tracking-wider text-slate-200">{signal.code}</span>
      <span className="whitespace-nowrap">{signal.text}</span>
      <span className="tabular-nums text-slate-600">{signal.time} ICT</span>
    </span>
  );
}

export default function SignalTicker() {
  return (
    <div
      className="relative flex items-stretch border-t border-slate-200 bg-white/90 backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/80"
      aria-label="Live signal feed — latest policy alerts across Southeast Asia"
    >
      {/* Live label */}
      <div className="relative z-10 flex shrink-0 items-center gap-2 border-r border-slate-200 bg-white px-4 py-2.5 dark:border-white/10 dark:bg-slate-950">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-asean-emerald opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-asean-emerald" />
        </span>
        <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300 sm:inline">
          Live Signal Feed
        </span>
      </div>

      {/* Marquee (static wrapped row under reduced motion) */}
      <div className="flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] motion-reduce:[mask-image:none]">
        <div className="animate-hero-marquee flex w-max items-center py-2.5 motion-reduce:w-full motion-reduce:flex-wrap">
          {MOCK_SIGNALS.map((signal, i) => (
            <SignalItem key={`a-${i}`} signal={signal} />
          ))}
          {/* Duplicate track for the seamless -50% loop; hidden from assistive tech
              and removed entirely under reduced motion */}
          <span aria-hidden="true" className="contents motion-reduce:hidden">
            {MOCK_SIGNALS.map((signal, i) => (
              <SignalItem key={`b-${i}`} signal={signal} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
