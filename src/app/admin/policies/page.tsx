"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Policy {
  id: string; title: string; jurisdiction: string; category: string; threat_level: string; date: string;
}

export default function PoliciesList() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    supabase.from("policies").select("id,title,jurisdiction,category,threat_level,date").order("date", { ascending: false })
      .then(({ data }: { data: unknown }) => { if (data) setPolicies(data as Policy[]); setLoading(false); });
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this policy?")) return;
    await supabase.from("policies").delete().eq("id", id);
    fetch();
  };

  const threatVariant = (level: string) =>
    level === "High Alert" ? "destructive" : level === "Medium Risk" ? "secondary" : "default";

  return (
    <AdminDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif-editorial text-2xl font-extrabold">Policies</h1>
        <Link href="/admin/policies/new"><Button size="sm"><Plus className="w-4 h-4 mr-1" /> New Policy</Button></Link>
      </div>

      <div className="rounded-lg border bg-white dark:bg-slate-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Jurisdiction</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Threat</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}><TableCell colSpan={6}><Skeleton className="h-8 w-full" /></TableCell></TableRow>
              ))
            ) : policies.map(p => (
              <TableRow key={p.id}>
                <TableCell className="font-medium max-w-xs truncate">{p.title}</TableCell>
                <TableCell className="text-muted-foreground">{p.jurisdiction}</TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{p.category}</Badge></TableCell>
                <TableCell><Badge variant={threatVariant(p.threat_level)} className="text-xs">{p.threat_level}</Badge></TableCell>
                <TableCell className="text-muted-foreground text-xs">{p.date}</TableCell>
                <TableCell className="flex gap-1">
                  <Link href={`/admin/policies/${p.id}`}><Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button></Link>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDelete(p.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminDashboardLayout>
  );
}
