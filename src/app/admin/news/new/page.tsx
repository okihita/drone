"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewNewsItem() {
  const router = useRouter();
  const [form, setForm] = useState<Record<string, string>>({ title: "", jurisdiction: "", category: "DEFA", summary: "", source_url: "", source_name: "", author: "", read_time: "", image_url: "", published_date: new Date().toISOString().split("T")[0] });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const { data, error } = await supabase.storage.from("news").upload(`${Date.now()}-${file.name}`, file, { upsert: true });
    if (!error && data) update("image_url", `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news/${data.path}`);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); await supabase.from("news_items").insert(form); router.push("/admin/news"); };

  const fields = [{ label: "Title", key: "title" }, { label: "Jurisdiction", key: "jurisdiction", placeholder: "e.g. Indonesia (ID)" }, { label: "Summary", key: "summary", textarea: true }, { label: "Source URL", key: "source_url" }, { label: "Source Name", key: "source_name" }, { label: "Author", key: "author" }, { label: "Read Time", key: "read_time", placeholder: "e.g. 5 min read" }];

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold mb-6">New Article</h1>
      <Card className="max-w-2xl">
        <CardHeader><CardTitle>Article Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ label, key, placeholder, textarea }) => (
              <div key={key}>
                <label className="text-sm font-medium mb-1 block">{label}</label>
                {textarea ? <Textarea rows={3} value={form[key] || ""} onChange={e => update(key, e.target.value)} />
                  : <Input value={form[key] || ""} placeholder={placeholder} onChange={e => update(key, e.target.value)} />}
              </div>
            ))}
            <div>
              <label className="text-sm font-medium mb-1 block">Image</label>
              <Input type="file" accept="image/*" onChange={handleUpload} />
              {uploading && <p className="text-xs text-muted-foreground mt-1">Uploading...</p>}
              {form.image_url && <p className="text-xs text-green-600 mt-1">Uploaded</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select value={form.category} onValueChange={(v) => update("category", v || "")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["DEFA", "Cross-Border Data", "AI Governance", "Cybersecurity", "DATA LOCALIZATION", "DEFA SPECIAL REPORT", "AI GOVERNANCE"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Publish Date</label>
                <Input type="date" value={form.published_date} onChange={e => update("published_date", e.target.value)} />
              </div>
            </div>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Publish Article"}</Button>
          </form>
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
}
