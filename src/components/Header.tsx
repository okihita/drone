"use client";

import React, { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { Shield, Radar, Search, Menu, X, FileText, Activity, AlertTriangle, Layers } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 border-b border-cyan-900/30 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold uppercase tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Live Monitoring
            </span>
            <span className="text-slate-400 text-ellipsis overflow-hidden">
              <strong className="text-slate-200">ASEAN DEFA Legal Scrubbing:</strong> Tracking 11 jurisdictions ahead of Nov 2026 Signing
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-400">
            <span>Client: <strong className="text-slate-200">EngageMedia</strong></span>
            <span className="text-slate-700">|</span>
            <span>Donors: <strong className="text-slate-200">Luminate Group</strong> &amp; <strong className="text-slate-200">Sida</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Radar className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-wider text-white group-hover:text-cyan-400 transition-colors">D.R.O.N.E.</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">v1.0</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
                Digital Rights Oversight &amp; Network Evaluator
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
            <Link href="#asean-map" className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
              <Radar className="w-4 h-4 text-cyan-400" />
              <span>ASEAN Map</span>
            </Link>
            <Link href="#weekly-recaps" className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Weekly Recaps</span>
            </Link>
            <Link href="#defa-tracker" className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>DEFA Tracker</span>
            </Link>
            <Link href="#threat-matrix" className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Threat Matrix</span>
            </Link>
            <Link href="#govsim" className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>GovSim</span>
            </Link>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative hidden md:block w-48 lg:w-56">
              <input
                type="text"
                placeholder="Search policy, country, DEFA..."
                className="w-full bg-slate-900/80 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Submit Alert Button */}
            <a
              href="#submit-alert"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Submit Alert</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 px-4 py-4 backdrop-blur-xl">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-300">
            <Link href="#asean-map" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-1.5 hover:text-cyan-400">
              <Radar className="w-4 h-4 text-cyan-400" /> ASEAN Map
            </Link>
            <Link href="#weekly-recaps" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-1.5 hover:text-cyan-400">
              <FileText className="w-4 h-4 text-slate-400" /> Weekly Recaps
            </Link>
            <Link href="#defa-tracker" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-1.5 hover:text-cyan-400">
              <Activity className="w-4 h-4 text-emerald-400" /> DEFA Tracker
            </Link>
            <Link href="#threat-matrix" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-1.5 hover:text-cyan-400">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Threat Matrix
            </Link>
            <Link href="#govsim" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-1.5 hover:text-cyan-400">
              <Layers className="w-4 h-4 text-purple-400" /> GovSim Simulation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
