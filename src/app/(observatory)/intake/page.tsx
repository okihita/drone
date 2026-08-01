"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import { Upload, Send, CheckCircle2 } from "lucide-react";

export default function IntakePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans transition-colors">
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full font-sans">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 text-center font-sans">
          <span className="text-xs font-sans text-asean-yellow font-bold uppercase tracking-wider">
            ENCRYPTED DEFENDER INTAKE PORTAL
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Submit a Policy Alert or Leaked Draft Text
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed font-sans">
            EngageMedia invites regional researchers, activists, and human rights defenders to securely submit draft legislative texts, leak notices, or local policy alerts.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-xl bg-white dark:bg-slate-900 border border-asean-yellow/40 p-8 text-center space-y-4 font-sans">
            <CheckCircle2 className="w-12 h-12 text-asean-yellow mx-auto" />
            <h2 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
              Dossier Received Securely
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto font-sans">
              Your submission has been safely encrypted and routed to EngageMedia’s senior policy editorial team.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 rounded bg-slate-900 dark:bg-slate-800 text-white font-sans text-xs font-semibold"
            >
              Submit Another Dossier
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-none font-sans">
            <div className="space-y-1 font-sans">
              <label className="block text-xs font-sans font-bold uppercase text-slate-700 dark:text-slate-300">
                Document / Alert Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Leaked Draft DEFA Chapter 5 on Data Localization..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-3 py-2 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              <div className="space-y-1 font-sans">
                <label className="block text-xs font-sans font-bold uppercase text-slate-700 dark:text-slate-300">
                  Target Jurisdiction *
                </label>
                <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-3 py-2 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow font-sans">
                  <option value="ASEAN">ASEAN Regional</option>
                  <option value="ID">Indonesia</option>
                  <option value="SG">Singapore</option>
                  <option value="PH">Philippines</option>
                  <option value="TH">Thailand</option>
                  <option value="VN">Vietnam</option>
                  <option value="MY">Malaysia</option>
                  <option value="KH">Cambodia</option>
                  <option value="LA">Laos</option>
                  <option value="MM">Myanmar</option>
                  <option value="BN">Brunei</option>
                  <option value="TL">Timor-Leste</option>
                </select>
              </div>

              <div className="space-y-1 font-sans">
                <label className="block text-xs font-sans font-bold uppercase text-slate-700 dark:text-slate-300">
                  Attribution Preference *
                </label>
                <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-3 py-2 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow font-sans">
                  <option value="anonymous">🔒 Anonymous Defender Protection</option>
                  <option value="cobrand">🤝 Co-Branded Regional Partner</option>
                  <option value="public">🌐 Public Author Credit</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 font-sans">
              <label className="block text-xs font-sans font-bold uppercase text-slate-700 dark:text-slate-300">
                Summary &amp; Human Rights Context *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Explain the policy threat, legislative context, or key clause of concern..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-3 py-2 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow font-sans"
              />
            </div>

            <div className="space-y-1 font-sans">
              <label className="block text-xs font-sans font-bold uppercase text-slate-700 dark:text-slate-300">
                Attach File (PDF, DOCX, Leaked Text)
              </label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-lg p-6 text-center bg-slate-50 dark:bg-slate-900/50">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <span className="text-xs text-slate-500 font-sans">Drag &amp; drop file or click to browse</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded bg-asean-yellow hover:bg-asean-yellow-hover text-slate-950 font-sans font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Encrypted Dossier</span>
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
