import Link from "next/link";
import { ArrowDownRight, Code2, MonitorSmartphone, Server, Smartphone } from "lucide-react";

const highlights = [
  { icon: Smartphone, title: "Mobile products", text: "React Native and native Android apps built for real users." },
  { icon: MonitorSmartphone, title: "Web applications", text: "Fast, scalable web products with polished, responsive interfaces." },
  { icon: Server, title: "Reliable backends", text: "Multi-tenant NestJS services, real-time systems, queues, and APIs." },
  { icon: Code2, title: "End-to-end delivery", text: "From offline-first UX to AWS deployment and payment integrations." },
];

const AboutSection = () => (
  <section id="about" className="relative overflow-hidden border-y border-white/10 bg-[#08080a] py-20 md:py-32">
    <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(ellipse 60% 65% at 90% 0%, rgba(27, 47, 255, 0.16), transparent 70%)" }} />
    <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
    <div className="relative grid gap-14 px-6 sm:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:px-16 xl:px-24">
      <div className="flex flex-col justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-glow shadow-[0_0_12px_#1a26ff]" />
            About me
          </span>
          <h2 className="mt-7 max-w-xl font-display text-4xl font-medium leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl">
            I turn ambitious ideas into products people rely on.
          </h2>
        </div>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-white/40 lg:mt-20">
          Mobile · Backend · Product engineering
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-sm sm:p-8 md:p-10">
        <p className="max-w-2xl text-base leading-8 text-white/80 md:text-lg">
          I&apos;m Nayan, a Full-Stack Mobile Engineer with 2+ years of experience
          shipping React Native, native Android, and modern web applications.
          Beyond the app layer, I build NestJS and Node.js SaaS backends with real-time WebSockets,
          BullMQ queues, PostgreSQL, Prisma, and AWS.
        </p>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
          I enjoy solving the details that make a product dependable: offline-first
          experiences, AI and voice integrations, multi-gateway payments, and
          clear collaboration from idea through launch.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group rounded-2xl border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary-glow/50 hover:bg-white/[0.05]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-glow/25 bg-primary-glow/10">
                <Icon className="h-5 w-5 text-primary-glow" />
              </div>
              <h3 className="mt-5 text-sm font-medium text-white">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/55">{text}</p>
            </div>
          ))}
        </div>

        <Link href="#skills" className="group mt-9 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white transition-all hover:border-primary-glow/60 hover:bg-primary-glow/10">
          Explore my tech stack <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  </section>
);

export default AboutSection;
