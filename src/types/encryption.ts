export type EncryptionEventType =
  | "VPN_BAN"
  | "BACKDOOR_MANDATE"
  | "KEY_ESCROW"
  | "INTERCEPT_EXPANSION"
  | "E2EE_RESTRICTION"
  | "CAPACITY_BUILDING";

export interface EncryptionEvent {
  id: string;
  countryCode: string;
  countryName: string;
  eventType: EncryptionEventType;
  title: string;
  summary: string;
  sourceUrl: string;
  eventDate: string; // ISO date
  severityScore: number; // 0-100
}

export const ENCRYPTION_EVENT_LABELS: Record<EncryptionEventType, string> = {
  VPN_BAN: "VPN Ban / Criminalization",
  BACKDOOR_MANDATE: "Encryption Backdoor Mandate",
  KEY_ESCROW: "Key Escrow Requirement",
  INTERCEPT_EXPANSION: "Lawful Intercept Expansion",
  E2EE_RESTRICTION: "End-to-End Encryption Restriction",
  CAPACITY_BUILDING: "Cybersecurity Capacity Building",
};
