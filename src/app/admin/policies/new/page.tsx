"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";

export default function NewPolicy() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    jurisdiction: "",
    category: "DEFA",
    threat_level: "Medium Risk",
    date: new Date().toISOString().split("T")[0],
    summary: "",
    primary_source_url: "",
    source_authority: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const displayDate = new Date(form.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    await supabase.from("policies").insert({ ...form, date: displayDate });
    router.push("/admin/policies");
  };

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold text-slate-900 dark:text-white mb-6">New Policy</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        {[
          { label: "Title", key: "title", type: "text" },
          { label: "Jurisdiction", key: "jurisdiction", type: "text", placeholder: "e.g. Indonesia (ID)" },
          { label: "Summary", key: "summary", type: "textarea" },
          { label: "Primary Source URL", key: "primary_source_url", type: "url" },
          { label: "Source Authority", key: "source_authority", type: "text", placeholder: "e.g. Kominfo RI" },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key}>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{label}</label>
            {type === "textarea" ? (
              <textarea rows={3} value={(form as Record<string, string>)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow" />
            ) : (
              <input type={type} value={(form as Record<string, string>)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow" />
            )}
          </div>
        ))}

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow">
              <option>DEFA</option><option>Cross-Border Data</option><option>AI Governance</option><option>Cybersecurity</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Threat Level</label>
            <select value={form.threat_level} onChange={(e) => setForm({ ...form, threat_level: e.target.value })}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow">
              <option>High Alert</option><option>Medium Risk</option><option>Rights Verified</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow" />
          </div>
        </div>

        <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg bg-asean-yellow hover:bg-asean-yellow-hover text-slate-950 font-bold text-sm transition-colors disabled:opacity-50">
          {saving ? "Saving..." : "Create Policy"}
        </button>
      </form>
    </AdminDashboardLayout>
  );
}
