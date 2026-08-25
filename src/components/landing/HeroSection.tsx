"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Map,
  Shield,
  Search,
} from "lucide-react";
import HeroMapCanvas, { type MapLayerMode } from "./HeroMapCanvas";
import HeroCountryDossier from "./HeroCountryDossier";
import { getRealAseanCountries, type GeoCountryData } from "@/lib/aseanGeo";

export default function HeroSection() {
  const countries = useMemo(() => getRealAseanCountries(), []);

  // Default to Indonesia (or first ASEAN country) for immediate interactivity, or null for regional view
  const [selectedCountry, setSelectedCountry] = useState<GeoCountryData | null>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayerMode>("arcs");

  const handleSelectCountry = (country: GeoCountryData) => {
    if (selectedCountry?.id === country.id) {
      setSelectedCountry(null);
    } else {
      setSelectedCountry(country);
    }
  };

  const postureStats = useMemo(() => {
    return {
      total: countries.length,
      open: countries.filter((c) => c.regimeType === "Open Transfer").length,
      hybrid: countries.filter((c) => c.regimeType === "Hybrid").length,
      strict: countries.filter((c) => c.regimeType === "Strict Localization").length,
      totalActs: countries.reduce((acc, c) => acc + c.activePoliciesCount, 0),
    };
  }, [countries]);

  return (
    <section className="relative flex w-full flex-col overflow-hidden border-b border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
      {/* ===== Main Command Center Grid: Side-by-Side (Map Unobstructed) ===== */}
      <div className="relative z-20 flex-1 px-4 py-6 sm:px-8 lg:px-12 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT COLUMN: Mission & Interactive Jurisdiction Terminal (lg:col-span-6) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col">
            <div className="w-full h-full rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-xl dark:border-white/15 dark:bg-slate-950/80 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Status Indicator */}
                <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded border border-asean-yellow/50 bg-asean-yellow/15 px-2.5 py-0.5 font-sans text-[10px] font-extrabold uppercase tracking-[0.2em] text-asean-yellow">
                      Policy Observatory
                    </span>
                    <span className="text-xs text-slate-500 font-sans">Southeast Asia Digital Rights</span>
                  </div>

                  {selectedCountry && (
                    <button
                      onClick={() => setSelectedCountry(null)}
                      className="text-[11px] font-sans font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                      View Regional Overview &rarr;
                    </button>
                  )}
                </div>

                {/* Country Dossier Active View or Regional Mission View */}
                {selectedCountry ? (
                  <div className="animate-fadeIn">
                    <HeroCountryDossier country={selectedCountry} />
                  </div>
                ) : (
                  <div className="space-y-4 animate-fadeIn">
                    <h1 className="font-serif-editorial text-2xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
                      Tracking digital trade treaties, data sovereignty, and AI rights across Southeast Asia.
                    </h1>

                    <p className="border-l-2 border-asean-yellow/60 pl-3 font-serif-editorial text-sm italic text-slate-700 dark:text-slate-300 sm:text-base leading-relaxed">
                      D.R.O.N.E. translates complex digital trade treaties, cross-border data transfer laws, and algorithmic governance policies into source-verified intelligence for regional advocates.
                    </p>

                    {/* Regional Quick Metrics */}
                    <div className="grid grid-cols-3 gap-3 pt-2 font-sans">
                      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5">
                        <span className="block text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                          Jurisdictions
                        </span>
                        <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                          {postureStats.total} States
                        </span>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5">
                        <span className="block text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                          Ingested Acts
                        </span>
                        <span className="text-lg sm:text-xl font-extrabold text-asean-yellow">
                          {postureStats.totalActs}+ Decrees
                        </span>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5">
                        <span className="block text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                          Verification
                        </span>
                        <span className="text-lg sm:text-xl font-extrabold text-asean-emerald">
                          100% Primary
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-900/60 font-sans text-xs text-slate-600 dark:text-slate-400">
                      <strong className="text-slate-800 dark:text-slate-200 block mb-1">
                        Interactive Cartography Tip:
                      </strong>
                      Click any country or data arc on the map to inspect its real-time digital trade dossier, data localization mandates, and civil society threat score.
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons at bottom of card */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10 mt-6 font-sans">
                <Link
                  href="/observatory"
                  className="inline-flex items-center gap-2 rounded-lg bg-asean-yellow px-4 py-2 font-sans text-xs font-bold text-slate-950 shadow-xs transition-all hover:bg-asean-yellow-hover"
                >
                  <Map className="h-4 w-4" />
                  <span>Launch Full Observatory</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href="/d2d/benchmark"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3.5 py-2 font-sans text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
                >
                  <Shield className="h-3.5 w-3.5 text-asean-blue" />
                  <span>D2D Benchmark</span>
                </Link>

                <Link
                  href="/ledger"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3.5 py-2 font-sans text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
                >
                  <Search className="h-3.5 w-3.5 text-asean-red" />
                  <span>Policy Ledger</span>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated Unobstructed Interactive Map Viewport (lg:col-span-6) */}
          <div className="relative min-h-[380px] sm:min-h-[620px] lg:min-h-[660px] xl:min-h-[700px] lg:col-span-6 xl:col-span-6 rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-white/15 dark:bg-slate-950/90 overflow-hidden">
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
