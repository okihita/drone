"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { getNewsById, updateNewsItem, uploadNewsImage } from "@/services/news";
import { NEWS_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import RichTextEditor from "@/components/admin/RichTextEditor";
import DOMPurify from "dompurify";
import type { NewsItem } from "@/types";

type NewsFormValues = Omit<NewsItem, "id" | "created_at">;

export default function EditNewsItem() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<NewsFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getNewsById(id)
      .then((data) => {
        if (!data) {
          setError("Article not found");
          return;
        }
        setForm({
          title: data.title,
          jurisdiction: data.jurisdiction,
          category: data.category,
          summary: data.summary,
          source_url: data.source_url,
          source_name: data.source_name,
          author: data.author,
          read_time: data.read_time,
          image_url: data.image_url,
          published_date: data.published_date
            ? new Date(data.published_date).toISOString().split("T")[0]
            : "",
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const update = <K extends keyof NewsFormValues>(key: K, value: NewsFormValues[K]) =>
    setForm((f) => (f ? { ...f, [key]: value } : f));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadNewsImage(file);
      update("image_url", url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError("");
    try {
      const sanitized = { ...form, summary: DOMPurify.sanitize(form.summary || "") };
      await updateNewsItem(id, sanitized);
      router.push("/admin/news");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  };

  if (loading)
    return (
      <AdminDashboardLayout>
        <Skeleton className="h-96 w-full max-w-2xl" />
      </AdminDashboardLayout>
    );

  if (!form)
    return (
      <AdminDashboardLayout>
        <p className="text-red-600">{error || "Article not found"}</p>
      </AdminDashboardLayout>
    );

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold mb-6">Edit Article</h1>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {(
              ["title", "jurisdiction", "source_url", "source_name", "author", "read_time"] as const
            ).map((key) => (
              <div key={key}>
                <label className="text-sm font-medium mb-1 block capitalize">
                  {key.replace(/_/g, " ")}
                </label>
                <Input
                  value={(form[key] as string) || ""}
                  onChange={(e) => update(key, e.target.value as NewsFormValues[typeof key])}
                />
              </div>
            ))}

            <div>
              <label className="text-sm font-medium mb-2 block">Content</label>
              <RichTextEditor
                content={form.summary || ""}
                onChange={(html) => update("summary", html)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Image</label>
              {form.image_url && (
                <p className="text-xs text-muted-foreground mb-1 truncate">
                  {form.image_url}
                </p>
              )}
              <Input type="file" accept="image/*" onChange={handleUpload} />
              {uploading && <p className="text-xs text-muted-foreground mt-1">Uploading...</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select
                  value={form.category}
                  onValueChange={(v) => update("category", v || "DEFA")}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {NEWS_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Publish Date</label>
                <Input
                  type="date"
                  value={form.published_date}
                  onChange={(e) => update("published_date", e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
}
