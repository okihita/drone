import Header from "@/components/Header";
import ObservatorySubNav from "@/components/observatory/ObservatorySubNav";

export default function ObservatoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <ObservatorySubNav />
      {children}
    </>
  );
}
