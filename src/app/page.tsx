import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeSections from "@/components/landing/HomeSections";

export const revalidate = 3600; // ISR: regenerate page at most once per hour

export const metadata: Metadata = {
  title: "DRONE — ASEAN Digital Rights Oversight & Network Evaluator",
  description:
    "Independent policy research portal and data observatory tracking digital trade treaties, cross-border data governance, and AI rights across Southeast Asia.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans transition-colors dark:bg-dossier-noise">
      <Header />
      <main className="flex-1">
        <HomeSections />
      </main>
      <Footer />
    </div>
  );
}
