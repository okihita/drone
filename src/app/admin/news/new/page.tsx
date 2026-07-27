"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";

export default function NewNewsItem() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", jurisdiction: "", category: "DEFA", summary: "",
    source_url: "", source_name: "", author: "", read_time: "",
    image_url: "", published_date: new Date().toISOString().split("T")[0],
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

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
    await supabase.from("news_items").insert(form);
    router.push("/admin/news");
  };

  const fields: { label: string; key: string; type?: string; placeholder?: string }[] = [
    { label: "Title", key: "title" },
    { label: "Jurisdiction", key: "jurisdiction", placeholder: "e.g. Indonesia (ID)" },
    { label: "Summary", key: "summary", type: "textarea" },
    { label: "Source URL", key: "source_url", type: "url" },
    { label: "Source Name", key: "source_name", placeholder: "e.g. Jakarta Post" },
    { label: "Author", key: "author" },
    { label: "Read Time", key: "read_time", placeholder: "e.g. 5 min read" },
  ];

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold text-slate-900 dark:text-white mb-6">New Article</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        {fields.map(({ label, key, type, placeholder }) => (
          <div key={key}>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{label}</label>
            {type === "textarea" ? (
              <textarea rows={3} value={(form as Record<string, string>)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow" />
            ) : (
              <input value={(form as Record<string, string>)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow" />
            )}
          </div>
        ))}

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Image</label>
          <input type="file" accept="image/*" onChange={handleUpload} className="text-xs" />
          {uploading && <span className="text-xs text-slate-500 ml-2">Uploading...</span>}
          {form.image_url && <p className="text-xs text-green-600 mt-1">Uploaded: {form.image_url.substring(0, 60)}...</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow">
              <option>DEFA</option><option>Cross-Border Data</option><option>AI Governance</option><option>Cybersecurity</option><option>DATA LOCALIZATION</option><option>DEFA SPECIAL REPORT</option><option>AI GOVERNANCE</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Publish Date</label>
            <input type="date" value={form.published_date} onChange={(e) => setForm({ ...form, published_date: e.target.value })}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow" />
          </div>
        </div>

        <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg bg-asean-yellow hover:bg-asean-yellow-hover text-slate-950 font-bold text-sm transition-colors disabled:opacity-50">
          {saving ? "Saving..." : "Publish Article"}
        </button>
      </form>
    </AdminDashboardLayout>
  );
}
