"use client";

import React from "react";
import { projectCards } from "@/data/featured";
import { FeaturedCard } from "@/components/sections/featured-projects";

/** The full project list for the /projects page, using the same cards as the homepage. */
const ProjectsSection = () => (
  <main className="all-projects min-h-screen bg-[var(--aw-bg)] px-6 pb-24 pt-32 text-[var(--aw-text)] md:pb-32 md:pt-36">
    <div className="mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold md:text-4xl">Projects</h1>
      <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--aw-text-secondary)] md:text-base">
        {projectCards.length} shipped products — multi-tenant SaaS backends, AI platforms and mobile apps live on the
        Play Store and App Store.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
        {projectCards.map((item, i) => (
          <div key={item.id} className="flex">
            <FeaturedCard item={item} index={i} />
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default ProjectsSection;
