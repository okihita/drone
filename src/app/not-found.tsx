import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileQuestion, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans transition-colors">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20">
        <div className="text-center max-w-lg">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-asean-yellow/10 dark:bg-asean-yellow/10 mb-8">
            <FileQuestion className="w-10 h-10 text-asean-yellow" />
          </div>

          {/* 404 heading */}
          <span className="block text-xs font-bold uppercase tracking-[0.2em] text-asean-yellow mb-4">
            Error 404
          </span>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            Page Not Found
          </h1>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
            It may have been archived, renamed, or the URL may be incorrect.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              Return Home
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/investigations"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              Browse Investigations
            </Link>
          </div>

          {/* Secondary links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 dark:text-slate-500">
            <Link href="/ledger" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Policy Ledger
            </Link>
            <Link href="/observatory" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Observatory
            </Link>
            <Link href="/defa/chapters" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              DEFA
            </Link>
            <Link href="/d2d/benchmark" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Digital 2 Dozen
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
