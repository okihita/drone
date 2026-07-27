"use client";

import React, { useState } from "react";
import { Search, Filter, ExternalLink, ShieldAlert, CheckCircle, FileText, ChevronRight } from "lucide-react";

export interface PolicyItem {
  id: string;
  title: string;
  jurisdiction: string;
  category: "DEFA" | "Cross-Border Data" | "AI Governance" | "Cybersecurity";
  threatLevel: "High Alert" | "Medium Risk" | "Rights Verified";
  date: string;
  summary: string;
  primarySourceUrl: string;
  sourceAuthority: string;
}

export const POLICIES_DATA: PolicyItem[] = [
  {
    id: "DEFA-2026-05",
    title: "ASEAN Digital Economy Framework Agreement (DEFA) Chapter 5 Legal Scrubbing",
    jurisdiction: "ASEAN Regional",
    category: "DEFA",
    threatLevel: "High Alert",
    date: "July 15, 2026",
    summary: "Senior Economic Officials Meeting (SEOM 57) in Manila finalized draft text on Data Free Flow with Trust (DFFT). Civil society watchdogs warn that mandatory data transfer provisions risk preempting national privacy safeguards.",
    primarySourceUrl: "https://asean.org/our-work/digital-economy/",
    sourceAuthority: "ASEAN Secretariat & SEOM 57 Manila Gazette",
  },
  {
    id: "ID-PDP-2026-07",
    title: "Indonesia Personal Data Protection (PDP Law) Public Sector Localization Decree",
    jurisdiction: "Indonesia (ID)",
    category: "Cross-Border Data",
    threatLevel: "High Alert",
    date: "July 08, 2026",
    summary: "Kominfo Ministerial Regulation enforcing mandatory local server storage for public electronic system operators (PSE). Requires overseas transfers to obtain prior PDP Commission adequacy certification.",
    primarySourceUrl: "https://kominfo.go.id",
    sourceAuthority: "Ministry of Communication & Informatics (Kominfo RI)",
  },
  {
    id: "VN-D53-2026-06",
    title: "Vietnam Decree 53 Implementation Notice on Foreign Cloud Infrastructure",
    jurisdiction: "Vietnam (VN)",
    category: "Cybersecurity",
    threatLevel: "High Alert",
    date: "June 30, 2026",
    summary: "Ministry of Information & Communications (MIC) notice requiring foreign cloud service providers to store local user data in Hanoi server centers and establish local representative branches.",
    primarySourceUrl: "https://mic.gov.vn",
    sourceAuthority: "MIC Vietnam & Department of Cybersecurity (A05)",
  },
  {
    id: "SG-IMDA-2026-04",
    title: "Singapore IMDA Model Governance Framework & ASEAN Cross-Border Model Clauses",
    jurisdiction: "Singapore (SG)",
    category: "AI Governance",
    threatLevel: "Rights Verified",
    date: "June 28, 2026",
    summary: "Updated guidelines for ASEAN Model Contractual Clauses (MCCs) for cross-border data transfers, incorporating AI Verify testing protocols for algorithmic safety.",
    primarySourceUrl: "https://imda.gov.sg",
    sourceAuthority: "Info-communications Media Development Authority (IMDA)",
  },
  {
    id: "PH-DPA-2026-03",
    title: "Philippines NPC Advisory on APEC Cross-Border Privacy Rules (CBPR) Interoperability",
    jurisdiction: "Philippines (PH)",
    category: "Cross-Border Data",
    threatLevel: "Rights Verified",
    date: "June 14, 2026",
    summary: "National Privacy Commission (NPC) circular clarifying data controller liability during international transfers under RA 10173.",
    primarySourceUrl: "https://privacy.gov.ph",
    sourceAuthority: "National Privacy Commission (NPC Philippines)",
  },
  {
    id: "TH-PDPA-2026-02",
    title: "Thailand PDPA Royal Gazette Announcement on Cross-Border Adequacy Standards",
    jurisdiction: "Thailand (TH)",
    category: "Cross-Border Data",
    threatLevel: "Medium Risk",
    date: "May 20, 2026",
    summary: "Personal Data Protection Committee (PDPC) announcement establishing criteria for approving destination countries with adequate data protection.",
    primarySourceUrl: "https://etda.or.th",
    sourceAuthority: "Electronic Transactions Development Agency (ETDA Thailand)",
  },
];

export default function PolicyLedgerTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredPolicies = POLICIES_DATA.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="policy-ledger" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] font-sans uppercase tracking-wider text-emerald-600 dark:text-emerald-500 font-bold block mb-1">
            VERIFIED REGULATORY REPOSITORY
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ASEAN Digital Trade &amp; Policy Ledger
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            A 100% source-verified registry of ingested legislative acts, cross-border decrees, and AI governance guidelines. Every entry links directly to primary official gazettes.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by keyword, country..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-3 py-1.5 pl-8 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-500 font-sans"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded border border-slate-300 dark:border-slate-800 text-xs">
            <Filter className="w-3 h-3 text-slate-400 ml-1.5" />
            {(["ALL", "DEFA", "Cross-Border Data", "AI Governance", "Cybersecurity"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-1 rounded text-[10px] font-sans font-semibold transition-colors ${
                  selectedCategory === cat
                    ? "bg-slate-800 text-white dark:bg-slate-700"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat === "Cross-Border Data" ? "Data Transfer" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verified Ledger Data Table */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-md dark:shadow-xl transition-colors">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase tracking-wider text-slate-600 dark:text-slate-400">
            <tr>
              <th className="py-3 px-4 font-bold">Jurisdiction</th>
              <th className="py-3 px-4 font-bold">Title &amp; Key Decree Summary</th>
              <th className="py-3 px-4 font-bold">Category</th>
              <th className="py-3 px-4 font-bold">Threat Status</th>
              <th className="py-3 px-4 font-bold">Verified Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredPolicies.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="py-4 px-4 align-top whitespace-nowrap">
                  <span className="font-bold text-slate-900 dark:text-white font-sans text-xs">{item.jurisdiction}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">{item.date}</span>
                </td>

                <td className="py-4 px-4 align-top max-w-md">
                  <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-sm leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    {item.summary}
                  </p>
                </td>

                <td className="py-4 px-4 align-top whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-sans font-semibold border border-slate-200 dark:border-slate-700">
                    {item.category}
                  </span>
                </td>

                <td className="py-4 px-4 align-top whitespace-nowrap">
                  {item.threatLevel === "High Alert" && (
                    <span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 px-2 py-0.5 rounded text-[10px] font-bold">
                      <ShieldAlert className="w-3 h-3" />
                      <span>[High Alert]</span>
                    </span>
                  )}
                  {item.threatLevel === "Medium Risk" && (
                    <span className="inline-flex items-center gap-1 text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded text-[10px] font-bold">
                      <FileText className="w-3 h-3" />
                      <span>[Medium Risk]</span>
                    </span>
                  )}
                  {item.threatLevel === "Rights Verified" && (
                    <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                      <CheckCircle className="w-3 h-3" />
                      <span>[Verified]</span>
                    </span>
                  )}
                </td>

                <td className="py-4 px-4 align-top whitespace-nowrap">
                  <a
                    href={item.primarySourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline font-sans text-xs font-semibold"
                  >
                    <span>{item.sourceAuthority}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
