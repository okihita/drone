import Header from "@/components/layout/Header";
import TradeSubNav from "@/components/trade/TradeSubNav";
import Footer from "@/components/layout/Footer";
import PageShell from "@/components/layout/PageShell";

export default function TradeLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <Header />
      <TradeSubNav />
      {children}
      <Footer />
    </PageShell>
  );
}
