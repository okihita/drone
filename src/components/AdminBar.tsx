"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getBrowserClient } from "@/lib/supabase";
import { ShieldCheck, LogOut, LayoutDashboard } from "lucide-react";

export default function AdminBar() {
  const [session, setSession] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const handleSignOut = async () => {
    await getBrowserClient().auth.signOut();
    window.location.reload();
  };

  // Avoid hydration mismatch — don't render until mounted
  if (!mounted || !session) return null;

  return (
    <div className="w-full bg-slate-900 dark:bg-black border-b border-slate-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
        <div className="flex items-center gap-1.5 text-[11px] font-sans font-bold text-asean-yellow tracking-wide">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>DRONE Admin</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-sans font-medium text-slate-300">
          <Link
            href="/admin"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Dashboard</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
