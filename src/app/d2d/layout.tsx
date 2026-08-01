import Header from "@/components/Header";
import D2DSubNav from "@/components/benchmark/D2DSubNav";
import Footer from "@/components/Footer";
import PageShell from "@/components/layout/PageShell";

export default function D2DLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <Header />
      <D2DSubNav />
      {children}
      <Footer />
    </PageShell>
  );
}
