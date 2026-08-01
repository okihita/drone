import type { ComponentType } from "react";
import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";

export type FlagIcon = ComponentType<{ className?: string }>;

export const FLAG_COMPONENTS: Record<string, FlagIcon> = {
  ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL,
};
