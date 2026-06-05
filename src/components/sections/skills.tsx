"use client";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { BoxReveal } from "../reveal-animations";
import { cn } from "@/lib/utils";
import { SKILL_CATEGORIES, CategorizedSkill, SkillCategory } from "@/data/constants";
import { motion } from "framer-motion";

const SkillCard = ({ skill }: { skill: CategorizedSkill }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.9 },
        show: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ y: -6 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-2xl"
    >
      {/* Accent gradient border that lights up on hover */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${skill.color}66, transparent 60%)`,
        }}
      />

      <div
        className={cn(
          "relative h-full rounded-2xl overflow-hidden",
          "bg-zinc-900/40 backdrop-blur-md border border-white/10",
          "transition-colors duration-300 group-hover:border-white/20"
        )}
      >
        {/* Cursor-following torch tinted with the skill's brand color */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 140px at ${pos.x}px ${pos.y}px, ${skill.color}26, transparent 70%)`,
            }}
          />
        )}

        <div className="relative z-10 flex flex-col items-center justify-center gap-3 px-3 py-6">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${skill.color}14` }}
          >
            <img
              src={skill.icon}
              alt={skill.label}
              loading="lazy"
              className="w-7 h-7 object-contain"
            />
          </div>
          <h3 className="text-[11px] sm:text-xs font-medium text-center text-zinc-400 group-hover:text-white transition-colors duration-300 leading-tight">
            {skill.label}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

const CategoryBlock = ({ category, index }: { category: SkillCategory; index: number }) => {
  return (
    <div className="mb-14 last:mb-0">
      {/* Category header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-6"
      >
        <span
          className="h-9 w-1.5 rounded-full"
          style={{ background: category.accent, boxShadow: `0 0 18px ${category.accent}` }}
        />
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-xl md:text-2xl font-semibold text-white">
              {category.name}
            </h3>
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
              style={{
                color: category.accent,
                borderColor: `${category.accent}55`,
                background: `${category.accent}11`,
              }}
            >
              {category.skills.length}
            </span>
          </div>
          <p className="text-xs md:text-sm text-zinc-500 mt-1">{category.tagline}</p>
        </div>
      </motion.div>

      {/* Skills grid with staggered reveal */}
      <motion.div
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4"
      >
        {category.skills.map((skill) => (
          <SkillCard key={skill.label} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
};

const SkillsSection = () => {
  const total = SKILL_CATEGORIES.reduce((n, c) => n + c.skills.length, 0);

  return (
    <section id="skills" className="w-full min-h-screen py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href={"#skills"}>
            <BoxReveal width="100%">
              <h2
                className={cn(
                  "bg-clip-text text-4xl text-center text-transparent md:text-7xl",
                  "bg-gradient-to-b from-white/90 to-white/50"
                )}
              >
                SKILLS
              </h2>
            </BoxReveal>
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-sm md:text-base text-zinc-500 max-w-2xl mx-auto"
          >
            {total}+ technologies across the full stack — from native Android and
            React Native to multi-tenant NestJS backends, AI/voice pipelines and
            AWS infrastructure.
          </motion.p>
        </div>

        {/* Categories */}
        <div>
          {SKILL_CATEGORIES.map((category, index) => (
            <CategoryBlock key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
