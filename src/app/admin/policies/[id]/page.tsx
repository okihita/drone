"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { getPolicyById, updatePolicy } from "@/services/policies";
import { revalidateAfterMutation } from "@/lib/revalidate";
import { CACHE_TAGS } from "@/lib/cache";
import { POLICY_CATEGORIES, THREAT_LEVELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Policy, PolicyCategory, ThreatLevel } from "@/types";

interface EditPolicyForm {
  title: string;
  jurisdiction: string;
  category: PolicyCategory;
  threat_level: ThreatLevel;
  date: string;
  summary: string;
  primary_source_url: string;
  source_authority: string;
}

export default function EditPolicy() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<EditPolicyForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getPolicyById(id)
      .then((data) => {
        if (!data) {
          setError("Policy not found");
          return;
        }
        const parsed = new Date(data.date);
        setForm({
          title: data.title,
          jurisdiction: data.jurisdiction,
          category: data.category as PolicyCategory,
          threat_level: data.threat_level as ThreatLevel,
          date: isNaN(parsed.getTime()) ? "" : parsed.toISOString().split("T")[0],
          summary: data.summary,
          primary_source_url: data.primary_source_url,
          source_authority: data.source_authority,
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const update = <K extends keyof EditPolicyForm>(key: K, value: EditPolicyForm[K]) =>
    setForm((f) => (f ? { ...f, [key]: value } : f));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError("");
    try {
      const displayDate = new Date(form.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      await updatePolicy(id, { ...form, date: displayDate });
      revalidateAfterMutation(CACHE_TAGS.policies, CACHE_TAGS.radar, CACHE_TAGS.homepage);
      router.push("/admin/policies");
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
        <p className="text-red-600">{error || "Policy not found"}</p>
      </AdminDashboardLayout>
    );

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold mb-6">Edit Policy</h1>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Policy Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {(
              ["title", "jurisdiction", "summary", "primary_source_url", "source_authority"] as const
            ).map((key) => (
              <div key={key}>
                <label className="text-sm font-medium mb-1 block capitalize">
                  {key.replace(/_/g, " ")}
                </label>
                {key === "summary" ? (
                  <Textarea
                    rows={3}
                    value={form[key]}
                    onChange={(e) => update(key, e.target.value)}
                  />
                ) : (
                  <Input
                    value={form[key]}
                    onChange={(e) => update(key, e.target.value)}
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
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
}
