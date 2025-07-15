import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { BoxReveal } from "../reveal-animations";
import { cn } from "@/lib/utils";
import { SKILLS } from "@/data/constants";
import { motion } from "framer-motion";

const SkillCard = ({ skill, index }: { skill: any; index: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Torch Effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255, 255, 255, 0.1) 0%, 
              rgba(255, 255, 255, 0.05) 40%, 
              transparent 70%)`,
            borderRadius: "12px",
          }}
        />
      )}

      {/* Card */}
      <div
        className={cn(
          "relative w-full h-28 rounded-xl transition-all duration-300 overflow-hidden",
          "bg-gray-900/50 backdrop-blur-sm border border-gray-800",
          "hover:border-gray-700 hover:bg-gray-800/50",
          "shadow-lg hover:shadow-xl"
        )}
      >
        {/* Subtle glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${skill.color}08 0%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-20 p-4 h-full flex flex-col items-center justify-center">
          <div className="w-10 h-10 mb-2 rounded-lg flex items-center justify-center">
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-8 h-8 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
            />
          </div>

          <h3 className="text-[10px] sm:text-xs font-medium text-center text-gray-300 group-hover:text-white transition-colors duration-300">
            {skill.label}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const skillsArray = Object.values(SKILLS);
  return (
    <section id="skills" className="w-full min-h-screen py-20 ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href={"#skills"}>
            <BoxReveal width="100%">
              <h2
                className={cn(
                  "bg-clip-text text-4xl text-center text-transparent md:text-7xl",
                  "bg-gradient-to-b from-white/90 to-white/60"
                )}
              >
                SKILLS
              </h2>
            </BoxReveal>
          </Link>

          <div className="mt-4 text-center">
           
          </div>
        </div>

        {/* Skills Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {skillsArray.map((skill, index) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* View all related icons link */}
      
      </div>
    </section>
  );
};

export default SkillsSection;
