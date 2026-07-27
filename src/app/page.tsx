"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AseanBlindMap from "@/components/AseanBlindMap";
import HeroSearch from "@/components/HeroSearch";
import { ArrowRight, Globe, FileText, ShieldCheck, Languages } from "lucide-react";

export default function Home() {
  const POPULAR_TOPICS = [
    { label: "ASEAN DEFA", category: "DEFA" },
    { label: "Cross-Border Data", category: "Cross-Border Data" },
    { label: "AI Governance", category: "AI Governance" },
    { label: "Cybersecurity", category: "Cybersecurity" },
    { label: "Data Localization", category: "Cross-Border Data" },
    { label: "Privacy Sovereignty", category: "DEFA" },
    { label: "Source Code Audits", category: "AI Governance" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors">
      {/* Editorial Masthead Header */}
      <Header />

      <main className="flex-1">
        
        {/* POPULAR TOPICS PILL BAR (OUR WORLD IN DATA ARCHITECTURE) */}
        <section className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 py-2 px-4 sm:px-6 lg:px-8 font-sans">
          <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar text-xs">
            <span className="font-bold text-slate-600 dark:text-slate-400 uppercase text-[10px] tracking-wider whitespace-nowrap">
              POPULAR TOPICS:
            </span>
            <div className="flex items-center gap-2">
              {POPULAR_TOPICS.map((topic) => (
                <Link
                  key={topic.label}
                  href={`/ledger?q=${encodeURIComponent(topic.label)}`}
                  className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-asean-yellow hover:border-asean-yellow font-medium whitespace-nowrap transition-colors shadow-xs"
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HERO SECTION: OUR WORLD IN DATA COMPACT HERO WITH REAL SVG MAP */}
        <section className="relative w-full bg-slate-900 dark:bg-slate-950 text-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden shadow-xl">
          
          {/* Full-Width Vector SVG ASEAN Blind Map Background (Real Natural Earth GeoJSON) */}
          <AseanBlindMap />

          {/* Centered Compact Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
            
            <h1 className="font-serif-editorial text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              Research and data to safeguard digital rights across Southeast Asia.
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-2xl mx-auto">
              <Link href="/investigations" className="inline-flex items-center gap-1 text-asean-yellow hover:underline font-semibold">
                <span>Read about our mission &amp; EngageMedia research strategy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>

            {/* High-Visibility Central Search Bar Component */}
            <div className="pt-1">
              <HeroSearch />
            </div>

            {/* Live Repository Micro-Stats Badges (Neutral Uncolored Lucide Icons) */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-sans text-slate-300">
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span><strong>11</strong> ASEAN Member States</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span><strong>14</strong> Ingested Decrees</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span><strong>100%</strong> Primary Source Verified</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-slate-400" />
                <span><strong>2</strong> Languages (EN &amp; ID)</span>
              </span>
            </div>

          </div>
        </section>

        {/* HERO FEATURED STORY (LEAD INVESTIGATION PHOTO COVER) */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
          
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-none grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Hero Cover Photo */}
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] bg-slate-100 dark:bg-slate-900">
              <Image
                src="/images/defa_lead.jpg"
                alt="ASEAN DEFA Legal Scrubbing Delegates in Manila"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Hero Lead Copy */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-sans">
                  <span className="bg-asean-yellow/20 text-asean-yellow font-bold px-2 py-0.5 rounded border border-asean-yellow/30 uppercase">
                    DEFA SPECIAL REPORT
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 dark:text-slate-400">8 min read</span>
                </div>

                <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  ASEAN DEFA Legal Scrubbing: The Quiet Tug-of-War Over Cross-Border Data Privacy
                </h2>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-serif-editorial italic border-l-2 border-asean-yellow pl-3">
                  As senior economic officials finalize the text of the world’s first region-wide digital trade agreement in Manila, civil society watchdogs warn that mandatory data flow clauses risk preempting domestic privacy safeguards.
                </p>

                <div className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                  By <strong className="text-slate-900 dark:text-slate-200">EngageMedia Research Team</strong>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3">
                <Link
                  href="/investigations"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs font-sans transition-colors shadow-xs"
                >
                  <span>Read Full Investigation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/observatory"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-300 text-xs font-sans transition-colors border border-slate-300 dark:border-slate-800"
                >
                  <span>Map Dossier →</span>
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 3: 3-COLUMN EDITORIAL ATELIER GRID */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* COLUMN 1: Lead Analysis & Context (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:border-r lg:border-slate-200 lg:dark:border-slate-800 lg:pr-8">
              <span className="text-xs font-sans uppercase tracking-widest text-asean-yellow font-bold block">
                01 • EXECUTIVE INSIGHTS
              </span>

              <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                The Deregulatory Push Behind Closed-Door Trade Treaties
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Projected to expand Southeast Asia’s digital economy to <strong>US$2.0 Trillion by 2030</strong>, the Digital Economy Framework Agreement (DEFA) governs nine core pillars. However, negotiations conducted exclusively behind closed doors leave regional civil society without democratic recourse.
              </p>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm dark:shadow-none">
                <h4 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-sm">
                  Primary Friction Points:
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-asean-yellow font-bold">•</span>
                    <span><strong>Data Free Flow (DFFT):</strong> Tension between open transfer regimes (Singapore, Philippines) vs. mandatory localization (Vietnam Decree 53).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-asean-yellow font-bold">•</span>
                    <span><strong>Algorithmic Audit Bans:</strong> Big Tech lobbying seeking broad bans on mandatory source code disclosures.</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/investigations"
                className="inline-flex items-center gap-2 text-xs font-sans font-bold text-asean-yellow hover:underline pt-2"
              >
                <span>Read Complete Investigation Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* COLUMN 2: Secondary Field Dispatches (4 cols) */}
            <div className="lg:col-span-4 space-y-6 lg:border-r lg:border-slate-200 lg:dark:border-slate-800 lg:pr-8">
              <span className="text-xs font-sans uppercase tracking-widest text-asean-blue font-bold block">
                02 • FIELD DISPATCHES
              </span>

              {/* Story 1 */}
              <article className="group space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <Image
                    src="/images/vietnam_server.jpg"
                    alt="Vietnam Cloud Data Center"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-[10px] font-sans text-asean-yellow font-bold uppercase">
                  DATA LOCALIZATION
                </span>
                <h4 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-base group-hover:text-asean-yellow transition-colors leading-snug">
                  Vietnam's Decree 53 &amp; Foreign Cloud Mandates: The Local Storage Squeeze
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed font-sans">
                  How Ministry of Information notices mandate foreign tech platforms to store user data in Hanoi.
                </p>
              </article>

              {/* Story 2 */}
              <article className="group space-y-3">
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <Image
                    src="/images/ai_audit.jpg"
                    alt="AI Governance Code Audit"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-[10px] font-sans text-asean-yellow font-bold uppercase">
                  AI GOVERNANCE
                </span>
                <h4 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-base group-hover:text-asean-yellow transition-colors leading-snug">
                  Banning Algorithmic Audits: How Big Tech Lobbying Targets Treaties
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed font-sans">
                  Corporate trade lobbies advocate for broad treaty bans on mandatory source code disclosures.
                </p>
              </article>
            </div>

            {/* COLUMN 3: Live Policy Radar Stream (3 cols) */}
            <div className="lg:col-span-3 space-y-6">
              <span className="text-xs font-sans uppercase tracking-widest text-asean-blue font-bold block">
                03 • REGULATORY RADAR
              </span>

              <div className="space-y-4 font-sans">
                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between text-[10px] font-sans">
                    <span className="font-bold text-slate-900 dark:text-white">ASEAN Regional</span>
                    <span className="text-asean-red font-bold">High Alert</span>
                  </div>
                  <h4 className="font-serif-editorial font-bold text-xs text-slate-900 dark:text-white leading-snug">
                    SEOM 57 Manila DEFA Scrubbing
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">July 15, 2026</span>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between text-[10px] font-sans">
                    <span className="font-bold text-slate-900 dark:text-white">Indonesia (ID)</span>
                    <span className="text-asean-red font-bold">High Alert</span>
                  </div>
                  <h4 className="font-serif-editorial font-bold text-xs text-slate-900 dark:text-white leading-snug">
                    PDP Law Public Sector Server Storage
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">July 08, 2026</span>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between text-[10px] font-sans">
                    <span className="font-bold text-slate-900 dark:text-white">Singapore (SG)</span>
                    <span className="text-asean-blue font-bold">Rights Verified</span>
                  </div>
                  <h4 className="font-serif-editorial font-bold text-xs text-slate-900 dark:text-white leading-snug">
                    IMDA ASEAN MCCs Guidelines
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">June 28, 2026</span>
                </div>
              </div>

              <Link
                href="/ledger"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-asean-blue hover:underline pt-2"
              >
                <span>Explore Full Policy Ledger ({6})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </section>

        {/* SECTION 4: MINIMALIST INTELLIGENCE SUITE (SPECIALIZED TOOLS) */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
          <div className="mb-8">
            <span className="text-xs font-sans uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold block mb-1">
              SPECIALIZED INTELLIGENCE TOOLS
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Observatory Modules &amp; Repositories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            
            {/* Module 01 */}
            <Link href="/observatory" className="group p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-asean-blue transition-all flex flex-col justify-between shadow-sm dark:shadow-none">
              <div className="space-y-3">
                <span className="font-serif-editorial text-3xl font-extrabold text-slate-300 dark:text-slate-700 group-hover:text-asean-blue transition-colors">
                  01
                </span>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-lg group-hover:text-asean-blue transition-colors">
                  Cartographic Observatory
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-sans">
                  Interactive 11-country SVG ASEAN map documenting legal data localization regimes and country dossiers.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-sans text-asean-blue font-semibold">
                <span>Launch Map</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Module 02 */}
            <Link href="/ledger" className="group p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-asean-blue transition-all flex flex-col justify-between shadow-sm dark:shadow-none">
              <div className="space-y-3">
                <span className="font-serif-editorial text-3xl font-extrabold text-slate-300 dark:text-slate-700 group-hover:text-asean-blue transition-colors">
                  02
                </span>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-lg group-hover:text-asean-blue transition-colors">
                  Verified Policy Ledger
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-sans">
                  Searchable database of ingested digital trade bills &amp; decrees with 100% primary source verification.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-sans text-asean-blue font-semibold">
                <span>Search Ledger</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Module 03 */}
            <Link href="/threats" className="group p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-asean-red transition-all flex flex-col justify-between shadow-sm dark:shadow-none">
              <div className="space-y-3">
                <span className="font-serif-editorial text-3xl font-extrabold text-slate-300 dark:text-slate-700 group-hover:text-asean-red transition-colors">
                  03
                </span>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-lg group-hover:text-asean-red transition-colors">
                  Rights Threat Matrix
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-sans">
                  4-column structural risk assessment evaluating data sovereignty and algorithmic audit prohibitions.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-sans text-asean-red font-semibold">
                <span>View Risk Matrix</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Module 04 */}
            <Link href="/intake" className="group p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-asean-yellow transition-all flex flex-col justify-between shadow-sm dark:shadow-none">
              <div className="space-y-3">
                <span className="font-serif-editorial text-3xl font-extrabold text-slate-300 dark:text-slate-700 group-hover:text-asean-yellow transition-colors">
                  04
                </span>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-lg group-hover:text-asean-yellow transition-colors">
                  Submit Leaked Alert
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-sans">
                  Encrypted intake portal for regional activists to submit leaked draft texts with anonymous protection.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-sans text-asean-yellow font-semibold">
                <span>Submit Dossier</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </section>

        {/* SECTION 5: MINIMALIST NEWSLETTER SUBSCRIPTION */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col md:flex-row items-center justify-between gap-8 font-sans">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-sans uppercase tracking-widest text-asean-yellow font-bold">
                WEEKLY POLICY PULSE DISPATCH
              </span>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Receive Thursday Night Executive Policy Summaries
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                Get concise, source-verified 3-minute digests covering ASEAN DEFA negotiations delivered straight to your inbox.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed to Weekly Policy Pulse Dispatch!"); }} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter work email address..."
                className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow font-sans min-w-[260px]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-sans text-xs font-bold transition-colors whitespace-nowrap"
              >
                Subscribe Free
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
