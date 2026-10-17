"use client";

import React, { useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CalendarDays, Download, Eye, FolderGit2, GraduationCap, Server, Zap } from "lucide-react";
import SpotlightCard from "@/components/aw/spotlight-card";
import Watch from "@/components/aw/watch";
import Counter from "@/components/aw/counter";
import { config } from "@/data/config";
import { aboutIntro, education, quote, stats, Stat } from "@/data/profile";

// WebGL — client only
const Globe = dynamic(() => import("@/components/aw/globe"), { ssr: false });

const STAT_ICONS: Record<Stat["icon"], React.ElementType> = {
  projects: FolderGit2,
  years: CalendarDays,
  api: Server,
  skills: Zap,
};

const CARD = "rounded-2xl border border-[var(--aw-border)] bg-[var(--aw-card)]";

const RESUME_URL = "/assets/Nayan-Resume.pdf";
const RESUME_FILENAME = "Nayan-Mehta-Full-Stack-Developer.pdf";

/** Adds `.is-visible` to the root once in view and plays each [data-reveal] entrance. */
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        root.classList.add("is-visible");
        if (reduce) return;
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          const delay = Number(el.dataset.revealDelay ?? 0);
          const pop = el.dataset.reveal === "pop";
          el.animate(
            [
              { opacity: 0, translate: "0 50px", scale: pop ? "0.9" : "1" },
              { opacity: 1, translate: "0 0", scale: "1" },
            ],
            {
              duration: 700,
              delay,
              easing: pop ? "cubic-bezier(0.34, 1.4, 0.64, 1)" : "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "backwards",
            }
          );
        });
      },
      { threshold: 0.15 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return ref;
};

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  const Icon = STAT_ICONS[stat.icon];
  const [ringDur, dotDur, reverseDur] = stat.orbit;

  const tilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.transform = `perspective(800px) rotateY(${10 * x}deg) rotateX(${-10 * y}deg) translateZ(8px)`;
  }, []);
  const untilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  }, []);

  return (
    <div className={`impact-stat-float impact-stat-float-${index + 1}`} data-reveal="pop" data-reveal-delay={index * 120}>
      <SpotlightCard
        className="impact-stat rounded-2xl border border-[var(--aw-border)] bg-[var(--aw-bg-secondary)]"
        spotlightColor={stat.glow}
        style={{ ["--stat-accent" as any]: stat.color, ["--stat-glow" as any]: stat.glow }}
      >
        <div className="impact-stat-border" />
        <div className="impact-stat-tilt relative z-10 p-5 md:p-6" onMouseMove={tilt} onMouseLeave={untilt}>
          <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center md:h-24 md:w-24">
            <div
              className="impact-stat-glow absolute rounded-full"
              style={{ inset: "-15%", background: `radial-gradient(circle, ${stat.color}15 0%, transparent 70%)` }}
            />
            <svg className="impact-orbit absolute inset-0 h-full w-full" viewBox="0 0 120 120" style={{ animationDuration: `${ringDur}s` }}>
              <circle cx="60" cy="60" r="50" fill="none" strokeWidth="1" strokeDasharray="4 8" style={{ stroke: stat.color }} opacity="0.25" />
            </svg>
            <svg className="impact-orbit-dot absolute inset-0 h-full w-full" viewBox="0 0 120 120" style={{ animationDuration: `${dotDur}s` }}>
              <circle cx="60" cy="10" r="2.5" fill={stat.color} opacity="0.6" />
            </svg>
            <svg className="impact-orbit-dot-reverse absolute inset-0 h-full w-full" viewBox="0 0 120 120" style={{ animationDuration: `${reverseDur}s` }}>
              <circle cx="110" cy="60" r="2" fill={stat.color} opacity="0.4" />
            </svg>
            <p className="relative text-2xl font-bold md:text-3xl" style={{ color: stat.color }}>
              <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} durationMs={1500} />
            </p>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="opacity-60" style={{ color: stat.color }}>
              <Icon className="h-4 w-4" />
            </span>
            <p className="text-xs font-medium text-[var(--aw-text-secondary)] md:text-sm">{stat.label}</p>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

const AboutSection = () => {
  const ref = useReveal();

  const moveStatsGlow = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - r.top}px`);
  }, []);

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto mb-16 max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-[var(--aw-text)] md:text-4xl">About Me</h2>
        <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div ref={ref} className="reveal-root grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12">
          {/* ── Row 1 ─────────────────────────────────────── */}
          <SpotlightCard className={`md:col-span-6 lg:col-span-4 ${CARD}`} data-reveal="" data-reveal-delay={0}>
            <div className="relative z-10 p-6 md:p-8">
              <div className="mb-6 flex items-center gap-5">
                <div className="avatar-ring shrink-0 rounded-full p-[3px]">
                  <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full bg-[var(--aw-card)] md:h-24 md:w-24">
                    <Image
                      src={aboutIntro.photo}
                      alt={config.author}
                      fill
                      sizes="96px"
                      priority
                      className="object-cover object-[50%_30%]"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="gradient-text text-xl font-bold md:text-2xl">{config.author}</h3>
                  <p className="mt-1 text-sm text-[var(--aw-text-secondary)]">{aboutIntro.role}</p>
                </div>
              </div>
              <p className="text-base leading-relaxed text-[var(--aw-text-secondary)] md:text-lg">{aboutIntro.bio}</p>
            </div>
          </SpotlightCard>

          <SpotlightCard
            className={`orbital-card-top md:col-span-3 lg:col-span-4 ${CARD}`}
            data-reveal=""
            data-reveal-delay={150}
          >
            <div className="relative z-10 flex h-full flex-col p-5 md:p-6">
              <span className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--aw-text-tertiary)]">
                Flexible with Timezones
              </span>
              <h3 className="text-lg font-bold leading-snug text-[var(--aw-text)] md:text-xl">
                {aboutIntro.location}, <span className="text-[var(--aw-text-secondary)]">{aboutIntro.availability}</span>
              </h3>
              <div className="-mx-6 -mb-72 mt-3 flex justify-center">
                <Globe size={420} />
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className={`md:col-span-3 lg:col-span-4 ${CARD}`} data-reveal="" data-reveal-delay={300}>
            <div className="relative z-10 flex h-full flex-col p-5 md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">Education</span>
              </div>
              <div className="flex flex-1 flex-col justify-center space-y-3">
                {education.map((ed) => (
                  <div key={ed.degree} className="rounded-xl bg-[var(--aw-bg-secondary)] p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold leading-tight text-[var(--aw-text)]">{ed.school}</p>
                        <p className="mt-1 text-xs text-[var(--aw-text-secondary)]">{ed.degree}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                        {ed.status}
                      </span>
                    </div>
                    <span className="mt-2 inline-block text-[11px] font-medium text-[var(--aw-text-tertiary)]">{ed.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* ── Row 2: CTA · watch · quote ────────────────── */}
          <div className="md:col-span-6 lg:col-span-12">
            <div className="orbital-grid">
              <SpotlightCard
                className={`available-card orbital-card-start ${CARD}`}
                spotlightColor="rgba(34, 197, 94, 0.1)"
                data-reveal=""
                data-reveal-delay={0}
              >
                <div className="orbital-content-start relative z-10 flex flex-col overflow-hidden p-5 md:h-full md:p-6">
                  <div className="available-bg-gradient absolute inset-0 rounded-2xl" />
                  <div className="available-border-ring absolute inset-0 rounded-2xl" />
                  <div className="relative mb-3 flex items-center gap-2 md:mb-auto">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="available-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-400">Available for Work</span>
                  </div>
                  <div className="relative flex flex-row items-center gap-4 md:flex-1 md:flex-col md:items-start md:justify-center md:gap-0">
                    <p className="flex-1 text-[1.05rem] font-extrabold leading-[1.2] tracking-tight md:flex-none md:text-[1.6rem]">
                      <span className="block text-[var(--aw-text-secondary)]">HAVE A VISION?</span>
                      <span className="gradient-text block">LET&apos;S BUILD IT</span>
                      <span className="block font-medium italic text-[var(--aw-text-tertiary)]">together.</span>
                    </p>
                    {/* Resume: view in a new tab, or download */}
                    <div className="flex shrink-0 flex-col gap-2 md:mt-4 md:flex-row md:self-start">
                      <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-download-btn relative inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-semibold md:gap-2 md:px-5 md:py-2.5 md:text-sm"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Resume</span>
                      </a>
                      <a
                        href={RESUME_URL}
                        download={RESUME_FILENAME}
                        aria-label="Download resume (PDF)"
                        className="cv-download-btn relative inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-semibold md:gap-2 md:px-5 md:py-2.5 md:text-sm"
                      >
                        <Download className="cv-download-icon h-4 w-4" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                </div>
              </SpotlightCard>

              <div className="orbital-clock-cell relative flex items-center justify-center" data-reveal="" data-reveal-delay={120}>
                <div className="clock-halo" />
                <Watch size={360} />
              </div>

              <SpotlightCard
                className={`orbital-card-end ${CARD}`}
                spotlightColor="rgba(212, 84, 126, 0.12)"
                data-reveal=""
                data-reveal-delay={240}
              >
                <div className="orbital-content-end relative z-10 flex h-full flex-col justify-center overflow-hidden p-5 md:p-6">
                  <svg className="absolute end-4 top-3 h-12 w-12 text-primary/[0.07]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <div className="relative">
                    <p className="text-lg font-bold leading-snug md:text-xl">
                      <span className="gradient-text italic">{quote.text}</span>
                    </p>
                    <div className="mt-4 border-t border-primary/15 pt-3">
                      <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--aw-text-tertiary)]">
                        {quote.author}
                      </span>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>

          {/* ── Row 3: impact stats ───────────────────────── */}
          <SpotlightCard
            className={`impact-stats-outer orbital-card-bottom md:col-span-6 lg:col-span-12 ${CARD}`}
            spotlightColor="rgba(212, 84, 126, 0.12)"
          >
            <div className="orbital-content-bottom relative z-10 p-5 md:p-8" onMouseMove={moveStatsGlow}>
              <div className="impact-stats-glow" />
              <div className="relative z-10 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
                {stats.map((s, i) => (
                  <StatCard key={s.label} stat={s} index={i} />
                ))}
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
