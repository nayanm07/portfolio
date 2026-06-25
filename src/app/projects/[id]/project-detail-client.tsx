"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Button } from "@/components/ui/button";
import MobilePreviewFrame from "@/components/ui/mobile-preview-frame";
import { cn } from "@/lib/utils";

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-28 h-80 w-80 animate-pulse rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -right-24 top-28 h-96 w-96 animate-pulse rounded-full bg-blue-600/20 blur-3xl [animation-delay:700ms]" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 animate-pulse rounded-full bg-indigo-500/20 blur-3xl [animation-delay:1200ms]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Header with back button */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
          <div className="flex items-center gap-4">
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="default" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Live Site
                </Button>
              </Link>
            )}
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  View Code
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Project hero section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1
              className={cn(
                "mb-4 text-4xl font-bold md:text-6xl",
                "bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 dark:from-cyan-200 dark:via-blue-200 dark:to-indigo-200",
                "bg-clip-text text-transparent"
              )}
            >
              {project.title}
            </h1>
            <div className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur">
              {project.category}
            </div>
          </div>

          {/* Project images - Main image on left, Device frame on right.
              When a project has no demo video (e.g. backend projects), the
              cover image spans the full width on its own. */}
          {project.video ? (
            <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-md lg:grid-cols-2 lg:p-6">
              {/* Main project image */}
              <div className="relative w-full overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
                <Image
                  src={project.src}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Device frame on the right */}
              <div className="flex justify-center">
                <MobilePreviewFrame className="w-[190px] sm:w-[220px] md:w-[240px]">
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full bg-black object-contain"
                  />
                </MobilePreviewFrame>
              </div>
            </div>
          ) : (
            <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur">
              <Image
                src={project.src}
                alt={project.title}
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          )}
        </div>

        {/* Skills section */}
        <div className="mb-12">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Technologies Used
          </h2>
          <div className="flex flex-col items-center gap-8 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur md:flex-row md:justify-center">
            {project.skills.frontend?.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4"></p>
                <FloatingDock items={project.skills.frontend} />
              </div>
            )}
            {project.skills.backend?.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Backend</p>
                <FloatingDock items={project.skills.backend} />
              </div>
            )}
          </div>
        </div>

        {/* Project content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none rounded-2xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur dark:prose-invert">
            {project.content}

            {/* Intigration Technologies section */}
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full bg-cyan-500 text-black hover:bg-cyan-400 sm:w-auto">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Live Site
                </Button>
              </Link>
            )}
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  View Source Code
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
