"use client";

import React, { useRef, useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  ShieldCheck,
  Map,
  Activity,
  Layers,
  AlertTriangle,
  RefreshCw,
  Zap,
} from "lucide-react";
import HeroMapCanvas, { type MapLayerMode } from "./HeroMapCanvas";
import HeroCountryDossier from "./HeroCountryDossier";
import SignalTicker from "./SignalTicker";
import type { NewsCardItem } from "@/types";
import { getRealAseanCountries, type GeoCountryData } from "@/lib/aseanGeo";
import { getExcerpt } from "@/lib/text";

interface HeroSectionProps {
  leadStory?: NewsCardItem | null;
}

export default function HeroSection({ leadStory }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
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
      ref={sectionRef}
      className="relative flex min-h-[88vh] w-full flex-col overflow-hidden border-b border-slate-800 bg-slate-950 text-white selection:bg-asean-yellow/30"
    >
      {/* Top Command Center HUD Bar */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/80 px-4 py-2.5 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-3 text-[11px] font-sans">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-asean-yellow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-asean-yellow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-asean-yellow" />
            </span>
            <span>Cartographic Observatory</span>
          </span>
          <span className="hidden text-slate-700 sm:inline">|</span>
          <span className="hidden items-center gap-1 text-slate-400 sm:flex">
            <Globe className="h-3 w-3 text-slate-500" />
            <span>11 Member States</span>
          </span>
          <span className="hidden text-slate-700 md:inline">|</span>
          <span className="hidden items-center gap-1 text-slate-400 md:flex">
            <Activity className="h-3 w-3 text-asean-yellow" />
            <span>DEFA Status: <strong className="text-white">Active Negotiations</strong></span>
          </span>
        </div>

        {/* Map Layer Switcher */}
        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-slate-900/90 p-1 font-sans text-xs">
          <span className="hidden items-center gap-1 px-2 text-[10px] uppercase tracking-wider text-slate-400 lg:flex">
            <Layers className="h-3 w-3 text-slate-500" /> Layer:
          </span>
          <button
            onClick={() => setActiveLayer("arcs")}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition-all ${
              activeLayer === "arcs"
                ? "bg-asean-yellow text-slate-950 shadow-md shadow-asean-yellow/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Zap className="h-3 w-3" />
            <span>Data Flow Arcs</span>
          </button>
          <button
            onClick={() => setActiveLayer("threat")}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition-all ${
              activeLayer === "threat"
                ? "bg-asean-red text-white shadow-md shadow-asean-red/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <AlertTriangle className="h-3 w-3" />
            <span>Threat Matrix</span>
          </button>
          <button
            onClick={() => setActiveLayer("regime")}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition-all ${
              activeLayer === "regime"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <ShieldCheck className="h-3 w-3" />
            <span>Regimes</span>
          </button>
        </div>
      </div>

      {/* Living Map Canvas */}
      <HeroMapCanvas
        activeCountry={selectedCountry}
        onSelectCountry={handleSelectCountry}
        activeLayer={activeLayer}
      />

      {/* Vignette Scrims */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/20 lg:w-3/5" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-slate-950 to-transparent" />

      {/* Main Dual-Pane HUD Content */}
      <div className="relative z-20 flex flex-1 flex-col justify-between px-4 py-6 sm:px-8 lg:px-12 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 xl:col-span-6 space-y-4">
            <div className="w-full rounded-2xl border border-white/15 bg-slate-950/75 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-8">
              {/* Header Tabs */}
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("story")}
                    className={`rounded-lg px-3 py-1.5 font-sans text-xs font-bold transition-all ${
                      activeTab === "story"
                        ? "bg-white/10 text-white border border-white/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Featured Lead Story
                  </button>
                  <button
                    onClick={() => {
                      if (!selectedCountry) setSelectedCountry(countries[0]);
                      setActiveTab("dossier");
                    }}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-sans text-xs font-bold transition-all ${
                      activeTab === "dossier"
                        ? "bg-asean-yellow/20 text-asean-yellow border border-asean-yellow/40"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span>Jurisdiction Brief</span>
                    {selectedCountry && (
                      <span className="rounded bg-asean-yellow/30 px-1.5 py-0.2 text-[10px] font-extrabold text-asean-yellow">
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
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
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

                  <h1 className="font-serif-editorial text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                    {leadStory?.title ?? "Research and data to safeguard digital rights across Southeast Asia."}
                  </h1>

                  {leadStory ? (
                    <div className="space-y-2 font-sans">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-bold uppercase text-asean-yellow">{leadStory.category}</span>
                        <span>·</span>
                        <span>{leadStory.read_time}</span>
                        {leadStory.author && (
                          <>
                            <span>·</span>
                            <span>By <strong className="text-slate-200">{leadStory.author}</strong></span>
                          </>
                        )}
                      </div>
                      <p className="border-l-2 border-asean-red/60 pl-3 font-serif-editorial text-sm italic text-slate-300 sm:text-base">
                        {getExcerpt(leadStory.summary, 220)}
                      </p>
                    </div>
                  ) : (
                    <p className="border-l-2 border-asean-red/60 pl-3 font-serif-editorial text-sm italic text-slate-300 sm:text-base">
                      Independent, source-verified investigative reporting translating dense digital trade negotiations, data localization decrees, and AI governance policies across 11 Southeast Asian nations.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {leadStory ? (
                      <Link
                        href={leadStory.slug ? `/investigations/${leadStory.slug}` : `/investigations/id/${leadStory.id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-asean-red px-4 py-2 font-sans text-xs font-bold text-white shadow-lg shadow-asean-red/30 transition-all hover:bg-asean-red/90"
                      >
                        <span>Read Full Investigation</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <Link
                        href="/investigations"
                        className="inline-flex items-center gap-2 rounded-lg bg-asean-red px-4 py-2 font-sans text-xs font-bold text-white shadow-lg shadow-asean-red/30 transition-all hover:bg-asean-red/90"
                      >
                        <span>Browse Investigations</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                    <Link
                      href="/observatory"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-sans text-xs font-semibold text-slate-300 transition-colors hover:border-white/20 hover:text-white"
                    >
                      <Map className="h-3.5 w-3.5 text-asean-yellow" />
                      <span>Full Cartographic Observatory →</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Tab 2: Jurisdiction Dossier */}
              {activeTab === "dossier" && (
                <div>
                  {selectedCountry ? (
                    <HeroCountryDossier country={selectedCountry} />
                  ) : (
                    <div className="py-8 text-center font-sans text-xs text-slate-400">
                      Click any country on the map or nation strip below to inspect its jurisdiction dossier.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 pointer-events-none" />
        </div>

        {/* Hotspot Ribbon */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Interactive Jurisdiction Selector — Click Nation to Focus &amp; Inspect
            </span>
            <span className="hidden sm:inline-block font-sans text-[10px] text-slate-500">
              High-Precision Natural Earth Cartography
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar font-sans">
            {countries.map((c) => {
              const isSelected = selectedCountry?.id === c.id;

              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectCountry(c)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-all ${
                    isSelected
                      ? "border-asean-yellow bg-asean-yellow/20 text-asean-yellow shadow-lg shadow-asean-yellow/10"
                      : "border-white/10 bg-slate-900/70 text-slate-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-70">[{c.code}]</span>
                  <span>{c.name}</span>
                  {c.threatScore >= 4 && (
                    <span className="h-1.5 w-1.5 rounded-full bg-asean-red animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-20">
        <SignalTicker />
      </div>
    </section>
  );
}
