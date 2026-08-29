import type { Metadata } from "next";
import React from "react";
import AseanMap from "@/components/observatory/AseanMap";
import HeroBanner from "@/components/layout/HeroBanner";
import { getRealAseanCountries } from "@/lib/aseanGeo";
import { listJurisdictions } from "@/services/jurisdictions";
import { MapPin, ShieldAlert, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Cartographic Observatory & Threat Matrix — DRONE",
  description: "Interactive SVG map documenting data localization mandates and cross-border data transfer regimes plus civil society digital rights threat assessment across 11 ASEAN nations.",
};

export default async function ObservatoryPage() {
  const jurisdictions = await listJurisdictions();
  const countries = getRealAseanCountries(jurisdictions);
  const strictCount = countries.filter((c) => c.regimeType === "Strict Localization").length;
  const avgThreat =
    Math.round((countries.reduce((sum, c) => sum + c.threatScore, 0) / Math.max(countries.length, 1)) * 10) / 10;

  return (
    <main className="flex-1 py-8">
        <HeroBanner
          eyebrow="REGIONAL MAP &amp; THREAT MATRIX"
          title="Cartographic Observatory &amp; Digital Rights Threat Matrix"
          description={
            <>
              An interactive vector mapping observatory documenting data localization mandates, cross-border transfer legal regimes, and civil society risk scores across 11 Southeast Asian nations — evaluating data sovereignty erosion, algorithmic audit bans, and surveillance weaponization.
            </>
          }
          stats={[
            { icon: MapPin, iconClass: "text-asean-blue", label: "Jurisdictions", value: `${countries.length} Tracked` },
            { icon: Lock, iconClass: "text-asean-red", label: "Strict Localization", value: `${strictCount} Regimes` },
            { icon: ShieldAlert, iconClass: "text-asean-amber", label: "Avg Threat Score", value: `${avgThreat}/5` },
          ]}
          concepts={[
            { title: "Open Transfer Regime (ASEAN Gold)", desc: "Permitting cross-border data flows by default under comparable privacy baselines." },
            { title: "Hybrid / Selective Localization (ASEAN Blue)", desc: "Public sector localization paired with private sector contractual transfer safeguards." },
            { title: "Strict Data Localization (ASEAN Red)", desc: "Mandatory domestic server storage and state law enforcement access mandates." },
          ]}
          conceptCols={3}
          howToRead={
            <>
              Click any country on the map to open its full jurisdiction dossier — key digital trade legislation, cross-border data posture, threat score, and primary source decrees. Use the filter to isolate regime types.
            </>
          }
        />

        <AseanMap initialCountries={countries} />

        {/* Threat Matrix Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 font-sans">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 font-sans">
            <span className="text-sm font-sans text-asean-red font-bold uppercase tracking-wider">
              STRUCTURAL RISK DIMENSIONS
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Civil Society Digital Rights Assessment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 font-sans">
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-asean-red/10 border border-asean-red/30 flex items-center justify-center text-asean-red font-sans font-bold text-sm">
                  01
                </div>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-xl">
                  Data Free Flow with Trust (DFFT) vs. Privacy Sovereignty
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-sm leading-relaxed font-sans">
                Trade agreements enforcing mandatory cross-border data transfers without strong baseline privacy laws enable commercial data harvesting by global tech monopolies. Citizens in nations without robust personal data enforcement lose jurisdiction over their personal data once exported.
              </p>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-asean-yellow/10 border border-asean-yellow/30 flex items-center justify-center text-asean-yellow font-sans font-bold text-sm">
                  02
                </div>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-xl">
                  Bans on Mandatory Source Code Audits
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-sm leading-relaxed font-sans">
                Proposed digital trade clauses prohibiting governments from requiring source code disclosure shield high-risk automated decision systems from independent audit. This prevents civil society and regulators from evaluating AI models for gender, racial, or political bias.
              </p>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-asean-yellow/10 border border-asean-yellow/30 flex items-center justify-center text-asean-yellow font-sans font-bold text-sm">
                  03
                </div>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-xl">
                  Cybersecurity Weaponization &amp; Surveillance
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-sm leading-relaxed font-sans">
                Broad national security exceptions in cybersecurity decrees (e.g. Vietnam Decree 53, Indonesia MR5) are co-opted by authoritarian regimes to mandate local server access, conduct unconstrained surveillance, and force content take-downs within 24 hours.
              </p>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 font-sans font-bold text-sm">
                  04
                </div>
                <h3 className="font-serif-editorial font-bold text-slate-900 dark:text-white text-xl">
                  Democratic Deficit in Closed-Door Trade Negotiations
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-sm leading-relaxed font-sans">
                Regional trade treaties negotiated behind closed doors by Senior Economic Officials Meetings (SEOM) bind national parliaments to deregulatory commitments without public consultation, parliamentary scrutiny, or human rights impact assessments.
              </p>
            </div>
          </div>
        </div>
    </main>
  );
}
