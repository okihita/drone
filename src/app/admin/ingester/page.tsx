"use client";

import React, { useEffect, useState } from "react";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DownloadCloud, RefreshCw, CheckCircle2, Trash2, ExternalLink, 
  Sparkles, AlertCircle, ShieldAlert, Globe, Layers, Filter
} from "lucide-react";
import Image from "next/image";
import type { NewsItem } from "@/types";

const JURISDICTIONS = [
  "Indonesia (ID)", "Malaysia (MY)", "Singapore (SG)", "Philippines (PH)",
  "Thailand (TH)", "Vietnam (VN)", "Cambodia (KH)", "Laos (LA)",
  "Myanmar (MM)", "Brunei (BN)", "Timor-Leste (TL)", "ASEAN Regional"
];

const CATEGORIES = ["AI Governance", "DEFA", "Cross-Border Data", "Cybersecurity"];
const THREAT_LEVELS = ["High Alert", "Medium Risk", "Rights Verified"];

export default function AdminIngesterPage() {
  const [stagedItems, setStagedItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<NewsItem>>({});

  const fetchStagedItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news_items")
      .select("*")
      .eq("status", "pending_review")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setStagedItems(data as unknown as NewsItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStagedItems();
  }, []);

  const handleRunSync = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/cron/engagemedia-sync", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.report) {
        setSyncResult(
          `Sync Complete! Fetched ${data.report.totalFetched} posts. Newly Staged: ${data.report.newlyIngested}, Skipped: ${data.report.skippedCount}.`
        );
        fetchStagedItems();
      } else {
        setSyncResult(`Sync Error: ${data.error || "Failed to trigger ingestion"}`);
      }
    } catch (err: unknown) {
      setSyncResult(`Execution Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleApprove = async (item: NewsItem) => {
    const patch = editingId === item.id ? editForm : {};
    const { error } = await supabase
      .from("news_items")
      .update({
        status: "published",
        jurisdiction: patch.jurisdiction || item.jurisdiction,
        category: patch.category || item.category,
        threat_level: patch.threat_level || item.threat_level || "Medium Risk",
        summary: patch.summary || item.summary,
        title: patch.title || item.title,
      })
      .eq("id", item.id);

    if (!error) {
      setStagedItems((prev) => prev.filter((i) => i.id !== item.id));
      if (editingId === item.id) setEditingId(null);
    } else {
      alert(`Approval error: ${error.message}`);
    }
  };

  const handleDiscard = async (id: string) => {
    if (!confirm("Are you sure you want to discard this staged item?")) return;
    const { error } = await supabase
      .from("news_items")
      .update({ status: "archived" })
      .eq("id", id);

    if (!error) {
      setStagedItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const startEditing = (item: NewsItem) => {
    setEditingId(item.id);
    setEditForm({
      title: item.title,
      summary: item.summary,
      jurisdiction: item.jurisdiction,
      category: item.category,
      threat_level: item.threat_level || "Medium Risk",
    });
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <DownloadCloud className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              EngageMedia Content Ingester
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Human-in-the-Loop (HITL) Staging Queue for automated EngageMedia blog ingestion
            </p>
          </div>

          <Button
            onClick={handleRunSync}
            disabled={syncing}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Polling WP API..." : "Run Ingester Sync Now"}
          </Button>
        </div>

        {/* Sync Result Banner */}
        {syncResult && (
          <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 text-sm flex items-start gap-3">
            <Sparkles className="w-5 h-5 shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5" />
            <div>
              <p className="font-semibold">Ingester Status Report</p>
              <p className="mt-0.5">{syncResult}</p>
            </div>
          </div>
        )}

        {/* Stats summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="py-3 px-4">
              <CardDescription>Staged Pending Review</CardDescription>
              <CardTitle className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {stagedItems.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="py-3 px-4">
              <CardDescription>Source Feed</CardDescription>
              <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200">
                EngageMedia WP API
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="py-3 px-4">
              <CardDescription>Auto Classifier</CardDescription>
              <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Gemini AI 1.5 Flash
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Pending Items List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              Pending Review Queue ({stagedItems.length})
            </h2>
            <Button variant="ghost" size="sm" onClick={fetchStagedItems}>
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh Queue
            </Button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : stagedItems.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="py-12 text-center text-slate-500">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 opacity-80" />
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Staging Queue is Clean!
                </p>
                <p className="text-sm mt-1">
                  All EngageMedia articles have been reviewed and published. Click &ldquo;Run Ingester Sync Now&rdquo; to poll for new articles.
                </p>
              </CardContent>
            </Card>
          ) : (
            stagedItems.map((item) => {
              const isEditing = editingId === item.id;

              return (
                <Card 
                  key={item.id} 
                  className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow transition-shadow"
                >
                  <CardContent className="p-5 sm:p-6 space-y-4">
                    {/* Top Bar / Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200">
                          <Sparkles className="w-3 h-3 mr-1 text-indigo-500" />
                          WP Post #{item.wp_post_id}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          Published: {item.published_date}
                        </span>
                      </div>

                      <a
                        href={item.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-xs text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-medium"
                      >
                        Original EngageMedia Post <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>

                    {/* Title */}
                    {isEditing ? (
                      <div>
                        <label className="text-xs font-semibold text-slate-500 block mb-1">Article Title</label>
                        <input
                          type="text"
                          value={editForm.title || ""}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full px-3 py-1.5 text-sm border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                        />
                      </div>
                    ) : (
                      <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </h3>
                    )}

                    {/* Featured Image Preview */}
                    {item.image_url && (
                      <div className="relative w-full h-44 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 600px"
                          unoptimized
                        />
                      </div>
                    )}

                    {/* Classifications */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg text-sm">
                      <div>
                        <label className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1">
                          <Globe className="w-3.5 h-3.5 text-indigo-500" /> Target Jurisdiction
                        </label>
                        {isEditing ? (
                          <select
                            value={editForm.jurisdiction || item.jurisdiction}
                            onChange={(e) => setEditForm({ ...editForm, jurisdiction: e.target.value })}
                            className="w-full p-1 text-xs border rounded bg-white dark:bg-slate-900"
                          >
                            {JURISDICTIONS.map((j) => (
                              <option key={j} value={j}>{j}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {item.jurisdiction}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1">
                          <Layers className="w-3.5 h-3.5 text-indigo-500" /> Category
                        </label>
                        {isEditing ? (
                          <select
                            value={editForm.category || item.category}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                            className="w-full p-1 text-xs border rounded bg-white dark:bg-slate-900"
                          >
                            {CATEGORIES.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {item.category}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1">
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> Threat Score
                        </label>
                        {isEditing ? (
                          <select
                            value={editForm.threat_level || item.threat_level || "Medium Risk"}
                            onChange={(e) => setEditForm({ ...editForm, threat_level: e.target.value })}
                            className="w-full p-1 text-xs border rounded bg-white dark:bg-slate-900"
                          >
                            {THREAT_LEVELS.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            {item.threat_level || "Medium Risk"}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    <div>
                      <label className="text-xs font-semibold text-slate-500 block mb-1">
                        Executive Policy Summary
                      </label>
                      {isEditing ? (
                        <textarea
                          rows={3}
                          value={editForm.summary || ""}
                          onChange={(e) => setEditForm({ ...editForm, summary: e.target.value })}
                          className="w-full px-3 py-2 text-sm border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                        />
                      ) : (
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded border border-slate-100 dark:border-slate-800">
                          {item.summary}
                        </p>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                            Cancel Edit
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => startEditing(item)}>
                            Tweak Metadata
                          </Button>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDiscard(item.id)}
                          className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Discard
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(item)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1.5" /> Approve & Publish
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
