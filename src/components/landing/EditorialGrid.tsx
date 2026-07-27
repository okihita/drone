"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { EXECUTIVE_INSIGHTS } from "@/lib/landingContent";

interface FieldDispatch {
  id: string;
  title: string;
  category: string;
  summary: string;
  image_url: string | null;
}

interface RadarEntry {
  id: string;
  jurisdiction: string;
  title: string;
  threat_level: string;
  date: string;
}

export default function EditorialGrid() {
  const insights = EXECUTIVE_INSIGHTS;
  const [dispatches, setDispatches] = useState<FieldDispatch[]>([]);
  const [radar, setRadar] = useState<RadarEntry[]>([]);

  useEffect(() => {
    supabase
      .from("news_items")
      .select("id, title, category, summary, image_url")
      .order("published_date", { ascending: false })
      .limit(2)
      .then(({ data }) => { if (data) setDispatches(data as FieldDispatch[]); });
  }, []);

  useEffect(() => {
    supabase
      .from("policies")
      .select("id, jurisdiction, title, threat_level, date")
      .order("date", { ascending: false })
      .limit(3)
      .then(({ data }) => { if (data) setRadar(data as RadarEntry[]); });
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COLUMN 1: Executive Insights */}
        <div className="lg:col-span-5 space-y-6 lg:border-r lg:border-slate-200 lg:dark:border-slate-800 lg:pr-8 animate-fade-up">
          <span className="text-xs font-sans uppercase tracking-widest text-asean-yellow font-bold block">
            {insights.kebab}
          </span>
          <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            {insights.heading}
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            <span className="float-left text-4xl sm:text-5xl font-serif-editorial font-extrabold pr-2.5 pt-0.5 text-asean-yellow leading-none select-none">
              {insights.bodyLeadChar}
            </span>
            {insights.bodyPrefix}
            <strong>US$2.0 Trillion by 2030</strong>
            {insights.bodySuffix}
          </p>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm dark:shadow-none">
            <h4 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-sm">
              {insights.frictionHeading}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-sans">
              {insights.frictionPoints.map((fp) => (
                <li key={fp.label} className="flex items-start gap-2">
                  <span className="text-asean-yellow font-bold">\u2022</span>
                  <span><strong>{fp.label}</strong> {fp.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link href={insights.ctaHref} className="inline-flex items-center gap-2 text-xs font-sans font-bold text-asean-yellow hover:underline pt-2">
            <span>{insights.ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* COLUMN 2: Field Dispatches (live from news_items) */}
        <div className="lg:col-span-4 space-y-6 lg:border-r lg:border-slate-200 lg:dark:border-slate-800 lg:pr-8 animate-fade-up [animation-delay:150ms]">
          <span className="text-xs font-sans uppercase tracking-widest text-asean-blue font-bold block">
            02 \u2022 FIELD DISPATCHES
          </span>
          {dispatches.map((d, idx) => (
            <article key={d.id} className={`group space-y-3 ${idx < dispatches.length - 1 ? "pb-6 border-b border-slate-200 dark:border-slate-800" : ""}`}>
              <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900">
                <Image
                  src={d.image_url || ""}
                  alt={d.title}
                  fill
                  sizes="(max-width: 1023px) 100vw, 33vw"
                  className="object-cover transition-opacity duration-500"
                />
              </div>
              <span className="text-[10px] font-sans text-asean-yellow font-bold uppercase">{d.category}</span>
              <h4 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-base group-hover:text-asean-yellow transition-colors leading-snug">{d.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed font-sans">{d.summary}</p>
            </article>
          ))}
        </div>

        {/* COLUMN 3: Regulatory Radar (live from policies) */}
        <div className="lg:col-span-3 space-y-6 animate-fade-up [animation-delay:300ms]">
          <span className="text-xs font-sans uppercase tracking-widest text-asean-blue font-bold block">
            03 \u2022 REGULATORY RADAR
          </span>
          <div className="space-y-4 font-sans">
            {radar.map((entry) => {
              const alert = entry.threat_level === "High Alert" ? "text-asean-red" : entry.threat_level === "Medium Risk" ? "text-asean-yellow" : "text-asean-blue";
              return (
                <div key={entry.id} className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between text-[10px] font-sans">
                    <span className="font-bold text-slate-900 dark:text-white">{entry.jurisdiction}</span>
                    <span className={`font-bold ${alert}`}>{entry.threat_level}</span>
                  </div>
                  <h4 className="font-serif-editorial font-bold text-xs text-slate-900 dark:text-white leading-snug">{entry.title}</h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">{entry.date}</span>
                </div>
              );
            })}
          </div>
          <Link href="/ledger" className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-asean-blue hover:underline pt-2">
            <span>Explore Full Policy Ledger ({radar.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
