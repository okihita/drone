import type { Metadata } from "next";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InvestigationsList from "@/components/landing/InvestigationsList";

export const metadata: Metadata = {
  title: "Investigations — DRONE",
  description: "Independent, source-verified investigative reporting on ASEAN digital trade treaties, data localization decrees, and AI governance policies.",
};

export default function InvestigationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans transition-colors">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 font-sans">
          <span className="text-sm font-sans text-asean-yellow font-bold uppercase tracking-wider">
            EDITORIAL JOURNALISM CATALOG
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Investigative Reports &amp; Field Studies
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-sm mt-2 max-w-3xl leading-relaxed font-sans">
            Independent, source-verified investigative reporting translating dense trade negotiations, data localization decrees, and AI governance policies across Southeast Asia.
          </p>
        </div>
        <InvestigationsList />
      </main>
      <Footer />
    </div>
  );
}
