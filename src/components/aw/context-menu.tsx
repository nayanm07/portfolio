"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUp, Download, Eye, Mail, RefreshCw } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { cn } from "@/lib/utils";
import { config } from "@/data/config";

const RESUME = "/assets/Nayan-Resume.pdf";
const MENU_WIDTH = 264;
const EDGE = 8; // keep the menu this far from the viewport edges

type Item = {
  label: string;
  icon: React.ElementType;
  run: () => void;
  badge?: string;
  shortcut?: string;
  disabled?: boolean;
};

const openTab = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

/** Where the browser's own menu is more useful: editing text, or copying a selection */
const wantsNativeMenu = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  if (el?.closest("input, textarea, select, [contenteditable='true']")) return true;
  return !!window.getSelection()?.toString().trim();
};

/**
 * Custom right-click menu (awrs.me style): Connect links + page actions.
 * Mounted once in the root layout.
 */
const ContextMenu = () => {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [canGoBack, setCanGoBack] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const groups: { title: string; items: Item[] }[] = [
    {
      title: "Connect",
      items: [
        { label: "View Resume", icon: Eye, badge: "PDF", run: () => openTab(RESUME) },
        {
          label: "Download Resume",
          icon: Download,
          badge: "PDF",
          run: () => {
            const a = document.createElement("a");
            a.href = RESUME;
            a.download = "Nayan-Mehta-Full-Stack-Developer.pdf";
            a.click();
          },
        },
        { label: "GitHub", icon: SiGithub, run: () => openTab(config.social.github) },
        { label: "LinkedIn", icon: SiLinkedin, run: () => openTab(config.social.linkedin) },
        {
          label: "Send Email",
          icon: Mail,
          run: () =>
            openTab(`https://mail.google.com/mail/u/0/?${new URLSearchParams({ fs: "1", to: config.email, tf: "cm" })}`),
        },
      ],
    },
    {
      title: "Page",
      items: [
        { label: "Scroll to Top", icon: ArrowUp, shortcut: "Home", run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
        { label: "Go Back", icon: ArrowLeft, shortcut: "Alt+←", disabled: !canGoBack, run: () => window.history.back() },
        { label: "Refresh", icon: RefreshCw, shortcut: "F5", run: () => window.location.reload() },
      ],
    },
  ];

  // Open on right-click
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      if (wantsNativeMenu(e.target)) return;
      e.preventDefault();
      setAnchor({ x: e.clientX, y: e.clientY });
      setCanGoBack(window.history.length > 1);
      setOpen(true);
    };
    document.addEventListener("contextmenu", onContextMenu);
    return () => document.removeEventListener("contextmenu", onContextMenu);
  }, []);

  // Keep the menu fully on screen (flip left / up near the edges)
  useLayoutEffect(() => {
    if (!open || !menuRef.current) return;
    const { offsetHeight: h } = menuRef.current;
    const x = anchor.x + MENU_WIDTH + EDGE > window.innerWidth ? anchor.x - MENU_WIDTH : anchor.x;
    const y = anchor.y + h + EDGE > window.innerHeight ? anchor.y - h : anchor.y;
    setPos({
      x: Math.max(EDGE, Math.min(x, window.innerWidth - MENU_WIDTH - EDGE)),
      y: Math.max(EDGE, Math.min(y, window.innerHeight - h - EDGE)),
    });
    menuRef.current.querySelector<HTMLButtonElement>("button:not(:disabled)")?.focus();
  }, [open, anchor]);

  // Close on outside click, scroll, resize, blur or Esc; arrow keys move focus
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      const buttons = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? []);
      const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
      const next = e.key === "ArrowDown" ? (i + 1) % buttons.length : (i - 1 + buttons.length) % buttons.length;
      buttons[next]?.focus();
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("resize", close);
    window.addEventListener("blur", close);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close);
      window.removeEventListener("resize", close);
      window.removeEventListener("blur", close);
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          role="menu"
          aria-label="Quick actions"
          className="fixed z-[200] rounded-2xl border-[1.5px] border-[var(--aw-primary)] bg-[#0a0a0a]/95 p-2 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8),0_0_30px_-8px_rgba(212,84,126,0.35)] backdrop-blur-xl"
          style={{ left: pos.x, top: pos.y, width: MENU_WIDTH, transformOrigin: "top left" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          onContextMenu={(e) => e.preventDefault()}
        >
          {groups.map((g, gi) => (
            <div key={g.title} role="group" aria-label={g.title}>
              {gi > 0 && (
                <div className="mx-3 my-2 h-px bg-gradient-to-r from-transparent via-[var(--aw-border)] to-transparent" />
              )}
              <p className="px-3 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--aw-text-tertiary)]">
                {g.title}
              </p>
              {g.items.map((item) => (
                <button
                  key={item.label}
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => {
                    close();
                    item.run();
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[15px] text-[var(--aw-text-secondary)] outline-none transition-colors",
                    "hover:bg-white/[0.06] hover:text-[var(--aw-text)] focus-visible:bg-white/[0.06] focus-visible:text-[var(--aw-text)]",
                    "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                  )}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-primary">
                      {item.badge}
                    </span>
                  )}
                  {item.shortcut && (
                    <span className="font-mono text-[11px] text-[var(--aw-text-tertiary)]">{item.shortcut}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;
