import { Suspense } from "react";
import HeroSection from "@/components/landing/HeroSection";
import CoreCapabilities from "@/components/landing/CoreCapabilities";
import MissionCTA from "@/components/landing/MissionCTA";
import { Skeleton } from "@/components/ui/skeleton";
import type { GeoCountryData } from "@/lib/aseanGeo";

function HeroSkeleton() {
  return (
    <section
      className="relative flex w-full flex-col overflow-hidden border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 py-16"
      aria-busy="true"
      aria-label="Loading observatory"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-6 w-40 mx-auto rounded-full" />
          <Skeleton className="h-12 w-full max-w-xl mx-auto" />
          <Skeleton className="h-5 w-3/4 mx-auto" />
        </div>
        <Skeleton className="w-full h-[500px] sm:h-[650px] rounded-3xl" />
      </div>
    </section>
  );
}

export default function HomeSections({
  initialCountries,
}: {
  initialCountries?: GeoCountryData[];
} = {}) {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection initialCountries={initialCountries} />
      </Suspense>
      <CoreCapabilities />
      <MissionCTA />
    </>
  );
}
