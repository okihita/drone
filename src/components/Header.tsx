"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_GROUPS } from "@/lib/constants";
import type { NavGroup, NavLink } from "@/lib/constants";

// ── Shared style tokens ────────────────────────────────────────────────────

const LINK_BASE =
  "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all hover:-translate-y-0.5 " +
  "after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:rounded-full after:origin-left " +
  "after:scale-x-0 after:bg-asean-yellow after:transition-transform after:duration-200 after:ease-out";

const LINK_ACTIVE = "text-slate-900 dark:text-asean-yellow after:scale-x-100";

const LINK_IDLE =
  "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white " +
  "hover:bg-slate-100 dark:hover:bg-slate-800/60 " +
  "hover:after:scale-x-100";

function isNavGroup(item: NavLink | NavGroup): item is NavGroup {
  return "children" in item;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef(0);
  const pathname = usePathname();

  // ── Compress the masthead once the page is scrolled ─────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const isSubmenuActive = (group: NavGroup) =>
    group.children.some((child) => isActive(child.href));

  // ── Measure header height dynamically ──────────────────────────────────
  useEffect(() => {
    if (!headerRef.current) return;
    const el = headerRef.current;
    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--drone-header-h",
        `${el.offsetHeight}px`
      );
    };
    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Close with exit animation ─────────────────────────────────────────
  const closeSheet = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setClosing(false);
      document.body.style.overflow = "";
      requestAnimationFrame(() => hamburgerRef.current?.focus());
    }, 200); // match slideOutRight duration
  }, []);

  // ── Open sheet ────────────────────────────────────────────────────────
  const openSheet = useCallback(() => {
    setMobileMenuOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  // Clean up scroll-lock on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = ""; };
  }, []);

  // ── Focus trap for sheet ──────────────────────────────────────────────
  useEffect(() => {
    if (!mobileMenuOpen || !sheetRef.current) return;
    const sheet = sheetRef.current;
    const focusable = sheet.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus({ preventScroll: true });

    function trapFocus(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }

    sheet.addEventListener("keydown", trapFocus);
    return () => sheet.removeEventListener("keydown", trapFocus);
  }, [mobileMenuOpen]);

  // ── Swipe-to-dismiss on sheet ─────────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -60) closeSheet(); // swipe left > 60px closes (sheet on right)
  }, [closeSheet]);

  // Close dropdown on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: close dropdown on navigation
    setOpenDropdown(null);
  }, [pathname]);

  // ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeSheet();
        setOpenDropdown(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeSheet]);

  // Click outside dropdown
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
    <>
    <header ref={headerRef} className="w-full border-b border-slate-200 dark:border-slate-800 sticky top-[var(--drone-admin-bar-h,0px)] z-50 backdrop-blur-md bg-slate-50/95 dark:bg-slate-950/95 transition-colors font-sans">
      {/* Masthead */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-200 border-b border-slate-200/80 dark:border-slate-800/60 font-sans ${scrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"}`}>
        {/* Row 1: Logo + tagline */}
        <div className="flex items-center justify-center md:justify-between">
          <Link href="/" className="group flex items-center gap-3 sm:gap-4 min-w-0">
            <Image
              src="/images/Logomark_Red_800px.png"
              alt="EngageMedia D.R.O.N.E."
              width={800}
              height={800}
              priority
              className={`w-auto object-contain shrink-0 group-hover:scale-105 transition-all duration-200 ${scrolled ? "h-7 sm:h-8 lg:h-9" : "h-8 sm:h-10 lg:h-11"}`}
            />
            <span className={`font-serif-editorial font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-asean-yellow transition-all leading-none select-none shrink-0 ${scrolled ? "text-2xl sm:text-3xl lg:text-4xl" : "text-3xl sm:text-4xl lg:text-5xl"}`}>
              DRONE
            </span>
            <div className={`border-l border-slate-300 dark:border-slate-700 pl-3 sm:pl-4 text-left text-[10px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold leading-none space-y-1 min-w-0 transition-opacity duration-200 ${scrolled ? "hidden md:flex flex-col justify-center opacity-0" : "flex flex-col justify-center opacity-100"}`}>
              <span className="leading-none block truncate">Digital Rights Oversight</span>
              <span className="leading-none block truncate">&amp; Network Evaluator</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>

        {/* Row 2: Mobile controls */}
        <div className={`md:hidden flex items-center justify-between transition-all duration-200 ${scrolled ? "mt-1 pt-1 border-t border-slate-200/60 dark:border-slate-800/40" : "mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/40"}`}>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <button
            ref={hamburgerRef}
            onClick={() => mobileMenuOpen ? closeSheet() : openSheet()}
            className="p-2 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-sheet"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <nav className="hidden md:flex items-center justify-start lg:justify-center gap-1 py-3 text-xs font-sans overflow-x-auto no-scrollbar" ref={dropdownRef}>
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
                        active || isOpen ? "text-amber-700 dark:text-asean-yellow" : "text-slate-400 dark:text-slate-500"
                      }`} />
                    </button>
                  </div>
                  {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 max-w-[calc(100vw-2rem)] rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 py-2 animate-[fadeIn_0.12s_ease-out]">
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
                                ? "bg-asean-yellow/10 text-amber-700 dark:text-asean-yellow"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          >
                            <child.icon className={`w-3.5 h-3.5 ${child.iconColor}`} />
                            <span>{child.label}</span>
                            {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-asean-yellow" />}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
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
    </header>

    {/* ── Mobile Side Sheet (renders outside header so it overlays page content) ── */}
    {mobileMenuOpen && (
      <div className="md:hidden fixed inset-0 z-[60] flex">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => closeSheet()}
        />
        {/* Sheet panel */}
        <div
          id="mobile-nav-sheet"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`relative ml-auto w-[80%] max-w-[320px] h-full bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto overscroll-contain ${
            closing
              ? "animate-[slideOutRight_0.2s_ease-in]"
              : "animate-[slideInRight_0.25s_ease-out]"
          }`}
        >
          {/* Close button + branding */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md">
            <span className="font-serif-editorial text-lg font-extrabold text-slate-900 dark:text-white">DRONE</span>
            <button
              onClick={() => closeSheet()}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="px-3 py-3 space-y-1 text-sm font-sans">
            {NAV_GROUPS.map((item) => {
              if (isNavGroup(item)) {
                const groupActive = isSubmenuActive(item);
                return (
                  <div key={item.href} className="space-y-0.5">
                    <Link
                      href={item.href}
                      onClick={() => closeSheet()}
                      aria-current={groupActive ? "page" : undefined}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-bold transition-colors ${
                        groupActive
                          ? "bg-asean-yellow/10 text-amber-700 dark:text-asean-yellow"
                          : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                      {item.label}
                    </Link>
                    {item.children.map((child) => {
                      const active = isActive(child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => closeSheet()}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-2.5 pl-7 pr-3 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                            active
                              ? "bg-asean-yellow/10 text-amber-700 dark:text-asean-yellow"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          <child.icon className={`w-3.5 h-3.5 shrink-0 ${child.iconColor}`} />
                          <span className="truncate">{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                );
              }
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => closeSheet()}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-bold transition-colors ${
                    active
                      ? "bg-asean-yellow/10 text-amber-700 dark:text-asean-yellow"
                      : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    )}
    </>
  );
}
