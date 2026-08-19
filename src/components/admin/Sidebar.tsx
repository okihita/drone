"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText, Newspaper, Globe, LogOut, LayoutDashboard,
  Menu, X, PanelLeftClose, PanelLeft, DownloadCloud,
} from "lucide-react";
import { getBrowserClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/ingester", label: "EM Ingester", icon: DownloadCloud },
  { href: "/admin/policies", label: "Policies", icon: FileText },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/jurisdictions", label: "Jurisdictions", icon: Globe },
];

function NavItem({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      prefetch={true}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 active:scale-[0.98] ${
        active
          ? "bg-asean-blue/10 dark:bg-asean-blue/20 text-asean-blue dark:text-asean-yellow font-semibold shadow-xs"
          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
      } ${collapsed ? "lg:justify-center lg:px-2" : ""}`}
    >
      <Icon className={`w-4 h-4 shrink-0 ${active ? "text-asean-blue dark:text-asean-yellow" : ""}`} />
      <span className={collapsed ? "lg:hidden" : ""}>{label}</span>
    </Link>
  );
}

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  // ── Body scroll-lock when mobile sidebar is open ──────────────────────
  const toggleSidebar = useCallback((open: boolean) => {
    setSidebarOpen(open);
    document.body.style.overflow = open ? "hidden" : "";
  }, []);

  useEffect(() => {
    return () => { document.body.style.overflow = ""; };
  }, []);

  // ── Focus trap for mobile sidebar ────────────────────────────────────
  useEffect(() => {
    if (!sidebarOpen || !sidebarRef.current) return;
    const sidebar = sidebarRef.current;
    const focusable = sidebar.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    function trapFocus(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }
    sidebar.addEventListener("keydown", trapFocus);
    return () => sidebar.removeEventListener("keydown", trapFocus);
  }, [sidebarOpen]);

  // ── ESC key closes mobile sidebar ─────────────────────────────────────
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") toggleSidebar(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const handleLogout = async () => {
    await getBrowserClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
          onClick={() => toggleSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        role={sidebarOpen ? "dialog" : undefined}
        aria-modal={sidebarOpen ? true : undefined}
        aria-label="Admin navigation"
        className={`
          fixed lg:sticky top-[var(--drone-admin-bar-h,0px)] left-0 z-[60] h-[calc(100vh-var(--drone-admin-bar-h,0px))]
          bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
          flex flex-col transition-all duration-200
          w-56 ${collapsed ? "lg:w-14" : ""}
          p-4 ${collapsed ? "lg:p-2" : ""}
          max-lg:${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className={`flex items-center justify-between ${collapsed ? "lg:justify-center" : ""} mb-4`}>
          <Link
            href="/admin"
            className={`font-serif-editorial text-xl font-extrabold text-slate-900 dark:text-white ${collapsed ? "lg:hidden" : ""}`}
          >
            DRONE
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
            <button
              onClick={() => toggleSidebar(false)}
              className="lg:hidden p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className={`flex-1 space-y-1 ${collapsed ? "lg:mt-2" : ""}`}>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <NavItem
                key={item.href}
                {...item}
                active={active}
                collapsed={collapsed}
                onClick={() => toggleSidebar(false)}
              />
            );
          })}
        </nav>

        <Separator className="my-3" />

        {/* Logout */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={`${collapsed ? "lg:justify-center lg:px-2" : ""} justify-start text-slate-500 hover:text-red-600 w-full`}
          title="Sign Out"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className={`ml-2 ${collapsed ? "lg:hidden" : ""}`}>Sign Out</span>
        </Button>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b bg-white dark:bg-slate-900 sticky top-[var(--drone-admin-bar-h,0px)] z-30">
          <button
            onClick={() => toggleSidebar(true)}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-serif-editorial font-bold text-slate-900 dark:text-white text-sm">DRONE Admin</span>
        </div>
        <div className="p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
