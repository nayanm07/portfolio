"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Live analog watch — a port of the awrs.me About-section clock (dark theme):
 * steel bezel, lume markers, moon-phase subdial at 9, date window at 3 and the
 * visitor's timezone city at 6. The seconds hand sweeps smoothly.
 */

const SYNODIC_MONTH = 29.53058770576;
// Reference new moon: 6 Jan 2000, 18:14
const NEW_MOON_REF = new Date(2000, 0, 6, 18, 14, 0).getTime();

// Dark-theme palette
const LUME = "#ffffff";
const MAJOR_TICK = "rgba(255,255,255,0.55)";
const LABEL = "rgba(255,255,255,0.35)";
const DIAL = "#0a0a0a";
const RING = "#2a2a2a";
const FAINT = "#1a1a1a";
const MINOR_TICK = "#333333";
const HAND = "rgba(255,255,255,0.85)";

/** Lit portion of the moon as an SVG path; phase 0 = new, 0.5 = full. */
const moonPath = (x: number, y: number, r: number, phase: number) => {
  if (phase < 0.01 || phase > 0.99) return "";
  const a = 2 * phase * Math.PI;
  const rx = r * Math.abs(Math.cos(a));
  const waxing = phase < 0.5;
  const sweep = Math.cos(a) > 0 !== waxing ? 1 : 0;
  return `M ${x} ${y - r} A ${r} ${r} 0 0 ${waxing ? 1 : 0} ${x} ${y + r} A ${rx} ${r} 0 0 ${sweep} ${x} ${y - r} Z`;
};

const timezoneCity = () => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (tz.split("/").pop()?.replace(/_/g, " ") ?? tz).toUpperCase();
};

const Watch = ({ size = 360, className }: { size?: number; className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState({ hours: 0, minutes: 0, seconds: 0, date: 1, day: "" });
  const secondsRef = useRef<SVGGElement>(null);

  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 14;

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const d = new Date();
      setNow({
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds(),
        date: d.getDate(),
        day: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Smooth sweeping seconds hand
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const d = new Date();
      const s = d.getSeconds() + d.getMilliseconds() / 1000;
      secondsRef.current?.setAttribute("transform", `rotate(${6 * s} ${cx} ${cy})`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [cx, cy]);

  /** Point at `deg` (0 = 12 o'clock) and radius `r` from the centre */
  const at = (deg: number, r: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  /** Tapered hand polygon: `len` towards the tip, `tail` behind the pivot */
  const hand = (deg: number, len: number, tail: number, baseW: number, tipW: number) => {
    const s = (deg * Math.PI) / 180;
    const co = Math.cos(s);
    const si = Math.sin(s);
    const tip = { x: cx + len * si, y: cy - len * co };
    const back = { x: cx - tail * si, y: cy + tail * co };
    return [
      [back.x - (baseW / 2) * co, back.y - (baseW / 2) * si],
      [back.x + (baseW / 2) * co, back.y + (baseW / 2) * si],
      [cx + (baseW / 2) * co, cy + (baseW / 2) * si],
      [tip.x + (tipW / 2) * co, tip.y + (tipW / 2) * si],
      [tip.x - (tipW / 2) * co, tip.y - (tipW / 2) * si],
      [cx - (baseW / 2) * co, cy - (baseW / 2) * si],
    ]
      .map((p) => p.join(","))
      .join(" ");
  };

  const datePos = { x: cx + 0.36 * R, y: cy };
  const moonPos = { x: cx - 0.36 * R, y: cy };
  const moonR = 0.18 * R;
  const moonInner = moonR - 2;

  const hourDeg = ((now.hours % 12) + now.minutes / 60) * 30;
  const minuteDeg = (now.minutes + now.seconds / 60) * 6;
  const moonAge = (((Date.now() - NEW_MOON_REF) / 864e5) % SYNODIC_MONTH + SYNODIC_MONTH) % SYNODIC_MONTH;
  const moonLit = moonPath(moonPos.x, moonPos.y, moonInner, moonAge / SYNODIC_MONTH);

  const ticks = Array.from({ length: 60 }, (_, i) => {
    const major = i % 5 === 0;
    const from = at(6 * i, major ? R - 16 : R - 8);
    const to = at(6 * i, R - 1);
    return { from, to, major, i };
  });
  const lumeDots = Array.from({ length: 12 }, (_, i) => ({ ...at(30 * i, R - 4), i }));
  const markers = Array.from({ length: 12 }, (_, i) => {
    if (i === 3 || i === 6 || i === 9) return null; // date, city, moon
    const deg = 30 * i;
    if (i === 0) {
      return {
        type: "double" as const,
        l1: at(deg - 3, R - 17), l2: at(deg - 3, R - 32),
        r1: at(deg + 3, R - 17), r2: at(deg + 3, R - 32),
      };
    }
    const a = at(deg, R - 17);
    const l = at(deg, R - 30);
    const s = at(deg - 3, R - 20);
    const o = at(deg + 3, R - 20);
    return { type: "arrow" as const, pts: `${a.x},${a.y} ${s.x},${s.y} ${l.x},${l.y} ${o.x},${o.y}` };
  });
  const bezelLen = Math.PI * (R + 9);

  return (
    <div className={className}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="clock-face mx-auto"
        role="img"
        aria-label="Analog clock showing your local time"
      >
        <defs>
          <filter id="lumeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="handGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="metalBezel" x1="0" y1="0" x2="1" y2="1">
            {[
              ["0%", "#333333"], ["18%", "#555555"], ["38%", "#888888"], ["50%", "#aaaaaa"],
              ["62%", "#888888"], ["82%", "#505050"], ["100%", "#333333"],
            ].map(([o, c]) => (
              <stop key={o} offset={o} stopColor={c} />
            ))}
          </linearGradient>
          <linearGradient id="innerBezel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#444444" />
            <stop offset="50%" stopColor="#262626" />
            <stop offset="100%" stopColor="#444444" />
          </linearGradient>
          <radialGradient id="dialFace" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#111111" />
            <stop offset="75%" stopColor={DIAL} />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>
          <clipPath id="moonClip">
            <circle cx={moonPos.x} cy={moonPos.y} r={moonInner} />
          </clipPath>
        </defs>

        {/* Case & bezel */}
        <circle cx={cx} cy={cy} r={R + 14} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={R + 12} fill="none" stroke="url(#metalBezel)" strokeWidth="5" />
        <circle
          cx={cx} cy={cy} r={R + 9} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"
          strokeDasharray={`${0.25 * bezelLen} ${0.75 * bezelLen}`}
          strokeDashoffset={`${-(0.05 * bezelLen)}`}
        />
        <circle cx={cx} cy={cy} r={R + 6} fill="none" stroke="url(#innerBezel)" strokeWidth="3.5" />
        <circle cx={cx} cy={cy} r={R + 3} fill="none" stroke={FAINT} strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r={R + 2} fill="url(#dialFace)" />

        {mounted && (
          <>
            {[0.92, 0.78, 0.6, 0.42].map((f) => (
              <circle key={f} cx={cx} cy={cy} r={R * f} fill="none" stroke={FAINT} strokeWidth="0.3" opacity={0.15} />
            ))}
            <circle cx={cx} cy={cy} r={R - 16} fill="none" stroke={RING} strokeWidth="0.5" opacity="0.5" />

            {ticks.map((t) => (
              <line
                key={t.i}
                x1={t.from.x} y1={t.from.y} x2={t.to.x} y2={t.to.y}
                stroke={t.major ? MAJOR_TICK : MINOR_TICK}
                strokeWidth={t.major ? 2.2 : 0.6}
                strokeLinecap="round"
              />
            ))}
            {lumeDots.map((d) => (
              <circle key={d.i} cx={d.x} cy={d.y} r={d.i === 0 ? 3.8 : 2.8} fill={LUME} filter="url(#lumeGlow)" className="lume-dot" />
            ))}
            {markers.map((m, i) =>
              !m ? null : m.type === "double" ? (
                <g key={i} filter="url(#lumeGlow)">
                  <line x1={m.l1.x} y1={m.l1.y} x2={m.l2.x} y2={m.l2.y} stroke={LUME} strokeWidth="3.5" strokeLinecap="round" />
                  <line x1={m.r1.x} y1={m.r1.y} x2={m.r2.x} y2={m.r2.y} stroke={LUME} strokeWidth="3.5" strokeLinecap="round" />
                </g>
              ) : (
                <polygon key={i} points={m.pts} fill={LUME} filter="url(#lumeGlow)" />
              )
            )}

            {/* Timezone city at 6 */}
            <text
              x={cx} y={cy + 0.32 * R} textAnchor="middle" dominantBaseline="central"
              fontSize="7" fontWeight="500" fontFamily="var(--font-sans)" fill="rgba(255,255,255,0.4)" letterSpacing="2"
            >
              {timezoneCity()}
            </text>

            {/* Date window at 3 */}
            <rect
              x={datePos.x - 0.11 * R} y={datePos.y - 0.075 * R} width={0.22 * R} height={0.15 * R}
              rx="3.5" fill="#0c0c0c" stroke={RING} strokeWidth="0.7"
            />
            <text
              x={datePos.x} y={datePos.y} textAnchor="middle" dominantBaseline="central"
              fontSize="13" fontWeight="700" fontFamily="var(--font-sans)" fill={LUME} filter="url(#lumeGlow)"
            >
              {now.date}
            </text>
            <text
              x={datePos.x} y={datePos.y - 0.12 * R} textAnchor="middle" dominantBaseline="central"
              fontSize="5.5" fill={LABEL} fontFamily="var(--font-sans)" letterSpacing="1.2"
            >
              {now.day}
            </text>

            {/* Moon phase at 9 */}
            <circle cx={moonPos.x} cy={moonPos.y} r={moonR + 1.5} fill="none" stroke={RING} strokeWidth="0.3" opacity="0.3" />
            <circle cx={moonPos.x} cy={moonPos.y} r={moonR} fill="#080808" stroke={RING} strokeWidth="0.7" />
            <text
              x={moonPos.x} y={moonPos.y - moonR - 5} textAnchor="middle" dominantBaseline="central"
              fontSize="4.5" fill={LABEL} fontFamily="var(--font-sans)" letterSpacing="1.2"
            >
              MOON
            </text>
            <g clipPath="url(#moonClip)">
              <circle cx={moonPos.x} cy={moonPos.y} r={moonInner} fill="rgba(255,255,255,0.06)" />
              {moonLit && <path d={moonLit} fill="rgba(255,255,255,0.5)" />}
            </g>

            {/* Hands */}
            <polygon
              points={hand(hourDeg, 0.48 * R, 0.1 * R, 9, 3)}
              fill={HAND} stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" filter="url(#handGlow)"
            />
            <polygon
              points={hand(minuteDeg, 0.7 * R, 0.12 * R, 6, 1.8)}
              fill={HAND} stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" filter="url(#handGlow)"
            />
            <g ref={secondsRef}>
              <line x1={cx} y1={cy + 0.22 * R} x2={cx} y2={cy - 0.85 * R} stroke={LUME} strokeWidth="1.1" strokeLinecap="round" />
              <circle cx={cx} cy={cy + 0.22 * R} r="3.5" fill={LUME} />
            </g>
            <circle cx={cx} cy={cy} r="8.5" fill={RING} />
            <circle cx={cx} cy={cy} r="6" fill={LUME} filter="url(#lumeGlow)" />
            <circle cx={cx} cy={cy} r="2.2" fill={DIAL} />
          </>
        )}
      </svg>
    </div>
  );
};

export default Watch;
