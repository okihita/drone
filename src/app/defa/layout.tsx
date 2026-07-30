import Header from "@/components/Header";
import DEFASubNav from "@/components/defa/DEFASubNav";

export default function DEFALayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <DEFASubNav />
      {children}
    </>
  );
}
