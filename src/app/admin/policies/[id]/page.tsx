"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";

export default function EditPolicy() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("policies").select("*").eq("id", id).single().then(({ data }: { data: unknown }) => {
      if (data) {
        const d = data as Record<string, string>;
        const parsed = new Date(d.date);
        const dateStr = isNaN(parsed.getTime()) ? "" : parsed.toISOString().split("T")[0];
        setForm({ ...d, date: dateStr });
      }
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const displayDate = new Date(form.date || "").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    await supabase.from("policies").update({ ...form, date: displayDate }).eq("id", id);
    router.push("/admin/policies");
  };

  if (loading) return <AdminDashboardLayout><p className="text-slate-500">Loading...</p></AdminDashboardLayout>;

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Edit Policy</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        {["title", "jurisdiction", "summary", "primary_source_url", "source_authority"].map((key) => (
          <div key={key}>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 capitalize">{key.replace(/_/g, " ")}</label>
            {key === "summary" ? (
              <textarea rows={3} value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow" />
            ) : (
              <input value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow" />
            )}
          </div>
        ))}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select value={form.category || "DEFA"} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow">
              <option>DEFA</option><option>Cross-Border Data</option><option>AI Governance</option><option>Cybersecurity</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Threat Level</label>
            <select value={form.threat_level || "Medium Risk"} onChange={(e) => setForm({ ...form, threat_level: e.target.value })}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow">
              <option>High Alert</option><option>Medium Risk</option><option>Rights Verified</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Date</label>
            <input type="date" value={form.date || ""} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow" />
          </div>
        </div>
        <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg bg-asean-yellow hover:bg-asean-yellow-hover text-slate-950 font-bold text-sm transition-colors disabled:opacity-50">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </AdminDashboardLayout>
  );
}
