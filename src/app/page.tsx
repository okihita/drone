"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, MapPin, Database, ShieldAlert, Send, BookOpen, Clock, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f17] text-slate-800 dark:text-slate-200 font-sans selection:bg-amber-500/30 selection:text-amber-900 dark:selection:text-amber-200 transition-colors">
      {/* Header Masthead */}
      <Header />

      {/* Main Story-Focused Content */}
      <main className="flex-1">
        
        {/* HERO FEATURED STORY (LEAD INVESTIGATION) */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="rounded-2xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md dark:shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0 transition-colors">
            
            {/* Hero Cover Photo */}
            <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[460px] bg-slate-100 dark:bg-slate-900">
              <Image
                src="/images/defa_lead.jpg"
                alt="ASEAN DEFA Legal Scrubbing Conference Room in Manila"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
            </div>

            {/* Hero Lead Copy */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono-data">
                  <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-300 dark:border-amber-500/30 uppercase">
                    DEFA SPECIAL REPORT
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 dark:text-slate-400">8 min read</span>
                </div>

                <h1 className="font-serif-editorial text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                  ASEAN DEFA Legal Scrubbing: The Quiet Tug-of-War Over Cross-Border Data Privacy
                </h1>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-serif-editorial italic border-l-2 border-amber-600 dark:border-amber-500 pl-3">
                  As senior economic officials finalize the text of the world’s first region-wide digital trade agreement in Manila, civil society watchdogs warn that mandatory data flow clauses risk preempting domestic privacy safeguards.
                </p>

                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono-data">
                  By <strong className="text-slate-900 dark:text-slate-200">Okihita</strong> (EngageMedia Senior Research Lead)
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3">
                <Link
                  href="/investigations"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs font-mono-data transition-colors shadow-sm"
                >
                  <span>Read Full Investigation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/observatory"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-300 text-xs font-mono-data transition-colors border border-slate-300 dark:border-slate-800"
                >
                  <span>Map Dossier →</span>
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 2: RECENT INVESTIGATIONS GRID */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono-data text-amber-600 dark:text-amber-500 font-bold uppercase tracking-wider block mb-1">
                LATEST DISPATCHES
              </span>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Featured Field Analyses &amp; Policy Long-Reads
              </h2>
            </div>

            <Link
              href="/investigations"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono-data font-bold text-amber-600 dark:text-amber-400 hover:underline"
            >
              <span>View All Reports ({3})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Story Card 1 */}
            <article className="rounded-xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col sm:flex-row shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-all group">
              <div className="sm:w-2/5 relative min-h-[200px] bg-slate-100 dark:bg-slate-900">
                <Image
                  src="/images/vietnam_server.jpg"
                  alt="Vietnam Data Center Server Racks"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="sm:w-3/5 p-5 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono-data text-slate-500 dark:text-slate-400">
                    <span className="text-amber-600 dark:text-amber-400 font-bold uppercase">DATA LOCALIZATION</span>
                    <span>6 min read</span>
                  </div>

                  <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
                    Vietnam's Decree 53 &amp; Foreign Cloud Mandates: The Local Storage Squeeze
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                    How Ministry of Information notices mandate foreign tech platforms and OTT services to store user data in Hanoi under Law No. 24/2018.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono-data">
                  <span className="text-slate-500 dark:text-slate-400">EngageMedia Team</span>
                  <Link href="/investigations" className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                    <span>Read →</span>
                  </Link>
                </div>
              </div>
            </article>

            {/* Story Card 2 */}
            <article className="rounded-xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col sm:flex-row shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-all group">
              <div className="sm:w-2/5 relative min-h-[200px] bg-slate-100 dark:bg-slate-900">
                <Image
                  src="/images/ai_audit.jpg"
                  alt="AI Algorithmic Code Audit in Jakarta"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="sm:w-3/5 p-5 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono-data text-slate-500 dark:text-slate-400">
                    <span className="text-amber-600 dark:text-amber-400 font-bold uppercase">AI GOVERNANCE</span>
                    <span>7 min read</span>
                  </div>

                  <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
                    Banning Algorithmic Audits: How Big Tech Lobbying Targets Trade Treaties
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                    Corporate lobbies advocate for broad treaty bans on mandatory source code disclosures—limiting regulators from auditing automated AI engines.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono-data">
                  <span className="text-slate-500 dark:text-slate-400">Okihita</span>
                  <Link href="/investigations" className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                    <span>Read →</span>
                  </Link>
                </div>
              </div>
            </article>

          </div>
        </section>

        {/* SECTION 3: INTELLIGENCE TOOLS SUITE (MEDIA SITE WITH TOOLS) */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800">
          <div className="mb-8">
            <span className="text-xs font-mono-data text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider block mb-1">
              OBSERVATORY INTELLIGENCE SUITE
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interactive Tools &amp; Data Repositories
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Access D.R.O.N.E.’s specialized policy tools for researchers, activists, and digital rights defenders across Southeast Asia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Tool Card 1 */}
            <Link href="/observatory" className="group rounded-xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-blue-500 transition-all shadow-sm dark:shadow-none">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  ASEAN Jurisdiction Map
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Interactive vector SVG map covering 11 Southeast Asian Member States with data transfer regime filters and country dossiers.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-mono-data text-blue-600 dark:text-blue-400 font-semibold">
                <span>Launch Map</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Tool Card 2 */}
            <Link href="/ledger" className="group rounded-xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500 transition-all shadow-sm dark:shadow-none">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Verified Policy Ledger
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Searchable database of ingested digital trade bills, DEFA chapters, and decrees with 100% primary gazette source verification.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-mono-data text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Search Ledger</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Tool Card 3 */}
            <Link href="/threats" className="group rounded-xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-red-500 transition-all shadow-sm dark:shadow-none">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800 flex items-center justify-center text-red-700 dark:text-red-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-lg group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  Rights Threat Matrix
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  4-column structural risk assessment evaluating data sovereignty, AI audit prohibitions, and surveillance weaponization.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-mono-data text-red-600 dark:text-red-400 font-semibold">
                <span>View Risk Matrix</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Tool Card 4 */}
            <Link href="/intake" className="group rounded-xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500 transition-all shadow-sm dark:shadow-none">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-800 dark:text-amber-400">
                  <Send className="w-5 h-5" />
                </div>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Submit Leaked Text / Alert
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Encrypted intake portal for regional researchers &amp; activists to submit leaked draft texts with anonymous defender protection.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-mono-data text-amber-600 dark:text-amber-400 font-semibold">
                <span>Submit Alert</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </section>

        {/* SECTION 4: WEEKLY POLICY PULSE NEWSLETTER DISPATCH */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800">
          <div className="rounded-2xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm dark:shadow-none grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 space-y-3">
              <span className="text-xs font-mono-data text-amber-600 dark:text-amber-500 font-bold uppercase tracking-wider">
                WEEKLY POLICY PULSE DISPATCH
              </span>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Receive Thursday Night Executive Policy Summaries
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                Get concise, source-verified 3-minute digests covering ASEAN DEFA negotiations, cross-border data transfer decrees, and AI governance updates delivered to your inbox.
              </p>
            </div>

            <div className="md:col-span-5 space-y-3">
              <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed to Weekly Policy Pulse Dispatch!"); }} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter work email address..."
                  className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-3 py-2 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-mono-data text-xs font-bold transition-colors whitespace-nowrap"
                >
                  Subscribe Free
                </button>
              </form>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono-data">
                No spam. Unsubscribe anytime. Maintained by EngageMedia.
              </span>
            </div>

          </div>
        </section>

      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
