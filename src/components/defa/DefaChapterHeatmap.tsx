"use client";

import React, { useState } from "react";
import { DEFA_CHAPTERS, getDefaChapterStatuses } from "@/services/defa";
import { ASEAN_MEMBER_STATES, ASEANCountryCode } from "@/lib/countries";
import { DefaRatificationStatus } from "@/types/defa";
import { FileText, CheckCircle2, AlertTriangle, Clock, Lock, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";

export default function DefaChapterHeatmap() {
  const statuses = getDefaChapterStatuses();
  const [selectedCell, setSelectedCell] = useState<{
    countryCode: ASEANCountryCode;
    chapterId: string;
  } | null>(null);

  const getCellStatus = (code: ASEANCountryCode, chapterId: string) => {
    return statuses.find((s) => s.countryCode === code && s.chapterId === chapterId);
  };

  const getStatusBadge = (status?: DefaRatificationStatus) => {
    switch (status) {
      case "CONCLUDED":
        return {
          label: "Concluded",
          className: "bg-asean-emerald/15 text-asean-emerald border-asean-emerald/40",
          icon: CheckCircle2,
        };
      case "LEGAL_SCRUBBING":
        return {
          label: "Legal Scrubbing",
          className: "bg-asean-blue/15 text-asean-blue border-asean-blue/40",
          icon: Clock,
        };
      case "PROVISIONAL_RESERVATION":
        return {
          label: "Provisional Reservation",
          className: "bg-asean-amber/15 text-asean-amber border-asean-amber/40",
          icon: AlertTriangle,
        };
      case "PENDING_CONSULTATION":
      default:
        return {
          label: "Pending Consultation",
          className: "bg-asean-red/15 text-asean-red border-asean-red/40",
          icon: Lock,
        };
    }
  };

  const activeStatus = selectedCell ? getCellStatus(selectedCell.countryCode, selectedCell.chapterId) : null;
  const activeChapter = selectedCell ? DEFA_CHAPTERS.find((c) => c.id === selectedCell.chapterId) : null;
  const activeCountry = selectedCell ? ASEAN_MEMBER_STATES.find((m) => m.code === selectedCell.countryCode) : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans">
      {/* SEOM Manila Legal Scrubbing Hero Banner */}
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0 text-xs font-sans uppercase tracking-widest text-asean-yellow font-bold mb-2">
                <Sparkles className="h-4 w-4 text-asean-amber animate-pulse" />
                <span>DEFA Observatory · SEOM Telemetry</span>
                <span className="hidden sm:inline">·</span>
                <span className="text-slate-500 font-mono">July 2026 Legal Scrubbing</span>
              </div>
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                DEFA 9-Chapter Ratification Telemetry Matrix
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-sans leading-relaxed">
                Following the conclusion of official text negotiations at the 57th Senior Economic Officials Meeting (SEOM) in Manila (May 2026), DEFA has entered its critical <strong className="text-slate-800 dark:text-slate-200">Legal Scrubbing</strong> phase. This telemetry matrix maps the ratification and legal alignment of all 11 ASEAN member states across DEFA’s 9 core chapters—tracking progress toward formal treaty execution at the 49th ASEAN Summit in November 2026.
              </p>
            </div>

            {/* SEOM Manila Progress Widget */}
            <div className="shrink-0 p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-sans space-y-3 min-w-[280px]">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px]">Legal Scrubbing Phase</span>
                <span className="font-bold text-asean-blue font-mono text-xs">82% Complete</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-asean-blue via-asean-emerald to-asean-yellow w-[82%]" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-700">
                <span>SEOM Manila: May 2026</span>
                <span className="font-bold text-slate-900 dark:text-white">Signing: Nov 2026</span>
              </div>
            </div>
          </div>

          {/* 5 DEFA Dimension Concept Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            {[
              { title: "Paperless Customs", desc: "Eliminating paper customs docs and standardizing cross-border e-signatures." },
              { title: "Data Flows (DFFT)", desc: "Enabling Data Free Flow with Trust while restricting domestic server mandates." },
              { title: "Cybersecurity & CII", desc: "Threat intelligence sharing and mandatory CERT breach reporting windows." },
              { title: "Digital Payments", desc: "Integrating Regional Payment Connectivity (RPC) and cross-border QR networks." },
              { title: "AI & Emerging Tech", desc: "Harmonizing AI safety baselines with the ASEAN Guide on AI Ethics 2024." },
            ].map((card) => (
              <div key={card.title} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-sans">
                <strong className="block text-slate-900 dark:text-white font-bold mb-1">{card.title}</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-normal">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* How to Read Guidance Note */}
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed max-w-4xl pt-1">
            <strong className="text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">How to read:</strong> Each matrix cell displays real-time legal scrubbing progress (% completion). <span className="text-asean-emerald font-bold">Green badges (100%)</span> represent concluded chapter ratifications; <span className="text-asean-blue font-bold">Blue (75–90%)</span> represent active legal scrubbing; <span className="text-asean-amber font-bold">Amber (60–70%)</span> indicate provisional reservations; <span className="text-asean-red font-bold">Red (&lt;50%)</span> signal pending domestic consultations. Click any cell for TPP text comparisons and gazette citations.
          </p>
        </div>
      </section>

      {/* Main Heatmap Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Status Filter / Legend Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-asean-blue" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Chapter Status Legend
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-sans">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold bg-asean-emerald/15 text-asean-emerald border-asean-emerald/40">
              <CheckCircle2 className="w-3 h-3" /> Concluded (100%)
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold bg-asean-blue/15 text-asean-blue border-asean-blue/40">
              <Clock className="w-3 h-3" /> Legal Scrubbing (75-90%)
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold bg-asean-amber/15 text-asean-amber border-asean-amber/40">
              <AlertTriangle className="w-3 h-3" /> Provisional Reservation (60-70%)
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold bg-asean-red/15 text-asean-red border-asean-red/40">
              <Lock className="w-3 h-3" /> Pending Consultation (&lt;50%)
            </span>
          </div>
        </div>

        {/* 11 Member State x 9 Chapter Heatmap Grid */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
          <table className="w-full border-collapse text-left text-xs font-sans min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 uppercase tracking-wider font-bold">
                <th className="p-3 sticky left-0 z-20 bg-slate-100 dark:bg-slate-950 min-w-[140px] shadow-sm">
                  ASEAN Nation
                </th>
                {DEFA_CHAPTERS.map((ch) => (
                  <th key={ch.id} className="p-3 text-center min-w-[100px] max-w-[120px]">
                    <div className="font-mono text-[10px] text-asean-blue font-bold">{ch.code}</div>
                    <div className="truncate text-[11px] font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                      {ch.shortName}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {ASEAN_MEMBER_STATES.map((country) => (
                <tr key={country.code} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 sticky left-0 z-10 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-white flex items-center gap-2 border-r border-slate-200 dark:border-slate-800">
                    <country.Flag className="w-5 h-3.5 object-cover rounded-[2px] shadow-xs" />
                    <span>{country.name}</span>
                  </td>
                  {DEFA_CHAPTERS.map((ch) => {
                    const st = getCellStatus(country.code, ch.id);
                    const badge = getStatusBadge(st?.status);
                    const isSelected = selectedCell?.countryCode === country.code && selectedCell?.chapterId === ch.id;

                    return (
                      <td key={ch.id} className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedCell({ countryCode: country.code, chapterId: ch.id })}
                          className={`w-full py-2 px-1.5 rounded-lg border flex flex-col items-center justify-center transition-all ${badge.className} ${
                            isSelected ? "ring-2 ring-asean-yellow ring-offset-2 dark:ring-offset-slate-900 scale-105 shadow-md" : "hover:scale-102"
                          }`}
                        >
                          <badge.icon className="w-3.5 h-3.5 mb-1" />
                          <span className="font-mono text-[10px] font-bold">{st?.progressPercent}%</span>
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Cell Detail Popover Drawer */}
        {selectedCell && activeChapter && activeCountry && activeStatus && (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <activeCountry.Flag className="w-6 h-4 object-cover rounded-[2px]" />
                <h3 className="font-serif-editorial text-lg font-extrabold text-slate-900 dark:text-white">
                  {activeCountry.name} — {activeChapter.code}: {activeChapter.name}
                </h3>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(activeStatus.status).className}`}>
                {getStatusBadge(activeStatus.status).label} ({activeStatus.progressPercent}%)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-500">SEOM Chapter Objective</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{activeChapter.description}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-asean-blue">TPP / International Trade Comparison</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{activeChapter.tppComparison}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-asean-amber">Gazette Citation &amp; Status Note</span>
                <p className="font-mono text-[11px] font-bold text-slate-900 dark:text-white">{activeStatus.gazetteCitation}</p>
                <p className="text-slate-600 dark:text-slate-400 mt-1">{activeStatus.notes}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
