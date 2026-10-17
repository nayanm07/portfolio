import {
  Bot,
  Briefcase,
  CalendarCheck,
  Clapperboard,
  Home,
  Mic,
  PhoneCall,
  Plane,
  ShoppingBasket,
  Stethoscope,
  Webhook,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Card data for every project, in display order. The `featured` ones also
 * appear on the homepage; /projects shows them all. `id` must match an entry in
 * data/projects.tsx (title + detail page come from there). Every line here is
 * taken from the resume.
 */
export type FeaturedProject = {
  id: string;
  category: string;
  period: string;
  summary: string;
  icon: LucideIcon;
  color: string;
  /** media-area background, [from, to] */
  gradient: [string, string];
  media:
    | { type: "video"; src: string }
    | { type: "cover"; src: string }
    /** animated product UI from components/aw/project-mocks.tsx */
    | { type: "mock"; mock: "interview" | "clinic" | "sicada" };
  tech: string[];
  /** shown in the homepage Featured Projects section */
  featured?: boolean;
};

const SHOTS = "/assets/projects-screenshots";

export const projectCards: FeaturedProject[] = [
  {
    id: "interviewai",
    featured: true,
    category: "AI Voice-Interview SaaS",
    period: "2025 – Present",
    summary:
      "Database-per-tenant voice-interview platform live with 70+ study-abroad agencies and 500+ interviews — STT → LLM evaluation → PDF reports and personal prep guides.",
    icon: Mic,
    color: "#3b82f6",
    gradient: ["#1e3a8a", "#0b1226"],
    media: { type: "mock", mock: "interview" },
    tech: ["NestJS", "FastAPI", "OpenAI", "Pinecone", "BullMQ"],
  },
  {
    id: "cliniccloud",
    featured: true,
    category: "Healthcare SaaS · Founder",
    period: "Launching soon",
    summary:
      "Multi-tenant clinic platform with 27+ modules, ABDM/ABHA health records, a WhatsApp booking agent and Razorpay billing.",
    icon: Stethoscope,
    color: "#06b6d4",
    gradient: ["#0b1a3a", "#050b1a"], // goclinic.online's dark navy
    media: { type: "mock", mock: "clinic" },
    tech: ["NestJS", "PostgreSQL", "Redis", "Next.js", "AWS"],
  },
  {
    id: "b2ccrmarm",
    featured: true,
    category: "CRM Mobile App",
    period: "2025 – Present",
    summary:
      "B2B + B2C CRM whose Kotlin call engine has collected 10,000+ call logs and 8,000+ recordings — Truecaller-style lead overlay and AI-to-human call transfer via LiveKit.",
    icon: PhoneCall,
    color: "#14b8a6",
    gradient: ["#134e4a", "#0b2e2c"],
    media: { type: "video", src: `${SHOTS}/b2ccrmarm/crm.mp4` },
    tech: ["React Native", "Kotlin", "WebSocket", "SQLite"],
  },
  {
    id: "edysorvoice",
    featured: true,
    category: "Public Voice-AI API",
    period: "2025 – Present",
    summary:
      "Public REST API of 62 endpoints in 7 groups that lets partner software run AI voice-calling campaigns — 10+ client companies integrate with it.",
    icon: Webhook,
    color: "#1d74f5",
    gradient: ["#f4f8ff", "#d6e5ff"], // sicada.ai's light blue
    media: { type: "mock", mock: "sicada" },
    tech: ["Node.js", "TypeScript", "OpenAPI", "API-Key Auth"],
  },
  {
    id: "gorec",
    featured: true,
    category: "AI Recruitment App",
    period: "Live on Google Play",
    summary:
      "Conversational AI sourcing over a real-time WebSocket stream, with Deepgram voice-to-job search and one-tap shortlist export.",
    icon: Bot,
    color: "#8b5cf6",
    gradient: ["#4c1d95", "#1a0b33"],
    media: { type: "video", src: `${SHOTS}/gorec/gorec.mp4` },
    tech: ["React Native", "WebSocket", "Deepgram", "RTK Query"],
  },
  {
    id: "myflama",
    featured: true,
    category: "Social App · 100K+ downloads",
    period: "2025",
    summary: "Reels-style short-video feed with smooth playback on mid-range devices, real-time chat and live location tracking.",
    icon: Clapperboard,
    color: "#6366f1",
    gradient: ["#3730a3", "#15123d"],
    media: { type: "video", src: `${SHOTS}/myflama/MyFlama.mp4` },
    tech: ["React Native", "Firebase", "Google Maps", "AdMob"],
  },
  {
    id: "supraa",
    category: "Grocery Delivery App",
    period: "2024 – 2025",
    summary:
      "Quick-commerce checkout with discount/GST calculation, and real-time rider tracking streamed live over Socket.IO.",
    icon: ShoppingBasket,
    color: "#f97316",
    gradient: ["#c2410c", "#431407"],
    media: { type: "video", src: `${SHOTS}/supraa/supraa.mp4` },
    tech: ["React Native", "Node.js", "Socket.IO", "Razorpay"],
  },
  {
    id: "elpico",
    category: "Club Automation App",
    period: "2025",
    summary:
      "Membership, events and real-time slot booking with session-based slot locking, plus Stripe and Coinbase payments.",
    icon: CalendarCheck,
    color: "#eab308",
    gradient: ["#3f3410", "#0f0d05"],
    media: { type: "video", src: `${SHOTS}/elpico/elpico.mp4` },
    tech: ["React Native", "Node.js", "Stripe", "Coinbase"],
  },
  {
    id: "bigValue",
    category: "Travel Booking App",
    period: "2024 – 2025",
    summary:
      "One-way, round-trip and multi-city flight booking on the Thomalex & Riya APIs, with PayPal and Razorpay payments.",
    icon: Plane,
    color: "#ef4444",
    gradient: ["#7f1d1d", "#1f0707"],
    media: { type: "video", src: `${SHOTS}/bigvalue/bigValue.mp4` },
    tech: ["React Native", "Node.js", "PayPal", "Razorpay"],
  },
  {
    id: "brpl-bypl",
    category: "Govt Utility Apps · 1M+ downloads",
    period: "2024 – 2025",
    summary:
      "Maintained two of Delhi's electricity-provider apps (1M+ and 500K+ downloads) — fixes, SDK upgrades and Play Store releases.",
    icon: Zap,
    color: "#38bdf8",
    gradient: ["#0c2a4a", "#050f1c"],
    media: { type: "cover", src: `${SHOTS}/brpl-bypl-cover.svg` },
    tech: ["React Native", "TypeScript", "Firebase"],
  },
  {
    id: "housecaller",
    category: "Home Services · 10K+ downloads",
    period: "2024 – 2025",
    summary: "Customer app for booking verified home-service professionals — service discovery, scheduling and booking tracking.",
    icon: Home,
    color: "#f43f5e",
    gradient: ["#7c2d3a", "#1f0a10"],
    media: { type: "cover", src: `${SHOTS}/housecaller-cover.svg` },
    tech: ["React Native", "TypeScript", "Redux"],
  },
  {
    id: "peclick",
    category: "Agency Management App",
    period: "2024 – 2025",
    summary: "Maintained a production agency-management app — ongoing fixes, compatibility updates and store releases.",
    icon: Briefcase,
    color: "#0ea5e9",
    gradient: ["#0c4a6e", "#04161f"],
    media: { type: "video", src: `${SHOTS}/peclicke/peclicke.mp4` },
    tech: ["React Native", "Redux", "Firebase"],
  },
];

export const featuredProjects = projectCards.filter((p) => p.featured);
