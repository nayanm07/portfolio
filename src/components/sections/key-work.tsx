"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { workflows, type Workflow } from "@/data/workflows";
import PinnedRail from "@/components/aw/pinned-rail";
import { Stage, useInView } from "@/components/aw/project-mocks";

const MINI_STEP_MS = 1500;

/** Compact animated pipeline for a workflow card: steps light up in turn, a packet travels between them. */
const MiniPipeline = ({ flow }: { flow: Workflow }) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const n = flow.steps.length;

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % (n + 1)), MINI_STEP_MS); // a === n: brief hold on the last step
    return () => clearInterval(id);
  }, [inView, n]);

  const current = Math.min(active, n - 1);
  const step = flow.steps[current];

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden>
      <Stage w={600} h={300}>
        <div className="absolute inset-0 flex flex-col justify-center gap-7 px-6">
          {/* Steps */}
          <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
            {flow.steps.map((s, i) => {
              const Icon = s.icon;
              const done = i < current;
              const isActive = i === current;
              const lit = done || isActive;
              return (
                <div key={s.title} className="relative flex flex-col items-center text-center">
                  {i < n - 1 && (
                    <span className="absolute left-[calc(50%+26px)] top-[25px] h-[2px] w-[calc(100%-52px)] bg-white/10">
                      <span
                        className="absolute inset-0 origin-left transition-transform duration-500"
                        style={{ backgroundColor: flow.color, transform: done ? "scaleX(1)" : "scaleX(0)" }}
                      />
                      {isActive && active < n && (
                        <span
                          key={`${flow.id}-${current}`}
                          className="mini-packet absolute top-1/2 h-2 w-2 rounded-full"
                          style={{ backgroundColor: flow.color, boxShadow: `0 0 10px 3px ${flow.color}aa`, animationDuration: `${MINI_STEP_MS * 0.9}ms` }}
                        />
                      )}
                    </span>
                  )}
                  <span
                    className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border transition-all duration-500"
                    style={{
                      borderColor: lit ? flow.color : "rgba(255,255,255,0.12)",
                      backgroundColor: isActive ? flow.color : lit ? `${flow.color}26` : "rgba(255,255,255,0.04)",
                      boxShadow: isActive ? `0 0 26px 4px ${flow.color}66` : "none",
                      transform: isActive ? "scale(1.08)" : "scale(1)",
                    }}
                  >
                    <Icon className="h-6 w-6" style={{ color: isActive ? "#fff" : lit ? flow.color : "rgba(255,255,255,0.45)" }} />
                  </span>
                  <span
                    className="mt-3 line-clamp-2 px-1 text-[12px] font-semibold leading-tight transition-colors duration-500"
                    style={{ color: lit ? "#fff" : "rgba(255,255,255,0.55)" }}
                  >
                    {s.title}
                  </span>
                  <span className="mt-1 line-clamp-1 px-1 text-[10px] text-white/40">{s.sub}</span>
                </div>
              );
            })}
          </div>

          {/* Caption for the active step */}
          <div
            className="mx-2 flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5"
            style={{ borderColor: `${flow.color}40`, backgroundColor: `${flow.color}12` }}
          >
            <span className="shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold" style={{ backgroundColor: `${flow.color}30`, color: flow.color }}>
              {current + 1}/{n}
            </span>
            <p key={`${flow.id}-${current}`} className="mock-in line-clamp-2 text-[12px] leading-snug text-white/75">
              <span className="font-semibold text-white">{step.title}. </span>
              {step.detail}
            </p>
          </div>
        </div>
      </Stage>
    </div>
  );
};

/** Workflow card — same structure as the Featured Projects cards; opens the full diagram on /work */
const WorkflowCard = ({ flow, index }: { flow: Workflow; index: number }) => {
  const Icon = flow.icon;
  return (
    <Link
      href={`/work#${flow.id}`}
      className="featured-card group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[var(--aw-border)] bg-[var(--aw-card)] transition-shadow duration-300 hover:shadow-2xl"
      style={{ ["--card-color" as any]: flow.color }}
    >
      <span aria-hidden className="featured-card-border pointer-events-none absolute inset-0 z-0 rounded-2xl" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent 10%, ${flow.color} 50%, transparent 90%)` }}
      />

      {/* Meta row */}
      <div className="flex items-center gap-2.5 px-5 pb-2 pt-5">
        <span
          className="shrink-0 rounded-md px-2 py-0.5 font-mono text-[11px] font-black tabular-nums"
          style={{ backgroundColor: `${flow.color}22`, color: flow.color }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 border-t border-dashed border-[var(--aw-border)]" />
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-[var(--aw-text-tertiary)]">
          {flow.project}
        </span>
        <span className="hidden flex-1 border-t border-dashed border-[var(--aw-border)] sm:block" />
        <span className="hidden shrink-0 font-mono text-[10px] text-[var(--aw-text-tertiary)] sm:block">
          {flow.steps.length} steps
        </span>
      </div>

      {/* Title */}
      <div className="flex items-center gap-3 px-5 pb-1.5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ring-[var(--aw-border)] transition-transform duration-300 group-hover:scale-105 md:h-11 md:w-11 md:rounded-2xl"
          style={{ backgroundColor: `${flow.color}25` }}
        >
          <Icon className="h-5 w-5 md:h-6 md:w-6" style={{ color: flow.color }} />
        </span>
        <h3 className="flex-1 truncate text-xl font-extrabold leading-tight text-[var(--aw-text)] md:text-2xl">{flow.tab}</h3>
        <span className="flex h-7 w-7 shrink-0 -translate-x-1 items-center justify-center rounded-full border border-[var(--aw-border)] text-[var(--aw-text-secondary)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>

      <div className="px-5 pb-3">
        <p className="line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-[var(--aw-text-secondary)] md:min-h-[3.25rem] md:text-base">
          {flow.title}
        </p>
      </div>

      {/* Animated pipeline */}
      <div
        className="featured-media relative mx-3 mb-3 overflow-hidden rounded-xl md:mx-4 md:mb-4"
        style={{ background: `linear-gradient(145deg, ${flow.color}2e, #0b0b0d 70%)` }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 0.8px, transparent 0.8px)",
            backgroundSize: "18px 18px",
          }}
        />
        <MiniPipeline flow={flow} />
      </div>

      {/* Tech */}
      <div className="mt-auto flex flex-wrap gap-1.5 px-5 pb-5">
        {flow.tech.slice(0, 5).map((t) => (
          <span
            key={t}
            className={cn(
              "rounded-full border border-[var(--aw-border)] bg-[var(--aw-bg-secondary)] px-3 py-1 text-xs text-[var(--aw-text-secondary)]"
            )}
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
};

/**
 * Homepage "Key Work" — production workflows as a pinned horizontal rail of
 * cards (same layout as Featured Projects), ending in "View All Workflows".
 */
const KeyWorkSection = () => (
  <PinnedRail
    id="workflows"
    title="Key Work"
    items={workflows.map((flow, i) => ({ key: flow.id, node: <WorkflowCard flow={flow} index={i} /> }))}
    viewAll={{ href: "/work", label: "View All Workflows", sub: "Interactive, step-by-step diagrams" }}
  />
);

export default KeyWorkSection;
