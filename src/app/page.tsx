"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";

function MainPage() {
  return (
    <>
      <SmoothScroll>
        <main className={cn("bg-slate-100 dark:bg-transparent")}>
          {/* <div className="top-0 z-0 fixed w-full h-screen">
            <AnimatedBackground />
          </div> */}

          <video
            autoPlay
            muted
            loop
            className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20 opacity-50"
          >
            <source src="/assets//videos/blackhole.webm" type="video/webm" />
          </video>
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          {/* <ContactSection /> */}
        </main>
      </SmoothScroll>
    </>
  );
}

export default MainPage;
