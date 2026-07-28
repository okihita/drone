"use client";

import React, { useState, useMemo } from "react";
import { MapPin, ExternalLink, X, Filter } from "lucide-react";
import { getRealAseanCountries, type GeoCountryData } from "@/lib/aseanGeo";
import { ASEAN_COLORS } from "@/lib/colors";
import { REGIME_FILL_COLORS, MAP_FILTER_MODES, REGIME_TYPES } from "@/lib/constants";
import type { MapFilterMode } from "@/lib/constants";

// ── Country Dossier Modal ────────────────────────────────────────────────────

function CountryDossierModal({
  country,
  onClose,
}: {
  country: GeoCountryData;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 font-sans">
          <MapPin className="w-6 h-6 text-asean-yellow" />
          <div>
            <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
              {country.name}
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Capital: {country.capital} &bull; ISO: {country.code}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 text-xs font-sans">
          <StatCard label="DATA REGIME" value={country.regimeType} />
          <StatCard
            label="THREAT SCORE"
            value={`${country.threatScore} / 5`}
            accent
          />
          <StatCard
            label="INGESTED DECREES"
            value={`${country.activePoliciesCount} Acts`}
          />
        </div>

        <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 mb-6 font-sans">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <strong className="text-slate-900 dark:text-white block mb-1 font-serif-editorial text-sm">
              Key Legislative Framework:
            </strong>
            <p className="text-slate-800 dark:text-slate-300 font-semibold mb-1 font-sans">
              {country.keyLegislation}
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              {country.description}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans">
            <strong className="text-slate-900 dark:text-white block mb-1 font-serif-editorial text-sm">
              Data Localization Mandate:
            </strong>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              {country.dataFlowPolicy}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 text-xs font-sans">
          <a
            href={country.primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-asean-yellow hover:underline font-semibold font-sans"
          >
            <span>Official Regulatory Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs font-sans"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <span className="text-[10px] text-slate-500 block font-sans">{label}</span>
      <span
        className={`font-bold font-sans ${accent ? "text-asean-yellow" : "text-slate-900 dark:text-white"}`}
      >
        {value}
      </span>
    </div>
  );
}

// ── Map Filter Controls ──────────────────────────────────────────────────────

function MapFilterControls({
  filterRegime,
  onChange,
}: {
  filterRegime: MapFilterMode;
  onChange: (mode: MapFilterMode) => void;
}) {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-300 dark:border-slate-800 text-xs">
      <Filter className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 ml-2" />
      <span className="text-slate-600 dark:text-slate-400 font-sans text-[11px] hidden sm:inline-block">
        Filter Regime:
      </span>
      {MAP_FILTER_MODES.map((mode) => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={`px-2.5 py-1 rounded text-[11px] font-sans font-semibold transition-colors ${
            filterRegime === mode
              ? "bg-slate-800 text-white dark:bg-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}

// ── Hover Card ───────────────────────────────────────────────────────────────

function MapHoverCard({ country }: { country: GeoCountryData }) {
  return (
    <div className="absolute bottom-4 left-4 p-3.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-2xl max-w-sm text-xs pointer-events-none font-sans transition-all">
      <div className="flex items-center justify-between gap-2 mb-1 font-sans">
        <span className="font-bold text-slate-900 dark:text-white font-serif-editorial text-sm">
          {country.name}
        </span>
        <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {country.regimeType}
        </span>
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-[11px] mb-2 font-sans">
        {country.dataFlowPolicy}
      </p>
      <div className="text-[10px] font-sans text-asean-yellow font-semibold">
        Click to inspect full jurisdiction dossier &rarr;
      </div>
    </div>
  );
}

// ── Main Map Component ───────────────────────────────────────────────────────

export default function AseanMap() {
  const countries = useMemo(() => getRealAseanCountries(), []);
  const [selectedCountry, setSelectedCountry] = useState<GeoCountryData | null>(
    null,
  );
  const [hoveredCountry, setHoveredCountry] = useState<GeoCountryData | null>(
    null,
  );
  const [filterRegime, setFilterRegime] = useState<MapFilterMode>("ALL");

  const filteredCountries = countries.filter((c) => {
    if (filterRegime === "ALL") return true;
    if (filterRegime === "OPEN") return c.regimeType === "Open Transfer";
    if (filterRegime === "HYBRID") return c.regimeType === "Hybrid";
    if (filterRegime === "STRICT")
      return c.regimeType === "Strict Localization";
    return true;
  });

  const ambientGlowColor = useMemo(() => {
    if (!hoveredCountry) return null;
    return REGIME_FILL_COLORS[hoveredCountry.regimeType]?.glow ?? null;
  }, [hoveredCountry]);

  return (
    <section
      id="asean-map"
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 font-sans"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] font-sans uppercase tracking-wider text-asean-yellow font-bold block mb-1">
            CARTOGRAPHIC POLICY OBSERVATORY
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Southeast Asia Jurisdiction Map &amp; Data Regimes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Inspect cross-border data transfer laws, legal localization
            mandates, and active policy decrees across 11 Southeast Asian
            Member States.
          </p>
        </div>

        <MapFilterControls
          filterRegime={filterRegime}
          onChange={setFilterRegime}
        />
      </div>

      {/* Map Container */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md dark:shadow-xl relative overflow-hidden transition-colors cursor-crosshair">
        {ambientGlowColor && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 blur-3xl opacity-80"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${ambientGlowColor} 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Map Legend */}
        <div className="flex flex-wrap items-center gap-6 mb-6 text-xs border-b border-slate-200 dark:border-slate-800 pb-4 font-sans relative z-10">
          <span className="font-sans text-slate-500 dark:text-slate-400 text-[11px] uppercase">
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
            {filteredCountries.map((country) => {
              const isSelected = selectedCountry?.id === country.id;
              const isHovered = hoveredCountry?.id === country.id;
              const regimeColors = REGIME_FILL_COLORS[country.regimeType];

              let fillColor: string = ASEAN_COLORS.textMutedLight;
              let strokeColor: string = ASEAN_COLORS.borderDark;

              if (regimeColors) {
                fillColor = isHovered || isSelected ? regimeColors.stroke : regimeColors.fill;
                strokeColor = regimeColors.stroke;
              }

              return (
                <g key={country.id} className="cursor-pointer">
                  <path
                    d={country.pathD}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected || isHovered ? "2" : "0.75"}
                    className="transition-all duration-200"
                    onMouseEnter={() => setHoveredCountry(country)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => setSelectedCountry(country)}
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
                    fill={ASEAN_COLORS.textPrimaryLight}
                    fontSize="9"
                    fontWeight="bold"
                    className="pointer-events-none font-sans uppercase tracking-wider dark:fill-white"
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
