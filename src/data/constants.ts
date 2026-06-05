// thoda zada ts ho gya idhar
export enum SkillNames {
  GIT = "git",
  HTML = "html",
  CSS = "css",
  JS = "js",
  TS = "ts",
  REACT = "react",
  NODEJS = "nodejs",
  EXPRESS = "express",
  MONGODB = "mongodb",
  GITHUB = "github",
  FIREBASE = "firebase",
  // React Native Skills
  REACT_NATIVE = "react_native",
  EXPO = "expo",
  ANDROID = "android",
  IOS = "ios",
  REACT_NAVIGATION = "react_navigation",
  ASYNC_STORAGE = "async_storage",
  REDUX = "redux",
  MOBX = "mobx",
  STYLED_COMPONENTS = "styled_components",
  NATIVE_BASE = "native_base",
  ANDROID_STUDIO = "android_studio",
  XCODE = "xcode",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  // React Native Skills
  [SkillNames.REACT_NATIVE]: {
    id: 25,
    name: "react_native",
    label: "React Native",
    shortDescription:
      "write once, deploy everywhere, and it actually works! 📱⚡",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  [SkillNames.EXPO]: {
    id: 26,
    name: "expo",
    label: "Expo",
    shortDescription: "React Native but make it EZ mode, no cap! 🎯📲",
    color: "#000020",
    icon: "https://static.cdnlogo.com/logos/e/72/expo-go-app.svg",
  },
  [SkillNames.ANDROID]: {
    id: 27,
    name: "android",
    label: "Android",
    shortDescription: "green robot army dominating the mobile world! 🤖💚",
    color: "#3ddc84",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  },
  [SkillNames.IOS]: {
    id: 28,
    name: "ios",
    label: "iOS",
    shortDescription: "the bougie cousin of mobile platforms, periodt! 🍎✨",
    color: "#000000",
    icon: "https://static.cdnlogo.com/logos/a/19/apple.svg",
  },
  [SkillNames.ANDROID_STUDIO]: {
    id: 35,
    name: "android_studio",
    label: "Android Studio",
    shortDescription: "the IDE that eats RAM like it's a free buffet! 🍽️💾",
    color: "#3ddc84",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
  },
  [SkillNames.XCODE]: {
    id: 36,
    name: "xcode",
    label: "Xcode",
    shortDescription:
      "Apple's gift to developers... when it's not crashing! 🍎💻",
    color: "#147efb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg",
  },

  [SkillNames.REACT_NAVIGATION]: {
    id: 29,
    name: "react_navigation",
    label: "React Navigation",
    shortDescription: "routing in RN that doesn't make you cry! 🗺️🎉",
    color: "#6c47ff",
    icon: "https://reactnavigation.org/img/spiro.svg",
  },
  [SkillNames.ASYNC_STORAGE]: {
    id: 30,
    name: "async_storage",
    label: "AsyncStorage",
    shortDescription: "local storage but make it mobile, bestie! 💾📱",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  [SkillNames.REDUX]: {
    id: 31,
    name: "redux",
    label: "Redux",
    shortDescription:
      "state management that's got more drama than reality TV! 🎭🔄",
    color: "#764abc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },

  [SkillNames.STYLED_COMPONENTS]: {
    id: 34,
    name: "rtk_query",
    label: " RTK Query",
    shortDescription: "component library that's got that clean aesthetic! 🧱✨",
    color: "#00d4aa",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },

  [SkillNames.FIREBASE]: {
    id: 17,
    name: "firebase",
    label: "Firebase",
    shortDescription:
      "your app's ultimate wingman, but watch out, vendor lock-in vibes! 🔥👌",
    color: "#ffca28",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },

  [SkillNames.NATIVE_BASE]: {
    id: 34,
    name: "add_mob",
    label: " Add Mob",
    shortDescription: "component library that's got that clean aesthetic! 🧱✨",
    color: "#00d4aa",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/google-admob.svg",
  },

  [SkillNames.MOBX]: {
    id: 36,
    name: "oauth",
    label: " OAuth",
    shortDescription: "component library that's got that clean aesthetic! 🧱✨",
    color: "#00d4aa",
    icon: "https://cdn.tutsplus.com/mobile/uploads/2013/09/Google-OAuth@2x.png",
  },

  [SkillNames.GIT]: {
    id: 13,
    name: "git",
    label: "Git",
    shortDescription: "the code's personal bodyguard, no cap! 🕵️‍♂️🔄",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.GITHUB]: {
    id: 14,
    name: "github",
    label: "GitHub",
    shortDescription: "sliding into those pull requests, IYKYK! 🐙",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/github-light.svg",
  },

  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription: "yeeting code into the DOM since '95, no cap! 💯🚀",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "TypeScript",
    shortDescription:
      "JavaScript's overachieving cousin who's always flexing 💯🔒",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  [SkillNames.HTML]: {
    id: 3,
    name: "html",
    label: "HTML",
    shortDescription: "the internet's granddad,  still bussin' fr fr! 💀🔥",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  [SkillNames.CSS]: {
    id: 4,
    name: "css",
    label: "CSS",
    shortDescription: "styling with the ultimate drip, no cap 💁‍♂️🔥",
    color: "#563d7c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  [SkillNames.REACT]: {
    id: 5,
    name: "react",
    label: "React",
    shortDescription: `"use using" 
using use = useUsing("use")`,
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },

  [SkillNames.NODEJS]: {
    id: 9,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "JavaScript said 'sike, I'm backend now', deadass! 🔙🔚",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  [SkillNames.EXPRESS]: {
    id: 10,
    name: "express",
    label: "Express",
    shortDescription: "middlewares go dummy hard, no cap! 🚂💨",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },

  [SkillNames.MONGODB]: {
    id: 12,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "flexin' with that NoSQL drip, respectfully! 💪🍃",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
};

// ───────────────────────────────────────────────────────────────────────────
// Categorized skills — powers the redesigned Skills section.
// (Kept separate from SKILLS above, which is keyed by SkillNames and drives the
//  3D Spline keyboard + About carousel.)
// ───────────────────────────────────────────────────────────────────────────
const DEVICON = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg`;
const SIMPLE = (slug: string, color: string = "ffffff") =>
  `https://cdn.simpleicons.org/${slug}/${color}`;
const DASH = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/${slug}.svg`;

export type CategorizedSkill = {
  label: string;
  icon: string;
  color: string;
};

export type SkillCategory = {
  name: string;
  tagline: string;
  accent: string;
  skills: CategorizedSkill[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Mobile",
    tagline: "Cross-platform & native Android, shipped to both stores",
    accent: "#38bdf8",
    skills: [
      { label: "React Native", icon: DEVICON("react/react-original"), color: "#61dafb" },
      { label: "Kotlin", icon: DEVICON("kotlin/kotlin-original"), color: "#a97bff" },
      { label: "TypeScript", icon: DEVICON("typescript/typescript-original"), color: "#3178c6" },
      { label: "JavaScript", icon: DEVICON("javascript/javascript-original"), color: "#f7df1e" },
      { label: "Redux Toolkit", icon: DEVICON("redux/redux-original"), color: "#764abc" },
      { label: "React Navigation", icon: "https://reactnavigation.org/img/spiro.svg", color: "#6c47ff" },
      { label: "Offline-first SQLite", icon: DEVICON("sqlite/sqlite-original"), color: "#0f80cc" },
      { label: "Expo", icon: SIMPLE("expo"), color: "#ffffff" },
    ],
  },
  {
    name: "Backend",
    tagline: "NestJS / Node.js APIs, multi-tenant SaaS & real-time systems",
    accent: "#34d399",
    skills: [
      { label: "NestJS", icon: DEVICON("nestjs/nestjs-original"), color: "#e0234e" },
      { label: "Node.js", icon: DEVICON("nodejs/nodejs-original"), color: "#6cc24a" },
      { label: "Express", icon: SIMPLE("express"), color: "#ffffff" },
      { label: "Fastify", icon: SIMPLE("fastify"), color: "#ffffff" },
      { label: "PostgreSQL", icon: DEVICON("postgresql/postgresql-original"), color: "#4d9fd6" },
      { label: "MySQL", icon: DEVICON("mysql/mysql-original"), color: "#4479a1" },
      { label: "MongoDB", icon: DEVICON("mongodb/mongodb-original"), color: "#47a248" },
      { label: "Prisma", icon: SIMPLE("prisma"), color: "#ffffff" },
      { label: "Redis", icon: DEVICON("redis/redis-original"), color: "#d82c20" },
      { label: "Socket.IO", icon: SIMPLE("socketdotio"), color: "#ffffff" },
      { label: "BullMQ", icon: SIMPLE("redis", "ff4438"), color: "#ff4438" },
      { label: "Swagger", icon: DEVICON("swagger/swagger-original"), color: "#85ea2d" },
      { label: "JWT & RBAC", icon: SIMPLE("jsonwebtokens"), color: "#ffffff" },
    ],
  },
  {
    name: "AI & Integrations",
    tagline: "Voice, LLMs, payments & messaging woven into products",
    accent: "#a78bfa",
    skills: [
      { label: "OpenAI", icon: "/assets/icons/openai-svgrepo-com_white.svg", color: "#ffffff" },
      { label: "Deepgram", icon: SIMPLE("deepgram", "13ef93"), color: "#13ef93" },
      { label: "Firebase", icon: DEVICON("firebase/firebase-plain"), color: "#ffca28" },
      { label: "WhatsApp API", icon: SIMPLE("whatsapp", "25d366"), color: "#25d366" },
      { label: "Stripe", icon: SIMPLE("stripe", "635bff"), color: "#635bff" },
      { label: "Razorpay", icon: SIMPLE("razorpay", "3395ff"), color: "#3395ff" },
      { label: "PayPal", icon: SIMPLE("paypal", "0070ba"), color: "#0070ba" },
      { label: "Coinbase", icon: SIMPLE("coinbase", "0052ff"), color: "#0052ff" },
      { label: "Google Maps", icon: SIMPLE("googlemaps", "4285f4"), color: "#4285f4" },
      { label: "AdMob", icon: DASH("google-admob"), color: "#ea4335" },
    ],
  },
  {
    name: "Cloud & DevOps",
    tagline: "Dockerized deploys, CI/CD and HTTPS on AWS",
    accent: "#fbbf24",
    skills: [
      { label: "AWS", icon: DASH("aws"), color: "#ff9900" },
      { label: "Docker", icon: DEVICON("docker/docker-original"), color: "#2496ed" },
      { label: "Nginx", icon: DEVICON("nginx/nginx-original"), color: "#009639" },
      { label: "GitHub Actions", icon: SIMPLE("githubactions", "2088ff"), color: "#2088ff" },
      { label: "Git", icon: DEVICON("git/git-original"), color: "#f05032" },
      { label: "GitHub", icon: DASH("github-light"), color: "#ffffff" },
    ],
  },
  {
    name: "Testing & Tools",
    tagline: "Quality, OCR and the kit I build with day to day",
    accent: "#fb7185",
    skills: [
      { label: "Jest", icon: DEVICON("jest/jest-plain"), color: "#c21325" },
      { label: "Postman", icon: DEVICON("postman/postman-original"), color: "#ff6c37" },
      { label: "Azure Doc AI", icon: DEVICON("azure/azure-original"), color: "#0078d4" },
      { label: "Android Studio", icon: DEVICON("androidstudio/androidstudio-original"), color: "#3ddc84" },
      { label: "Xcode", icon: DEVICON("xcode/xcode-original"), color: "#1575f9" },
      { label: "Bitbucket", icon: DEVICON("bitbucket/bitbucket-original"), color: "#0052cc" },
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
