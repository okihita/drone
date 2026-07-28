"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { getRealAseanCountries, type GeoCountryData } from "@/lib/aseanGeo";
import { REGIME_FILL_COLORS } from "@/lib/constants";
import HeroMapTooltip from "./HeroMapTooltip";

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
  containerRef: React.RefObject<HTMLElement | null>;
  activeCountry: GeoCountryData | null;
  hoveredCountry: GeoCountryData | null;
  onSelectCountry: (country: GeoCountryData) => void;
  onHoverCountry: (country: GeoCountryData | null) => void;
  activeLayer: MapLayerMode;
}

export default function HeroMapCanvas({
  containerRef,
  activeCountry,
  hoveredCountry,
  onSelectCountry,
  onHoverCountry,
  activeLayer,
}: HeroMapCanvasProps) {
  const countries = useMemo(() => getRealAseanCountries(), []);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

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
        color: REGIME_FILL_COLORS[b.regimeType]?.stroke ?? "#FFCC00",
      };
    }).filter((arc): arc is NonNullable<typeof arc> => arc !== null);
  }, [byCode]);

  useEffect(() => {
    const container = containerRef.current;
    const target = parallaxRef.current;
    if (!container || !target || !window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const tick = () => {
      raf = 0;
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      target.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    container.addEventListener("pointermove", onMove);
    return () => {
      container.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [containerRef]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const focusCountry = hoveredCountry || activeCountry;

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-slate-950 select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        onHoverCountry(null);
        setMousePos(null);
      }}
    >
      <div className="absolute inset-0 bg-hud-grid pointer-events-none opacity-40" />
      <div className="absolute inset-0 bg-hud-scanlines pointer-events-none opacity-30" />

      {/* Dynamic ambient backdrop glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-60"
        style={{
          background: focusCountry
            ? `radial-gradient(circle at ${focusCountry.centerPos.x / 5.4}% ${focusCountry.centerPos.y / 3.7}%, ${
                focusCountry.threatScore >= 4
                  ? "rgba(204,0,0,0.25)"
                  : focusCountry.regimeType === "Open Transfer"
                  ? "rgba(255,204,0,0.2)"
                  : "rgba(0,51,153,0.3)"
              } 0%, transparent 60%)`
            : "radial-gradient(circle at 60% 45%, rgba(0,51,153,0.18) 0%, transparent 55%), radial-gradient(circle at 35% 65%, rgba(255,204,0,0.08) 0%, transparent 45%)",
        }}
      />

      <div ref={parallaxRef} className="absolute -inset-4 will-change-transform">
        <div className="animate-hero-drift h-full w-full">
          <svg viewBox="0 0 540 370" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
            <defs>
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Country Polygons */}
            {countries.map((country) => {
              const isFocused = activeCountry?.id === country.id || hoveredCountry?.id === country.id;
              let fill = "rgba(30, 41, 59, 0.65)", stroke = "rgba(71, 85, 105, 0.6)", fillOpacity = 0.45;

              if (activeLayer === "threat") {
                const threatStyle = THREAT_COLORS[country.threatScore] ?? THREAT_COLORS[3];
                fill = threatStyle.fill;
                stroke = threatStyle.stroke;
                fillOpacity = isFocused ? 0.85 : 0.6;
              } else if (activeLayer === "regime" || isFocused) {
                const regimeColors = REGIME_FILL_COLORS[country.regimeType];
                if (regimeColors) {
                  fill = isFocused ? regimeColors.fill : "rgba(30, 41, 59, 0.7)";
                  stroke = regimeColors.stroke;
                  fillOpacity = isFocused ? 0.75 : 0.4;
                }
              }

              return (
                <path
                  key={country.id}
                  d={country.pathD}
                  fill={fill}
                  fillOpacity={fillOpacity}
                  stroke={stroke}
                  strokeWidth={isFocused ? 1.8 : 0.75}
                  strokeLinejoin="round"
                  filter={isFocused ? "url(#neon-glow)" : undefined}
                  className="cursor-pointer transition-all duration-300 hover:brightness-125"
                  onMouseEnter={() => onHoverCountry(country)}
                  onMouseLeave={() => onHoverCountry(null)}
                  onClick={() => onSelectCountry(country)}
                />
              );
            })}

            {/* Data-Flow Arcs */}
            {activeLayer === "arcs" &&
              arcs.map((arc, i) => {
                const isArcActive = focusCountry && (arc.from === focusCountry.code || arc.to === focusCountry.code);
                return (
                  <g key={arc.key}>
                    <path
                      d={arc.d}
                      fill="none"
                      stroke={isArcActive ? "#FFCC00" : arc.color}
                      strokeOpacity={isArcActive ? 0.9 : 0.4}
                      strokeWidth={isArcActive ? 2 : 1.25}
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

            {/* Nodes & Threat Pings */}
            {countries.map((country, i) => {
              const isFocused = activeCountry?.id === country.id || hoveredCountry?.id === country.id;
              const threatStyle = THREAT_COLORS[country.threatScore] ?? THREAT_COLORS[3];

              return (
                <g key={`node-${country.id}`}>
                  {(country.threatScore >= 4 || isFocused || activeLayer === "threat") && (
                    <circle
                      cx={country.centerPos.x}
                      cy={country.centerPos.y}
                      r={isFocused ? 6 : 4}
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
                    r={isFocused ? 4.5 : 3}
                    fill={isFocused ? "#FFFFFF" : threatStyle.stroke}
                    stroke={isFocused ? threatStyle.stroke : "#0F172A"}
                    strokeWidth={1.5}
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => onHoverCountry(country)}
                    onClick={() => onSelectCountry(country)}
                  />
                  <text
                    x={country.centerPos.x}
                    y={country.centerPos.y + (isFocused ? 15 : 13)}
                    textAnchor="middle"
                    fontSize={isFocused ? 10 : 8}
                    fontWeight="bold"
                    fill={isFocused ? "#FFCC00" : "#94A3B8"}
                    className="pointer-events-none uppercase tracking-wider"
                  >
                    {country.code}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div
        className="animate-hero-sweep pointer-events-none absolute left-[56%] top-[50%] aspect-square w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          background: "conic-gradient(from 0deg, rgba(255,204,0,0.08) 0deg, rgba(255,204,0,0.02) 28deg, transparent 70deg)",
        }}
      />

      <div className="pointer-events-none absolute left-4 top-4 font-mono text-[9px] uppercase tracking-widest text-slate-500/80 sm:left-6 sm:top-6">
        <div>LAT: 04°30′N · LON: 115°00′E</div>
        <div className="text-asean-yellow/70 font-semibold">ASEAN DEFA JURISDICTION OBSERVER</div>
      </div>

      {hoveredCountry && mousePos && <HeroMapTooltip country={hoveredCountry} pos={mousePos} />}
    </div>
  );
}
