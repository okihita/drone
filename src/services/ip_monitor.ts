export interface IPProfile {
  countryCode: string;
  countryName: string;
  tradeSecretScore: number;
  copyrightSafeHarborScore: number;
  patentScore: number;
  aiRiskScore: number;
  compositeScore: number;
}

export const IP_PROFILES: IPProfile[] = [
  { countryCode: "SG", countryName: "Singapore", tradeSecretScore: 85, copyrightSafeHarborScore: 80, patentScore: 90, aiRiskScore: 75, compositeScore: 83 },
  { countryCode: "MY", countryName: "Malaysia", tradeSecretScore: 65, copyrightSafeHarborScore: 55, patentScore: 75, aiRiskScore: 60, compositeScore: 64 },
  { countryCode: "VN", countryName: "Vietnam", tradeSecretScore: 30, copyrightSafeHarborScore: 35, patentScore: 45, aiRiskScore: 20, compositeScore: 33 },
  { countryCode: "ID", countryName: "Indonesia", tradeSecretScore: 35, copyrightSafeHarborScore: 40, patentScore: 50, aiRiskScore: 30, compositeScore: 39 },
  { countryCode: "TH", countryName: "Thailand", tradeSecretScore: 45, copyrightSafeHarborScore: 50, patentScore: 60, aiRiskScore: 40, compositeScore: 49 },
  { countryCode: "PH", countryName: "Philippines", tradeSecretScore: 50, copyrightSafeHarborScore: 55, patentScore: 60, aiRiskScore: 45, compositeScore: 53 },
  { countryCode: "MM", countryName: "Myanmar", tradeSecretScore: 5, copyrightSafeHarborScore: 10, patentScore: 15, aiRiskScore: 5, compositeScore: 9 },
  { countryCode: "KH", countryName: "Cambodia", tradeSecretScore: 20, copyrightSafeHarborScore: 25, patentScore: 30, aiRiskScore: 15, compositeScore: 23 },
  { countryCode: "LA", countryName: "Laos", tradeSecretScore: 20, copyrightSafeHarborScore: 25, patentScore: 30, aiRiskScore: 15, compositeScore: 23 },
  { countryCode: "BN", countryName: "Brunei", tradeSecretScore: 50, copyrightSafeHarborScore: 55, patentScore: 55, aiRiskScore: 45, compositeScore: 51 },
  { countryCode: "TL", countryName: "Timor-Leste", tradeSecretScore: 30, copyrightSafeHarborScore: 35, patentScore: 35, aiRiskScore: 25, compositeScore: 31 },
];

export function fetchIPProfiles(): IPProfile[] {
  return IP_PROFILES;
}

export function fetchIPProfileByCode(countryCode: string): IPProfile | undefined {
  return IP_PROFILES.find((p) => p.countryCode === countryCode);
}
