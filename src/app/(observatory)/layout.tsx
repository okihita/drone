import Header from "@/components/Header";
import ObservatorySubNav from "@/components/observatory/ObservatorySubNav";
import Footer from "@/components/Footer";
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
