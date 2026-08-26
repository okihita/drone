"use client";

import React, { useEffect, useState } from "react";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { listJurisdictions, updateJurisdiction } from "@/services/jurisdictions";
import { revalidateAfterMutation } from "@/lib/revalidate";
import { CACHE_TAGS } from "@/lib/cache";
import { REGIME_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Save, X } from "lucide-react";
import type { Jurisdiction, RegimeType } from "@/types";

export default function JurisdictionsEditor() {
  const [items, setItems] = useState<Jurisdiction[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Jurisdiction>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    listJurisdictions()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const startEdit = (j: Jurisdiction) => {
    setEditing(j.id);
    setForm(j);
  };

  const save = async () => {
    if (!editing) return;
    try {
      await updateJurisdiction(editing, form);
      revalidateAfterMutation(CACHE_TAGS.jurisdictions, CACHE_TAGS.homepage);
      setEditing(null);
      const updated = await listJurisdictions();
      setItems(updated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
  };

  const threatColor = (s: number) =>
    s >= 4 ? "text-red-600" : s >= 3 ? "text-yellow-600" : "text-blue-600";

  if (loading)
    return (
      <AdminDashboardLayout>
        <Skeleton className="h-64 w-full" />
      </AdminDashboardLayout>
    );

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold mb-6">Jurisdictions</h1>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      <div className="grid gap-4">
        {items.map((j) => (
          <Card key={j.id}>
            {editing === j.id ? (
              <CardContent className="pt-6 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      "name",
                      "regime_type",
                      "data_flow_policy",
                      "key_legislation",
                      "primary_link",
                    ] as const
                  ).map((k) => (
                    <div
                      key={k}
                      className={
                        k === "name" || k === "data_flow_policy"
                          ? "col-span-2"
                          : ""
                      }
                    >
                      <label className="text-sm font-medium mb-0.5 block capitalize">
                        {k.replace(/_/g, " ")}
                      </label>
                      {k === "regime_type" ? (
                        <Select
                          value={String(form[k] ?? "")}
                          onValueChange={(v) =>
                            setForm({ ...form, [k]: v as RegimeType })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {REGIME_TYPES.map((rt) => (
                              <SelectItem key={rt} value={rt}>
                                {rt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          value={String(form[k] ?? "")}
                          onChange={(e) =>
                            setForm({ ...form, [k]: e.target.value })
                          }
                        />
                      )}
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="text-sm font-medium mb-0.5 block">
                      Description
                    </label>
                    <Textarea
                      rows={2}
                      value={form.description || ""}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={save}>
                    <Save className="w-3.5 h-3.5 mr-1" /> Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditing(null)}
                  >
                    <X className="w-3.5 h-3.5 mr-1" /> Cancel
                  </Button>
                </div>
              </CardContent>
            ) : (
              <CardContent className="flex items-start justify-between py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{j.name}</span>
                    <Badge variant="outline" className="text-sm">
                      {j.code}
                    </Badge>
                    <Badge variant="secondary" className="text-sm">
                      {j.regime_type}
                    </Badge>
                    <span className={`text-sm font-bold ${threatColor(j.threat_score)}`}>
                      Threat: {j.threat_score}/5
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {j.description}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => startEdit(j)}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </AdminDashboardLayout>
  );
}
