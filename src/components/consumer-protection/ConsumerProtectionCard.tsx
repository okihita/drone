"use client";

import { useState } from "react";
import type { ConsumerProtectionPolicy } from "@/types/consumer_protection";
import { scoreTone, toneHex, toneTextClass } from "@/lib/colors";
import { FLAG_COMPONENTS } from "@/lib/flags";
import { ExternalLink, ChevronDown, ChevronUp, Scale, ShieldAlert, Cpu, BellRing, Mail, EyeOff } from "lucide-react";

interface Props {
  policy: ConsumerProtectionPolicy;
}

const GOOD_SCORE = 60;
const BAD_SCORE = 35;

export default function ConsumerProtectionCard({ policy }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const FlagIcon = FLAG_COMPONENTS[policy.countryCode];
  const compositeTone = scoreTone(policy.compositeScore, GOOD_SCORE, BAD_SCORE);

  const dimensions = [
    { label: "Intermediary Liability", score: policy.intermediaryLiabilityScore },
    { label: "Algorithmic Audits", score: policy.algorithmicAuditScore },
    { label: "Breach Notification", score: policy.breachNotificationScore },
    { label: "Spam Regulation", score: policy.spamRegulationScore },
    { label: "Dark Pattern Restrictions", score: policy.darkPatternScore },
  ];

  const assessments = [
    {
      title: "Intermediary Liability & Safe Harbors",
      icon: Scale,
      text: policy.intermediaryLiability,
      score: policy.intermediaryLiabilityScore,
    },
    {
      title: "Algorithmic Transparency & Audits",
      icon: Cpu,
      text: policy.algorithmicAudit,
      score: policy.algorithmicAuditScore,
    },
    {
      title: "Data Breach Notification",
      icon: BellRing,
      text: policy.breachNotification,
      score: policy.breachNotificationScore,
    },
    {
      title: "Spam & Commercial Messaging",
      icon: Mail,
      text: policy.spamRegulation,
      score: policy.spamRegulationScore,
    },
    {
      title: "Dark Patterns & Deceptive Design",
      icon: EyeOff,
      text: policy.darkPatternRestriction,
      score: policy.darkPatternScore,
    },
  ];

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all font-sans">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {FlagIcon && <FlagIcon className="w-4 h-3 rounded-xs shrink-0 shadow-xs" />}
            <span className="font-sans text-sm font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {policy.countryCode}
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{policy.countryName}</span>
          </div>
          <span className={`text-sm font-sans font-extrabold ${toneTextClass(compositeTone)}`}>
            {policy.compositeScore}/100
          </span>
        </div>

        {/* Score Progress Bar */}
        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 mb-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${policy.compositeScore}%`, backgroundColor: toneHex(compositeTone) }}
          />
        </div>

        {/* 5 Dimension Scores */}
        <div className="space-y-1.5 text-sm font-sans">
          {dimensions.map((d) => (
            <div key={d.label} className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">{d.label}</span>
              <span className={`font-sans font-bold ${toneTextClass(scoreTone(d.score, GOOD_SCORE, BAD_SCORE))}`}>
                {d.score}
              </span>
            </div>
          ))}
        </div>

        {/* Expandable Statutory Details Toggle */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3.5 w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors"
          aria-expanded={isExpanded}
        >
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-asean-blue" />
            <span>{isExpanded ? "Hide Legal Findings" : "Inspect Statutory Findings"}</span>
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {/* Expandable Section with 5 Qualitative Assessments */}
        {isExpanded && (
          <div className="mt-3 space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-sm animate-[fadeIn_0.15s_ease-out]">
            {assessments.map((a) => {
              const tone = scoreTone(a.score, GOOD_SCORE, BAD_SCORE);
              const Icon = a.icon;
              return (
                <div key={a.title} className="p-2.5 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-asean-blue shrink-0" />
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-tight">
                        {a.title}
                      </span>
                    </div>
                    <span className={`font-sans font-bold text-sm shrink-0 ${toneTextClass(tone)}`}>
                      {a.score}/100
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {a.text}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Card Footer: Source Link */}
      {policy.sourceUrl && (
        <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-sm font-sans">
          <span className="text-sm text-slate-400">Statutory Framework</span>
          <a
            href={policy.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-asean-blue dark:text-asean-sky hover:underline font-bold inline-flex items-center gap-1 text-sm"
          >
            Official Document <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}
    </div>
  );
}
