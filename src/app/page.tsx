"use client";

import React from "react";
import Header from "@/components/Header";
import AseanMap from "@/components/AseanMap";
import PolicyLedgerTable from "@/components/PolicyLedgerTable";
import Footer from "@/components/Footer";
import { BookOpen, ExternalLink, ShieldAlert, ArrowRight, CheckCircle2, Lock, FileText, Globe, AlertTriangle, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f17] text-slate-200 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Header Masthead */}
      <Header />

      {/* Main Editorial Content */}
      <main className="flex-1">
        
        {/* FEATURED POLICY INVESTIGATION (LEADER ESSAY) */}
        <section id="featured-analysis" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Article Lead */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3 text-xs font-mono-data text-slate-400">
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded uppercase font-bold">
                  POLICY INVESTIGATION
                </span>
                <span>•</span>
                <span>Published July 2026</span>
                <span>•</span>
                <span>By <strong className="text-slate-200">Okihita</strong> (EngageMedia)</span>
              </div>

              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                ASEAN DEFA Legal Scrubbing: The Quiet Tug-of-War Over Cross-Border Data Privacy
              </h1>

              <p className="text-slate-300 text-base sm:text-lg font-serif-editorial italic leading-relaxed text-slate-300 border-l-2 border-amber-500 pl-4 py-1">
                As senior economic officials finalize the text of the world’s first region-wide digital trade agreement in Manila, civil society watchdogs warn that mandatory data flow clauses risk preempting domestic privacy safeguards.
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  Following the formal conclusion of 14 negotiation rounds at the 57th Senior Economic Officials Meeting (SEOM) in Manila, negotiators across all 10 ASEAN Member States have entered the critical <strong>legal scrubbing phase</strong> ahead of planned formal signing at the 49th ASEAN Summit in November 2026.
                </p>

                <p>
                  Projected to expand Southeast Asia’s digital economy from ~$300 billion to <strong>US$2.0 Trillion by 2030</strong>, the Digital Economy Framework Agreement (DEFA) governs nine core pillars—ranging from paperless e-customs and cross-border QR payments to artificial intelligence governance and cross-border data transfer.
                </p>

                <div className="p-4 rounded-lg bg-[#0e1420] border border-slate-800 space-y-2">
                  <h3 className="font-serif-editorial text-white text-base font-bold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    Key Friction Points Identified by D.R.O.N.E.:
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span><strong>Data Free Flow with Trust (DFFT) vs. Localization:</strong> Open regimes (Singapore, Philippines, Malaysia) push to outlaw mandatory data localization, while Vietnam (Decree 53/2022) and Indonesia (PP 71/2019 public sector) mandate local server storage.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span><strong>Source Code Audit Restrictions:</strong> Corporate tech lobbies are advocating for broad bans on mandatory source code disclosure, limiting national regulators from inspecting high-risk automated decision systems for algorithmic bias.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span><strong>Democratic Deficit:</strong> DEFA text negotiations were conducted exclusively behind closed doors by Senior Economic Officials Meetings (SEOM) without formal consultation with regional digital rights defenders or independent trade unions.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href="#asean-map"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs font-mono-data transition-colors border border-slate-700"
                >
                  <span>Inspect Jurisdiction Map &amp; Dossiers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#policy-ledger"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono-data transition-colors border border-slate-800"
                >
                  <span>View Verified Policy Ledger</span>
                </a>
              </div>
            </div>

            {/* Right Side Key Indicators Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Executive Summary Box */}
              <div className="rounded-xl bg-[#0e1420] border border-slate-800 p-5 space-y-4">
                <h3 className="font-mono-data text-xs uppercase font-bold text-slate-400 tracking-wider border-b border-slate-800 pb-2">
                  DEFA Executive Indicators
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-mono-data text-[10px] block">CURRENT PHASE</span>
                    <span className="text-white font-bold text-sm font-serif-editorial">Legal Scrubbing &amp; Review</span>
                  </div>

                  <div>
                    <span className="text-slate-500 font-mono-data text-[10px] block">TARGET SIGNING</span>
                    <span className="text-amber-400 font-bold font-mono-data">Nov 2026 (49th Summit)</span>
                  </div>

                  <div>
                    <span className="text-slate-500 font-mono-data text-[10px] block">MACROECONOMIC VALUE</span>
                    <span className="text-emerald-400 font-bold font-mono-data">US$ 2.0 Trillion by 2030</span>
                  </div>

                  <div>
                    <span className="text-slate-500 font-mono-data text-[10px] block">COVERAGE</span>
                    <span className="text-slate-300 font-medium">10 Member States + Timor-Leste</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                  Source: ASEAN Secretariat Press Release &amp; SEOM 57 Official Record (Manila).
                </div>
              </div>

              {/* Donor Alignment Note Box */}
              <div className="rounded-xl bg-[#0e1420] border border-slate-800 p-5 space-y-3">
                <h4 className="font-mono-data text-xs uppercase font-bold text-white tracking-wider">
                  Donor Strategic Focus
                </h4>
                <div className="text-xs text-slate-400 space-y-2">
                  <p>
                    <strong className="text-slate-200">Luminate Group:</strong> Supporting platform accountability, algorithmic oversight, and challenging deregulatory Big Tech trade demands.
                  </p>
                  <p>
                    <strong className="text-slate-200">Sida (Sweden):</strong> Advancing regional cooperation for human rights, democracy, rule of law, and defending online civic space in Asia-Pacific.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 2: CARTOGRAPHIC POLICY OBSERVATORY (ASEAN MAP) */}
        <AseanMap />

        {/* SECTION 3: VERIFIED POLICY LEDGER & DATA TABLE */}
        <PolicyLedgerTable />

        {/* SECTION 4: CIVIL SOCIETY THREAT MATRIX */}
        <section id="threat-matrix" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
          <div className="mb-8">
            <span className="text-[11px] font-mono-data uppercase tracking-wider text-red-400 font-bold block mb-1">
              RISK ASSESSMENT MATRIX
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Civil Society Digital Rights Threat Matrix
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Evaluating the 4 major structural risks posed by unmitigated digital trade agreements and legislative decrees across ASEAN.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="rounded-xl bg-[#0e1420] border border-slate-800 p-5 space-y-3">
              <div className="w-8 h-8 rounded bg-red-950/80 border border-red-800 flex items-center justify-center text-red-400 font-mono-data font-bold text-xs">
                01
              </div>
              <h3 className="font-serif-editorial font-bold text-white text-base">
                Data Free Flow vs. Privacy Sovereignty
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Mandatory data flow rules without robust baseline privacy protections risk enabling commercial data harvesting by foreign tech platforms without citizen recourse.
              </p>
            </div>

            <div className="rounded-xl bg-[#0e1420] border border-slate-800 p-5 space-y-3">
              <div className="w-8 h-8 rounded bg-amber-950/80 border border-amber-800 flex items-center justify-center text-amber-400 font-mono-data font-bold text-xs">
                02
              </div>
              <h3 className="font-serif-editorial font-bold text-white text-base">
                Bans on Source Code Audits
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Trade clauses prohibiting mandatory source code disclosures prevent civil society and regulators from auditing automated AI systems for algorithmic discrimination.
              </p>
            </div>

            <div className="rounded-xl bg-[#0e1420] border border-slate-800 p-5 space-y-3">
              <div className="w-8 h-8 rounded bg-amber-950/80 border border-amber-800 flex items-center justify-center text-amber-400 font-mono-data font-bold text-xs">
                03
              </div>
              <h3 className="font-serif-editorial font-bold text-white text-base">
                Cybersecurity Weaponization
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Vague "cybersecurity" and "public order" exceptions can be co-opted by authoritarian regimes to justify internet shutdowns, surveillance, and content censorship.
              </p>
            </div>

            <div className="rounded-xl bg-[#0e1420] border border-slate-800 p-5 space-y-3">
              <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-mono-data font-bold text-xs">
                04
              </div>
              <h3 className="font-serif-editorial font-bold text-white text-base">
                Democratic Consultation Deficit
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Secretive treaty negotiations conducted by trade ministers bind domestic parliaments to deregulatory commitments without public or parliamentary debate.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 5: COMMUNITY ALERT INTAKE & DOSSIER SUBMISSION */}
        <section id="submit-dossier" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
          <div className="rounded-xl bg-[#0e1420] border border-slate-800 p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-mono-data uppercase tracking-wider text-amber-500 font-bold block">
              CIVIL SOCIETY DOSSIER INTAKE
            </span>

            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Submit a Policy Alert or Leaked Draft Text
            </h2>

            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              EngageMedia invites regional researchers, activists, and human rights defenders to securely submit draft legislative texts, leak notices, or local policy alerts. Supports public credit, co-branding, or anonymous defender protection.
            </p>

            <div className="pt-2">
              <button
                onClick={() => alert("D.R.O.N.E. Encrypted Dossier Submission Form active in Sprint 5 module!")}
                className="px-6 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs font-mono-data transition-colors"
              >
                Open Secure Intake Form
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
