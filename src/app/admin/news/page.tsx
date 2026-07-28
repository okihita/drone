"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, Newspaper } from "lucide-react";

interface NewsItem {
  id: string; title: string; jurisdiction: string; category: string; image_url: string | null; published_date: string;
}

export default function NewsList() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    supabase.from("news_items").select("id,title,jurisdiction,category,image_url,published_date").order("published_date", { ascending: false })
      .then(({ data }: { data: unknown }) => { if (data) setItems(data as NewsItem[]); setLoading(false); });
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
        <h1 className="font-serif-editorial text-2xl font-extrabold">News</h1>
        <Link href="/admin/news/new"><Button size="sm"><Plus className="w-4 h-4 mr-1" /> New Article</Button></Link>
      </div>

      <div className="rounded-lg border bg-white dark:bg-slate-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Jurisdiction</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <TableRow key={i}><TableCell colSpan={6}><Skeleton className="h-10 w-full" /></TableCell></TableRow>)
            ) : items.map(n => (
              <TableRow key={n.id}>
                <TableCell>
                  {n.image_url ? <Image src={n.image_url} alt="" width={48} height={32} className="rounded object-cover w-12 h-8" />
                    : <div className="w-12 h-8 rounded bg-muted flex items-center justify-center"><Newspaper className="w-3 h-3 text-muted-foreground" /></div>}
                </TableCell>
                <TableCell className="font-medium max-w-xs truncate">{n.title}</TableCell>
                <TableCell className="text-muted-foreground">{n.jurisdiction}</TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{n.category}</Badge></TableCell>
                <TableCell className="text-muted-foreground text-xs">{n.published_date}</TableCell>
                <TableCell className="flex gap-1">
                  <Link href={`/admin/news/${n.id}`}><Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button></Link>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(n.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminDashboardLayout>
  );
}
