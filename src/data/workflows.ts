import {
  Bike,
  BookOpen,
  Box,
  Brain,
  Building2,
  Cloud,
  Database,
  FileAudio,
  FileText,
  Fingerprint,
  GitBranch,
  Globe,
  Layers,
  ListChecks,
  Lock,
  MapPin,
  Mic,
  Monitor,
  PackageCheck,
  PanelTop,
  PhoneOutgoing,
  Radio,
  Server,
  Settings2,
  ShoppingBag,
  UploadCloud,
  UserRound,
  Workflow as WorkflowIcon,
  AudioLines,
  type LucideIcon,
} from "lucide-react";

/**
 * Production workflows shown in the "How It Works" section.
 * Every step is taken from the resume — keep them in sync.
 */

export type WorkflowStep = {
  icon: LucideIcon;
  title: string;
  /** short line under the title (tech / where it runs) */
  sub: string;
  /** shown in the detail panel when the step is active */
  detail: string;
  /** small badge on the node, e.g. "×3" for fan-in / fan-out stages */
  badge?: string;
};

export type Workflow = {
  id: string;
  tab: string;
  title: string;
  project: string;
  summary: string;
  color: string;
  icon: LucideIcon;
  tech: string[];
  steps: WorkflowStep[];
};

export const workflows: Workflow[] = [
  {
    id: "multi-tenant",
    tab: "Multi-Tenant SaaS",
    title: "Multi-tenant architecture — one backend, a database per tenant",
    project: "Interview AI · Edysor.ai",
    summary: "Every study-abroad agency gets hard data isolation without a separate deployment.",
    color: "#d4547e",
    icon: Building2,
    tech: ["NestJS", "Prisma", "PostgreSQL", "AsyncLocalStorage", "LRU pool"],
    steps: [
      {
        icon: Building2,
        title: "Tenants",
        sub: "agency-a · agency-b · agency-c",
        badge: "70+",
        detail: "Each study-abroad agency reaches the platform as its own tenant — 70+ agencies, 350+ students and 500+ AI interviews.",
      },
      {
        icon: Fingerprint,
        title: "Tenant guard",
        sub: "AsyncLocalStorage",
        detail: "A tenant-resolution guard identifies the tenant on every request and keeps it in AsyncLocalStorage, so the whole request knows whose data it touches.",
      },
      {
        icon: Server,
        title: "Single backend",
        sub: "one NestJS deployment",
        detail: "One codebase and one deployment serve every tenant — no per-client forks to maintain.",
      },
      {
        icon: Layers,
        title: "Connection pool",
        sub: "LRU · Prisma proxy",
        detail: "A Prisma proxy picks the tenant's database client from an LRU connection pool, opening and evicting connections on demand.",
      },
      {
        icon: Database,
        title: "Database per tenant",
        sub: "db_a · db_b · db_c",
        badge: "×N",
        detail: "Each tenant's data lives in its own PostgreSQL database — isolation enforced at the database level, not just by a WHERE clause.",
      },
      {
        icon: Settings2,
        title: "Auto-provisioning",
        sub: "control-plane DB",
        detail: "When the platform admin creates an agency, a background job creates its database, runs migrations, seeds a super-admin account and saves the database URL in the master database.",
      },
    ],
  },
  {
    id: "voice-interview",
    tab: "AI Voice Interviews",
    title: "AI voice-interview pipeline — from a spoken answer to a personal prep guide",
    project: "Interview AI · Edysor.ai",
    summary: "STT → retrieval over the question bank → LLM evaluation → report, on retryable workers.",
    color: "#63b3ed",
    icon: Mic,
    tech: ["Deepgram", "Whisper", "OpenAI", "pgvector", "Pinecone", "FastAPI", "BullMQ"],
    steps: [
      {
        icon: UserRound,
        title: "Student",
        sub: "attends interview",
        detail: "The student takes an AI voice interview, with live proctoring — screen recording, emotion and eye-contact detection, and photo capture.",
      },
      {
        icon: Mic,
        title: "Recording",
        sub: "interview audio",
        detail: "The interview is recorded and handed to the processing pipeline as a background job.",
      },
      {
        icon: AudioLines,
        title: "Speech → text",
        sub: "Deepgram · Whisper",
        detail: "Speech-to-text converts the recording into a transcript of every question and answer.",
      },
      {
        icon: BookOpen,
        title: "Question-bank KB",
        sub: "pgvector · Pinecone",
        detail: "The transcript is indexed against the agency's question bank and evaluation criteria in a vector knowledge base, with per-tenant namespaces.",
      },
      {
        icon: Brain,
        title: "LLM evaluation",
        sub: "scores each answer",
        detail: "An LLM scores every answer against the retrieved criteria — running on idempotent, retryable BullMQ workers so nothing is lost or double-processed.",
      },
      {
        icon: FileText,
        title: "Report + prep guide",
        sub: "PDF · emailed",
        detail: "A PDF evaluation report is emailed to the student, along with personalised study material and a follow-up interview targeting their weak areas.",
      },
    ],
  },
  {
    id: "ci-cd",
    tab: "CI/CD to AWS",
    title: "CI/CD — every push to main ships to AWS automatically",
    project: "Clinic Cloud · goclinic.online",
    summary: "Dockerized deploys with zero-downtime migrations behind Nginx and HTTPS.",
    color: "#22c55e",
    icon: WorkflowIcon,
    tech: ["GitHub Actions", "Docker", "Docker Compose", "AWS EC2", "Nginx", "Let's Encrypt"],
    steps: [
      {
        icon: GitBranch,
        title: "Push to main",
        sub: "GitHub",
        detail: "A merge to main kicks off the pipeline — no manual deploy steps.",
      },
      {
        icon: WorkflowIcon,
        title: "GitHub Actions",
        sub: "install · build",
        detail: "GitHub Actions installs dependencies and builds the application.",
      },
      {
        icon: Box,
        title: "Docker image",
        sub: "containerised app",
        detail: "The backend is packaged as a Docker image so it runs identically everywhere.",
      },
      {
        icon: Cloud,
        title: "AWS EC2",
        sub: "Docker Compose",
        detail: "The pipeline deploys to an AWS EC2 server running the Docker Compose stack — NestJS, PostgreSQL, Redis and Nginx.",
      },
      {
        icon: Database,
        title: "Migrations",
        sub: "zero-downtime",
        detail: "Prisma migrations are applied without taking the API down.",
      },
      {
        icon: Lock,
        title: "Nginx + HTTPS",
        sub: "Let's Encrypt",
        detail: "Nginx reverse-proxies traffic with Let's Encrypt HTTPS certificates.",
      },
      {
        icon: Globe,
        title: "Live",
        sub: "goclinic.online",
        detail: "The new version is live for every clinic on the platform.",
      },
    ],
  },
  {
    id: "click-to-call",
    tab: "Click-to-Call CRM",
    title: "Click-to-call CRM — from a web click to an analysed recording",
    project: "CRM (B2B & B2C) · Edysor.ai",
    summary: "Web, real-time backend and Kotlin native modules working as one system.",
    color: "#f59e0b",
    icon: PhoneOutgoing,
    tech: ["React Native", "Kotlin", "WebSocket", "Broadcast Receivers", "SQLite", "NestJS"],
    steps: [
      {
        icon: Monitor,
        title: "Click to call",
        sub: "web dashboard",
        detail: "A counsellor clicks call on a lead in the web CRM.",
      },
      {
        icon: Radio,
        title: "Real-time event",
        sub: "WebSocket",
        detail: "The backend pushes a call event to the counsellor's phone over WebSocket.",
      },
      {
        icon: PhoneOutgoing,
        title: "Auto-dial",
        sub: "foreground service",
        detail: "A background foreground service in the React Native app receives the event and places the call through a Kotlin native module.",
      },
      {
        icon: PanelTop,
        title: "Lead overlay",
        sub: "Truecaller-style",
        detail: "A live overlay matches the number to the CRM lead and shows its context and quick actions during the call.",
      },
      {
        icon: ListChecks,
        title: "Call log",
        sub: "Broadcast Receivers",
        detail: "A Kotlin call engine on Android Broadcast Receivers captures every inbound and outbound call — 10,000+ call logs with zero data loss.",
      },
      {
        icon: FileAudio,
        title: "Recording",
        sub: "from device storage",
        detail: "The call's recording file is picked up from device storage.",
      },
      {
        icon: UploadCloud,
        title: "Upload & analyse",
        sub: "offline retry queue",
        detail: "Recordings upload in the background; anything pending or failed waits in SQLite and auto-syncs every hour — 8,000+ recordings collected.",
      },
    ],
  },
  {
    id: "delivery-tracking",
    tab: "Live Delivery Tracking",
    title: "Real-time delivery tracking — the rider's location, live on the customer's map",
    project: "Supraa · WebSenor",
    summary: "Background location streaming on the rider's phone, pushed live over Socket.IO.",
    color: "#a78bfa",
    icon: Bike,
    tech: ["React Native", "Background location", "Node.js", "Socket.IO", "Google Maps"],
    steps: [
      {
        icon: ShoppingBag,
        title: "Order placed",
        sub: "customer app",
        detail: "The customer places an order and opens the order-tracking screen.",
      },
      {
        icon: Bike,
        title: "Rider app",
        sub: "background location",
        detail: "A background activity on the delivery partner's phone keeps streaming GPS location, even while the app is in the background.",
      },
      {
        icon: Server,
        title: "Socket.IO backend",
        sub: "Node.js",
        detail: "The Node.js Socket.IO backend receives each location update for the order.",
      },
      {
        icon: MapPin,
        title: "Live map",
        sub: "customer's order screen",
        detail: "Updates are pushed live to the customer's order screen, moving the rider on the map in real time.",
      },
      {
        icon: PackageCheck,
        title: "Delivered",
        sub: "order complete",
        detail: "Tracking continues until the order is delivered.",
      },
    ],
  },
];
