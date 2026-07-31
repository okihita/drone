export interface IPProfile {
  countryCode: string;
  countryName: string;
  tradeSecretScore: number;
  copyrightSafeHarborScore: number;
  patentScore: number;
  aiRiskScore: number;
  compositeScore: number;
  sourceUrl?: string;
}

export const IP_PROFILES: IPProfile[] = [
  { countryCode: "SG", countryName: "Singapore", tradeSecretScore: 85, copyrightSafeHarborScore: 80, patentScore: 90, aiRiskScore: 75, compositeScore: 83, sourceUrl: "https://sso.agc.gov.sg/Act/PA1994" },
  { countryCode: "MY", countryName: "Malaysia", tradeSecretScore: 65, copyrightSafeHarborScore: 55, patentScore: 75, aiRiskScore: 60, compositeScore: 64, sourceUrl: "https://www.myipo.gov.my/" },
  { countryCode: "VN", countryName: "Vietnam", tradeSecretScore: 30, copyrightSafeHarborScore: 35, patentScore: 45, aiRiskScore: 20, compositeScore: 33, sourceUrl: "https://vanban.chinhphu.vn/?pageid=27160&docid=207707" },
  { countryCode: "ID", countryName: "Indonesia", tradeSecretScore: 35, copyrightSafeHarborScore: 40, patentScore: 50, aiRiskScore: 30, compositeScore: 39, sourceUrl: "https://peraturan.bpk.go.id/Details/37578/uu-no-13-tahun-2016" },
  { countryCode: "TH", countryName: "Thailand", tradeSecretScore: 45, copyrightSafeHarborScore: 50, patentScore: 60, aiRiskScore: 40, compositeScore: 49, sourceUrl: "https://www.ipthailand.go.th/" },
  { countryCode: "PH", countryName: "Philippines", tradeSecretScore: 50, copyrightSafeHarborScore: 55, patentScore: 60, aiRiskScore: 45, compositeScore: 53, sourceUrl: "https://www.ipophil.gov.ph/" },
  { countryCode: "MM", countryName: "Myanmar", tradeSecretScore: 5, copyrightSafeHarborScore: 10, patentScore: 15, aiRiskScore: 5, compositeScore: 9, sourceUrl: "https://www.mipd.gov.mm/" },
  { countryCode: "KH", countryName: "Cambodia", tradeSecretScore: 20, copyrightSafeHarborScore: 25, patentScore: 30, aiRiskScore: 15, compositeScore: 23, sourceUrl: "https://www.cambodiaip.gov.kh/" },
  { countryCode: "LA", countryName: "Laos", tradeSecretScore: 20, copyrightSafeHarborScore: 25, patentScore: 30, aiRiskScore: 15, compositeScore: 23, sourceUrl: "https://www.dip.gov.la/" },
  { countryCode: "BN", countryName: "Brunei", tradeSecretScore: 50, copyrightSafeHarborScore: 55, patentScore: 55, aiRiskScore: 45, compositeScore: 51, sourceUrl: "https://www.bruipo.gov.bn/" },
  { countryCode: "TL", countryName: "Timor-Leste", tradeSecretScore: 30, copyrightSafeHarborScore: 35, patentScore: 35, aiRiskScore: 25, compositeScore: 31, sourceUrl: "https://www.mj.gov.tl/" },
];

export function fetchIPProfiles(): IPProfile[] {
  return IP_PROFILES;
}

export function fetchIPProfileByCode(countryCode: string): IPProfile | undefined {
  return IP_PROFILES.find((p) => p.countryCode === countryCode);
}
