"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AseanBlindMap from "@/components/AseanBlindMap";
import HeroSearch from "@/components/HeroSearch";
import { ArrowRight, MapPin, Database, ShieldAlert, Send, CheckCircle2, Globe, FileText, Search } from "lucide-react";

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

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
    <div className="min-h-screen flex flex-col bg-[#faf9f6] dark:bg-[#0b0f17] text-slate-900 dark:text-slate-200 font-sans selection:bg-amber-500/30 selection:text-amber-900 dark:selection:text-amber-200 transition-colors">
      {/* Editorial Masthead Header */}
      <Header />

      <main className="flex-1">
        
        {/* POPULAR TOPICS PILL BAR (OUR WORLD IN DATA ARCHITECTURE) */}
        <section className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 py-2.5 px-4 sm:px-6 lg:px-8 font-sans">
          <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar text-xs">
            <span className="font-bold text-slate-600 dark:text-slate-400 uppercase text-[10px] tracking-wider whitespace-nowrap">
              POPULAR TOPICS:
            </span>
            <div className="flex items-center gap-2">
              {POPULAR_TOPICS.map((topic) => (
                <Link
                  key={topic.label}
                  href={`/ledger?q=${encodeURIComponent(topic.label)}`}
                  className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400 dark:hover:border-amber-500 font-medium whitespace-nowrap transition-colors shadow-xs"
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HERO SECTION: OUR WORLD IN DATA FULL-WIDTH MAP & SEARCH BANNER */}
        <section className="relative w-full bg-[#0f172a] dark:bg-[#090d16] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden shadow-2xl">
          
          {/* Full-Width Vector SVG ASEAN Blind Map Background */}
          <AseanBlindMap />

          {/* Centered Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            
            <span className="inline-block bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-sans uppercase font-bold tracking-wider">
              ENGAGEMEDIA OBSERVATORY
            </span>

            <h1 className="font-serif-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Research and data to safeguard digital rights across Southeast Asia.
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-2xl mx-auto">
              <Link href="/investigations" className="inline-flex items-center gap-1 text-amber-400 hover:underline font-semibold">
                <span>Read about our mission &amp; EngageMedia research strategy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>

            {/* High-Visibility Central Search Bar Component */}
            <div className="pt-2">
              <HeroSearch />
            </div>

            {/* Live Repository Micro-Stats Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-sans text-slate-300">
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80">
                🌐 <strong>11</strong> ASEAN Member States
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80">
                📊 <strong>14</strong> Ingested Decrees
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80">
                🛡️ <strong>100%</strong> Primary Source Verified
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80">
                🗣️ <strong>13</strong> Regional Languages
              </span>
            </div>

            <span className="text-[10px] text-slate-400 block font-sans">
              All free: open access and human rights licensed under CC BY 4.0
            </span>

          </div>
        </section>

        {/* HERO FEATURED STORY (LEAD INVESTIGATION PHOTO COVER) */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
          
          <div className="rounded-2xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-none grid grid-cols-1 lg:grid-cols-12 gap-0">
            
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
                  <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-300 dark:border-amber-500/30 uppercase">
                    DEFA SPECIAL REPORT
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 dark:text-slate-400">8 min read</span>
                </div>

                <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  ASEAN DEFA Legal Scrubbing: The Quiet Tug-of-War Over Cross-Border Data Privacy
                </h2>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-serif-editorial italic border-l-2 border-amber-600 dark:border-amber-500 pl-3">
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
              <span className="text-xs font-sans uppercase tracking-widest text-amber-600 dark:text-amber-500 font-bold block">
                01 • EXECUTIVE INSIGHTS
              </span>

              <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                The Deregulatory Push Behind Closed-Door Trade Treaties
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Projected to expand Southeast Asia’s digital economy to <strong>US$2.0 Trillion by 2030</strong>, the Digital Economy Framework Agreement (DEFA) governs nine core pillars. However, negotiations conducted exclusively behind closed doors leave regional civil society without democratic recourse.
              </p>

              <div className="p-4 rounded-xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm dark:shadow-none">
                <h4 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-sm">
                  Primary Friction Points:
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-500 font-bold">•</span>
                    <span><strong>Data Free Flow (DFFT):</strong> Tension between open transfer regimes (Singapore, Philippines) vs. mandatory localization (Vietnam Decree 53).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-500 font-bold">•</span>
                    <span><strong>Algorithmic Audit Bans:</strong> Big Tech lobbying seeking broad bans on mandatory source code disclosures.</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/investigations"
                className="inline-flex items-center gap-2 text-xs font-sans font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2"
              >
                <span>Read Complete Investigation Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* COLUMN 2: Secondary Field Dispatches (4 cols) */}
            <div className="lg:col-span-4 space-y-6 lg:border-r lg:border-slate-200 lg:dark:border-slate-800 lg:pr-8">
              <span className="text-xs font-sans uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold block">
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
                <span className="text-[10px] font-sans text-amber-600 dark:text-amber-400 font-bold uppercase">
                  DATA LOCALIZATION
                </span>
                <h4 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  Vietnam's Decree 53 &amp; Foreign Cloud Mandates: The Local Storage Squeeze
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed">
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
                <span className="text-[10px] font-sans text-amber-600 dark:text-amber-400 font-bold uppercase">
                  AI GOVERNANCE
                </span>
                <h4 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  Banning Algorithmic Audits: How Big Tech Lobbying Targets Treaties
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed">
                  Corporate trade lobbies advocate for broad treaty bans on mandatory source code disclosures.
                </p>
              </article>
            </div>

            {/* COLUMN 3: Live Policy Radar Stream (3 cols) */}
            <div className="lg:col-span-3 space-y-6">
              <span className="text-xs font-sans uppercase tracking-widest text-emerald-600 dark:text-emerald-500 font-bold block">
                03 • REGULATORY RADAR
              </span>

              <div className="space-y-4">
                <div className="p-3.5 rounded-lg bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between text-[10px] font-sans">
                    <span className="font-bold text-slate-900 dark:text-white">ASEAN Regional</span>
                    <span className="text-red-600 dark:text-red-400 font-bold">High Alert</span>
                  </div>
                  <h4 className="font-serif-editorial font-bold text-xs text-slate-900 dark:text-white leading-snug">
                    SEOM 57 Manila DEFA Scrubbing
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">July 15, 2026</span>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between text-[10px] font-sans">
                    <span className="font-bold text-slate-900 dark:text-white">Indonesia (ID)</span>
                    <span className="text-red-600 dark:text-red-400 font-bold">High Alert</span>
                  </div>
                  <h4 className="font-serif-editorial font-bold text-xs text-slate-900 dark:text-white leading-snug">
                    PDP Law Public Sector Server Storage
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">July 08, 2026</span>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between text-[10px] font-sans">
                    <span className="font-bold text-slate-900 dark:text-white">Singapore (SG)</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Rights Verified</span>
                  </div>
                  <h4 className="font-serif-editorial font-bold text-xs text-slate-900 dark:text-white leading-snug">
                    IMDA ASEAN MCCs Guidelines
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">June 28, 2026</span>
                </div>
              </div>

              <Link
                href="/ledger"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Module 01 */}
            <Link href="/observatory" className="group p-6 rounded-xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all flex flex-col justify-between shadow-sm dark:shadow-none">
              <div className="space-y-3">
                <span className="font-serif-editorial text-3xl font-extrabold text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors">
                  01
                </span>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Cartographic Observatory
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Interactive 11-country SVG ASEAN map documenting legal data localization regimes and country dossiers.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-sans text-blue-600 dark:text-blue-400 font-semibold">
                <span>Launch Map</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Module 02 */}
            <Link href="/ledger" className="group p-6 rounded-xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all flex flex-col justify-between shadow-sm dark:shadow-none">
              <div className="space-y-3">
                <span className="font-serif-editorial text-3xl font-extrabold text-slate-300 dark:text-slate-700 group-hover:text-emerald-500 transition-colors">
                  02
                </span>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Verified Policy Ledger
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Searchable database of ingested digital trade bills &amp; decrees with 100% primary source verification.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-sans text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Search Ledger</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Module 03 */}
            <Link href="/threats" className="group p-6 rounded-xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 hover:border-red-500 transition-all flex flex-col justify-between shadow-sm dark:shadow-none">
              <div className="space-y-3">
                <span className="font-serif-editorial text-3xl font-extrabold text-slate-300 dark:text-slate-700 group-hover:text-red-500 transition-colors">
                  03
                </span>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-lg group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  Rights Threat Matrix
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  4-column structural risk assessment evaluating data sovereignty and algorithmic audit prohibitions.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-sans text-red-600 dark:text-red-400 font-semibold">
                <span>View Risk Matrix</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Module 04 */}
            <Link href="/intake" className="group p-6 rounded-xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 hover:border-amber-500 transition-all flex flex-col justify-between shadow-sm dark:shadow-none">
              <div className="space-y-3">
                <span className="font-serif-editorial text-3xl font-extrabold text-slate-300 dark:text-slate-700 group-hover:text-amber-500 transition-colors">
                  04
                </span>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Submit Leaked Alert
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Encrypted intake portal for regional activists to submit leaked draft texts with anonymous protection.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-sans text-amber-600 dark:text-amber-400 font-semibold">
                <span>Submit Dossier</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </section>

        {/* SECTION 5: MINIMALIST NEWSLETTER SUBSCRIPTION */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-sans uppercase tracking-widest text-amber-600 dark:text-amber-500 font-bold">
                WEEKLY POLICY PULSE DISPATCH
              </span>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Receive Thursday Night Executive Policy Summaries
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                Get concise, source-verified 3-minute digests covering ASEAN DEFA negotiations delivered straight to your inbox.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed to Weekly Policy Pulse Dispatch!"); }} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter work email address..."
                className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500 font-sans min-w-[260px]"
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
