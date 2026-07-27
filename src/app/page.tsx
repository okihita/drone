import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopularTopicsBar from "@/components/landing/PopularTopicsBar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedCarousel from "@/components/landing/FeaturedCarousel";
import EditorialGrid from "@/components/landing/EditorialGrid";
import IntelligenceSuite from "@/components/landing/IntelligenceSuite";
import NewsletterCTA from "@/components/landing/NewsletterCTA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-asean-yellow/30 selection:text-slate-900 transition-colors dark:bg-dossier-noise">
      <Header />

      <main className="flex-1">
        <PopularTopicsBar />
        <HeroSection />
        <FeaturedCarousel />
        <EditorialGrid />
        <IntelligenceSuite />
        <NewsletterCTA />
      </main>

      <Footer />
    </div>
  );
}
