"use client";

import React, { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { Search, Menu, X, BookOpen, Map, Database, ShieldAlert, FileText } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-slate-800 bg-[#090d16]">
      {/* Top Editorial Masthead Bar */}
      <div className="border-b border-slate-800/80 bg-slate-950 px-4 py-2 text-[11px] text-slate-400 font-mono-data">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-bold text-amber-500 uppercase tracking-wider">
              EngageMedia Observatory
            </span>
            <span className="text-slate-700">•</span>
            <span>Southeast Asia Digital Rights &amp; Policy Intelligence</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Donors: <strong className="text-slate-200">Luminate Group</strong> &amp; <strong className="text-slate-200">Sida</strong></span>
            <span className="text-slate-700">|</span>
            <span>Issue: <strong className="text-slate-200">July 2026 Edition</strong></span>
          </div>
        </div>
      </div>

      {/* Main Masthead Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-slate-800/60">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Main Title & Acronym */}
          <div>
            <Link href="/" className="group inline-block">
              <div className="flex items-baseline gap-3">
                <span className="font-serif-editorial text-3xl sm:text-4xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  D.R.O.N.E.
                </span>
                <span className="text-xs font-mono-data text-slate-400 uppercase tracking-widest border-l border-slate-700 pl-3">
                  Digital Rights Oversight &amp; Network Evaluator
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 font-sans mt-1 max-w-2xl">
              An independent policy research portal &amp; early-warning observatory monitoring trade agreements, cross-border data transfer laws, and AI governance across 11 Southeast Asian nations.
            </p>
          </div>

          {/* Right Tools & Language Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative hidden sm:block w-48">
              <input
                type="text"
                placeholder="Search policy, country, DEFA..."
                className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 pl-8 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-600"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            </div>

            <LanguageSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded bg-slate-900 text-slate-300 border border-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="hidden md:flex items-center gap-8 py-3 text-xs font-medium text-slate-300">
          <Link href="#featured-analysis" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Featured Analysis</span>
          </Link>
          <Link href="#asean-map" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
            <Map className="w-3.5 h-3.5 text-blue-400" />
            <span>ASEAN Map &amp; Dossiers</span>
          </Link>
          <Link href="#policy-ledger" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Policy Ledger &amp; Table</span>
          </Link>
          <Link href="#defa-monitor" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>DEFA Monitor</span>
          </Link>
          <Link href="#threat-matrix" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Rights Threat Matrix</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 py-4 space-y-3 text-xs">
          <Link href="#featured-analysis" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-300 hover:text-amber-400">
            Featured Analysis
          </Link>
          <Link href="#asean-map" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-300 hover:text-amber-400">
            ASEAN Map &amp; Dossiers
          </Link>
          <Link href="#policy-ledger" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-300 hover:text-amber-400">
            Policy Ledger &amp; Data Table
          </Link>
          <Link href="#defa-monitor" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-300 hover:text-amber-400">
            DEFA Monitor
          </Link>
          <Link href="#threat-matrix" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-300 hover:text-amber-400">
            Rights Threat Matrix
          </Link>
        </div>
      )}
    </header>
  );
}
