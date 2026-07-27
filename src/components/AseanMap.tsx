"use client";

import React, { useState, useMemo } from "react";
import { MapPin, ExternalLink, X, Filter } from "lucide-react";
import { getRealAseanCountries, GeoCountryData } from "@/lib/aseanGeo";

export default function AseanMap() {
  const countries = useMemo(() => getRealAseanCountries(), []);
  const [selectedCountry, setSelectedCountry] = useState<GeoCountryData | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<GeoCountryData | null>(null);
  const [filterRegime, setFilterRegime] = useState<string>("ALL");

  const filteredCountries = countries.filter((c) => {
    if (filterRegime === "ALL") return true;
    if (filterRegime === "OPEN") return c.regimeType === "Open Transfer";
    if (filterRegime === "HYBRID") return c.regimeType === "Hybrid";
    if (filterRegime === "STRICT") return c.regimeType === "Strict Localization";
    return true;
  });

  return (
    <section id="asean-map" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] font-sans uppercase tracking-wider text-amber-600 dark:text-amber-500 font-bold block mb-1">
            CARTOGRAPHIC POLICY OBSERVATORY
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Southeast Asia Jurisdiction Map &amp; Data Regimes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Inspect cross-border data transfer laws, legal localization mandates, and active policy decrees across 11 Southeast Asian Member States.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 bg-white dark:bg-[#0e1420] p-1.5 rounded-lg border border-slate-300 dark:border-slate-800 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 ml-2" />
          <span className="text-slate-600 dark:text-slate-400 font-sans text-[11px] hidden sm:inline-block">Filter Regime:</span>
          {(["ALL", "OPEN", "HYBRID", "STRICT"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterRegime(mode)}
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
      </div>

      {/* Map Container */}
      <div className="rounded-xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 p-6 shadow-md dark:shadow-xl relative overflow-hidden transition-colors">
        
        {/* Map Legend */}
        <div className="flex flex-wrap items-center gap-6 mb-6 text-xs border-b border-slate-200 dark:border-slate-800 pb-4">
          <span className="font-sans text-slate-500 dark:text-slate-400 text-[11px] uppercase">Classification:</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-emerald-600 border border-emerald-400"></span>
            <span className="text-slate-700 dark:text-slate-300">Open Transfer Regime</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-amber-600 border border-amber-400"></span>
            <span className="text-slate-700 dark:text-slate-300">Hybrid / Selective Public Localization</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-red-600 border border-red-400"></span>
            <span className="text-slate-700 dark:text-slate-300">Strict Data Localization</span>
          </div>
        </div>

        {/* Vector SVG Map Rendering Canvas */}
        <div className="relative w-full aspect-[16/9] max-h-[460px] flex items-center justify-center">
          <svg viewBox="0 0 540 370" className="w-full h-full">
            {filteredCountries.map((country) => {
              const isSelected = selectedCountry?.id === country.id;
              const isHovered = hoveredCountry?.id === country.id;

              let fillColor = "#cbd5e1";
              let strokeColor = "#64748b";

              if (country.regimeType === "Open Transfer") {
                fillColor = isHovered || isSelected ? "#059669" : "#10b981";
                strokeColor = "#047857";
              } else if (country.regimeType === "Hybrid") {
                fillColor = isHovered || isSelected ? "#d97706" : "#f59e0b";
                strokeColor = "#b45309";
              } else if (country.regimeType === "Strict Localization") {
                fillColor = isHovered || isSelected ? "#dc2626" : "#ef4444";
                strokeColor = "#b91c1c";
              }

              return (
                <g key={country.id} className="cursor-pointer">
                  {/* Real SVG Path from Natural Earth GeoJSON */}
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

                  {/* Pin Dot */}
                  <circle
                    cx={country.centerPos.x}
                    cy={country.centerPos.y}
                    r={isSelected || isHovered ? "5" : "3.5"}
                    fill="#ffffff"
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    onMouseEnter={() => setHoveredCountry(country)}
                    onClick={() => setSelectedCountry(country)}
                  />

                  {/* Country Code Label */}
                  <text
                    x={country.centerPos.x}
                    y={country.centerPos.y + 14}
                    textAnchor="middle"
                    fill="#0f172a"
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

          {/* Hover Card */}
          {hoveredCountry && !selectedCountry && (
            <div className="absolute bottom-4 left-4 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xl max-w-sm text-xs pointer-events-none">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-slate-900 dark:text-white font-serif-editorial text-sm">{hoveredCountry.name}</span>
                <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {hoveredCountry.regimeType}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] mb-2">{hoveredCountry.dataFlowPolicy}</p>
              <div className="text-[10px] font-sans text-amber-600 dark:text-amber-400 font-semibold">
                Click to inspect full jurisdiction dossier →
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Country Detail Dossier Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#0e1420] border border-slate-300 dark:border-slate-800 rounded-xl p-6 shadow-2xl">
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              <div>
                <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">{selectedCountry.name}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-sans">Capital: {selectedCountry.capital} • ISO: {selectedCountry.code}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-xs font-sans">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block">DATA REGIME</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedCountry.regimeType}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block">THREAT SCORE</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{selectedCountry.threatScore} / 5</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block">INGESTED DECREES</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedCountry.activePoliciesCount} Acts</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 mb-6">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block mb-1 font-serif-editorial text-sm">Key Legislative Framework:</strong>
                <p className="text-slate-800 dark:text-slate-300 font-semibold mb-1">{selectedCountry.keyLegislation}</p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedCountry.description}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block mb-1 font-serif-editorial text-sm">Data Localization Mandate:</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedCountry.dataFlowPolicy}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
              <a
                href={selectedCountry.primaryLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-semibold"
              >
                <span>Official Regulatory Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedCountry(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
