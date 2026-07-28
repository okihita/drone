"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { createPolicy } from "@/services/policies";
import { getBrowserClient } from "@/lib/supabase";
import { POLICY_CATEGORIES, THREAT_LEVELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Policy, PolicyCategory, ThreatLevel } from "@/types";

interface NewPolicyForm {
  title: string;
  jurisdiction: string;
  category: PolicyCategory;
  threat_level: ThreatLevel;
  date: string; // ISO date string for the date picker
  summary: string;
  primary_source_url: string;
  source_authority: string;
}

const INITIAL_FORM: NewPolicyForm = {
  title: "",
  jurisdiction: "",
  category: "DEFA",
  threat_level: "Medium Risk",
  date: new Date().toISOString().split("T")[0],
  summary: "",
  primary_source_url: "",
  source_authority: "",
};

export default function NewPolicy() {
  const router = useRouter();
  const [form, setForm] = useState<NewPolicyForm>(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof NewPolicyForm>(key: K, value: NewPolicyForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const displayDate = new Date(form.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      await createPolicy({ ...form, date: displayDate }, getBrowserClient());
      router.push("/admin/policies");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  };

  const fields: { label: string; key: keyof NewPolicyForm; Textarea?: boolean; placeholder?: string; type?: string }[] = [
    { label: "Title", key: "title" },
    { label: "Jurisdiction", key: "jurisdiction", placeholder: "e.g. Indonesia (ID)" },
    { label: "Summary", key: "summary", Textarea: true },
    { label: "Primary Source URL", key: "primary_source_url", type: "url" },
    { label: "Source Authority", key: "source_authority", placeholder: "e.g. Kominfo RI" },
  ];

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold mb-6">New Policy</h1>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Policy Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ label, key: k, Textarea: isTA, placeholder, type }) => (
              <div key={k}>
                <label className="text-sm font-medium mb-1 block">{label}</label>
                {isTA ? (
                  <Textarea
                    rows={3}
                    value={form[k] as string}
                    onChange={(e) => update(k, e.target.value as NewPolicyForm[typeof k])}
                  />
                ) : (
                  <Input
                    type={type || "text"}
                    value={form[k] as string}
                    placeholder={placeholder}
                    onChange={(e) => update(k, e.target.value as NewPolicyForm[typeof k])}
                  />
                )}
              </div>
            ))}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select
                  value={form.category}
                  onValueChange={(v) => update("category", v as PolicyCategory)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {POLICY_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Threat Level</label>
                <Select
                  value={form.threat_level}
                  onValueChange={(v) => update("threat_level", v as ThreatLevel)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {THREAT_LEVELS.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Date</label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Create Policy"}
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
}
