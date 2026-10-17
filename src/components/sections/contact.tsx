"use client";

import React from "react";
import Link from "next/link";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { ArrowUpRight, Mail } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";

const ContactSection = () => (
  <section
    id="contact"
    className="relative w-full overflow-hidden border-t border-[var(--aw-border)] bg-[var(--aw-bg-secondary)] px-6 py-24 sm:px-10 md:py-32"
  >
    <div className="aw-glow opacity-70" />
    <div className="relative mx-auto max-w-6xl">
      <div className="flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm text-[var(--aw-success)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--aw-success)]" />
          Available for opportunities
        </span>
        <h2 className="mt-7 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-[var(--aw-text)] md:text-7xl">
          Let&apos;s build something real.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--aw-text-secondary)]">
          Hiring for mobile, web, or backend engineering? Send a note with the role or
          project context and I&apos;ll get back to you.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`mailto:${config.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--aw-primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--aw-primary-dark)]"
          >
            <Mail className="h-4 w-4" /> Email me <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href={config.social.linkedin}
            target="_blank"
            aria-label="LinkedIn"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--aw-border)] bg-[var(--aw-card)] text-[var(--aw-text)] transition-colors hover:border-[var(--aw-primary)] hover:text-[var(--aw-primary)]"
          >
            <SiLinkedin className="h-5 w-5" />
          </Link>
          <Link
            href={config.social.github}
            target="_blank"
            aria-label="GitHub"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--aw-border)] bg-[var(--aw-card)] text-[var(--aw-text)] transition-colors hover:border-[var(--aw-primary)] hover:text-[var(--aw-primary)]"
          >
            <SiGithub className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-2xl">
        <div className="aw-card p-6 sm:p-8">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-[var(--aw-text-tertiary)]">
            Start a conversation
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
