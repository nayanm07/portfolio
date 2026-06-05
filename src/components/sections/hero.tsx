import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import AgentBand from "../ui/agent-band";

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <section id="hero" className={cn("relative w-full min-h-screen overflow-hidden")}>
      {/* Composio atmospheric backdrop: technical grid + electric-blue spotlight */}
      <div className="pointer-events-none absolute inset-0 composio-grid opacity-60" />
      <div className="composio-spotlight animate-spotlight-pulse" />

      {!isLoading && (
        <div className="relative z-[2] flex flex-col items-center">
          {/* ── Centered headline ──────────────────────────────── */}
          <div className="flex flex-col items-center text-center px-4 pt-28 md:pt-32 pb-12">
            <BlurIn delay={0.6}>
              <span className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-hairline-strong bg-surface-elevated/60 text-[11px] font-mono uppercase tracking-[0.14em] text-body-strong">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                Available for work
              </span>
            </BlurIn>

            <BlurIn delay={0.7}>
              <p className="font-normal text-md text-body mb-3 font-display sm:text-lg">
                Hi, I am
              </p>
            </BlurIn>

            <BlurIn delay={0.9}>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <h1
                    className={cn(
                      "font-medium text-6xl text-body-strong",
                      "cursor-default font-display sm:text-7xl md:text-8xl xl:text-9xl tracking-tight"
                    )}
                  >
                    {config.author}
                  </h1>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="dark:bg-white dark:text-black max-w-xs">
                  Nayan Mehta is a Full-Stack Mobile Engineer building React
                  Native &amp; native Android apps and NestJS/Node.js SaaS
                  backends.
                </TooltipContent>
              </Tooltip>
            </BlurIn>

            <BlurIn delay={1.1}>
              <p className="mt-5 max-w-xl text-sm md:text-base text-body font-display">
                Full-Stack Mobile Engineer shipping React Native &amp; native
                Android apps and multi-tenant NestJS backends.
              </p>
            </BlurIn>

            {/* CTAs */}
            <BoxReveal delay={1.6} width="fit-content">
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/assets/Nayan-Resume.pdf" target="_blank">
                  <Button className="flex items-center gap-2">
                    <File size={18} />
                    <p>Resume</p>
                  </Button>
                </Link>
                <Link href={"#contact"}>
                  <Button variant={"outline"}>Hire Me</Button>
                </Link>
                <Link href={config.social.github} target="_blank">
                  <Button variant={"outline"} size={"icon"}>
                    <SiGithub size={20} />
                  </Button>
                </Link>
                <Link href={config.social.linkedin} target="_blank">
                  <Button variant={"outline"} size={"icon"}>
                    <SiLinkedin size={20} />
                  </Button>
                </Link>
              </div>
            </BoxReveal>
          </div>

          {/* ── Full-width agent orchestration band ─────────────── */}
          <AgentBand />
        </div>
      )}

      <div className="relative flex justify-center py-8">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default HeroSection;
