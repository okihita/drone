"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, Newspaper, Globe, LogOut, LayoutDashboard } from "lucide-react";
import { supabase } from "@/lib/supabase";
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
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 font-sans">
      <aside className="w-56 border-r bg-white dark:bg-slate-900 p-4 flex flex-col">
        <Link href="/admin" className="font-serif-editorial text-xl font-extrabold text-slate-900 dark:text-white mb-6">
          DRONE Admin
        </Link>
        <nav className="flex-1 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <Separator className="my-3" />
        <Button variant="ghost" size="sm" onClick={handleLogout} className="justify-start text-slate-500 hover:text-red-600">
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
