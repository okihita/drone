import D2DSubNav from "@/components/benchmark/D2DSubNav";

export default function D2DLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <D2DSubNav />
      {children}
    </>
  );
}
