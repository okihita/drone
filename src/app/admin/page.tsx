"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Newspaper, FileText, Globe, Pencil, Eye } from "lucide-react";

interface Policy {
  id: string; title: string; jurisdiction: string; category: string; threat_level: string; date: string;
}
interface NewsItem {
  id: string; title: string; jurisdiction: string; category: string; image_url: string | null; published_date: string;
}
interface Jurisdiction {
  id: string; code: string; name: string; regime_type: string; threat_score: number;
}

export default function AdminDashboard() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from("policies").select("id,title,jurisdiction,category,threat_level,date").order("date", { ascending: false }).limit(4).then(r => r.data as Policy[] | null),
      supabase.from("news_items").select("id,title,jurisdiction,category,image_url,published_date").order("published_date", { ascending: false }).limit(3).then(r => r.data as NewsItem[] | null),
      supabase.from("jurisdictions").select("id,code,name,regime_type,threat_score").order("threat_score", { ascending: false }).limit(5).then(r => r.data as Jurisdiction[] | null),
    ]).then(([p, n, j]) => {
      if (p) setPolicies(p);
      if (n) setNews(n);
      if (j) setJurisdictions(j);
      setLoading(false);
    });
  }, []);

  const threatColor = (level: string) =>
    level === "High Alert" ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400" :
    level === "Medium Risk" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400" :
    "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400";

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Policies */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2"><FileText className="w-4 h-4" /> Recent Policies</CardTitle>
            <Link href="/admin/policies" className="text-xs text-muted-foreground hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)
            ) : policies.map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{p.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{p.jurisdiction}</span>
                    <Badge variant="outline" className="text-[10px]">{p.category}</Badge>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${threatColor(p.threat_level)}`}>{p.threat_level}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 shrink-0 ml-2">
                  <Link href={`/admin/policies/${p.id}`}><Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="w-3 h-3" /></Button></Link>
                  <Link href="/ledger"><Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3 h-3" /></Button></Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Latest News */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2"><Newspaper className="w-4 h-4" /> Latest News</CardTitle>
            <Link href="/admin/news" className="text-xs text-muted-foreground hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
            ) : news.map(n => (
              <div key={n.id} className="flex gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                {n.image_url ? (
                  <Image src={n.image_url} alt={n.title} width={64} height={48} className="rounded object-cover w-16 h-12 shrink-0" />
                ) : (
                  <div className="w-16 h-12 rounded bg-muted shrink-0 flex items-center justify-center"><Newspaper className="w-4 h-4 text-muted-foreground" /></div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{n.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs text-muted-foreground">{n.jurisdiction}</span>
                    <Badge variant="secondary" className="text-[10px]">{n.category}</Badge>
                  </div>
                </div>
                <div className="flex gap-0.5 shrink-0 ml-2">
                  <Link href={`/admin/news/${n.id}`}><Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="w-3 h-3" /></Button></Link>
                  <Link href="/investigations"><Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3 h-3" /></Button></Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Jurisdictions at a Glance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2"><Globe className="w-4 h-4" /> Top Threat Levels</CardTitle>
            <Link href="/admin/jurisdictions" className="text-xs text-muted-foreground hover:underline">Manage</Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)
            ) : jurisdictions.map(j => (
              <div key={j.id} className="flex items-center justify-between p-2 rounded-lg border">
                <div>
                  <span className="text-sm font-medium">{j.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{j.code}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px]">{j.regime_type}</Badge>
                  <span className={`text-xs font-bold ${j.threat_score >= 4 ? "text-red-600" : j.threat_score >= 3 ? "text-yellow-600" : "text-blue-600"}`}>
                    {j.threat_score}/5
                  </span>
                  <div className="flex gap-0.5 ml-1">
                    <Link href={`/admin/jurisdictions`}><Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="w-3 h-3" /></Button></Link>
                    <Link href="/observatory"><Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3 h-3" /></Button></Link>
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
