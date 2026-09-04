"use client";

import { useState, useMemo } from "react";
import { Filter } from "lucide-react";
import { getRealAseanCountries, type GeoCountryData } from "@/lib/aseanGeo";
import { ASEAN_COLORS } from "@/lib/colors";
import { REGIME_FILL_COLORS, MAP_FILTER_MODES, REGIME_TYPES } from "@/lib/constants";
import type { MapFilterMode } from "@/lib/constants";
import { FLAG_COMPONENTS } from "@/lib/flags";
import CountryDossierModal from "./CountryDossierModal";

// ── Map Filter Controls ──────────────────────────────────────────────────────

function MapFilterControls({ filterRegime, onChange }: { filterRegime: MapFilterMode; onChange: (_mode: MapFilterMode) => void }) {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 sm:p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800/80 text-sm shadow-xs">
      <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400 ml-2" />
      <span className="text-slate-600 dark:text-slate-400 font-sans text-sm">Filter:</span>
      {MAP_FILTER_MODES.map((mode) => (
        <button key={mode} onClick={() => onChange(mode)} className={`px-3 py-1.5 rounded-lg text-sm font-sans font-semibold transition-colors ${filterRegime === mode ? "bg-slate-800 text-white dark:bg-slate-700" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
          {mode}
        </button>
      ))}
    </div>
  );
}

// ── Hover Card ───────────────────────────────────────────────────────────────

function MapHoverCard({ country }: { country: GeoCountryData }) {
  const FlagIcon = FLAG_COMPONENTS[country.code];
  const regimeColor =
    country.regimeType === "Open Transfer"
      ? "bg-asean-emerald/15 text-asean-emerald border-asean-emerald/40"
      : country.regimeType === "Hybrid"
      ? "bg-asean-amber/15 text-asean-amber border-asean-amber/40"
      : "bg-asean-red/15 text-asean-red border-asean-red/40";

  return (
    <div className="absolute bottom-6 left-6 p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/80 shadow-xl max-w-sm text-sm pointer-events-none font-sans transition-all space-y-3 animate-[fadeIn_0.15s_ease-out]">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 dark:border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-2.5">
          {FlagIcon && <FlagIcon className="w-5 h-3.5 rounded-xs shrink-0 shadow-xs" />}
          <span className="font-serif-editorial text-base font-bold text-slate-900 dark:text-white">
            {country.name}
          </span>
          <span className="text-sm font-bold text-slate-400">({country.code})</span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-sm font-bold border ${regimeColor}`}>
          {country.regimeType}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">Threat Rating:</span>
        <span className="font-bold text-asean-red">{country.threatScore} / 5</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">Ingested Decrees:</span>
        <span className="font-bold text-slate-800 dark:text-slate-200">{country.activePoliciesCount} Acts</span>
      </div>

      <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800/80 text-sm font-bold text-asean-blue dark:text-asean-yellow flex items-center justify-between">
        <span>Click for full dossier</span>
        <span>&rarr;</span>
      </div>
    </div>
  );
}

// ── Main Map Component ───────────────────────────────────────────────────────

export default function AseanMap({
  initialCountries,
}: {
  initialCountries?: GeoCountryData[];
} = {}) {
  const countries = useMemo(
    () => initialCountries ?? getRealAseanCountries(),
    [initialCountries],
  );
  const [selectedCountry, setSelectedCountry] = useState<GeoCountryData | null>(
    null,
  );
  const [hoveredCountry, setHoveredCountry] = useState<GeoCountryData | null>(
    null,
  );
  const [filterRegime, setFilterRegime] = useState<MapFilterMode>("ALL");

  const ambientGlowColor = useMemo(() => {
    if (!hoveredCountry) return null;
    return REGIME_FILL_COLORS[hoveredCountry.regimeType]?.glow ?? null;
  }, [hoveredCountry]);

  return (
    <section
      id="asean-map"
      className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans scroll-mt-[calc(var(--drone-admin-bar-h,0px)_+_var(--drone-header-h,135px)_+_52px)] space-y-6 sm:space-y-8"
    >
      <div className="flex items-center justify-end">
        <MapFilterControls
          filterRegime={filterRegime}
          onChange={setFilterRegime}
        />
      </div>

      {/* Map Container */}
      <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden transition-colors cursor-crosshair">
        {ambientGlowColor && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 blur-3xl opacity-80"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${ambientGlowColor} 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Map Legend */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 mb-8 text-sm border-b border-slate-200/70 dark:border-slate-800/80 pb-5 font-sans relative z-10">
          <span className="font-sans text-slate-500 dark:text-slate-400 text-sm uppercase font-bold tracking-wider">
            Classification:
          </span>
          {REGIME_TYPES.map((rt) => {
            const colors = REGIME_FILL_COLORS[rt];
            const label =
              rt === "Open Transfer"
                ? "Open Transfer Regime (ASEAN Gold)"
                : rt === "Hybrid"
                  ? "Hybrid / Selective Public Localization (ASEAN Blue)"
                  : "Strict Data Localization (ASEAN Red)";
            return (
              <div key={rt} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-xs border"
                  style={{ backgroundColor: colors.fill, borderColor: colors.stroke }}
                />
                <span className="text-slate-700 dark:text-slate-300">{label}</span>
              </div>
            );
          })}
        </div>

        {/* SVG Map Canvas */}
        <div className="relative w-full aspect-[16/9] max-h-[460px] flex items-start justify-center font-sans z-10">
          <svg viewBox="0 0 570 450" preserveAspectRatio="xMidYMin meet" className="w-full h-full">
            {countries.map((country) => {
              const isSelected = selectedCountry?.id === country.id;
              const isHovered = hoveredCountry?.id === country.id;
              const regimeColors = REGIME_FILL_COLORS[country.regimeType];

              const matchesFilter =
                filterRegime === "ALL" ||
                (filterRegime === "OPEN" && country.regimeType === "Open Transfer") ||
                (filterRegime === "HYBRID" && country.regimeType === "Hybrid") ||
                (filterRegime === "STRICT" && country.regimeType === "Strict Localization");

              let fillColor: string = ASEAN_COLORS.textMutedLight;
              let strokeColor: string = ASEAN_COLORS.borderDark;

              if (regimeColors) {
                fillColor = isHovered || isSelected ? regimeColors.stroke : regimeColors.fill;
                strokeColor = regimeColors.stroke;
              }

              return (
                <g
                  key={country.id}
                  className={`cursor-pointer transition-opacity duration-300 ${
                    matchesFilter ? "opacity-100" : "opacity-25"
                  }`}
                >
                  <path
                    d={country.pathD}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected || isHovered ? "2" : "0.75"}
                    className="transition-all duration-200 focus-visible:stroke-asean-yellow focus-visible:stroke-2"
                    role="button"
                    tabIndex={0}
                    aria-label={`${country.name} (${country.regimeType})`}
                    onMouseEnter={() => setHoveredCountry(country)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => setSelectedCountry(country)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedCountry(country);
                      }
                    }}
                  />
                  <circle
                    cx={country.centerPos.x}
                    cy={country.centerPos.y}
                    r={isSelected || isHovered ? "5" : "3.5"}
                    fill={ASEAN_COLORS.white}
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    onMouseEnter={() => setHoveredCountry(country)}
                    onClick={() => setSelectedCountry(country)}
                  />
                  <text
                    x={country.centerPos.x}
                    y={country.centerPos.y + 14}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="bold"
                    className="pointer-events-none font-sans uppercase tracking-wider fill-white"
                    style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                  >
                    {country.code}
                  </text>
                </g>
              );
            })}
          </svg>

          {hoveredCountry && !selectedCountry && (
            <MapHoverCard country={hoveredCountry} />
          )}
        </div>
      </div>

      {selectedCountry && (
        <CountryDossierModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </section>
  );
}
