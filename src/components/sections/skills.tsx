"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cloud, CreditCard, Monitor, Server, Smartphone, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SKILL_CATEGORIES, CategorizedSkill } from "@/data/constants";

const AUTO_ADVANCE_MS = 5000;

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Frontend: Monitor,
  Backend: Server,
  Mobile: Smartphone,
  "AI & Voice": Sparkles,
  "Cloud & DevOps": Cloud,
  "Payments & APIs": CreditCard,
  "Testing & Tools": Wrench,
};

/** "OCR (Azure Document Intelligence)" → ["OCR", "Azure Document Intelligence"] */
const splitLabel = (label: string): [string, string | null] => {
  const m = label.match(/^(.*?)\s*\((.+)\)\s*$/);
  return m ? [m[1], m[2]] : [label, null];
};

/** Near-white brand colours make a dull glow — fall back to the category accent */
const glowColor = (skill: CategorizedSkill, accent: string) =>
  /^#f{3,6}$/i.test(skill.color) ? accent : skill.color;

/**
 * Skills: a category menu beside a panel of that category's skills.
 * Categories auto-advance while the section is on screen; hovering pauses,
 * clicking picks one. On mobile the menu becomes a sideways-scrolling tab row.
 */
const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [userPicked, setUserPicked] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const total = SKILL_CATEGORIES.reduce((sum, c) => sum + c.skills.length, 0);
  const category = SKILL_CATEGORIES[index];
  const CategoryIcon = CATEGORY_ICONS[category.name] ?? Sparkles;
  const autoplay = inView && !hovering && !userPicked && !reduceMotion;

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % SKILL_CATEGORIES.length), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [autoplay, index]);

  // Keep the active tab visible in the mobile tab row (scroll the row only, never the page)
  useEffect(() => {
    const row = menuRef.current;
    const tab = row?.children[index] as HTMLElement | undefined;
    if (row && tab && row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: tab.offsetLeft - 24, behavior: "smooth" });
    }
  }, [index]);

  const pick = (i: number) => {
    setIndex(i);
    setUserPicked(true); // a deliberate choice stops the auto-advance
  };

  return (
    <section ref={sectionRef} id="skills" className="py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-[var(--aw-text)] md:text-4xl">Skills</h2>
        <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--aw-text-secondary)] md:text-base">
          {total}+ technologies across frontend, backend, mobile, AI and cloud — the toolkit I use to take products from
          idea to production.
        </p>
      </div>

      <div
        className="mx-auto max-w-6xl px-6"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="grid gap-4 md:grid-cols-[260px_minmax(0,1fr)] md:gap-5">
          {/* Category menu */}
          <div
            ref={menuRef}
            role="tablist"
            aria-label="Skill categories"
            aria-orientation="vertical"
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-col md:gap-1.5 md:overflow-visible md:px-0 md:pb-0"
          >
            {SKILL_CATEGORIES.map((c, i) => {
              const Icon = CATEGORY_ICONS[c.name] ?? Sparkles;
              const selected = i === index;
              return (
                <button
                  key={c.name}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => pick(i)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-3 overflow-hidden rounded-xl border px-3.5 py-2.5 text-left transition-colors md:py-3",
                    selected
                      ? "bg-[var(--aw-card)]"
                      : "border-transparent text-[var(--aw-text-secondary)] hover:bg-[var(--aw-card)] hover:text-[var(--aw-text)]"
                  )}
                  style={selected ? { borderColor: `${c.accent}55` } : undefined}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors"
                    style={{ backgroundColor: selected ? `${c.accent}26` : "var(--aw-bg-tertiary)" }}
                  >
                    <Icon className="h-4 w-4" style={{ color: selected ? c.accent : "var(--aw-text-tertiary)" }} />
                  </span>
                  <span
                    className="flex-1 whitespace-nowrap text-sm font-semibold"
                    style={{ color: selected ? "var(--aw-text)" : undefined }}
                  >
                    {c.name}
                  </span>
                  <span className="hidden font-mono text-xs text-[var(--aw-text-tertiary)] md:inline">
                    {String(c.skills.length).padStart(2, "0")}
                  </span>

                  {/* Auto-advance timer */}
                  {selected && autoplay && (
                    <span
                      key={`timer-${index}`}
                      className="skill-timer absolute inset-x-0 bottom-0 h-[2px]"
                      style={{ backgroundColor: c.accent, animationDuration: `${AUTO_ADVANCE_MS}ms` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            className="relative overflow-hidden rounded-2xl border border-[var(--aw-border)] bg-[var(--aw-card)] md:min-h-[460px]"
            role="tabpanel"
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl transition-colors duration-700"
              style={{ backgroundColor: `${category.accent}1f` }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={category.name}
                className="relative p-5 md:p-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6 flex items-start gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
                    style={{
                      borderColor: `${category.accent}55`,
                      backgroundColor: `${category.accent}1a`,
                      boxShadow: `0 0 28px -4px ${category.accent}55`,
                    }}
                  >
                    <CategoryIcon className="h-6 w-6" style={{ color: category.accent }} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-[var(--aw-text)] md:text-2xl">{category.name}</h3>
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                        style={{ backgroundColor: `${category.accent}22`, color: category.accent }}
                      >
                        {category.skills.length} skills
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[var(--aw-text-secondary)]">{category.tagline}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-3">
                  {category.skills.map((skill, i) => {
                    const [main, sub] = splitLabel(skill.label);
                    return (
                      <motion.div
                        key={skill.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.03, duration: 0.3 }}
                        className="skill-card flex items-center gap-2.5 rounded-xl border border-[var(--aw-border)] bg-[var(--aw-bg-secondary)] px-2.5 py-2.5 sm:gap-3 sm:px-3.5 sm:py-3"
                        style={{ ["--skill-color" as any]: glowColor(skill, category.accent) }}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--aw-bg-tertiary)] sm:h-9 sm:w-9">
                          {skill.icon ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={skill.icon} alt="" loading="lazy" className="skill-icon h-5 w-5 object-contain" />
                          ) : (
                            <CategoryIcon className="skill-icon h-4 w-4" style={{ color: category.accent }} />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block break-words text-[13px] font-semibold leading-tight text-[var(--aw-text)] sm:text-sm">
                            {main}
                          </span>
                          {sub && (
                            <span className="mt-0.5 block break-words text-[11px] leading-tight text-[var(--aw-text-tertiary)] sm:text-xs">
                              {sub}
                            </span>
                          )}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
