"use client";

import React, { useState } from "react";
import {
  Globe,
  ShoppingBag,
  CreditCard,
  Cpu,
  Shield,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Lock,
} from "lucide-react";
import {
  DEFA_CHAPTERS,
  REALISTIC_COUNTRY_PROFILES,
  type DefaChapterStatus,
} from "@/lib/defaData";
import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";

const FLAG_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  SG, VN, ID, TH, MY, PH, MM, KH, LA, BN, TL,
};

const CHAPTER_ICON_MAP = {
  Globe,
  ShoppingBag,
  CreditCard,
  Cpu,
  Shield,
  Award,
};

const STATUS_CONFIG: Record<
  DefaChapterStatus["status"],
  { badgeClass: string; dotClass: string; icon: React.ComponentType<{ className?: string }> }
> = {
  "Active Ratification": {
    badgeClass: "bg-asean-emerald/15 text-asean-emerald border-asean-emerald/40",
    dotClass: "bg-asean-emerald",
    icon: CheckCircle2,
  },
  "Under Negotiation": {
    badgeClass: "bg-asean-blue/15 text-blue-600 dark:text-blue-400 border-asean-blue/40",
    dotClass: "bg-asean-blue",
    icon: FileText,
  },
  "Draft Annex": {
    badgeClass: "bg-asean-amber/15 text-asean-amber border-asean-amber/40",
    dotClass: "bg-asean-amber",
    icon: AlertTriangle,
  },
  "Strict Safeguards": {
    badgeClass: "bg-asean-red/15 text-asean-red border-asean-red/40",
    dotClass: "bg-asean-red",
    icon: Lock,
  },
};

export default function DefaChapterTracker() {
  const [selectedChapterId, setSelectedChapterId] = useState<string>("all");
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

  const activeChapter = DEFA_CHAPTERS.find((c) => c.id === selectedChapterId);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800 font-sans">
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-asean-yellow font-bold mb-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-asean-yellow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-asean-yellow" />
            </span>
            Interactive DEFA Agreement Matrix
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ASEAN DEFA Chapter Ratification Radar
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl font-sans">
            Real-time compliance telemetry mapping all 11 ASEAN member states across key Digital Economy Framework Agreement (DEFA) negotiation pillars.
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-sans font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-xl shadow-xs">
          {(Object.keys(STATUS_CONFIG) as Array<DefaChapterStatus["status"]>).map((st) => (
            <span key={st} className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px]">
              <span className={`h-2 w-2 rounded-full ${STATUS_CONFIG[st].dotClass}`} />
              <span className="text-slate-700 dark:text-slate-300">{st}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Chapter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        <button
          onClick={() => setSelectedChapterId("all")}
          className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
            selectedChapterId === "all"
              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-md"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800"
          }`}
        >
          <Globe className="h-3.5 w-3.5" />
          <span>All 6 Chapters</span>
        </button>

        {DEFA_CHAPTERS.map((ch) => {
          const IconComp = CHAPTER_ICON_MAP[ch.icon as keyof typeof CHAPTER_ICON_MAP] || Globe;
          const isSelected = selectedChapterId === ch.id;

          return (
            <button
              key={ch.id}
              onClick={() => setSelectedChapterId(ch.id)}
              className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                isSelected
                  ? "bg-asean-yellow text-slate-950 shadow-md shadow-asean-yellow/20"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800"
              }`}
            >
              <IconComp className="h-3.5 w-3.5" />
              <span>{ch.name}</span>
            </button>
          );
        })}
      </div>

      {/* Matrix Table Card */}
      <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Member State</th>
                <th className="py-3 px-3 font-bold">Regime Posture</th>
                {selectedChapterId === "all" ? (
                  DEFA_CHAPTERS.map((ch) => (
                    <th key={ch.id} className="py-3 px-3 font-bold text-center">
                      {ch.name.split(" ")[0]}
                    </th>
                  ))
                ) : (
                  <th className="py-3 px-4 font-bold">
                    {activeChapter?.name} Status &amp; Policy Alignment
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {REALISTIC_COUNTRY_PROFILES.map((country) => {
                const Flag = FLAG_ICONS[country.code];
                const isSelectedRow = selectedCountryCode === country.code;

                return (
                  <tr
                    key={country.id}
                    onClick={() =>
                      setSelectedCountryCode(
                        selectedCountryCode === country.code ? null : country.code
                      )
                    }
                    className={`cursor-pointer transition-colors ${
                      isSelectedRow
                        ? "bg-asean-yellow/10 dark:bg-asean-yellow/15"
                        : "hover:bg-slate-50 dark:hover:bg-slate-900/40"
                    }`}
                  >
                    {/* Country Cell */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        {Flag && <Flag className="w-5 h-3.5 rounded-xs object-cover shadow-xs" />}
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{country.name}</span>
                            <span className="font-mono text-[10px] text-slate-400">
                              [{country.code}]
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {country.capital}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Regime Posture Badge */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold border ${
                          country.regimeType === "Strict Localization"
                            ? "bg-asean-red/15 text-asean-red border-asean-red/30"
                            : country.regimeType === "Hybrid"
                            ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
                            : "bg-asean-yellow/15 text-asean-yellow border-asean-yellow/30"
                        }`}
                      >
                        {country.regimeType}
                      </span>
                    </td>

                    {/* Chapter Status Columns */}
                    {selectedChapterId === "all" ? (
                      DEFA_CHAPTERS.map((ch) => {
                        const status = country.chapters[ch.id] ?? "Under Negotiation";
                        const cfg = STATUS_CONFIG[status];
                        const IconComponent = cfg.icon;

                        return (
                          <td key={ch.id} className="py-3.5 px-3 text-center whitespace-nowrap">
                            <span
                              className={`inline-flex items-center justify-center gap-1 rounded-md px-2 py-1 text-[10px] font-bold border ${cfg.badgeClass}`}
                              title={`${country.name} — ${ch.name}: ${status}`}
                            >
                              <IconComponent className="h-3 w-3" />
                              <span className="hidden xl:inline">{status.split(" ")[0]}</span>
                            </span>
                          </td>
                        );
                      })
                    ) : (
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {(() => {
                            const status = country.chapters[selectedChapterId] ?? "Under Negotiation";
                            const cfg = STATUS_CONFIG[status];
                            const IconComponent = cfg.icon;
                            return (
                              <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold border ${cfg.badgeClass}`}>
                                <IconComponent className="h-3.5 w-3.5" />
                                <span>{status}</span>
                              </span>
                            );
                          })()}
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {country.keyLegislation}
                          </span>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Summary Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 px-4 py-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              DEFA Progress Index:
            </span>
            <span className="text-asean-emerald font-bold">38% Ratified</span>
            <span>·</span>
            <span className="text-blue-500 font-bold">42% In Negotiation</span>
            <span>·</span>
            <span className="text-asean-amber font-bold">12% Draft Annex</span>
            <span>·</span>
            <span className="text-asean-red font-bold">8% Strict Safeguards</span>
          </div>
          <div className="font-mono text-[10px] text-slate-400">
            Source: ASEAN Secretariat SEOM DEFA Ingestion Feeds
          </div>
        </div>
      </div>
    </section>
  );
}
