"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface Article {
  id: string;
  title: string;
  category: string;
  read_time: string | null;
  summary: string;
  author: string | null;
  image_url: string | null;
}

export default function InvestigationsList() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    supabase
      .from("news_items")
      .select("id, title, category, read_time, summary, author, image_url")
      .order("published_date", { ascending: false })
      .then(({ data }) => { if (data) setArticles(data as Article[]); });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 font-sans">
      {articles.map((article) => (
        <article
          key={article.id}
          className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-all group font-sans"
        >
          <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <Image
              src={article.image_url || ""}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4 font-sans">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-sans">
                <span className="text-asean-yellow font-bold uppercase">{article.category}</span>
                <span className="text-slate-400 font-sans">{article.read_time}</span>
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
                Read Report →
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
