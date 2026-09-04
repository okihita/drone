"use client";

import React, { useState } from "react";
import { Upload, Send, CheckCircle2, Shield, Lock, FileText, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FIELD_CLASS =
  "bg-slate-50 dark:bg-slate-950 border-slate-200/70 dark:border-slate-800/80 text-sm font-sans focus-visible:ring-asean-red/30 focus-visible:border-asean-red py-3 rounded-xl";

export default function LeaksPage() {
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
    <main className="flex-1 py-12 sm:py-16 lg:py-20 font-sans space-y-10 sm:space-y-12 lg:space-y-14">
      {/* Main Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200/70 dark:border-slate-800/80 pb-6 sm:pb-8 font-sans space-y-2">
          <span className="text-sm font-sans text-asean-red font-bold uppercase tracking-wider">
            ENCRYPTED LEAKS &amp; DEFENDER INTAKE
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
            Secure Leaks &amp; Policy Dossier Portal
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-3xl font-sans leading-relaxed">
            EngageMedia invites regional researchers, activists, whistleblowers, and human rights defenders across Southeast Asia to securely submit leaked draft legislative texts, policy notices, or proprietary platform documents for independent verification.
          </p>
        </div>
      </div>

      {/* 4 Security Assurance Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {[
            { icon: Lock, title: "256-Bit PGP Encryption", desc: "Submissions are end-to-end encrypted and stored in air-gapped vaults." },
            { icon: EyeOff, title: "Source Anonymity Protection", desc: "Zero IP logging. Metadata stripped prior to senior editorial review." },
            { icon: FileText, title: "Statutory Cross-Verification", desc: "Ingested documents cross-verified against official parliamentary records." },
            { icon: Shield, title: "Co-Branded Defender Credit", desc: "Option to accredit regional partner organizations or publish anonymously." },
          ].map((card) => (
            <div key={card.title} className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 text-sm shadow-xs transition-colors space-y-3">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                <card.icon className="w-5 h-5 text-asean-red shrink-0" />
                <span>{card.title}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        {submitted ? (
          <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-asean-emerald/40 p-10 sm:p-14 text-center space-y-5 font-sans shadow-sm">
            <CheckCircle2 className="w-14 h-14 text-asean-emerald mx-auto" />
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Leak / Dossier Received Securely
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto font-sans leading-relaxed">
              Your submission has been safely encrypted and routed to EngageMedia’s senior policy editorial team for confidential source-verification.
            </p>
            <button
              onClick={() => { setSubmitted(false); setFileName(null); }}
              className="mt-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-sans text-sm font-semibold hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-asean-yellow transition-colors"
            >
              Submit Another Leak
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 p-8 sm:p-10 lg:p-12 space-y-8 shadow-xs dark:shadow-none font-sans">
            <div className="space-y-2 font-sans">
              <label className="block text-sm font-sans font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Document / Leak Title *
              </label>
              <Input
                type="text"
                required
                placeholder="e.g. Leaked Draft DEFA Chapter 5 on Data Localization..."
                className={FIELD_CLASS}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 font-sans">
              <div className="space-y-2 font-sans">
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

              <div className="space-y-2 font-sans">
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

            <div className="space-y-2 font-sans">
              <label className="block text-sm font-sans font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Summary &amp; Human Rights Context *
              </label>
              <Textarea
                rows={4}
                required
                placeholder="Explain the policy threat, legislative context, leaked clauses, or platform algorithmic practice..."
                className={FIELD_CLASS}
              />
            </div>

            <div className="space-y-2 font-sans">
              <label className="block text-sm font-sans font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Attach File (PDF, DOCX, Leaked Text)
              </label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-8 sm:p-10 text-center bg-slate-50/60 dark:bg-slate-950/60 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-asean-red/30 focus-within:border-asean-red/50"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
              >
                <Upload className="w-7 h-7 text-slate-400 mb-2.5" />
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
              className="w-full py-4 rounded-xl bg-asean-red hover:bg-asean-red/90 text-white font-sans font-bold text-base transition-colors flex items-center justify-center gap-2.5 shadow-sm focus-visible:ring-2 focus-visible:ring-asean-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
            >
              <Send className="w-4 h-4" />
              <span>Submit Encrypted Leak</span>
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
