/* eslint-disable max-lines */
"use client";

import React, { useMemo } from "react";
import { getRealAseanCountries, type GeoCountryData } from "@/lib/aseanGeo";
import { REGIME_FILL_COLORS } from "@/lib/constants";
import { ASEAN_COLORS } from "@/lib/colors";
import { Zap, AlertTriangle, ShieldCheck, Layers } from "lucide-react";

const FLOW_ARCS: ReadonlyArray<readonly [string, string, string]> = [
  ["MY", "VN", "Cross-Border Cloud Directive"],
  ["ID", "MM", "Infrastructure Monitoring"],
  ["ID", "TH", "Financial Data Settlement"],
  ["PH", "MY", "APEC CBPR Interoperability Corridor"],
  ["VN", "KH", "Telecom Fiber Traffic"],
  ["MY", "ID", "DEFA Digital Payment Bridge"],
  ["TH", "MM", "Border Cybersecurity Relay"],
  ["PH", "VN", "Submarine Cable Link"],
];



function arcPathD(a: { x: number; y: number }, b: { x: number; y: number }): string {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const lift = Math.min(len * 0.22, 45);
  return `M ${a.x} ${a.y} Q ${mx - (dy / len) * lift} ${my + (dx / len) * lift} ${b.x} ${b.y}`;
}

export type MapLayerMode = "arcs" | "threat" | "regime";

interface HeroMapCanvasProps {
  activeCountry: GeoCountryData | null;
  onSelectCountry: (country: GeoCountryData) => void;
  activeLayer: MapLayerMode;
  onSelectLayer?: (layer: MapLayerMode) => void;
}

import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";

const FLAG_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL,
};

export default function HeroMapCanvas({
  activeCountry,
  onSelectCountry,
  activeLayer,
  onSelectLayer,
}: HeroMapCanvasProps) {
  const countries = useMemo(() => getRealAseanCountries(), []);
  const byCode = useMemo(() => new Map(countries.map((c) => [c.code, c])), [countries]);

  const arcs = useMemo(() => {
    return FLOW_ARCS.map(([from, to, label]) => {
      const a = byCode.get(from);
      const b = byCode.get(to);
      if (!a || !b) return null;
      return {
        key: `${from}-${to}`,
        from,
        to,
        label,
        d: arcPathD(a.centerPos, b.centerPos),
        color: REGIME_FILL_COLORS[b.regimeType]?.stroke ?? ASEAN_COLORS.yellow,
      };
    }).filter((arc): arc is NonNullable<typeof arc> => arc !== null);
  }, [byCode]);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-slate-100 text-slate-900 select-none dark:bg-slate-950 dark:text-white"
      aria-label="Interactive Cartographic Map"
    >
      {/* ===== Tactical Grid Background ===== */}
      <div className="absolute inset-0 bg-hud-grid pointer-events-none opacity-15 dark:opacity-35" />
      <div className="absolute inset-0 bg-hud-scanlines pointer-events-none opacity-10 dark:opacity-25" />

      {/* Dynamic ambient backdrop glow for active country */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-60"
        style={{
          background: activeCountry
            ? `radial-gradient(circle at ${(activeCountry.centerPos.x / 570) * 100}% ${(activeCountry.centerPos.y / 450) * 100}%, ${
                activeCountry.threatScore >= 4
                  ? "rgba(204,0,0,0.25)"
                  : activeCountry.regimeType === "Open Transfer"
                  ? "rgba(255,204,0,0.2)"
                  : "rgba(0,51,153,0.3)"
              } 0%, transparent 60%)`
            : "radial-gradient(circle at 50% 50%, rgba(0,51,153,0.18) 0%, transparent 55%), radial-gradient(circle at 50% 50%, rgba(255,204,0,0.08) 0%, transparent 45%)",
        }}
      />

      {/* ===== SVG Cartographic Canvas ===== */}
      <div className="h-full w-full pt-4 sm:pt-6 px-2 pb-16 flex items-start justify-center">
        <svg
          viewBox="0 0 570 450"
          preserveAspectRatio="xMidYMin meet"
          className="h-full w-full max-h-full"
        >
          <defs>
            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render base country polygons */}
          {countries.map((country) => {
            const isSelected = activeCountry?.id === country.id;
            const regimeColors = REGIME_FILL_COLORS[country.regimeType];

            // Layer-specific visual overrides
            let fillColor = regimeColors.fill;
            let strokeColor = regimeColors.stroke;
            let fillOpacity = 0.55;

            if (activeLayer === "threat") {
              // Threat layer: color by risk rating
              if (country.threatScore >= 4) {
                fillColor = ASEAN_COLORS.red;
                strokeColor = ASEAN_COLORS.red;
                fillOpacity = 0.7;
              } else if (country.threatScore === 3) {
                fillColor = ASEAN_COLORS.amber;
                strokeColor = ASEAN_COLORS.amber;
                fillOpacity = 0.6;
              } else {
                fillColor = ASEAN_COLORS.emerald;
                strokeColor = ASEAN_COLORS.emerald;
                fillOpacity = 0.45;
              }
            } else if (activeLayer === "regime") {
              fillOpacity = isSelected ? 0.85 : 0.65;
            }

            if (isSelected) {
              fillOpacity = 0.9;
            }

            return (
              <g key={country.id} className="cursor-pointer transition-all duration-300">
                <path
                  d={country.pathD}
                  fill={fillColor}
                  fillOpacity={fillOpacity}
                  stroke={isSelected ? ASEAN_COLORS.yellow : strokeColor}
                  strokeWidth={isSelected ? 2 : 1}
                  className="transition-all duration-300 hover:fill-opacity-90 hover:stroke-slate-900 dark:hover:stroke-white"
                  onClick={() => onSelectCountry(country)}
                />

                {/* Country Code Label */}
                <text
                  x={country.centerPos.x}
                  y={country.centerPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`pointer-events-none font-mono text-[10px] font-bold tracking-wider transition-all duration-300 ${
                    isSelected ? "fill-asean-yellow text-xs" : "fill-slate-700 dark:fill-slate-300"
                  }`}
                  style={{
                    textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                  }}
                >
                  {country.code}
                </text>
              </g>
            );
          })}

          {/* Layer: Cross-Border Arcs */}
          {activeLayer === "arcs" &&
            arcs.map((arc) => (
              <g key={arc.key} className="pointer-events-none">
                {/* Glow path */}
                <path
                  d={arc.d}
                  fill="none"
                  stroke={arc.color}
                  strokeWidth="2.5"
                  strokeOpacity="0.4"
                  filter="url(#neon-glow)"
                />
                {/* Animated dash flow */}
                <path
                  d={arc.d}
                  fill="none"
                  stroke={arc.color}
                  strokeWidth="1.5"
                  className="animate-hero-flow"
                />
              </g>
            ))}

          {/* Layer: Threat Sonar Rings */}
          {activeLayer === "threat" &&
            countries
              .filter((c) => c.threatScore >= 4)
              .map((c) => (
                <circle
                  key={`sonar-${c.id}`}
                  cx={c.centerPos.x}
                  cy={c.centerPos.y}
                  r="12"
                  fill="none"
                  stroke={ASEAN_COLORS.red}
                  className="animate-threat-sonar pointer-events-none"
                />
              ))}

          {/* Layer: Regime Indicators */}
          {activeLayer === "regime" &&
            countries.map((c) => {
              const rColor = REGIME_FILL_COLORS[c.regimeType].stroke;
              return (
                <circle
                  key={`regime-dot-${c.id}`}
                  cx={c.centerPos.x}
                  cy={c.centerPos.y - 12}
                  r="3"
                  fill={rColor}
                  stroke="#000"
                  strokeWidth="1"
                  className="animate-pulse pointer-events-none"
                />
              );
            })}
        </svg>
      </div>

      {/* ===== Radar Sweep Background Spotlight (Exact Center of Card) ===== */}
      <div
        className="animate-hero-sweep pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[140%] rounded-full opacity-50"
        style={{
          transformOrigin: "50% 50%",
          background: "conic-gradient(from 0deg at 50% 50%, rgba(255,204,0,0.12) 0deg, rgba(255,204,0,0.03) 30deg, transparent 70deg)",
        }}
      />
      {/* Radar Center Pivot Crosshair */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
        <div className="h-3 w-3 rounded-full border border-asean-yellow/30 bg-asean-yellow/10" />
        <div className="absolute h-1.5 w-1.5 rounded-full bg-asean-yellow/60" />
      </div>

      {/* ===== Top-Right HUD: Monitored Corridors, Regime Posture & Vertically Stacked Layers (South China Sea) ===== */}
      <div className="absolute right-4 top-4 z-30 flex flex-col items-end gap-2 font-sans text-xs sm:right-6 sm:top-6">
        <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400/90 pr-1">
          8 Data Flow Corridors Monitored
        </span>

        {/* ASEAN Regime Posture Card (Positioned Above Layers) */}
        <div className="hidden sm:flex flex-col items-stretch gap-1 rounded-xl border border-slate-200 bg-white/90 p-2 font-sans text-xs shadow-lg backdrop-blur-md min-w-[130px] dark:border-white/20 dark:bg-slate-950/85 dark:shadow-2xl">
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold px-0.5">
            ASEAN Regime Posture
          </span>
          <div className="flex items-center justify-between gap-1 text-[10px] font-sans font-bold pt-0.5">
            <span className="flex items-center gap-1 text-asean-red">
              <span className="h-1.5 w-1.5 rounded-full bg-asean-red" />
              2 Strict
            </span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="flex items-center gap-1 text-blue-500 dark:text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
              5 Hybrid
            </span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="flex items-center gap-1 text-asean-yellow">
              <span className="h-1.5 w-1.5 rounded-full bg-asean-yellow" />
              4 Open
            </span>
          </div>
        </div>

        {onSelectLayer && (
          <div className="flex flex-col items-stretch gap-1 rounded-xl border border-slate-200 bg-white/90 p-1.5 shadow-lg backdrop-blur-md min-w-[130px] dark:border-white/20 dark:bg-slate-950/85 dark:shadow-2xl">
            <span className="flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Layers className="h-3 w-3 text-slate-400" /> Layer
            </span>
            <button
              onClick={() => onSelectLayer("arcs")}
              className={`flex flex-col items-start gap-0.5 rounded-lg px-2.5 py-1.5 font-bold transition-all text-left ${
                activeLayer === "arcs"
                  ? "bg-asean-yellow text-slate-950 shadow-md shadow-asean-yellow/20"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px]">
                <Zap className="h-3 w-3" />
                <span>Arcs</span>
              </div>
              <span
                className={`text-[9px] font-normal leading-tight ${
                  activeLayer === "arcs" ? "text-slate-900/80" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                Cross-Border Flows
              </span>
            </button>

            <button
              onClick={() => onSelectLayer("threat")}
              className={`flex flex-col items-start gap-0.5 rounded-lg px-2.5 py-1.5 font-bold transition-all text-left ${
                activeLayer === "threat"
                  ? "bg-asean-red text-white shadow-md shadow-asean-red/20"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px]">
                <AlertTriangle className="h-3 w-3" />
                <span>Threats</span>
              </div>
              <span
                className={`text-[9px] font-normal leading-tight ${
                  activeLayer === "threat" ? "text-white/85" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                Digital Risk Ratings
              </span>
            </button>

            <button
              onClick={() => onSelectLayer("regime")}
              className={`flex flex-col items-start gap-0.5 rounded-lg px-2.5 py-1.5 font-bold transition-all text-left ${
                activeLayer === "regime"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="h-3 w-3" />
                <span>Regimes</span>
              </div>
              <span
                className={`text-[9px] font-normal leading-tight ${
                  activeLayer === "regime" ? "text-white/85" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                Governance Postures
              </span>
            </button>
          </div>
        )}
      </div>

      {/* ===== Bottom Floating Glass Dock Bar (Pacific Sea) ===== */}
      <div className="absolute bottom-2.5 right-3 left-3 sm:left-56 z-30 flex items-center justify-center font-sans">
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar rounded-xl border border-slate-200 bg-white/90 p-1.5 shadow-lg backdrop-blur-md max-w-full dark:border-white/20 dark:bg-slate-950/85 dark:shadow-2xl">
          {countries.map((c) => {
            const isSelected = activeCountry?.id === c.id;
            const FlagIcon = FLAG_COMPONENTS[c.code];

            return (
              <button
                key={c.id}
                onClick={() => onSelectCountry(c)}
                title={`${c.name} (${c.regimeType})`}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] font-bold transition-all ${
                  isSelected
                    ? "border-asean-yellow bg-asean-yellow/25 text-asean-yellow shadow-md shadow-asean-yellow/20"
                    : "border-slate-200 bg-slate-100/80 text-slate-700 hover:border-slate-300 hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-white/25 dark:hover:bg-white/15 dark:hover:text-white"
                }`}
              >
                {FlagIcon ? (
                  <FlagIcon className="w-4 h-3 rounded-xs object-cover shadow-xs" />
                ) : (
                  <span className="font-mono text-[10px]">[{c.code}]</span>
                )}
                <span className="font-mono text-[11px]">{c.code}</span>
                {c.threatScore >= 4 && (
                  <span className="h-1.5 w-1.5 rounded-full bg-asean-red animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== Bottom Left Map Status (Indian Ocean) ===== */}
      <div className="pointer-events-none absolute left-4 bottom-3 z-20 font-mono text-[9px] uppercase tracking-widest text-slate-500/90 dark:text-slate-500/80 sm:left-6 sm:bottom-3.5 space-y-0.5">
        <div className="text-asean-yellow font-bold">
          11 ASEAN Member States
        </div>
        <div className="text-slate-600 dark:text-slate-400">LAT: 04°30′N</div>
        <div className="text-slate-600 dark:text-slate-400">LON: 115°00′E</div>
      </div>
    </div>
  );
}


