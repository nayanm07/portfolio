"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Button } from "@/components/ui/button";
import DeviceFrame from "@/components/ui/device-frame";
import { cn } from "@/lib/utils";

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Project hero section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1
              className={cn(
                "text-4xl md:text-6xl font-bold mb-4",
                "bg-gradient-to-b from-black/80 to-black/50",
                "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20",
                "bg-clip-text text-transparent"
              )}
            >
              {project.title}
            </h1>
            <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              {project.category}
            </div>
          </div>

          {/* Project images - Main image on left, Device frame on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Main project image */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
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
              <DeviceFrame className="w-[280px]">
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
              </DeviceFrame>
            </div>
          </div>
        </div>

        {/* Skills section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Technologies Used
          </h2>
          <div className="flex flex-col md:flex-row md:justify-center items-center gap-8">
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
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {project.content}

            {/* Intigration Technologies section */}
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="mt-16 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full sm:w-auto">
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
