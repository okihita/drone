"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, ExternalLink, ChevronRight } from "lucide-react";
import type { GeoCountryData } from "@/lib/aseanGeo";

interface HeroCountryDossierProps {
  country: GeoCountryData;
}

export default function HeroCountryDossier({ country }: HeroCountryDossierProps) {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 font-sans text-xs text-slate-500 dark:text-slate-400">
            <span className="font-mono text-asean-yellow font-bold">[{country.code}]</span>
            <span>Capital: <strong>{country.capital}</strong></span>
          </div>
          <h2 className="font-serif-editorial text-3xl font-extrabold text-slate-900 dark:text-white">
            {country.name}
          </h2>
        </div>
        <span
          className={`rounded-lg px-3 py-1 font-sans text-xs font-bold ${
            country.regimeType === "Strict Localization"
              ? "bg-asean-red/20 text-asean-red border border-asean-red/40"
              : country.regimeType === "Hybrid"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
              : "bg-asean-yellow/20 text-asean-yellow border border-asean-yellow/40"
          }`}
        >
          {country.regimeType}
        </span>
      </div>

      {/* Mini Stats Bar */}
      <div className="grid grid-cols-3 gap-2 font-sans text-xs">
        <div className="rounded-lg border border-slate-200 bg-slate-100 p-2.5 dark:border-white/10 dark:bg-white/5">
          <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase">Threat Level</span>
          <span className="font-bold text-asean-yellow flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {country.threatScore} / 5
          </span>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-100 p-2.5 dark:border-white/10 dark:bg-white/5">
          <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase">Active Policies</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {country.activePoliciesCount} Ingested
          </span>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-100 p-2.5 dark:border-white/10 dark:bg-white/5">
          <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase">Activity</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {country.activityLevel}
          </span>
        </div>
      </div>

      {/* Legislative breakdown */}
      <div className="space-y-2 font-sans text-xs">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-slate-900/60">
          <strong className="block text-asean-yellow mb-0.5">Key Legislation:</strong>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{country.keyLegislation}</p>
          <p className="mt-1 text-slate-700 dark:text-slate-300 leading-relaxed">{country.description}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-slate-900/60">
          <strong className="block text-slate-800 dark:text-slate-300 mb-0.5">Data Transfer Regime:</strong>
          <p className="text-slate-600 dark:text-slate-400">{country.dataFlowPolicy}</p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex items-center justify-between pt-1">
        <a
          href={country.primaryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-asean-yellow hover:underline font-semibold"
        >
          <span>Official Portal</span>
          <ExternalLink className="h-3 w-3" />
        </a>
        <Link
          href="/observatory"
          className="inline-flex items-center gap-1 rounded-lg bg-asean-yellow px-3 py-1.5 font-sans text-xs font-bold text-slate-950 shadow-xs transition-colors hover:bg-asean-yellow-hover"
        >
          <span>Deep-Dive Profile</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
