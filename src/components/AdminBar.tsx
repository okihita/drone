"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBrowserClient } from "@/lib/supabase";
import { ShieldCheck, LogOut, LayoutDashboard, Pencil } from "lucide-react";

/**
 * Client component — receives session from the server (AdminBarLoader).
 * Handles: sign-out, article ID detection (SPA navigation), real-time session sync.
 * Absolutely positioned — never causes layout shift.
 */
export default function AdminBar() {
  const [articleId, setArticleId] = useState<string | null>(null);
  const pathname = usePathname();

  // Detect article ID from investigation page on SPA navigations
  useEffect(() => {
    const el = document.getElementById("drone-article-meta");
    setArticleId(el?.dataset.articleId ?? null);
  }, [pathname]);

  const handleSignOut = async () => {
    await getBrowserClient().auth.signOut();
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-slate-900/95 dark:bg-black/95 backdrop-blur-sm border-b border-slate-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-asean-yellow tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DRONE Admin</span>
          </div>

          {articleId && (
            <Link
              href={`/admin/news/${articleId}`}
              className="flex items-center gap-1 text-xs font-sans font-medium text-slate-400 hover:text-asean-yellow transition-colors ml-2 pl-2 border-l border-slate-700"
            >
              <Pencil className="w-3 h-3" />
              <span>Edit Article</span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-5 text-xs font-sans font-medium text-slate-300">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
