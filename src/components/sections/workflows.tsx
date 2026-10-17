"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { type Workflow } from "@/data/workflows";

const STEP_MS = 1800; // time each step stays active
const RESUME_AFTER_MS = 8000; // autoplay resumes this long after a manual click

/** One workflow's animated diagram card — used on the /work page. */
export const WorkflowDiagram = ({
  flow,
  active,
  reduceMotion,
  onSelectStep,
}: {
  flow: Workflow;
  active: number;
  reduceMotion: boolean;
  onSelectStep: (i: number) => void;
}) => {
  const n = flow.steps.length;
  const current = Math.min(active, n - 1);
  const step = flow.steps[current];
  const selectStep = onSelectStep;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[var(--aw-border)] bg-[var(--aw-card)]"
      style={{ ["--flow" as any]: flow.color }}
    >
      <div className="aw-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[70%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: `${flow.color}14` }}
      />

      <div className="relative p-6 md:p-10">
        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={flow.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: flow.color }}>
              {flow.project}
            </span>
            <h3 className="mt-2 text-lg font-bold leading-snug text-[var(--aw-text)] md:text-2xl">{flow.title}</h3>
            <p className="mt-2 text-sm text-[var(--aw-text-secondary)]">{flow.summary}</p>
          </motion.div>
        </AnimatePresence>

        {/* Stepper */}
        <ol
          key={flow.id}
          className="mt-10 flex flex-col gap-4 md:grid md:gap-0"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {flow.steps.map((s, i) => {
            const Icon = s.icon;
            const done = i < current;
            const isActive = i === current;
            const lit = done || isActive;
            const isLast = i === n - 1;
            // while a step is active, a packet travels out of it towards the next step
            const packetHere = !reduceMotion && isActive && active < n;

            return (
              <li key={s.title} className="relative flex items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
                {/* Connector to the next step */}
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute left-[27px] top-14 h-[calc(100%-2.5rem)] w-[2px] md:left-[calc(50%+32px)] md:top-[27px] md:h-[2px] md:w-[calc(100%-64px)]"
                    style={{ backgroundColor: "var(--aw-border)" }}
                  >
                    <span
                      className="absolute inset-0 origin-top transition-transform duration-500 md:origin-left"
                      style={{
                        backgroundColor: flow.color,
                        transform: done ? "scale(1)" : "scale(0)",
                      }}
                    />
                    {packetHere && (
                      <span
                        key={`${flow.id}-${current}`}
                        className="workflow-packet absolute h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor: flow.color,
                          boxShadow: `0 0 10px 3px ${flow.color}aa`,
                          animationDuration: `${STEP_MS * 0.9}ms`,
                        }}
                      />
                    )}
                  </span>
                )}

                {/* Node */}
                <button
                  onClick={() => selectStep(i)}
                  className="group relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500"
                  style={{
                    borderColor: lit ? flow.color : "var(--aw-border)",
                    backgroundColor: isActive ? flow.color : lit ? `${flow.color}1f` : "var(--aw-bg-secondary)",
                    boxShadow: isActive ? `0 0 0 4px var(--aw-card), 0 0 28px 6px ${flow.color}55` : "none",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                  }}
                  aria-label={`Step ${i + 1}: ${s.title}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isActive && !reduceMotion && (
                    <span
                      className="experience-marker-ring absolute inset-[-6px] rounded-2xl border-2"
                      style={{ borderColor: `${flow.color}66` }}
                    />
                  )}
                  <Icon
                    className="h-6 w-6 transition-colors duration-500"
                    style={{ color: isActive ? "#fff" : lit ? flow.color : "var(--aw-text-tertiary)" }}
                  />
                  {s.badge && (
                    <span
                      className="absolute -right-2 -top-2 rounded-full border px-1.5 py-px text-[9px] font-bold"
                      style={{ borderColor: flow.color, backgroundColor: "var(--aw-card)", color: flow.color }}
                    >
                      {s.badge}
                    </span>
                  )}
                </button>

                {/* Label */}
                <button onClick={() => selectStep(i)} className="pb-2 text-left md:mt-4 md:px-1.5 md:pb-0 md:text-center">
                  <span className="block font-mono text-[10px] text-[var(--aw-text-tertiary)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="block text-sm font-semibold leading-tight transition-colors duration-500"
                    style={{ color: lit ? "var(--aw-text)" : "var(--aw-text-secondary)" }}
                  >
                    {s.title}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-[var(--aw-text-tertiary)]">{s.sub}</span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Detail panel */}
        <div
          className="mt-8 rounded-xl border p-4 md:mt-10 md:p-5"
          style={{ borderColor: `${flow.color}33`, backgroundColor: `${flow.color}0a` }}
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${flow.id}-${current}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-3"
            >
              <span
                className="mt-0.5 shrink-0 rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold"
                style={{ backgroundColor: `${flow.color}26`, color: flow.color }}
              >
                {current + 1}/{n}
              </span>
              <p className="text-sm leading-relaxed text-[var(--aw-text-secondary)]">
                <span className="font-semibold text-[var(--aw-text)]">{step.title}. </span>
                {step.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tech */}
        <p className="mt-5 text-xs tracking-wide text-[var(--aw-text-tertiary)]">{flow.tech.join(" · ")}</p>
      </div>
    </div>
  );
};

/** A WorkflowDiagram that plays its own steps on a loop while on screen (used on /work). */
export const WorkflowAutoplay = ({ flow }: { flow: Workflow }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [pausedUntil, setPausedUntil] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const n = flow.steps.length;

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const id = setInterval(() => {
      if (Date.now() < pausedUntil) return;
      setActive((a) => (a >= n ? 0 : a + 1)); // a === n is a short hold on the last step
    }, STEP_MS);
    return () => clearInterval(id);
  }, [inView, reduceMotion, pausedUntil, n]);

  return (
    <div ref={ref}>
      <WorkflowDiagram
        flow={flow}
        active={active}
        reduceMotion={reduceMotion}
        onSelectStep={(i) => {
          setActive(i);
          setPausedUntil(Date.now() + RESUME_AFTER_MS);
        }}
      />
    </div>
  );
};
