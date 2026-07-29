export type NegotiationFramework = "DEFA" | "CPTPP" | "DEPA" | "IPEF" | "BILATERAL";

export type MilestoneStatus = "COMPLETED" | "IN_PROGRESS" | "UPCOMING" | "DELAYED";

export interface NegotiationMilestone {
  id: string;
  framework: NegotiationFramework;
  title: string;
  description: string;
  milestoneDate: string; // ISO date
  endDate?: string; // for range milestones
  status: MilestoneStatus;
  countries: string[]; // country codes involved
  sourceUrl: string;
}

export const FRAMEWORK_LABELS: Record<NegotiationFramework, string> = {
  DEFA: "ASEAN DEFA",
  CPTPP: "CPTPP",
  DEPA: "DEPA",
  IPEF: "IPEF",
  BILATERAL: "Bilateral DEAs",
};

export const FRAMEWORK_COLORS: Record<NegotiationFramework, string> = {
  DEFA: "bg-asean-blue",
  CPTPP: "bg-asean-red",
  DEPA: "bg-asean-amber",
  IPEF: "bg-asean-emerald",
  BILATERAL: "bg-asean-sky",
};
