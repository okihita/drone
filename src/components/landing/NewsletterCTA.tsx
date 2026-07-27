"use client";

import React from "react";
import { NEWSLETTER_CONTENT } from "@/lib/landingContent";

export default function NewsletterCTA() {
  const content = NEWSLETTER_CONTENT;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(content.successMessage);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col md:flex-row items-center justify-between gap-8 font-sans">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-sans uppercase tracking-widest text-asean-yellow font-bold">
            {content.kebab}
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {content.heading}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
            {content.description}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full md:w-auto flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            required
            placeholder={content.placeholder}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-asean-yellow font-sans min-w-[260px]"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-sans text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
          >
            {content.buttonLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
