"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { listPolicies } from "@/services/policies";
import { listNews } from "@/services/news";
import { listJurisdictionSummaries } from "@/services/jurisdictions";
import { THREAT_BADGE_CLASSES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Newspaper, FileText, Globe, Pencil, Eye } from "lucide-react";
import type { PolicyListItem, NewsListItem, JurisdictionSummary } from "@/types";

export default function AdminDashboard() {
  const [policies, setPolicies] = useState<PolicyListItem[]>([]);
  const [news, setNews] = useState<NewsListItem[]>([]);
  const [jurisdictions, setJurisdictions] = useState<JurisdictionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      listPolicies().then((data) => data.slice(0, 4)),
      listNews().then((data) => data.slice(0, 3)),
      listJurisdictionSummaries(),
    ])
      .then(([p, n, j]) => {
        if (cancelled) return;
        setPolicies(p);
        setNews(n);
        setJurisdictions(j);
        setLoading(false);
      })
      .catch((err) => {
        if (!cancelled) {
          setErrors([err.message]);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold text-slate-900 dark:text-white mb-6">
        Dashboard
      </h1>
      {errors.length > 0 && (
        <Card className="mb-4 border-red-300 dark:border-red-800">
          <CardContent className="py-3">
            <p className="text-sm text-red-600">{errors.join(" | ")}</p>
          </CardContent>
        </Card>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Policies */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <FileText className="w-4 h-4" /> Recent Policies
            </CardTitle>
            <Link
              href="/admin/policies"
              className="text-xs text-muted-foreground hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))
              : policies.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{p.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {p.jurisdiction}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {p.category}
                        </Badge>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${THREAT_BADGE_CLASSES[p.threat_level] ?? ""}`}
                        >
                          {p.threat_level}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 shrink-0 ml-2">
                      <Link href={`/admin/policies/${p.id}`}>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Pencil className="w-3 h-3" />
                        </Button>
                      </Link>
                      <Link href="/ledger">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
          </CardContent>
        </Card>

        {/* Latest News */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Newspaper className="w-4 h-4" /> Latest News
            </CardTitle>
            <Link
              href="/admin/news"
              className="text-xs text-muted-foreground hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))
              : news.map((n) => (
                  <div
                    key={n.id}
                    className="flex gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors"
                  >
                    {n.image_url ? (
                      <Image
                        src={n.image_url}
                        alt={n.title}
                        width={64}
                        height={48}
                        className="rounded object-cover w-16 h-12 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-12 rounded bg-muted shrink-0 flex items-center justify-center">
                        <Newspaper className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{n.title}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {n.jurisdiction}
                        </span>
                        <Badge variant="secondary" className="text-[10px]">
                          {n.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-0.5 shrink-0 ml-2">
                      <Link href={`/admin/news/${n.id}`}>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Pencil className="w-3 h-3" />
                        </Button>
                      </Link>
                      <Link href="/investigations">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
          </CardContent>
        </Card>

        {/* Top Threat Levels */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Globe className="w-4 h-4" /> Top Threat Levels
            </CardTitle>
            <Link
              href="/admin/jurisdictions"
              className="text-xs text-muted-foreground hover:underline"
            >
              Manage
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))
              : jurisdictions.map((j) => (
                  <div
                    key={j.id}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div>
                      <span className="text-sm font-medium">{j.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {j.code}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">
                        {j.regime_type}
                      </Badge>
                      <span
                        className={`text-xs font-bold ${
                          j.threat_score >= 4
                            ? "text-red-600"
                            : j.threat_score >= 3
                              ? "text-yellow-600"
                              : "text-blue-600"
                        }`}
                      >
                        {j.threat_score}/5
                      </span>
                      <div className="flex gap-0.5 ml-1">
                        <Link href="/admin/jurisdictions">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <Pencil className="w-3 h-3" />
                          </Button>
                        </Link>
                        <Link href="/observatory">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
