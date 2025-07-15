"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import projects, { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const ProjectsSection = () => {
  return (
    <section id="projects" className="max-w-7xl mx-auto md:h-[130vh]">
      <Link href={"#projects"}>
        <h2
          className={cn(
            "bg-clip-text text-4xl text-center text-transparent md:text-7xl pt-16",
            "bg-gradient-to-b from-black/80 to-black/50",
            "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50 mb-32 mt-10"
          )}
        >
          Projects
        </h2>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="flex items-center justify-center p-2">
      <Link href={`/projects/${project.id}`} className="block group">
        <div className="relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[400px] h-auto rounded-2xl overflow-hidden cursor-pointer transform-gpu transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-black/20 dark:group-hover:shadow-white/10">
          {/* Background card with subtle border */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-white/20 dark:from-gray-900/80 dark:via-gray-800/40 dark:to-gray-900/20 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl" />
          
          {/* Main image container */}
          <div className="relative" style={{ aspectRatio: "3/2" }}>
            <Image
              className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:rotate-1"
              src={project.src}
              alt={project.title}
              width={400}
              height={267}
            />
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm" />
          </div>
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 rounded-2xl" />
          
          {/* Content container */}
          <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500 ease-out group-hover:translate-y-[-4px]">
            <div className="space-y-3">
              {/* Title with improved typography */}
              <h3 className="text-xl font-bold text-white leading-tight tracking-wide group-hover:text-blue-200 transition-colors duration-300">
                {project.title}
              </h3>
              
              {/* Category badge with glass effect */}
              <div className="inline-flex items-center">
                <span className="text-xs font-medium bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full px-3 py-1.5 shadow-lg group-hover:bg-white/30 group-hover:scale-105 transition-all duration-300">
                  {project.category}
                </span>
              </div>
            </div>
          </div>
          
          {/* Enhanced hover overlay with animated elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-2xl">
            <div className="flex items-center justify-center h-full">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
                <div className="relative">
                  {/* Animated background pulse */}
                  <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse" />
                  
                  {/* Main button */}
                  <div className="relative text-white text-sm font-semibold bg-black/60 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 group-hover:scale-105">
                    <span>View Project</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle corner accent */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform scale-0 group-hover:scale-100" />
        </div>
      </Link>
    </div>
  );
};

export default ProjectsSection;
