import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedCarousel from "@/components/landing/FeaturedCarousel";
import EditorialGrid from "@/components/landing/EditorialGrid";
import BenchmarkPreview from "@/components/landing/BenchmarkPreview";
import type { NewsCardItem, NewsDispatchItem } from "@/types/news";
import type { PolicyRadarEntry } from "@/types/policy";

const SUPABASE_AVAILABLE = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function Home() {
  let stories: NewsCardItem[] = [];
  let dispatches: NewsDispatchItem[] = [];
  let radar: PolicyRadarEntry[] = [];

  if (SUPABASE_AVAILABLE) {
    // Dynamic import: only loads Supabase-dependent modules when env vars are set
    const [{ listStories, listDispatches }, { listPolicyRadar }] = await Promise.all([
      import("@/services/news"),
      import("@/services/policies"),
    ]);

    [stories, dispatches, radar] = await Promise.all([
      listStories(),
      listDispatches(),
      listPolicyRadar(),
    ]);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors dark:bg-dossier-noise">
      <Header />
      <main className="flex-1">
        <HeroSection leadStory={stories[0] ?? null} />
        <FeaturedCarousel stories={stories} />
        <BenchmarkPreview />
        <EditorialGrid dispatches={dispatches} radar={radar} />
      </main>
      <Footer />
    </div>
  );
}
