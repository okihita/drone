"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { D2D_SUBMENU } from "@/lib/constants";

export default function D2DSubNav() {
  const pathname = usePathname();

  return (
    <div
      className="sticky top-[var(--drone-admin-bar-h,72px)] z-30 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md animate-[slideDown_0.25s_ease-out]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-1 py-2 overflow-x-auto no-scrollbar">
        {D2D_SUBMENU.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold font-sans transition-all duration-150 ${
                active
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <item.icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
