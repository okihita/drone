"use client";

import React from "react";
import { getDefaPaymentStates } from "@/services/defa";
import { ASEAN_MEMBER_STATES } from "@/lib/countries";
import Footer from "@/components/Footer";

export default function DefaPaymentsCyberView() {
  const paymentStates = getDefaPaymentStates();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans">
      {/* Header Banner */}
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-6 sm:py-9 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Payments &amp; Cyber Defense
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl font-sans leading-relaxed">
                Financial connectivity and digital resilience form the operational spine of ASEAN DEFA. This dashboard monitors the integration of the <strong className="text-slate-800 dark:text-slate-200">ASEAN Regional Payment Connectivity (RPC)</strong> framework—linking national QR payment systems (QRIS, DuitNow, PayNow, PromptPay) across borders—alongside national CERT cybersecurity incident notification windows and financial data surveillance risks.
              </p>
            </div>

            {/* Stat Pill */}
            <div className="shrink-0 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-sans space-y-1">
              <span className="block font-sans text-[10px] text-slate-400 uppercase font-bold">RPC Payment Connectivity</span>
              <div className="font-bold text-slate-900 dark:text-white text-sm">Cross-Border QR Interoperability</div>
              <span className="text-asean-emerald font-bold">10 Active Corridors</span>
            </div>
          </div>

          {/* 5 Concept Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2">
            {[
              { title: "National QR Rails", desc: "Standardized instant payment systems enabling instant cross-border consumer purchases." },
              { title: "Bilateral Corridors", desc: "Operational bilateral QR linkages facilitating real-time currency exchange without USD." },
              { title: "E-Invoicing Standards", desc: "Adoption of Peppol and e-tax invoicing frameworks for cross-border customs." },
              { title: "CERT Disclosure Window", desc: "Statutory time limit (in hours) for companies to report major cyber breaches." },
              { title: "Surveillance & CBDC Risk", desc: "Evaluating state transaction monitoring and consumer financial privacy protections." },
            ].map((card) => (
              <div key={card.title} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-400 leading-snug">
                <strong className="block text-slate-800 dark:text-slate-200 font-bold mb-0.5">{card.title}</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-snug">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* How to Read Note */}
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed max-w-4xl pt-1">
            <strong className="text-slate-700 dark:text-slate-300 font-bold">How to read</strong>: Each country card displays active QR payment linkages and cybersecurity reporting limits. <span className="text-asean-blue font-bold">Shorter CERT breach notification windows (24h)</span> demand rapid incident response; <span className="text-asean-emerald font-bold">Lower surveillance risk scores (&lt;40)</span> indicate strong consumer transaction privacy.
          </p>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-8">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
