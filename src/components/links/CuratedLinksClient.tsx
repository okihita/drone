"use client";

import React, { useState, useMemo } from "react";
import { Search, ExternalLink, LayoutGrid, List } from "lucide-react";
import type { CuratedLinkItem } from "@/types/links";
import { FLAG_COMPONENTS } from "@/lib/flags";
import { FallbackDossierBanner } from "./LinkVisuals";
import { CompactLedgerList } from "./CompactLedgerList";
import { CuratedLinksEmptyState } from "./CuratedLinksEmptyState";

const CANONICAL_CATEGORIES = [
  "Trade & Tariffs",
  "DEFA & Treaties",
  "Data Governance",
  "Tech Sovereignty",
  "AI & Labor",
];

const CANONICAL_JURISDICTIONS = [
  "ID", "MY", "SG", "TH", "PH", "VN", "BN", "KH", "LA", "MM", "TL", "ASEAN", "US", "Global"
];

interface CuratedLinksClientProps {
  initialLinks?: CuratedLinkItem[];
}

export default function CuratedLinksClient({ initialLinks = [] }: CuratedLinksClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialLinks.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    const existing = Array.from(set);
    const sorted = [
      ...CANONICAL_CATEGORIES.filter((c) => set.has(c)),
      ...existing.filter((c) => !CANONICAL_CATEGORIES.includes(c)).sort(),
    ];
    return ["ALL", ...sorted];
  }, [initialLinks]);

  const jurisdictions = useMemo(() => {
    const set = new Set<string>();
    initialLinks.forEach((item) => {
      if (item.jurisdiction) set.add(item.jurisdiction);
    });
    const existing = Array.from(set);
    const sorted = [
      ...CANONICAL_JURISDICTIONS.filter((j) => set.has(j)),
      ...existing.filter((j) => !CANONICAL_JURISDICTIONS.includes(j)).sort(),
    ];
    return ["ALL", ...sorted];
  }, [initialLinks]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const filteredLinks = useMemo(() => {
    return initialLinks.filter((item) => {
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
  }, [searchQuery, selectedCategory, selectedJurisdiction, initialLinks]);

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-5 p-6 sm:p-7 rounded-3xl border border-slate-200/70 bg-white shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60">
        
        {/* Search Bar & View Mode Toggle */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, publisher, treaty, or keywords..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200/70 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-asean-yellow dark:border-slate-800/80 dark:bg-slate-950 dark:text-white text-sm font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Grid / List Switcher */}
          <div className="flex items-center rounded-xl border border-slate-200/70 bg-slate-50 p-1 dark:border-slate-800/80 dark:bg-slate-950">
            <button
              onClick={() => setViewMode("grid")}
              title="Gallery Grid View"
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white text-slate-950 shadow-xs dark:bg-white/15 dark:text-white"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              title="Compact Ledger View"
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-white text-slate-950 shadow-xs dark:bg-white/15 dark:text-white"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters: Category & Jurisdiction */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
          
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full pb-1">
            <span className="text-sm font-sans font-bold uppercase tracking-wider text-slate-400 pr-1 shrink-0">
              Topic:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-lg px-3 py-1 text-sm font-sans font-bold transition-all ${
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
            <span className="text-sm font-sans font-bold uppercase tracking-wider text-slate-400 pr-1 shrink-0">
              Region:
            </span>
            {jurisdictions.map((jur) => {
              const Flag = jur !== "ALL" && jur !== "ASEAN" && jur !== "Global" && jur !== "US"
                ? FLAG_COMPONENTS[jur]
                : null;

              return (
                <button
                  key={jur}
                  onClick={() => setSelectedJurisdiction(jur)}
                  className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-sm font-sans font-bold transition-all ${
                    selectedJurisdiction === jur
                      ? "bg-asean-yellow text-slate-950 shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  {Flag && <Flag className="w-4 h-3 rounded-2xs object-cover shadow-2xs" />}
                  <span>{jur}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Result Count */}
      <div className="flex items-center justify-between text-sm font-sans text-slate-500 dark:text-slate-400 px-1">
        <span>
          Showing <strong>{filteredLinks.length}</strong> curated {filteredLinks.length === 1 ? "resource" : "resources"}
        </span>
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

      {/* GALLERY GRID VIEW */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredLinks.map((item) => {
            const Flag = item.jurisdiction !== "ASEAN" && item.jurisdiction !== "Global" && item.jurisdiction !== "US"
              ? FLAG_COMPONENTS[item.jurisdiction]
              : null;

            const hasValidImage = item.ogImage && !failedImages[item.id];

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/70 bg-white overflow-hidden shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-slate-800/80 dark:bg-slate-950/70 dark:hover:border-slate-700/80"
              >
                <div>
                  {hasValidImage ? (
                    <div className="relative w-full h-56 sm:h-64 md:h-72 bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.ogImage}
                        alt={item.title}
                        onError={() => handleImageError(item.id)}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <FallbackDossierBanner item={item} />
                  )}

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-8 space-y-4">
                    {/* Publisher + Topic Category Row */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`}
                          alt={item.publisher}
                          className="w-4 h-4 rounded-xs object-contain bg-slate-100 p-0.5 dark:bg-slate-800 shrink-0"
                          loading="lazy"
                        />
                        <span className="font-sans text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                          {item.publisher}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="rounded-md bg-slate-100 border border-slate-200/70 px-2 py-0.5 text-sm font-sans font-medium text-slate-600 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 shrink-0">
                          {item.category}
                        </span>
                      </div>

                      {item.isPdf && (
                        <span className="rounded bg-slate-900 text-white px-2 py-0.5 text-sm font-sans font-bold dark:bg-white dark:text-slate-950 shrink-0">
                          PDF
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 border-t border-slate-100 dark:border-slate-800/60 text-sm font-sans bg-slate-50/50 dark:bg-slate-900/30">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      {Flag && <Flag className="w-4 h-3 rounded-2xs object-cover shadow-2xs" />}
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {item.jurisdiction}
                      </span>
                    </span>
                    <span>·</span>
                    <span className="text-slate-400">{item.domain}</span>
                  </div>

                  <div className="inline-flex items-center gap-1 font-bold text-slate-700 group-hover:text-asean-yellow dark:text-slate-300 transition-colors">
                    <span>Read Source</span>
                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <CompactLedgerList items={filteredLinks} />
      )}

      {/* Empty State */}
      {filteredLinks.length === 0 && (
        <CuratedLinksEmptyState
          totalLinksCount={initialLinks.length}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedJurisdiction={selectedJurisdiction}
          onResetFilters={() => {
            setSelectedCategory("ALL");
            setSelectedJurisdiction("ALL");
            setSearchQuery("");
          }}
        />
      )}
    </div>
  );
}
