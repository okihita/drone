"use client";

import React, { useState } from "react";
import { Search, ExternalLink, Filter, ShieldAlert, CheckCircle2, FileText, Calendar } from "lucide-react";

export interface PolicyItem {
  id: string;
  title: string;
  jurisdiction: string;
  category: "DEFA" | "Cross-Border Data" | "AI Governance" | "Cybersecurity" | "Trade";
  date: string;
  threatLevel: "High Alert" | "Medium Risk" | "Rights Verified";
  summary: string;
  primarySource: string;
  sourceUrl: string;
}

export const POLICIES_DATA: PolicyItem[] = [
  {
    id: "P01",
    title: "ASEAN DEFA Legal Scrubbing Concludes in Manila Ahead of Nov 2026 Signing",
    jurisdiction: "ASEAN Regional",
    category: "DEFA",
    date: "2026-07-15",
    threatLevel: "High Alert",
    summary: "57th SEOM concludes negotiations on 9 pillars targeting a $2T digital economy by 2030. Legal scrubbing is underway to harmonize cross-border data transfer (DFFT) against strict national localization laws.",
    primarySource: "ASEAN Secretariat Official Gazette",
    sourceUrl: "https://asean.org",
  },
  {
    id: "P02",
    title: "Indonesia PDP Law Enforces Public Sector Data Localization Mandate (PP 71/2019)",
    jurisdiction: "Indonesia (ID)",
    category: "Cross-Border Data",
    date: "2026-07-08",
    threatLevel: "High Alert",
    summary: "Kominfo enforces strict domestic server storage for public ESOs, while private operators undergo audit. MR5 24-hour take-down mandates present ongoing content moderation compliance pressure.",
    primarySource: "Kominfo RI & DPR Portal",
    sourceUrl: "https://kominfo.go.id",
  },
  {
    id: "P03",
    title: "Singapore IMDA Expands ASEAN Model Contractual Clauses (MCCs) Integration",
    jurisdiction: "Singapore (SG)",
    category: "Cross-Border Data",
    date: "2026-06-28",
    threatLevel: "Rights Verified",
    summary: "IMDA and PDPC release updated implementation guidelines for ASEAN MCCs, permitting seamless data transfers to verified regional business partners without custom legal agreements.",
    primarySource: "IMDA & PDPC Singapore",
    sourceUrl: "https://imda.gov.sg",
  },
  {
    id: "P04",
    title: "Vietnam Decree 53/2022 Mandates Local Office & Server Storage for Tech Platforms",
    jurisdiction: "Vietnam (VN)",
    category: "Cybersecurity",
    date: "2026-06-20",
    threatLevel: "High Alert",
    summary: "Ministry of Information & Communications issues compliance notices requiring cloud service providers and social platforms to store user data domestically in Hanoi/HCMC.",
    primarySource: "Vietnam National Assembly Portal",
    sourceUrl: "https://mic.gov.vn",
  },
  {
    id: "P05",
    title: "Thailand ETDA Issues Guidelines for High-Risk Algorithmic Platform Oversight",
    jurisdiction: "Thailand (TH)",
    category: "AI Governance",
    date: "2026-06-12",
    threatLevel: "Medium Risk",
    summary: "ETDA introduces draft algorithmic risk assessment frameworks under the Royal Decree on Digital Platforms, requiring mandatory bias reporting for automated recommendation engines.",
    primarySource: "ETDA Thailand Gazette",
    sourceUrl: "https://etda.or.th",
  },
  {
    id: "P06",
    title: "Philippines National Privacy Commission (NPC) Approves APEC CBPR Interoperability",
    jurisdiction: "Philippines (PH)",
    category: "Cross-Border Data",
    date: "2026-05-30",
    threatLevel: "Rights Verified",
    summary: "NPC approves updated cross-border data transfer mechanisms aligning Philippines Data Privacy Act with regional APEC CBPR framework and ASEAN MCCs.",
    primarySource: "NPC Philippines Portal",
    sourceUrl: "https://privacy.gov.ph",
  },
];

export default function PolicyLedgerTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredData = POLICIES_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="policy-ledger" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] font-mono-data uppercase tracking-wider text-emerald-500 font-bold block mb-1">
            VERIFIED REGULATORY LEDGER
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ASEAN Policy Ledger &amp; Primary Text Registry
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            A scannable, source-verified database of pending digital trade bills, cross-border data decrees, and AI governance guidelines.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ledger by keyword or country..."
              className="w-full bg-[#0e1420] border border-slate-800 rounded px-3 py-1.5 pl-8 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-600"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-800 pb-3">
        {(["ALL", "DEFA", "Cross-Border Data", "AI Governance", "Cybersecurity"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded text-xs font-mono-data transition-colors ${
              selectedCategory === cat
                ? "bg-slate-800 text-white font-semibold border border-slate-700"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Structured Policy Data Table */}
      <div className="rounded-xl bg-[#0e1420] border border-slate-800 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono-data text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Jurisdiction</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Policy / Decree Title</th>
              <th className="py-3 px-4">Threat Level</th>
              <th className="py-3 px-4">Ingestion Date</th>
              <th className="py-3 px-4 text-right">Primary Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 font-mono-data">
                  No policy decrees matched your query.
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono-data font-semibold text-slate-200 whitespace-nowrap">
                    {item.jurisdiction}
                  </td>
                  <td className="py-3.5 px-4 font-mono-data text-slate-400 whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="py-3.5 px-4 max-w-md">
                    <strong className="text-white block font-serif-editorial text-sm leading-snug mb-1">
                      {item.title}
                    </strong>
                    <p className="text-slate-400 text-[11px] line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono-data">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.threatLevel === "High Alert"
                          ? "bg-red-950/80 text-red-400 border border-red-800"
                          : item.threatLevel === "Medium Risk"
                          ? "bg-amber-950/80 text-amber-400 border border-amber-800"
                          : "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
                      }`}
                    >
                      {item.threatLevel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono-data text-slate-400 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      <span>{item.primarySource}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
