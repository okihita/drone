import Header from "@/components/layout/Header";
import GovernanceSubNav from "@/components/governance/GovernanceSubNav";
import Footer from "@/components/layout/Footer";
import PageShell from "@/components/layout/PageShell";

export default function GovernanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <Header />
      <GovernanceSubNav />
      {children}
      <Footer />
    </PageShell>
  );
}
