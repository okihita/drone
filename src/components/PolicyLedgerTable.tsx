"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { Search, Filter, ExternalLink, ShieldAlert, CheckCircle, FileText } from "lucide-react";
import { listPolicies } from "@/services/policies";
import { POLICY_CATEGORIES, THREAT_ACCENT_COLORS, THREAT_BADGE_CONTAINER_CLASSES } from "@/lib/constants";
import type { PolicyListItem } from "@/types";

const THREAT_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "High Alert": ShieldAlert,
  "Medium Risk": FileText,
  "Rights Verified": CheckCircle,
};

const fetcher = () => listPolicies();
const EMPTY_POLICIES: PolicyListItem[] = [];

export default function PolicyLedgerTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const { data: policies = [], error, isLoading } = useSWR("policies-list", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60_000,
    fallbackData: EMPTY_POLICIES,
  });

  const filtered = policies.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "ALL" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section
      id="policy-ledger"
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 font-sans"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] font-sans uppercase tracking-wider text-asean-yellow dark:text-asean-yellow font-bold block mb-1">
            VERIFIED REGULATORY REPOSITORY
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ASEAN Digital Trade &amp; Policy Ledger
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            A 100% source-verified registry of ingested legislative acts,
            cross-border decrees, and AI governance guidelines. Every entry
            links directly to primary official gazettes.
          </p>
        </div>

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
            {(["ALL", ...POLICY_CATEGORIES] as const).map((cat) => (
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

      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm transition-colors">
        {error && (
          <div className="p-12 text-center text-xs text-red-600">
            Failed to load policies.
          </div>
        )}
        {isLoading && policies.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            Loading policy ledger...
          </div>
        ) : (
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase tracking-wider text-slate-600 dark:text-slate-400">
              <tr>
                <th className="py-3 px-4 font-bold">Jurisdiction</th>
                <th className="py-3 px-4 font-bold">Title &amp; Key Decree Summary</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Threat Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filtered.map((item) => {
                const Icon = THREAT_ICON_MAP[item.threat_level] ?? FileText;
                const accent = THREAT_ACCENT_COLORS[item.threat_level] ?? "text-slate-500";
                return (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-4 align-top whitespace-nowrap">
                      <span className="font-bold text-slate-900 dark:text-white font-sans text-xs">{item.jurisdiction}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">{item.date}</span>
                    </td>
                    <td className="py-4 px-4 align-top max-w-md">
                      <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-sm leading-snug mb-1">{item.title}</h3>
                    </td>
                    <td className="py-4 px-4 align-top whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-sans font-semibold border border-slate-200 dark:border-slate-700">{item.category}</span>
                    </td>
                    <td className="py-4 px-4 align-top whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 ${accent} px-2 py-0.5 rounded text-[10px] font-bold border ${THREAT_BADGE_CONTAINER_CLASSES[item.threat_level] ?? ""}`}>
                        <Icon className="w-3 h-3" />
                        <span>[{item.threat_level === "Rights Verified" ? "Verified" : item.threat_level}]</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
