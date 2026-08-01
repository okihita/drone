import Header from "@/components/Header";
import DEFASubNav from "@/components/defa/DEFASubNav";
import Footer from "@/components/Footer";
import PageShell from "@/components/layout/PageShell";

export default function DEFALayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <Header />
      <DEFASubNav />
      {children}
      <Footer />
    </PageShell>
  );
}
