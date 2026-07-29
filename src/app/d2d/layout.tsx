import Header from "@/components/Header";
import D2DSubNav from "@/components/benchmark/D2DSubNav";

export default function D2DLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <D2DSubNav />
      {children}
    </>
  );
}
