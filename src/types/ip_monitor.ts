interface IPRiskProfile {
  id: string;
  countryCode: string;
  countryName: string;
  tradeSecretProtection: string;
  tradeSecretScore: number; // 0-100
  copyrightSafeHarbor: string;
  copyrightSafeHarborScore: number;
  patentDisclosureRisk: string;
  patentDisclosureScore: number;
  aiTrainingDataRisk: string;
  aiTrainingDataScore: number;
  compositeScore: number;
  lastUpdated: string;
}
