"use client";

import React, { useState, useMemo } from "react";
import { Search, ExternalLink, FileText } from "lucide-react";
import { CURATED_LINKS } from "@/lib/linksData";
import type { CuratedLinkCategory, CuratedLinkJurisdiction } from "@/types/links";
import { FLAG_COMPONENTS } from "@/lib/flags";

const CATEGORIES: ("ALL" | CuratedLinkCategory)[] = [
  "ALL",
  "Trade & Tariffs",
  "DEFA & Treaties",
  "Data Governance",
  "Tech Sovereignty",
  "AI & Labor",
];

const JURISDICTIONS: ("ALL" | CuratedLinkJurisdiction)[] = [
  "ALL",
  "ID",
  "MY",
  "PH",
  "ASEAN",
  "US",
  "Global",
];

const CATEGORY_COLORS: Record<CuratedLinkCategory, string> = {
  "Trade & Tariffs": "bg-asean-red/10 text-asean-red border-asean-red/30",
  "DEFA & Treaties": "bg-asean-yellow/15 text-asean-yellow-dark dark:text-asean-yellow border-asean-yellow/40",
  "Data Governance": "bg-asean-blue/10 text-asean-blue dark:text-asean-sky border-asean-blue/30",
  "Tech Sovereignty": "bg-asean-amber/10 text-asean-amber border-asean-amber/30",
  "AI & Labor": "bg-asean-emerald/10 text-asean-emerald border-asean-emerald/30",
};

export default function CuratedLinksClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | CuratedLinkCategory>("ALL");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<"ALL" | CuratedLinkJurisdiction>("ALL");

  const filteredLinks = useMemo(() => {
    return CURATED_LINKS.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || item.category === selectedCategory;

      const matchesJurisdiction =
        selectedJurisdiction === "ALL" || item.jurisdiction === selectedJurisdiction;

      return matchesSearch && matchesCategory && matchesJurisdiction;
    });
  }, [searchQuery, selectedCategory, selectedJurisdiction]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-4 p-4 rounded-2xl border border-slate-200 bg-white/80 dark:border-white/10 dark:bg-slate-900/60 shadow-xs">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search links by title, organization, or topic..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-asean-yellow dark:border-white/10 dark:bg-slate-950 dark:text-white text-xs sm:text-sm font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters: Category & Jurisdiction */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-white/5">
          
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full pb-1">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-slate-400 pr-1 shrink-0">
              Topic:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-sans font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white dark:bg-asean-yellow dark:text-slate-950 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Jurisdiction Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full pb-1">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-slate-400 pr-1 shrink-0">
              Region:
            </span>
            {JURISDICTIONS.map((jur) => {
              const Flag = jur !== "ALL" && jur !== "ASEAN" && jur !== "Global" && jur !== "US"
                ? FLAG_COMPONENTS[jur]
                : null;

              return (
                <button
                  key={jur}
                  onClick={() => setSelectedJurisdiction(jur)}
                  className={`shrink-0 inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-sans font-bold transition-all ${
                    selectedJurisdiction === jur
                      ? "bg-asean-yellow text-slate-950 shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  {Flag && <Flag className="w-3.5 h-2.5 rounded-2xs object-cover" />}
                  <span>{jur}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Result Count */}
      <div className="flex items-center justify-between text-xs font-sans text-slate-500 dark:text-slate-400 px-1">
        <span>Showing <strong>{filteredLinks.length}</strong> curated {filteredLinks.length === 1 ? "resource" : "resources"}</span>
        {(selectedCategory !== "ALL" || selectedJurisdiction !== "ALL" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSelectedJurisdiction("ALL");
              setSearchQuery("");
            }}
            className="text-asean-yellow-dark dark:text-asean-yellow font-bold hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLinks.map((item) => {
          const Flag = item.jurisdiction !== "ASEAN" && item.jurisdiction !== "Global" && item.jurisdiction !== "US"
            ? FLAG_COMPONENTS[item.jurisdiction]
            : null;

          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-950/70 dark:hover:border-white/20"
            >
              <div>
                {/* Meta Top: Publisher + Category + Jurisdiction Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xs font-bold text-slate-900 dark:text-white">
                      {item.publisher}
                    </span>
                    <span className="text-[11px] text-slate-400 font-sans">·</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                      {item.domain}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.isPdf && (
                      <span className="rounded bg-asean-red/10 border border-asean-red/30 px-1.5 py-0.5 text-[9px] font-sans font-bold text-asean-red">
                        PDF
                      </span>
                    )}
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-sans font-bold ${
                        CATEGORY_COLORS[item.category]
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors leading-snug mb-2">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="font-sans text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {item.excerpt}
                </p>
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5 text-xs font-sans">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    {Flag && <Flag className="w-3.5 h-2.5 rounded-2xs object-cover" />}
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {item.jurisdiction}
                    </span>
                  </span>
                  {item.publishedDate && (
                    <>
                      <span>·</span>
                      <span>{item.publishedDate}</span>
                    </>
                  )}
                </div>

                <div className="inline-flex items-center gap-1 font-bold text-slate-700 group-hover:text-asean-yellow dark:text-slate-300 transition-colors">
                  <span>Open Source</span>
                  <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredLinks.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30">
          <FileText className="h-8 w-8 mx-auto text-slate-400 mb-2" />
          <h4 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white mb-1">
            No curated links found
          </h4>
          <p className="text-xs text-slate-500 font-sans max-w-sm mx-auto mb-4">
            Try adjusting your search keywords or clearing the category and region filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSelectedJurisdiction("ALL");
              setSearchQuery("");
            }}
            className="rounded-lg bg-asean-yellow px-4 py-2 text-xs font-sans font-bold text-slate-950 shadow-xs hover:bg-asean-yellow-hover"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
