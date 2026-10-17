"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { experience } from "@/data/profile";

/**
 * awrs.me-style experience timeline: entries alternate around a centre line
 * that fills in as you scroll, with a glowing dot riding its tip. On mobile it
 * collapses to a single column with a coloured left border per entry.
 */
const ExperienceSection = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Line grows from the top of the timeline (at 70% of the viewport) to its bottom (at 30%)
  useEffect(() => {
    const timeline = timelineRef.current;
    const line = lineRef.current;
    if (!timeline || !line) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = r.top - vh * 0.7;
      const end = r.bottom - vh * 0.3;
      const progress = Math.min(1, Math.max(0, -start / (end - start)));
      line.style.maxHeight = `${progress * 100}%`;
      line.style.opacity = String(Math.min(1, progress * 4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Heading and each entry fade up once as they enter the viewport
  useEffect(() => {
    const els = [
      headingRef.current,
      ...Array.from(timelineRef.current?.querySelectorAll<HTMLElement>(".experience-entry") ?? []),
    ].filter((el): el is HTMLElement => !!el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          el.classList.add("is-visible");
          el.animate(
            [
              { opacity: 0, translate: "0 40px" },
              { opacity: 1, translate: "0 0" },
            ],
            { duration: 800, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" }
          );
        });
      },
      { rootMargin: "0px 0px -18% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={headingRef} className="exp-reveal mb-16">
          <h2 className="text-3xl font-bold text-[var(--aw-text)] md:text-4xl">Experience</h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
        </div>
      </div>

      <div ref={timelineRef} className="relative mx-auto max-w-4xl px-6">
        {/* Centre line (desktop) */}
        <div
          ref={lineRef}
          className="experience-line absolute top-0 z-0 hidden h-full w-[2px] md:start-1/2 md:block md:-translate-x-1/2"
          style={{ maxHeight: "0%", opacity: 0 }}
        >
          <div className="experience-dot absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full" />
        </div>

        <div className="flex flex-col gap-10 md:gap-20">
          {experience.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={item.company + item.role}
                className="experience-entry exp-reveal group/exp relative rounded-s-sm border-s-[3px] ps-5 md:grid md:grid-cols-2 md:gap-16 md:border-s-0 md:ps-0"
                style={{ borderInlineStartColor: item.color }}
              >
                <div className={cn(!left && "md:col-start-2")}>
                  <div className="flex items-center gap-3 md:block">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full md:hidden"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 12px 3px ${item.color}30` }}
                    >
                      <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: item.color }}>
                      {item.period}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold leading-tight text-[var(--aw-text)]">{item.role}</h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: item.color }}>
                    {item.company}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--aw-text-secondary)]">{item.description}</p>
                  <p className="mt-4 text-xs tracking-wide text-[var(--aw-text-tertiary)]">{item.tech.join(" · ")}</p>
                </div>
                {left && <div className="hidden md:block" />}

                {/* Marker on the centre line (desktop) */}
                <div className="absolute start-1/2 top-1 z-10 hidden -translate-x-1/2 items-center justify-center md:flex">
                  <div
                    className="experience-marker-ring absolute h-11 w-11 rounded-full border-2"
                    style={{ borderColor: `${item.color}40` }}
                  />
                  <div
                    className="experience-marker-icon flex h-9 w-9 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 0 3px var(--aw-bg), 0 0 20px 4px ${item.color}40`,
                    }}
                  >
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
