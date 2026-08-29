"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { MapPin, ExternalLink, X, Filter } from "lucide-react";
import { getRealAseanCountries, type GeoCountryData } from "@/lib/aseanGeo";
import { ASEAN_COLORS } from "@/lib/colors";
import { REGIME_FILL_COLORS, MAP_FILTER_MODES, REGIME_TYPES } from "@/lib/constants";
import type { MapFilterMode } from "@/lib/constants";
import { FLAG_COMPONENTS } from "@/lib/flags";

// ── Country Dossier Modal ────────────────────────────────────────────────────

function CountryDossierModal({ country, onClose }: { country: GeoCountryData; onClose: () => void }) {
  const FlagIcon = FLAG_COMPONENTS[country.code];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md font-sans"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-country-name"
      onClick={(e) => { if (e.target === e.currentTarget) onCloseRef.current(); }}
    >
      <div ref={dialogRef} className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <button ref={closeButtonRef} onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus-visible:ring-2 focus-visible:ring-asean-yellow" aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 font-sans">
          {FlagIcon ? (
            <FlagIcon className="w-7 h-5 rounded-xs shrink-0 shadow-xs" />
          ) : (
            <MapPin className="w-6 h-6 text-asean-yellow" />
          )}
          <div>
            <h3 id="modal-country-name" className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">{country.name}</h3>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-sans">Capital: {country.capital} &bull; ISO: {country.code}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm font-sans">
          <StatCard label="DATA REGIME" value={country.regimeType} />
          <StatCard label="THREAT SCORE" value={`${country.threatScore} / 5`} accent />
          <StatCard label="INGESTED DECREES" value={`${country.activePoliciesCount} Acts`} />
        </div>

        <div className="space-y-3 text-sm font-sans mb-6 text-slate-700 dark:text-slate-300">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <strong className="block text-slate-900 dark:text-white mb-1">Key Digital Trade Legislation:</strong>
            {country.keyLegislation}
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <strong className="block text-slate-900 dark:text-white mb-1">Cross-Border Data Transfer Posture:</strong>
            {country.dataFlowPolicy}
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <strong className="block text-slate-900 dark:text-white mb-1">Executive Summary:</strong>
            {country.description}
          </div>
        </div>

        <div className="flex items-center justify-between font-sans">
          <a href={country.primaryLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300 hover:text-asean-yellow font-semibold">
            <span>Access Primary Source Decree</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white font-sans text-sm font-semibold hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-asean-yellow transition-colors">
            Close Brief
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
      <span className="block text-sm text-slate-500 uppercase tracking-wider font-semibold font-sans">{label}</span>
      <span className={`font-bold text-sm ${accent ? "text-asean-red" : "text-slate-900 dark:text-white"}`}>{value}</span>
    </div>
  );
}

// ── Map Filter Controls ──────────────────────────────────────────────────────

function MapFilterControls({ filterRegime, onChange }: { filterRegime: MapFilterMode; onChange: (_mode: MapFilterMode) => void }) {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-300 dark:border-slate-800 text-sm">
      <Filter className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 ml-2" />
      <span className="text-slate-600 dark:text-slate-400 font-sans text-sm">Filter:</span>
      {MAP_FILTER_MODES.map((mode) => (
        <button key={mode} onClick={() => onChange(mode)} className={`px-2.5 py-1 rounded text-sm font-sans font-semibold transition-colors ${filterRegime === mode ? "bg-slate-800 text-white dark:bg-slate-700" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
          {mode}
        </button>
      ))}
    </div>
  );
}

// ── Hover Card ───────────────────────────────────────────────────────────────

function MapHoverCard() {
  return (
    <div className="absolute bottom-4 left-4 p-3.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-sm max-w-sm text-sm pointer-events-none font-sans transition-all">
      <div className="flex items-center justify-between gap-2 mb-1 font-sans">
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



  const ambientGlowColor = useMemo(() => {
    if (!hoveredCountry) return null;
    return REGIME_FILL_COLORS[hoveredCountry.regimeType]?.glow ?? null;
  }, [hoveredCountry]);

  return (
    <section
      id="asean-map"
      className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans scroll-mt-[calc(var(--drone-admin-bar-h,0px)_+_var(--drone-header-h,135px)_+_52px)]"
    >
      <div className="flex items-center justify-end mb-4">
        <MapFilterControls
          filterRegime={filterRegime}
          onChange={setFilterRegime}
        />
      </div>

      {/* Map Container */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative overflow-hidden transition-colors cursor-crosshair">
        {ambientGlowColor && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 blur-3xl opacity-80"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${ambientGlowColor} 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Map Legend */}
        <div className="flex flex-wrap items-center gap-6 mb-6 text-sm border-b border-slate-200 dark:border-slate-800 pb-4 font-sans relative z-10">
          <span className="font-sans text-slate-500 dark:text-slate-400 text-sm uppercase">
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
            <MapHoverCard />
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
