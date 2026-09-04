"use client";

import React from "react";
import type { PlatformLaborProfile } from "@/lib/laborData";

interface PlatformLaborCardProps {
  platform: PlatformLaborProfile;
}

export default function PlatformLaborCard({ platform }: PlatformLaborCardProps) {
  const dimensions = [
    { label: "Fair Pay", score: platform.scoreBreakdown.fairPay, desc: "Living wage after fuel & waiting costs" },
    { label: "Fair Conditions", score: platform.scoreBreakdown.fairConditions, desc: "Accident insurance & safety protocols" },
    { label: "Fair Contracts", score: platform.scoreBreakdown.fairContracts, desc: "Clear terms without unilateral edits" },
    { label: "Fair Management", score: platform.scoreBreakdown.fairManagement, desc: "Human appeals for deactivations" },
    { label: "Fair Representation", score: platform.scoreBreakdown.fairRepresentation, desc: "Freedom of association & union recognition" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-xs font-sans">
      {/* Header Info */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h4 className="font-serif-editorial text-3xl font-extrabold text-slate-900 dark:text-white">
              {platform.name}
            </h4>
            <span className="text-sm px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {platform.headquarters}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Parent: <strong className="text-slate-700 dark:text-slate-300">{platform.parentCompany}</strong> • Scale: <strong className="text-slate-700 dark:text-slate-300">{platform.estimatedWorkers}</strong>
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-sm font-semibold text-slate-400">Active Jurisdictions:</span>
            <div className="flex gap-1.5">
              {platform.activeCountries.map((c) => (
                <span key={c} className="text-sm font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Score Big Pill */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center gap-4 shrink-0">
          <div className="text-center">
            <span className="block text-sm text-slate-400 uppercase font-bold">Fairwork Rating</span>
            <span className={`text-4xl font-extrabold ${platform.fairworkScore >= 3 ? "text-asean-amber" : "text-asean-red"}`}>
              {platform.fairworkScore}
            </span>
            <span className="text-sm text-slate-400 font-bold block">/ 10 Points</span>
          </div>
          <div className="h-12 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Take-Rate:</span>
              <strong className="text-slate-900 dark:text-white font-bold">{platform.takeRate}</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Biometric Risk:</span>
              <strong className="text-asean-red font-bold">{platform.biometricRisk}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Fairwork Dimensions Breakdown */}
      <div className="space-y-3">
        <h5 className="font-bold text-sm uppercase text-slate-900 dark:text-white tracking-wider">
          Fairwork 5-Core Principles Breakdown (0 to 2 Points Each)
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {dimensions.map((dim) => (
            <div key={dim.label} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{dim.label}</span>
                <span className="text-sm font-extrabold text-asean-amber">{dim.score} / 2.0</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-asean-yellow h-full rounded-full"
                  style={{ width: `${(dim.score / 2.0) * 100}%` }}
                />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug pt-0.5">
                {dim.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Qualitative Labor Realities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="font-bold text-sm text-asean-red uppercase tracking-wider block">
            Core Algorithmic Dispute &amp; Fare Extraction
          </span>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {platform.keyLaborControversy}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="font-bold text-sm text-asean-blue uppercase tracking-wider block">
            Active Driver Collective Actions &amp; Strike Mobilization
          </span>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {platform.recentUnionActions}
          </p>
        </div>
      </div>

      {/* Dispute & Appeals Architecture */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
        <div>
          <span className="text-slate-400 font-semibold block">Deactivation Redress Mechanism:</span>
          <strong className="text-slate-900 dark:text-white font-bold">{platform.deactivationAppeal}</strong>
        </div>
        <div>
          <span className="text-slate-400 font-semibold block">Algorithmic Explainability:</span>
          <strong className="text-asean-red font-bold">{platform.algorithmicExplainability} (Black-Box Logic)</strong>
        </div>
        <div>
          <span className="text-slate-400 font-semibold block">Employment Status:</span>
          <strong className="text-slate-700 dark:text-slate-300">{platform.workerClassification}</strong>
        </div>
      </div>
    </div>
  );
}
