import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div
      className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans transition-colors"
      aria-busy="true"
      aria-label="Loading page content"
    >
      <Header />
      <main className="flex-1">
        {/* Hero skeleton */}
        <section className="relative border-b border-slate-200 dark:border-slate-800 py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-5 w-full max-w-xl" />
            <Skeleton className="h-5 w-2/3 max-w-lg" />
            <div className="flex gap-3 pt-4">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          </div>
        </section>

        {/* Featured carousel skeleton */}
        <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
          <Skeleton className="h-6 w-40 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benchmark preview skeleton */}
        <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-8">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        </section>

        {/* Editorial grid skeleton */}
        <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800">
          <Skeleton className="h-6 w-36 mb-8" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <Skeleton className="h-16 w-16 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
