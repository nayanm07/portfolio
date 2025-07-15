import { cn } from "@/lib/utils";
import React from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
  className?: string;
}

const DeviceFrame = ({ children, className }: DeviceFrameProps) => {
  return (
    <div
      className={cn(
        "relative mx-auto group",
        // Outer glow effects
        "before:absolute before:inset-0 before:-z-10",
        "before:rounded-[3.5rem] before:blur-2xl",
        "before:bg-gradient-to-b before:from-blue-500/15 before:via-purple-500/10 before:to-pink-500/15",
        "after:absolute after:inset-0 after:-z-10",
        "after:rounded-[3.5rem] after:blur-lg",
        "after:bg-gradient-to-b after:from-white/5 after:to-black/10",
        className
      )}
    >
      <div
        className={cn(
          "relative",
          // More realistic iPhone proportions and materials
          "border-[8px] rounded-[3rem]",
          "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950",
          "dark:from-slate-700 dark:via-slate-800 dark:to-slate-900",
          "shadow-2xl backdrop-blur-sm",
          "transition-all duration-700 ease-out",
          "group-hover:scale-[1.02] group-hover:rotate-1",
          "group-hover:shadow-3xl group-hover:shadow-purple-500/20",
          // Metallic edge effect
          "ring-1 ring-slate-600/50 dark:ring-slate-500/30"
        )}
      >
        
        {/* Volume Buttons */}
        <div className="absolute left-[-8px] top-[120px] w-2 h-8 bg-slate-700 dark:bg-slate-600 rounded-l-md shadow-inner" />
        <div className="absolute left-[-8px] top-[160px] w-2 h-6 bg-slate-700 dark:bg-slate-600 rounded-l-md shadow-inner" />
        <div className="absolute left-[-8px] top-[190px] w-2 h-6 bg-slate-700 dark:bg-slate-600 rounded-l-md shadow-inner" />
        
        {/* Power Button */}
        <div className="absolute right-[-8px] top-[140px] w-2 h-12 bg-slate-700 dark:bg-slate-600 rounded-r-md shadow-inner" />
        
        {/* Enhanced Notch with more realistic design */}
        <div className="absolute top-0 inset-x-0 z-10">
          <div className="relative h-[32px] mx-auto w-[45%] bg-gradient-to-b from-slate-950 via-black to-slate-900 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-b-2xl border-l border-r border-slate-600/30">
            {/* Speaker grille */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-slate-600 dark:bg-slate-500 rounded-full" />
            {/* Front camera */}
            <div className="absolute top-2 right-3 w-2 h-2 bg-slate-800 dark:bg-slate-700 rounded-full shadow-inner">
              <div className="absolute inset-0.5 bg-slate-900 dark:bg-slate-800 rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Screen Content with more realistic bezels */}
        <div className="relative bg-black overflow-hidden rounded-[2.2rem] aspect-[9/19.5] m-1">
          {/* Screen */}
          <div className="absolute inset-2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-black rounded-[1.8rem] overflow-hidden">
            {children}
          </div>
          
          {/* Screen reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[2.2rem] pointer-events-none" />
          
          {/* Screen edge shadow */}
          <div className="absolute inset-0 shadow-inner rounded-[2.2rem] pointer-events-none border border-slate-800/20" />
        </div>
        
        {/* Enhanced Home Indicator */}
        <div className="absolute bottom-2 left-1/2 w-[35%] h-1 -translate-x-1/2">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent dark:via-slate-600 rounded-full shadow-sm" />
        </div>

        {/* Realistic metallic edge highlights */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-[3rem] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-transparent to-transparent rounded-[3rem] pointer-events-none" />
        
        {/* Antenna lines (like real iPhone) */}
        <div className="absolute top-[60px] left-[-1px] w-[2px] h-8 bg-slate-600/50 dark:bg-slate-500/30" />
        <div className="absolute top-[60px] right-[-1px] w-[2px] h-8 bg-slate-600/50 dark:bg-slate-500/30" />
        <div className="absolute bottom-[60px] left-[-1px] w-[2px] h-8 bg-slate-600/50 dark:bg-slate-500/30" />
        <div className="absolute bottom-[60px] right-[-1px] w-[2px] h-8 bg-slate-600/50 dark:bg-slate-500/30" />
      </div>
    </div>
  );
};

export default DeviceFrame; 