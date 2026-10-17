"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  CreditCard,
  FileHeart,
  IndianRupee,
  LayoutDashboard,
  Lock,
  Mic,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Animated product mockups for the featured-project cards, styled after the
 * live sites (interviewai.guaranteeadmit.com, goclinic.online, sicada.ai).
 * All data shown is illustrative demo content.
 */

/* ── shared ─────────────────────────────────────────────────────────── */

/** true while the element is at least partly on screen */
export const useInView = <T extends Element>() => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
};

/** Renders children at a fixed design size, scaled to fit (and centred in) its parent */
export const Stage = ({ w, h, children }: { w: number; h: number; children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setScale(Math.min(width / w, height / h));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h]);
  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative shrink-0" style={{ width: w, height: h, transform: `scale(${scale})`, opacity: scale ? 1 : 0 }}>
        {children}
      </div>
    </div>
  );
};

/** Wrapper that pauses CSS animations while off screen (see .mock-root in globals.css) */
const MockRoot = ({ playing, innerRef, children }: { playing: boolean; innerRef: React.Ref<HTMLDivElement>; children: React.ReactNode }) => (
  <div ref={innerRef} className="mock-root absolute inset-0" data-playing={playing} aria-hidden>
    {children}
  </div>
);

const Waveform = ({ bars = 14, active, color, height = 28 }: { bars?: number; active: boolean; color: string; height?: number }) => (
  <div className="flex items-end gap-[3px]" style={{ height }}>
    {Array.from({ length: bars }).map((_, i) => (
      <span
        key={i}
        className={cn("w-[3px] rounded-full", active && "mock-wave")}
        style={{
          height: "100%",
          backgroundColor: color,
          opacity: active ? 0.95 : 0.3,
          transform: active ? undefined : "scaleY(0.2)",
          transformOrigin: "bottom",
          animationDelay: `${(i * 97) % 600}ms`,
          animationDuration: `${700 + ((i * 131) % 500)}ms`,
        }}
      />
    ))}
  </div>
);

/** Steps through `count` phases, `ms[i]` per phase, looping — only while `playing` */
const usePhase = (ms: number[], playing: boolean) => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setPhase((p) => (p + 1) % ms.length), ms[phase]);
    return () => clearTimeout(id);
  }, [phase, playing, ms]);
  return phase;
};

/** Types `text` out while `on`; resets when `text` changes */
const useTyped = (text: string, on: boolean, cps = 32) => {
  const [n, setN] = useState(0);
  useEffect(() => setN(0), [text]);
  useEffect(() => {
    if (!on || n >= text.length) return;
    const id = setTimeout(() => setN((x) => x + 1), 1000 / cps);
    return () => clearTimeout(id);
  }, [on, n, text, cps]);
  return text.slice(0, n);
};

/* ── Interview AI ───────────────────────────────────────────────────── */

const QA = [
  {
    q: "Why did you choose this university for your Master's?",
    a: "Its AI research lab and industry placements match my goal of working in data science.",
    score: 86,
  },
  {
    q: "How will you fund your studies abroad?",
    a: "Through a family education fund and a partial merit scholarship I was awarded.",
    score: 91,
  },
  {
    q: "What are your plans after graduation?",
    a: "Gain two years of industry experience, then build healthcare AI products back home.",
    score: 88,
  },
];
// per question: ask → answer (typed) → score
const INTERVIEW_PHASES = [1800, 3600, 2600];

export const InterviewMock = () => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [qi, setQi] = useState(0);
  const phase = usePhase(INTERVIEW_PHASES, inView);
  const prevPhase = useRef(phase);
  useEffect(() => {
    if (prevPhase.current === 2 && phase === 0) setQi((i) => (i + 1) % QA.length);
    prevPhase.current = phase;
  }, [phase]);

  const [secs, setSecs] = useState(134);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [inView]);

  const item = QA[qi];
  const answer = useTyped(item.a, inView && phase >= 1, 30);
  const scoring = phase === 2;
  const C = 2 * Math.PI * 22;

  return (
    <MockRoot innerRef={ref} playing={inView}>
      <Stage w={600} h={360}>
        <div className="absolute inset-6 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a1230]/85 shadow-2xl shadow-black/40 backdrop-blur">
          {/* Title bar */}
          <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] shadow-lg shadow-blue-500/30">
              <Mic className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="text-sm font-bold text-white">Interview AI</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-blue-200">
              Visa interview · Q{qi + 3}/8
            </span>
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-red-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              REC {String(Math.floor(secs / 60)).padStart(2, "0")}:{String(secs % 60).padStart(2, "0")}
            </span>
          </div>

          <div className="grid flex-1 grid-cols-[170px_1fr]">
            {/* Interviewer */}
            <div className="flex flex-col items-center justify-center gap-4 border-r border-white/10">
              <div className="relative flex h-20 w-20 items-center justify-center">
                {phase === 0 && (
                  <>
                    <span className="mock-ring absolute inset-0 rounded-full border-2 border-blue-400/60" />
                    <span className="mock-ring absolute inset-0 rounded-full border-2 border-blue-400/60" style={{ animationDelay: "1s" }} />
                  </>
                )}
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#60a5fa] to-[#1d4ed8] shadow-xl shadow-blue-600/40">
                  <Sparkles className="h-8 w-8 text-white" />
                </span>
              </div>
              <Waveform active={phase === 0 || phase === 1} color={phase === 1 ? "#34d399" : "#60a5fa"} />
              <span className="text-[11px] font-medium text-blue-100/80">
                {phase === 0 ? "AI interviewer · speaking" : phase === 1 ? "Listening · STT" : "Evaluating · LLM"}
              </span>
            </div>

            {/* Transcript + evaluation */}
            <div className="flex flex-col gap-2.5 p-4">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-300/70">Live transcript</span>
              <div key={`q-${qi}`} className="mock-in max-w-[85%] rounded-xl rounded-tl-sm bg-blue-500/15 px-3 py-2 text-[12px] leading-snug text-blue-50">
                {item.q}
              </div>
              {phase >= 1 && (
                <div className="ml-auto max-w-[88%] rounded-xl rounded-tr-sm bg-white/10 px-3 py-2 text-[12px] leading-snug text-white">
                  {answer}
                  {phase === 1 && <span className="mock-caret ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 bg-white" />}
                </div>
              )}

              <div className="mt-auto flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2.5">
                <svg width="52" height="52" viewBox="0 0 52 52" className="-rotate-90">
                  <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
                  <circle
                    cx="26" cy="26" r="22" fill="none" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round"
                    strokeDasharray={C}
                    strokeDashoffset={scoring ? C * (1 - item.score / 100) : C}
                    style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)" }}
                  />
                </svg>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-white">{scoring ? item.score : "--"}</span>
                    <span className="text-[10px] text-blue-200/70">answer score</span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {["Relevance", "Fluency", "Clarity"].map((t, i) => (
                      <span
                        key={t}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold transition-all duration-500",
                          scoring ? "bg-emerald-400/15 text-emerald-300" : "bg-white/5 text-white/30"
                        )}
                        style={{ transitionDelay: scoring ? `${300 + i * 200}ms` : "0ms" }}
                      >
                        <Check className="h-2.5 w-2.5" /> {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Stage>
    </MockRoot>
  );
};

/* ── Clinic Cloud (goclinic.online) ─────────────────────────────────── */

const PATIENTS = [
  { name: "Aarav Patel", time: "10:30", tag: "WhatsApp" },
  { name: "Diya Sharma", time: "10:45", tag: "Walk-in" },
  { name: "Rohan Gupta", time: "11:00", tag: "WhatsApp" },
  { name: "Meera Iyer", time: "11:15", tag: "Online" },
  { name: "Kabir Singh", time: "11:30", tag: "WhatsApp" },
  { name: "Ananya Rao", time: "11:45", tag: "Walk-in" },
];
const TOASTS = [
  { icon: FileHeart, text: "ABHA health record linked", color: "#0ea5e9" },
  { icon: Check, text: "WhatsApp booking confirmed · Token 14", color: "#22c55e" },
  { icon: CreditCard, text: "Razorpay payment received · ₹600", color: "#6366f1" },
];
const BARS = [42, 58, 50, 72, 64, 86, 78];

const useCount = (to: number, on: boolean, ms = 1400) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, on, ms]);
  return v;
};

export const ClinicMock = () => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  // a new appointment arrives every 2.4s
  const [head, setHead] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setHead((h) => h + 1), 2400);
    return () => clearInterval(id);
  }, [inView]);
  const rows = [0, 1, 2].map((k) => ({ ...PATIENTS[(head + k) % PATIENTS.length], token: 12 + head - k + 2 }));
  const toast = TOASTS[head % TOASTS.length];
  const ToastIcon = toast.icon;

  const appts = useCount(24, started, 1200) + (head % 10); // counts up once, then +1 per new booking
  const patients = useCount(156, started);
  const revenue = useCount(45230, started, 1800);

  return (
    <MockRoot innerRef={ref} playing={inView}>
      <Stage w={600} h={360}>
        <div className="absolute inset-5 flex flex-col overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/50">
          {/* Browser bar */}
          <div className="flex items-center gap-2 bg-[#1a2232] px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="mx-auto flex items-center gap-1.5 rounded-md bg-white/5 px-10 py-1 text-[10px] text-white/60">
              <Lock className="h-2.5 w-2.5" /> goclinic.online/dashboard
            </span>
          </div>

          <div className="flex flex-1 bg-[#f5f7fb] text-[#0f172a]">
            {/* Sidebar */}
            <div className="flex w-[124px] flex-col gap-1 border-r border-slate-200 bg-white p-2.5">
              <div className="mb-2 flex items-center gap-1.5 px-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] text-[11px] font-black text-white">
                  G
                </span>
                <span className="text-[11px] font-bold text-[#1e3a8a]">goclinic</span>
              </div>
              {[
                { icon: LayoutDashboard, label: "Dashboard", active: true },
                { icon: CalendarDays, label: "Appointments" },
                { icon: Users, label: "Patients" },
                { icon: IndianRupee, label: "Billing" },
                { icon: ShieldCheck, label: "ABDM" },
              ].map(({ icon: I, label, active }) => (
                <span
                  key={label}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] font-medium",
                    active ? "bg-blue-50 text-blue-600" : "text-slate-500"
                  )}
                >
                  <I className="h-3 w-3" /> {label}
                </span>
              ))}
            </div>

            {/* Main */}
            <div className="relative flex flex-1 flex-col gap-2.5 p-3">
              <div className="flex items-center">
                <div>
                  <p className="text-[13px] font-bold">Dashboard</p>
                  <p className="text-[9px] text-slate-500">Welcome back, Dr. Sharma</p>
                </div>
                <span className="relative ml-auto">
                  <Bell className="h-4 w-4 text-slate-500" />
                  <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[7px] font-bold text-white">
                    {(head % 5) + 1}
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Today's Appointments", value: appts.toString(), icon: CalendarDays, tint: "#3b82f6" },
                  { label: "Total Patients", value: patients.toString(), icon: Users, tint: "#10b981" },
                  { label: "Revenue", value: `₹${revenue.toLocaleString("en-IN")}`, icon: IndianRupee, tint: "#8b5cf6" },
                ].map(({ label, value, icon: I, tint }) => (
                  <div key={label} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md" style={{ backgroundColor: `${tint}1a` }}>
                      <I className="h-3.5 w-3.5" style={{ color: tint }} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[8px] text-slate-500">{label}</p>
                      <p className="text-[13px] font-bold tabular-nums">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid flex-1 grid-cols-[1.35fr_1fr] gap-2">
                <div className="rounded-lg border border-slate-200 bg-white p-2">
                  <p className="mb-1.5 text-[10px] font-semibold">Upcoming Appointments</p>
                  <div className="flex flex-col gap-1">
                    {rows.map((r, i) => (
                      <div
                        key={`${head}-${i}`}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-1.5 py-1 text-[9px]",
                          i === 0 ? "mock-in bg-blue-50" : "bg-slate-50"
                        )}
                      >
                        <span className="rounded bg-white px-1 font-mono font-bold text-blue-600">#{r.token}</span>
                        <span className="flex-1 truncate font-medium">{r.name}</span>
                        <span className="text-slate-500">{r.time}</span>
                        <span
                          className={cn(
                            "rounded-full px-1.5 font-semibold",
                            r.tag === "WhatsApp" ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"
                          )}
                        >
                          {r.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-2">
                  <p className="text-[10px] font-semibold">Revenue · this week</p>
                  <div className="mt-auto flex h-[64px] items-end gap-1.5">
                    {BARS.map((b, i) => (
                      <span
                        key={`${started}-${i}`}
                        className={cn("flex-1 rounded-t-sm bg-gradient-to-t from-[#2563eb] to-[#06b6d4]", started && "mock-grow")}
                        style={{ height: `${b}%`, animationDelay: `${i * 90}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Toast */}
              <div
                key={`toast-${head}`}
                className="mock-in absolute bottom-3 right-3 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-lg"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: `${toast.color}1f` }}>
                  <ToastIcon className="h-3 w-3" style={{ color: toast.color }} />
                </span>
                <span className="text-[9px] font-semibold">{toast.text}</span>
              </div>
            </div>
          </div>
        </div>
      </Stage>
    </MockRoot>
  );
};

/* ── Sicada AI ──────────────────────────────────────────────────────── */

const REQUEST_LINES = [
  `{`,
  `  "agent_id": "adm_counsellor",`,
  `  "recipients": 250,`,
  `  "schedule": "2025-11-04T10:00+05:30"`,
  `}`,
];
// typing request → response → dialing → ringing → connected
const SICADA_PHASES = [2400, 1300, 1300, 1300, 3600];

export const SicadaMock = () => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const phase = usePhase(SICADA_PHASES, inView);
  const request = useTyped(REQUEST_LINES.join("\n"), inView && phase === 0, 55);
  const shownRequest = phase === 0 ? request : REQUEST_LINES.join("\n");
  const responded = phase >= 1;

  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (phase !== 4 || !inView) {
      if (phase !== 4) setSecs(0);
      return;
    }
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase, inView]);

  const status =
    phase <= 1
      ? { text: "Queued", color: "#94a3b8" }
      : phase === 2
        ? { text: "Dialing +91 98••• ••412", color: "#f59e0b" }
        : phase === 3
          ? { text: "Ringing…", color: "#f59e0b" }
          : { text: `Connected · 00:${String(secs).padStart(2, "0")}`, color: "#22c55e" };

  return (
    <MockRoot innerRef={ref} playing={inView}>
      <Stage w={600} h={360}>
        <div className="absolute inset-0 p-6 text-[#0f172a]">
          {/* Brand */}
          <div className="mb-3 flex items-center gap-1.5">
            <span className="flex items-center gap-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1d74f5]" />
              <span className="h-4 w-5 rounded-full bg-gradient-to-br from-[#4f9bff] to-[#1d4ed8]" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">Sicada.ai</span>
            <span className="ml-2 rounded-full bg-[#1d74f5]/10 px-2 py-0.5 text-[9px] font-semibold text-[#1d74f5]">
              Public API · v1
            </span>
          </div>

          <div className="grid grid-cols-[1.15fr_1fr] gap-3">
            {/* API request / response */}
            <div className="overflow-hidden rounded-xl bg-[#0f172a] shadow-xl shadow-blue-900/20">
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-400">POST</span>
                <span className="font-mono text-[10px] text-white/80">/v1/campaigns</span>
                <span className="ml-auto flex items-center gap-1 font-mono text-[8px] text-white/40">
                  <Lock className="h-2.5 w-2.5" /> x-api-key: sk_live_••••
                </span>
              </div>
              <pre className="h-[104px] px-3 py-2 font-mono text-[10px] leading-[1.55] text-sky-200">
                {shownRequest}
                {phase === 0 && <span className="mock-caret inline-block h-3 w-[2px] translate-y-0.5 bg-sky-300" />}
              </pre>
              <div className={cn("border-t border-white/10 px-3 py-2 transition-opacity duration-500", responded ? "opacity-100" : "opacity-0")}>
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="rounded bg-emerald-500 px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">201</span>
                  <span className="font-mono text-[9px] text-emerald-300">Created · 84 ms</span>
                </div>
                <pre className="font-mono text-[10px] leading-[1.55] text-white/70">
                  {`{ "campaign_id": "cmp_8f2a",\n  "calls_queued": 250 }`}
                </pre>
              </div>
            </div>

            {/* Voice agent call */}
            <div className="flex flex-col gap-2.5">
              <div className="rounded-xl border border-blue-100 bg-white p-3 shadow-lg shadow-blue-900/10">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-10 w-10 items-center justify-center">
                    {phase === 4 && <span className="mock-ring absolute inset-0 rounded-full border-2 border-[#1d74f5]/50" />}
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#4f9bff] to-[#1d4ed8]">
                      <Phone className="h-4 w-4 text-white" />
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold">AI Voice Agent</p>
                    <p className="text-[9px] text-slate-500">Admissions counsellor</p>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: status.color }}>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: status.color }} />
                  {status.text}
                </div>
                <div className="mt-2">
                  <Waveform active={phase === 4} color="#1d74f5" bars={22} height={24} />
                </div>
              </div>

              <div
                className={cn(
                  "rounded-xl rounded-tl-sm bg-[#1d74f5] px-3 py-2 text-[10px] leading-snug text-white shadow-lg shadow-blue-500/20 transition-all duration-500",
                  phase === 4 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                )}
              >
                “Hi Priya, I&apos;m calling from the admissions team about your application…”
              </div>
              <div
                className={cn(
                  "flex items-center gap-1.5 self-start rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600 transition-all duration-500",
                  phase === 4 && secs >= 2 ? "opacity-100" : "opacity-0"
                )}
              >
                <Check className="h-3 w-3" /> Lead qualified · synced to CRM
              </div>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            {["62 endpoints", "API-key auth", "10+ client companies", "Scheduled calls"].map((t) => (
              <span key={t} className="rounded-full border border-blue-100 bg-white/70 px-2.5 py-1 text-[9px] font-semibold text-[#1d4ed8]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Stage>
    </MockRoot>
  );
};
