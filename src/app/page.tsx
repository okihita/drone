import { unstable_cache } from "next/cache";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedCarousel from "@/components/landing/FeaturedCarousel";
import EditorialGrid from "@/components/landing/EditorialGrid";
import IntelligenceSuite from "@/components/landing/IntelligenceSuite";
import NewsletterCTA from "@/components/landing/NewsletterCTA";
import { listStories, listDispatches } from "@/services/news";
import { listPolicyRadar } from "@/services/policies";
import { CACHE_TAGS } from "@/lib/cache";

const getCachedHomepageData = unstable_cache(
  async () => {
    const [stories, dispatches, radar] = await Promise.all([
      listStories(),
      listDispatches(),
      listPolicyRadar(),
    ]);
    return { stories, dispatches, radar };
  },
  ["homepage-data"],
  { tags: [CACHE_TAGS.homepage, CACHE_TAGS.stories, CACHE_TAGS.dispatches, CACHE_TAGS.radar], revalidate: 300 },
);

export default async function Home() {
  const { stories, dispatches, radar } = await getCachedHomepageData();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors dark:bg-dossier-noise">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCarousel stories={stories} />
        <EditorialGrid dispatches={dispatches} radar={radar} />
        <IntelligenceSuite />
        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  );
}
