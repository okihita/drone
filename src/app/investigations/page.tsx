"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";

export interface InvestigationArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  summary: string;
  image: string;
}

export const ARTICLES: InvestigationArticle[] = [
  {
    id: "art-1",
    slug: "asean-defa-legal-scrubbing",
    title: "ASEAN DEFA Legal Scrubbing: The Quiet Tug-of-War Over Cross-Border Data Privacy",
    category: "DEFA SPECIAL REPORT",
    author: "Okihita (EngageMedia)",
    date: "July 2026",
    readTime: "8 min read",
    summary: "As senior economic officials finalize the text of the world’s first region-wide digital trade agreement in Manila, civil society watchdogs warn that mandatory data flow clauses risk preempting domestic privacy safeguards.",
    image: "/images/defa_lead.jpg",
  },
  {
    id: "art-2",
    slug: "vietnam-decree-53-cloud-storage",
    title: "Vietnam's Decree 53 & Foreign Cloud Mandates: The Local Storage Squeeze",
    category: "DATA LOCALIZATION",
    author: "EngageMedia Research Team",
    date: "June 2026",
    readTime: "6 min read",
    summary: "How Vietnam’s Ministry of Information and Communications enforces mandatory domestic server storage for foreign cloud providers, OTT apps, and social networks under Law No. 24/2018.",
    image: "/images/vietnam_server.jpg",
  },
  {
    id: "art-3",
    slug: "banning-algorithmic-audits",
    title: "Banning Algorithmic Audits: How Big Tech Lobbying Targets Regional Treaties",
    category: "AI GOVERNANCE",
    author: "Okihita (EngageMedia)",
    date: "May 2026",
    readTime: "7 min read",
    summary: "Corporate trade lobbies advocate for broad treaty bans on mandatory source code disclosures—limiting regulators from auditing automated AI decision engines for discrimination.",
    image: "/images/ai_audit.jpg",
  },
];

export default function InvestigationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f17] text-slate-800 dark:text-slate-200 font-sans transition-colors">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-10">
          <span className="text-xs font-mono-data text-amber-600 dark:text-amber-500 font-bold uppercase tracking-wider">
            EDITORIAL DESK
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Investigative Reports &amp; Long-Reads
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            In-depth policy investigations, field analyses, and legal breakdowns examining Southeast Asia’s digital economy, trade treaties, and civil society rights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="rounded-xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-all group"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono-data text-slate-500 dark:text-slate-400">
                    <span className="text-amber-600 dark:text-amber-400 font-bold uppercase">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
                    {article.title}
                  </h2>

                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono-data">
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">{article.author}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
