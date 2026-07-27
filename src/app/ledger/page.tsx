"use client";

import React from "react";
import Header from "@/components/Header";
import PolicyLedgerTable from "@/components/PolicyLedgerTable";
import Footer from "@/components/Footer";

export default function LedgerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans transition-colors">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-sans text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-wider">
              D.R.O.N.E. SPECIAL TOOL MODULE
            </span>
            <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Verified Regulatory Ledger &amp; Legal Text Registry
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl font-sans">
              Searchable, 100% source-verified database of ingested digital trade bills, cross-border data transfer decrees, and AI governance guidelines across Southeast Asia.
            </p>
          </div>
        </div>

        <PolicyLedgerTable />
      </main>
      <Footer />
    </div>
  );
}
