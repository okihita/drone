import type { Metadata } from "next";
import React from "react";
import CuratedLinksClient from "@/components/links/CuratedLinksClient";
import { getCuratedLinks } from "@/services/airtableLinks";

export const metadata: Metadata = {
  title: "Curated Knowledge Hub | Observatory — DRONE",
  description: "Curated collection of primary legal sources, civil society trade analyses, official gazettes, and investigative dossiers across Southeast Asia.",
};

export default async function LinksPage() {
  const links = await getCuratedLinks();

  return (
    <main className="flex-1 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full font-sans space-y-8 sm:space-y-10">
      {/* Page Header */}
      <div className="border-b border-slate-200/70 dark:border-slate-800/80 pb-6 sm:pb-8 font-sans space-y-2">
        <span className="inline-block rounded-full border border-asean-yellow/50 bg-asean-yellow/15 px-3.5 py-1 text-sm font-sans font-bold text-asean-yellow-dark dark:text-asean-yellow mb-1 uppercase tracking-wider">
          Primary Resources &amp; Research
        </span>
        <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
          Curated Policy &amp; Trade Links
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed font-sans">
          Direct access to official legal gazettes, civil society critiques, bilateral trade analyses, and regional digital rights reports.
        </p>
      </div>

      <CuratedLinksClient initialLinks={links} />
    </main>
  );
}
