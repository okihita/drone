"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Globe, FileText, ShieldCheck, Map } from "lucide-react";
import { getRealAseanCountries } from "@/lib/aseanGeo";
import { REGIME_FILL_COLORS } from "@/lib/constants";
import { ASEAN_COLORS } from "@/lib/colors";
import type { NewsCardItem } from "@/types";

// ── Compact SVG Map (no section chrome, just the map) ───────────────────────

function HeroMap() {
  const countries = useMemo(() => getRealAseanCountries(), []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 540 370" className="w-full h-full">
        {countries.map((country) => {
          const colors = REGIME_FILL_COLORS[country.regimeType];
          return (
            <g key={country.id} className="cursor-pointer">
              <path
                d={country.pathD}
                fill={colors?.fill ?? ASEAN_COLORS.textMutedLight}
                stroke={colors?.stroke ?? ASEAN_COLORS.borderDark}
                strokeWidth="0.75"
                className="transition-colors duration-300"
              />
              <circle
                cx={country.centerPos.x}
                cy={country.centerPos.y}
                r="3"
                fill={ASEAN_COLORS.white}
                stroke={colors?.stroke ?? ASEAN_COLORS.borderDark}
                strokeWidth="1"
              />
              <text
                x={country.centerPos.x}
                y={country.centerPos.y + 12}
                textAnchor="middle"
                fill={ASEAN_COLORS.textPrimaryLight}
                fontSize="8"
                fontWeight="bold"
                className="pointer-events-none font-sans uppercase tracking-wider fill-white"
              >
                {country.code}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

interface HeroSectionProps {
  leadStory?: NewsCardItem | null;
}

export default function HeroSection({ leadStory }: HeroSectionProps) {
  return (
    <section className="relative w-full bg-slate-900 text-white overflow-hidden min-h-[70vh] lg:min-h-[80vh] flex flex-col lg:flex-row border-b border-slate-800">
      {/* ===== LEFT: Investigative Dossier ===== */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16 space-y-6 lg:max-w-[55%]">
        {/* Classified badge */}
        <div className="animate-reveal">
          <span className="inline-block text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-asean-red px-3 py-1 rounded border border-asean-red/40 bg-asean-red/10">
            Intelligence Brief
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.08] tracking-tight animate-reveal" style={{ animationDelay: "0.1s" }}>
          {leadStory?.title ?? "Research and data to safeguard digital rights across Southeast Asia."}
        </h1>

        {/* Lead paragraph — dossier excerpt aesthetic */}
        <div className="animate-reveal space-y-3" style={{ animationDelay: "0.25s" }}>
          {leadStory ? (
            <>
              <div className="flex items-center gap-3 text-xs font-sans text-slate-400">
                <span className="font-bold text-asean-yellow uppercase tracking-wider">{leadStory.category}</span>
                <span className="text-slate-600">·</span>
                <span>{leadStory.read_time}</span>
                {leadStory.author && (
                  <>
                    <span className="text-slate-600">·</span>
                    <span>By <strong className="text-slate-300">{leadStory.author}</strong></span>
                  </>
                )}
              </div>
              <p className="font-serif-editorial text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl italic border-l-2 border-asean-red/50 pl-4">
                {leadStory.summary}
              </p>
            </>
          ) : (
            <p className="font-serif-editorial text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl italic border-l-2 border-asean-red/50 pl-4">
              Independent, source-verified investigative reporting translating dense digital trade negotiations, data localization decrees, and AI governance policies across 11 Southeast Asian nations.
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="animate-reveal flex flex-wrap items-center gap-4 pt-2" style={{ animationDelay: "0.4s" }}>
          {leadStory ? (
            <Link
              href={leadStory.slug ? `/investigations/${leadStory.slug}` : `/investigations/id/${leadStory.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-asean-red hover:bg-asean-red/90 text-white font-bold text-xs sm:text-sm font-sans transition-colors shadow-lg shadow-asean-red/20"
            >
              <span>Read Full Investigation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/investigations"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-asean-red hover:bg-asean-red/90 text-white font-bold text-xs sm:text-sm font-sans transition-colors shadow-lg shadow-asean-red/20"
            >
              <span>Browse Investigations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          <Link
            href="/observatory"
            className="inline-flex items-center gap-1.5 text-xs font-sans text-slate-400 hover:text-asean-yellow transition-colors"
          >
            <Map className="w-3.5 h-3.5" />
            <span>Explore Cartographic Observatory →</span>
          </Link>
        </div>

        {/* Micro-stats badges */}
        <div className="animate-reveal flex flex-wrap items-center gap-2 sm:gap-3 pt-4 text-[10px] sm:text-xs font-sans text-slate-400" style={{ animationDelay: "0.55s" }}>
          <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-slate-500" />
            <span><strong className="text-white">11</strong> ASEAN Member States</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5">
            <FileText className="w-3 h-3 text-slate-500" />
            <span><strong className="text-white">100%</strong> Primary Source Verified</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-slate-500" />
            <span>Independent Research</span>
          </span>
        </div>
      </div>

      {/* ===== RIGHT: Interactive ASEAN Map ===== */}
      <div className="relative flex-1 lg:max-w-[45%] min-h-[320px] lg:min-h-full bg-slate-950 border-l border-slate-800">
        {/* Ambient radar glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 55% 50%, rgba(0,51,153,0.12) 0%, transparent 60%), radial-gradient(circle at 35% 55%, rgba(255,204,0,0.08) 0%, transparent 50%)",
          }}
        />

        {/* Map legend */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 text-[10px] font-sans text-slate-400 bg-slate-900/80 backdrop-blur-sm rounded-lg p-2.5 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-asean-yellow" />
            <span>Open Transfer</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-asean-blue" />
            <span>Hybrid</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-asean-red" />
            <span>Strict Localization</span>
          </div>
        </div>

        {/* Map SVG */}
        <HeroMap />

        {/* Subtle gradient overlay at bottom of map */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
