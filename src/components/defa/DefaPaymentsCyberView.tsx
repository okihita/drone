"use client";

import React from "react";
import { getDefaPaymentStates } from "@/services/defa";
import { ASEAN_MEMBER_STATES } from "@/lib/countries";
import { CreditCard } from "lucide-react";
import Footer from "@/components/Footer";

export default function DefaPaymentsCyberView() {
  const paymentStates = getDefaPaymentStates();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans">
      {/* Header Banner */}
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans uppercase tracking-widest text-asean-amber font-bold">
            <CreditCard className="h-4 w-4 text-asean-amber animate-pulse" />
            <span>DEFA Chapters 3 &amp; 4 Observatory</span>
            <span>·</span>
            <span className="text-slate-500 font-mono">RPC QR Network &amp; Cyber Defense</span>
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Regional Payment Connectivity &amp; Cyber Defense
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-sans leading-relaxed">
            Tracking cross-border QR code linkages (QRIS, DuitNow, PayNow, PromptPay), e-invoicing standards, and national CERT cybersecurity breach disclosure windows across Southeast Asia.
          </p>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentStates.map((st) => {
            const country = ASEAN_MEMBER_STATES.find((m) => m.code === st.countryCode);

            return (
              <div
                key={st.countryCode}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      {country && <country.Flag className="w-5 h-3.5 object-cover rounded-[2px]" />}
                      <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
                        {country?.name}
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-asean-amber bg-asean-amber/10 px-2.5 py-0.5 rounded-full border border-asean-amber/30">
                      {st.nationalQrStandard}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs font-sans">
                    <div>
                      <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block">Active Cross-Border QR Corridors</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {st.crossBorderRpcCorridors.length > 0 ? (
                          st.crossBorderRpcCorridors.map((target) => (
                            <span key={target} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-[10px] font-bold text-slate-700 dark:text-slate-300">
                              ⇄ {target}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">No active bilateral QR corridor</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                      <span className="text-slate-500">E-Invoicing Standard:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{st.eInvoicingStandard}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">CERT Incident Notification Window:</span>
                      <span className="font-mono font-bold text-asean-blue">{st.certBreachDisclosureHours} Hours</span>
                    </div>
                  </div>
                </div>

                {/* Financial Surveillance Score */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-sans">
                    <span className="text-slate-500 font-semibold">Financial Surveillance &amp; CBDC Risk</span>
                    <span className={`font-mono font-bold ${st.financialSurveillanceScore > 60 ? "text-asean-red" : "text-asean-emerald"}`}>
                      {st.financialSurveillanceScore} / 100
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full ${st.financialSurveillanceScore > 60 ? "bg-asean-red" : "bg-asean-emerald"}`}
                      style={{ width: `${st.financialSurveillanceScore}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
