"use client";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import {
  SKILL_CATEGORIES,
  CategorizedSkill,
  SkillCategory,
} from "@/data/constants";
import { motion } from "framer-motion";

/* ── Glitchy chromatic display heading ──────────────────────────── */
const GlitchHeading = ({ children }: { children: string }) => (
  <h2 className="relative inline-block font-display text-4xl md:text-6xl font-semibold tracking-tight text-white">
    <span
      aria-hidden
      className="absolute inset-0 text-cyan/70 mix-blend-screen animate-glitch"
      style={{ transform: "translateX(-2px)" }}
    >
      {children}
    </span>
    <span
      aria-hidden
      className="absolute inset-0 text-[#ff3d71]/70 mix-blend-screen animate-glitch"
      style={{ transform: "translateX(2px)", animationDelay: "0.4s" }}
    >
      {children}
    </span>
    <span className="relative">{children}</span>
  </h2>
);

/* ── Animated chromatic-bars visual with the category's hero icon ── */
const ChromaticPanel = ({
  accent,
  icon,
}: {
  accent: string;
  icon: string;
}) => (
  <div className="relative h-28 w-full overflow-hidden rounded-lg border border-hairline bg-canvas-deep">
    {/* moving chromatic spectrum */}
    <div
      className="absolute inset-0 animate-chroma opacity-80"
      style={{
        backgroundImage: `linear-gradient(90deg, ${accent}, #00d4ff, #7b3aed, #ff3d71, ${accent})`,
        backgroundSize: "200% 100%",
        filter: "saturate(1.2)",
      }}
    />
    {/* vertical aberration stripes */}
    <div
      className="absolute inset-0 mix-blend-overlay opacity-40"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, rgba(0,0,0,0.5) 0 2px, transparent 2px 10px)",
      }}
    />
    {/* icon plate */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-canvas-deep/90 backdrop-blur-sm shadow-2xl">
        <img src={icon} alt="" className="h-7 w-7 object-contain" />
      </div>
    </div>
  </div>
);

/* ── A skill chip (icon + label) ────────────────────────────────── */
const Chip = ({ skill }: { skill: CategorizedSkill }) => (
  <span className="group/chip inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface-elevated px-2 py-1 transition-colors hover:border-foreground/25">
    <img src={skill.icon} alt="" loading="lazy" className="h-3.5 w-3.5 object-contain" />
    <span className="text-[11px] font-medium text-body transition-colors group-hover/chip:text-white">
      {skill.label}
    </span>
  </span>
);

/* ── Feature card per category ──────────────────────────────────── */
const FeatureCard = ({
  category,
  index,
  full,
}: {
  category: SkillCategory;
  index: number;
  full?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className={cn(
      "group relative flex flex-col gap-4 rounded-xl border border-hairline-strong bg-surface/40 p-5 transition-colors hover:border-foreground/25",
      full && "lg:col-span-2"
    )}
  >
    {/* accent glow on hover */}
    <div
      className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ background: `radial-gradient(60% 60% at 50% 0%, ${category.accent}18, transparent 70%)` }}
    />

    <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="text-lg md:text-xl font-semibold text-white">
            {category.name}
          </h3>
          <span
            className="rounded-full border px-2 py-0.5 text-[10px] font-mono"
            style={{
              color: category.accent,
              borderColor: `${category.accent}55`,
              background: `${category.accent}11`,
            }}
          >
            {category.skills.length}
          </span>
        </div>
        <p className="mt-1.5 text-xs md:text-sm text-body">{category.tagline}</p>
      </div>
      <div className={cn("w-full lg:w-44 shrink-0", full && "lg:w-64")}>
        <ChromaticPanel accent={category.accent} icon={category.skills[0].icon} />
      </div>
    </div>

    <div className="relative flex flex-wrap gap-1.5">
      {category.skills.map((skill) => (
        <Chip key={skill.label} skill={skill} />
      ))}
    </div>
  </motion.div>
);

/* ── Decorative node-connector strip ────────────────────────────── */
const ConnectorStrip = () => (
  <div className="my-8 flex items-stretch gap-1.5 opacity-50">
    {Array.from({ length: 16 }).map((_, i) => (
      <div
        key={i}
        className={cn(
          "h-3 flex-1 border-t border-hairline-strong",
          i % 3 === 0 && "border-l"
        )}
      />
    ))}
  </div>
);

const SkillsSection = () => {
  const total = SKILL_CATEGORIES.reduce((n, c) => n + c.skills.length, 0);
  const odd = SKILL_CATEGORIES.length % 2 === 1;

  return (
    <section id="skills" className="w-full min-h-screen py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header — Composio "FOR DEVELOPERS" style */}
        <div className="mb-10">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 border border-hairline-strong bg-surface-elevated/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-body-strong"
          >
            <span className="h-1.5 w-1.5 bg-primary-glow" />
            For Developers
          </motion.span>

          <div className="mt-5">
            <Link href={"#skills"}>
              <GlitchHeading>TECH STACK</GlitchHeading>
            </Link>
          </div>

          <p className="mt-4 max-w-2xl text-sm md:text-base text-body">
            {total}+ technologies across the full stack — native Android and
            React Native on the front, multi-tenant NestJS backends, AI/voice
            pipelines and AWS infrastructure behind them.
          </p>

          <Link
            href="#projects"
            className="mt-6 inline-flex w-fit items-center border border-hairline-strong bg-transparent px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-body-strong transition-colors hover:bg-surface-elevated"
          >
            View Projects
          </Link>
        </div>

        <ConnectorStrip />

        {/* Feature card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {SKILL_CATEGORIES.map((category, index) => (
            <FeatureCard
              key={category.name}
              category={category}
              index={index}
              full={odd && index === SKILL_CATEGORIES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
