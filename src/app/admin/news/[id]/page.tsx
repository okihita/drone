"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";

export default function EditNewsItem() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.from("news_items").select("*").eq("id", id).single().then(({ data }: { data: unknown }) => {
      if (data) {
        const d = data as Record<string, string>;
        const dateStr = d.published_date ? new Date(d.published_date).toISOString().split("T")[0] : "";
        setForm({ ...d, published_date: dateStr });
      }
      setLoading(false);
    });
  }, [id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { data, error } = await supabase.storage.from("news").upload(`${Date.now()}-${file.name}`, file, { upsert: true });
    if (!error && data) {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news/${data.path}`;
      setForm({ ...form, image_url: url });
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from("news_items").update(form).eq("id", id);
    router.push("/admin/news");
  };

  if (loading) return <AdminDashboardLayout><p className="text-slate-500">Loading...</p></AdminDashboardLayout>;

  const fields = ["title", "jurisdiction", "summary", "source_url", "source_name", "author", "read_time"];

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Edit Article</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        {fields.map((key) => (
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
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Image</label>
          {form.image_url && <p className="text-xs text-slate-500 mb-1">Current: {form.image_url.substring((form.image_url || "").lastIndexOf("/") + 1)}</p>}
          <input type="file" accept="image/*" onChange={handleUpload} className="text-xs" />
          {uploading && <span className="text-xs text-slate-500 ml-2">Uploading...</span>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow">
              <option>DEFA</option><option>Cross-Border Data</option><option>AI Governance</option><option>Cybersecurity</option><option>DATA LOCALIZATION</option><option>DEFA SPECIAL REPORT</option><option>AI GOVERNANCE</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Publish Date</label>
            <input type="date" value={form.published_date || ""} onChange={(e) => setForm({ ...form, published_date: e.target.value })}
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
