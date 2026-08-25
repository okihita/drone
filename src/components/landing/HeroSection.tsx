"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Map,
  Shield,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import HeroMapCanvas, { type MapLayerMode } from "./HeroMapCanvas";
import { getRealAseanCountries, type GeoCountryData } from "@/lib/aseanGeo";
import { FLAG_COMPONENTS } from "@/lib/flags";

export default function HeroSection() {
  const countries = useMemo(() => getRealAseanCountries(), []);
  const [selectedCountry, setSelectedCountry] = useState<GeoCountryData | null>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayerMode>("arcs");

  const handleSelectCountry = (country: GeoCountryData) => {
    setSelectedCountry((prev) => (prev?.id === country.id ? null : country));
  };

  const FlagIcon = selectedCountry ? FLAG_COMPONENTS[selectedCountry.code] : null;

  return (
    <section className="relative flex w-full flex-col overflow-hidden border-b border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
      <div className="relative z-20 flex-1 px-4 py-6 sm:px-8 lg:px-12 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT COLUMN: High Impact, Punchy SaaS Command Terminal */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
            <div className="w-full h-full rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-xl dark:border-white/15 dark:bg-slate-950/80 sm:p-7 flex flex-col justify-between">
              <div>
                {/* Header Tag */}
                <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-asean-yellow/50 bg-asean-yellow/15 px-2.5 py-0.5 font-sans text-[10px] font-extrabold uppercase tracking-wider text-asean-yellow">
                      <span className="h-1.5 w-1.5 rounded-full bg-asean-yellow animate-pulse" />
                      Live Observatory
                    </span>
                    <span className="text-[11px] font-sans text-slate-500">11 ASEAN States</span>
                  </div>

                  {selectedCountry && (
                    <button
                      onClick={() => setSelectedCountry(null)}
                      className="text-[11px] font-sans font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                      Reset View &times;
                    </button>
                  )}
                </div>

                {/* Country Active Dossier View OR Punchy Hero Title */}
                {selectedCountry ? (
                  <div className="space-y-3.5 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {FlagIcon && <FlagIcon className="w-6 h-4.5 rounded-xs object-cover shadow-xs" />}
                        <div>
                          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-none">
                            {selectedCountry.name}
                          </h2>
                          <span className="font-sans text-[11px] text-slate-500">
                            {selectedCountry.capital} · ISO {selectedCountry.code}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-sans text-[10px] font-bold ${
                          selectedCountry.regimeType === "Strict Localization"
                            ? "bg-asean-red/20 text-asean-red border border-asean-red/40"
                            : selectedCountry.regimeType === "Hybrid"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                            : "bg-asean-yellow/20 text-asean-yellow border border-asean-yellow/40"
                        }`}
                      >
                        {selectedCountry.regimeType}
                      </span>
                    </div>

                    {/* Stat Badges */}
                    <div className="grid grid-cols-3 gap-2 font-sans text-xs">
                      <div className="rounded-xl border border-slate-200 bg-slate-100/80 p-2.5 dark:border-white/10 dark:bg-white/5">
                        <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold">Threat</span>
                        <span className="font-extrabold text-asean-yellow flex items-center gap-1 text-sm">
                          <AlertTriangle className="h-3 w-3" />
                          {selectedCountry.threatScore}/5
                        </span>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-100/80 p-2.5 dark:border-white/10 dark:bg-white/5">
                        <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold">Policies</span>
                        <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                          {selectedCountry.activePoliciesCount} Ingested
                        </span>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-100/80 p-2.5 dark:border-white/10 dark:bg-white/5">
                        <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold">Status</span>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">
                          {selectedCountry.activityLevel.split(" ")[0]}
                        </span>
                      </div>
                    </div>

                    {/* Compact Highlight Box */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 font-sans text-xs dark:border-white/10 dark:bg-slate-900/70 space-y-1.5">
                      <div className="flex items-baseline justify-between">
                        <span className="font-bold text-slate-900 dark:text-white">Primary Act</span>
                        <span className="text-[10px] text-asean-yellow font-semibold">{selectedCountry.keyLegislation.split("&")[0]}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {selectedCountry.dataFlowPolicy}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={selectedCountry.primaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <Link
                        href="/observatory"
                        className="inline-flex items-center gap-1 rounded-lg bg-asean-yellow px-3 py-1 font-sans text-xs font-bold text-slate-950 shadow-xs transition-colors hover:bg-asean-yellow-hover"
                      >
                        <span>Full Dossier</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fadeIn">
                    <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.1] text-slate-900 dark:text-white">
                      Southeast Asia Digital Rights Observatory
                    </h1>

                    <p className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                      Real-time intelligence on digital trade agreements, cross-border data localization laws, and AI governance across 11 Southeast Asian nations.
                    </p>

                    {/* Stat Badges */}
                    <div className="grid grid-cols-3 gap-2.5 pt-1 font-sans">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-white/10 dark:bg-white/5 text-center">
                        <span className="block text-[10px] uppercase font-bold text-slate-500">States</span>
                        <span className="text-xl font-extrabold text-slate-900 dark:text-white">11</span>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-white/10 dark:bg-white/5 text-center">
                        <span className="block text-[10px] uppercase font-bold text-slate-500">Decrees</span>
                        <span className="text-xl font-extrabold text-asean-yellow">100+</span>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-white/10 dark:bg-white/5 text-center">
                        <span className="block text-[10px] uppercase font-bold text-slate-500">Sources</span>
                        <span className="text-xl font-extrabold text-asean-emerald">100%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-200 dark:border-white/10 mt-6 font-sans">
                <Link
                  href="/observatory"
                  className="inline-flex items-center gap-2 rounded-xl bg-asean-yellow px-4 py-2.5 font-sans text-xs font-bold text-slate-950 shadow-xs transition-all hover:bg-asean-yellow-hover"
                >
                  <Map className="h-4 w-4" />
                  <span>Launch Observatory</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href="/ledger"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 font-sans text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
                >
                  <Search className="h-3.5 w-3.5 text-asean-red" />
                  <span>Search Ledger</span>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated Unobstructed Interactive Map Viewport (lg:col-span-7) */}
          <div className="relative min-h-[400px] sm:min-h-[560px] lg:min-h-[580px] lg:col-span-7 xl:col-span-7 rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-white/15 dark:bg-slate-950/90 overflow-hidden">
            <HeroMapCanvas
              activeCountry={selectedCountry}
              onSelectCountry={handleSelectCountry}
              activeLayer={activeLayer}
              onSelectLayer={setActiveLayer}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
