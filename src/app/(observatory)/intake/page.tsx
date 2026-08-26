"use client";

import React, { useState } from "react";
import { Upload, Send, CheckCircle2, Shield, Lock, FileText, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FIELD_CLASS =
  "bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-sm font-sans focus-visible:ring-asean-red/30 focus-visible:border-asean-red";

export default function IntakePage() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setFileName(e.dataTransfer.files?.[0]?.name ?? null);
  };

  return (
    <main className="flex-1 py-8">
        {/* Main Header Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4 font-sans">
            <span className="text-sm font-sans text-asean-red font-bold uppercase tracking-wider">
              ENCRYPTED DEFENDER INTAKE PORTAL
            </span>
            <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Secure Policy Dossier &amp; Leaked Draft Submission
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-sm mt-1.5 max-w-3xl font-sans leading-relaxed">
              EngageMedia invites regional researchers, activists, and human rights defenders across Southeast Asia to securely submit draft legislative texts, leak notices, or local policy alerts for independent source-verification.
            </p>
          </div>
        </div>

        {/* 4 Concept Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {[
              { icon: Lock, title: "256-Bit PGP Encryption", desc: "Submissions are end-to-end encrypted and stored in air-gapped vaults." },
              { icon: EyeOff, title: "Source Anonymity Protection", desc: "Zero IP logging. Metadata stripped prior to senior editorial review." },
              { icon: FileText, title: "Statutory Cross-Verification", desc: "Ingested documents cross-verified against official parliamentary records." },
              { icon: Shield, title: "Co-Branded Defender Credit", desc: "Option to accredit regional partner organizations or publish anonymously." },
            ].map((card) => (
              <div key={card.title} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-600 dark:text-slate-400 leading-snug">
                <div className="flex items-center gap-1.5 mb-1 text-slate-900 dark:text-white font-bold">
                  <card.icon className="w-3.5 h-3.5 text-asean-red shrink-0" />
                  <span>{card.title}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-snug">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
          {submitted ? (
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-asean-emerald/40 p-8 text-center space-y-4 font-sans shadow-sm">
              <CheckCircle2 className="w-12 h-12 text-asean-emerald mx-auto" />
              <h2 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
                Dossier Received Securely
              </h2>
              <p className="text-sm sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto font-sans leading-relaxed">
                Your submission has been safely encrypted and routed to EngageMedia’s senior policy editorial team for source-verification.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFileName(null); }}
                className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white font-sans text-sm font-semibold hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-asean-yellow transition-colors"
              >
                Submit Another Dossier
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-none font-sans">
              <div className="space-y-1.5 font-sans">
                <label className="block text-sm font-sans font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Document / Alert Title *
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Leaked Draft DEFA Chapter 5 on Data Localization..."
                  className={FIELD_CLASS}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                <div className="space-y-1.5 font-sans">
                  <label className="block text-sm font-sans font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Target Jurisdiction *
                  </label>
                  <Select defaultValue="ASEAN">
                    <SelectTrigger aria-label="Target Jurisdiction" className={`w-full ${FIELD_CLASS}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ASEAN">ASEAN Regional</SelectItem>
                      <SelectItem value="ID">Indonesia</SelectItem>
                      <SelectItem value="SG">Singapore</SelectItem>
                      <SelectItem value="PH">Philippines</SelectItem>
                      <SelectItem value="TH">Thailand</SelectItem>
                      <SelectItem value="VN">Vietnam</SelectItem>
                      <SelectItem value="MY">Malaysia</SelectItem>
                      <SelectItem value="KH">Cambodia</SelectItem>
                      <SelectItem value="LA">Laos</SelectItem>
                      <SelectItem value="MM">Myanmar</SelectItem>
                      <SelectItem value="BN">Brunei</SelectItem>
                      <SelectItem value="TL">Timor-Leste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 font-sans">
                  <label className="block text-sm font-sans font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Attribution Preference *
                  </label>
                  <Select defaultValue="anonymous">
                    <SelectTrigger aria-label="Attribution Preference" className={`w-full ${FIELD_CLASS}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anonymous">Anonymous Defender Protection</SelectItem>
                      <SelectItem value="cobrand">Co-Branded Regional Partner</SelectItem>
                      <SelectItem value="public">Public Author Credit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5 font-sans">
                <label className="block text-sm font-sans font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Summary &amp; Human Rights Context *
                </label>
                <Textarea
                  rows={4}
                  required
                  placeholder="Explain the policy threat, legislative context, or key clause of concern..."
                  className={FIELD_CLASS}
                />
              </div>

              <div className="space-y-1.5 font-sans">
                <label className="block text-sm font-sans font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Attach File (PDF, DOCX, Leaked Text)
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-lg p-6 text-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-asean-red/30 focus-within:border-asean-red/50"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                >
                  <Upload className="w-6 h-6 text-slate-400 mb-2" />
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="sr-only"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                  />
                  {fileName ? (
                    <span className="text-sm text-slate-900 dark:text-white font-bold break-all max-w-full">{fileName}</span>
                  ) : (
                    <span className="text-sm text-slate-500 font-sans">Drag &amp; drop file or click to browse</span>
                  )}
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-asean-red hover:bg-asean-red/90 text-white font-sans font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-xs focus-visible:ring-2 focus-visible:ring-asean-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
              >
                <Send className="w-4 h-4" />
                <span>Submit Encrypted Dossier</span>
              </button>
            </form>
          )}
        </div>
    </main>
  );
}
