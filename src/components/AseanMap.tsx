"use client";

import React, { useState } from "react";
import { MapPin, FileText, ExternalLink, ShieldCheck, AlertCircle, X, Filter } from "lucide-react";

export interface CountryData {
  id: string;
  name: string;
  code: string;
  capital: string;
  regimeType: "Open Transfer" | "Hybrid" | "Strict Localization";
  activityLevel: "High Activity" | "Moderate" | "Monitoring";
  threatScore: number; // 1 to 5
  activePoliciesCount: number;
  dataFlowPolicy: string;
  keyLegislation: string;
  description: string;
  primaryLink: string;
  path: string;
  labelPos: { x: number; y: number };
}

// Accurate SVG Paths for Southeast Asian (ASEAN) Countries
export const ASEAN_COUNTRIES: CountryData[] = [
  {
    id: "ID",
    name: "Indonesia",
    code: "ID",
    capital: "Jakarta",
    regimeType: "Hybrid",
    activityLevel: "High Activity",
    threatScore: 4,
    activePoliciesCount: 14,
    dataFlowPolicy: "Public Sector Localization (PP 71/2019) & PDP Law No. 27/2022",
    keyLegislation: "PDP Law 27/2022 & Ministerial Regulation 5 (MR5)",
    description: "Public electronic system operators must store data domestically. Private operators can transfer data abroad under contractual safeguards. MR5 mandates 24-hour content removal for emergency compliance requests.",
    primaryLink: "https://kominfo.go.id",
    labelPos: { x: 380, y: 310 },
    path: "M 220 270 C 250 265 290 260 330 275 C 380 290 420 300 460 310 C 450 330 400 340 350 330 C 300 320 250 310 200 300 Z M 360 325 C 380 325 410 335 430 340 C 400 345 370 340 350 335 Z M 160 250 C 180 245 200 255 210 270 C 190 275 170 270 150 260 Z"
  },
  {
    id: "MY",
    name: "Malaysia",
    code: "MY",
    capital: "Kuala Lumpur",
    regimeType: "Open Transfer",
    activityLevel: "Moderate",
    threatScore: 3,
    activePoliciesCount: 9,
    dataFlowPolicy: "Open Transfer Regime under Personal Data Protection Act (PDPA 2010)",
    keyLegislation: "PDPA 2010 & National Artificial Intelligence Roadmap 2021–2025",
    description: "Supports open cross-border data flows within ASEAN DEFA negotiations. Active proponent of paperless e-customs and cross-border QR payment linkages with Singapore and Indonesia.",
    primaryLink: "https://pdp.gov.my",
    labelPos: { x: 230, y: 220 },
    path: "M 190 190 C 220 185 240 195 245 205 C 220 215 195 210 180 200 Z M 290 215 C 330 205 360 215 370 230 C 330 235 300 230 280 220 Z"
  },
  {
    id: "SG",
    name: "Singapore",
    code: "SG",
    capital: "Singapore",
    regimeType: "Open Transfer",
    activityLevel: "High Activity",
    threatScore: 2,
    activePoliciesCount: 18,
    dataFlowPolicy: "Open Transfer Regime (PDPA Provisions & ASEAN MCCs Leader)",
    keyLegislation: "Personal Data Protection Act (PDPA) & AI Verify Governance Testing Framework",
    description: "Leads ASEAN DEFA digital trade negotiations. Strongly advocates banning mandatory data localization, mandatory source code disclosures, and digital service customs duties.",
    primaryLink: "https://imda.gov.sg",
    labelPos: { x: 250, y: 235 },
    path: "M 244 220 L 254 220 L 254 227 L 244 227 Z"
  },
  {
    id: "PH",
    name: "Philippines",
    code: "PH",
    capital: "Manila",
    regimeType: "Open Transfer",
    activityLevel: "High Activity",
    threatScore: 3,
    activePoliciesCount: 11,
    dataFlowPolicy: "Open Transfer Regime with NPC Safeguards & APEC CBPR Interoperability",
    keyLegislation: "Data Privacy Act of 2012 (RA 10173) & E-Governance Act",
    description: "Host of May 2026 57th SEOM DEFA conclusion in Manila. Champions cross-border data interoperability while preserving National Privacy Commission enforcement mechanisms.",
    primaryLink: "https://privacy.gov.ph",
    labelPos: { x: 420, y: 150 },
    path: "M 390 100 C 410 90 430 110 440 130 C 430 160 410 190 395 220 C 385 200 380 160 385 130 Z"
  },
  {
    id: "TH",
    name: "Thailand",
    code: "TH",
    capital: "Bangkok",
    regimeType: "Hybrid",
    activityLevel: "High Activity",
    threatScore: 4,
    activePoliciesCount: 12,
    dataFlowPolicy: "Hybrid Adequacy Regime (PDPA B.E. 2562)",
    keyLegislation: "Personal Data Protection Act (PDPA) & Royal Decree on Digital Platforms",
    description: "Cross-border data transfers allowed to jurisdictions with adequate protection or via standard contractual clauses. Active platform governance regulations.",
    primaryLink: "https://etda.or.th",
    labelPos: { x: 195, y: 145 },
    path: "M 180 110 C 200 105 210 130 205 160 C 190 185 175 190 170 170 C 175 145 165 130 175 115 Z"
  },
  {
    id: "VN",
    name: "Vietnam",
    code: "VN",
    capital: "Hanoi",
    regimeType: "Strict Localization",
    activityLevel: "High Activity",
    threatScore: 5,
    activePoliciesCount: 16,
    dataFlowPolicy: "Mandatory Local Storage & Local Office Requirement (Decree 53/2022)",
    keyLegislation: "Law on Cybersecurity (Law No. 24/2018) & Decree 53/2022/ND-CP",
    description: "Mandates foreign tech firms (cloud, social networks, OTT telecommunications) to store user data in Vietnam and establish branch offices upon police request.",
    primaryLink: "https://mic.gov.vn",
    labelPos: { x: 250, y: 105 },
    path: "M 215 50 C 240 60 255 80 245 120 C 235 150 210 175 200 165 C 215 140 230 115 220 85 Z"
  },
  {
    id: "KH",
    name: "Cambodia",
    code: "KH",
    capital: "Phnom Penh",
    regimeType: "Hybrid",
    activityLevel: "Monitoring",
    threatScore: 4,
    activePoliciesCount: 6,
    dataFlowPolicy: "National Internet Gateway (NIG) Sub-Decree Framework",
    keyLegislation: "E-Commerce Law 2019 & Sub-Decree on National Internet Gateway",
    description: "Pending National Internet Gateway framework creates centralized internet traffic inspection concerns. Receiving regional technical assistance for DEFA compliance.",
    primaryLink: "https://mptc.gov.kh",
    labelPos: { x: 225, y: 165 },
    path: "M 210 155 C 230 150 240 165 235 180 C 220 185 205 175 205 165 Z"
  },
  {
    id: "LA",
    name: "Laos",
    code: "LA",
    capital: "Vientiane",
    regimeType: "Hybrid",
    activityLevel: "Monitoring",
    threatScore: 3,
    activePoliciesCount: 4,
    dataFlowPolicy: "Draft Data Protection Law & Electronic Transactions Framework",
    keyLegislation: "Law on Electronic Transactions & Cybercrime Prevention Law",
    description: "Developing digital economy infrastructure; aligning national regulations with the ASEAN Digital Masterplan 2025.",
    primaryLink: "https://mpt.gov.la",
    labelPos: { x: 200, y: 95 },
    path: "M 185 65 C 205 70 215 95 205 125 C 190 120 185 95 180 80 Z"
  },
  {
    id: "MM",
    name: "Myanmar",
    code: "MM",
    capital: "Naypyidaw",
    regimeType: "Strict Localization",
    activityLevel: "High Activity",
    threatScore: 5,
    activePoliciesCount: 8,
    dataFlowPolicy: "Military Regime Control & Draft Cybersecurity Law",
    keyLegislation: "Draft Cybersecurity Law & Telecommunications Directives",
    description: "Severe digital rights restrictions, frequent internet shutdowns, mandatory VPN restrictions, and unconstrained police access to user data.",
    primaryLink: "https://motc.gov.mm",
    labelPos: { x: 135, y: 105 },
    path: "M 115 50 C 145 55 160 85 155 125 C 140 145 130 140 120 110 C 110 85 105 65 110 55 Z"
  },
  {
    id: "BN",
    name: "Brunei",
    code: "BN",
    capital: "Bandar Seri Begawan",
    regimeType: "Hybrid",
    activityLevel: "Monitoring",
    threatScore: 2,
    activePoliciesCount: 5,
    dataFlowPolicy: "Personal Data Protection Order (PDPO) Draft Framework",
    keyLegislation: "AITI Digital Economy Masterplan 2025",
    description: "Harmonizing national digital trade rules with ASEAN DEFA frameworks; focus on paperless e-customs and e-invoicing.",
    primaryLink: "https://aiti.gov.bn",
    labelPos: { x: 310, y: 195 },
    path: "M 302 192 L 314 192 L 314 200 L 302 200 Z"
  },
  {
    id: "TL",
    name: "Timor-Leste",
    code: "TL",
    capital: "Dili",
    regimeType: "Open Transfer",
    activityLevel: "Monitoring",
    threatScore: 2,
    activePoliciesCount: 3,
    dataFlowPolicy: "ASEAN Candidate Member State — Digital Integration Roadmap",
    keyLegislation: "National ICT Policy 2017–2030 & Draft Cybercrime Law",
    description: "Preparing full accession to ASEAN; aligning national telecommunication framework with ASEAN Digital Integration Index.",
    primaryLink: "https://tic.gov.tl",
    labelPos: { x: 480, y: 335 },
    path: "M 465 328 L 495 328 L 495 338 L 465 338 Z"
  }
];

export default function AseanMap() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [filterRegime, setFilterRegime] = useState<string>("ALL");

  const filteredCountries = ASEAN_COUNTRIES.filter((c) => {
    if (filterRegime === "ALL") return true;
    if (filterRegime === "OPEN") return c.regimeType === "Open Transfer";
    if (filterRegime === "HYBRID") return c.regimeType === "Hybrid";
    if (filterRegime === "STRICT") return c.regimeType === "Strict Localization";
    return true;
  });

  return (
    <section id="asean-map" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] font-mono-data uppercase tracking-wider text-amber-500 font-bold block mb-1">
            CARTOGRAPHIC POLICY OBSERVATORY
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Southeast Asia Jurisdiction Map &amp; Data Regimes
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Inspect cross-border data transfer laws, legal localization mandates, and active policy decrees across 11 Southeast Asian Member States.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 bg-[#0e1420] p-1.5 rounded border border-slate-800 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
          <span className="text-slate-400 font-mono-data text-[11px] hidden sm:inline-block">Filter Regime:</span>
          {(["ALL", "OPEN", "HYBRID", "STRICT"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterRegime(mode)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono-data font-semibold transition-colors ${
                filterRegime === mode
                  ? "bg-slate-700 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="rounded-xl bg-[#0e1420] border border-slate-800 p-6 shadow-xl relative overflow-hidden">
        
        {/* Map Legend */}
        <div className="flex flex-wrap items-center gap-6 mb-6 text-xs border-b border-slate-800 pb-4">
          <span className="font-mono-data text-slate-400 text-[11px] uppercase">Classification:</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-emerald-600 border border-emerald-400"></span>
            <span className="text-slate-300">Open Transfer Regime</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-amber-600 border border-amber-400"></span>
            <span className="text-slate-300">Hybrid / Selective Public Localization</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-red-600 border border-red-400"></span>
            <span className="text-slate-300">Strict Data Localization</span>
          </div>
        </div>

        {/* Vector SVG Map Rendering Canvas */}
        <div className="relative w-full aspect-[16/9] max-h-[480px] flex items-center justify-center">
          <svg viewBox="0 0 540 370" className="w-full h-full">
            {filteredCountries.map((country) => {
              const isSelected = selectedCountry?.id === country.id;
              const isHovered = hoveredCountry?.id === country.id;

              let fillColor = "#1e293b";
              let strokeColor = "#475569";

              if (country.regimeType === "Open Transfer") {
                fillColor = isHovered || isSelected ? "#059669" : "#065f46";
                strokeColor = "#10b981";
              } else if (country.regimeType === "Hybrid") {
                fillColor = isHovered || isSelected ? "#d97706" : "#92400e";
                strokeColor = "#f59e0b";
              } else if (country.regimeType === "Strict Localization") {
                fillColor = isHovered || isSelected ? "#dc2626" : "#991b1b";
                strokeColor = "#ef4444";
              }

              return (
                <g key={country.id} className="cursor-pointer">
                  {/* SVG Path */}
                  <path
                    d={country.path}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected || isHovered ? "2" : "1"}
                    className="transition-all duration-200"
                    onMouseEnter={() => setHoveredCountry(country)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => setSelectedCountry(country)}
                  />

                  {/* Pin Dot */}
                  <circle
                    cx={country.labelPos.x}
                    cy={country.labelPos.y}
                    r={isSelected || isHovered ? "5" : "3.5"}
                    fill="#ffffff"
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    onMouseEnter={() => setHoveredCountry(country)}
                    onClick={() => setSelectedCountry(country)}
                  />

                  {/* Country Code Label */}
                  <text
                    x={country.labelPos.x}
                    y={country.labelPos.y + 14}
                    textAnchor="middle"
                    fill="#f8fafc"
                    fontSize="9"
                    fontWeight="bold"
                    className="pointer-events-none font-mono-data uppercase tracking-wider"
                  >
                    {country.code}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover Card */}
          {hoveredCountry && !selectedCountry && (
            <div className="absolute bottom-4 left-4 p-3 rounded bg-slate-900 border border-slate-700 shadow-2xl max-w-sm text-xs pointer-events-none">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-white font-serif-editorial text-sm">{hoveredCountry.name}</span>
                <span className="text-[10px] font-mono-data px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {hoveredCountry.regimeType}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] mb-2">{hoveredCountry.dataFlowPolicy}</p>
              <div className="text-[10px] font-mono-data text-amber-400 font-semibold">
                Click to inspect full jurisdiction dossier →
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Country Detail Dossier Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#0e1420] border border-slate-800 rounded-xl p-6 shadow-2xl">
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-4 right-4 p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-amber-500" />
              <div>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">{selectedCountry.name}</h3>
                <span className="text-xs text-slate-400 font-mono-data">Capital: {selectedCountry.capital} • ISO: {selectedCountry.code}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-xs font-mono-data">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">DATA REGIME</span>
                <span className="font-bold text-white">{selectedCountry.regimeType}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">THREAT SCORE</span>
                <span className="font-bold text-amber-400">{selectedCountry.threatScore} / 5</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">INGESTED DECREES</span>
                <span className="font-bold text-white">{selectedCountry.activePoliciesCount} Acts</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300 mb-6">
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <strong className="text-white block mb-1 font-serif-editorial text-sm">Key Legislative Framework:</strong>
                <p className="text-slate-300 font-semibold mb-1">{selectedCountry.keyLegislation}</p>
                <p className="text-slate-400 leading-relaxed">{selectedCountry.description}</p>
              </div>

              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <strong className="text-white block mb-1 font-serif-editorial text-sm">Data Localization Mandate:</strong>
                <p className="text-slate-400 leading-relaxed">{selectedCountry.dataFlowPolicy}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
              <a
                href={selectedCountry.primaryLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
              >
                <span>Official Regulatory Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedCountry(null)}
                className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
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
