"use client";
import React from "react";
import ContactForm from "../ContactForm";
import Link from "next/link";
import { config } from "@/data/config";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
const ContactSection = () => {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-[#08080a] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(26,38,255,.2),transparent_33%)]" />
      <div className="relative grid gap-12 px-6 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-16 xl:px-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Available for opportunities
          </span>
          <h2 className="mt-6 max-w-xl font-display text-5xl font-medium leading-[0.95] tracking-tight text-white md:text-7xl">
            Let&apos;s build something worth using.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-white/65">
            Hiring for mobile, web, or backend engineering? Send a note with the role or project context and I&apos;ll get back to you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`mailto:${config.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-white transition hover:border-primary-glow/70 hover:bg-primary-glow/10">
              <Mail className="h-4 w-4" /> Email me <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href={config.social.linkedin} target="_blank" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-primary-glow/70 hover:text-white"><Linkedin className="h-4 w-4" /></Link>
            <Link href={config.social.github} target="_blank" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-primary-glow/70 hover:text-white"><Github className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl backdrop-blur-sm sm:p-8">
          <p className="mb-6 text-xs font-mono uppercase tracking-[0.16em] text-white/50">Start a conversation</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
