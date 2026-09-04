import Header from "@/components/layout/Header";
import AccountabilitySubNav from "@/components/accountability/AccountabilitySubNav";
import Footer from "@/components/layout/Footer";
import PageShell from "@/components/layout/PageShell";

export default function AccountabilityLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <Header />
      <AccountabilitySubNav />
      {children}
      <Footer />
    </PageShell>
  );
}
