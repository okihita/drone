"use client";

import React, { useState, useMemo } from "react";
import { Search, ExternalLink, FileText, LayoutGrid, List } from "lucide-react";
import { CURATED_LINKS } from "@/lib/linksData";
import type { CuratedLinkCategory, CuratedLinkJurisdiction } from "@/types/links";
import { FLAG_COMPONENTS } from "@/lib/flags";
import { FallbackDossierBanner } from "./LinkVisuals";
import { CompactLedgerList } from "./CompactLedgerList";

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

export default function CuratedLinksClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | CuratedLinkCategory>("ALL");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<"ALL" | CuratedLinkJurisdiction>("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

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
      <div className="flex flex-col gap-4 p-5 rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-white/10 dark:bg-slate-900/60">
        
        {/* Search Bar & View Mode Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, publisher, treaty, or keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-asean-yellow dark:border-white/10 dark:bg-slate-950 dark:text-white text-sm font-sans"
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
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-slate-950">
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
          
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full pb-1">
            <span className="text-sm font-sans font-bold uppercase tracking-wider text-slate-400 pr-1 shrink-0">
              Topic:
            </span>
            {CATEGORIES.map((cat) => (
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
            {JURISDICTIONS.map((jur) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-950/70 dark:hover:border-white/20"
              >
                <div>
                  {hasValidImage ? (
                    <div className="relative w-full h-56 sm:h-64 md:h-72 bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.ogImage}
                        alt={item.title}
                        onError={() => handleImageError(item.id)}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/20" />
                      
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full bg-slate-950/70 border border-white/15 px-3 py-1 backdrop-blur-md">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`}
                            alt={item.publisher}
                            className="w-3.5 h-3.5 rounded-sm object-contain"
                            loading="lazy"
                          />
                          <span className="font-sans text-sm font-bold text-white truncate max-w-[160px]">
                            {item.publisher}
                          </span>
                        </div>

                        {item.isPdf && (
                          <span className="rounded-full bg-black/80 border border-white/20 px-2.5 py-0.5 text-sm font-sans font-bold text-white backdrop-blur-md">
                            PDF
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <FallbackDossierBanner item={item} />
                  )}

                  {/* Card Content Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 text-sm font-sans font-medium text-slate-600 dark:bg-white/5 dark:border-white/10 dark:text-slate-400">
                        {item.category}
                      </span>

                      <span className="text-sm text-slate-500 dark:text-slate-400 font-sans">
                        {item.publishedDate}
                      </span>
                    </div>

                    <h3 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-100 dark:border-white/5 text-sm font-sans bg-slate-50/50 dark:bg-slate-900/30">
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
        <div className="text-center py-16 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30">
          <FileText className="h-8 w-8 mx-auto text-slate-400 mb-2" />
          <h4 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white mb-1">
            No curated links found
          </h4>
          <p className="text-sm text-slate-500 font-sans max-w-sm mx-auto mb-4">
            Try adjusting your search keywords or clearing the category and region filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSelectedJurisdiction("ALL");
              setSearchQuery("");
            }}
            className="rounded-xl bg-asean-yellow px-5 py-2.5 text-sm font-sans font-bold text-slate-950 shadow-xs hover:bg-asean-yellow-hover"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
