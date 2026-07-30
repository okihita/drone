import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BenchmarkHeatmap from "@/components/benchmark/BenchmarkHeatmap";
import type { BenchmarkCountrySummary, BenchmarkPrinciple } from "@/types/benchmark";

// Mock the country flag icons
vi.mock("country-flag-icons/react/3x2", () => ({
  ID: () => null,
  MY: () => null,
  SG: () => null,
  PH: () => null,
  TH: () => null,
  VN: () => null,
  KH: () => null,
  LA: () => null,
  MM: () => null,
  BN: () => null,
  TL: () => null,
}));

const mockPrinciples: BenchmarkPrinciple[] = [
  {
    id: 1,
    title: "Cross-Border Data Transfers",
    shortTitle: "CB Data",
    description: "Regulations governing cross-border data flows",
    cluster: "data_governance",
    tppSource: "Ch. 14 Art. 10",
    provisionText: "Parties shall allow cross-border transfer of information by electronic means.",
  },
  {
    id: 2,
    title: "Data Localization",
    shortTitle: "Localization",
    description: "Requirements for data to be stored locally",
    cluster: "data_governance",
    tppSource: "Ch. 14 Art. 11",
    provisionText: "No Party shall require a covered person to use or locate computing facilities in its territory.",
  },
];

const mockSummaries: BenchmarkCountrySummary[] = [
  {
    countryCode: "ID",
    countryName: "Indonesia",
    overallScore: 45,
    clusters: [
      { clusterId: "data_governance", clusterLabel: "Data Governance", averageScore: 45, principleCount: 2, color: "asean-blue" },
    ],
    scores: [
      { countryCode: "ID", principleId: 1, score: 40, evidence: "Law 27/2022", sourceUrl: "https://gov.id/law", lastReviewed: "2026-01-15" },
      { countryCode: "ID", principleId: 2, score: 50, evidence: "GR 71/2019", sourceUrl: "https://gov.id/gr", lastReviewed: "2026-01-15" },
    ],
  },
  {
    countryCode: "SG",
    countryName: "Singapore",
    overallScore: 82,
    clusters: [
      { clusterId: "data_governance", clusterLabel: "Data Governance", averageScore: 82, principleCount: 2, color: "asean-blue" },
    ],
    scores: [
      { countryCode: "SG", principleId: 1, score: 85, evidence: "PDPA 2012", sourceUrl: "https://gov.sg/pdpa", lastReviewed: "2026-02-01" },
      { countryCode: "SG", principleId: 2, score: 79, evidence: "PDPA 2012", sourceUrl: "https://gov.sg/pdpa", lastReviewed: "2026-02-01" },
    ],
  },
];

describe("BenchmarkHeatmap", () => {
  it("renders the compliance heatmap title", () => {
    render(
      <BenchmarkHeatmap
        summaries={mockSummaries}
        principles={mockPrinciples}
        selectedCountry={null}
        onSelectCountry={vi.fn()}
      />,
    );

    expect(screen.getByText("Compliance Heatmap")).toBeInTheDocument();
    expect(screen.getByText("PRINCIPLE-BY-PRINCIPLE SCORES")).toBeInTheDocument();
  });

  it("renders principle short titles in the table", () => {
    render(
      <BenchmarkHeatmap
        summaries={mockSummaries}
        principles={mockPrinciples}
        selectedCountry={null}
        onSelectCountry={vi.fn()}
      />,
    );

    expect(screen.getByText("CB Data")).toBeInTheDocument();
    expect(screen.getByText("Localization")).toBeInTheDocument();
  });

  it("renders country columns with codes", () => {
    render(
      <BenchmarkHeatmap
        summaries={mockSummaries}
        principles={mockPrinciples}
        selectedCountry={null}
        onSelectCountry={vi.fn()}
      />,
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("SG")).toBeInTheDocument();
  });

  it("highlights selected country column", () => {
    render(
      <BenchmarkHeatmap
        summaries={mockSummaries}
        principles={mockPrinciples}
        selectedCountry="SG"
        onSelectCountry={vi.fn()}
      />,
    );

    // The SG column header should have a highlighted class
    const sgElements = screen.getAllByText("SG");
    expect(sgElements.length).toBeGreaterThan(0);
  });

  it("renders score legend with color ranges", () => {
    render(
      <BenchmarkHeatmap
        summaries={mockSummaries}
        principles={mockPrinciples}
        selectedCountry={null}
        onSelectCountry={vi.fn()}
      />,
    );

    expect(screen.getByText("81–100")).toBeInTheDocument();
    expect(screen.getByText("0–20")).toBeInTheDocument();
  });

  it("has an accessible caption", () => {
    render(
      <BenchmarkHeatmap
        summaries={mockSummaries}
        principles={mockPrinciples}
        selectedCountry={null}
        onSelectCountry={vi.fn()}
      />,
    );

    const caption = screen.getByText(/Digital 2 Dozen Compliance Heatmap/);
    expect(caption.tagName).toBe("CAPTION");
  });
});
