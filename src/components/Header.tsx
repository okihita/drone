"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, BookOpen, Map, Database, ShieldAlert, Send } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors sticky top-0 z-50 backdrop-blur-md bg-slate-50/95 dark:bg-slate-950/95 font-sans">
      {/* Main Masthead Header with Generous Breathing Room */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border-b border-slate-200/80 dark:border-slate-800/60 font-sans">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Main Title & Acronym — Split 2-Line Subtitle Vertically Aligned */}
          <div>
            <Link href="/" className="group inline-block">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-serif-editorial text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors leading-none">
                  D.R.O.N.E.
                </span>
                
                <div className="border-l border-slate-300 dark:border-slate-700 pl-3 sm:pl-4 flex flex-col justify-center text-[10px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold leading-snug">
                  <span>Digital Rights Oversight &amp;</span>
                  <span>Network Evaluator</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Tools: Theme Toggle & Language Switcher Only (No Search Bar) */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Switcher */}
            <LanguageSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <nav className="hidden md:flex items-center gap-8 py-3.5 text-xs font-medium font-sans">
          <Link
            href="/investigations"
            className={`flex items-center gap-1.5 transition-colors ${
              isActive("/investigations")
                ? "text-asean-yellow font-bold border-b-2 border-asean-yellow pb-0.5"
                : "text-slate-700 dark:text-slate-300 hover:text-asean-yellow"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-asean-yellow" />
            <span>Investigations</span>
          </Link>

          <Link
            href="/observatory"
            className={`flex items-center gap-1.5 transition-colors ${
              isActive("/observatory")
                ? "text-asean-yellow font-bold border-b-2 border-asean-yellow pb-0.5"
                : "text-slate-700 dark:text-slate-300 hover:text-asean-yellow"
            }`}
          >
            <Map className="w-3.5 h-3.5 text-asean-blue" />
            <span>Cartographic Observatory</span>
          </Link>

          <Link
            href="/ledger"
            className={`flex items-center gap-1.5 transition-colors ${
              isActive("/ledger")
                ? "text-asean-yellow font-bold border-b-2 border-asean-yellow pb-0.5"
                : "text-slate-700 dark:text-slate-300 hover:text-asean-yellow"
            }`}
          >
            <Database className="w-3.5 h-3.5 text-asean-blue" />
            <span>Policy Ledger</span>
          </Link>

          <Link
            href="/threats"
            className={`flex items-center gap-1.5 transition-colors ${
              isActive("/threats")
                ? "text-asean-yellow font-bold border-b-2 border-asean-yellow pb-0.5"
                : "text-slate-700 dark:text-slate-300 hover:text-asean-yellow"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-asean-red" />
            <span>Threat Matrix</span>
          </Link>

          <Link
            href="/intake"
            className={`flex items-center gap-1.5 transition-colors ${
              isActive("/intake")
                ? "text-asean-yellow font-bold border-b-2 border-asean-yellow pb-0.5"
                : "text-slate-700 dark:text-slate-300 hover:text-asean-yellow"
            }`}
          >
            <Send className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Submit Dossier</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-4 space-y-3 text-xs font-sans">
          <Link href="/investigations" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 dark:text-slate-300 hover:text-asean-yellow">
            Investigations &amp; Reports
          </Link>
          <Link href="/observatory" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 dark:text-slate-300 hover:text-asean-yellow">
            Cartographic Observatory
          </Link>
          <Link href="/ledger" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 dark:text-slate-300 hover:text-asean-yellow">
            Verified Policy Ledger
          </Link>
          <Link href="/threats" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 dark:text-slate-300 hover:text-asean-yellow">
            Civil Society Threat Matrix
          </Link>
          <Link href="/intake" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 dark:text-slate-300 hover:text-asean-yellow">
            Submit Dossier / Alert
          </Link>
        </div>
      )}
    </header>
  );
}
