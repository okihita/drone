"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { listPoliciesForSearch } from "@/services/policies";
import type { PolicySearchItem } from "@/types";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [policies, setPolicies] = useState<PolicySearchItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    listPoliciesForSearch()
      .then(setPolicies)
      .catch(() => {}); // graceful degradation for search
  }, []);

  const results = policies.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.jurisdiction.toLowerCase().includes(query.toLowerCase()) ||
      item.summary.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/ledger?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-20 font-sans">
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.trim().length > 0);
          }}
          onFocus={() => {
            if (query.trim().length > 0) setIsOpen(true);
          }}
          placeholder='Try "DEFA Chapter 5", "Vietnam Decree 53", "Indonesia PDP Law"'
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 pl-11 pr-24 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-asean-yellow font-sans transition-all"
        />
        <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />

        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-asean-yellow hover:bg-asean-yellow-hover text-slate-950 font-bold text-xs font-sans transition-colors flex items-center gap-1.5"
        >
          <span>Search</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-30 p-3 space-y-2 max-h-80 overflow-y-auto">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1.5 font-sans">
              <span>Matching Policy Decrees ({results.length})</span>
              <span className="text-asean-yellow dark:text-asean-yellow font-normal">
                Press Enter to view all
              </span>
            </div>

            {results.length === 0 ? (
              <div className="py-4 text-center text-xs text-slate-500 dark:text-slate-400 font-sans">
                No matching legal decrees found for &quot;{query}&quot;.
              </div>
            ) : (
              results.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setIsOpen(false);
                    router.push(`/ledger`);
                  }}
                  className="p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer space-y-1 text-left"
                >
                  <div className="flex items-center justify-between gap-2 text-[10px] font-sans">
                    <span className="font-bold text-slate-900 dark:text-slate-200">
                      {item.jurisdiction}
                    </span>
                    <span className="text-asean-yellow dark:text-asean-yellow font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-serif-editorial font-bold text-xs text-slate-900 dark:text-white leading-snug line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 font-sans">
                    {item.summary}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
