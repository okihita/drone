"use client";

import React, { useEffect, useState, useMemo } from "react";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DownloadCloud, RefreshCw, CheckCircle2, Trash2, ExternalLink, 
  Sparkles, ShieldAlert, Globe, Layers, FileText, Calendar, User
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

  // Helper to parse jurisdiction string into an array
  const currentJurisdictions = useMemo(() => {
    const raw = editForm.jurisdiction ?? selectedItem?.jurisdiction ?? "";
    return raw.split(",").map((s) => s.trim()).filter(Boolean);
  }, [editForm.jurisdiction, selectedItem?.jurisdiction]);

  const toggleJurisdiction = (j: string) => {
    let updated: string[];
    if (currentJurisdictions.includes(j)) {
      updated = currentJurisdictions.filter((item) => item !== j);
    } else {
      updated = [...currentJurisdictions, j];
    }
    setEditForm({
      ...editForm,
      jurisdiction: updated.join(", "),
    });
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm rounded-[4px]"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Polling WP API..." : "Run Ingester Sync Now"}
          </Button>
        </div>

        {/* Sync Result Banner */}
        {syncResult && (
          <div className="p-4 rounded-[4px] bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 text-sm flex items-start gap-3">
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
              <Button variant="ghost" size="sm" onClick={fetchStagedItems} className="text-xs h-7 rounded-[4px]">
                <RefreshCw className="w-3 h-3 mr-1" /> Refresh
              </Button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="rounded-[4px]">
                    <CardContent className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : stagedItems.length === 0 ? (
              <Card className="border-dashed border-2 rounded-[4px]">
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
                      style={{ borderRadius: "4px" }}
                      className={`border transition-all cursor-pointer overflow-hidden ${
                        isSelected
                          ? "bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-500 dark:border-indigo-500 shadow-sm ring-1 ring-indigo-500/30"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-stretch min-h-[92px]">
                        {/* Flush Left 16:9 Landscape Image (0 padding, 0 margin) */}
                        {item.image_url && item.image_url.trim() ? (
                          <div className="relative w-36 sm:w-40 shrink-0 aspect-[16/9] self-center bg-slate-100 dark:bg-slate-800">
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="160px"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="w-36 sm:w-40 shrink-0 aspect-[16/9] self-center bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-medium">
                            No Image
                          </div>
                        )}

                        {/* Right Content with Padding */}
                        <div className="min-w-0 flex-1 p-3.5 space-y-2 flex flex-col justify-between">
                          <h3 className="font-serif-editorial text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                            {item.title}
                          </h3>
                          <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-500 font-sans">
                            <span>{item.published_date}</span>
                            <Badge variant="outline" className="text-[10px] py-0 px-1.5 rounded-[2px]">
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

          {/* RIGHT PANE (Detail Workbench - 7 Cols, Sticky) */}
          <div className="lg:col-span-7 lg:sticky lg:top-6">
            {selectedItem ? (
              <Card className="border-slate-200 dark:border-slate-800 shadow-md rounded-[4px]">
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
                  {/* Title Editor */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Article Title
                    </label>
                    <input
                      type="text"
                      value={editForm.title || ""}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-3 py-2 text-sm font-medium border rounded-[4px] bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-serif-editorial font-bold"
                    />
                  </div>

                  {/* Full Article Metadata Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-100/60 dark:bg-slate-950/60 rounded-[4px] text-xs font-sans">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <User className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span className="truncate">Author: <strong>{selectedItem.author || "EngageMedia Research"}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>Date: <strong>{selectedItem.published_date}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>Source: <strong>EngageMedia WP</strong></span>
                    </div>
                  </div>

                  {/* MULTI-SELECT JURISDICTION SELECTOR */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between mb-2">
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-indigo-500" /> Target Jurisdictions (Multi-Select)
                      </span>
                      <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold normal-case">
                        {currentJurisdictions.length} selected
                      </span>
                    </label>
                    <div className="flex flex-wrap gap-1.5 p-3 rounded-[4px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      {JURISDICTIONS.map((j) => {
                        const isChecked = currentJurisdictions.includes(j);
                        return (
                          <button
                            key={j}
                            type="button"
                            onClick={() => toggleJurisdiction(j)}
                            className={`text-xs py-1 px-2.5 rounded-[3px] transition-all font-medium border ${
                              isChecked
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                            }`}
                          >
                            {isChecked ? "✓ " : "+ "}{j}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Category & Threat Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-[4px] border border-slate-100 dark:border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1">
                        <Layers className="w-3.5 h-3.5 text-indigo-500" /> Category
                      </label>
                      <select
                        value={editForm.category || selectedItem.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value as NewsItem["category"] })}
                        className="w-full p-2 text-xs border rounded-[4px] bg-white dark:bg-slate-900 font-medium"
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
                        className="w-full p-2 text-xs border rounded-[4px] bg-white dark:bg-slate-900 font-medium"
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
                      rows={3}
                      value={editForm.summary || ""}
                      onChange={(e) => setEditForm({ ...editForm, summary: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-[4px] bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Full Article Content Reader with Rich Typography */}
                  <div className="space-y-2 pt-2 border-t">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-500" /> Full Article Source Content
                    </label>
                    {(() => {
                      let htmlContent = "";
                      try {
                        if (selectedItem?.raw_wp_data) {
                          const parsed = JSON.parse(selectedItem.raw_wp_data as string);
                          htmlContent = parsed.content_html || "";
                        }
                      } catch {}

                      return htmlContent ? (
                        <div 
                          className="p-5 rounded-[4px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 leading-relaxed max-h-[450px] overflow-y-auto font-sans space-y-4
                          [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:dark:text-white [&_h1]:mt-4 [&_h1]:mb-2
                          [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:dark:text-white [&_h2]:mt-4 [&_h2]:mb-2
                          [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:dark:text-white [&_h3]:mt-3 [&_h3]:mb-1
                          [&_p]:mb-3 [&_p]:leading-relaxed
                          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ul]:space-y-1
                          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_ol]:space-y-1
                          [&_a]:text-indigo-600 [&_a]:dark:text-indigo-400 [&_a]:underline [&_a]:font-medium
                          [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-3 [&_blockquote]:text-slate-600 [&_blockquote]:dark:text-slate-400
                          [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-md [&_img]:my-3 [&_img]:border [&_img]:border-slate-200"
                          dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                      ) : (
                        <div className="p-4 rounded-[4px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 italic">
                          {selectedItem?.summary || "Full article text not available."}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Action Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t">
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={saving}
                      onClick={handleDiscard}
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-[4px]"
                    >
                      <Trash2 className="w-4 h-4 mr-1.5" /> Discard Item
                    </Button>

                    <Button
                      onClick={handleApprove}
                      disabled={saving}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 shadow-sm rounded-[4px]"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {saving ? "Publishing..." : "Approve & Publish to Ledger"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="rounded-[4px]">
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
