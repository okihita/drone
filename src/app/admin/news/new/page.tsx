"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { createNewsItem, uploadNewsImage } from "@/services/news";
import { getBrowserClient } from "@/lib/supabase";
import { NEWS_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from "@/components/admin/RichTextEditor";
import DOMPurify from "dompurify";
import { calculateReadTime } from "@/lib/text";
import type { NewsItem } from "@/types";

type NewsFormValues = Omit<NewsItem, "id" | "created_at">;

export default function NewNewsItem() {
  const router = useRouter();
  const [form, setForm] = useState<NewsFormValues>({
    title: "",
    slug: "",
    jurisdiction: "",
    category: "DEFA",
    summary: "",
    source_url: "",
    source_name: "",
    author: "",
    read_time: "",
    image_url: null,
    published_date: new Date().toISOString().split("T")[0],
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof NewsFormValues>(key: K, value: NewsFormValues[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

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
    setSaving(true);
    setError("");
    try {
      const sanitized = {
        ...form,
        summary: DOMPurify.sanitize(form.summary || ""),
        read_time: form.read_time || calculateReadTime(form.summary || ""),
      };
      await createNewsItem(sanitized, getBrowserClient());
      router.push("/admin/news");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  };

  const fields: { label: string; key: keyof NewsFormValues; placeholder?: string }[] = [
    { label: "Title", key: "title" },
    { label: "Slug", key: "slug", placeholder: "auto-generated from title if empty" },
    { label: "Jurisdiction", key: "jurisdiction" },
    { label: "Source URL", key: "source_url" },
    { label: "Source Name", key: "source_name" },
    { label: "Author", key: "author" },
    { label: "Read Time", key: "read_time" },
  ];

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold mb-6">New Article</h1>
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ label, key }) => (
              <div key={key}>
                <label className="text-sm font-medium mb-1 block">{label}</label>
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
                placeholder="Write your investigative article..."
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Featured Image</label>
              <Input type="file" accept="image/*" onChange={handleUpload} />
              {uploading && <p className="text-xs text-muted-foreground mt-1">Uploading...</p>}
              {form.image_url && <p className="text-xs text-green-600 mt-1">Uploaded</p>}
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
              {saving ? "Saving..." : "Publish Article"}
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
}
