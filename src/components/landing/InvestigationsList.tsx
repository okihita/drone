"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { listStories } from "@/services/news";
import { getExcerpt, isSvgUrl } from "@/lib/text";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = () => listStories(10);

export default function InvestigationsList() {
  const { data: articles = [], isLoading } = useSWR("investigations-list", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60_000,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 font-sans">
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 overflow-hidden"
              aria-hidden="true"
            >
              <Skeleton className="aspect-[16/9] w-full rounded-none" />
              <div className="p-6 sm:p-7 space-y-3">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))
        : articles.map((article) => (
            <Link
              href={article.slug ? `/accountability/investigations/${article.slug}` : `/accountability/investigations/id/${article.id}`}
              key={article.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 overflow-hidden flex flex-col shadow-sm dark:shadow-none hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all group font-sans"
            >
              <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                {article.image_url && article.image_url.trim() ? (
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    unoptimized={isSvgUrl(article.image_url)}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600 font-sans text-sm">
                    DRONE Investigation
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4 font-sans">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-sans">
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
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed font-sans">
                    {getExcerpt(article.summary, 180)}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-sm font-sans text-slate-500">
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
