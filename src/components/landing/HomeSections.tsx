import { Suspense } from "react";
import HeroSection from "@/components/landing/HeroSection";
import CoreCapabilities from "@/components/landing/CoreCapabilities";
import { Skeleton } from "@/components/ui/skeleton";

function HeroSkeleton() {
  return (
    <section
      className="relative flex w-full flex-col overflow-hidden border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
      aria-busy="true"
      aria-label="Loading observatory"
    >
      <div className="px-4 py-6 sm:px-8 lg:px-12 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-6 space-y-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full max-w-md" />
            <Skeleton className="h-4 w-full max-w-lg" />
            <Skeleton className="h-4 w-2/3 max-w-sm" />
            <Skeleton className="h-10 w-44 rounded-lg mt-4" />
          </div>
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/15 dark:bg-slate-950/90 min-h-[380px] sm:min-h-[620px]" />
        </div>
      </div>
    </section>
  );
}

export default function HomeSections() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>
      <CoreCapabilities />
    </>
  );
}
