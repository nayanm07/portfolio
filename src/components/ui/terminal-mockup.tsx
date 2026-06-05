"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Composio's signature hero anchor — a 2×2 grid of dark code/output panes
 * floating over a central electric-blue spotlight glow. Collapses to a single
 * pane on mobile.
 */

type Line = { tokens: { t: string; c?: string }[] };

const C = {
  key: "text-violet",
  fn: "text-primary-glow",
  str: "text-success",
  num: "text-cyan",
  com: "text-muted-soft",
  punc: "text-body",
  ok: "text-success",
  body: "text-body-strong",
  violet: "text-violet",
  muted: "text-muted-foreground",
};

const Pane = ({
  title,
  badge,
  lines,
  className,
  delay,
}: {
  title: string;
  badge?: string;
  lines: Line[];
  className?: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      "rounded-lg border border-hairline-strong bg-surface overflow-hidden",
      className
    )}
  >
    <div className="flex items-center gap-2 px-3 py-2 border-b border-hairline bg-surface-elevated/60">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-2 text-[11px] font-mono text-muted truncate">
        {title}
      </span>
      {badge && (
        <span className="ml-auto text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-strong text-body-strong border border-hairline-strong">
          {badge}
        </span>
      )}
    </div>
    <pre className="px-4 py-3 text-[11.5px] leading-[1.55] font-mono overflow-hidden">
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre">
          {line.tokens.map((tok, j) => (
            <span key={j} className={tok.c ?? "text-body"}>
              {tok.t}
            </span>
          ))}
        </div>
      ))}
    </pre>
  </motion.div>
);

const TerminalMockup = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative w-full max-w-[560px]", className)}>
      {/* Central electric-blue spotlight glow behind the grid */}
      <div className="absolute inset-0 -z-0 flex items-center justify-center">
        <div className="h-[70%] w-[70%] rounded-full bg-primary-glow/25 blur-[90px] animate-spotlight-pulse" />
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl border border-hairline-strong bg-canvas-deep">
        <Pane
          title="tenant.guard.ts"
          badge="NestJS"
          delay={0.1}
          lines={[
            { tokens: [{ t: "@Injectable", c: C.fn }, { t: "()", c: C.punc }] },
            {
              tokens: [
                { t: "class ", c: C.key },
                { t: "TenantGuard ", c: C.fn },
                { t: "{", c: C.punc },
              ],
            },
            {
              tokens: [
                { t: "  resolve", c: C.fn },
                { t: "(req) {", c: C.punc },
              ],
            },
            {
              tokens: [
                { t: "    return ", c: C.key },
                { t: "req.", c: C.body },
                { t: "headers", c: C.violet },
                { t: "[", c: C.punc },
                { t: "'x-tenant-id'", c: C.str },
                { t: "]", c: C.punc },
              ],
            },
            { tokens: [{ t: "  }", c: C.punc }] },
            { tokens: [{ t: "}", c: C.punc }] },
          ]}
        />
        <Pane
          title="useVoiceBrief.ts"
          badge="React Native"
          delay={0.2}
          lines={[
            {
              tokens: [
                { t: "const ", c: C.key },
                { t: "job ", c: C.body },
                { t: "= ", c: C.punc },
                { t: "await ", c: C.key },
                { t: "transcribe", c: C.fn },
                { t: "(", c: C.punc },
              ],
            },
            {
              tokens: [
                { t: "  audio, ", c: C.body },
                { t: "{ ", c: C.punc },
                { t: "model", c: C.violet },
                { t: ": ", c: C.punc },
                { t: "'deepgram'", c: C.str },
                { t: " }", c: C.punc },
              ],
            },
            { tokens: [{ t: ")", c: C.punc }] },
            { tokens: [{ t: "// → structured criteria", c: C.com }] },
            {
              tokens: [
                { t: "socket.", c: C.body },
                { t: "emit", c: C.fn },
                { t: "(", c: C.punc },
                { t: "'source'", c: C.str },
                { t: ", job)", c: C.punc },
              ],
            },
          ]}
        />
        <Pane
          title="bash — deploy"
          delay={0.3}
          lines={[
            {
              tokens: [
                { t: "$ ", c: C.fn },
                { t: "docker compose up -d", c: C.body },
              ],
            },
            { tokens: [{ t: "✓ postgres  ", c: C.ok }, { t: "healthy", c: C.muted }] },
            { tokens: [{ t: "✓ redis     ", c: C.ok }, { t: "healthy", c: C.muted }] },
            { tokens: [{ t: "✓ nestjs    ", c: C.ok }, { t: ":3000", c: C.muted }] },
            {
              tokens: [
                { t: "$ ", c: C.fn },
                { t: "prisma migrate deploy", c: C.body },
              ],
            },
            { tokens: [{ t: "39 migrations applied", c: C.ok }] },
          ]}
        />
        <Pane
          title="GET /v1/campaigns"
          badge="200 OK"
          delay={0.4}
          lines={[
            { tokens: [{ t: "{", c: C.punc }] },
            {
              tokens: [
                { t: '  "status"', c: C.violet },
                { t: ": ", c: C.punc },
                { t: '"active"', c: C.str },
                { t: ",", c: C.punc },
              ],
            },
            {
              tokens: [
                { t: '  "calls"', c: C.violet },
                { t: ": ", c: C.punc },
                { t: "1284", c: C.num },
                { t: ",", c: C.punc },
              ],
            },
            {
              tokens: [
                { t: '  "endpoints"', c: C.violet },
                { t: ": ", c: C.punc },
                { t: "23", c: C.num },
              ],
            },
            { tokens: [{ t: "}", c: C.punc }] },
          ]}
        />
      </div>
    </div>
  );
};

export default TerminalMockup;
