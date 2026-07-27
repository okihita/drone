"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, BookOpen, Shield, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Col 1: Institutional Overview */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-serif-editorial text-xl font-bold text-white tracking-wider">
              D.R.O.N.E.
            </span>
            <span className="text-[10px] font-mono-data text-slate-400 border border-slate-800 px-1.5 py-0.5 rounded">
              ENGAGEMEDIA OBSERVATORY
            </span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
            <strong>Digital Rights Oversight &amp; Network Evaluator</strong> is an independent policy intelligence platform developed by <strong>EngageMedia</strong>. It monitors ASEAN digital trade frameworks, legal scrubbing, cross-border data transfer laws, and algorithmic governance threats.
          </p>

          <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono-data">
            <span>Author: <strong className="text-slate-200">Okihita</strong></span>
            <span>•</span>
            <span>Client: <strong className="text-slate-200">EngageMedia</strong></span>
          </div>
        </div>

        {/* Col 2: Research Modules */}
        <div className="space-y-2">
          <h4 className="font-mono-data text-xs uppercase font-bold text-white tracking-wider mb-3">
            Research Modules
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link href="#featured-analysis" className="hover:text-amber-400 transition-colors">
                Featured DEFA Investigation
              </Link>
            </li>
            <li>
              <Link href="#asean-map" className="hover:text-amber-400 transition-colors">
                ASEAN Jurisdiction Map &amp; Dossiers
              </Link>
            </li>
            <li>
              <Link href="#policy-ledger" className="hover:text-amber-400 transition-colors">
                Verified Policy Ledger &amp; Table
              </Link>
            </li>
            <li>
              <Link href="#defa-monitor" className="hover:text-amber-400 transition-colors">
                DEFA Negotiation Milestone Monitor
              </Link>
            </li>
            <li>
              <Link href="#threat-matrix" className="hover:text-amber-400 transition-colors">
                Civil Society Threat Matrix
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Donor Strategic Alignment */}
        <div className="space-y-2">
          <h4 className="font-mono-data text-xs uppercase font-bold text-white tracking-wider mb-3">
            Strategic Donor Partners
          </h4>
          <ul className="space-y-3 text-xs">
            <li>
              <a
                href="https://luminategroup.com/en"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center justify-between group"
              >
                <span className="font-semibold text-slate-200">Luminate Group</span>
                <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-amber-400" />
              </a>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Data &amp; Digital Rights, Algorithmic Oversight &amp; Platform Accountability
              </p>
            </li>

            <li>
              <a
                href="https://www.sida.se/en"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center justify-between group"
              >
                <span className="font-semibold text-slate-200">Sida (Sweden)</span>
                <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-amber-400" />
              </a>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Strategy for Regional Cooperation in Asia-Pacific, Defending Online Civic Space
              </p>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-mono-data">
        <div>
          © 2026 EngageMedia • D.R.O.N.E. Project • Released under CC BY 4.0 Human Rights License.
        </div>
        <div>
          Published with Next.js 16, React 19 &amp; Tailwind CSS v4
        </div>
      </div>
    </footer>
  );
}
