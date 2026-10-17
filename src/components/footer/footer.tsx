import React from "react";
import Link from "next/link";
import { config } from "@/data/config";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Mail } from "lucide-react";

const links = [
  { title: "Home", href: "/" },
  { title: "Key Work", href: "/work" },
  { title: "Projects", href: "/projects" },
  { title: "Contact", href: "/contact" },
];

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-[var(--aw-border)] bg-[var(--aw-bg)] px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--aw-primary)] to-[var(--aw-primary-dark)] font-display text-sm font-bold text-white">
            NM
          </span>
          <span className="font-display text-base font-semibold text-[var(--aw-text)]">
            {config.author}
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-5">
          {links.map((l) => (
            <Link
              key={l.title}
              href={l.href}
              className="text-sm text-[var(--aw-text-secondary)] transition-colors hover:text-[var(--aw-primary)]"
            >
              {l.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`mailto:${config.email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--aw-border)] text-[var(--aw-text-secondary)] transition-colors hover:border-[var(--aw-primary)] hover:text-[var(--aw-primary)]"
          >
            <Mail size={17} />
          </Link>
          <Link
            href={config.social.github}
            target="_blank"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--aw-border)] text-[var(--aw-text-secondary)] transition-colors hover:border-[var(--aw-primary)] hover:text-[var(--aw-primary)]"
          >
            <SiGithub size={17} />
          </Link>
          <Link
            href={config.social.linkedin}
            target="_blank"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--aw-border)] text-[var(--aw-text-secondary)] transition-colors hover:border-[var(--aw-primary)] hover:text-[var(--aw-primary)]"
          >
            <SiLinkedin size={17} />
          </Link>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-center text-xs text-[var(--aw-text-tertiary)] sm:text-left">
        © {year} {config.author}. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
