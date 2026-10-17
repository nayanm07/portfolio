"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Count-up number that animates once when scrolled into view.
 */
export const Counter = ({
  value,
  suffix = "",
  decimals = 0,
  durationMs = 1400,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / durationMs, 1);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const f = 10 ** decimals;
              setDisplay(Math.round(eased * value * f) / f);
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals, durationMs]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default Counter;
