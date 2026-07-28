"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors sticky top-[var(--drone-admin-bar-h,0px)] z-50 backdrop-blur-md bg-slate-50/95 dark:bg-slate-950/95 font-sans">
      {/* Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 border-b border-slate-200/80 dark:border-slate-800/60 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div className="flex items-center h-full justify-start">
            <Link
              href="https://engagemedia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3"
            >
              <Image
                src="/images/engagemedia-logo.png"
                alt="EngageMedia Logo"
                width={768}
                height={230}
                className="h-12 sm:h-14 w-auto transition-opacity group-hover:opacity-85"
              />
            </Link>
          </div>

          <div className="flex items-center h-full justify-center text-center">
            <Link href="/" className="group block">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors leading-none m-0 p-0 select-none">
                  DRONE
                </span>
                <div className="border-l border-slate-300 dark:border-slate-700 pl-3 sm:pl-4 text-left flex flex-col justify-center text-[10px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold leading-none py-0.5 space-y-1">
                  <span className="leading-none block">Digital Rights Oversight</span>
                  <span className="leading-none block">&amp; Network Evaluator</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center h-full gap-3 justify-end">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <nav className="hidden md:flex items-center justify-center gap-8 py-3.5 text-xs font-medium font-sans">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 transition-colors ${
                isActive(link.href)
                  ? "text-asean-yellow font-bold border-b-2 border-asean-yellow pb-0.5"
                  : "text-slate-700 dark:text-slate-300 hover:text-asean-yellow"
              }`}
            >
              <link.icon className={`w-3.5 h-3.5 ${link.iconColor}`} />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-4 space-y-3 text-xs font-sans">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-slate-700 dark:text-slate-300 hover:text-asean-yellow"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
