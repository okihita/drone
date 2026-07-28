import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopularTopicsBar from "@/components/landing/PopularTopicsBar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedCarousel from "@/components/landing/FeaturedCarousel";
import EditorialGrid from "@/components/landing/EditorialGrid";
import IntelligenceSuite from "@/components/landing/IntelligenceSuite";
import NewsletterCTA from "@/components/landing/NewsletterCTA";
import { createClient } from "@supabase/supabase-js";

async function fetchLandingData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const [stories, dispatches, radar] = await Promise.all([
    supabase.from("news_items").select("id,title,category,read_time,summary,author,image_url").order("published_date", { ascending: false }).limit(3),
    supabase.from("news_items").select("id,title,category,summary,image_url").order("published_date", { ascending: false }).limit(2),
    supabase.from("policies").select("id,jurisdiction,title,threat_level,date").order("date", { ascending: false }).limit(3),
  ]);

  return {
    stories: stories.data ?? [],
    dispatches: dispatches.data ?? [],
    radar: radar.data ?? [],
  };
}

export default async function Home() {
  const { stories, dispatches, radar } = await fetchLandingData();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors dark:bg-dossier-noise">
      <Header />
      <main className="flex-1">
        <PopularTopicsBar />
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
