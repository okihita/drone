"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText, Newspaper, Globe, LogOut, LayoutDashboard,
  Menu, X, PanelLeftClose, PanelLeft,
} from "lucide-react";
import { getBrowserClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/policies", label: "Policies", icon: FileText },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/jurisdictions", label: "Jurisdictions", icon: Globe },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await getBrowserClient().auth.signOut();
    window.location.href = "/admin/login";
  };

  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }) => {
    const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
    return (
      <Link
        href={href}
        onClick={() => setSidebarOpen(false)}
        title={collapsed ? label : undefined}
        className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          active
            ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
        } ${collapsed ? "lg:justify-center lg:px-2" : ""}`}
      >
        <Icon className="w-4 h-4 shrink-0" />
        <span className={collapsed ? "lg:hidden" : ""}>{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-[var(--drone-admin-bar-h,0px)] left-0 z-50 h-[calc(100vh-var(--drone-admin-bar-h,0px))]
          bg-white dark:bg-slate-900 border-r
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
              className="hidden lg:flex p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className={`flex-1 space-y-1 ${collapsed ? "lg:mt-2" : ""}`}>
          {nav.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <Separator className="my-3" />

        {/* Logout */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={`${collapsed ? "lg:justify-center lg:px-2" : ""} justify-start text-slate-500 hover:text-red-600`}
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
          <span className={`ml-2 ${collapsed ? "lg:hidden" : ""}`}>Sign Out</span>
        </Button>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b bg-white dark:bg-slate-900 sticky top-[var(--drone-admin-bar-h,0px)] z-30">
          <button
            onClick={() => setSidebarOpen(true)}
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
