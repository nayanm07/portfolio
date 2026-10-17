"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Pinned horizontal scroll needs room for a whole card on screen
const PINNED_QUERY = "(min-width: 768px) and (min-height: 620px)";
// Left inset that lines the rail up with the max-w-6xl page column
const EDGE = "md:ps-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]";

/**
 * awrs.me-style horizontal section. Desktop: the section pins and vertical
 * scrolling slides the cards sideways. Mobile: a swipeable snap row.
 * Ends with a dashed "View all" card linking to the full page.
 */
const PinnedRail = ({
  id,
  title,
  subtitle,
  items,
  viewAll,
}: {
  id: string;
  title: string;
  subtitle?: React.ReactNode;
  /** one node per card; each is wrapped in a fixed-width slot */
  items: { key: string; node: React.ReactNode }[];
  viewAll: { href: string; label: string; sub: string };
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0); // horizontal px the rail travels

  useEffect(() => {
    const mq = window.matchMedia(PINNED_QUERY);
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Measure how far the rail must slide so its last card ends at the right edge
  useEffect(() => {
    const rail = railRef.current;
    if (!pinned || !rail) {
      setDistance(0);
      return;
    }
    const measure = () => setDistance(Math.max(0, rail.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  // Vertical scroll through the track → horizontal slide of the rail
  useEffect(() => {
    const track = trackRef.current;
    const rail = railRef.current;
    if (!pinned || !track || !rail) {
      if (rail) rail.style.transform = "";
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const progress = distance > 0 ? Math.min(1, Math.max(0, -track.getBoundingClientRect().top / distance)) : 0;
      rail.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pinned, distance]);

  return (
    <section id={id} className="relative">
      <div ref={trackRef} style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}>
        <div className={cn(pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16" : "py-20")}>
          <div className={cn("mb-8 px-6 md:mb-6", EDGE)}>
            <h2 className="text-3xl font-bold text-[var(--aw-text)] md:text-4xl">{title}</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
            {subtitle && <div className="mt-4 max-w-2xl text-sm text-[var(--aw-text-secondary)]">{subtitle}</div>}
          </div>

          <div
            ref={railRef}
            className={cn(
              "flex gap-5 px-6 pb-4 will-change-transform md:gap-8",
              EDGE,
              pinned ? "w-max md:pe-24" : "snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
            )}
          >
            {items.map((item) => (
              <div key={item.key} className="flex w-[85vw] max-w-[380px] shrink-0 snap-start md:w-[620px] md:max-w-none lg:w-[680px]">
                {item.node}
              </div>
            ))}

            <div className="flex w-[70vw] max-w-[300px] shrink-0 snap-start md:w-[320px]">
              <Link
                href={viewAll.href}
                className="group flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[var(--aw-border)] bg-[var(--aw-card)] p-8 text-center transition-colors hover:border-primary/50"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--aw-border)] transition-all duration-300 group-hover:border-primary/60 group-hover:bg-primary/10">
                  <ArrowRight className="h-6 w-6 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="text-lg font-bold text-[var(--aw-text)]">{viewAll.label}</span>
                <span className="text-sm text-[var(--aw-text-tertiary)]">{viewAll.sub}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnedRail;
