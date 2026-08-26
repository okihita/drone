"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error-boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center space-y-4 p-8">
        <h2 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
          Something went wrong
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The page could not be loaded. This may be temporary.
        </p>
        {error.digest && (
          <p className="text-sm text-slate-400 dark:text-slate-500 font-mono">
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
