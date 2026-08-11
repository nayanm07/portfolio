"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";

function MainPage() {
  return (
    <>
      <SmoothScroll>
        <main className="min-h-screen bg-[#060606] text-white">
          {/* <div className="top-0 z-0 fixed w-full h-screen">
            <AnimatedBackground />
          </div> */}

          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          {/* <ContactSection /> */}
        </main>
      </SmoothScroll>
    </>
  );
}

export default MainPage;
