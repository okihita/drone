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
  Sparkles, ShieldAlert, Globe, Layers, Eye, Save, ArrowRight
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

export default function AdminIngesterWorkbench() {
  const [stagedItems, setStagedItems] = useState<NewsItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<NewsItem>>({});
  const [saving, setSaving] = useState(false);

  const fetchStagedItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news_items")
      .select("*")
      .eq("status", "pending_review")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const items = data as unknown as NewsItem[];
      setStagedItems(items);
      if (items.length > 0 && !selectedId) {
        setSelectedId(items[0].id);
        initForm(items[0]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStagedItems();
  }, []);

  const selectedItem = stagedItems.find((item) => item.id === selectedId) || stagedItems[0] || null;

  function initForm(item: NewsItem) {
    setEditForm({
      title: item.title,
      summary: item.summary,
      jurisdiction: item.jurisdiction,
      category: item.category,
      threat_level: item.threat_level || "Medium Risk",
    });
  }

  const handleSelect = (item: NewsItem) => {
    setSelectedId(item.id);
    initForm(item);
  };

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

  const handleApprove = async () => {
    if (!selectedItem) return;
    setSaving(true);

    const { error } = await supabase
      .from("news_items")
      .update({
        status: "published",
        jurisdiction: editForm.jurisdiction || selectedItem.jurisdiction,
        category: editForm.category || selectedItem.category,
        threat_level: editForm.threat_level || selectedItem.threat_level || "Medium Risk",
        summary: editForm.summary || selectedItem.summary,
        title: editForm.title || selectedItem.title,
      })
      .eq("id", selectedItem.id);

    setSaving(false);

    if (!error) {
      const updatedList = stagedItems.filter((i) => i.id !== selectedItem.id);
      setStagedItems(updatedList);
      if (updatedList.length > 0) {
        setSelectedId(updatedList[0].id);
        initForm(updatedList[0]);
      } else {
        setSelectedId(null);
      }
    } else {
      alert(`Approval error: ${error.message}`);
    }
  };

  const handleDiscard = async () => {
    if (!selectedItem) return;
    if (!confirm("Are you sure you want to discard this staged item?")) return;

    setSaving(true);
    const { error } = await supabase
      .from("news_items")
      .update({ status: "archived" })
      .eq("id", selectedItem.id);

    setSaving(false);

    if (!error) {
      const updatedList = stagedItems.filter((i) => i.id !== selectedItem.id);
      setStagedItems(updatedList);
      if (updatedList.length > 0) {
        setSelectedId(updatedList[0].id);
        initForm(updatedList[0]);
      } else {
        setSelectedId(null);
      }
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
          <div>
            <h1 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <DownloadCloud className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              EngageMedia Ingester Workbench
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Split-pane Master-Detail review &amp; live publication workspace
            </p>
          </div>

          <Button
            onClick={handleRunSync}
            disabled={syncing}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm"
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

        {/* Master-Detail Split Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT PANE (Master List - 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Staged Articles ({stagedItems.length})
              </h2>
              <Button variant="ghost" size="sm" onClick={fetchStagedItems} className="text-xs h-7">
                <RefreshCw className="w-3 h-3 mr-1" /> Refresh
              </Button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : stagedItems.length === 0 ? (
              <Card className="border-dashed border-2">
                <CardContent className="py-12 text-center text-slate-500">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
                  <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                    Queue is Clean!
                  </p>
                  <p className="text-xs mt-1 text-slate-500">
                    All EngageMedia articles have been reviewed and published.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {stagedItems.map((item) => {
                  const isSelected = selectedItem?.id === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-indigo-50/70 dark:bg-indigo-950/50 border-indigo-500 dark:border-indigo-500 shadow-sm ring-1 ring-indigo-500/30"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <div className="flex gap-3 items-start">
                        {/* Compact Image */}
                        {item.image_url && item.image_url.trim() ? (
                          <div className="relative w-20 h-14 shrink-0 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-14 shrink-0 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[10px] text-slate-400">
                            No Img
                          </div>
                        )}

                        <div className="min-w-0 flex-1 space-y-1">
                          <h3 className="font-serif-editorial text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                            {item.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                            <span>{item.published_date}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                              {item.jurisdiction}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT PANE (Inspector & Live Workbench - 7 Cols, Sticky) */}
          <div className="lg:col-span-7 lg:sticky lg:top-6">
            {selectedItem ? (
              <Card className="border-slate-200 dark:border-slate-800 shadow-md">
                <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 py-3.5 px-6 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <span className="font-semibold text-xs text-slate-700 dark:text-slate-300">
                      WP Post #{selectedItem.wp_post_id}
                    </span>
                  </div>

                  <a
                    href={selectedItem.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Original EngageMedia Post <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  {/* Featured Cover Photo */}
                  {selectedItem.image_url && selectedItem.image_url.trim() ? (
                    <div className="relative w-full h-56 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                      <Image
                        src={selectedItem.image_url}
                        alt={selectedItem.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 700px"
                        unoptimized
                      />
                    </div>
                  ) : null}

                  {/* Title Editor */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Article Title
                    </label>
                    <input
                      type="text"
                      value={editForm.title || ""}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-3 py-2 text-sm font-medium border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Classification Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1">
                        <Globe className="w-3.5 h-3.5 text-indigo-500" /> Jurisdiction
                      </label>
                      <select
                        value={editForm.jurisdiction || selectedItem.jurisdiction}
                        onChange={(e) => setEditForm({ ...editForm, jurisdiction: e.target.value })}
                        className="w-full p-2 text-xs border rounded-md bg-white dark:bg-slate-900 font-medium"
                      >
                        {JURISDICTIONS.map((j) => (
                          <option key={j} value={j}>{j}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1">
                        <Layers className="w-3.5 h-3.5 text-indigo-500" /> Category
                      </label>
                      <select
                        value={editForm.category || selectedItem.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="w-full p-2 text-xs border rounded-md bg-white dark:bg-slate-900 font-medium"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> Threat Score
                      </label>
                      <select
                        value={editForm.threat_level || selectedItem.threat_level || "Medium Risk"}
                        onChange={(e) => setEditForm({ ...editForm, threat_level: e.target.value })}
                        className="w-full p-2 text-xs border rounded-md bg-white dark:bg-slate-900 font-medium"
                      >
                        {THREAT_LEVELS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Summary Textarea */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Executive Policy Summary
                    </label>
                    <textarea
                      rows={4}
                      value={editForm.summary || ""}
                      onChange={(e) => setEditForm({ ...editForm, summary: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Live Public Ledger Card Preview */}
                  <div className="space-y-2 pt-2 border-t">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-indigo-500" /> Public Site Card Preview
                    </label>
                    <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 shadow-inner">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-amber-400 font-bold uppercase tracking-wider">
                          {editForm.category || selectedItem.category}
                        </span>
                        <span className="text-slate-400">
                          {editForm.jurisdiction || selectedItem.jurisdiction}
                        </span>
                      </div>
                      <h4 className="font-serif-editorial text-base font-bold leading-snug">
                        {editForm.title || selectedItem.title}
                      </h4>
                      <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed italic border-l-2 border-amber-400 pl-2.5">
                        {editForm.summary || selectedItem.summary}
                      </p>
                    </div>
                  </div>

                  {/* Action Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t">
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={saving}
                      onClick={handleDiscard}
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                    >
                      <Trash2 className="w-4 h-4 mr-1.5" /> Discard Item
                    </Button>

                    <Button
                      onClick={handleApprove}
                      disabled={saving}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {saving ? "Publishing..." : "Approve & Publish to Ledger"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-16 text-center text-slate-500">
                  <p>Select an article from the left pane to begin reviewing.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
