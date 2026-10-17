/**
 * Content for the project detail pages (/projects/[id]), keyed by project id.
 * Every line comes from the resume or the project write-ups in data/projects.tsx.
 */

export type Platform = "android" | "ios" | "web" | "api";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "web" | "playstore" | "appstore" | "apk";
};

export type ProjectDetail = {
  type: string;
  platforms: Platform[];
  released: string;
  role: string;
  overview: string;
  features: string[];
  stats: { value: string; label: string; highlight?: boolean }[];
  /** extra links not stored in data/projects.tsx (store links are read from there) */
  links?: ProjectLink[];
};

export const projectDetails: Record<string, ProjectDetail> = {
  interviewai: {
    type: "AI Voice-Interview SaaS",
    platforms: ["web", "api"],
    released: "Oct 2025 – Present",
    role: "Full-Stack Engineer",
    overview:
      "Interview AI is a multi-tenant SaaS for study-abroad agencies. Each agency onboards its students, who practise AI-powered voice mock interviews — onboarding, document verification, the interview itself, AI evaluation and reporting. Each agency runs in its own database, registered in a master (control-plane) database, and every heavy step runs on retryable background workers.",
    features: [
      "Database-per-tenant architecture with AsyncLocalStorage tenant resolution and an LRU connection pool",
      "Automatic tenant provisioning — creating an agency runs a job that creates its database, runs migrations, seeds a super-admin and registers it in the master database",
      "AI voice interviews: speech-to-text → LLM evaluation → text-to-speech",
      "Every answer scored against the question bank and evaluation criteria",
      "Vector search over the question bank and transcripts (pgvector + Pinecone, per-tenant namespaces)",
      "Azure Document Intelligence OCR for ID verification",
      "FastAPI pipeline that generates follow-up interviews and study material from weak areas",
      "Live proctoring — screen recording, emotion and eye-contact detection, photo capture",
      "WhatsApp AI assistant (LangChain + vector retrieval) that answers queries and books slots",
      "PDF evaluation reports emailed from idempotent, retryable BullMQ workers",
      "React / Next.js admin dashboards, student onboarding and a bulk email-campaign tool",
    ],
    stats: [
      { value: "70+", label: "Agency tenants" },
      { value: "350+", label: "Students onboarded" },
      { value: "500+", label: "AI interviews", highlight: true },
    ],
    links: [{ label: "Live site", href: "https://interviewai.guaranteeadmit.com/", kind: "web" }],
  },

  cliniccloud: {
    type: "Healthcare SaaS · Founder",
    platforms: ["web", "api"],
    released: "2025 – launching soon",
    role: "Founder & Full-Stack Lead",
    overview:
      "Clinic Cloud (goclinic.online) is a multi-tenant healthcare SaaS that I founded and led as full-stack lead of a 3-person founding team (backend, frontend, AI). It is built and deployed, and launching soon. A single NestJS deployment serves any number of clinics — each with isolated staff, doctors, patients, appointments, billing and compliance records — integrated end-to-end with India's ABDM / ABHA national health-record system.",
    features: [
      "Header-based multi-tenant isolation from a single NestJS deployment",
      "JWT + OTP auth, fine-grained RBAC and subscription-feature gating",
      "ABDM / ABHA — HIP bridge, ABHA patient creation, scan-and-share consent and QR generation",
      "Real-time appointment booking with token-based slots and holiday / leave validation",
      "Multi-language WhatsApp Cloud API bot for bookings, reminders, payment links and QR check-in",
      "FastAPI WhatsApp NLP agent that books appointments from text and voice messages",
      "Razorpay subscription billing with webhooks and automated invoice PDFs on S3",
      "Prisma layer of 80+ models and 39+ migrations with Redis caching",
      "React / Next.js app for staff and admins — appointments, records, billing and analytics",
      "Dockerized CI/CD to AWS EC2 via GitHub Actions, with Nginx and Let's Encrypt HTTPS",
    ],
    stats: [
      { value: "27+", label: "Feature modules" },
      { value: "80+", label: "Prisma models" },
      { value: "39+", label: "Migrations" },
      { value: "Soon", label: "Launching", highlight: true },
    ],
    links: [{ label: "goclinic.online", href: "https://www.goclinic.online/", kind: "web" }],
  },

  b2ccrmarm: {
    type: "CRM Mobile App",
    platforms: ["android", "ios"],
    released: "Oct 2025 – Present",
    role: "Mobile Engineer",
    overview:
      "This CRM is an Android and iOS app for a study-abroad team, handling both B2B and B2C leads. Counsellors, agents and managers handle leads, follow-ups, applications and student communication in real time — with native call tracking that connects the web dashboard to the counsellor's phone.",
    features: [
      "Kotlin call engine with Android Broadcast Receivers that captures every call log and pulls its call recording",
      "AI-to-human call transfer — a call handled by the AI agent is handed to a team member's app through the LiveKit client",
      "Web-to-mobile click-to-call driven by real-time WebSocket events and a foreground service",
      "Truecaller-style live lead overlay with context and quick actions during calls",
      "Call-recording pipeline with transcripts and NLP sentiment analysis, on an offline retry queue",
      "Offline-first SQLite that keeps pending and failed logs and auto-syncs them every hour",
      "Device health report — app version, OS, SIM, storage, permissions and recording folder — to debug phones remotely",
      "Real-time team switching that invalidates team-scoped caches and re-subscribes socket services",
      "Follow-up reminders with quick actions — call, complete, snooze",
      "Multi-role access for admins, team leads, counsellors, visa and finance officers",
      "Lead, application and call analytics dashboards",
    ],
    stats: [
      { value: "10,000+", label: "Call logs captured" },
      { value: "8,000+", label: "Recordings collected", highlight: true },
      { value: "1 hr", label: "Auto-sync of pending logs" },
    ],
  },

  edysorvoice: {
    type: "Public Voice-AI API",
    platforms: ["api"],
    released: "Oct 2025 – Present",
    role: "Backend Engineer",
    overview:
      "Sicada AI runs AI voice and WhatsApp agents for sales, support and admissions. I designed and built its public OpenAPI layer — a gateway that lets third-party software run AI voice-calling campaigns programmatically through API keys, securely orchestrating the voice and telephony services behind it.",
    features: [
      "Public REST API of 62 endpoints in 7 groups",
      "API-key issuance, management and per-request authentication",
      "Agents — create, update and place test calls",
      "Campaigns — create, pause, resume, cancel, recipients and statistics",
      "Knowledge bases from raw text, URLs or file uploads, for RAG",
      "Phone numbers, scheduled calls, conversations and transcripts",
      "Provider discovery for TTS, LLM and STT, plus billing and usage",
      "Webhook tools and client tools that agents can call during a conversation",
      "One response envelope (data, error, status, success) with paginated lists",
      "Endpoints built to India's DPDP data-protection requirements",
      "Searchable developer API reference with copy-ready cURL examples",
    ],
    stats: [
      { value: "62", label: "REST endpoints" },
      { value: "7", label: "Endpoint groups" },
      { value: "10+", label: "Client companies", highlight: true },
    ],
    links: [
      { label: "API docs", href: "https://sicada.ai/docs/api-reference", kind: "web" },
      { label: "sicada.ai", href: "https://sicada.ai/", kind: "web" },
    ],
  },

  gorec: {
    type: "AI Recruitment App",
    platforms: ["android"],
    released: "2025",
    role: "Mobile Engineer",
    overview:
      "GORec is a cross-platform React Native (0.85 / React 19) recruitment app that lets recruiters source, screen and shortlist candidates through a conversational AI assistant — including hands-free voice briefs that turn into structured search queries.",
    features: [
      "Real-time conversational AI over a WebSocket stream with auto-reconnect and token auth",
      "Live AI job recommendations and candidate cards",
      "Voice-to-job: Deepgram speech-to-text turns a spoken brief into search criteria",
      "Extracts role, skills, experience, budget, location and notice period",
      "Passwordless phone + OTP login with Android SMS auto-retrieval",
      "Shortlisting with one-tap Excel export of decisions",
      "Redux Toolkit, RTK Query and redux-persist state",
      "Firebase Cloud Messaging + Notifee push notifications",
      "English / Hindi localisation and theming",
    ],
    stats: [
      { value: "0.85", label: "React Native" },
      { value: "2", label: "Languages" },
      { value: "Live", label: "On Google Play", highlight: true },
    ],
  },

  myflama: {
    type: "Social Media App",
    platforms: ["android", "ios"],
    released: "May – Oct 2025",
    role: "React Native Developer",
    overview:
      "MyFlama is a social media app for sharing posts, short videos and comments with friends and family — with a reels-style feed, real-time chat and live location. Built for client MetaStart and live on both app stores.",
    features: [
      "Reels-style short-video feed optimised for smooth playback on mid-range devices",
      "Posts, likes, comments and sharing",
      "Follow / unfollow and user profiles",
      "Real-time chat, including shared posts and videos",
      "Live location tracking with Google Maps",
      "Google sign-in",
      "AdMob ads and Firebase push notifications",
    ],
    stats: [
      { value: "100K+", label: "Downloads", highlight: true },
      { value: "2", label: "App stores" },
    ],
  },

  supraa: {
    type: "Grocery & Food Delivery",
    platforms: ["android", "ios"],
    released: "2024 – 2025",
    role: "React Native + Node.js Developer",
    overview:
      "Supraa is a grocery and food delivery app — customers order from nearby stores and restaurants and follow the delivery to their door. I built the checkout and the real-time delivery tracking end to end, across the React Native app and the Node.js backend.",
    features: [
      "Full checkout with discount and GST calculation",
      "Quick-commerce ordering and geolocation-based listings",
      "Real-time delivery-partner tracking on the customer's order screen",
      "Background activity that keeps streaming the rider's location while the app is backgrounded",
      "Socket.IO backend that pushes the live location to the order screen",
      "Delivery charges calculated from distance",
      "Razorpay payments and Firebase notifications",
    ],
    stats: [
      { value: "2", label: "App stores" },
      { value: "Live", label: "Rider tracking", highlight: true },
    ],
  },

  elpico: {
    type: "Club Automation App",
    platforms: ["android"],
    released: "May – Oct 2025",
    role: "React Native + Node.js Developer",
    overview:
      "EL-Pico Social is a club automation app where members book spaces, event tickets and club services. Built for client MetaStart, with a Node.js backend for real-time slot booking.",
    features: [
      "Members-only login with member ID",
      "Book spaces — conference, meeting and private rooms",
      "Event tickets and club services such as catering and AV",
      "Real-time slot availability with session-based slot locking during checkout",
      "Two members can never book the same slot",
      "Pay by Stripe, Coinbase (crypto) or pay later",
      "Face ID / Touch ID authentication and push notifications",
    ],
    stats: [
      { value: "3", label: "Payment methods" },
      { value: "Live", label: "On Google Play", highlight: true },
    ],
  },

  bigValue: {
    type: "Travel Booking App",
    platforms: ["android"],
    released: "2024 – 2025",
    role: "React Native + Node.js Developer",
    overview:
      "BigValue Travels lets travellers book flights, hotels, car rentals and tour packages. I built the flight-booking backend on the Thomalex and Riya travel APIs and the booking module in React Native.",
    features: [
      "Flight booking — one-way, round-trip and multi-city",
      "Real-time flight search, fares and seat availability via the Thomalex & Riya APIs",
      "Hotel, car-rental and tour-package booking",
      "PayPal, Razorpay and Cashfree payments",
      "Live currency converter — USD, EUR, GBP, INR",
      "English, Spanish and Arabic localisation",
    ],
    stats: [
      { value: "3", label: "Trip types" },
      { value: "3", label: "Languages" },
      { value: "3", label: "Payment gateways", highlight: true },
    ],
  },

  "brpl-bypl": {
    type: "Government Utility Apps",
    platforms: ["android"],
    released: "2024 – 2025",
    role: "React Native Developer",
    overview:
      "BRPL and BYPL are the consumer apps of two of Delhi's electricity providers, used by millions of people. I maintained both — production bug fixes, dependency and SDK upgrades, and Play Store release updates.",
    features: [
      "Production bug fixes for essential consumer flows",
      "Dependency and SDK upgrades to keep the apps stable and secure",
      "Play Store release preparation and update delivery",
      "Two high-reach products maintained in parallel",
    ],
    stats: [
      { value: "1M+", label: "BRPL downloads", highlight: true },
      { value: "500K+", label: "BYPL downloads" },
    ],
  },

  housecaller: {
    type: "Home Services App",
    platforms: ["android", "ios"],
    released: "2024 – 2025",
    role: "React Native Developer",
    overview:
      "Housecaller connects customers with verified home-service professionals. I built the customer app for Android and iOS — service discovery, scheduling and booking tracking.",
    features: [
      "Discovery of verified home-service professionals",
      "Appointment scheduling and booking confirmation",
      "Booking tracking",
      "Customer app for Android and iOS",
    ],
    stats: [
      { value: "10K+", label: "Downloads", highlight: true },
      { value: "2", label: "Platforms" },
    ],
  },

  peclick: {
    type: "Agency Management App",
    platforms: ["android"],
    released: "2024 – 2025",
    role: "React Native Developer",
    overview:
      "Peclick Agency lets agencies manage orders, products, categories, brands, users and reviews from their phone. I maintained the production app — ongoing fixes, compatibility updates and Play Store releases.",
    features: [
      "Dashboard of orders, revenue, products and users",
      "Lists and reports for orders, products, categories and brands",
      "Seller and outlet details",
      "Messages, notifications, reviews and ratings",
      "Ongoing fixes, compatibility updates and store releases",
    ],
    stats: [{ value: "Live", label: "On Google Play", highlight: true }],
  },
};
