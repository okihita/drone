import type { Metadata } from "next";
import React from "react";
import Header from "@/components/Header";
import AseanMap from "@/components/AseanMap";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cartographic Observatory — DRONE",
  description: "Interactive SVG map documenting data localization mandates and cross-border data transfer regimes across 11 ASEAN nations.",
};

export default function ObservatoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans transition-colors">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4 font-sans">
            <span className="text-xs font-sans text-asean-yellow font-bold uppercase tracking-wider">
              D.R.O.N.E. SPECIAL TOOL MODULE
            </span>
            <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Cartographic Jurisdiction Observatory
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl font-sans">
              An interactive vector SVG mapping tool documenting data localization mandates, cross-border data transfer legal regimes, and digital rights threat scores across 11 Southeast Asian nations.
            </p>
          </div>
        </div>

        <AseanMap />
      </main>
      <Footer />
    </div>
  );
}
