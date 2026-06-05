"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Link from "next/link";
import projects, { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const pad = (n: number) => (n + 1).toString().padStart(2, "0");

/* Chromatic animated backdrop behind the centre mockup */
const ChromaBackdrop = () => (
  <>
    <div
      className="absolute inset-0 animate-chroma opacity-90"
      style={{
        backgroundImage:
          "linear-gradient(120deg, #00d4ff, #0007cd, #1a26ff, #00d4ff, #7b3aed)",
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

/* ── Right-hand detail copy for the active project ──────────────── */
const Detail = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    key={project.id}
    initial={{ y: "100%" }}
    animate={{ y: "0%" }}
    exit={{ y: "-100%" }}
    transition={{ type: "spring", stiffness: 240, damping: 30 }}
    className="absolute inset-0 flex flex-col justify-center"
  >
    <div className="font-mono text-xs text-muted-soft border border-hairline-strong w-fit px-2 py-1">
      {pad(index)}
    </div>
    <h3 className="mt-5 text-3xl xl:text-4xl font-medium tracking-tight text-white">
      {project.title}
    </h3>
    <p className="mt-3 text-sm text-body max-w-md">{project.category}</p>

    <ul className="mt-6 space-y-3 max-w-md">
      {project.intigrationTechnologies?.slice(0, 3).map((t, i) => (
        <li key={i} className="flex gap-3 text-sm text-body">
          <span className="mt-1 h-4 w-0.5 shrink-0 bg-primary-glow" />
          <span>{t}</span>
        </li>
      ))}
    </ul>

    <Link
      href={`/projects/${project.id}`}
      className="mt-8 inline-flex w-fit items-center gap-2 border border-hairline-strong bg-transparent px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-body-strong transition-colors hover:bg-surface-elevated"
    >
      View Project <ArrowUpRight className="h-3.5 w-3.5" />
    </Link>
  </motion.div>
);

/* ── Desktop scroll-pinned showcase ─────────────────────────────── */
const ScrollShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = projects.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    setActive(i);
  });

  const goTo = (i: number) => {
    if (!ref.current) return;
    const top = ref.current.offsetTop + i * window.innerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const project = projects[active];

  return (
    <div ref={ref} style={{ height: `${n * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-6 px-6">
          {/* Left nav */}
          <nav className="col-span-3 flex flex-col justify-center">
            <ul className="border-t border-hairline-strong">
              {projects.map((p, i) => {
                const on = i === active;
                return (
                  <li key={p.id} className="border-b border-hairline-strong">
                    <button
                      onClick={() => goTo(i)}
                      className={cn(
                        "group flex w-full items-center gap-3 px-3 py-3.5 text-left transition-colors",
                        on ? "bg-surface" : "hover:bg-surface/40"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center font-mono text-[11px] transition-colors",
                          on
                            ? "bg-primary text-white"
                            : "text-muted-soft border border-hairline"
                        )}
                      >
                        {pad(i)}
                      </span>
                      <span
                        className={cn(
                          "font-mono text-[13px] uppercase tracking-wide truncate transition-colors",
                          on ? "text-white" : "text-muted group-hover:text-body"
                        )}
                      >
                        {p.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Centre chromatic mockup — card deck (pop / push) */}
          <div className="col-span-5 flex items-center justify-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-hairline-strong">
              <ChromaBackdrop />
              <div className="absolute inset-0 p-8">
                <div className="relative h-full w-full">
                  {projects.map((p, i) => {
                    const offset = i - active;
                    const popped = offset < 0;
                    const depth = Math.max(0, Math.min(offset, 3));
                    return (
                      <motion.div
                        key={p.id}
                        initial={false}
                        animate={
                          popped
                            ? { y: "-130%", scale: 0.92, rotate: -6 }
                            : {
                                y: `${depth * 6}%`,
                                scale: 1 - depth * 0.05,
                                rotate: 0,
                              }
                        }
                        transition={{ type: "spring", stiffness: 220, damping: 28 }}
                        style={{ zIndex: popped ? 50 : 40 - depth }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="relative w-full overflow-hidden rounded-lg border border-white/15 bg-canvas-deep shadow-2xl">
                          <Image
                            src={p.src}
                            alt={p.title}
                            width={640}
                            height={420}
                            className="w-full h-auto"
                          />
                          {/* depth dimming for cards behind the top */}
                          <div
                            className="pointer-events-none absolute inset-0 bg-canvas-deep transition-opacity"
                            style={{ opacity: depth * 0.18 }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right detail — vertical push */}
          <div className="col-span-4 relative overflow-hidden">
            <AnimatePresence initial={false}>
              <Detail key={project.id} project={project} index={active} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Mobile stacked fallback ────────────────────────────────────── */
const MobileList = () => (
  <div className="max-w-xl mx-auto px-4 flex flex-col gap-10">
    {projects.map((project, index) => (
      <Link key={project.id} href={`/projects/${project.id}`} className="group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-hairline-strong">
          <ChromaBackdrop />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <Image
              src={project.src}
              alt={project.title}
              width={520}
              height={340}
              className="w-full h-auto rounded-lg border border-white/15 shadow-2xl"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="font-mono text-[11px] text-muted-soft border border-hairline px-1.5 py-0.5">
            {pad(index)}
          </span>
          <h3 className="text-xl font-medium text-white">{project.title}</h3>
        </div>
        <p className="mt-1 text-sm text-body">{project.category}</p>
      </Link>
    ))}
  </div>
);

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

      {/* Desktop pinned showcase / mobile stack */}
      <div className="hidden lg:block mt-6">
        <ScrollShowcase />
      </div>
      <div className="lg:hidden mt-12 pb-12">
        <MobileList />
      </div>
    </section>
  );
};

export default ProjectsSection;
