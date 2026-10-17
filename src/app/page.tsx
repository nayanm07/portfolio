"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import ExperienceSection from "@/components/sections/experience";
import KeyWorkSection from "@/components/sections/key-work";
import SkillsSection from "@/components/sections/skills";
import FeaturedProjectsSection from "@/components/sections/featured-projects";
import AchievementsSection from "@/components/sections/achievements";
import ContactSection from "@/components/sections/contact";

function MainPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[var(--aw-bg)] text-[var(--aw-text)]">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <KeyWorkSection />
        <SkillsSection />
        <FeaturedProjectsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
