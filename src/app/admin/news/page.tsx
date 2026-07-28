"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { listNews, deleteNewsItem } from "@/services/news";
import { getBrowserClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, Newspaper } from "lucide-react";
import type { NewsListItem } from "@/types";

export default function NewsList() {
  const [items, setItems] = useState<NewsListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetch = useCallback(() => {
    setLoading(true);
    listNews()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    try {
      await deleteNewsItem(id, getBrowserClient());
      fetch();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif-editorial text-2xl font-extrabold">News</h1>
        <Link href="/admin/news/new">
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" /> New Article
          </Button>
        </Link>
      </div>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
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
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <Skeleton className="h-10 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              : items.map((n) => (
                  <TableRow key={n.id}>
                    <TableCell>
                      {n.image_url ? (
                        <Image
                          src={n.image_url}
                          alt=""
                          width={48}
                          height={32}
                          className="rounded object-cover w-12 h-8"
                        />
                      ) : (
                        <div className="w-12 h-8 rounded bg-muted flex items-center justify-center">
                          <Newspaper className="w-3 h-3 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium max-w-xs truncate">
                      {n.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {n.jurisdiction}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {n.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {n.published_date}
                    </TableCell>
                    <TableCell className="flex gap-1">
                      <Link href={`/admin/news/${n.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleDelete(n.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </AdminDashboardLayout>
  );
}
