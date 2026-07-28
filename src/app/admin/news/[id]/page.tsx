"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditNewsItem() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.from("news_items").select("*").eq("id", id).single().then(({ data }: { data: unknown }) => {
      if (data) { const d = data as Record<string, string>; setForm({ ...d, published_date: d.published_date ? new Date(d.published_date).toISOString().split("T")[0] : "" }); }
      setLoading(false);
    });
  }, [id]);

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const { data, error } = await supabase.storage.from("news").upload(`${Date.now()}-${file.name}`, file, { upsert: true });
    if (!error && data) update("image_url", `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news/${data.path}`);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); await supabase.from("news_items").update(form).eq("id", id); router.push("/admin/news"); };

  if (loading) return <AdminDashboardLayout><Skeleton className="h-96 w-full max-w-2xl" /></AdminDashboardLayout>;

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold mb-6">Edit Article</h1>
      <Card className="max-w-2xl">
        <CardHeader><CardTitle>Article Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["title", "jurisdiction", "summary", "source_url", "source_name", "author", "read_time"].map(key => (
              <div key={key}>
                <label className="text-sm font-medium mb-1 block capitalize">{key.replace(/_/g, " ")}</label>
                {key === "summary" ? <Textarea rows={3} value={form[key] || ""} onChange={e => update(key, e.target.value)} />
                  : <Input value={form[key] || ""} onChange={e => update(key, e.target.value)} />}
              </div>
            ))}
            <div>
              <label className="text-sm font-medium mb-1 block">Image</label>
              {form.image_url && <p className="text-xs text-muted-foreground mb-1 truncate">{form.image_url}</p>}
              <Input type="file" accept="image/*" onChange={handleUpload} />
              {uploading && <p className="text-xs text-muted-foreground mt-1">Uploading...</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select value={form.category || ""} onValueChange={(v) => update("category", v || "")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["DEFA", "Cross-Border Data", "AI Governance", "Cybersecurity", "DATA LOCALIZATION", "DEFA SPECIAL REPORT", "AI GOVERNANCE"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Publish Date</label>
                <Input type="date" value={form.published_date || ""} onChange={e => update("published_date", e.target.value)} />
              </div>
            </div>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
          </form>
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
}
