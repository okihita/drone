"use client";

import React from "react";
import { getDefaPaymentStates } from "@/services/defa";
import { ASEAN_MEMBER_STATES } from "@/lib/countries";
import { riskTone, toneTextClass, toneBarClass } from "@/lib/colors";
import HeroBanner from "@/components/layout/HeroBanner";

export default function PaymentsCyberView() {
  const paymentStates = getDefaPaymentStates();
  const activeCorridorSet = new Set<string>();
  paymentStates.forEach((st) =>
    st.crossBorderRpcCorridors.forEach((target) => {
      activeCorridorSet.add([st.countryCode, target].sort().join("-"));
    }),
  );
  const activeCorridorCount = activeCorridorSet.size;

  return (
    <>
      <HeroBanner
        title="Payments & Cyber Defense"
        description={
          <>
            Financial connectivity and digital resilience form the operational spine of ASEAN DEFA. This dashboard monitors the integration of the <strong className="text-slate-800 dark:text-slate-200">ASEAN Regional Payment Connectivity (RPC)</strong> framework—linking national QR payment systems (QRIS, DuitNow, PayNow, PromptPay) across borders—alongside national CERT cybersecurity incident notification windows and financial data surveillance risks.
          </>
        }
        rightSlot={
          <div className="shrink-0 p-6 sm:p-7 rounded-2xl bg-slate-100/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-800/80 shadow-xs text-sm font-sans space-y-3 min-w-[260px]">
            <span className="block font-sans text-sm text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">RPC Payment Connectivity</span>
            <div className="font-bold text-slate-900 dark:text-white text-base">Cross-Border QR Interoperability</div>
            <div className="pt-2 border-t border-slate-200/70 dark:border-slate-700/80">
              <span className="text-asean-emerald font-bold text-base">{activeCorridorCount} Active Corridors</span>
            </div>
          </div>
        }
        concepts={[
          { title: "National QR Rails", desc: "Standardized instant payment systems enabling instant cross-border consumer purchases." },
          { title: "Bilateral Corridors", desc: "Operational bilateral QR linkages facilitating real-time currency exchange without USD." },
          { title: "E-Invoicing Standards", desc: "Adoption of Peppol and e-tax invoicing frameworks for cross-border customs." },
          { title: "CERT Disclosure Window", desc: "Statutory time limit (in hours) for companies to report major cyber breaches." },
          { title: "Surveillance & CBDC Risk", desc: "Evaluating state transaction monitoring and consumer financial privacy protections." },
        ]}
        howToRead={
          <>
            Each country card displays active QR payment linkages and cybersecurity reporting limits. <span className="text-asean-blue font-bold">Shorter CERT breach notification windows (24h)</span> demand rapid incident response; <span className="text-asean-emerald font-bold">Lower surveillance risk scores (&lt;40)</span> indicate strong consumer transaction privacy.
          </>
        }
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 font-sans space-y-10 sm:space-y-12 w-full">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-slate-900 dark:text-white">
            National Payment Corridors &amp; Cyber Telemetry
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Evaluations of multilateral QR payment connectivity, statutory incident response mandates, and financial data surveillance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {paymentStates.map((st) => {
            const country = ASEAN_MEMBER_STATES.find((m) => m.code === st.countryCode);

            return (
              <div
                key={st.countryCode}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 dark:border-slate-800/80 pb-3.5">
                    <div className="flex items-center gap-2.5">
                      {country && <country.Flag className="w-5 h-3.5 object-cover rounded-[2px] shadow-xs shrink-0" />}
                      <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
                        {country?.name}
                      </h3>
                    </div>
                    <span className="font-sans text-sm font-bold text-asean-amber bg-asean-amber/10 px-2.5 py-1 rounded-full border border-asean-amber/30">
                      {st.nationalQrStandard}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm font-sans">
                    <div>
                      <span className="font-sans text-sm text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block mb-1">
                        Active Cross-Border QR Corridors
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {st.crossBorderRpcCorridors.length > 0 ? (
                          st.crossBorderRpcCorridors.map((target) => (
                            <span key={target} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 font-sans text-sm font-bold text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/80">
                              ⇄ {target}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-400 dark:text-slate-500 italic">No active bilateral QR corridor</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/70 dark:border-slate-800/80 text-sm">
                      <span className="text-slate-600 dark:text-slate-400">E-Invoicing Standard:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{st.eInvoicingStandard}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">CERT Breach Notification:</span>
                      <span className="font-sans font-bold text-asean-blue">{st.certBreachDisclosureHours} Hours</span>
                    </div>
                  </div>
                </div>

                {/* Financial Surveillance Score */}
                <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-sm font-sans">
                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Financial Surveillance &amp; CBDC Risk</span>
                    <span className={`font-sans font-bold ${toneTextClass(riskTone(st.financialSurveillanceScore, 60, 60))}`}>
                      {st.financialSurveillanceScore} / 100
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${toneBarClass(riskTone(st.financialSurveillanceScore, 60, 60))}`}
                      style={{ width: `${st.financialSurveillanceScore}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
