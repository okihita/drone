"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getBrowserClient } from "@/lib/supabase";
import { ShieldCheck, LogOut, LayoutDashboard, Pencil } from "lucide-react";

export default function AdminBar() {
  const [session, setSession] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [articleId, setArticleId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const client = getBrowserClient();
    client.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
    });

    const { data: listener } = client.auth.onAuthStateChange((_event, s) => {
      setSession(!!s);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Detect if we're on an investigation detail page with an article ID
  useEffect(() => {
    const el = document.getElementById("drone-article-meta");
    if (el) {
      setArticleId(el.dataset.articleId ?? null);
      // Remove the meta element after reading to keep DOM clean
      el.remove();
    }
  }, []);

  const handleSignOut = async () => {
    await getBrowserClient().auth.signOut();
    window.location.reload();
  };

  if (!mounted || !session) return null;

  return (
    <div className="w-full bg-slate-900 dark:bg-black border-b border-slate-700 text-white">
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
