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

export default function EditPolicy() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error: fetchErr } = await supabase.from("policies").select("*").eq("id", id).single();
      if (fetchErr) { setError(fetchErr.message); setLoading(false); return; }
      if (data) { const d = data as Record<string, string>; const p = new Date(d.date); setForm({ ...d, date: isNaN(p.getTime()) ? "" : p.toISOString().split("T")[0] }); }
      setLoading(false);
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError("");
    const displayDate = new Date(form.date || "").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const { error: updErr } = await supabase.from("policies").update({ ...form, date: displayDate }).eq("id", id);
    if (updErr) { setError(updErr.message); setSaving(false); return; }
    router.push("/admin/policies");
  };

  if (loading) return <AdminDashboardLayout><Skeleton className="h-96 w-full max-w-2xl" /></AdminDashboardLayout>;

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold mb-6">Edit Policy</h1>
      <Card className="max-w-2xl">
        <CardHeader><CardTitle>Policy Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["title", "jurisdiction", "summary", "primary_source_url", "source_authority"].map(key => (
              <div key={key}><label className="text-sm font-medium mb-1 block capitalize">{key.replace(/_/g, " ")}</label>{key === "summary" ? <Textarea rows={3} value={form[key] || ""} onChange={e => update(key, e.target.value)} /> : <Input value={form[key] || ""} onChange={e => update(key, e.target.value)} />}</div>
            ))}
            <div className="grid grid-cols-3 gap-3">
              <div><label className="text-sm font-medium mb-1 block">Category</label><Select value={form.category || "DEFA"} onValueChange={(v) => update("category", v || "")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["DEFA", "Cross-Border Data", "AI Governance", "Cybersecurity"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
              <div><label className="text-sm font-medium mb-1 block">Threat Level</label><Select value={form.threat_level || "Medium Risk"} onValueChange={(v) => update("threat_level", v || "")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["High Alert", "Medium Risk", "Rights Verified"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
              <div><label className="text-sm font-medium mb-1 block">Date</label><Input type="date" value={form.date || ""} onChange={e => update("date", e.target.value)} /></div>
            </div>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
}
