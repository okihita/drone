import type { Metadata } from "next";
import React from "react";
import PolicyLedgerTable from "@/components/PolicyLedgerTable";

export const metadata: Metadata = {
  title: "Policy Ledger — DRONE",
  description: "Searchable, 100% source-verified database of ingested digital trade bills, cross-border data decrees, and AI governance guidelines.",
};

export default function LedgerPage() {
  return (
    <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4 font-sans">
            <span className="text-sm font-sans text-asean-yellow font-bold uppercase tracking-wider">
              VERIFIED REGULATORY REPOSITORY
            </span>
            <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              ASEAN Digital Trade &amp; Policy Ledger
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-sm mt-1.5 max-w-3xl font-sans leading-relaxed">
              Searchable, 100% source-verified registry of ingested legislative acts, cross-border decrees, and AI governance guidelines across Southeast Asia. Every entry links directly to primary official statutory gazettes.
            </p>
          </div>
        </div>

        <PolicyLedgerTable />
    </main>
  );
}
