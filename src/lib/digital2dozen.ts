import type { BenchmarkPrinciple } from "@/types/benchmark";

/**
 * All 24 USTR Digital 2 Dozen principles, clustered and cited.
 * Source: USTR "Digital 2 Dozen" — TPP Digital Trade Provisions (April 2016)
 */

export const DIGITAL_2_DOZEN_PRINCIPLES: BenchmarkPrinciple[] = [
  // ═══ Infrastructure & Access (1, 11, 17, 18) ═══

  {
    id: 1,
    shortTitle: "Free & Open Internet",
    title: "Promoting a Free & Open Internet",
    cluster: "infrastructure",
    tppSource: "Ch. 14, Art. 10",
    description: "Consumers can access content and applications of their choice when online.",
    provisionText: "A free and open Internet enables the creation and growth of new, emerging, and game-changing Internet services. TPP affirms that consumers will be able to access content and applications of their choice when online.",
  },
  {
    id: 11,
    shortTitle: "Network Competition",
    title: "Safeguarding Network Competition",
    cluster: "infrastructure",
    tppSource: "Ch. 13, Arts. 7, 8, 11-15",
    description: "Suppliers can build networks in the markets they serve — landing submarine cables or expanding data and voice networks.",
    provisionText: "TPP will enable our suppliers to build networks in the markets they serve — whether landing submarine cables or expanding data and voice networks — to better access consumers and businesses.",
  },
  {
    id: 17,
    shortTitle: "Eliminate ICT Tariffs",
    title: "Eliminating Tariffs on All Manufactured Products",
    cluster: "infrastructure",
    tppSource: "Ch. 2, Art. 20 and Annex 2-D",
    description: "Parties agree to eliminate tariffs on all TPP-manufactured product exports, including ICT products. All parties commit to work to join the WTO ITA.",
    provisionText: "TPP Parties agree to eliminate tariffs on all TPP-manufactured product exports, including information and communication technology (ICT) products. All TPP Parties have committed to work to join the WTO Information Technology Agreement (ITA).",
  },
  {
    id: 18,
    shortTitle: "Faster Customs",
    title: "Ensuring Faster, More Transparent Customs Procedures",
    cluster: "infrastructure",
    tppSource: "Ch. 5, Arts. 3-11; Ch. 14, Art. 9",
    description: "Border processing will be quick, transparent, and predictable. TPP facilitates paperless trading through electronic customs forms.",
    provisionText: "TPP includes strong commitments on customs procedures and trade facilitation (including express shipments) to ensure that border processing will be quick, transparent, and predictable. TPP also will facilitate paperless trading through the use of electronic customs forms.",
  },

  // ═══ Data Governance & Flows (2, 3, 4, 5, 13, 14) ═══

  {
    id: 2,
    shortTitle: "No Digital Duties",
    title: "Prohibiting Digital Customs Duties",
    cluster: "data_governance",
    tppSource: "Ch. 14, Art. 3",
    description: "Complete prohibition on customs duties for digital products — music, video, software, games.",
    provisionText: "TPP includes a complete prohibition on customs duties for digital products. This will ensure that customs duties do not impede the flow of music, video, software, and games.",
  },
  {
    id: 3,
    shortTitle: "Non-Discrimination",
    title: "Securing Basic Non-Discrimination Principles",
    cluster: "data_governance",
    tppSource: "Ch. 14, Art. 4",
    description: "Digital products from TPP countries cannot be put at a competitive disadvantage. Fundamental non-discrimination principles apply to digital products.",
    provisionText: "TPP provides that digital products originating from TPP countries cannot be put at a competitive disadvantage in any Party's market.",
  },
  {
    id: 4,
    shortTitle: "Cross-Border Data",
    title: "Enabling Cross-Border Data Flows",
    cluster: "data_governance",
    tppSource: "Ch. 11, Annex 11-B; Ch. 14, Art. 11",
    description: "Companies and consumers must be able to move data as they see fit. TPP combats discriminatory and protectionist barriers.",
    provisionText: "Companies and consumers must be able to move data as they see fit. TPP combats these discriminatory and protectionist barriers with specific provisions designed to protect the movement of data.",
  },
  {
    id: 5,
    shortTitle: "No Localization",
    title: "Preventing Localization Barriers",
    cluster: "data_governance",
    tppSource: "Ch. 14, Art. 13",
    description: "Companies should not need to build physical infrastructure and expensive data centers in every country they seek to serve.",
    provisionText: "TPP squarely confronts these localization barriers through specific provisions designed to promote access to networks and efficient data processing.",
  },
  {
    id: 13,
    shortTitle: "Adaptable Framework",
    title: "Building an Adaptable Framework for Digital Trade",
    cluster: "data_governance",
    tppSource: "Ch. 9, Art. 11; Ch. 10, Art. 7; Ch. 11, Art. 10",
    description: "New and innovative digital products and services are protected against future discrimination. Protections continue as technology evolves.",
    provisionText: "By design, protections for services and investment continue to apply in TPP as markets change and innovative technologies emerge, unless a specific, negotiated exception applies.",
  },
  {
    id: 14,
    shortTitle: "Digital Services Access",
    title: "Securing Robust Market Access on Investment & Cross-Border Services",
    cluster: "data_governance",
    tppSource: "Ch. 9; Ch. 10",
    description: "U.S. digital service providers can legally offer cloud computing, consulting, marketing, and advertising services in other TPP countries.",
    provisionText: "U.S. digital service providers now will have the certainty of knowing that the services they provide — including cloud computing and services like consulting, marketing, and advertising — can be legally offered in other TPP countries.",
  },

  // ═══ Technology Sovereignty (6, 7, 8, 9, 12) ═══

  {
    id: 6,
    shortTitle: "No Forced Tech Transfer",
    title: "Barring Forced Technology Transfers",
    cluster: "tech_sovereignty",
    tppSource: "Ch. 9, Art. 9",
    description: "Countries should not make market access contingent on forced transfers of technology, production processes, or proprietary information.",
    provisionText: "TPP includes rules prohibiting Parties from requiring companies to transfer their technology, production processes, or other proprietary information to persons in their respective territories.",
  },
  {
    id: 7,
    shortTitle: "Source Code Protection",
    title: "Protecting Critical Source Code",
    cluster: "tech_sovereignty",
    tppSource: "Ch. 14, Art. 17; Ch. 8, Annex 8-B",
    description: "U.S. innovators should not have to hand over source code or proprietary algorithms to competitors or regulators that will pass them to SOEs.",
    provisionText: "TPP ensures that companies do not have to share source code, trade secrets, or substitute local technology into their products and services in order to access new markets.",
  },
  {
    id: 8,
    shortTitle: "Technology Choice",
    title: "Ensuring Technology Choice",
    cluster: "tech_sovereignty",
    tppSource: "Ch. 9, Art. 9; Ch. 13, Art. 23",
    description: "Innovative companies should utilize technology that works best. Companies are not required to purchase local technology instead of technology of their own choosing.",
    provisionText: "TPP includes technology choice provisions to ensure that companies are not required to purchase and utilize local technology, instead of technology of their own choosing.",
  },
  {
    id: 9,
    shortTitle: "Authentication Methods",
    title: "Advancing Innovative Authentication Methods",
    cluster: "tech_sovereignty",
    tppSource: "Ch. 14, Art. 6",
    description: "Diverse electronic signature and authentication methods protect users and transactions. Suppliers can use the methods they think best.",
    provisionText: "The availability of diverse electronic signature and authentication methods protects users and their transactions through mechanisms such as secure online payment systems.",
  },
  {
    id: 12,
    shortTitle: "Encryption Products",
    title: "Fostering Innovative Encryption Products",
    cluster: "tech_sovereignty",
    tppSource: "Ch. 8, Annex 8-B, Sec. A",
    description: "Encryption is an important tool for privacy and security. TPP protects innovation in encryption products to meet consumer and business demand.",
    provisionText: "TPP includes a provision that protects innovation in encryption products to meet consumer and business demand for product features that protect security and privacy.",
  },

  // ═══ Consumer Trust & Security (10, 15, 19, 20) ═══

  {
    id: 10,
    shortTitle: "Consumer Protections",
    title: "Delivering Enforceable Consumer Protections",
    cluster: "consumer_trust",
    tppSource: "Ch. 14, Arts. 7, 8, 14",
    description: "Consumers should be protected when using the Internet. TPP requires Parties to adopt and maintain enforceable consumer protections within their markets.",
    provisionText: "TPP requires Parties to adopt and maintain enforceable protections within their markets so that baseline consumer trust is enhanced.",
  },
  {
    id: 15,
    shortTitle: "Cybersecurity Cooperation",
    title: "Promoting Cooperation on Cybersecurity",
    cluster: "consumer_trust",
    tppSource: "Ch. 14, Art. 16",
    description: "TPP Parties will share information on threats and build cybersecurity capacity to prevent cyber-attacks and stop malware diffusion.",
    provisionText: "TPP Parties will work to share information on threats, as well as help to build cybersecurity capacity to prevent cyber-attacks and stop the diffusion of malware.",
  },
  {
    id: 19,
    shortTitle: "Regulatory Transparency",
    title: "Promoting Transparency & Stakeholder Participation in Regulation",
    cluster: "consumer_trust",
    tppSource: "Ch. 8, Art. 7; Ch. 13, Art. 22; Ch. 25, Arts. 4-6; Ch. 26, Arts. 2-4",
    description: "Strong commitments on transparency, stakeholder participation, coordination, and impact assessment for new regulatory measures and standards.",
    provisionText: "TPP contains strong commitments on transparency, stakeholder participation, coordination, and impact assessment for new regulatory measures, standards, and conformity assessment procedures.",
  },
  {
    id: 20,
    shortTitle: "Fair SOE Competition",
    title: "Ensuring Fair Competition with State-Owned Enterprises",
    cluster: "consumer_trust",
    tppSource: "Ch. 17; Ch. 13, Art. 16",
    description: "First trade agreement with robust commitments ensuring SOEs compete on quality and price, not discriminatory regulation, subsidies, or favoritism.",
    provisionText: "TPP is the first trade agreement to contain robust commitments to ensure that State-owned enterprises compete on the basis of quality and price rather than on the basis of discriminatory regulation, subsidies, or favoritism.",
  },

  // ═══ IP & Standards (16, 21, 22, 23, 24) ═══

  {
    id: 16,
    shortTitle: "Market-Driven Standards",
    title: "Preserving Market-Driven Standardization & Global Interoperability",
    cluster: "ip_standards",
    tppSource: "Ch. 8; Ch. 13, Art. 23",
    description: "Innovators should not have to design products differently for each market. Industry leads the global standards process; the best technologies win.",
    provisionText: "TPP ensures that countries cannot arbitrarily demand that less competitive national standards be forced into innovative American products.",
  },
  {
    id: 21,
    shortTitle: "Copyright Protections",
    title: "Promoting Strong & Balanced Copyright Protections & Enforcement",
    cluster: "ip_standards",
    tppSource: "Ch. 18, Sec. H, Arts. 65-66; Sec. J, Art. 82",
    description: "Copyright protections ensure creators are compensated. TPP includes copyright safe harbor provisions for legitimate ISPs comparable to U.S. law.",
    provisionText: "TPP reflects strong copyright protection and enforcement provisions, including establishing copyright safe harbors for legitimate Internet Service Providers (ISPs) comparable to those in U.S. law.",
  },
  {
    id: 22,
    shortTitle: "Patent Protection",
    title: "Advancing Modern Patent Protection",
    cluster: "ip_standards",
    tppSource: "Ch. 18, Sec. F, Subsec. A",
    description: "TPP reinforces transparent, strong, and balanced patent protections for cutting-edge innovation, including appropriate limitations and exceptions.",
    provisionText: "TPP reinforces the global standard of transparent, strong, and balanced patent protections for cutting edge innovation, including appropriate limitations and exceptions.",
  },
  {
    id: 23,
    shortTitle: "Trade Secret Theft",
    title: "Combatting Trade Secret Theft",
    cluster: "ip_standards",
    tppSource: "Ch. 18, Sec. I, Art. 78",
    description: "TPP addresses corporate espionage and trade secret theft by SOEs. First trade agreement requiring criminal procedures and penalties for trade secret theft including cyber theft.",
    provisionText: "TPP — for the first time in a trade agreement — requires TPP Parties to establish criminal procedures and penalties for trade secret theft, including by means of cyber theft.",
  },
  {
    id: 24,
    shortTitle: "Conformity Assessment",
    title: "Recognizing Conformity Assessment Procedures",
    cluster: "ip_standards",
    tppSource: "Ch. 8, Art. 6",
    description: "Testing and certification performed by a qualified conformity assessment body will be accepted as consistent with another Party's requirements.",
    provisionText: "TPP requires Parties to provide national treatment to one another's conformity assessment bodies, so testing and certification will be mutually accepted.",
  },
];
