"use client";

import React, { useState } from "react";
import { Shield, AlertTriangle, ExternalLink, CheckCircle2, FileText, Lock, Globe2, X, Filter } from "lucide-react";

export interface CountryData {
  id: string;
  name: string;
  code: string;
  capital: string;
  regimeType: "Open" | "Hybrid" | "Strict";
  activityLevel: "High Impact" | "Medium" | "Monitoring";
  threatScore: number; // 1 to 5
  activePoliciesCount: number;
  dataFlowPolicy: string;
  keyLegislation: string;
  description: string;
  primaryLink: string;
  svgPath: string;
  centerPos: { cx: number; cy: number };
}

export const ASEAN_COUNTRIES: CountryData[] = [
  {
    id: "ID",
    name: "Indonesia",
    code: "ID",
    capital: "Jakarta",
    regimeType: "Hybrid",
    activityLevel: "High Impact",
    threatScore: 4,
    activePoliciesCount: 14,
    dataFlowPolicy: "Public Sector Localization (PP 71/2019) & PDP Law No. 27/2022",
    keyLegislation: "PDP Law 27/2022 & Minister Regulation 5 (MR5)",
    description: "Public ESOs must localize data domestically; private sector transfers allowed under contractual safeguards. Mandatory content moderation compliance within 24 hours.",
    primaryLink: "https://kominfo.go.id",
    centerPos: { cx: 290, cy: 300 },
    svgPath: "M 200 280 L 260 270 L 330 290 L 380 320 L 350 340 L 270 330 L 220 310 Z M 340 330 L 390 330 L 410 350 L 370 350 Z M 160 260 L 190 250 L 210 270 L 180 280 Z"
  },
  {
    id: "SG",
    name: "Singapore",
    code: "SG",
    capital: "Singapore",
    regimeType: "Open",
    activityLevel: "High Impact",
    threatScore: 2,
    activePoliciesCount: 18,
    dataFlowPolicy: "Open Transfer Regime (PDPA Cross-Border Provisions & ASEAN MCCs Leader)",
    keyLegislation: "Personal Data Protection Act (PDPA) & AI Verify Framework",
    description: "Leads ASEAN DEFA open data flow negotiations. Pushing to ban mandatory data localization and mandatory source code disclosures.",
    primaryLink: "https://imda.gov.sg",
    centerPos: { cx: 210, cy: 220 },
    svgPath: "M 205 215 L 218 215 L 218 223 L 205 223 Z"
  },
  {
    id: "PH",
    name: "Philippines",
    code: "PH",
    capital: "Manila",
    regimeType: "Open",
    activityLevel: "High Impact",
    threatScore: 3,
    activePoliciesCount: 11,
    dataFlowPolicy: "Open Transfer Regime with NPC Safeguards & APEC CBPR Integration",
    keyLegislation: "Data Privacy Act 2012 (RA 10173) & DICT Digital Plan",
    description: "Host of May 2026 57th SEOM DEFA negotiation conclusion. Promotes open cross-border data transfer while maintaining NPC privacy accountability.",
    primaryLink: "https://privacy.gov.ph",
    centerPos: { cx: 360, cy: 160 },
    svgPath: "M 340 120 L 370 110 L 380 140 L 360 180 L 340 210 L 330 170 Z"
  },
  {
    id: "TH",
    name: "Thailand",
    code: "TH",
    capital: "Bangkok",
    regimeType: "Hybrid",
    activityLevel: "High Impact",
    threatScore: 4,
    activePoliciesCount: 12,
    dataFlowPolicy: "Hybrid Adequacy Regime (PDPA B.E. 2562)",
    keyLegislation: "Personal Data Protection Act (PDPA) & Royal Decree on Digital Platforms",
    description: "Cross-border transfers permitted to countries with adequate protection standards or via standard contractual clauses. Active platform governance regulations.",
    primaryLink: "https://etda.or.th",
    centerPos: { cx: 160, cy: 150 },
    svgPath: "M 140 120 L 170 110 L 180 150 L 160 190 L 150 160 L 130 140 Z"
  },
  {
    id: "VN",
    name: "Vietnam",
    code: "VN",
    capital: "Hanoi",
    regimeType: "Strict",
    activityLevel: "High Impact",
    threatScore: 5,
    activePoliciesCount: 16,
    dataFlowPolicy: "Strict Local Storage & Local Office Mandate (Decree 53/2022)",
    keyLegislation: "Cybersecurity Law (Law No. 24/2018) & Decree 53/2022/ND-CP",
    description: "Mandates foreign tech firms (cloud, social, OTT) to store user data domestically and establish local representative offices upon law enforcement request.",
    primaryLink: "https://mic.gov.vn",
    centerPos: { cx: 210, cy: 110 },
    svgPath: "M 190 70 L 220 80 L 210 130 L 180 160 L 170 130 L 190 100 Z"
  },
  {
    id: "MY",
    name: "Malaysia",
    code: "MY",
    capital: "Kuala Lumpur",
    regimeType: "Open",
    activityLevel: "Medium",
    threatScore: 3,
    activePoliciesCount: 9,
    dataFlowPolicy: "Open Transfer Regime under PDPA 2010 Amendment",
    keyLegislation: "Personal Data Protection Act 2010 & National AI Roadmap",
    description: "Active supporter of DEFA e-commerce chapters and cross-border QR payment interoperability across Malaysia, Singapore, and Indonesia.",
    primaryLink: "https://pdp.gov.my",
    centerPos: { cx: 200, cy: 200 },
    svgPath: "M 150 190 L 190 185 L 200 200 L 160 210 Z M 260 210 L 310 200 L 320 220 L 270 230 Z"
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
    dataFlowPolicy: "National Internet Gateway (NIG) & Draft Cybersecurity Framework",
    keyLegislation: "E-Commerce Law & Sub-Decree on National Internet Gateway",
    description: "Pending National Internet Gateway framework creates centralized internet traffic inspection risks. Active digital trade capacity building.",
    primaryLink: "https://mptc.gov.kh",
    centerPos: { cx: 185, cy: 165 },
    svgPath: "M 175 155 L 195 150 L 200 175 L 180 180 Z"
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
    dataFlowPolicy: "Draft Law on Data Protection & MPT Digital Strategy",
    keyLegislation: "Law on Electronic Transactions & Cybercrime Law",
    description: "Developing digital trade infrastructure; recipient of ASEAN regional technical assistance for DEFA compliance.",
    primaryLink: "https://mpt.gov.la",
    centerPos: { cx: 165, cy: 95 },
    svgPath: "M 150 75 L 180 80 L 175 120 L 155 110 Z"
  },
  {
    id: "MM",
    name: "Myanmar",
    code: "MM",
    capital: "Naypyidaw",
    regimeType: "Strict",
    activityLevel: "High Impact",
    threatScore: 5,
    activePoliciesCount: 8,
    dataFlowPolicy: "Strict Military Regime Data Control & Draft Cyber Law",
    keyLegislation: "Draft Cybersecurity Law & Telecommunications Directives",
    description: "Severe digital rights restrictions, frequent internet shutdowns, mandatory VPN bans, and unconstrained state surveillance powers.",
    primaryLink: "https://motc.gov.mm",
    centerPos: { cx: 115, cy: 105 },
    svgPath: "M 95 60 L 140 70 L 130 130 L 110 140 L 95 100 Z"
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
    dataFlowPolicy: "Personal Data Protection Order (PDPO) Draft",
    keyLegislation: "AITI Digital Economy Masterplan 2025",
    description: "Harmonizing national digital trade rules with ASEAN DEFA frameworks; focus on paperless e-customs.",
    primaryLink: "https://aiti.gov.bn",
    centerPos: { cx: 275, cy: 195 },
    svgPath: "M 270 190 L 282 190 L 282 200 L 270 200 Z"
  },
  {
    id: "TL",
    name: "Timor-Leste",
    code: "TL",
    capital: "Dili",
    regimeType: "Open",
    activityLevel: "Monitoring",
    threatScore: 2,
    activePoliciesCount: 3,
    dataFlowPolicy: "ASEAN Observer Member State — Digital Integration Roadmap",
    keyLegislation: "ICT Policy 2017–2030 & Cybercrime Draft Law",
    description: "Preparing full accession to ASEAN; aligning national telecommunication framework with ASEAN Digital Integration Index.",
    primaryLink: "https://tic.gov.tl",
    centerPos: { cx: 430, cy: 335 },
    svgPath: "M 415 330 L 445 330 L 445 342 L 415 342 Z"
  }
];

export default function AseanMap() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [filterRegime, setFilterRegime] = useState<string>("ALL");

  const filteredCountries = ASEAN_COUNTRIES.filter((c) => {
    if (filterRegime === "ALL") return true;
    if (filterRegime === "OPEN") return c.regimeType === "Open";
    if (filterRegime === "HYBRID") return c.regimeType === "Hybrid";
    if (filterRegime === "STRICT") return c.regimeType === "Strict";
    return true;
  });

  return (
    <section id="asean-map" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Interactive Policy Radar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Southeast Asia Digital Rights &amp; Policy Density Map
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Hover over any of the 11 ASEAN jurisdictions to inspect active digital trade laws, cross-border data transfer regimes, and threat scores.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
          <span className="text-slate-400 font-medium hidden sm:inline-block">Data Regime:</span>
          {(["ALL", "OPEN", "HYBRID", "STRICT"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterRegime(mode)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterRegime === mode
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Map Card Container */}
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-4 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Legend Overlay */}
        <div className="relative z-10 flex flex-wrap items-center gap-4 mb-6 text-xs bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
          <span className="font-semibold text-slate-300">Regime Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
            <span className="text-slate-300">Open Transfer Regime</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span>
            <span className="text-slate-300">Hybrid / Public Sector Localization</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></span>
            <span className="text-slate-300">Strict Data Localization</span>
          </div>
        </div>

        {/* SVG Map Rendering Canvas */}
        <div className="relative w-full aspect-[16/9] max-h-[500px] flex items-center justify-center">
          <svg
            viewBox="0 0 500 380"
            className="w-full h-full drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.5))" }}
          >
            {/* Country Shapes */}
            {filteredCountries.map((country) => {
              const isSelected = selectedCountry?.id === country.id;
              const isHovered = hoveredCountry?.id === country.id;

              let fillColor = "#1e293b";
              let strokeColor = "#334155";

              if (country.regimeType === "Open") {
                fillColor = isHovered || isSelected ? "#10b981" : "rgba(16, 185, 129, 0.25)";
                strokeColor = "#10b981";
              } else if (country.regimeType === "Hybrid") {
                fillColor = isHovered || isSelected ? "#f59e0b" : "rgba(245, 158, 11, 0.25)";
                strokeColor = "#f59e0b";
              } else if (country.regimeType === "Strict") {
                fillColor = isHovered || isSelected ? "#ef4444" : "rgba(239, 68, 68, 0.25)";
                strokeColor = "#ef4444";
              }

              return (
                <g key={country.id} className="cursor-pointer group">
                  {/* Path Element */}
                  <path
                    d={country.svgPath}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected || isHovered ? "2.5" : "1.5"}
                    className="transition-all duration-300 ease-out"
                    onMouseEnter={() => setHoveredCountry(country)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => setSelectedCountry(country)}
                  />

                  {/* Pulsing Hotspot Node */}
                  <circle
                    cx={country.centerPos.cx}
                    cy={country.centerPos.cy}
                    r={isSelected || isHovered ? "7" : "5"}
                    fill={strokeColor}
                    className="transition-all duration-300"
                    onMouseEnter={() => setHoveredCountry(country)}
                    onClick={() => setSelectedCountry(country)}
                  />
                  <circle
                    cx={country.centerPos.cx}
                    cy={country.centerPos.cy}
                    r="12"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="1"
                    className="animate-ping opacity-75"
                  />

                  {/* Country Code Label */}
                  <text
                    x={country.centerPos.cx}
                    y={country.centerPos.cy + 18}
                    textAnchor="middle"
                    fill="#f8fafc"
                    fontSize="10"
                    fontWeight="bold"
                    className="pointer-events-none font-mono"
                  >
                    {country.code}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Active Hover Tooltip Card */}
          {hoveredCountry && !selectedCountry && (
            <div
              className="absolute z-30 bottom-4 left-4 sm:left-8 p-4 rounded-xl bg-slate-900/95 border border-cyan-500/40 backdrop-blur-xl shadow-2xl max-w-sm pointer-events-none animate-in fade-in slide-in-from-bottom-2"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-white text-sm">{hoveredCountry.name}</span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    hoveredCountry.regimeType === "Open"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : hoveredCountry.regimeType === "Hybrid"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {hoveredCountry.regimeType} Regime
                </span>
              </div>
              <p className="text-slate-400 text-xs mb-2">{hoveredCountry.dataFlowPolicy}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-300 border-t border-slate-800 pt-2">
                <span>Active Bills: <strong>{hoveredCountry.activePoliciesCount}</strong></span>
                <span className="text-cyan-400 font-semibold">Click to inspect →</span>
              </div>
            </div>
          )}
        </div>

        {/* Prompt Footer */}
        <div className="mt-4 text-center text-xs text-slate-500 font-mono">
          Interactive Vector SVG • Select any nation node to open comprehensive policy inspection modal
        </div>
      </div>

      {/* Selected Country Detailed Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-white">{selectedCountry.name}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Capital: {selectedCountry.capital}
                  </span>
                </div>
                <p className="text-sm text-cyan-400 font-medium mt-0.5">
                  Jurisdiction Profile &amp; Cross-Border Data Transfer Analysis
                </p>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">
                  Data Regime
                </span>
                <span
                  className={`inline-block text-xs font-bold px-2 py-0.5 rounded ${
                    selectedCountry.regimeType === "Open"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : selectedCountry.regimeType === "Hybrid"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {selectedCountry.regimeType} Transfer
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">
                  Threat Impact Score
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`w-2.5 h-2.5 rounded-full ${
                        star <= selectedCountry.threatScore ? "bg-amber-400" : "bg-slate-700"
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-200 ml-1">
                    {selectedCountry.threatScore}/5
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">
                  Active Legislation
                </span>
                <span className="text-sm font-bold text-white">
                  {selectedCountry.activePoliciesCount} Ingested Acts
                </span>
              </div>
            </div>

            {/* Description & Legal Profile */}
            <div className="space-y-4 text-xs text-slate-300 mb-6">
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                <h4 className="font-bold text-white mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" /> Key Governing Framework
                </h4>
                <p className="text-slate-300 font-semibold mb-1">{selectedCountry.keyLegislation}</p>
                <p className="text-slate-400">{selectedCountry.description}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                <h4 className="font-bold text-white mb-1 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" /> Data Localization Mandate
                </h4>
                <p className="text-slate-400">{selectedCountry.dataFlowPolicy}</p>
              </div>
            </div>

            {/* Footer Action Links */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <a
                href={selectedCountry.primaryLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <span>Official Regulatory Gazette</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedCountry(null)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
              >
                Close Inspection Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
