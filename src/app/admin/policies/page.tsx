"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { listPolicies, deletePolicy } from "@/services/policies";
import { revalidateAfterMutation } from "@/lib/revalidate";
import { CACHE_TAGS } from "@/lib/cache";
import { THREAT_BADGE_CLASSES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { PolicyListItem } from "@/types";

export default function PoliciesList() {
  const [policies, setPolicies] = useState<PolicyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    listPolicies()
      .then((data) => {
        if (active) {
          setPolicies(data);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (active) {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this policy?")) return;
    try {
      await deletePolicy(id);
      revalidateAfterMutation(CACHE_TAGS.policies, CACHE_TAGS.radar, CACHE_TAGS.homepage);
      fetch();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif-editorial text-2xl font-extrabold">
          Policies
        </h1>
        <Link href="/admin/policies/new">
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" /> New Policy
          </Button>
        </Link>
      </div>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="rounded-lg border bg-white dark:bg-slate-900 overflow-x-auto">
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
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              : policies.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {p.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {p.jurisdiction}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {p.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs ${THREAT_BADGE_CLASSES[p.threat_level] ?? ""}`}
                      >
                        {p.threat_level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {p.date}
                    </TableCell>
                    <TableCell className="flex gap-1">
                      <Link href={`/admin/policies/${p.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(p.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </AdminDashboardLayout>
  );
}
