/* eslint-disable max-lines */
"use client";

import React, { useMemo, useRef } from "react";
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

const THREAT_COLORS: Record<number, { fill: string; stroke: string }> = {
  5: { fill: "rgba(239, 68, 68, 0.45)", stroke: ASEAN_COLORS.red },
  4: { fill: "rgba(249, 115, 22, 0.40)", stroke: ASEAN_COLORS.yellowDark },
  3: { fill: "rgba(234, 179, 8, 0.35)", stroke: ASEAN_COLORS.yellow },
  2: { fill: "rgba(16, 185, 129, 0.30)", stroke: ASEAN_COLORS.blueLight },
  1: { fill: "rgba(59, 130, 246, 0.25)", stroke: ASEAN_COLORS.blue },
};

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
  const mapContainerRef = useRef<HTMLDivElement>(null);

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
      ref={mapContainerRef}
      className="absolute inset-0 z-0 overflow-hidden bg-slate-950 select-none"
      aria-label="Interactive Cartographic Map"
    >
      {/* ===== Tactical Grid Background ===== */}
      <div className="absolute inset-0 bg-hud-grid pointer-events-none opacity-35" />
      <div className="absolute inset-0 bg-hud-scanlines pointer-events-none opacity-25" />

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

          {/* Country Polygons */}
          {countries.map((country) => {
            const isSelected = activeCountry?.id === country.id;
            let fill = "rgba(30, 41, 59, 0.7)", stroke = "rgba(71, 85, 105, 0.6)", fillOpacity = 0.5;

            if (activeLayer === "threat") {
              const threatStyle = THREAT_COLORS[country.threatScore] ?? THREAT_COLORS[3];
              fill = threatStyle.fill;
              stroke = threatStyle.stroke;
              fillOpacity = isSelected ? 0.9 : 0.65;
            } else if (activeLayer === "regime" || isSelected) {
              const regimeColors = REGIME_FILL_COLORS[country.regimeType];
              if (regimeColors) {
                fill = isSelected ? regimeColors.fill : "rgba(30, 41, 59, 0.75)";
                stroke = regimeColors.stroke;
                fillOpacity = isSelected ? 0.85 : 0.45;
              }
            }

            return (
              <path
                key={country.id}
                d={country.pathD}
                fill={fill}
                fillOpacity={fillOpacity}
                stroke={stroke}
                strokeWidth={isSelected ? 2 : 0.8}
                strokeLinejoin="round"
                filter={isSelected ? "url(#neon-glow)" : undefined}
                className="cursor-pointer transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCountry(country);
                }}
              />
            );
          })}

          {/* Data-Flow Arcs */}
          {activeLayer === "arcs" &&
            arcs.map((arc, i) => {
              const isArcActive = activeCountry && (arc.from === activeCountry.code || arc.to === activeCountry.code);
              return (
                <g key={arc.key}>
                  <path
                    d={arc.d}
                    fill="none"
                    stroke={isArcActive ? ASEAN_COLORS.yellow : arc.color}
                    strokeOpacity={isArcActive ? 0.95 : 0.4}
                    strokeWidth={isArcActive ? 2.2 : 1.25}
                  />
                  <path
                    d={arc.d}
                    fill="none"
                    stroke={isArcActive ? ASEAN_COLORS.white : arc.color}
                    strokeOpacity={0.9}
                    strokeWidth={isArcActive ? 2.5 : 1.5}
                    className={isArcActive ? "animate-hero-flow-fast" : "animate-hero-flow"}
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                </g>
              );
            })}

          {/* Capital Nodes & Threat Pings */}
          {countries.map((country, i) => {
            const isSelected = activeCountry?.id === country.id;
            const threatStyle = THREAT_COLORS[country.threatScore] ?? THREAT_COLORS[3];

            return (
              <g key={`node-${country.id}`}>
                {(country.threatScore >= 4 || isSelected || activeLayer === "threat") && (
                  <circle
                    cx={country.centerPos.x}
                    cy={country.centerPos.y}
                    r={isSelected ? 6.5 : 4}
                    fill="none"
                    stroke={threatStyle.stroke}
                    strokeWidth={1.5}
                    className="animate-threat-sonar"
                    style={{ animationDelay: `${(i % 5) * 0.4}s` }}
                  />
                )}
                <circle
                  cx={country.centerPos.x}
                  cy={country.centerPos.y}
                  r={isSelected ? 5 : 3.2}
                  fill={isSelected ? ASEAN_COLORS.white : threatStyle.stroke}
                  stroke={isSelected ? threatStyle.stroke : ASEAN_COLORS.borderDark}
                  strokeWidth={1.5}
                  className="cursor-pointer transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCountry(country);
                  }}
                />
                <text
                  x={country.centerPos.x}
                  y={country.centerPos.y + (isSelected ? 16 : 13)}
                  textAnchor="middle"
                  fontSize={isSelected ? 10 : 8}
                  fontWeight="bold"
                  fill={isSelected ? ASEAN_COLORS.yellow : ASEAN_COLORS.textMutedDark}
                  className="pointer-events-none uppercase tracking-wider font-sans"
                >
                  {country.code}
                </text>
              </g>
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
        <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest text-slate-400/90 pr-1">
          8 Data Flow Corridors Monitored
        </span>

        {/* ASEAN Regime Posture Card (Positioned Above Layers) */}
        <div className="hidden sm:flex flex-col items-stretch gap-1 rounded-xl border border-white/20 bg-slate-950/85 p-2 font-sans text-xs shadow-2xl backdrop-blur-md min-w-[130px]">
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold px-0.5">
            ASEAN Regime Posture
          </span>
          <div className="flex items-center justify-between gap-1 text-[10px] font-sans font-bold pt-0.5">
            <span className="flex items-center gap-1 text-asean-red">
              <span className="h-1.5 w-1.5 rounded-full bg-asean-red" />
              3 Strict
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-asean-yellow">
              <span className="h-1.5 w-1.5 rounded-full bg-asean-yellow" />
              5 Hybrid
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              3 Open
            </span>
          </div>
        </div>

        {onSelectLayer && (
          <div className="flex flex-col items-stretch gap-1 rounded-xl border border-white/20 bg-slate-950/85 p-1.5 shadow-2xl backdrop-blur-md min-w-[130px]">
            <span className="flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
              <Layers className="h-3 w-3 text-slate-400" /> Layer
            </span>
            <button
              onClick={() => onSelectLayer("arcs")}
              className={`flex flex-col items-start gap-0.5 rounded-lg px-2.5 py-1.5 font-bold transition-all text-left ${
                activeLayer === "arcs"
                  ? "bg-asean-yellow text-slate-950 shadow-md shadow-asean-yellow/20"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px]">
                <Zap className="h-3 w-3" />
                <span>Arcs</span>
              </div>
              <span
                className={`text-[9px] font-normal leading-tight ${
                  activeLayer === "arcs" ? "text-slate-900/80" : "text-slate-400"
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
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px]">
                <AlertTriangle className="h-3 w-3" />
                <span>Threats</span>
              </div>
              <span
                className={`text-[9px] font-normal leading-tight ${
                  activeLayer === "threat" ? "text-white/85" : "text-slate-400"
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
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="h-3 w-3" />
                <span>Regimes</span>
              </div>
              <span
                className={`text-[9px] font-normal leading-tight ${
                  activeLayer === "regime" ? "text-white/85" : "text-slate-400"
                }`}
              >
                Governance Postures
              </span>
            </button>
          </div>
        )}
      </div>

      {/* ===== Bottom Floating Glass Dock Bar (Pacific Sea) ===== */}
      <div className="absolute bottom-2.5 right-3 left-48 sm:left-56 z-30 flex items-center justify-center font-sans">
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar rounded-xl border border-white/20 bg-slate-950/85 p-1.5 shadow-2xl backdrop-blur-md max-w-full">
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
                    : "border-white/10 bg-slate-900/60 text-slate-300 hover:border-white/25 hover:bg-white/15 hover:text-white"
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
      <div className="pointer-events-none absolute left-4 bottom-3 z-20 font-mono text-[9px] uppercase tracking-widest text-slate-500/80 sm:left-6 sm:bottom-3.5 space-y-0.5">
        <div className="text-asean-yellow/90 font-bold">
          11 ASEAN Member States
        </div>
        <div className="text-slate-400">LAT: 04°30′N</div>
        <div className="text-slate-400">LON: 115°00′E</div>
      </div>
    </div>
  );
}


