"use client";

import { useEffect, useRef } from "react";
import { MapPin, ExternalLink, X } from "lucide-react";
import type { GeoCountryData } from "@/lib/aseanGeo";
import { FLAG_COMPONENTS } from "@/lib/flags";

interface Props {
  country: GeoCountryData;
  onClose: () => void;
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-sans">
      <span className="block text-sm text-slate-500 uppercase tracking-wider font-semibold font-sans">{label}</span>
      <span className={`font-bold text-sm ${accent ? "text-asean-red" : "text-slate-900 dark:text-white"}`}>{value}</span>
    </div>
  );
}

export default function CountryDossierModal({ country, onClose }: Props) {
  const FlagIcon = FLAG_COMPONENTS[country.code];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md font-sans"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-country-name"
      onClick={(e) => { if (e.target === e.currentTarget) onCloseRef.current(); }}
    >
      <div ref={dialogRef} className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <button ref={closeButtonRef} onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus-visible:ring-2 focus-visible:ring-asean-yellow" aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 font-sans">
          {FlagIcon ? (
            <FlagIcon className="w-7 h-5 rounded-xs shrink-0 shadow-xs" />
          ) : (
            <MapPin className="w-6 h-6 text-asean-yellow" />
          )}
          <div>
            <h3 id="modal-country-name" className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">{country.name}</h3>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-sans">Capital: {country.capital} &bull; ISO: {country.code}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm font-sans">
          <StatCard label="DATA REGIME" value={country.regimeType} />
          <StatCard label="THREAT SCORE" value={`${country.threatScore} / 5`} accent />
          <StatCard label="INGESTED DECREES" value={`${country.activePoliciesCount} Acts`} />
        </div>

        <div className="space-y-3 text-sm font-sans mb-6 text-slate-700 dark:text-slate-300">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <strong className="block text-slate-900 dark:text-white mb-1">Key Digital Trade Legislation:</strong>
            {country.keyLegislation}
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <strong className="block text-slate-900 dark:text-white mb-1">Cross-Border Data Transfer Posture:</strong>
            {country.dataFlowPolicy}
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <strong className="block text-slate-900 dark:text-white mb-1">Executive Summary:</strong>
            {country.description}
          </div>
        </div>

        <div className="flex items-center justify-between font-sans">
          <a href={country.primaryLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300 hover:text-asean-yellow font-semibold">
            <span>Access Primary Source Decree</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white font-sans text-sm font-semibold hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-asean-yellow transition-colors">
            Close Brief
          </button>
        </div>
      </div>
    </div>
  );
}
