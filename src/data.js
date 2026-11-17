// Single source of truth for all portfolio content (from my_all_resumes/Asad_Raza_SRN.pdf).

export const profile = {
  name: "Asad Raza",
  role: "Senior React Native Engineer",
  location: "Rawalpindi, Pakistan",
  email: "raza0120@gmail.com",
  phone: "+92 316 5784226",
  linkedin: "https://linkedin.com/in/asadraza4522",
  resume: "/Asad_Raza_Resume.pdf",
  summary:
    "Senior React Native developer with 7+ years building and shipping production mobile and web apps across fintech, DeFi and blockchain, health-tech, e-commerce and EdTech. I work in React Native, Expo/EAS and TypeScript, with hands-on Supabase, Zustand, WalletConnect v2 and Solidity, and I ship secure, fast apps through CI/CD, using AI-assisted tools to move quicker without lowering the bar.",
};

export const stats = [
  { value: 7, suffix: "+", label: "Years shipping" },
  { value: 15, suffix: "+", label: "Products launched" },
  { value: 7, suffix: "", label: "Companies" },
  { value: 4, suffix: "", label: "Markets · US UK QA PK" },
];

export const domains = [
  { key: "fintech", title: "Fintech & Web3", text: "Wallet flows, WalletConnect v2, Solidity integrations and money-moving UX that has to be right the first time." },
  { key: "health", title: "Health-tech", text: "React Native health apps for US healthcare clients, typed APIs and reusable components built for compliance." },
  { key: "security", title: "Mobile security", text: "Biometric gating, on-device sealing, App Attest, Play Integrity and mTLS-secured submissions." },
  { key: "commerce", title: "Social commerce", text: "Marketplaces, tenders, chat, rewards and creator payouts at consumer scale." },
  { key: "edtech", title: "EdTech & ops", text: "Attendance automation, parent dashboards and company systems that cut admin work by 40%." },
];

export const experience = [
  {
    company: "Meddela Pvt. Ltd (Fides Technologies)",
    role: "Senior Software Engineer",
    period: "Aug 2026 — Oct 2026",
    location: "Islamabad, PK",
    points: [
      "Built a security-focused evidence-capture module in React Native + TypeScript around an eight-step creation and submission flow.",
      "Biometric authentication gating and on-device sealing of captured content to protect sensitive data.",
      "Supported device attestation with App Attest and Play Integrity, plus mTLS-secured submission to the backend.",
    ],
    tags: ["React Native", "TypeScript", "App Attest", "Play Integrity", "mTLS"],
  },
  {
    company: "Prime DataQ Health",
    role: "Senior React Native Developer",
    period: "Aug 2025 — Jul 2026",
    location: "Islamabad, PK",
    points: [
      "Developed and maintained React Native health applications for US-based healthcare clients on iOS and Android.",
      "Built reusable TypeScript components and typed API integrations to keep features consistent and maintainable.",
      "Code reviews, testing and release preparation with the engineering team.",
    ],
    tags: ["React Native", "TypeScript", "Health-tech", "iOS", "Android"],
  },
  {
    company: "DevGate Consultancy",
    role: "Senior Full Stack Developer",
    period: "Sep 2024 — Jul 2025",
    location: "Rawalpindi, PK",
    points: [
      "Shipped Normie (social networking) and Pencil News (real-time personalised news) on iOS and Android.",
      "Designed Daftar Pro, a React + Node company management system that improved operational efficiency by 40%.",
      "Secure REST APIs, third-party integrations and indexing strategies that cut query latency.",
    ],
    tags: ["React Native", "React", "Node.js", "MongoDB", "CI/CD"],
  },
  {
    company: "React Global",
    role: "React Native Developer",
    period: "Jul 2022 — Apr 2024",
    location: "Doha, QA",
    points: [
      "Built REACT, a social-commerce app combining content sharing, chat, shopping and cash rewards.",
      "Researched platform-specific features to guide the team on iPhone and Android-tailored builds.",
      "Database testing, bug fixing and data-integration scripts across the app.",
    ],
    tags: ["React Native", "Social", "E-commerce", "Chat"],
  },
  {
    company: "Qatar Navigator Technology & Solutions",
    role: "React Native Developer",
    period: "Jul 2021 — Jul 2022",
    location: "Doha, QA",
    points: [
      "Built Pokfit, a fitness app with a social platform, user challenges and level-based goals.",
      "Delivered client React Native apps for iOS and Android and optimised existing ones.",
    ],
    tags: ["React Native", "Fitness", "Performance"],
  },
  {
    company: "14M Tech",
    role: "React Native Developer",
    period: "Mar 2019 — Jul 2021",
    location: "Islamabad, PK",
    points: [
      "Built RCH Portal, a UK real-estate app for browsing properties, booking viewings and signing contracts.",
      "Developed E-Maddaras for Faisal Mosque, automating attendance and daily progress updates for parents.",
    ],
    tags: ["React Native", "Real estate", "EdTech"],
  },
  {
    company: "Mighty Coders",
    role: "Android Developer",
    period: "Mar 2018 — May 2019",
    location: "Rawalpindi, PK",
    points: [
      "Developed Paxi Riders (Pets Taxi) for booking vet appointments and pet rides.",
      "Live location tracking and live video streaming from cabs, in Kotlin and Java.",
    ],
    tags: ["Kotlin", "Java", "Android", "Maps"],
  },
];

// `hue` drives each card's generated artwork.
export const projects = [
  {
    name: "One Line",
    kind: "Puzzle game · Personal",
    year: "2026",
    text: "A single-stroke puzzle game: trace every line of a shape without lifting a finger. Touch drawing with PanResponder + react-native-svg, undo, reset, and a brute-force solver test proving every level is solvable.",
    tags: ["React Native", "SVG", "TypeScript"],
    link: "https://play.google.com/store/apps/details?id=com.sukoonlabs.onelinedraw",
    store: "Google Play",
    hue: 22,
  },
  {
    name: "REACT",
    kind: "Social reactive commerce",
    year: "2022–24",
    text: "Content sharing, community, chat and shopping in one app — users earn “Flippers” for every minute and action and redeem them as cash.",
    tags: ["React Native", "Chat", "Rewards"],
    link: "https://apps.apple.com/ee/app/react-global/id6445937406",
    store: "App Store",
    image: "react",
    hue: 28,
  },
  {
    name: "Secure Capture",
    kind: "Evidence capture · Meddela",
    year: "2026",
    text: "An eight-step evidence creation and submission flow with biometric gating, on-device sealing, device attestation and mTLS-secured uploads.",
    tags: ["App Attest", "Play Integrity", "mTLS"],
    store: "Private · NDA",
    hue: 160,
  },
  {
    name: "Tendeal",
    kind: "Marketplace & tenders · Qatar",
    year: "2021–22",
    text: "Qatar’s online marketplace across electronics, fashion, autos and home — with request-for-quotation, tender publishing, flash and private deals.",
    tags: ["React", "React Native", "RFQ"],
    link: "https://play.google.com/store/apps/details?id=com.tendeal.app",
    store: "Google Play",
    hue: 210,
  },
  {
    name: "Daftar Pro",
    kind: "Company management",
    year: "2024–25",
    text: "Web + mobile system automating user management and attendance tracking, improving operational efficiency by 40%.",
    tags: ["React", "Node.js", "MongoDB"],
    store: "Internal",
    hue: 265,
  },
  {
    name: "LovFresh",
    kind: "Local fruit shop app",
    year: "2019–20",
    text: "Connects customers to local fruit shops: daily specials, exclusive offers, buy-and-pickup or delivery, and store price comparison.",
    tags: ["React Native", "React"],
    link: "https://play.google.com/store/apps/details?id=com.lovfreshuser",
    store: "Google Play",
    hue: 120,
  },
];

export const moreWork = [
  { name: "Normie", kind: "Social networking", stack: "React Native" },
  { name: "Pencil News", kind: "Real-time news", stack: "React Native" },
  { name: "Pokfit", kind: "Fitness + social challenges", stack: "React Native" },
  { name: "RCH Portal", kind: "UK real estate", stack: "React Native" },
  { name: "E-Maddaras", kind: "EdTech for Faisal Mosque", stack: "Kotlin · Firebase" },
  { name: "Paxi Riders", kind: "Pet taxi + vet booking", stack: "Kotlin · Java", link: "https://ridepaxi.com/" },
  { name: "DoneDeal", kind: "Vehicle classifieds", stack: "Kotlin · Swift" },
  { name: "ARS", kind: "Restaurant table ordering", stack: "Kotlin" },
  { name: "GreenBot", kind: "Document control", stack: "Kotlin" },
];

export const skills = [
  { group: "Mobile", items: ["React Native", "Expo", "EAS Build", "NativeWind", "Reanimated", "Kotlin", "Swift / iOS", "Xcode"] },
  { group: "Web & Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "Zustand", "HTML / CSS"] },
  { group: "Backend & Data", items: ["Node.js", "Express", "Supabase", "Firebase", "MongoDB", "PostgreSQL", "MySQL", "GraphQL", "REST", "MMKV"] },
  { group: "Web3 & Security", items: ["Solidity", "WalletConnect v2", "Biometrics", "App Attest", "Play Integrity", "mTLS"] },
  { group: "DevOps & AI", items: ["Git", "GitHub Actions", "GitLab CI", "Postman", "Jest", "Agile", "OpenAI", "Claude"] },
];

// Icon filenames in src/assets/skills for the marquee.
export const marquee = [
  ["react", "React Native"], ["expo", "Expo"], ["typescript", "TypeScript"], ["next", "Next.js"],
  ["node", "Node.js"], ["firebase", "Firebase"], ["graphql", "GraphQL"], ["redux", "Redux"],
  ["kotlin", "Kotlin"], ["ios", "iOS"], ["android", "Android"], ["mongo", "MongoDB"],
  ["postgresql", "PostgreSQL"], ["stripe", "Stripe"], ["jest", "Jest"], ["tailwind", "Tailwind"],
  ["github", "GitHub"], ["figma", "Figma"], ["app-store", "App Store"], ["google-play", "Google Play"],
];

export const education = [
  { school: "PMAS Arid University", degree: "BSc Computer Science", period: "2016 — 2020", note: "GPA 3.52" },
  { school: "Govt Gordon College", degree: "Intermediate, Computer Science", period: "2014 — 2016" },
];

export const languages = ["English", "Urdu", "German"];
