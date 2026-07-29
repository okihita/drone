import { getNegotiationMilestones, getNegotiationsByFramework } from "@/lib/negotiationData";
import type { NegotiationMilestone } from "@/types/negotiation";

export function fetchNegotiations(framework?: string): NegotiationMilestone[] {
  return getNegotiationMilestones(framework);
}

export function fetchNegotiationsGrouped() {
  return getNegotiationsByFramework();
}
