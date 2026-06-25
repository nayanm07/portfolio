"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SKILL_CATEGORIES } from "@/data/constants";

/**
 * Composio-style full-width "agent orchestration" band, themed to Nayan.
 * Node-connected panels (auto-scrolling tool grid · agent chat · live
 * connections · execute · config · sandbox) joined by animated connector
 * lines. The tool grid auto-scrolls as an infinite vertical marquee.
 */

const ICONS = SKILL_CATEGORIES.flatMap((c) => c.skills).map((s) => s.icon);


const label =
  "text-[10px] font-mono uppercase tracking-[0.16em] text-muted-soft";

const Panel = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: "easeOut" }}
    className={cn(
      "border border-hairline-strong bg-background/60 backdrop-blur-md p-4 font-mono",
      className
    )}
  >
    {children}
  </motion.div>
);

/* Horizontal node connector between two panels */
const Connector = ({ delay = 0 }: { delay?: number }) => (
  <div className="relative hidden lg:flex w-10 xl:w-14 shrink-0 self-center items-center">
    <span className="absolute left-0 h-1.5 w-1.5 rounded-full bg-primary-glow shadow-[0_0_8px_hsl(var(--primary-glow))]" />
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{ originX: 0 }}
      className="h-px w-full bg-gradient-to-r from-primary-glow/70 via-hairline-strong to-primary-glow/70"
    />
    <span className="absolute right-0 h-1.5 w-1.5 rounded-full bg-primary-glow shadow-[0_0_8px_hsl(var(--primary-glow))]" />
  </div>
);

/* Auto-scrolling infinite icon marquee */
const IconGrid = ({ ariaHidden }: { ariaHidden?: boolean }) => (
  <div
    aria-hidden={ariaHidden}
    className="grid grid-cols-6 gap-1.5"
  >
    {ICONS.map((icon, i) => (
      <div
        key={i}
        className="aspect-square rounded-[5px] bg-surface-elevated border border-hairline flex items-center justify-center p-1.5"
      >
        <img src={icon} alt="" className="h-full w-full object-contain" />
      </div>
    ))}
  </div>
);

const ToolMarquee = () => (
  <div className="relative h-[230px] overflow-hidden">
    <motion.div
      animate={{ y: ["0%", "-50%"] }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      className="flex flex-col gap-1.5"
    >
      <IconGrid />
      <IconGrid ariaHidden />
    </motion.div>
    {/* fade masks */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background to-transparent" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background to-transparent" />
  </div>
);

const AgentBand = () => {
  return (
    <div className="relative w-full border-t border-b border-hairline">
      {/* central spotlight */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[55%] w-[45%] rounded-full bg-primary-glow/20 blur-[120px] animate-spotlight-pulse" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12">
        {/* main row */}
        <div className="flex items-stretch justify-center">
          {/* ── Left column ─────────────────────────────────────── */}
          <div className="hidden lg:flex flex-col gap-5 w-[290px] shrink-0">
            <Panel delay={0.1}>
              <div className={label}>NAYAN_SEARCH_TOOLS</div>
              <div className="mt-3 mb-3 flex items-center gap-2 border border-hairline bg-white/[0.03] px-2.5 py-1.5">
                <svg className="h-3 w-3 shrink-0 text-muted-soft" fill="none" viewBox="0 0 12 12"><circle cx="5.25" cy="5.25" r="3.75" stroke="currentColor" strokeWidth="1" /><path d="M8 8l2.5 2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1" /></svg>
                <span className="truncate text-[11px] text-muted">
                  mobile apps · backend systems · AI integrations
                </span>
                <span className="ml-auto shrink-0 text-[10px] text-muted-soft">
                  60+ skills
                </span>
              </div>
              <ToolMarquee />
            </Panel>

            <Panel delay={0.5}>
              <div className={label}>WATCH IT IN ACTION</div>
              <Link
                href="#projects"
                className="mt-3 flex w-fit items-center bg-white px-4 py-2 text-[11px] font-semibold text-black transition-colors hover:bg-white/90"
              >
                VIEW PROJECTS
              </Link>
            </Panel>
          </div>

          <Connector delay={0.45} />

          {/* ── Center: agent chat ──────────────────────────────── */}
          <Panel
            delay={0.2}
            className="relative z-10 w-full max-w-[420px] lg:w-[400px] shrink-0 flex flex-col rounded-2xl !bg-surface shadow-2xl !p-0"
          >
            <div className="flex items-center justify-center gap-2 py-3.5 border-b border-hairline">
              <span className="text-primary-glow text-[14px]">✦</span>
              <span className="text-[13px] font-medium text-body-strong">
                Nayan <span className="font-normal text-muted-soft">Stack Agent</span>
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-4 px-5 pt-5 pb-3 min-h-[300px]">
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-xl bg-surface-elevated px-4 py-2.5 text-[13px] leading-relaxed text-body">
                  Build a production multi-tenant platform with React Native,
                  NestJS, AI workflows, and payment integrations.
                </div>
              </div>

              <div className="text-[12px] uppercase tracking-wide text-muted-soft">
                MOBILE: React Native · Kotlin · TypeScript · RTK Query
              </div>
              <div className="text-[12px] uppercase tracking-wide text-muted-soft">
                BACKEND: NestJS · Prisma · Redis · BullMQ · Socket.IO
              </div>

              <div className="text-[14px] leading-relaxed text-body-strong">
                Shipping cross-platform products with offline-first flows,
                role-based security, AI copilots, and AWS CI/CD pipelines. ✅
              </div>
            </div>

            <div className="px-3 pb-3">
              <div className="flex flex-col gap-2 rounded-xl bg-surface-elevated px-4 pt-3 pb-2.5">
                <span className="text-[13px] text-muted-soft">Reply…</span>
                <div className="flex items-center justify-between">
                  <svg className="h-[18px] w-[18px] text-muted-soft" fill="none" viewBox="0 0 18 18"><path d="M9 1.5v15M1.5 9h15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[12px] text-muted-soft">RTK Query</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                      <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 14 14"><path d="M7 12V2M7 2L3 6M7 2l4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <Connector delay={0.55} />

          {/* ── Right column ────────────────────────────────────── */}
          <div className="hidden lg:flex flex-col gap-5 w-[300px] shrink-0">
            <Panel delay={0.3}>
              <div className={label}>MANAGE_CONNECTIONS</div>
              <div className="mt-2 mb-3 text-[10px] text-muted-soft">
                PROFILE: nayan.fullstack.mobile
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { name: "OpenAI + Pinecone", meta: "AI / Vector" },
                  { name: "WhatsApp Cloud API", meta: "Messaging" },
                  { name: "Google Maps SDK", meta: "Location" },
                ].map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between border border-hairline bg-white/[0.03] px-2.5 py-2"
                  >
                    <div className="flex flex-col">
                      <span className="text-[12px] leading-tight text-body">
                        {c.name}
                      </span>
                      <span className="text-[9px] leading-tight text-muted-soft">
                        {c.meta}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-[11px] text-success">
                      <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                      Connected
                    </span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel delay={0.4}>
              <div className="flex items-center justify-between">
                <span className={label}>EXECUTE_TOOL</span>
                <span className="text-[10px] text-muted-soft">SESSION: stack-sync</span>
              </div>
              <div className="mt-3 flex items-center gap-2 border border-hairline bg-white/[0.03] px-2.5 py-2">
                <span className="text-primary-glow text-[12px]">▣</span>
                <span className="text-[12px] text-body">TENANT_BOOTSTRAP_PIPELINE</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px]">
                <span className="text-muted-soft">db</span>
                <span className="text-body">PostgreSQL + Prisma</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted-soft">queue</span>
                <span className="text-body">BullMQ · Redis · Worker ready</span>
              </div>
              <div className="mt-2.5 text-[10px] text-success">
                ✓ 200 OK · mobile + backend + ai + payments synced
              </div>
            </Panel>

          </div>
        </div>

        {/* ── Bottom: build sandbox ─────────────────────────────── */}
        <Panel delay={0.6} className="hidden lg:block mt-5 mx-auto max-w-3xl">
          <div className="flex items-center justify-between">
            <span className={label}>NAYAN_SANDBOX</span>
            <span className="text-[10px] text-muted-soft">
              ● sandbox · node 20 · react-native · aws
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {[
              [
                "instance-0",
                "$ docker compose up -d api redis postgres",
                "✓ nestjs :3000 · redis · postgres · socket gateway healthy",
              ],
              [
                "instance-1",
                "$ gh workflow run mobile-release",
                "✓ ci/cd passed · play console + app store connect ready",
              ],
            ].map(([inst, cmd, out], i) => (
              <div
                key={i}
                className="border border-hairline bg-canvas-deep px-3 py-2.5 text-[10px] leading-relaxed"
              >
                <div className="flex items-center justify-between text-muted-soft">
                  <span>{inst}</span>
                  <span className="text-success">completed</span>
                </div>
                <div className="mt-1.5 text-body">{cmd}</div>
                <div className="text-success">{out}</div>
                <span className="inline-block mt-1 h-2.5 w-1.5 bg-primary-glow animate-caret-blink" />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default AgentBand;
