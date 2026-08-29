import Header from "@/components/layout/Header";
import DEFASubNav from "@/components/defa/DEFASubNav";
import Footer from "@/components/layout/Footer";
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
