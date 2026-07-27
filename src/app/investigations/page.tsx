"use client";

import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export interface InvestigationArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  summary: string;
  imageSrc: string;
}

export const ARTICLES: InvestigationArticle[] = [
  {
    id: "defa-legal-scrubbing",
    slug: "defa-legal-scrubbing-manila-seom",
    title: "ASEAN DEFA Legal Scrubbing: The Quiet Tug-of-War Over Cross-Border Data Privacy",
    category: "DEFA SPECIAL REPORT",
    readTime: "8 min read",
    date: "July 2026",
    author: "EngageMedia Research Team",
    summary: "As senior economic officials finalize the text of the world’s first region-wide digital trade agreement in Manila, civil society watchdogs warn that mandatory data flow clauses risk preempting domestic privacy safeguards.",
    imageSrc: "/images/defa_lead.jpg",
  },
  {
    id: "vietnam-decree-53",
    slug: "vietnam-decree-53-cloud-storage-mandates",
    title: "Vietnam's Decree 53 & Foreign Cloud Mandates: The Local Storage Squeeze",
    category: "DATA LOCALIZATION",
    readTime: "6 min read",
    date: "June 2026",
    author: "EngageMedia Research Team",
    summary: "How Ministry of Information notices mandate foreign tech platforms to store user data in Hanoi server centers, creating severe compliance pressure on international civil society orgs.",
    imageSrc: "/images/vietnam_server.jpg",
  },
  {
    id: "ai-audit-bans",
    slug: "ai-governance-algorithmic-audit-prohibitions",
    title: "Banning Algorithmic Audits: How Big Tech Lobbying Targets Treaties",
    category: "AI GOVERNANCE",
    readTime: "7 min read",
    date: "June 2026",
    author: "EngageMedia Research Team",
    summary: "Corporate trade lobbies advocate for broad treaty bans on mandatory source code disclosures, shielding high-risk automated decision systems from civil society scrutiny.",
    imageSrc: "/images/ai_audit.jpg",
  },
];

export default function InvestigationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans transition-colors">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 font-sans">
          <span className="text-xs font-sans text-asean-yellow font-bold uppercase tracking-wider">
            EDITORIAL JOURNALISM CATALOG
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Investigative Reports &amp; Field Studies
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed font-sans">
            Independent, source-verified investigative reporting translating dense trade negotiations, data localization decrees, and AI governance policies across Southeast Asia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 font-sans">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-all group font-sans"
            >
              <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <Image
                  src={article.imageSrc}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 font-sans">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-sans">
                    <span className="text-asean-yellow font-bold uppercase">{article.category}</span>
                    <span className="text-slate-400 font-sans">{article.readTime}</span>
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
      </main>
      <Footer />
    </div>
  );
}
