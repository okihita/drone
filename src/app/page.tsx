"use client";

import React from "react";
import Header from "@/components/Header";
import AseanMap from "@/components/AseanMap";
import PolicyCard from "@/components/PolicyCard";
import Footer from "@/components/Footer";
import { Radar, Shield, Activity, FileText, ArrowRight, CheckCircle2, Lock, AlertTriangle, Layers, Globe, Zap } from "lucide-react";

export default function Home() {
  const samplePolicies = [
    {
      id: "P01",
      title: "ASEAN DEFA Legal Scrubbing Concludes in Manila Ahead of Nov 2026 Signing",
      jurisdiction: "ASEAN Regional",
      category: "DEFA" as const,
      date: "July 2026",
      threatLevel: "High Alert" as const,
      summary: "57th SEOM concludes negotiations on 9 pillars targeting a $2T digital economy by 2030. Legal scrubbing is underway to harmonize cross-border data transfer (DFFT) against strict national localization laws.",
      primarySource: "ASEAN Secretariat Official Gazette",
      sourceUrl: "https://asean.org",
    },
    {
      id: "P02",
      title: "Indonesia PDP Law Enforces Public Sector Data Localization Mandate (PP 71/2019)",
      jurisdiction: "Indonesia (ID)",
      category: "Cross-Border Data" as const,
      date: "July 2026",
      threatLevel: "High Alert" as const,
      summary: "Kominfo enforces strict domestic server storage for public ESOs, while private operators undergo audit. MR5 24-hour take-down mandates present ongoing content moderation compliance pressure.",
      primarySource: "Kominfo RI & DPR Portal",
      sourceUrl: "https://kominfo.go.id",
    },
    {
      id: "P03",
      title: "Singapore IMDA Expands ASEAN Model Contractual Clauses (MCCs) Integration",
      jurisdiction: "Singapore (SG)",
      category: "Cross-Border Data" as const,
      date: "July 2026",
      threatLevel: "Rights Verified" as const,
      summary: "IMDA and PDPC release updated implementation guidelines for ASEAN MCCs, permitting seamless data transfers to verified regional business partners without custom legal agreements.",
      primarySource: "IMDA & PDPC Singapore",
      sourceUrl: "https://imda.gov.sg",
    },
    {
      id: "P04",
      title: "Vietnam Decree 53/2022 Mandates Local Office & Server Storage for Tech Platforms",
      jurisdiction: "Vietnam (VN)",
      category: "Cybersecurity" as const,
      date: "June 2026",
      threatLevel: "High Alert" as const,
      summary: "Ministry of Information & Communications issues compliance notices requiring cloud service providers and social platforms to store user data domestically in Hanoi/HCMC.",
      primarySource: "Vietnam National Assembly Portal",
      sourceUrl: "https://mic.gov.vn",
    },
    {
      id: "P05",
      title: "Thailand ETDA Issues Guidelines for High-Risk Algorithmic Platform Oversight",
      jurisdiction: "Thailand (TH)",
      category: "AI Governance" as const,
      date: "June 2026",
      threatLevel: "Medium Risk" as const,
      summary: "ETDA introduces draft algorithmic risk assessment frameworks under the Royal Decree on Digital Platforms, requiring mandatory bias reporting for automated recommendation engines.",
      primarySource: "ETDA Thailand Gazette",
      sourceUrl: "https://etda.or.th",
    },
    {
      id: "P06",
      title: "Philippines National Privacy Commission (NPC) Approves APEC CBPR Interoperability",
      jurisdiction: "Philippines (PH)",
      category: "Cross-Border Data" as const,
      date: "May 2026",
      threatLevel: "Rights Verified" as const,
      summary: "NPC approves updated cross-border data transfer mechanisms aligning Philippines Data Privacy Act with regional APEC CBPR framework and ASEAN MCCs.",
      primarySource: "NPC Philippines Portal",
      sourceUrl: "https://privacy.gov.ph",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Navbar Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          {/* Ambient Background Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md shadow-lg shadow-cyan-500/10">
              <Radar className="w-4 h-4 text-cyan-400 animate-spin-slow" />
              <span>Sprint 1 Engine • D.R.O.N.E. Platform Active</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
              High-Altitude Intelligence on{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                ASEAN Tech Policy
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-3xl mx-auto font-normal">
              <strong>D.R.O.N.E.</strong> (Digital Rights Oversight &amp; Network Evaluator) translates dense digital trade treaties, ASEAN DEFA negotiations, and AI governance bills into actionable intelligence for civil society, journalists, and rights defenders across 11 Southeast Asian nations.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <a
                href="#asean-map"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 hover:scale-105"
              >
                <Radar className="w-4 h-4" />
                <span>Explore ASEAN Map</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#weekly-recaps"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all hover:border-slate-500"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Read Weekly Recaps</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl text-left">
              <div className="p-2">
                <span className="text-xs text-slate-400 block font-mono">Coverage</span>
                <span className="text-lg font-bold text-white">11 Nations</span>
              </div>
              <div className="p-2 border-l border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">DEFA Target</span>
                <span className="text-lg font-bold text-cyan-400">$2.0 Trillion</span>
              </div>
              <div className="p-2 border-l border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Pillars</span>
                <span className="text-lg font-bold text-white">9 Chapters</span>
              </div>
              <div className="p-2 border-l border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Verification</span>
                <span className="text-lg font-bold text-emerald-400">100% Verified</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: INTERACTIVE ASEAN MAP */}
        <AseanMap />

        {/* SECTION 2: PULSE OF ASEAN WEEKLY RECAPS GRID */}
        <section id="weekly-recaps" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
                <Activity className="w-3.5 h-3.5" />
                <span>Weekly Intelligence Digest</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Pulse of ASEAN: Recent Policy Shifts
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                Source-verified executive recaps synthesized from Tier 1 government gazettes, parliamentary portals, and watchdog feeds.
              </p>
            </div>

            <a
              href="#defa-tracker"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              <span>View All Ingested Policies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samplePolicies.map((item) => (
              <PolicyCard key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* SECTION 3: ASEAN DEFA TRACKER & CROSS-BORDER DATA FLOW */}
        <section id="defa-tracker" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                <span>DEFA Deep-Dive Monitor</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                ASEAN Digital Economy Framework Agreement (DEFA)
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                DEFA is the world’s first region-wide, legally binding digital trade agreement. Negotiated across 14 rounds and concluded in Manila (May 2026), DEFA aims to double ASEAN’s digital economy value from ~$300B to <strong>US$2.0 Trillion by 2030</strong>.
              </p>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Current Status (July 2026): Legal Scrubbing Phase</strong>
                    <span>Legal review across member states ahead of formal signing at the 49th ASEAN Summit (Nov 2026).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Cross-Border Data Flow (DFFT) Friction Point</strong>
                    <span>Open transfer regimes (SG, PH, MY) pushing for localization bans vs. strict data localization mandates (VN, MM, ID public sector).</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Visual Card */}
            <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border-cyan-500/30 space-y-4">
              <h3 className="font-bold text-white text-base flex items-center justify-between">
                <span>DEFA Timeline &amp; Milestones</span>
                <span className="text-xs font-mono text-cyan-400">Nov 2026 Target</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="relative pl-6 border-l-2 border-emerald-500">
                  <span className="text-emerald-400 font-bold block">Sept 2023</span>
                  <span className="text-slate-200 font-medium">Official DEFA Launch &amp; Framework Approval</span>
                </div>

                <div className="relative pl-6 border-l-2 border-emerald-500">
                  <span className="text-emerald-400 font-bold block">May 2026</span>
                  <span className="text-slate-200 font-medium">57th SEOM Manila: Negotiations Concluded</span>
                </div>

                <div className="relative pl-6 border-l-2 border-cyan-400">
                  <span className="text-cyan-400 font-bold block">July 2026 (Active Now)</span>
                  <span className="text-white font-bold">Legal Scrubbing &amp; Domestic Consultations</span>
                </div>

                <div className="relative pl-6 border-l-2 border-slate-700">
                  <span className="text-slate-500 font-bold block">Nov 2026</span>
                  <span className="text-slate-400">Planned Formal Signing (49th ASEAN Summit)</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: COMMUNITY SUBMISSION INTAKE */}
        <section id="submit-alert" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
          <div className="rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/30 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Shield className="w-48 h-48 text-cyan-400" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                <span>Encrypted Defender Portal</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Submit a Policy Alert or Leaked Text
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                Regional grantees, human rights defenders, and researchers can submit draft laws, leak notices, or policy alerts. Supports public credit, co-branding, or anonymous defender protection.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => alert("D.R.O.N.E. Encrypted Submission Intake Form active in Sprint 5 module!")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25"
                >
                  <Shield className="w-4 h-4" />
                  <span>Open Secure Intake Form</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
