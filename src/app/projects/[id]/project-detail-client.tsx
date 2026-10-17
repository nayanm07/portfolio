"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Download,
  Globe,
  LayoutGrid,
  MonitorSmartphone,
  Server,
  UserRound,
} from "lucide-react";
import { SiAndroid, SiApple, SiAppstore, SiGoogleplay } from "react-icons/si";
import projects, { Project } from "@/data/projects";
import { projectCards } from "@/data/featured";
import { projectDetails, Platform, ProjectLink } from "@/data/project-details";
import { PhoneVideo, ProjectMock } from "@/components/sections/featured-projects";

const PLATFORM_ICONS: Record<Platform, { icon: React.ElementType; label: string }> = {
  android: { icon: SiAndroid, label: "Android" },
  ios: { icon: SiApple, label: "iOS" },
  web: { icon: Globe, label: "Web" },
  api: { icon: Server, label: "API" },
};

const LINK_ICONS: Record<ProjectLink["kind"], React.ElementType> = {
  web: Globe,
  playstore: SiGoogleplay,
  appstore: SiAppstore,
  apk: Download,
};

/** Reveal a block when it scrolls into view */
const Reveal = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-6 text-xl font-bold text-[var(--aw-text)] md:text-2xl">{children}</h2>
);

/** awrs.me-style project detail page */
export function ProjectDetailClient({ project }: { project: Project }) {
  const card = projectCards.find((c) => c.id === project.id);
  const detail = projectDetails[project.id];
  const color = card?.color ?? "#d4547e";
  const Icon = card?.icon ?? LayoutGrid;

  // Store links live in data/projects.tsx; web links in project-details.ts
  const links: ProjectLink[] = [
    ...(detail?.links ?? []),
    ...(project.playStore ? [{ label: "Google Play", href: project.playStore, kind: "playstore" as const }] : []),
    ...(project.appStore ? [{ label: "App Store", href: project.appStore, kind: "appstore" as const }] : []),
    ...(project.apkDownload ? [{ label: "Download APK", href: project.apkDownload, kind: "apk" as const }] : []),
    ...(project.live ? [{ label: "Live site", href: project.live, kind: "web" as const }] : []),
  ];

  const builtWith = [...project.skills.frontend, ...project.skills.backend].filter(
    (s, i, all) => all.findIndex((x) => x.title === s.title) === i
  );

  const order = projectCards.map((c) => c.id);
  const next = projectCards[(order.indexOf(project.id) + 1) % projectCards.length];

  const meta = detail
    ? [
        { icon: LayoutGrid, label: "Type", value: <>{detail.type}</> },
        {
          icon: MonitorSmartphone,
          label: "Platform",
          value: (
            <span className="flex items-center gap-2.5">
              {detail.platforms.map((p) => {
                const P = PLATFORM_ICONS[p];
                return (
                  <span key={p} className="inline-flex items-center gap-1" title={P.label}>
                    <P.icon className="h-3.5 w-3.5" /> <span className="text-xs">{P.label}</span>
                  </span>
                );
              })}
            </span>
          ),
        },
        { icon: CalendarDays, label: "Released", value: <>{detail.released}</> },
        { icon: UserRound, label: "Role", value: <>{detail.role}</> },
      ]
    : [];

  return (
    <main className="min-h-screen bg-[var(--aw-bg)] text-[var(--aw-text)]">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--aw-border)]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 20% 30%, ${color}22 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 80% 70%, ${color}18 0%, transparent 50%),
              radial-gradient(ellipse 100% 50% at 50% 0%, ${color}28 0%, transparent 40%)`,
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -end-24 -top-24 h-[400px] w-[400px] rounded-full opacity-20 blur-[120px]" style={{ backgroundColor: color }} />
          <div className="absolute -start-32 top-1/2 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]" style={{ backgroundColor: color }} />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`, backgroundSize: "24px 24px" }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 md:pt-32">
          <Link
            href="/projects"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[var(--aw-text-secondary)] transition-colors hover:text-[var(--aw-text)]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>

          <motion.div
            className="mb-5 flex items-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative shrink-0">
              <span
                aria-hidden
                className="avatar-ring absolute -inset-[2px] rounded-[1.1rem]"
                style={{
                  background: `conic-gradient(from var(--gradient-angle), ${color}, ${color}55, ${color}, ${color}55, ${color})`,
                }}
              />
              <span
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--aw-bg)] md:h-[72px] md:w-[72px]"
                style={{ boxShadow: `inset 0 0 0 100px ${color}22` }}
              >
                <Icon className="h-8 w-8" style={{ color }} />
              </span>
            </span>
            <h1 className="text-4xl font-extrabold md:text-5xl lg:text-6xl">{project.title}</h1>
          </motion.div>

          <motion.p
            className="max-w-2xl text-lg leading-relaxed text-[var(--aw-text-secondary)] md:text-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {card?.summary ?? project.category}
          </motion.p>

          {links.length > 0 && (
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {links.map((l, i) => {
                const L = LINK_ICONS[l.kind];
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                    style={
                      i === 0
                        ? { backgroundColor: color, borderColor: color, color: "#fff", boxShadow: `0 10px 24px -6px ${color}66` }
                        : { backgroundColor: "var(--aw-card)", borderColor: "var(--aw-border)", color: "var(--aw-text)" }
                    }
                  >
                    <L className="h-4 w-4" /> {l.label}
                  </a>
                );
              })}
            </motion.div>
          )}

          {meta.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {meta.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="rounded-xl border border-[var(--aw-border)] bg-[var(--aw-card)]/80 p-4 backdrop-blur"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                >
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--aw-text-tertiary)]">
                    <m.icon className="h-3.5 w-3.5" style={{ color }} /> {m.label}
                  </span>
                  <div className="mt-2 text-sm font-semibold text-[var(--aw-text)]">{m.value}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        {/* ── Overview ─────────────────────────────────────── */}
        {detail && (
          <Reveal>
            <div className="rounded-2xl border border-[var(--aw-border)] bg-[var(--aw-card)] p-6 md:p-8">
              <p className="text-base leading-relaxed text-[var(--aw-text-secondary)] md:text-lg">{detail.overview}</p>
            </div>
          </Reveal>
        )}

        {/* ── Core features ────────────────────────────────── */}
        {detail && (
          <Reveal className="mt-16">
            <SectionTitle>Core Features</SectionTitle>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {detail.features.map((f, i) => (
                <motion.div
                  key={f}
                  className={i === 0 ? "sm:col-span-2" : undefined}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.04 }}
                >
                  <div
                    className="group flex h-full items-start gap-3 rounded-xl border border-[var(--aw-border)] bg-[var(--aw-card)] px-4 py-3.5 transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${color}66`)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
                  >
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${color}26`, boxShadow: `0 0 0 3px ${color}10` }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                    </span>
                    <span className="text-sm leading-relaxed text-[var(--aw-text-secondary)] group-hover:text-[var(--aw-text)]">
                      {f}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        )}

        {/* ── Built with ───────────────────────────────────── */}
        {builtWith.length > 0 && (
          <Reveal className="mt-16">
            <SectionTitle>Built With</SectionTitle>
            <div className="flex flex-wrap gap-3">
              {builtWith.map((s) => (
                <div
                  key={s.title}
                  className="flex min-w-[96px] flex-col items-center gap-2.5 rounded-xl border border-[var(--aw-border)] bg-[var(--aw-card)] px-4 py-4 transition-all duration-300 hover:-translate-y-1"
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${color}66`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
                >
                  <span className="flex h-7 w-7 items-center justify-center text-2xl [&_img]:h-6 [&_img]:w-6" style={{ color }}>
                    {s.icon}
                  </span>
                  <span className="text-xs font-semibold text-[var(--aw-text)]">{s.title}</span>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* ── Stats ────────────────────────────────────────── */}
        {detail && detail.stats.length > 0 && (
          <Reveal className="mt-16">
            <div className={`grid gap-3 ${detail.stats.length >= 4 ? "grid-cols-2 md:grid-cols-4" : detail.stats.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
              {detail.stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center rounded-2xl border bg-[var(--aw-card)] px-3 py-6 text-center"
                  style={
                    s.highlight
                      ? { borderColor: `${color}88`, boxShadow: `0 0 32px -10px ${color}88`, backgroundColor: `${color}0d` }
                      : { borderColor: "var(--aw-border)" }
                  }
                >
                  <span className="text-2xl font-extrabold md:text-3xl" style={{ color }}>
                    {s.value}
                  </span>
                  <span className="mt-1 text-xs text-[var(--aw-text-secondary)] md:text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      {/* ── Preview ────────────────────────────────────────── */}
      {card && (
        <Reveal className="mx-auto max-w-5xl px-6">
          <SectionTitle>Preview</SectionTitle>
          <div
            className="relative overflow-hidden rounded-2xl border border-[var(--aw-border)]"
            style={{ background: `linear-gradient(145deg, ${card.gradient[0]}, ${card.gradient[1]})` }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 0.8px, transparent 0.8px)",
                backgroundSize: "18px 18px",
              }}
            />
            {card.media.type === "mock" ? (
              <div className="relative aspect-[5/3] w-full">
                <ProjectMock kind={card.media.mock} />
              </div>
            ) : card.media.type === "video" ? (
              <div className="relative flex justify-center px-6 py-10 md:py-14">
                <PhoneVideo src={card.media.src} title={project.title} className="w-56 md:w-64" />
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={card.media.src} alt={`${project.title} cover`} className="relative block w-full" />
            )}
          </div>
        </Reveal>
      )}

      {/* ── Next project ───────────────────────────────────── */}
      {next && next.id !== project.id && (
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <Link
            href={`/projects/${next.id}`}
            className="group flex items-center gap-4 rounded-2xl border border-[var(--aw-border)] bg-[var(--aw-card)] p-5 transition-colors hover:border-primary/50"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${next.color}22` }}
            >
              <next.icon className="h-5 w-5" style={{ color: next.color }} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-[var(--aw-text-tertiary)]">
                Next project
              </span>
              <span className="block truncate font-semibold text-[var(--aw-text)]">
                {projects.find((p) => p.id === next.id)?.title}
                <span className="ml-2 font-normal text-[var(--aw-text-tertiary)]">{next.category}</span>
              </span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </main>
  );
}
