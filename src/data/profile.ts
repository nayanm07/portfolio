/**
 * Profile content for the awrs.me-style homepage.
 * Source: Nayan's resume data (BASE) — keep the two in sync.
 */

export const roleTicker = [
  "React / Next.js",
  "Node.js / NestJS",
  "React Native",
  "Kotlin Native Modules",
  "AI / LLM & RAG",
  "AWS",
];

export const traitTicker = [
  "End-to-End Ownership",
  "Multi-Tenant SaaS",
  "Public API Design",
  "Voice AI Pipelines",
  "6 Apps on the Stores",
  "Open to Relocate & Remote",
];

export const aboutIntro = {
  initials: "NM",
  photo: "/assets/nayan-profile.jpg",
  role: "Full-Stack Software Engineer",
  bio: "Full-Stack Software Engineer with 2+ years of experience shipping production products across web, backend, mobile and AI — React / Next.js frontends, Node.js / NestJS REST APIs on PostgreSQL, React Native apps and LLM-powered features, deployed on AWS.",
  location: "Based in Udaipur, India",
  availability: "open to relocation & remote",
};

export const quote = { text: "Real artists ship.", author: "Steve Jobs" };

export type Stat = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  icon: "projects" | "years" | "api" | "skills";
  color: string;
  glow: string;
  /** orbit ring / dot / reverse-dot durations in seconds */
  orbit: [number, number, number];
};

export const stats: Stat[] = [
  // Full-stack framing: products, experience, APIs, breadth of stack
  { value: 10, suffix: "+", label: "Production Projects", icon: "projects", color: "#d4547e", glow: "rgba(212,84,126,0.25)", orbit: [10, 3, 5] },
  { value: 2, suffix: "+", label: "Years of Experience", icon: "years", color: "#63b3ed", glow: "rgba(99,179,237,0.25)", orbit: [12, 3.5, 5.7] },
  { value: 56, suffix: "+", label: "REST API Endpoints", icon: "api", color: "#22c55e", glow: "rgba(34,197,94,0.25)", orbit: [14, 4, 6.4] },
  { value: 55, suffix: "+", label: "Technologies", icon: "skills", color: "#f59e0b", glow: "rgba(245,158,11,0.25)", orbit: [16, 4.5, 7.1] },
];

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
  /** timeline accent */
  color: string;
  /** 24×24 outline icon path (Heroicons) */
  icon: string;
};

const ICON = {
  code: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  server:
    "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  mobile: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  terminal: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
};

export const experience: ExperienceItem[] = [
  {
    period: "Oct 2025 – Present",
    role: "Full-Stack Engineer",
    company: "Edysor.ai",
    description:
      "Built Interview AI, a database-per-tenant voice-interview SaaS live with 70+ study-abroad agencies and 500+ interviews, and Sicada AI's public API of 62 endpoints that 10+ client companies integrate with. On mobile, built a CRM whose Kotlin call engine has collected 10,000+ call logs and 8,000+ recordings, and the GORec AI recruitment app.",
    tech: ["NestJS", "FastAPI", "Next.js", "React Native", "Kotlin", "LLM & RAG"],
    color: "#d4547e",
    icon: ICON.code,
  },
  {
    period: "2025 – Present",
    role: "Founder & Full-Stack Lead",
    company: "Clinic Cloud · goclinic.online",
    description:
      "Founded and led a 3-person team building a multi-tenant healthcare SaaS, launching soon — 27+ feature modules, ABDM/ABHA health records, real-time booking, a WhatsApp NLP booking agent, Razorpay billing and a Next.js staff app on AWS.",
    tech: ["NestJS", "FastAPI", "PostgreSQL", "Redis", "Next.js", "AWS"],
    color: "#3b82f6",
    icon: ICON.server,
  },
  {
    period: "Sep 2024 – Oct 2025",
    role: "React Native + Node.js Developer",
    company: "WebSenor Private Limited",
    description:
      "Built and maintained React Native apps with Node.js backends — MyFlama (100K+ downloads) and EL-Pico for client MetaStart, Supraa's live delivery tracking, BigValue's flight booking, Housecaller, and BRPL & BYPL (1M+ / 500K+ downloads).",
    tech: ["React Native", "Node.js", "Socket.IO", "Firebase", "Payments"],
    color: "#10b981",
    icon: ICON.mobile,
  },
  {
    period: "Jul 2024 – Aug 2024",
    role: "MERN Stack Intern",
    company: "Marvik Academy for Technical Education",
    description:
      "Developed the backend for a Weapon Management System (Indian Army) covering inventory, allocation and reporting.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    color: "#f59e0b",
    icon: ICON.terminal,
  },
];

export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  status: string;
};

export const education: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Rajasthan Technical University, Kota",
    period: "Aug 2024 – May 2026",
    status: "Postgraduate",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Mohanlal Sukhadia University, Udaipur",
    period: "Aug 2021 – Jul 2024",
    status: "Graduate",
  },
];

export const achievements = [
  {
    title: "6 Apps Shipped to the Stores",
    org: "Google Play & App Store — GORec, MyFlama (100K+), EL-Pico, Supraa customer & delivery, Housecaller (10K+); also maintained BRPL (1M+) & BYPL (500K+)",
    date: "2024 — Present",
  },
  {
    title: "Clinic Cloud — Healthcare SaaS",
    org: "Founder & full-stack lead · ABDM/ABHA integrated · launching soon · goclinic.online",
    date: "2025",
  },
  {
    title: "Interview AI in Production",
    org: "70+ study-abroad agencies · 350+ students · 500+ AI interviews",
    date: "2025",
  },
  {
    title: "Public Voice-AI API Gateway",
    org: "Sicada AI — 62 REST endpoints in 7 groups · 10+ client companies integrate with it",
    date: "2025",
  },
];
