import Header from "@/components/layout/Header";
import ObservatorySubNav from "@/components/observatory/ObservatorySubNav";
import Footer from "@/components/layout/Footer";
import PageShell from "@/components/layout/PageShell";

export default function ObservatoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <Header />
      <ObservatorySubNav />
      {children}
      <Footer />
    </PageShell>
  );
}
