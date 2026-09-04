import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

// Mock next/link — renders as a plain <a> with href
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock next/image — renders as a plain <img> with src
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

describe("Footer", () => {
  it("renders the EngageMedia branding", () => {
    render(<Footer />);
    expect(screen.getByAltText("EngageMedia")).toBeInTheDocument();
    expect(screen.getByText(/DRONE — Digital Rights Oversight/)).toBeInTheDocument();
  });

  it("renders Research Modules section with links", () => {
    render(<Footer />);
    expect(screen.getByText("Research Modules")).toBeInTheDocument();
    expect(screen.getByText("Data & AI Governance")).toBeInTheDocument();
    expect(screen.getByText("Platform Accountability")).toBeInTheDocument();
  });

  it("renders EngageMedia Network section with external links", () => {
    render(<Footer />);
    const engageMediaLink = screen.getByText("EngageMedia Official Site");
    expect(engageMediaLink).toBeInTheDocument();
    expect(engageMediaLink.closest("a")).toHaveAttribute("href", "https://engagemedia.org");
  });

  it("displays the current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    // The footer text includes the year
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders the CC license notice", () => {
    render(<Footer />);
    expect(screen.getByText(/CC BY 4\.0/)).toBeInTheDocument();
  });

  it("has correct internal links", () => {
    render(<Footer />);
    const ledgerLink = screen.getByText("Verified Policy Ledger");
    expect(ledgerLink.closest("a")).toHaveAttribute("href", "/ledger");

    const linksLink = screen.getByText("Curated Knowledge Hub");
    expect(linksLink.closest("a")).toHaveAttribute("href", "/links");

    const leaksLink = screen.getByText("Encrypted Leaks Portal");
    expect(leaksLink.closest("a")).toHaveAttribute("href", "/leaks");
  });
});
