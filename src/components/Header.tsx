"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, NAV_GROUPS } from "@/lib/constants";
import type { NavGroup, NavLink } from "@/lib/constants";

// ── Shared style tokens ────────────────────────────────────────────────────

const LINK_BASE =
  "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all hover:-translate-y-0.5 " +
  "after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:rounded-full after:origin-left " +
  "after:scale-x-0 after:bg-asean-yellow after:transition-transform after:duration-200 after:ease-out";

const LINK_ACTIVE = "text-asean-yellow after:scale-x-100";

const LINK_IDLE =
  "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white " +
  "hover:bg-slate-100 dark:hover:bg-slate-800/60 " +
  "hover:after:scale-x-100";

function isNavGroup(item: NavLink | NavGroup): item is NavGroup {
  return "children" in item;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const isSubmenuActive = (group: NavGroup) =>
    group.children.some((child) => isActive(child.href));

  // Close dropdown on route change (navigation)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: close dropdown on navigation
    setOpenDropdown(null);
  }, [pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors sticky top-[var(--drone-admin-bar-h,0px)] z-50 backdrop-blur-md bg-slate-50/95 dark:bg-slate-950/95 font-sans">
      {/* Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 border-b border-slate-200/80 dark:border-slate-800/60 font-sans">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 sm:gap-4">
            <span className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors leading-none select-none">
              DRONE
            </span>
            <div className="border-l border-slate-300 dark:border-slate-700 pl-3 sm:pl-4 text-left flex flex-col justify-center text-[10px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold leading-none space-y-1">
              <span className="leading-none block">Digital Rights Oversight</span>
              <span className="leading-none block">&amp; Network Evaluator</span>
            </div>
          </Link>

          {/* Right: toggles + mobile menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
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

      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <nav className="hidden md:flex items-center justify-center gap-1 py-3 text-xs font-sans" ref={dropdownRef}>
          {NAV_GROUPS.map((item) => {
            if (isNavGroup(item)) {
              const isOpen = openDropdown === item.href;
              const active = isSubmenuActive(item);
              return (
                <div key={item.href} className="relative">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      aria-current={active ? "page" : undefined}
                      className={`${LINK_BASE} ${active || isOpen ? LINK_ACTIVE : LINK_IDLE}`}
                    >
                      <item.icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
                      <span>{item.label}</span>
                    </Link>
                    <button
                      onClick={(e) => { e.preventDefault(); setOpenDropdown(isOpen ? null : item.href); }}
                      className="ml-0.5 p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                      aria-expanded={isOpen}
                      aria-label={isOpen ? "Close submenu" : "Open submenu"}
                    >
                      <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""} ${
                        active || isOpen ? "text-asean-yellow" : "text-slate-400 dark:text-slate-500"
                      }`} />
                    </button>
                  </div>

                   {/* Dropdown — centered under group with mobile overflow guard */}
                  {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 max-w-[calc(100vw-2rem)] rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 py-2 animate-[fadeIn_0.12s_ease-out]">
                      {/* Arrow — centered within dropdown */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white dark:bg-slate-900 border-l border-t border-slate-200 dark:border-slate-800" />
                      {item.children.map((child) => {
                        const active = isActive(child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-center gap-3 px-4 py-2.5 text-xs font-semibold transition-colors ${
                              active
                                ? "bg-asean-yellow/10 text-asean-yellow"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          >
                            <child.icon className={`w-3.5 h-3.5 ${child.iconColor}`} />
                            <span>{child.label}</span>
                            {active && (
                              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-asean-yellow" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Plain link
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`${LINK_BASE} ${active ? LINK_ACTIVE : LINK_IDLE}`}
              >
                <item.icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-4 space-y-1 text-xs font-sans">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 px-2 py-2 rounded-lg font-semibold transition-colors ${
                  active
                    ? "bg-asean-yellow/10 text-asean-yellow"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <link.icon className={`w-3.5 h-3.5 ${link.iconColor}`} />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
