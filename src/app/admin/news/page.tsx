"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  jurisdiction: string;
  category: string;
  published_date: string;
}

export default function NewsList() {
  const [items, setItems] = useState<NewsItem[]>([]);

  const fetch = useCallback(() => {
    supabase.from("news_items").select("id, title, jurisdiction, category, published_date").order("published_date", { ascending: false })
      .then(({ data }: { data: unknown }) => { if (data) setItems(data as NewsItem[]); });
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    await supabase.from("news_items").delete().eq("id", id);
    fetch();
  };

  return (
    <AdminDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif-editorial text-2xl font-extrabold text-slate-900 dark:text-white">News</h1>
        <Link href="/admin/news/new" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 transition-colors">
          <Plus className="w-3.5 h-3.5" /> New Article
        </Link>
      </div>
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-[10px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Jurisdiction</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Published</th>
              <th className="py-3 px-4 w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((n) => (
              <tr key={n.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{n.title.substring(0, 60)}...</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{n.jurisdiction}</td>
                <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">{n.category}</span></td>
                <td className="py-3 px-4 text-slate-500">{n.published_date}</td>
                <td className="py-3 px-4 flex gap-1">
                  <Link href={`/admin/news/${n.id}`} className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"><Pencil className="w-3.5 h-3.5" /></Link>
                  <button onClick={() => handleDelete(n.id)} className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-950 text-slate-500 hover:text-asean-red"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminDashboardLayout>
  );
}
