"use client";

import React, { useEffect, useState } from "react";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase as db } from "@/lib/supabase";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ policies: 0, news: 0, jurisdictions: 0 });

  useEffect(() => {
    Promise.all([
      db.from("policies").select("id", { count: "exact", head: true }),
      db.from("news_items").select("id", { count: "exact", head: true }),
      db.from("jurisdictions").select("id", { count: "exact", head: true }),
    ]).then(([p, n, j]) => {
      setCounts({
        policies: p.count ?? 0,
        news: n.count ?? 0,
        jurisdictions: j.count ?? 0,
      });
    });
  }, []);

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Policies", count: counts.policies, color: "border-l-asean-yellow" },
          { label: "News Items", count: counts.news, color: "border-l-asean-blue" },
          { label: "Jurisdictions", count: counts.jurisdictions, color: "border-l-asean-red" },
        ].map(({ label, count, color }) => (
          <div key={label} className={`p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 ${color}`}>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">{label}</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{count}</p>
          </div>
        ))}
      </div>
    </AdminDashboardLayout>
  );
}
