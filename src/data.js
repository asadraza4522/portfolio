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

// `hue` drives each card's background. `shot` = phone screenshot in src/assets/projects, `logo` = square brand tile.
export const projects = [
  {
    name: "One Line",
    kind: "Puzzle game · Sukoon Labs",
    year: "2026",
    text: "A single-stroke puzzle game: trace every line of a shape without lifting a finger. 1000+ puzzles, daily streaks, Google Play Games achievements, and a brute-force solver test proving every level is solvable.",
    tags: ["React Native", "SVG", "TypeScript"],
    link: "https://play.google.com/store/apps/details?id=com.sukoonlabs.onelinedraw",
    store: "Google Play",
    shot: "onelinedraw",
    hue: 200,
  },
  {
    name: "Elemental Fluffs",
    kind: "Physics merge puzzle",
    year: "2026",
    text: "Drop Fire, Leaf and Water fluffs into a glass jar: matches merge into bigger fluffs and mixed elements fuse into hybrids like Steam, Mud and Ember. Combos, daily rewards, missions and leaderboards.",
    tags: ["Expo", "Skia", "Matter.js", "Firebase"],
    store: "iOS · Android",
    shot: "ellementalfluffs",
    hue: 320,
  },
  {
    name: "LullaBook",
    kind: "AI story books for kids",
    year: "2025",
    text: "Children pick a story type, a moral and a setting, and LullaBook generates an illustrated bedtime story book they can save and replay.",
    tags: ["React Native", "Generative AI", "Illustration"],
    store: "Mobile app",
    shot: "lullabook",
    hue: 250,
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
    name: "Earnify",
    kind: "Web3 rewards",
    year: "2025",
    text: "A rewards app with WalletConnect wallet sign-in, an earnings dashboard and a React admin panel for managing campaigns and payouts.",
    tags: ["React Native", "WalletConnect v2", "Web3"],
    store: "Mobile + admin",
    logo: "earnify",
    hue: 170,
  },
  {
    name: "Nilqx",
    kind: "Short-video platform",
    year: "2025",
    text: "A shorts feed with creator categories, plus an in-app camera to record, preview and publish videos with live upload progress.",
    tags: ["React Native", "Camera", "Video"],
    store: "Mobile app",
    shot: "nilqx",
    hue: 235,
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
    name: "Normie",
    kind: "Social networking · DevGate",
    year: "2024",
    text: "A social app built around daily mood check-ins, appointments and a live map of places around you, shipped on iOS and Android.",
    tags: ["React Native", "Maps", "Social"],
    store: "iOS · Android",
    shot: "normie",
    hue: 20,
  },
  {
    name: "Max Earner",
    kind: "Watch-and-earn",
    year: "2025",
    text: "Daily tasks, sponsored videos and friend invites that pay out small rewards, with a progress tracker for today’s earnings.",
    tags: ["Expo", "Firebase", "Rewards"],
    store: "Mobile app",
    shot: "maxearner",
    hue: 40,
  },
  {
    name: "Daftar Pro",
    kind: "Company management",
    year: "2024–25",
    text: "Web + mobile system automating user management and attendance tracking, improving operational efficiency by 40%.",
    tags: ["React", "Node.js", "MongoDB"],
    store: "Internal",
    shot: "daftarpro",
    hue: 15,
  },
  {
    name: "Scratch Paper",
    kind: "Online learning",
    year: "2025",
    text: "Courses and lectures by subject, with an interactive maths reader, a table of contents and annotations on every page.",
    tags: ["React Native", "EdTech", "REST"],
    store: "Mobile app",
    shot: "scratchpaper",
    hue: 140,
  },
];

export const moreWork = [
  { name: "Tendeal", kind: "Qatar marketplace & tenders", stack: "React · React Native", link: "https://play.google.com/store/apps/details?id=com.tendeal.app" },
  { name: "LovFresh", kind: "Local fruit shop app", stack: "React Native", link: "https://play.google.com/store/apps/details?id=com.lovfreshuser" },
  { name: "Al Kuwaiti Al Awal", kind: "Bilingual shopping app · Kuwait", stack: "React Native" },
  { name: "ESmartBuy", kind: "Bilingual fashion store", stack: "React Native" },
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
