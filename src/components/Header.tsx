"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { Search, Menu, X, BookOpen, Map, Database, ShieldAlert, Send } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090d16] transition-colors sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-[#090d16]/95">
      {/* Top Editorial Masthead Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 px-4 py-1.5 text-[11px] text-slate-600 dark:text-slate-400 font-mono-data">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">
              EngageMedia Observatory
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Southeast Asia Digital Rights &amp; Policy Intelligence</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <span>Donors: <strong className="text-slate-900 dark:text-slate-200">Luminate Group</strong> &amp; <strong className="text-slate-900 dark:text-slate-200">Sida</strong></span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span>Issue: <strong className="text-slate-900 dark:text-slate-200">July 2026 Edition</strong></span>
          </div>
        </div>
      </div>

      {/* Main Masthead Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-b border-slate-200 dark:border-slate-800/60">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Main Title & Acronym */}
          <div>
            <Link href="/" className="group inline-block">
              <div className="flex items-baseline gap-3">
                <span className="font-serif-editorial text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  D.R.O.N.E.
                </span>
                <span className="text-xs font-mono-data text-slate-500 dark:text-slate-400 uppercase tracking-widest border-l border-slate-300 dark:border-slate-700 pl-3">
                  Digital Rights Oversight &amp; Network Evaluator
                </span>
              </div>
            </Link>
          </div>

          {/* Right Tools: Search, Theme Toggle & Language Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative hidden sm:block w-48">
              <input
                type="text"
                placeholder="Search stories, policies..."
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-3 py-1.5 pl-8 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 top-2.5" />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Switcher */}
            <LanguageSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="hidden md:flex items-center gap-8 py-2.5 text-xs font-medium font-mono-data">
          <Link
            href="/investigations"
            className={`flex items-center gap-1.5 transition-colors ${
              isActive("/investigations")
                ? "text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-500 pb-0.5"
                : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
            <span>Investigations</span>
          </Link>

          <Link
            href="/observatory"
            className={`flex items-center gap-1.5 transition-colors ${
              isActive("/observatory")
                ? "text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-500 pb-0.5"
                : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400"
            }`}
          >
            <Map className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Cartographic Observatory</span>
          </Link>

          <Link
            href="/ledger"
            className={`flex items-center gap-1.5 transition-colors ${
              isActive("/ledger")
                ? "text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-500 pb-0.5"
                : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400"
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Policy Ledger</span>
          </Link>

          <Link
            href="/threats"
            className={`flex items-center gap-1.5 transition-colors ${
              isActive("/threats")
                ? "text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-500 pb-0.5"
                : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
            <span>Threat Matrix</span>
          </Link>

          <Link
            href="/intake"
            className={`flex items-center gap-1.5 transition-colors ${
              isActive("/intake")
                ? "text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-500 pb-0.5"
                : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400"
            }`}
          >
            <Send className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Submit Dossier</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-4 space-y-3 text-xs font-mono-data">
          <Link href="/investigations" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 dark:text-slate-300 hover:text-amber-600">
            Investigations &amp; Reports
          </Link>
          <Link href="/observatory" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 dark:text-slate-300 hover:text-amber-600">
            Cartographic Observatory
          </Link>
          <Link href="/ledger" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 dark:text-slate-300 hover:text-amber-600">
            Verified Policy Ledger
          </Link>
          <Link href="/threats" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 dark:text-slate-300 hover:text-amber-600">
            Civil Society Threat Matrix
          </Link>
          <Link href="/intake" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 dark:text-slate-300 hover:text-amber-600">
            Submit Dossier / Alert
          </Link>
        </div>
      )}
    </header>
  );
}
