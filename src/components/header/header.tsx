"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/data/config";
import { Command, Search, ArrowUpRight, CornerDownLeft } from "lucide-react";

type NavItem = { title: string; href: string };

// Each item is its own page
const NAV: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Key Work", href: "/work" },
  { title: "Projects", href: "/projects" },
  { title: "Contact", href: "/contact" },
];

type CommandItem = { label: string; group: string; href: string; external?: boolean };

const COMMANDS: CommandItem[] = [
  { label: "Home", group: "Pages", href: "/" },
  { label: "Key Work", group: "Pages", href: "/work" },
  { label: "Projects", group: "Pages", href: "/projects" },
  { label: "Contact", group: "Pages", href: "/contact" },
  { label: "About", group: "On the home page", href: "/#about" },
  { label: "Experience", group: "On the home page", href: "/#experience" },
  { label: "Skills", group: "On the home page", href: "/#skills" },
  { label: "Resume", group: "Links", href: "/assets/Nayan-Resume.pdf", external: true },
  { label: "Email", group: "Links", href: `mailto:${config.email}`, external: true },
  { label: "GitHub", group: "Links", href: config.social.github, external: true },
  { label: "LinkedIn", group: "Links", href: config.social.linkedin, external: true },
];

/** The nav item for the current page (project detail pages count as Projects) */
const useActive = () => {
  const pathname = usePathname();
  const match = NAV.filter((n) => n.href !== "/").find((n) => pathname.startsWith(n.href));
  return match ? match.title : pathname === "/" ? "Home" : "";
};

const CommandMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () => COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  const run = (item: CommandItem) => {
    onClose();
    if (item.external) window.open(item.href, "_blank", "noopener");
    else router.push(item.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[index]) {
      run(results[index]);
    }
  };

  const groups = Array.from(new Set(results.map((r) => r.group)));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--aw-border)] bg-[#0a0a0a] shadow-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[var(--aw-border)] px-4">
              <Search size={16} className="text-[var(--aw-text-tertiary)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command or search..."
                className="h-12 flex-1 bg-transparent text-sm text-[var(--aw-text)] outline-none placeholder:text-[var(--aw-text-tertiary)]"
              />
              <kbd className="rounded border border-[var(--aw-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--aw-text-tertiary)]">
                ESC
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-[var(--aw-text-tertiary)]">
                  No results found.
                </p>
              )}
              {groups.map((group) => (
                <div key={group} className="mb-1">
                  <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--aw-text-tertiary)]">
                    {group}
                  </p>
                  {results
                    .filter((r) => r.group === group)
                    .map((item) => {
                      const i = results.indexOf(item);
                      const active = i === index;
                      return (
                        <button
                          key={item.label}
                          onMouseEnter={() => setIndex(i)}
                          onClick={() => run(item)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors"
                          style={{
                            background: active ? "#1c1c1c" : "transparent",
                            color: active ? "var(--aw-text)" : "var(--aw-text-secondary)",
                          }}
                        >
                          {item.label}
                          {active &&
                            (item.external ? (
                              <ArrowUpRight size={14} className="text-[var(--aw-primary)]" />
                            ) : (
                              <CornerDownLeft size={14} className="text-[var(--aw-primary)]" />
                            ))}
                        </button>
                      );
                    })}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const active = useActive();
  const [menuOpen, setMenuOpen] = useState(false);

  // ⌘K / Ctrl+K toggles the command menu, Esc closes it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMenuOpen((v) => !v);
      } else if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <nav className="mx-auto grid h-[72px] max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-10">
          {/* Logo */}
          <Link
            href="/"
            aria-label={`${config.author} — home`}
            className="pointer-events-auto justify-self-start transition-all duration-300 hover:scale-105 hover:opacity-90 hover:drop-shadow-[0_0_10px_rgba(212,84,126,0.55)]"
          >
            <Image src="/assets/logo-mark.png" alt={config.author} width={40} height={40} priority className="h-10 w-10" />
          </Link>

          {/* Centered pill */}
          <div className="pointer-events-auto hidden items-center gap-1 rounded-full border border-white/[0.08] bg-[#0a0a0a]/90 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md md:flex">
            {NAV.map((item) => {
              const isActive = active === item.title;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="relative rounded-full px-5 py-2 text-[15px] font-medium transition-colors"
                  style={{ color: isActive ? "#fff" : "var(--aw-text-secondary)" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-[#262626]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    >
                      {/* pink glow bar on top */}
                      <span className="absolute -top-[7px] left-1/2 h-[3px] w-10 -translate-x-1/2 rounded-full bg-[var(--aw-primary)] shadow-[0_0_14px_3px_rgba(212,84,126,0.7)]" />
                      <span className="absolute -top-5 left-1/2 h-8 w-16 -translate-x-1/2 rounded-full bg-primary/30 blur-xl" />
                    </motion.span>
                  )}
                  <span className="relative z-10 hover:text-white">{item.title}</span>
                </Link>
              );
            })}
          </div>

          {/* ⌘ button */}
          <button
            aria-label="Open command menu (Ctrl+K)"
            title="Command menu (Ctrl+K)"
            onClick={() => setMenuOpen(true)}
            className="pointer-events-auto col-start-3 flex h-12 w-12 items-center justify-center justify-self-end rounded-xl border border-white/[0.08] bg-[#0a0a0a]/90 text-[var(--aw-text)] backdrop-blur-md transition-colors hover:border-primary/60 hover:text-[var(--aw-primary)]"
          >
            <Command size={20} />
          </button>
        </nav>
      </header>

      <CommandMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
