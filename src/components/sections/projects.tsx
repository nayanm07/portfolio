"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import projects, { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

const pad = (n: number) => (n + 1).toString().padStart(2, "0");

/* Chromatic animated backdrop behind the centre mockup */
const ChromaBackdrop = () => (
  <>
    <div
      className="absolute inset-0 animate-chroma opacity-90"
      style={{
        backgroundImage:
          "linear-gradient(120deg, #00d4ff, #0007cd, #1a26ff, #00d4ff, #0ea5a5)",
        backgroundSize: "200% 100%",
      }}
    />
    <div
      className="absolute inset-0 mix-blend-overlay opacity-30"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, rgba(0,0,0,0.5) 0 3px, transparent 3px 14px)",
      }}
    />
    <div className="absolute inset-0 bg-canvas-deep/20" />
  </>
);

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <article className="h-full overflow-hidden border border-hairline-strong bg-surface/30 transition-transform duration-300 hover:-translate-y-1">
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-hairline-strong">
          <ChromaBackdrop />
          <div className="absolute inset-0 p-4">
            <div className="relative h-full w-full overflow-hidden rounded-lg border border-white/15 bg-canvas-deep shadow-2xl">
              <Image
                src={project.src}
                alt={project.title}
                width={700}
                height={480}
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas-deep via-transparent to-transparent" />

              <div className="absolute left-3 top-3 font-mono text-[11px] text-white border border-white/25 bg-canvas-deep/80 px-1.5 py-0.5">
                {pad(index)}
              </div>

              <div className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-wider text-white border border-white/25 bg-canvas-deep/80 px-2 py-1">
                Cover
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-xl font-medium tracking-tight text-white">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs text-body-strong">{project.category}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 pt-3">
          <ul className="space-y-2">
            {project.intigrationTechnologies?.slice(0, 3).map((item, i) => (
              <li key={i} className="flex gap-2.5 text-xs text-body">
                <span className="mt-1 h-3 w-0.5 shrink-0 bg-primary-glow" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 inline-flex items-center gap-2 border border-hairline-strong bg-transparent px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-body-strong transition-colors group-hover:bg-surface-elevated">
            View Project <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </article>
    </Link>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative w-full">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 pt-20">
        <span className="inline-flex items-center gap-2 border border-hairline-strong bg-surface-elevated/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-body-strong">
          <span className="h-1.5 w-1.5 bg-primary-glow" />
          Selected Work
        </span>
        <h2 className="mt-5 text-4xl md:text-6xl font-medium tracking-tight text-white">
          Projects
        </h2>
        <p className="mt-3 max-w-xl text-sm md:text-base text-body">
          {projects.length} shipped products — scroll to step through mobile
          apps and multi-tenant SaaS backends.
        </p>
      </div>

      {/* Grid layout */}
      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-6 pb-14 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
