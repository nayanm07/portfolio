"use client";

import React from "react";
import { achievements } from "@/data/profile";
import { Trophy } from "lucide-react";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--aw-border)] bg-[var(--aw-card)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--aw-text-secondary)]">
    <span className="h-1.5 w-1.5 rounded-full bg-[var(--aw-amber)]" />
    {children}
  </span>
);

const AchievementsSection = () => (
  <section id="achievements" className="relative w-full px-6 py-24 sm:px-10 md:py-32">
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col items-center text-center">
        <SectionLabel>Achievements</SectionLabel>
        <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-[var(--aw-text)] sm:text-5xl md:text-6xl">
          Highlights
        </h2>
      </div>

      <div className="mt-14 flex flex-col gap-4">
        {achievements.map((a) => (
          <div
            key={a.title}
            className="aw-card flex items-start gap-4 p-6 transition-colors hover:border-amber-500/50 sm:items-center"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10">
              <Trophy className="h-5 w-5 text-[var(--aw-amber)]" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-[var(--aw-text)]">
                {a.title}
              </h3>
              <p className="mt-0.5 text-sm text-[var(--aw-text-secondary)]">{a.org}</p>
            </div>
            <span className="shrink-0 font-mono text-xs text-[var(--aw-text-tertiary)]">
              {a.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AchievementsSection;
