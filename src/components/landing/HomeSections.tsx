import { Suspense } from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedCarousel from "@/components/landing/FeaturedCarousel";
import EditorialGrid from "@/components/landing/EditorialGrid";
import BenchmarkPreview from "@/components/landing/BenchmarkPreview";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getHomeLeadStory,
  getHomeStories,
  getHomeDispatches,
  getHomeRadar,
} from "@/lib/homeData";

async function HomeHero() {
  const leadStory = await getHomeLeadStory().catch(() => null);
  return <HeroSection leadStory={leadStory} />;
}

async function HomeCarousel() {
  const stories = await getHomeStories().catch(() => []);
  return <FeaturedCarousel stories={stories} />;
}

async function HomeEditorial() {
  const [dispatches, radar] = await Promise.all([
    getHomeDispatches().catch(() => []),
    getHomeRadar().catch(() => []),
  ]);
  return <EditorialGrid dispatches={dispatches} radar={radar} />;
}

function HeroSkeleton() {
  return (
    <section
      className="relative flex w-full flex-col overflow-hidden border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
      aria-busy="true"
      aria-label="Loading hero content"
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

function CarouselSkeleton() {
  return (
    <section
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800"
      aria-busy="true"
      aria-label="Loading featured stories"
    >
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-[380px] sm:h-[450px] lg:h-[500px]">
          <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-900">
            <Skeleton className="h-full w-full rounded-none" />
          </div>
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-10 w-40 rounded-lg mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialSkeleton() {
  return (
    <section
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800"
      aria-busy="true"
      aria-label="Loading editorial content"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-full max-w-sm" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
        <div className="lg:col-span-4 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-28 w-full rounded-lg" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          ))}
        </div>
        <div className="lg:col-span-3 space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomeSections() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HomeHero />
      </Suspense>
      <Suspense fallback={<CarouselSkeleton />}>
        <HomeCarousel />
      </Suspense>
      <BenchmarkPreview />
      <Suspense fallback={<EditorialSkeleton />}>
        <HomeEditorial />
      </Suspense>
    </>
  );
}
