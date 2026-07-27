"use client";

import React, { useEffect, useState } from "react";
import AdminDashboardLayout from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";
import { Pencil } from "lucide-react";

interface Jurisdiction {
  id: string;
  code: string;
  name: string;
  regime_type: string;
  threat_score: number;
  data_flow_policy: string;
  key_legislation: string;
  description: string;
  primary_link: string;
}

export default function JurisdictionsEditor() {
  const [items, setItems] = useState<Jurisdiction[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Jurisdiction>>({});

  useEffect(() => {
    supabase.from("jurisdictions").select("*").order("code").then(({ data }: { data: unknown }) => {
      if (data) setItems(data as Jurisdiction[]);
    });
  }, []);

  const startEdit = (j: Jurisdiction) => {
    setEditing(j.id);
    setForm(j);
  };

  const handleSave = async () => {
    if (!editing) return;
    await supabase.from("jurisdictions").update(form).eq("id", editing);
    setEditing(null);
    const { data } = await supabase.from("jurisdictions").select("*").order("code");
    if (data) setItems(data as Jurisdiction[]);
  };

  return (
    <AdminDashboardLayout>
      <h1 className="font-serif-editorial text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Jurisdictions</h1>
      <div className="space-y-3">
        {items.map((j) => (
          <div key={j.id} className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
            {editing === j.id ? (
              <div className="space-y-3">
                {(["name", "regime_type", "data_flow_policy", "key_legislation", "description", "primary_link"] as const).map((k) => (
                  <div key={k}>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">{k.replace(/_/g, " ")}</label>
                    {k === "description" ? (
                      <textarea rows={2} value={(form as Record<string, string>)[k] || ""} onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200" />
                    ) : (
                      <input value={(form as Record<string, string>)[k] || ""} onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200" />
                    )}
                  </div>
                ))}
                <div className="flex gap-2">
                  <button onClick={handleSave} className="px-4 py-1.5 rounded bg-asean-yellow text-slate-950 text-xs font-bold">Save</button>
                  <button onClick={() => setEditing(null)} className="px-4 py-1.5 rounded bg-slate-200 dark:bg-slate-700 text-xs">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 dark:text-white">{j.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{j.code}</span>
                    <span className="text-[10px] font-bold text-asean-yellow">{j.regime_type}</span>
                    <span className="text-[10px] text-slate-500">Threat: {j.threat_score}/5</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{j.description}</p>
                </div>
                <button onClick={() => startEdit(j)} className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"><Pencil className="w-3.5 h-3.5" /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminDashboardLayout>
  );
}
