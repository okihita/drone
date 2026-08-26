import type { Metadata } from "next";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageShell from "@/components/layout/PageShell";
import CuratedLinksClient from "@/components/links/CuratedLinksClient";

export const metadata: Metadata = {
  title: "Links — DRONE",
  description: "Curated collection of primary legal sources, civil society trade analyses, official gazettes, and investigative dossiers across Southeast Asia.",
};

export default function LinksPage() {
  return (
    <PageShell>
      <Header />
      <main className="flex-1 py-10 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full font-sans">
        
        {/* Page Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 font-sans">
          <span className="inline-block rounded-full border border-asean-yellow/50 bg-asean-yellow/15 px-3 py-0.5 text-sm font-sans font-bold text-asean-yellow-dark dark:text-asean-yellow mb-2 uppercase tracking-wider">
            Primary Resources &amp; Research
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Curated Policy &amp; Trade Links
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-sm mt-2 max-w-3xl leading-relaxed font-sans">
            Direct access to official legal gazettes, civil society critiques, bilateral trade analyses, and regional digital rights reports.
          </p>
        </div>

        <CuratedLinksClient />
      </main>
      <Footer />
    </PageShell>
  );
}
