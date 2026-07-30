import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";
import type { ElementType } from "react";

export type ASEANCountryCode = "BN" | "KH" | "ID" | "LA" | "MY" | "MM" | "PH" | "SG" | "TH" | "TL" | "VN";

export interface ASEANCountry {
  code: ASEANCountryCode;
  name: string;
  Flag: ElementType;
}

export const ASEAN_MEMBER_STATES: ASEANCountry[] = [
  { code: "SG", name: "Singapore", Flag: SG },
  { code: "MY", name: "Malaysia", Flag: MY },
  { code: "ID", name: "Indonesia", Flag: ID },
  { code: "TH", name: "Thailand", Flag: TH },
  { code: "PH", name: "Philippines", Flag: PH },
  { code: "VN", name: "Vietnam", Flag: VN },
  { code: "BN", name: "Brunei", Flag: BN },
  { code: "KH", name: "Cambodia", Flag: KH },
  { code: "LA", name: "Laos", Flag: LA },
  { code: "MM", name: "Myanmar", Flag: MM },
  { code: "TL", name: "Timor-Leste", Flag: TL },
];
