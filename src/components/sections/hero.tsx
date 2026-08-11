"use client";

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
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import AgentBand from "../ui/agent-band";
import BlackHoleHeroSection from "../black-hole-hero";

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <section id="hero" className={cn("relative w-full overflow-hidden bg-black text-white")}>
      <BlackHoleHeroSection
        className="absolute inset-0 h-full w-full"
        distance={24}
        elevation={-5.5}
        roll={-20}
        focus={[0.72, 0.46]}
        scrim="left"
        scrimStrength={0.82}
        resolution={0.65}
        steps={260}
      />

      {!isLoading && (
        <div className="relative z-[2] flex flex-col items-center">
          {/* ── Centered headline ──────────────────────────────── */}
          <div className="flex w-full max-w-[42rem] self-start flex-col items-start px-6 pb-12 pt-28 text-left sm:px-10 md:pt-36 lg:px-16">
            <BlurIn delay={0.6}>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
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
                      "cursor-default whitespace-nowrap font-display text-4xl font-medium leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-8xl"
                    )}
                  >
                    {config.author}
                  </h1>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs border-white/15 bg-black text-white">
                  Nayan Mehta is a Full-Stack Mobile Engineer building React
                  Native &amp; native Android apps and NestJS/Node.js SaaS
                  backends.
                </TooltipContent>
              </Tooltip>
            </BlurIn>

            <BlurIn delay={1.1}>
              <p className="mt-5 max-w-xl font-display text-sm text-white/70 md:text-base">
                Full-Stack Mobile Engineer shipping React Native &amp; native
                Android apps and multi-tenant NestJS backends.
              </p>
            </BlurIn>

            {/* CTAs */}
            <BoxReveal delay={1.6} width="fit-content">
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/assets/Nayan-Resume.pdf" target="_blank">
                  <Button className="flex items-center gap-2">
                    <File size={18} />
                    <p>Resume</p>
                  </Button>
                </Link>
                <Link href="#about">
                  <Button variant="outline">About Me</Button>
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
          {/* <AgentBand /> */}
        </div>
      )}
    </section>
  );
};

export default HeroSection;
