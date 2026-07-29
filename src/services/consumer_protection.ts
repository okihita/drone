import { getConsumerProtectionPolicies } from "@/lib/consumerData";
import type { ConsumerProtectionPolicy } from "@/types/consumer_protection";

export function fetchConsumerProtectionPolicies(countryCode?: string): ConsumerProtectionPolicy[] {
  return getConsumerProtectionPolicies(countryCode);
}
