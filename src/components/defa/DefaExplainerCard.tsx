"use client";

import React from "react";
import { BookOpen, ShieldAlert } from "lucide-react";

export default function DefaExplainerCard() {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-800/80 shadow-xs space-y-6 sm:space-y-8 font-sans">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200/70 dark:border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-asean-yellow/15 text-asean-amber">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="font-serif-editorial text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                What is DEFA? (ASEAN Digital Economy Framework Agreement)
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-asean-amber/15 text-asean-amber border border-asean-amber/30 text-sm font-sans font-bold">
                SEOM Manila 2026 Status
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-sans mt-1">
              The world’s first region-wide, legally binding digital economy governance treaty
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8 pt-1 text-sm sm:text-base font-sans leading-relaxed">
          {/* Executive Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-5 sm:p-6 rounded-xl bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200/70 dark:border-slate-800/80 space-y-2">
              <span className="font-sans text-sm uppercase font-bold text-asean-blue tracking-wider">1. The Treaty &amp; Vision</span>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                The <strong className="text-slate-900 dark:text-white font-bold">Digital Economy Framework Agreement (DEFA)</strong> is a landmark treaty binding all 11 ASEAN member states (680M+ citizens). It establishes unified regional rules for digital trade, cross-border payments, cybersecurity, and emerging technology.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200/70 dark:border-slate-800/80 space-y-2">
              <span className="font-sans text-sm uppercase font-bold text-asean-emerald tracking-wider">2. $2 Trillion Economic Scale</span>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                DEFA is projected to double Southeast Asia&apos;s digital economy from ~$300 Billion USD in 2023 to <strong className="text-slate-900 dark:text-white font-bold">US$2.0 Trillion by 2030</strong>—unlocking massive e-commerce, cloud, and cross-border QR payment integration.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200/70 dark:border-slate-800/80 space-y-2">
              <span className="font-sans text-sm uppercase font-bold text-asean-amber tracking-wider">3. July 2026 Milestone</span>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Negotiations officially concluded at the 57th SEOM in Manila (May 2026). DEFA is currently undergoing <strong className="text-slate-900 dark:text-white font-bold">Legal Scrubbing</strong> ahead of formal execution at the 49th ASEAN Summit in November 2026.
              </p>
            </div>
          </div>

          {/* Why DRONE Monitors DEFA */}
          <div className="p-6 rounded-xl bg-asean-red/10 border border-asean-red/30 space-y-2.5">
            <div className="flex items-center gap-2 text-asean-red font-bold text-sm uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 shrink-0" /> Why DRONE Provides Independent DEFA Oversight
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              DEFA text negotiations were conducted behind closed doors by Senior Economic Officials Meetings (SEOM) without civil society or privacy advocate participation. DRONE monitors DEFA to prevent <strong className="text-slate-900 dark:text-white font-semibold">Big Tech deregulatory capture</strong> (such as bans on source code audits or digital taxation) and ensure vague cybersecurity exceptions are not weaponized for state surveillance or censorship against citizens.
            </p>
          </div>
        </div>
    </div>
  );
}
