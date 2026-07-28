"use client";

import React, { useMemo, useState, useRef, useCallback } from "react";
import { getRealAseanCountries, type GeoCountryData } from "@/lib/aseanGeo";
import { REGIME_FILL_COLORS } from "@/lib/constants";
import { Plus, Minus, RotateCcw, Hand, Zap, AlertTriangle, ShieldCheck, Layers } from "lucide-react";

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
  5: { fill: "rgba(239, 68, 68, 0.45)", stroke: "#EF4444" },
  4: { fill: "rgba(249, 115, 22, 0.40)", stroke: "#F97316" },
  3: { fill: "rgba(234, 179, 8, 0.35)", stroke: "#EAB308" },
  2: { fill: "rgba(16, 185, 129, 0.30)", stroke: "#10B981" },
  1: { fill: "rgba(59, 130, 246, 0.25)", stroke: "#3B82F6" },
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

const DEFAULT_VIEW = { x: 0, y: 0, zoom: 1 };

export default function HeroMapCanvas({
  activeCountry,
  onSelectCountry,
  activeLayer,
  onSelectLayer,
}: HeroMapCanvasProps) {
  const countries = useMemo(() => getRealAseanCountries(), []);
  const byCode = useMemo(() => new Map(countries.map((c) => [c.code, c])), [countries]);

  // Interactive Viewport Pan & Zoom State
  const [viewState, setViewState] = useState(DEFAULT_VIEW);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; viewX: number; viewY: number } | null>(null);
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
        color: REGIME_FILL_COLORS[b.regimeType]?.stroke ?? "#FFCC00",
      };
    }).filter((arc): arc is NonNullable<typeof arc> => arc !== null);
  }, [byCode]);

  // Zoom Controls
  const handleZoomIn = () => {
    setViewState((v) => ({ ...v, zoom: Math.min(v.zoom + 0.3, 3.5) }));
  };

  const handleZoomOut = () => {
    setViewState((v) => ({ ...v, zoom: Math.max(v.zoom - 0.3, 0.8) }));
  };

  const handleResetView = useCallback(() => {
    setViewState(DEFAULT_VIEW);
  }, []);

  // Mouse Drag to Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag on main click
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      viewX: viewState.x,
      viewY: viewState.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setViewState((v) => ({
      ...v,
      x: dragStartRef.current!.viewX + dx / v.zoom,
      y: dragStartRef.current!.viewY + dy / v.zoom,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  // Scroll Wheel Zoom Handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.15 : -0.15;
    setViewState((v) => ({
      ...v,
      zoom: Math.min(Math.max(v.zoom + delta, 0.8), 3.5),
    }));
  };

  // Base SVG ViewBox calculations with Pan/Zoom offset
  const baseWidth = 540;
  const baseHeight = 370;
  const vWidth = baseWidth / viewState.zoom;
  const vHeight = baseHeight / viewState.zoom;
  const vX = (baseWidth - vWidth) / 2 - viewState.x;
  const vY = (baseHeight - vHeight) / 2 - viewState.y;

  return (
    <div
      ref={mapContainerRef}
      className={`absolute inset-0 z-0 overflow-hidden bg-slate-950 select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
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
            ? `radial-gradient(circle at ${activeCountry.centerPos.x / 5.4}% ${activeCountry.centerPos.y / 3.7}%, ${
                activeCountry.threatScore >= 4
                  ? "rgba(204,0,0,0.25)"
                  : activeCountry.regimeType === "Open Transfer"
                  ? "rgba(255,204,0,0.2)"
                  : "rgba(0,51,153,0.3)"
              } 0%, transparent 60%)`
            : "radial-gradient(circle at 60% 45%, rgba(0,51,153,0.18) 0%, transparent 55%), radial-gradient(circle at 35% 65%, rgba(255,204,0,0.08) 0%, transparent 45%)",
        }}
      />

      {/* ===== SVG Cartographic Canvas ===== */}
      <div className="h-full w-full">
        <svg
          viewBox={`${vX} ${vY} ${vWidth} ${vHeight}`}
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
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
                    stroke={isArcActive ? "#FFCC00" : arc.color}
                    strokeOpacity={isArcActive ? 0.95 : 0.4}
                    strokeWidth={isArcActive ? 2.2 : 1.25}
                  />
                  <path
                    d={arc.d}
                    fill="none"
                    stroke={isArcActive ? "#FFFFFF" : arc.color}
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
                  fill={isSelected ? "#FFFFFF" : threatStyle.stroke}
                  stroke={isSelected ? threatStyle.stroke : "#0F172A"}
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
                  fill={isSelected ? "#FFCC00" : "#94A3B8"}
                  className="pointer-events-none uppercase tracking-wider font-sans"
                >
                  {country.code}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ===== Radar Sweep Background Spotlight ===== */}
      <div
        className="animate-hero-sweep pointer-events-none absolute left-[56%] top-[50%] aspect-square w-[140%] rounded-full opacity-50"
        style={{
          background: "conic-gradient(from 0deg, rgba(255,204,0,0.08) 0deg, rgba(255,204,0,0.02) 28deg, transparent 70deg)",
        }}
      />

      {/* ===== Corner Map Controls Overlay ===== */}
      <div className="absolute right-4 bottom-16 z-30 flex flex-col gap-1.5 font-sans">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-slate-900/90 text-slate-300 shadow-lg backdrop-blur-md hover:bg-slate-800 hover:text-white"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-slate-900/90 text-slate-300 shadow-lg backdrop-blur-md hover:bg-slate-800 hover:text-white"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          onClick={handleResetView}
          title="Reset Map View"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-slate-900/90 text-slate-300 shadow-lg backdrop-blur-md hover:bg-slate-800 hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ===== Floating Layer Switcher in the Sea (East of Philippines / Above Papua) ===== */}
      {onSelectLayer && (
        <div className="absolute right-4 top-4 z-30 flex items-center gap-1 rounded-xl border border-white/20 bg-slate-950/85 p-1 font-sans text-xs shadow-2xl backdrop-blur-md sm:right-6 sm:top-6">
          <span className="hidden items-center gap-1 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:flex">
            <Layers className="h-3 w-3 text-slate-400" /> Layer:
          </span>
          <button
            onClick={() => onSelectLayer("arcs")}
            className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] sm:px-2.5 sm:py-1 sm:text-[11px] font-bold transition-all ${
              activeLayer === "arcs"
                ? "bg-asean-yellow text-slate-950 shadow-md shadow-asean-yellow/20"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Zap className="h-3 w-3" />
            <span>Arcs</span>
          </button>
          <button
            onClick={() => onSelectLayer("threat")}
            className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] sm:px-2.5 sm:py-1 sm:text-[11px] font-bold transition-all ${
              activeLayer === "threat"
                ? "bg-asean-red text-white shadow-md shadow-asean-red/20"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <AlertTriangle className="h-3 w-3" />
            <span>Threats</span>
          </button>
          <button
            onClick={() => onSelectLayer("regime")}
            className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] sm:px-2.5 sm:py-1 sm:text-[11px] font-bold transition-all ${
              activeLayer === "regime"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <ShieldCheck className="h-3 w-3" />
            <span>Regimes</span>
          </button>
        </div>
      )}

      {/* Watermark & Drag Instruction */}
      <div className="pointer-events-none absolute left-4 top-4 font-mono text-[9px] uppercase tracking-widest text-slate-500/80 sm:left-6 sm:top-6">
        <div className="flex items-center gap-1 text-asean-yellow/80 font-bold">
          <Hand className="h-3 w-3" /> Drag map to pan · Scroll to zoom
        </div>
        <div className="text-slate-400">LAT: 04°30′N · LON: 115°00′E</div>
      </div>
    </div>
  );
}
