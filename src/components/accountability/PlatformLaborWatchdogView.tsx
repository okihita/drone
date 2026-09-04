"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Send,
  ChevronRight,
  TrendingDown,
  DollarSign,
  Eye,
} from "lucide-react";
import HeroBanner from "@/components/layout/HeroBanner";
import PlatformLaborCard from "./PlatformLaborCard";
import {
  PLATFORM_PROFILES,
  DISPATCH_EXPLAINERS,
  ADVOCACY_ORGANIZATIONS,
} from "@/lib/laborData";

const DISPATCH_ICONS = [DollarSign, TrendingDown, Eye];

export default function PlatformLaborWatchdogView() {
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>("grab");

  const selectedPlatform =
    PLATFORM_PROFILES.find((p) => p.id === selectedPlatformId) ?? PLATFORM_PROFILES[0];

  return (
    <>
      <HeroBanner
        eyebrow="Platform Accountability — Algorithmic Labor Telemetry"
        title="Digital Labor & Platform Watchdog"
        description={
          <>
            Evaluating algorithmic management, dynamic surge dispatch, arbitrary account deactivations, and labor protections across Southeast Asia’s super-apps. Monitoring over <strong className="text-slate-900 dark:text-white">4 Million+ gig workers</strong> navigating automated ride-hailing, food delivery, and logistics platforms.
          </>
        }
        rightSlot={
          <div className="shrink-0 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-sans space-y-1.5">
            <span className="block font-sans text-sm text-slate-400 uppercase font-bold">Labor Telemetry Snapshot</span>
            <div className="font-bold text-slate-900 dark:text-white text-base">4M+ Regional Gig Workers</div>
            <div className="text-asean-red font-bold text-sm">Regional Fairwork Avg: 2.2 / 10</div>
            <div className="text-asean-amber font-semibold text-sm">0% Public Code Transparency</div>
          </div>
        }
        concepts={[
          { title: "Algorithmic Dispatch", desc: "Automated routing and order batching systems operating without human explanation or audit." },
          { title: "The Phantom Surge", desc: "Asymmetric fare algorithms where passenger surge fees are withheld from driver remuneration." },
          { title: "Automated Deactivations", desc: "Unilateral account bans triggered by facial recognition mismatches or customer disputes without human appeal." },
          { title: "Fairwork Principles", desc: "International standard assessing Fair Pay, Fair Conditions, Contracts, Management, and Representation." },
          { title: "Worker Misclassification", desc: "Designating full-time gig couriers as 'independent partners' to evade statutory healthcare and overtime." },
        ]}
        howToRead={
          <>
            Compare platforms using the interactive profile selector below. <span className="text-asean-red font-bold">Fairwork scores (&lt;3.0/10)</span> reflect acute labor precarity, algorithmic opacity, and lack of worker representation. Use the Whistleblower Intake Portal to submit anonymous pay slips and suspension screenshots.
          </>
        }
      />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 font-sans">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">

          {/* Critical Labor Rights Callout */}
          <div className="p-6 sm:p-8 rounded-3xl bg-asean-red/10 border border-asean-red/30 text-slate-900 dark:text-white flex items-start gap-4 text-sm font-sans">
            <ShieldAlert className="w-6 h-6 text-asean-red shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-sm text-asean-red uppercase tracking-wider">
                Systemic Regulatory Gap: The &quot;Partner&quot; Misclassification Loophole
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Across all 11 ASEAN member states, platform giants legally classify gig workers as &quot;independent contractors&quot; or &quot;mitra/partners&quot;. This misclassification strips couriers of statutory minimum wages, paid sick leave, workers&apos; compensation for on-the-job fatalities, and the legal right to collective bargaining—while algorithms exercise tighter disciplinary control than traditional factory managers.
              </p>
            </div>
          </div>

          {/* Platform Scorecard Workspace */}
          <section className="space-y-8 sm:space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Super-App Labor Accountability Scorecards
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Empirical assessment of Southeast Asia’s five largest mobility and delivery platforms.
                </p>
              </div>
              <span className="text-sm font-semibold text-slate-400">
                Evaluating 5 Core Platforms
              </span>
            </div>

            {/* Platform Selector Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {PLATFORM_PROFILES.map((p) => {
                const isSelected = p.id === selectedPlatformId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlatformId(p.id)}
                    className={`flex items-center gap-2.5 px-4.5 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-[1.02]"
                        : "bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span>{p.name}</span>
                    <span
                      className={`text-sm px-2.5 py-0.5 rounded-md font-extrabold ${
                        p.fairworkScore >= 3
                          ? "bg-asean-yellow/20 text-asean-amber dark:text-asean-yellow"
                          : "bg-asean-red/20 text-asean-red"
                      }`}
                    >
                      {p.fairworkScore} / 10
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Platform Detail Dossier */}
            <PlatformLaborCard platform={selectedPlatform} />
          </section>

          {/* Deep-Dive: 3 Core Algorithmic Dispatch Mechanics */}
          <section className="space-y-8 sm:space-y-10">
            <div>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Mechanisms of Algorithmic Exploitation
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                How automated black-box code dictates wages, routes, and job security across Southeast Asian gig fleets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {DISPATCH_EXPLAINERS.map((card, idx) => {
                const IconComponent = DISPATCH_ICONS[idx] ?? DollarSign;
                return (
                  <div
                    key={card.title}
                    className={`p-8 sm:p-9 rounded-3xl border border-slate-200/70 dark:border-slate-800/80 ${card.borderColor} ${card.bgClass} space-y-4 font-sans`}
                  >
                    <div className="flex items-center gap-3.5">
                      <IconComponent className={`w-6 h-6 ${card.color} shrink-0`} />
                      <div>
                        <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                          {card.title}
                        </h4>
                        <span className={`text-sm font-bold uppercase tracking-wider ${card.color}`}>
                          {card.subtitle}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Whistleblower & Gig Worker Evidence Intake Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800/80 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-asean-yellow font-bold text-sm uppercase tracking-wider">
                <Send className="w-4 h-4" /> DRONE Whistleblower &amp; Worker Evidence Hotline
              </div>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-white">
                Are you a ride-hailing driver or delivery courier experiencing unfair deactivation?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Submit screenshots of dispatch penalties, phantom surge wage cuts, or facial recognition lockouts. All uploads are stripped of metadata and client-side encrypted directly to EngageMedia researchers.
              </p>
            </div>
            <Link
              href="/leaks"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-asean-red hover:bg-asean-red/90 text-white font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-asean-red/20"
            >
              <span>Submit Worker Evidence (Leaks)</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grassroots Worker Solidarity Directory */}
          <section className="space-y-8 sm:space-y-10">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Regional Worker Alliances &amp; Watchdog Networks
              </h3>
              <span className="text-sm text-slate-500">Civil Society Partners</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {ADVOCACY_ORGANIZATIONS.map((org) => (
                <div
                  key={org.name}
                  className="p-6 sm:p-7 rounded-3xl bg-slate-50/70 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{org.name}</span>
                    <span className="text-sm px-2.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                      {org.region}
                    </span>
                  </div>
                  <span className="block text-sm text-asean-blue font-bold">{org.focus}</span>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {org.action}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
