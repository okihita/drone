import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageShell from "@/components/layout/PageShell";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell className="dark:dossier-noise">
      <Header />
      {children}
      <Footer />
    </PageShell>
  );
}
