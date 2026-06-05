import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import {
  ArrowDownUpIcon,
  ArrowUpRight,
  ExternalLink,
  Link2,
  MoveUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
  SiVite,
  SiNetlify,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiApachemaven,
  SiCplusplus,
  SiArduino,
  SiGoogleplay,
  SiApple,
  SiReact,
  SiRedux,
  SiRazorpay,
  SiGooglemaps,
  SiStripe,
  SiCoinbase,
  SiGoogleadsense,
  SiPaypal,
  SiNestjs,
  SiRedis,
  SiMysql,
  SiFastify,
  SiSwagger,
  SiAmazon,
  SiWhatsapp,
  SiOpenai,
  SiKotlin,
  SiSqlite,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import css from "styled-jsx/css";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({
  live,
  repo,
  playStore,
  appStore,
  apkDownload,
}: {
  live?: string;
  repo?: string;
  playStore?: string;
  appStore?: string;
  apkDownload?: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8 flex-wrap">
      {playStore && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={playStore}
        >
          <Button variant={"default"} size={"sm"}>
            Play Store
            <SiGoogleplay className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {appStore && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={appStore}
        >
          <Button variant={"default"} size={"sm"}>
            App Store
            <SiApple className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {apkDownload && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={apkDownload}
        >
          <Button variant={"default"} size={"sm"}>
            Download APK
            <ArrowDownUpIcon className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
  // +
  vite: {
    title: "Vite",
    bg: "black",
    fg: "white",
    icon: <SiVite />,
  },
  openai: {
    title: "OpenAI",
    bg: "black",
    fg: "white",
    icon: <img src="assets/icons/openai-svgrepo-com_white.svg" alt="OpenAI" />,
  },
  netlify: {
    title: "Netlify",
    bg: "black",
    fg: "white",
    icon: <SiNetlify />,
  },
  html: {
    title: "HTML5",
    bg: "black",
    fg: "white",
    icon: <SiHtml5 />,
  },
  css: {
    title: "CSS3",
    bg: "black",
    fg: "white",
    icon: <SiCss3 />,
  },
  bootstrap: {
    title: "Bootstrap",
    bg: "black",
    fg: "white",
    icon: <SiBootstrap />,
  },
  maven: {
    title: "Maven",
    bg: "black",
    fg: "white",
    icon: <SiApachemaven />,
  },
  java: {
    title: "Java",
    bg: "black",
    fg: "white",
    icon: <img src="assets/icons/icons8-java.svg" alt="Java" />,
  },
  cplusplus: {
    title: "C++",
    bg: "black",
    fg: "white",
    icon: <SiCplusplus />,
  },
  arduino: {
    title: "Arduino",
    bg: "black",
    fg: "white",
    icon: <SiArduino />,
  },
  googleplay: {
    title: "Google Play",
    bg: "black",
    fg: "white",
    icon: <SiGoogleplay />,
  },

  reactNative: {
    title: "React Native",
    bg: "black",
    fg: "white",
    icon: <SiReact />,
  },

  redux: {
    title: "Redux",
    bg: "black",
    fg: "white",
    icon: <SiRedux />,
  },

  razorpay: {
    title: "Razorpay",
    bg: "black",
    fg: "white",
    icon: <SiRazorpay />,
  },

  mapIntegration: {
    title: "Map Integration",
    bg: "black",
    fg: "white",
    icon: <SiGooglemaps />,
  },

  stripe: {
    title: "Stripe",
    bg: "black",
    fg: "white",
    icon: <SiStripe />,
  },
  coinbase: {
    title: "Coinbase",
    bg: "black",
    fg: "white",
    icon: <SiCoinbase />,
  },

  rtk: {
    title: "RTK Query",
    bg: "black",
    fg: "white",
    icon: <SiRedux />,
  },

  ads: {
    title: "Ads Integration",
    bg: "black",
    fg: "white",
    icon: <SiGoogleadsense />,
  },

  paypal: {
    title: "Paypal",
    bg: "black",
    fg: "white",
    icon: <SiPaypal />,
  },

  nestjs: {
    title: "NestJS",
    bg: "black",
    fg: "white",
    icon: <SiNestjs />,
  },
  redis: {
    title: "Redis",
    bg: "black",
    fg: "white",
    icon: <SiRedis />,
  },
  bullmq: {
    title: "BullMQ",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>B</strong>
      </span>
    ),
  },
  mysql: {
    title: "MySQL",
    bg: "black",
    fg: "white",
    icon: <SiMysql />,
  },
  fastify: {
    title: "Fastify",
    bg: "black",
    fg: "white",
    icon: <SiFastify />,
  },
  swagger: {
    title: "Swagger",
    bg: "black",
    fg: "white",
    icon: <SiSwagger />,
  },
  aws: {
    title: "AWS",
    bg: "black",
    fg: "white",
    icon: <SiAmazon />,
  },
  whatsapp: {
    title: "WhatsApp API",
    bg: "black",
    fg: "white",
    icon: <SiWhatsapp />,
  },
  openaiAI: {
    title: "OpenAI",
    bg: "black",
    fg: "white",
    icon: <SiOpenai />,
  },
  kotlin: {
    title: "Kotlin",
    bg: "black",
    fg: "white",
    icon: <SiKotlin />,
  },
  sqlite: {
    title: "SQLite",
    bg: "black",
    fg: "white",
    icon: <SiSqlite />,
  },
};
export type Project = {

  id: string;
  category: string;
  title: string;
  src: string;
  video: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  playStore?: string;
  appStore?: string;
  apkDownload?: string;
  live?: string;
  github?: string;
  intigrationTechnologies?: string[];
};
const projects: Project[] = [
  // +AI Recruitment App
  {
    id: "gorec",
    category: "AI Recruitment App",
    title: "GORec",
    src: "/assets/projects-screenshots/gorec/cover.svg",
    screenshots: [],
    intigrationTechnologies: [
      "Real-time WebSocket streaming (auto-reconnect + token auth)",
      "Deepgram speech-to-text voice-to-job extraction",
      "Phone + OTP auth with Android SMS auto-retrieval",
      "Redux Toolkit + RTK Query + redux-persist state",
      "One-tap Excel export of shortlist decisions",
      "Firebase Cloud Messaging + Notifee push notifications",
    ],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.reactNative,
        PROJECT_SKILLS.redux,
        PROJECT_SKILLS.rtk,
        PROJECT_SKILLS.sockerio,
        PROJECT_SKILLS.firebase,
      ],
      backend: [],
    },
    video: "",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            GORec is a cross-platform React Native (0.85 / React 19) recruitment
            app that lets recruiters source, screen, and shortlist candidates
            through a conversational AI assistant — including hands-free voice
            commands that turn a spoken job brief into a structured search query.
            <br />
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">App Architecture Flow</TypographyH3>
          <p className="font-mono mb-2">
            1. Recruiter logs in with passwordless phone + OTP (Android SMS
            auto-retrieval).
            <br />
            2. Recruiter chats with — or speaks to — an AI assistant describing
            the role.
            <br />
            3. A real-time WebSocket pipeline streams AI job recommendations and
            candidate cards live.
            <br />
            4. Voice briefs are transcribed (Deepgram) and parsed into structured
            criteria (role, skills, experience, budget, location, notice period).
            <br />
            5. Recruiter shortlists candidates and exports decisions to Excel in
            one tap.
            <br />
          </p>

          <TypographyH3 className="my-4 mt-8">
            Intigration Technologies
          </TypographyH3>
          <p className="font-mono mb-2">
            {this.intigrationTechnologies?.map((tech, index) => (
              <p key={index} className="font-mono mb-2">
                {index + 1}. {tech}
              </p>
            ))}
          </p>

          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },

  // +Healthcare SaaS Backend
  {
    id: "cliniccloud",
    category: "Healthcare SaaS Backend",
    title: "Clinic Cloud",
    src: "/assets/projects-screenshots/cliniccloud/cover.svg",
    screenshots: [],
    intigrationTechnologies: [
      "Header-based multi-tenant isolation (x-tenant-id)",
      "ABDM / ABHA national digital health-records integration",
      "Razorpay payments with webhook handling & invoice PDFs",
      "Multi-language WhatsApp bot on BullMQ + Redis queues",
      "Real-time appointment booking via Socket.IO",
      "AWS S3 storage, EC2 deploy, GitHub Actions CI/CD, Nginx + HTTPS",
    ],
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.nestjs,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.prisma,
        PROJECT_SKILLS.redis,
        PROJECT_SKILLS.bullmq,
        PROJECT_SKILLS.sockerio,
        PROJECT_SKILLS.razorpay,
        PROJECT_SKILLS.whatsapp,
        PROJECT_SKILLS.aws,
        PROJECT_SKILLS.docker,
        PROJECT_SKILLS.swagger,
      ],
    },
    video: "",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Clinic Cloud is a production multi-tenant healthcare SaaS backend
            built on NestJS 10. A single deployment serves any number of clinics
            (&quot;tenants&quot;) — each with isolated staff, doctors, patients,
            appointments, billing, and compliance records — across 27+ feature
            modules and an 80+ model Prisma schema.
            <br />
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">Core Capabilities</TypographyH3>
          <p className="font-mono mb-2">
            1. Multi-tenancy &amp; security — middleware-enforced tenant
            isolation, JWT + OTP auth, and fine-grained role/permission RBAC.
            <br />
            2. Appointments — token-based slot allocation, holiday/leave
            validation, and Socket.IO live updates (zero double-bookings in
            production).
            <br />
            3. ABDM / ABHA — patient creation, scan-and-share consent flows, and
            HIP bridge services for regulatory-compliant health records.
            <br />
            4. Billing — Razorpay payment links, webhook handling, and pdfmake
            invoice generation stored on S3.
            <br />
            5. WhatsApp bot — multi-language onboarding, reminders, and payment
            links backed by BullMQ queues on Redis.
            <br />
          </p>

          <TypographyH3 className="my-4 mt-8">
            Intigration Technologies
          </TypographyH3>
          <p className="font-mono mb-2">
            {this.intigrationTechnologies?.map((tech, index) => (
              <p key={index} className="font-mono mb-2">
                {index + 1}. {tech}
              </p>
            ))}
          </p>

          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },

  // +AI Voice-Interview SaaS Backend
  {
    id: "interviewai",
    category: "AI Voice-Interview SaaS Backend",
    title: "Interview AI",
    src: "/assets/projects-screenshots/interviewai/cover.svg",
    screenshots: [],
    intigrationTechnologies: [
      "DB-per-tenant isolation via AsyncLocalStorage + Prisma proxy",
      "Control-plane DB with self-service tenant provisioning",
      "OpenAI LLM evaluation, scoring & candidate summaries",
      "Azure Document Intelligence OCR + Pinecone knowledge base",
      "Retryable BullMQ workers for the full interview pipeline",
      "Automated PDF reports + transactional emails",
    ],
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.nestjs,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.prisma,
        PROJECT_SKILLS.redis,
        PROJECT_SKILLS.bullmq,
        PROJECT_SKILLS.openaiAI,
        PROJECT_SKILLS.sockerio,
        PROJECT_SKILLS.aws,
        PROJECT_SKILLS.swagger,
      ],
    },
    video: "",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Interview AI is a multi-tenant SaaS backend that lets universities run
            AI-powered voice interviews for prospective students — handling
            onboarding, document verification, the interview call, AI evaluation,
            and reporting. Each client runs in its own database, governed by a
            control-plane DB.
            <br />
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">End-to-End Flow</TypographyH3>
          <p className="font-mono mb-2">
            1. Platform owner provisions a tenant — auto-migrate DB + seed RBAC +
            super-admin.
            <br />
            2. Every request routes to the correct tenant DB via a
            TenantResolutionGuard (CLS + Prisma proxy).
            <br />
            3. Students upload documents → OCR (Azure) + AI summary jobs run on
            BullMQ.
            <br />
            4. Provider webhooks update interview attempts and store transcript
            turns.
            <br />
            5. An evaluation pipeline scores the interview (LLM), builds a PDF
            report on S3, and emails the result.
            <br />
          </p>

          <TypographyH3 className="my-4 mt-8">
            Intigration Technologies
          </TypographyH3>
          <p className="font-mono mb-2">
            {this.intigrationTechnologies?.map((tech, index) => (
              <p key={index} className="font-mono mb-2">
                {index + 1}. {tech}
              </p>
            ))}
          </p>

          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },

  // +Open API for Batch Calling
  {
    id: "edysorvoice",
    category: "Open API · Batch AI Voice Calling",
    title: "Edysor Voice",
    src: "/assets/projects-screenshots/edysorvoice/cover.svg",
    screenshots: [],
    intigrationTechnologies: [
      "External-facing REST API (ElevenLabs-style), 23+ endpoints",
      "API-key auth (generate / validate / revoke) at the gateway",
      "Microservices: API Gateway, User, Call, Agent, Telephony",
      "Scheduled Calls with timezone-aware dispatch",
      "Thin wrapper reusing the existing campaign pipeline",
      "Backward-compatible response shapes + Postman onboarding",
    ],
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.fastify,
        PROJECT_SKILLS.mysql,
        PROJECT_SKILLS.swagger,
      ],
    },
    video: "",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Edysor Voice is an external-facing REST API (similar to ElevenLabs)
            that lets third-party developers trigger and monitor AI
            voice-calling campaigns programmatically via API keys — 23+ endpoints
            across agents, campaigns, conversations, scheduled calls, and
            billing, built on a Node.js / TypeScript / Fastify microservices
            backend.
            <br />
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">Design Highlights</TypographyH3>
          <p className="font-mono mb-2">
            1. Architected as a thin wrapper over the existing campaign pipeline
            — reusing voice_campaigns tables instead of new infrastructure.
            <br />
            2. API-key authentication enforced by a gateway-level middleware
            across all microservices.
            <br />
            3. Built the Scheduled Calls feature end-to-end (migration →
            repository → service → controller → routes) with timezone-aware
            dispatch.
            <br />
            4. Maintained backward-compatible response shapes so existing SaaS
            clients integrated with zero breaking changes.
            <br />
            5. Delivered a Postman collection for external developer onboarding.
            <br />
          </p>

          <TypographyH3 className="my-4 mt-8">
            Intigration Technologies
          </TypographyH3>
          <p className="font-mono mb-2">
            {this.intigrationTechnologies?.map((tech, index) => (
              <p key={index} className="font-mono mb-2">
                {index + 1}. {tech}
              </p>
            ))}
          </p>

          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },

  // +Food Delivery App
  {
    // 01. AI Docker file optimizer project
    id: "supraa",
    category: "Grocery and Food Delivery App",
    title: "Supraa",
    src: "/assets/projects-screenshots/supraa/supraa.jpeg",
    screenshots: ["1.png", "2.png", "3.png"],
    intigrationTechnologies: [
      "React Native Map Integration",
      "Razorpay Payment Gateway",
      "Axios API Integration",
      "Live Delivery Tracking",
      "Delivery Charge Calculation Based on Distance",
      "React Native Firebase Notifications",
    ],

    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.reactNative,
        PROJECT_SKILLS.firebase,
        PROJECT_SKILLS.redux,
        PROJECT_SKILLS.mapIntegration,
        PROJECT_SKILLS.razorpay,
      ],
      backend: [],
    },
    video: "/assets/projects-screenshots/supraa/supraa.mp4",
    playStore: "https://play.google.com/store/apps/details?id=com.supraa",
    appStore: "https://apps.apple.com/in/app/supraa/id6743932127",
    // apkDownload:
    //   "https://play.google.com/store/apps/details?id=com.supraa.supraa",

    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Supraa is a grocery and food delivery app that allows users to order
            food from their favorite restaurants and have it delivered to their
            doorstep.
            <br />
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">
            App Architecture Flow
          </TypographyH3>
          <p className="font-mono mb-2">
            The app architecture flow is as follows:
            <br />
            1.User can login and signup using email and password.
            <br />
            2.User can view the list of restaurants and food items.
            <br />
            3.User can add food items to the cart and place an order.
            <br />
            4.User can view the order status and track the delivery.
            <br />
          </p>

          <TypographyH3 className="my-4 mt-8">
            Intigration Technologies
          </TypographyH3>
          <p className="font-mono mb-2">
            The intigration technologies are as follows:
            <br />
            {this.intigrationTechnologies?.map((tech, index) => (
              <p key={index} className="font-mono mb-2">
                {index + 1}. {tech}
              </p>
            ))}
          </p>

          <ProjectsLinks
            playStore={this.playStore}
            appStore={this.appStore}
            apkDownload={this.apkDownload}
          />
          {/* <SlideShow
            images={[{ image : `${BASE_PATH}/aidockerfileoptimizer/1.png` , title : "AI Dockerfile Optimizer" },
              { image : `${BASE_PATH}/aidockerfileoptimizer/2.png` , title : "AI Dockerfile Optimizer" },
              { image : `${BASE_PATH}/aidockerfileoptimizer/3.png` , title : "AI Dockerfile Optimizer" },
            ]}
          /> */}
        </div>
      );
    },
  },

  // +Club Automation App
  {
    // 01. AI Docker file optimizer project
    id: "elpico",
    category: "Club Automation App",
    title: "ElPico Social",
    src: "/assets/projects-screenshots/elpico/elpico.jpeg",
    screenshots: ["1.png", "2.png", "3.png"],
    intigrationTechnologies: [
      "React Native Map Integration",
      "Stripe Payment Gateway",
      "Coinbase Crypto Payment Gateway",
      "RTK API Integration",
      "Google Maps API Integration",
      "React Native Firebase Notifications",
      "React Native Firebase Messaging",
      "FaceID and TouchID Authentication",
    ],

    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.reactNative,
        PROJECT_SKILLS.firebase,
        PROJECT_SKILLS.redux,
        PROJECT_SKILLS.mapIntegration,
        PROJECT_SKILLS.stripe,
        PROJECT_SKILLS.coinbase,
        PROJECT_SKILLS.rtk,
      ],
      backend: [],
    },
    video: "/assets/projects-screenshots/elpico/elpico.mp4",
    // playStore: "https://play.google.com/store/apps/details?id=com.supraa",
    // appStore: "https://apps.apple.com/in/app/supraa/id6743932127",
    apkDownload:
      "https://www.dropbox.com/scl/fi/uxqj90fnwvu6fgafx9hsg/Elpico.apk?rlkey=14juza0qcjjrcxnafsam02cln&st=veo2ueof&dl=0",

    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            ElPico Social is a club automation app that allows members to book
            space slots, event tickets, and services from the club.
            <br />
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">
            App Architecture Flow
          </TypographyH3>
          <p className="font-mono mb-2">
            The app architecture flow is as follows:
            <br />
            1. Only Club Members can login and signup using member ID and
            password.
            <br />
            2. Member can book space slots eg. Conference Room, Meeting Room,
            Private Room, etc.
            <br />
            3. Member can book event tickets for the events.
            <br />
            4. Member can book services from the club eg. Catering, Audio
            Visual, etc.
            <br />
            5. Member can pay Payment using 3 methods Stripe, Coinbase, and Pay
            later.
            <br />
          </p>

          <TypographyH3 className="my-4 mt-8">
            Intigration Technologies
          </TypographyH3>
          <p className="font-mono mb-2">
            The intigration technologies are as follows:
            <br />
            {this.intigrationTechnologies?.map((tech, index) => (
              <p key={index} className="font-mono mb-2">
                {index + 1}. {tech}
              </p>
            ))}
          </p>

          <ProjectsLinks
            playStore={this.playStore}
            appStore={this.appStore}
            apkDownload={this.apkDownload}
          />
          {/* <SlideShow
            images={[{ image : `${BASE_PATH}/aidockerfileoptimizer/1.png` , title : "AI Dockerfile Optimizer" },
              { image : `${BASE_PATH}/aidockerfileoptimizer/2.png` , title : "AI Dockerfile Optimizer" },
              { image : `${BASE_PATH}/aidockerfileoptimizer/3.png` , title : "AI Dockerfile Optimizer" },
            ]}
          /> */}
        </div>
      );
    },
  },

  // +Social Media App
  {
    // 01. AI Docker file optimizer project
    id: "myflama",
    category: "Social Media App",
    title: "MyFlama",
    src: "/assets/projects-screenshots/myflama/myFlama.jpeg",
    screenshots: ["1.png", "2.png", "3.png"],
    intigrationTechnologies: [
      "React Native Map Integration",
      "Ads Integration",
      "RTK API Integration",
      "Google Maps API Integration",
      "React Native Firebase Notifications",
      "React Native Firebase Messaging",
      "Google Auth Integration",
    ],

    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.reactNative,
        PROJECT_SKILLS.firebase,
        PROJECT_SKILLS.redux,
        PROJECT_SKILLS.mapIntegration,
        PROJECT_SKILLS.ads,
        PROJECT_SKILLS.rtk,
      ],
      backend: [],
    },
    video: "/assets/projects-screenshots/myflama/MyFlama.mp4",
    // playStore: "https://play.google.com/store/apps/details?id=com.supraa",
    // appStore: "https://apps.apple.com/in/app/supraa/id6743932127",
    apkDownload:
      "https://www.dropbox.com/scl/fi/odx7cl2effd51qjlks2h7/MyFlama.apk?rlkey=lybny6zj36baodn8z5g6fiyyh&st=5axgeq64&dl=0",

    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            MyFlama is a social media app that allows users to share their
            posts, short videos, and comments with their friends and family.
            <br />
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">
            App Architecture Flow
          </TypographyH3>
          <p className="font-mono mb-2">
            The app architecture flow is as follows:
            <br />
            1. User can login and signup using email and password.
            <br />
            2. User can view the list of posts , short videos and comments.
            <br />
            3. User can like and comment on the posts and short videos.
            <br />
            4. User can share the posts and short videos on social media.
            <br />
            5. User Can follow and unfollow the users.
            <br />
            6. User can view the list of users and their posts.
            <br />
            7. Users can chat with each other and share the posts and short
            videos.
            <br />
            8. user can see live location of the users.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Intigration Technologies
          </TypographyH3>
          <p className="font-mono mb-2">
            The intigration technologies are as follows:
            <br />
            {this.intigrationTechnologies?.map((tech, index) => (
              <p key={index} className="font-mono mb-2">
                {index + 1}. {tech}
              </p>
            ))}
          </p>

          <ProjectsLinks
            playStore={this.playStore}
            appStore={this.appStore}
            apkDownload={this.apkDownload}
          />
          {/* <SlideShow
            images={[{ image : `${BASE_PATH}/aidockerfileoptimizer/1.png` , title : "AI Dockerfile Optimizer" },
              { image : `${BASE_PATH}/aidockerfileoptimizer/2.png` , title : "AI Dockerfile Optimizer" },
              { image : `${BASE_PATH}/aidockerfileoptimizer/3.png` , title : "AI Dockerfile Optimizer" },
            ]}
          /> */}
        </div>
      );
    },
  },

  // 01. BigValue Traveler project
  {
    id: "bigValue",
    category: "Travel and Tourism App",
    title: "BigValue Travels",
    src: "/assets/projects-screenshots/bigvalue/bigValue.jpeg",
    screenshots: ["1.png", "2.png", "3.png"],
    intigrationTechnologies: [
      "Localization (English, Spanish, Arabic) translation integration",
      "Thromolex and Riya API Integration for hotel and flight data",
      "In-App Live Currency Converter (USD, EUR, GBP, INR)",
      "Razorpay , Paypal , Cashfree Payment Gateway Integration",
      "React Native Firebase Notifications",
      "React Native Firebase Messaging",
    ],

    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.reactNative,
        PROJECT_SKILLS.razorpay,
        PROJECT_SKILLS.redux,
        PROJECT_SKILLS.paypal,
        PROJECT_SKILLS.firebase,
        PROJECT_SKILLS.rtk,
      ],
      backend: [],
    },
    video: "/assets/projects-screenshots/bigvalue/bigValue.mp4",
    // playStore: "https://play.google.com/store/apps/details?id=com.supraa",
    // appStore: "https://apps.apple.com/in/app/supraa/id6743932127",
    apkDownload:
      "https://www.dropbox.com/scl/fi/4701562yuvzelehetqf4f/BigValue.apk?rlkey=s7ctnix91nkjymjdgkx1mob0t&st=rhfa21sg&dl=0",

    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            BigValue Travels is a travel and tourism app that allows users to
            book flight tickets, hotel, car rental, and tour packages for their
            trip.
            <br />
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">
            App Architecture Flow
          </TypographyH3>
          <p className="font-mono mb-2">
            The app architecture flow is as follows:
            <br />
            1. User can login and signup using email and password.
            <br />
            2. User can book tree type flight tickets (One way, Round trip,
            Multi-city).
            <br />
            3. User can Directly full trip Packages (Hotel + Flight + Car) or
            (Flight + Hotel) for turist destinations.
            <br />
            4. User can view list of car and book car for the trip (SUV , Sedan
            , Hatchback , etc.).
            <br />
            5. User can view list of hotels and book hotel for the trip (Hotel ,
            Resort , etc.).
            <br />
            6. user can Payment uinsg Razorpay , Paypal , Cashfree Payment
            Gateway.
            <br />
            7. User can view list of tour packages and book tour package for the
            trip.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Intigration Technologies
          </TypographyH3>
          <p className="font-mono mb-2">
            The intigration technologies are as follows:
            <br />
            {this.intigrationTechnologies?.map((tech, index) => (
              <p key={index} className="font-mono mb-2">
                {index + 1}. {tech}
              </p>
            ))}
          </p>

          <ProjectsLinks
            playStore={this.playStore}
            appStore={this.appStore}
            apkDownload={this.apkDownload}
          />
          {/* <SlideShow
            images={[{ image : `${BASE_PATH}/aidockerfileoptimizer/1.png` , title : "AI Dockerfile Optimizer" },
              { image : `${BASE_PATH}/aidockerfileoptimizer/2.png` , title : "AI Dockerfile Optimizer" },
              { image : `${BASE_PATH}/aidockerfileoptimizer/3.png` , title : "AI Dockerfile Optimizer" },
            ]}
          /> */}
        </div>
      );
    },
  },

  // +E-commerce App
  {
    // 01. BigValue Traveler project
    id: "peclick",
    category: "Agency Management App",
    title: "Peclick Agency",
    src: "/assets/projects-screenshots/peclicke/peclicke.jpeg",
    screenshots: ["1.png", "2.png", "3.png"],
    intigrationTechnologies: [
      "RTK API Integration",
      "React Native Firebase Notifications",
      "React Native Firebase Messaging",
    ],

    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.reactNative,
        PROJECT_SKILLS.firebase,
        PROJECT_SKILLS.redux,
        PROJECT_SKILLS.rtk,
      ],
      backend: [],
    },
    video: "/assets/projects-screenshots/peclicke/peclicke.mp4",
    playStore:
      "https://play.google.com/store/apps/details?id=com.peclickagency",
    // appStore: "https://apps.apple.com/in/app/supraa/id6743932127",
    // apkDownload:
    //   "https://play.google.com/store/apps/details?id=com.supraa.supraa",

    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Peclick Agency is a agency management app that allows agency to
            manage their orders , products , categories , brands , users ,
            messages , notifications , reviews , ratings.
            <br />
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">
            App Architecture Flow
          </TypographyH3>
          <p className="font-mono mb-2">
            The app architecture flow is as follows:
            <br />
            1. Agency can login using email and password.
            <br />
            2. on the home page agency can share statics total orders , total
            revenue , total products , total categories , total brands , total
            users , total messages , total notifications , total reviews , total
            ratings , total products , total categories , total brands , total
            users , total messages , total notifications , total reviews , total
            ratings.
            <br />
            3. Agency can view list of orders , products , categories , brands ,
            users , messages , notifications , reviews , ratings.
            <br />
            4. Agency can view list report of orders , products , categories ,
            brands , users , messages , notifications , reviews , ratings.
            <br />
            5. Agency can Details of Seller and Outlet.
            <br />
          </p>

          <TypographyH3 className="my-4 mt-8">
            Intigration Technologies
          </TypographyH3>
          <p className="font-mono mb-2">
            The intigration technologies are as follows:
            <br />
            {this.intigrationTechnologies?.map((tech, index) => (
              <p key={index} className="font-mono mb-2">
                {index + 1}. {tech}
              </p>
            ))}
          </p>

          <ProjectsLinks
            playStore={this.playStore}
            appStore={this.appStore}
            apkDownload={this.apkDownload}
          />
          {/* <SlideShow
            images={[{ image : `${BASE_PATH}/aidockerfileoptimizer/1.png` , title : "AI Dockerfile Optimizer" },
              { image : `${BASE_PATH}/aidockerfileoptimizer/2.png` , title : "AI Dockerfile Optimizer" },
              { image : `${BASE_PATH}/aidockerfileoptimizer/3.png` , title : "AI Dockerfile Optimizer" },
            ]}
          /> */}
        </div>
      );
    },
  },
];
export default projects;
