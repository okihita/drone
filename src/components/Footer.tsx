"use client";

import React from "react";
import Link from "next/link";
import { Radar, Shield, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Col 1: Brand Info */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Radar className="w-4 h-4" />
            </div>
            <span className="font-bold text-base text-white tracking-wider">D.R.O.N.E.</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-md mb-4">
            <strong>Digital Rights Oversight &amp; Network Evaluator</strong> is an open-source policy intelligence platform developed by <strong>EngageMedia</strong> to monitor ASEAN tech policy, cross-border data flows, and AI governance threats.
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
            <span>Author: <strong className="text-slate-300">Okihita</strong></span>
            <span>•</span>
            <span>Client: <strong className="text-slate-300">EngageMedia</strong></span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
            Platform Modules
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="#asean-map" className="hover:text-cyan-400 transition-colors">
                Interactive ASEAN Vector Map
              </Link>
            </li>
            <li>
              <Link href="#weekly-recaps" className="hover:text-cyan-400 transition-colors">
                Weekly Policy Recaps
              </Link>
            </li>
            <li>
              <Link href="#defa-tracker" className="hover:text-cyan-400 transition-colors">
                ASEAN DEFA Tracker ($2T Target)
              </Link>
            </li>
            <li>
              <Link href="#threat-matrix" className="hover:text-cyan-400 transition-colors">
                Civil Society Threat Matrix
              </Link>
            </li>
            <li>
              <Link href="#govsim" className="hover:text-cyan-400 transition-colors">
                GovSim Simulation Engine
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Donor Alignment & Grants */}
        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
            Donor Strategic Partners
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a
                href="https://luminategroup.com/en"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center justify-between group"
              >
                <span>Luminate Group</span>
                <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-cyan-400" />
              </a>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Data &amp; Digital Rights, Algorithmic Oversight
              </p>
            </li>
            <li>
              <a
                href="https://www.sida.se/en"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center justify-between group"
              >
                <span>Sida (Sweden)</span>
                <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-cyan-400" />
              </a>
              <p className="text-[10px] text-slate-500 mt-0.5">
                APAC Regional Strategy, Defending Online Civic Space
              </p>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          © 2026 EngageMedia • D.R.O.N.E. Project • Released under CC BY 4.0 Human Rights License.
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <span>Engineered with Next.js 15, React 19 &amp; Tailwind CSS v4</span>
        </div>
      </div>
    </footer>
  );
}
