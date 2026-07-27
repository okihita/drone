import type { Metadata } from "next";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Threat Matrix — DRONE",
  description: "Structural human rights risk assessment evaluating data sovereignty erosion, algorithmic audit bans, and surveillance weaponization across ASEAN.",
};

export default function ThreatsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans transition-colors">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 font-sans">
          <span className="text-xs font-sans text-asean-red font-bold uppercase tracking-wider">
            RISK ASSESSMENT MATRIX
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Civil Society Digital Rights Threat Matrix
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed font-sans">
            Evaluating structural human rights risks, data sovereignty erosion, algorithmic audit bans, and surveillance weaponization across ASEAN digital trade agreements and legislative decrees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 font-sans">
          
          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-asean-red/10 border border-asean-red/30 flex items-center justify-center text-asean-red font-sans font-bold text-sm">
                01
              </div>
              <h2 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-xl">
                Data Free Flow with Trust (DFFT) vs. Privacy Sovereignty
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
              Trade agreements enforcing mandatory cross-border data transfers without strong baseline privacy laws enable commercial data harvesting by global tech monopolies. Citizens in nations without robust personal data enforcement lose jurisdiction over their personal data once exported.
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-asean-yellow/10 border border-asean-yellow/30 flex items-center justify-center text-asean-yellow font-sans font-bold text-sm">
                02
              </div>
              <h2 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-xl">
                Bans on Mandatory Source Code Audits
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
              Proposed digital trade clauses prohibiting governments from requiring source code disclosure shield high-risk automated decision systems from independent audit. This prevents civil society and regulators from evaluating AI models for gender, racial, or political bias.
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-asean-yellow/10 border border-asean-yellow/30 flex items-center justify-center text-asean-yellow font-sans font-bold text-sm">
                03
              </div>
              <h2 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-xl">
                Cybersecurity Weaponization &amp; Surveillance
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
              Broad national security exceptions in cybersecurity decrees (e.g. Vietnam Decree 53, Indonesia MR5) are co-opted by authoritarian regimes to mandate local server access, conduct unconstrained surveillance, and force content take-downs within 24 hours.
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 font-sans font-bold text-sm">
                04
              </div>
              <h2 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-xl">
                Democratic Deficit in Closed-Door Trade Negotiations
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
              Regional trade treaties negotiated behind closed doors by Senior Economic Officials Meetings (SEOM) bind national parliaments to deregulatory commitments without public consultation, parliamentary scrutiny, or human rights impact assessments.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
