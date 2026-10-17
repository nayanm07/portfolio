"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { workflows } from "@/data/workflows";
import { WorkflowAutoplay } from "@/components/sections/workflows";

/** Key Work — every production workflow, each as its own animated diagram. */
export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[var(--aw-bg)] px-6 pb-24 pt-32 text-[var(--aw-text)] md:pb-32 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold md:text-4xl">Key Work</h1>
        <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--aw-text-secondary)] md:text-base">
          How the production systems I&apos;ve built actually work — follow the data through each step, or click a step to
          see what happens there.
        </p>

        {/* Jump list */}
        <nav aria-label="Workflows" className="mt-8 flex flex-wrap gap-2">
          {workflows.map((w) => {
            const Icon = w.icon;
            return (
              <a
                key={w.id}
                href={`#${w.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--aw-border)] bg-[var(--aw-card)] px-4 py-2 text-sm font-medium text-[var(--aw-text-secondary)] transition-colors hover:text-[var(--aw-text)]"
              >
                <Icon className="h-4 w-4" style={{ color: w.color }} />
                {w.tab}
              </a>
            );
          })}
        </nav>

        <div className="mt-14 flex flex-col gap-16 md:gap-20">
          {workflows.map((w, i) => (
            <section key={w.id} id={w.id} className="scroll-mt-28">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="rounded-md px-2 py-0.5 font-mono text-[11px] font-black"
                  style={{ backgroundColor: `${w.color}22`, color: w.color }}
                >
                  {String(i + 1).padStart(2, "0")} / {String(workflows.length).padStart(2, "0")}
                </span>
                <span className="flex-1 border-t border-dashed border-[var(--aw-border)]" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--aw-text-tertiary)]">
                  {w.tab}
                </span>
              </div>
              <WorkflowAutoplay flow={w} />
            </section>
          ))}
        </div>

        <Link
          href="/projects"
          className="group mt-20 flex items-center justify-between gap-4 rounded-2xl border border-dashed border-[var(--aw-border)] bg-[var(--aw-card)] p-6 transition-colors hover:border-primary/50 md:p-8"
        >
          <div>
            <p className="text-lg font-bold">See the products these power</p>
            <p className="mt-1 text-sm text-[var(--aw-text-secondary)]">Interview AI, Clinic Cloud, Sicada AI and more.</p>
          </div>
          <ArrowRight className="h-6 w-6 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  );
}
