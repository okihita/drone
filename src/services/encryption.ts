import { getEncryptionEvents, getEncryptionSummary } from "@/lib/encryptionData";
import type { EncryptionEvent } from "@/types/encryption";

export function fetchEncryptionEvents(countryCode?: string, eventType?: string): EncryptionEvent[] {
  return getEncryptionEvents(countryCode, eventType);
}

export function fetchEncryptionSummary() {
  return getEncryptionSummary();
}
