"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { listStories } from "@/services/news";
import type { NewsCardItem } from "@/types";

export default function InvestigationsList() {
  const [articles, setArticles] = useState<NewsCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listStories(10)
      .then(setArticles)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 font-sans">
      {loading
        ? Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden animate-pulse"
            >
              <div className="aspect-[16/9] bg-slate-200 dark:bg-slate-800" />
              <div className="p-6 space-y-3">
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              </div>
            </div>
          ))
        : articles.map((article) => (
            <Link
              href={article.slug ? `/investigations/${article.slug}` : `/investigations/id/${article.id}`}
              key={article.id}
              className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-all group font-sans"
            >
              <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <Image
                    src={article.image_url || ""}
                    alt={article.title}
                    fill
                    unoptimized
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 font-sans">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-sans">
                    <span className="text-asean-yellow font-bold uppercase">
                      {article.category}
                    </span>
                    <span className="text-slate-400 font-sans">
                      {article.read_time}
                    </span>
                  </div>
                  <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed font-sans">
                    {article.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-sans text-slate-500">
                  <span>By {article.author}</span>
                  <span className="text-asean-yellow font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 font-sans">
                    Read Report &rarr;
                  </span>
                </div>
              </div>
              </Link>
          ))}
    </div>
  );
}
