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

export default function NewPolicy() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", jurisdiction: "", category: "DEFA", threat_level: "Medium Risk", date: new Date().toISOString().split("T")[0], summary: "", primary_source_url: "", source_authority: "" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const displayDate = new Date(form.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    await supabase.from("policies").insert({ ...form, date: displayDate });
    router.push("/admin/policies");
  };

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold mb-6">New Policy</h1>
      <Card className="max-w-2xl">
        <CardHeader><CardTitle>Policy Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Title", key: "title" },
              { label: "Jurisdiction", key: "jurisdiction", placeholder: "e.g. Indonesia (ID)" },
              { label: "Summary", key: "summary", Textarea: true },
              { label: "Primary Source URL", key: "primary_source_url", type: "url" },
              { label: "Source Authority", key: "source_authority", placeholder: "e.g. Kominfo RI" },
            ].map(({ label, key, placeholder, type, Textarea: isTA }) => (
              <div key={key}>
                <label className="text-sm font-medium mb-1 block">{label}</label>
                {isTA ? (
                  <Textarea rows={3} value={(form as Record<string, string>)[key]} onChange={e => update(key, e.target.value)} />
                ) : (
                  <Input type={type || "text"} value={(form as Record<string, string>)[key]} placeholder={placeholder} onChange={e => update(key, e.target.value)} />
                )}
              </div>
            ))}

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select value={form.category} onValueChange={(v) => update("category", v || "")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["DEFA", "Cross-Border Data", "AI Governance", "Cybersecurity"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Threat Level</label>
                <Select value={form.threat_level} onValueChange={(v) => update("threat_level", v || "")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["High Alert", "Medium Risk", "Rights Verified"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Date</label>
                <Input type="date" value={form.date} onChange={e => update("date", e.target.value)} />
              </div>
            </div>

            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Create Policy"}</Button>
          </form>
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
}
