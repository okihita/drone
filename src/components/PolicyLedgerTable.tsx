"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { Search, Filter, ShieldAlert, CheckCircle, FileText, AlertTriangle, X, ChevronRight, ExternalLink } from "lucide-react";
import { getPolicyById, listPolicies } from "@/services/policies";
import { POLICY_CATEGORIES, THREAT_ACCENT_COLORS, THREAT_BADGE_CONTAINER_CLASSES } from "@/lib/constants";
import type { PolicyListItem } from "@/types";
import { FLAG_COMPONENTS } from "@/lib/flags";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

const COUNTRY_NAME_TO_CODE: Record<string, string> = {
  Singapore: "SG",
  Malaysia: "MY",
  Vietnam: "VN",
  Indonesia: "ID",
  Thailand: "TH",
  Philippines: "PH",
  Myanmar: "MM",
  Cambodia: "KH",
  Laos: "LA",
  Brunei: "BN",
  "Timor-Leste": "TL",
};

const THREAT_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "High Alert": ShieldAlert,
  "Medium Risk": FileText,
  "Rights Verified": CheckCircle,
};

const fetcher = () => listPolicies();
const EMPTY_POLICIES: PolicyListItem[] = [];

function PolicyDetailRow({ item }: { item: PolicyListItem }) {
  const { data, error, isLoading } = useSWR(
    ["policy-detail", item.id],
    ([, id]) => getPolicyById(id as string),
    { revalidateOnFocus: false },
  );

  return (
    <tr className="bg-slate-50/70 dark:bg-slate-900/70">
      <td colSpan={4} className="py-4 px-4">
        {isLoading && (
          <div className="space-y-2" aria-hidden="true">
            <Skeleton className="h-3 w-full max-w-xl" />
            <Skeleton className="h-3 w-2/3 max-w-md" />
            <Skeleton className="h-3 w-40" />
          </div>
        )}
        {error && (
          <p className="text-xs text-asean-red font-sans font-bold">
            Could not load policy details. Please try again later.
          </p>
        )}
        {data && (
          <div className="space-y-2 text-xs font-sans">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">{data.summary}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {data.source_authority && (
                <span>
                  <strong className="text-slate-800 dark:text-slate-200">Source authority:</strong>{" "}
                  <span className="text-slate-600 dark:text-slate-400">{data.source_authority}</span>
                </span>
              )}
              <span>
                <strong className="text-slate-800 dark:text-slate-200">Date:</strong>{" "}
                <span className="text-slate-600 dark:text-slate-400">{data.date}</span>
              </span>
            </div>
            {data.primary_source_url && (
              <a
                href={data.primary_source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-asean-blue dark:text-asean-sky hover:underline font-bold"
              >
                Access Primary Source <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}

export default function PolicyLedgerTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
      className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans scroll-mt-[calc(var(--drone-admin-bar-h,0px)_+_var(--drone-header-h,135px)_+_52px)]"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 gap-3 max-w-full">
          <div className="relative flex-1 sm:w-64 shrink-0">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setExpandedId(null); }}
              placeholder="Search by keyword, country..."
              className="pl-8 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-xs font-sans"
              aria-label="Search the policy ledger"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-300 dark:border-slate-800 text-xs overflow-x-auto no-scrollbar max-w-full shrink-0">
            <Filter className="w-3 h-3 text-slate-400 ml-1.5 shrink-0" />
            {(["ALL", ...POLICY_CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setExpandedId(null); }}
                className={`px-2 py-1 rounded text-[10px] font-sans font-semibold transition-colors shrink-0 whitespace-nowrap ${
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

      <div className="flex items-center justify-between mb-3 text-[11px] font-sans text-slate-500 dark:text-slate-400" aria-live="polite">
        <span>
          {error
            ? "The ledger is unavailable."
            : isLoading && policies.length === 0
              ? "Loading ledger entries..."
              : `${filtered.length} of ${policies.length} verified entr${filtered.length === 1 ? "y" : "ies"}`}
        </span>
      </div>

      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-xs transition-colors">
        {error && (
          <div className="p-12 text-center">
            <AlertTriangle className="w-8 h-8 text-asean-red mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Failed to load the policy ledger.</p>
            <p className="text-xs text-slate-500 mt-1">This may be a temporary network issue. Try refreshing the page.</p>
          </div>
        )}
        {!error && isLoading && policies.length === 0 ? (
          <div className="p-4" aria-hidden="true">
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className="flex items-center gap-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        ) : !error && filtered.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-200 dark:border-slate-800 m-4 rounded-xl">
            <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No verified entries match your search.
            </p>
            <p className="text-xs text-slate-500 mt-1">Try a different keyword or category filter.</p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory("ALL"); setExpandedId(null); }}
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear filters
            </button>
          </div>
        ) : !error ? (
          <table className="w-full min-w-[640px] text-left text-xs font-sans">
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
                const cCode = COUNTRY_NAME_TO_CODE[item.jurisdiction];
                const FlagIcon = cCode ? FLAG_COMPONENTS[cCode] : null;
                const isExpanded = expandedId === item.id;
                return (
                  <React.Fragment key={item.id}>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="py-4 px-4 align-top whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {FlagIcon && <FlagIcon className="w-4 h-3 rounded-xs shrink-0 shadow-xs" />}
                          <span className="font-bold text-slate-900 dark:text-white font-sans text-xs">{item.jurisdiction}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">{item.date}</span>
                      </td>
                      <td className="py-4 px-4 align-top max-w-md">
                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                          aria-expanded={isExpanded}
                          className="group/row text-left w-full focus-visible:outline-2 focus-visible:outline-asean-yellow focus-visible:outline-offset-2 rounded-sm"
                        >
                          <span className="flex items-start gap-1.5">
                            <ChevronRight className={`w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400 dark:text-slate-500 transition-transform duration-150 ${isExpanded ? "rotate-90" : ""}`} />
                            <span className="font-serif-editorial font-bold text-slate-900 dark:text-white text-sm leading-snug mb-1 group-hover/row:text-asean-blue dark:group-hover/row:text-asean-sky transition-colors">
                              {item.title}
                            </span>
                          </span>
                        </button>
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
                    {isExpanded && <PolicyDetailRow item={item} />}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    </section>
  );
}
