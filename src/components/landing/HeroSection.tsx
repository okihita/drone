"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Map,
  RefreshCw,
} from "lucide-react";
import HeroMapCanvas, { type MapLayerMode } from "./HeroMapCanvas";
import HeroCountryDossier from "./HeroCountryDossier";
import type { NewsCardItem } from "@/types";
import { getRealAseanCountries, type GeoCountryData } from "@/lib/aseanGeo";
import { getExcerpt } from "@/lib/text";

interface HeroSectionProps {
  leadStory?: NewsCardItem | null;
}

export default function HeroSection({ leadStory }: HeroSectionProps) {
  const countries = useMemo(() => getRealAseanCountries(), []);

  const [selectedCountry, setSelectedCountry] = useState<GeoCountryData | null>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayerMode>("arcs");
  const [activeTab, setActiveTab] = useState<"story" | "dossier">("story");

  const handleSelectCountry = (country: GeoCountryData) => {
    if (selectedCountry?.id === country.id) {
      setSelectedCountry(null);
      setActiveTab("story");
    } else {
      setSelectedCountry(country);
      setActiveTab("dossier");
    }
  };

  return (
    <section
      className="relative flex w-full flex-col overflow-hidden border-b border-slate-200 bg-slate-50 text-slate-900 selection:bg-asean-yellow/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
    >
      {/* ===== Main Command Center Grid: Side-by-Side (Map Unobstructed) ===== */}
      <div className="relative z-20 flex-1 px-4 py-6 sm:px-8 lg:px-12 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT COLUMN: Intelligence Brief & Jurisdiction Dossier Card (lg:col-span-6) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col">
            <div className="w-full h-full rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-xl dark:border-white/15 dark:bg-slate-950/80 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Header Tabs */}
                <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-white/10">
                  <div role="tablist" className="flex items-center gap-2">
                    <button
                      role="tab"
                      aria-selected={activeTab === "story"}
                      tabIndex={activeTab === "story" ? 0 : -1}
                      onClick={() => setActiveTab("story")}
                      className={`rounded-lg px-3 py-1.5 font-sans text-xs font-bold transition-all ${
                        activeTab === "story"
                          ? "bg-slate-100 text-slate-900 border border-slate-300 dark:bg-white/10 dark:text-white dark:border-white/20"
                          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                      }`}
                    >
                      Featured Lead Story
                    </button>
                    <button
                      role="tab"
                      aria-selected={activeTab === "dossier"}
                      tabIndex={activeTab === "dossier" ? 0 : -1}
                      onClick={() => {
                        if (!selectedCountry) setSelectedCountry(countries[0]);
                        setActiveTab("dossier");
                      }}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-sans text-xs font-bold transition-all ${
                        activeTab === "dossier"
                          ? "bg-asean-yellow/20 text-asean-yellow border border-asean-yellow/40"
                          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                      }`}
                    >
                      <span>Jurisdiction Brief</span>
                      {selectedCountry && (
                        <span className="rounded bg-asean-yellow/30 px-1.5 py-0.5 text-[10px] font-extrabold text-asean-yellow">
                          {selectedCountry.code}
                        </span>
                      )}
                    </button>
                  </div>

                  {selectedCountry && activeTab === "dossier" && (
                    <button
                      onClick={() => {
                        setSelectedCountry(null);
                        setActiveTab("story");
                      }}
                      className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* Tab 1: Lead Story */}
                {activeTab === "story" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <span className="inline-block rounded border border-asean-red/50 bg-asean-red/15 px-2.5 py-0.5 font-sans text-[10px] font-extrabold uppercase tracking-[0.2em] text-asean-red">
                        Intelligence Brief
                      </span>
                      <span className="text-xs text-slate-500 font-sans">Primary Source Verified</span>
                    </div>

                    <h1 className="font-serif-editorial text-2xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
                      {leadStory?.title ?? "Research and data to safeguard digital rights across Southeast Asia."}
                    </h1>

                    {leadStory ? (
                      <div className="space-y-2 font-sans">
                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <span className="font-bold uppercase text-asean-yellow">{leadStory.category}</span>
                          <span>·</span>
                          <span>{leadStory.read_time}</span>
                          {leadStory.author && (
                            <>
                              <span>·</span>
                              <span>By <strong className="text-slate-800 dark:text-slate-200">{leadStory.author}</strong></span>
                            </>
                          )}
                        </div>
                        <p className="border-l-2 border-asean-red/60 pl-3 font-serif-editorial text-sm italic text-slate-700 dark:text-slate-300 sm:text-base">
                          {getExcerpt(leadStory.summary, 220)}
                        </p>
                      </div>
                    ) : (
                      <p className="border-l-2 border-asean-red/60 pl-3 font-serif-editorial text-sm italic text-slate-700 dark:text-slate-300 sm:text-base">
                        Independent, source-verified investigative reporting translating dense digital trade negotiations, data localization decrees, and AI governance policies across 11 Southeast Asian nations.
                      </p>
                    )}
                  </div>
                )}

                {/* Tab 2: Jurisdiction Dossier */}
                {activeTab === "dossier" && (
                  <div>
                    {selectedCountry ? (
                      <HeroCountryDossier country={selectedCountry} />
                    ) : (
                      <div className="py-8 text-center font-sans text-xs text-slate-500 dark:text-slate-400">
                        Click any country on the map to inspect its jurisdiction dossier.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action buttons at bottom of card */}
              {activeTab === "story" && (
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10 mt-6">
                  {leadStory ? (
                    <Link
                      href={leadStory.slug ? `/investigations/${leadStory.slug}` : `/investigations/id/${leadStory.id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-asean-red px-4 py-2 font-sans text-xs font-bold text-white shadow-xs transition-all hover:bg-asean-red/90"
                    >
                      <span>Read Full Investigation</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <Link
                      href="/investigations"
                      className="inline-flex items-center gap-2 rounded-lg bg-asean-red px-4 py-2 font-sans text-xs font-bold text-white shadow-xs transition-all hover:bg-asean-red/90"
                    >
                      <span>Browse Investigations</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  <Link
                    href="/observatory"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 font-sans text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
                  >
                    <Map className="h-3.5 w-3.5 text-asean-yellow" />
                    <span>Observatory Map →</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated Unobstructed Interactive Map Viewport (lg:col-span-6) */}
          <div className="relative min-h-[380px] sm:min-h-[620px] lg:min-h-[700px] xl:min-h-[760px] lg:col-span-6 xl:col-span-6 rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-white/15 dark:bg-slate-950/90 overflow-hidden">
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
