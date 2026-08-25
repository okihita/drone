"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Map,
  Search,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import HeroMapCanvas, { type MapLayerMode } from "./HeroMapCanvas";
import type { GeoCountryData } from "@/lib/aseanGeo";
import { FLAG_COMPONENTS } from "@/lib/flags";

export default function HeroSection() {
  const [selectedCountry, setSelectedCountry] = useState<GeoCountryData | null>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayerMode>("arcs");

  const handleSelectCountry = (country: GeoCountryData) => {
    setSelectedCountry((prev) => (prev?.id === country.id ? null : country));
  };

  const FlagIcon = selectedCountry ? FLAG_COMPONENTS[selectedCountry.code] : null;

  return (
    <section className="relative w-full border-b border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white pt-12 pb-14 sm:pt-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP: Centered High-Impact SaaS Hero Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-asean-yellow/40 bg-asean-yellow/10 px-3 py-1 font-sans text-xs font-bold text-asean-yellow">
            <span className="h-2 w-2 rounded-full bg-asean-yellow animate-pulse" />
            11 Southeast Asian Member States Live
          </div>

          <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            Digital Rights Observatory for Southeast Asia
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real-time policy intelligence on cross-border data localization, digital trade treaties, and AI governance.
          </p>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-sans">
            <Link
              href="/observatory"
              className="inline-flex items-center gap-2 rounded-xl bg-asean-yellow px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-xs transition-all hover:bg-asean-yellow-hover"
            >
              <Map className="h-4 w-4" />
              <span>Launch Observatory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/ledger"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-white/15 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Search className="h-4 w-4 text-asean-red" />
              <span>Search 100+ Acts</span>
            </Link>
          </div>
        </div>

        {/* BOTTOM: Large Central Interactive Radar Map & Live Dossier Floating Bar */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-white/80 shadow-md dark:border-white/15 dark:bg-slate-950/80 overflow-hidden min-h-[480px] sm:min-h-[620px] lg:min-h-[700px]">
          
          {/* Real Interactive Map Canvas */}
          <HeroMapCanvas
            activeCountry={selectedCountry}
            onSelectCountry={handleSelectCountry}
            activeLayer={activeLayer}
            onSelectLayer={setActiveLayer}
          />

          {/* Floating Selected Country Dossier Card (Top-Left of Map) */}
          {selectedCountry && (
            <div className="absolute top-4 left-4 z-40 w-full max-w-sm rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-5 shadow-xl backdrop-blur-md dark:border-white/20 dark:bg-slate-950/90 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  {FlagIcon && <FlagIcon className="w-6 h-4.5 rounded-xs object-cover shadow-xs" />}
                  <div>
                    <h3 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white leading-none">
                      {selectedCountry.name}
                    </h3>
                    <span className="text-[11px] font-sans text-slate-500">
                      {selectedCountry.capital} · ISO {selectedCountry.code}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="text-slate-400 hover:text-slate-800 dark:hover:text-white text-base font-bold p-1 leading-none"
                  aria-label="Close dossier"
                >
                  &times;
                </button>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-2 font-sans mb-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-white/5 text-center">
                  <span className="block text-[9px] uppercase font-bold text-slate-500">Threat</span>
                  <span className="font-extrabold text-asean-yellow text-xs flex items-center justify-center gap-0.5">
                    <AlertTriangle className="h-3 w-3" />
                    {selectedCountry.threatScore}/5
                  </span>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-white/5 text-center">
                  <span className="block text-[9px] uppercase font-bold text-slate-500">Regime</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-[10px] truncate block">
                    {selectedCountry.regimeType.split(" ")[0]}
                  </span>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-white/5 text-center">
                  <span className="block text-[9px] uppercase font-bold text-slate-500">Policies</span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs">
                    {selectedCountry.activePoliciesCount} Ingested
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <a
                  href={selectedCountry.primaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <span>Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <Link
                  href="/observatory"
                  className="inline-flex items-center gap-1 rounded-lg bg-asean-yellow px-3 py-1 font-sans text-xs font-bold text-slate-950 shadow-xs transition-colors hover:bg-asean-yellow-hover"
                >
                  <span>Full Profile</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
