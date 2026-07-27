"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AseanBlindMap from "@/components/AseanBlindMap";
import HeroSearch from "@/components/HeroSearch";
import { ArrowRight, Globe, FileText, ShieldCheck, Languages, ChevronLeft, ChevronRight } from "lucide-react";

export interface HeroStory {
  id: string;
  category: string;
  readTime: string;
  title: string;
  summary: string;
  author: string;
  imageSrc: string;
  slug: string;
}

export const HERO_STORIES: HeroStory[] = [
  {
    id: "defa-legal-scrubbing",
    category: "DEFA SPECIAL REPORT",
    readTime: "8 min read",
    title: "ASEAN DEFA Legal Scrubbing: The Quiet Tug-of-War Over Cross-Border Data Privacy",
    summary: "As senior economic officials finalize the text of the world’s first region-wide digital trade agreement in Manila, civil society watchdogs warn that mandatory data flow clauses risk preempting domestic privacy safeguards.",
    author: "EngageMedia Research Team",
    imageSrc: "/images/defa_lead.jpg",
    slug: "/investigations",
  },
  {
    id: "vietnam-decree-53",
    category: "DATA LOCALIZATION",
    readTime: "6 min read",
    title: "Vietnam's Decree 53 & Foreign Cloud Mandates: The Local Storage Squeeze",
    summary: "How Ministry of Information notices mandate foreign tech platforms to store user data in Hanoi server centers, creating severe compliance pressure on international civil society orgs.",
    author: "EngageMedia Research Team",
    imageSrc: "/images/vietnam_server.jpg",
    slug: "/investigations",
  },
  {
    id: "ai-audit-bans",
    category: "AI GOVERNANCE",
    readTime: "7 min read",
    title: "Banning Algorithmic Audits: How Big Tech Lobbying Targets Treaties",
    summary: "Corporate trade lobbies advocate for broad treaty bans on mandatory source code disclosures, shielding high-risk automated decision systems from civil society scrutiny.",
    author: "EngageMedia Research Team",
    imageSrc: "/images/ai_audit.jpg",
    slug: "/investigations",
  },
];

export default function Home() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const POPULAR_TOPICS = [
    { label: "ASEAN DEFA", category: "DEFA" },
    { label: "Cross-Border Data", category: "Cross-Border Data" },
    { label: "AI Governance", category: "AI Governance" },
    { label: "Cybersecurity", category: "Cybersecurity" },
    { label: "Data Localization", category: "Cross-Border Data" },
    { label: "Privacy Sovereignty", category: "DEFA" },
    { label: "Source Code Audits", category: "AI Governance" },
  ];

  // Auto-play interval for hero story carousel (6s)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_STORIES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeStory = HERO_STORIES[activeSlideIndex];

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev === 0 ? HERO_STORIES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % HERO_STORIES.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors dark:bg-dossier-noise">
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

            {/* Static Micro-Stats Badges with Neutral Uncolored Lucide Icons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-sans text-slate-300">
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5 shadow-xs">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span><strong>11</strong> ASEAN Member States</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5 shadow-xs">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span><strong>14</strong> Ingested Decrees</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span><strong>100%</strong> Primary Source Verified</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5 shadow-xs">
                <Languages className="w-3.5 h-3.5 text-slate-400" />
                <span><strong>2</strong> Languages (EN &amp; ID)</span>
              </span>
            </div>

          </div>
        </section>

        {/* HERO FEATURED STORY CAROUSEL WITH CROSSFADE SLIDESHOW & LOCKED HEIGHT */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
          
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-none transition-all duration-300 min-h-[500px] lg:h-[500px]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch h-full">
              
              {/* Left Column: Photo Container with Smooth Image Crossfade */}
              <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-full h-full bg-slate-950 overflow-hidden">
                {HERO_STORIES.map((story, idx) => (
                  <div
                    key={story.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      activeSlideIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={story.imageSrc}
                      alt={story.title}
                      fill
                      priority={idx === 0}
                      className="object-cover"
                    />
                  </div>
                ))}

                {/* Subtle Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden z-20" />
              </div>

              {/* Right Column: Dynamic Slide Content Copy (Up to 4 Lines Title & 4 Lines Subtitle) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full space-y-4 relative z-20">
                <div className="space-y-4 flex-1 flex flex-col justify-center">
                  <div className="flex items-center justify-between gap-2 text-xs font-sans">
                    <span className="bg-asean-yellow/20 text-asean-yellow font-bold px-2.5 py-0.5 rounded border border-asean-yellow/30 uppercase tracking-wider">
                      {activeStory.category}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 font-sans text-xs">{activeStory.readTime}</span>
                  </div>

                  {/* Title Container: Up to 4 Lines */}
                  <div className="min-h-[5.5rem] flex items-center">
                    <h2 className="font-serif-editorial text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug line-clamp-4 transition-all duration-300">
                      {activeStory.title}
                    </h2>
                  </div>

                  {/* Subtitle / Summary Container: Up to 4 Lines */}
                  <div className="min-h-[5.5rem] flex items-center">
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-serif-editorial italic border-l-2 border-asean-yellow pl-3 line-clamp-4 transition-all duration-300">
                      {activeStory.summary}
                    </p>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 font-sans pt-1">
                    By <strong className="text-slate-900 dark:text-slate-200">{activeStory.author}</strong>
                  </div>
                </div>

                {/* Primary Call to Action Button */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between mt-auto">
                  <Link
                    href={activeStory.slug}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs font-sans transition-colors shadow-xs"
                  >
                    <span>Read Full Investigation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-sans font-semibold">
                    Story {activeSlideIndex + 1} of {HERO_STORIES.length}
                  </span>
                </div>

              </div>

            </div>

            {/* Left & Right Arrow Navigation Buttons */}
            <button
              onClick={handlePrevSlide}
              aria-label="Previous Story"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextSlide}
              aria-label="Next Story"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* CAROUSEL NAVIGATION DOTS & PROGRESS LINES UNDERNEATH */}
          <div className="mt-4 flex items-center justify-center gap-2.5 font-sans">
            {HERO_STORIES.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => setActiveSlideIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${story.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlideIndex === idx
                    ? "w-8 bg-asean-yellow"
                    : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                }`}
              />
            ))}
          </div>

        </section>

        {/* SECTION 3: 3-COLUMN EDITORIAL ATELIER GRID (FEATURE 2: STAGGERED FADE-UP ANIMATIONS & FEATURE 6: EDITORIAL DROP-CAP) */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* COLUMN 1: Lead Analysis & Context (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:border-r lg:border-slate-200 lg:dark:border-slate-800 lg:pr-8 animate-fade-up">
              <span className="text-xs font-sans uppercase tracking-widest text-asean-yellow font-bold block">
                01 • EXECUTIVE INSIGHTS
              </span>

              <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                The Deregulatory Push Behind Closed-Door Trade Treaties
              </h3>

              {/* Feature 6: Editorial Serif Drop-Cap */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                <span className="float-left text-4xl sm:text-5xl font-serif-editorial font-extrabold pr-2.5 pt-0.5 text-asean-yellow leading-none select-none">
                  P
                </span>
                rojected to expand Southeast Asia’s digital economy to <strong>US$2.0 Trillion by 2030</strong>, the Digital Economy Framework Agreement (DEFA) governs nine core pillars. However, negotiations conducted exclusively behind closed doors leave regional civil society without democratic recourse.
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
            <div className="lg:col-span-4 space-y-6 lg:border-r lg:border-slate-200 lg:dark:border-slate-800 lg:pr-8 animate-fade-up [animation-delay:150ms]">
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
                    className="object-cover transition-opacity duration-500"
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
                    className="object-cover transition-opacity duration-500"
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
            <div className="lg:col-span-3 space-y-6 animate-fade-up [animation-delay:300ms]">
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
                className="px-6 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-sans text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
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
