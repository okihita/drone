export interface ConsumerProtectionPolicy {
  id: string;
  countryCode: string;
  countryName: string;
  /** Platform liability / intermediary liability law */
  intermediaryLiability: string;
  intermediaryLiabilityScore: number; // 0-100
  /** Algorithmic transparency / audit requirements */
  algorithmicAudit: string;
  algorithmicAuditScore: number;
  /** Data breach notification mandate */
  breachNotification: string;
  breachNotificationScore: number;
  /** Anti-spam / commercial message regulation */
  spamRegulation: string;
  spamRegulationScore: number;
  /** Dark pattern / deceptive design restrictions */
  darkPatternRestriction: string;
  darkPatternScore: number;
  /** Overall consumer protection composite */
  compositeScore: number;
  lastUpdated: string;
}
