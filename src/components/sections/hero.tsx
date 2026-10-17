"use client";

import React from "react";
import { motion } from "framer-motion";
import { config } from "@/data/config";
import { roleTicker, traitTicker } from "@/data/profile";
import { cn } from "@/lib/utils";

const NAME_GRADIENT = "linear-gradient(to right, #a83d62, #d4547e, #e07a9c, #f5b8cc)";

/* awrs.me "beams": 15 faint parallel curves, with a blue→violet light streak
   travelling along every other one (the 7 odd curves). */
const beamPath = (k: number) => {
  const x = (n: number) => n + 28 * k;
  const y = (n: number) => n - 32 * k;
  return `M${x(-380)} ${y(-189)}C${x(-380)} ${y(-189)} ${x(-312)} ${y(216)} ${x(152)} ${y(343)}C${x(616)} ${y(470)} ${x(684)} ${y(875)} ${x(684)} ${y(875)}`;
};

// [duration, delay] per moving beam — staggered so streaks never sync up
const BEAM_TIMING: [number, number][] = [
  [7, 0], [9, 2.5], [6.5, 5], [8, 1.2], [10, 3.8], [7.5, 6.2], [8.5, 0.6],
];

const Beams = () => (
  <svg
    className="pointer-events-none absolute z-0 h-full w-full"
    viewBox="-380 -650 1470 1530"
    preserveAspectRatio="none"
    fill="none"
  >
    {Array.from({ length: 15 }).map((_, k) => (
      <path
        key={k}
        className="beam-static"
        d={beamPath(k)}
        stroke="url(#beams-radial)"
        strokeOpacity="0.15"
        strokeWidth="0.5"
      />
    ))}
    {BEAM_TIMING.map(([dur, delay], i) => (
      <path
        key={`moving-${i}`}
        className="beam-path"
        d={beamPath(i * 2 + 1)}
        stroke="url(#beam-gradient)"
        strokeWidth="0.5"
        strokeOpacity="0.6"
        strokeDasharray="40 3000"
        strokeDashoffset="3100"
        style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
      />
    ))}
    <defs>
      <radialGradient
        id="beams-radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(355 115) rotate(90) scale(765 735)"
      >
        <stop offset="0.0666667" stopColor="#d4d4d4" />
        <stop offset="0.243243" stopColor="#d4d4d4" />
        <stop offset="0.43594" stopColor="#d4d4d4" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#18CCFC" stopOpacity="0" />
        <stop offset="20%" stopColor="#18CCFC" />
        <stop offset="60%" stopColor="#6344F5" />
        <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const PARTICLES: React.CSSProperties[] = [
  { top: "18%", left: "12%", animationDelay: "0s" },
  { top: "25%", right: "18%", animationDelay: "1.5s" },
  { top: "72%", left: "22%", animationDelay: "3s" },
  { top: "68%", right: "14%", animationDelay: "0.8s" },
  { top: "40%", left: "6%", animationDelay: "2.2s" },
  { top: "55%", right: "8%", animationDelay: "4s" },
];

/* One tilted, infinitely scrolling strip */
const Strip = ({
  items,
  variant,
  direction,
  durationSec,
  className,
  rotate,
}: {
  items: string[];
  variant: "pink" | "dark";
  direction: "left" | "right";
  durationSec: number;
  className: string;
  rotate: number;
}) => {
  const group = [...items, ...items, ...items];
  return (
    <div
      className={cn(
        "absolute left-[-20%] w-[140%] overflow-hidden py-3.5 md:py-5",
        variant === "pink"
          ? "bg-gradient-to-r from-pink-800 via-rose-700 to-pink-800 text-white/80"
          : "border-y border-[var(--aw-border)] bg-[var(--aw-card)] text-[var(--aw-text-secondary)]",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className={cn(
          "flex w-max motion-reduce:animate-none",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
        style={{ ["--marquee-duration" as any]: `${durationSec}s` }}
      >
        {[0, 1].map((copy) => (
          <span key={copy} className="inline-flex shrink-0 items-center" aria-hidden={copy === 1}>
            {group.map((item, i) => (
              <span key={i} className="inline-flex shrink-0 items-center">
                <span className="whitespace-nowrap px-4 text-sm font-bold uppercase tracking-wider md:px-6 md:text-base">
                  {item}
                </span>
                <span className="text-[0.5rem] opacity-60">◆</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};

/* Name revealed letter by letter; each letter carries its slice of the gradient */
const HeroName = ({ text }: { text: string }) => {
  const chars = Array.from(text);
  const n = chars.length;
  return (
    <h1
      className="mb-10 text-5xl font-black sm:text-6xl md:text-8xl lg:text-9xl"
      style={{ perspective: 600 }}
      aria-label={text}
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          // Bottom padding gives descenders (the "y") room inside the clipped gradient;
          // the matching negative margin keeps the line height unchanged.
          className="-mb-[0.2em] inline-block bg-clip-text pb-[0.2em]"
          style={{
            backgroundImage: NAME_GRADIENT,
            backgroundSize: `${n * 100}% 100%`,
            backgroundPosition: `${n > 1 ? (i / (n - 1)) * 100 : 0}% 0`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.35 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </h1>
  );
};

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6 },
});

const HeroSection = () => (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--aw-bg)]"
    >
      <div className="absolute inset-0 flex h-full w-full items-center justify-center">
        <Beams />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <Strip
          items={roleTicker}
          variant="pink"
          direction="right"
          durationSec={35}
          rotate={4}
          className="top-[75%] md:top-[85%]"
        />
        <Strip
          items={traitTicker}
          variant="dark"
          direction="left"
          durationSec={40}
          rotate={-4}
          className="top-[78%] md:top-[88%]"
        />
      </motion.div>

      {PARTICLES.map((style, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 animate-float-slow rounded-full bg-primary/20"
          style={style}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-4xl -translate-y-16 px-6 text-center">
        <motion.p
          {...fadeIn(0.1)}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--aw-text-secondary)] md:text-base"
        >
          Hi, I&apos;m
        </motion.p>
        <motion.span
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mx-auto mb-8 block h-px w-10 origin-center bg-gradient-to-r from-transparent via-[var(--aw-primary)] to-transparent"
        />
        <HeroName text={config.author} />
        <motion.p
          {...fadeIn(0.35 + Array.from(config.author).length * 0.05 + 0.2)}
          className="mx-auto max-w-xl text-lg font-medium leading-relaxed text-[var(--aw-text-secondary)] md:text-xl"
        >
          Full-Stack Software Engineer
        </motion.p>
      </div>
    </section>
);

export default HeroSection;
