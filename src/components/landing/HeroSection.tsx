import React from "react";
import Link from "next/link";
import AseanBlindMap from "@/components/AseanBlindMap";
import HeroSearch from "@/components/HeroSearch";
import { ArrowRight, Globe, FileText, ShieldCheck, Languages } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-slate-900 dark:bg-slate-950 text-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden shadow-xl">
      {/* Full-Width Vector SVG ASEAN Blind Map Background */}
      <AseanBlindMap />

      {/* Centered Compact Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
        <h1 className="font-serif-editorial text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
          Research and data to safeguard digital rights across Southeast Asia.
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-2xl mx-auto">
          <Link
            href="/investigations"
            className="inline-flex items-center gap-1 text-asean-yellow hover:underline font-semibold"
          >
            <span>Read about our mission &amp; EngageMedia research strategy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>

        {/* Central Search Bar */}
        <div className="pt-1">
          <HeroSearch />
        </div>

        {/* Micro-Stats Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-sans text-slate-300">
          <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span><strong>11</strong> ASEAN Member States</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5 shadow-xs">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span><strong>14</strong> Ingested Decrees</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span><strong>100%</strong> Primary Source Verified</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center gap-1.5 shadow-xs">
            <Languages className="w-3.5 h-3.5 text-slate-400" />
            <span><strong>2</strong> Languages (EN &amp; ID)</span>
          </span>
        </div>
      </div>
    </section>
  );
}
