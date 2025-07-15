import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import projects, { Project } from "@/data/projects";
import { ProjectDetailClient } from "./project-detail-client";

// Function to find project by ID
function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

// Generate metadata for each project page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = getProjectById(params.id);
  
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found."
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.category,
    openGraph: {
      title: project.title,
      description: project.category,
      images: [
        {
          url: project.src,
          width: 1200,
          height: 800,
          alt: project.title,
        },
      ],
    },
  };
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);

  // If project not found, show 404
  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
} 