export interface PlatformLaborProfile {
  id: string;
  name: string;
  parentCompany: string;
  headquarters: string;
  activeCountries: string[];
  estimatedWorkers: string;
  fairworkScore: number; // out of 10
  takeRate: string;
  algorithmicExplainability: "None" | "Poor" | "Limited";
  deactivationAppeal: "Automated Bot Only" | "Ticket Queue (No Human Appeal)" | "Limited Human Review";
  biometricRisk: "High" | "Critical" | "Moderate";
  workerClassification: string;
  keyLaborControversy: string;
  recentUnionActions: string;
  scoreBreakdown: {
    fairPay: number; // out of 2
    fairConditions: number; // out of 2
    fairContracts: number; // out of 2
    fairManagement: number; // out of 2
    fairRepresentation: number; // out of 2
  };
}

export const PLATFORM_PROFILES: PlatformLaborProfile[] = [
  {
    id: "grab",
    name: "Grab",
    parentCompany: "Grab Holdings Inc. (NASDAQ: GRAB)",
    headquarters: "Singapore",
    activeCountries: ["SG", "MY", "ID", "TH", "PH", "VN"],
    estimatedWorkers: "2.8M+ drivers & couriers",
    fairworkScore: 2.5,
    takeRate: "20% – 25% variable",
    algorithmicExplainability: "Poor",
    deactivationAppeal: "Ticket Queue (No Human Appeal)",
    biometricRisk: "High",
    workerClassification: "Independent Contractors (Zero Statutory Benefits)",
    keyLaborControversy: "Opaque dynamic surge pricing where passenger fares spike up to 250% during rain or peak demand, but driver base pay remains flat with platform retaining the spread.",
    recentUnionActions: "Singapore Point-to-Point Transport regulatory debates; multiple rider rallies in Kuala Lumpur demanding statutory fuel allowances and commission fee caps.",
    scoreBreakdown: {
      fairPay: 0.5,
      fairConditions: 0.5,
      fairContracts: 0.5,
      fairManagement: 0.5,
      fairRepresentation: 0.5,
    },
  },
  {
    id: "gojek",
    name: "Gojek",
    parentCompany: "GoTo Gojek Tokopedia Tbk (IDX: GOTO)",
    headquarters: "Jakarta, Indonesia",
    activeCountries: ["ID", "VN"],
    estimatedWorkers: "2.5M+ drivers",
    fairworkScore: 2.8,
    takeRate: "20% standard platform commission",
    algorithmicExplainability: "Poor",
    deactivationAppeal: "Ticket Queue (No Human Appeal)",
    biometricRisk: "High",
    workerClassification: "Mitra Driver (Partner — No Labor Law Protections)",
    keyLaborControversy: "Mandatory algorithmic batching forces drivers to accept non-consensual multi-order routes; rejecting batched orders results in immediate algorithmic de-prioritization (anyep).",
    recentUnionActions: "Nationwide 'Ojol Day Off' strikes organized by GARDA across Jakarta, Surabaya, and Medan protesting unilateral delivery incentive reductions.",
    scoreBreakdown: {
      fairPay: 0.5,
      fairConditions: 1.0,
      fairContracts: 0.5,
      fairManagement: 0.5,
      fairRepresentation: 0.3,
    },
  },
  {
    id: "shopeefood",
    name: "ShopeeFood",
    parentCompany: "Sea Group (NYSE: SE)",
    headquarters: "Singapore",
    activeCountries: ["ID", "MY", "TH", "VN"],
    estimatedWorkers: "800k+ food couriers",
    fairworkScore: 1.5,
    takeRate: "20% merchant cut + variable courier deductions",
    algorithmicExplainability: "None",
    deactivationAppeal: "Automated Bot Only",
    biometricRisk: "Critical",
    workerClassification: "Independent Delivery Partner",
    keyLaborControversy: "Extreme algorithmic delivery time windows calculated without factoring in weather or kitchen delays, leading to courier road accidents and punitive account lockouts.",
    recentUnionActions: "Wildcat driver boycotts across West Java following unilateral cuts to base kilometer delivery incentives during major shopping festivals.",
    scoreBreakdown: {
      fairPay: 0.3,
      fairConditions: 0.4,
      fairContracts: 0.4,
      fairManagement: 0.2,
      fairRepresentation: 0.2,
    },
  },
  {
    id: "foodpanda",
    name: "Foodpanda",
    parentCompany: "Delivery Hero SE (ETR: DHER)",
    headquarters: "Berlin / Regional HQ Singapore",
    activeCountries: ["SG", "MY", "TH", "PH"],
    estimatedWorkers: "500k+ couriers",
    fairworkScore: 3.0,
    takeRate: "Tiered batch scheduling system",
    algorithmicExplainability: "Limited",
    deactivationAppeal: "Ticket Queue (No Human Appeal)",
    biometricRisk: "High",
    workerClassification: "Freelance Courier",
    keyLaborControversy: "Algorithmic Batching (Batch 1 to 5) ranks couriers on acceptance rate and shift compliance; riders with low scores are algorithmically relegated to low-earning night slots.",
    recentUnionActions: "Mass rider protests in the Philippines (Davao and Manila) over arbitrary shift suspensions and algorithmic tip withholding.",
    scoreBreakdown: {
      fairPay: 0.8,
      fairConditions: 0.8,
      fairContracts: 0.6,
      fairManagement: 0.4,
      fairRepresentation: 0.4,
    },
  },
  {
    id: "lalamove",
    name: "Lalamove",
    parentCompany: "Lalatech Holdings Ltd.",
    headquarters: "Hong Kong / Regional Hub Singapore",
    activeCountries: ["SG", "MY", "ID", "TH", "PH", "VN"],
    estimatedWorkers: "450k+ freight couriers",
    fairworkScore: 1.2,
    takeRate: "Variable order bidding deduction (up to 16%)",
    algorithmicExplainability: "None",
    deactivationAppeal: "Automated Bot Only",
    biometricRisk: "Critical",
    workerClassification: "Self-Employed Vehicle Operator",
    keyLaborControversy: "Reverse-bidding mechanics force van and truck drivers to compete in predatory price-slashing races to the bottom, often delivering cargo below actual fuel costs.",
    recentUnionActions: "Freight driver convoys protesting predatory reverse-auction algorithms and mandatory vehicle sticker advertising requirements.",
    scoreBreakdown: {
      fairPay: 0.2,
      fairConditions: 0.3,
      fairContracts: 0.3,
      fairManagement: 0.2,
      fairRepresentation: 0.2,
    },
  },
];

export const DISPATCH_EXPLAINERS = [
  {
    title: "1. The Phantom Surge & Fare Spread",
    subtitle: "Asymmetric Algorithmic Pricing",
    color: "text-asean-red",
    borderColor: "border-asean-red/30",
    bgClass: "bg-asean-red/10",
    description:
      "When rain storms or rush hours hit, passenger fares surge 2x to 3x via dynamic demand algorithms. However, drivers frequently report receiving only the standard flat kilometer base fare plus a negligible incentive. The platform captures the majority of the surge spread as variable take-rate without transparent disclosure.",
  },
  {
    title: "2. Acceptance Throttling & Shadow Bans",
    subtitle: "Punitive Dispatch Deprioritization",
    color: "text-asean-amber",
    borderColor: "border-asean-amber/30",
    bgClass: "bg-asean-amber/10",
    description:
      "While platforms legally claim gig workers are free to decline orders as independent contractors, their dispatch algorithms quietly punish refusals. Couriers who reject unprofitable or hazardous long-distance trips are algorithmically de-prioritized ('akun anyep') for 30 to 90 minutes without notification.",
  },
  {
    title: "3. Biometric Facial Recognition Lockouts",
    subtitle: "Surveillance-Driven Arbitrary Deactivation",
    color: "text-asean-sky",
    borderColor: "border-asean-sky/30",
    bgClass: "bg-asean-sky/10",
    description:
      "Apps demand random on-the-road selfie verifications while drivers are actively operating two-wheelers in traffic. Poor lighting, helmet shadows, rain, or AI facial recognition false-negatives trigger immediate automated account suspension, with no immediate human recourse to prove identity.",
  },
];

export const ADVOCACY_ORGANIZATIONS = [
  {
    name: "GARDA Indonesia",
    focus: "Two-Wheeler Ride-Hailing Collective",
    region: "Indonesia",
    action: "Organizes nationwide Ojol Day Off boycotts and lobbies Kemenhub for statutory driver commission caps.",
  },
  {
    name: "Fairwork Southeast Asia",
    focus: "Academic Gig Economy Audit Consortium",
    region: "Regional (SG, ID, MY, PH, VN)",
    action: "Conducts rigorous annual scorecards evaluating ride-hailing and food delivery platforms on 5 core labor principles.",
  },
  {
    name: "Penghantar Malaysia",
    focus: "P-Hailing Delivery Couriers Association",
    region: "Malaysia",
    action: "Advocates for the Gig Economy Commission Bill and mandatory worker social security (PERKESO) contributions.",
  },
  {
    name: "Kapatiran Riders",
    focus: "Gig Transport Workers Collective",
    region: "Philippines",
    action: "Campaigns against algorithmic fare deductions, predatory boundary systems, and automated platform deactivations.",
  },
];
