"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import projects from "@/data/projects";
import { featuredProjects, FeaturedProject } from "@/data/featured";
import { ClinicMock, InterviewMock, SicadaMock } from "@/components/aw/project-mocks";
import PinnedRail from "@/components/aw/pinned-rail";

export const ProjectMock = ({ kind }: { kind: "interview" | "clinic" | "sicada" }) =>
  kind === "interview" ? <InterviewMock /> : kind === "clinic" ? <ClinicMock /> : <SicadaMock />;

/** Muted demo video in a phone frame; only loads/plays while on screen. */
export const PhoneVideo = ({ src, title, className }: { src: string; title: string; className?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "relative w-36 rounded-[1.6rem] bg-black p-[3px] shadow-2xl shadow-black/50 ring-1 ring-white/10 transition-transform duration-500 group-hover:-translate-y-2 md:w-44",
        className
      )}
    >
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`${title} app demo`}
        className="block aspect-[380/848] w-full rounded-[1.4rem] bg-[#0a0a0a] object-cover"
      />
    </div>
  );
};

/** Project card (awrs.me style) — used by the homepage rail and the /projects grid */
export const FeaturedCard = ({ item, index }: { item: FeaturedProject; index: number }) => {
  const project = projects.find((p) => p.id === item.id);
  if (!project) return null;
  const Icon = item.icon;
  const [from, to] = item.gradient;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="featured-card group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[var(--aw-border)] bg-[var(--aw-card)] transition-shadow duration-300 hover:shadow-2xl"
      style={{ ["--card-color" as any]: item.color }}
    >
      {/* Hover: rotating border, glow and top highlight */}
      <span aria-hidden className="featured-card-border pointer-events-none absolute inset-0 z-0 rounded-2xl" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent 10%, ${item.color} 50%, transparent 90%)` }}
      />

      {/* Meta row */}
      <div className="flex items-center gap-2.5 px-5 pb-2 pt-5">
        <span
          className="shrink-0 rounded-md px-2 py-0.5 font-mono text-[11px] font-black tabular-nums"
          style={{ backgroundColor: `${item.color}22`, color: item.color }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 border-t border-dashed border-[var(--aw-border)]" />
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-[var(--aw-text-tertiary)]">
          {item.category}
        </span>
        <span className="hidden flex-1 border-t border-dashed border-[var(--aw-border)] sm:block" />
        <span className="hidden shrink-0 font-mono text-[10px] text-[var(--aw-text-tertiary)] sm:block">{item.period}</span>
      </div>

      {/* Title */}
      <div className="flex items-center gap-3 px-5 pb-1.5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ring-[var(--aw-border)] transition-transform duration-300 group-hover:scale-105 md:h-11 md:w-11 md:rounded-2xl"
          style={{ backgroundColor: `${item.color}25` }}
        >
          <Icon className="h-5 w-5 md:h-6 md:w-6" style={{ color: item.color }} />
        </span>
        <h3 className="flex-1 truncate text-xl font-extrabold leading-tight text-[var(--aw-text)] md:text-2xl">
          {project.title}
        </h3>
        <span className="flex h-7 w-7 shrink-0 -translate-x-1 items-center justify-center rounded-full border border-[var(--aw-border)] text-[var(--aw-text-secondary)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* Padding lives on the wrapper: on the clamped element it would reveal part of a 3rd line */}
      <div className="px-5 pb-3">
        <p className="line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-[var(--aw-text-secondary)] md:min-h-[3.25rem] md:text-base">
          {item.summary}
        </p>
      </div>

      {/* Media */}
      <div
        className="featured-media relative mx-3 mb-3 overflow-hidden rounded-xl md:mx-4 md:mb-4"
        style={{ background: `linear-gradient(145deg, ${from}, ${to})` }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 0.8px, transparent 0.8px)",
            backgroundSize: "18px 18px",
          }}
        />
        {item.media.type === "mock" ? (
          <ProjectMock kind={item.media.mock} />
        ) : item.media.type === "video" ? (
          <div className="absolute inset-x-0 top-6 flex justify-center md:top-8">
            <PhoneVideo src={item.media.src} title={project.title} />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.media.src}
            alt={`${project.title} cover`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
      </div>

      {/* Tech */}
      <div className="mt-auto flex flex-wrap gap-1.5 px-5 pb-5">
        {item.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--aw-border)] bg-[var(--aw-bg-secondary)] px-3 py-1 text-xs text-[var(--aw-text-secondary)]"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
};

/**
 * Homepage "Featured Projects" (awrs.me style) — a pinned horizontal rail of
 * project cards ending in "View All Projects". The full list lives on /projects.
 */
const FeaturedProjectsSection = () => (
  <PinnedRail
    id="projects"
    title="Featured Projects"
    items={featuredProjects.map((item, i) => ({ key: item.id, node: <FeaturedCard item={item} index={i} /> }))}
    viewAll={{ href: "/projects", label: "View All Projects", sub: `${projects.length} projects — web, backend & mobile` }}
  />
);

export default FeaturedProjectsSection;
