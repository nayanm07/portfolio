"use client";

import React from "react";
import { cn } from "@/lib/utils";

/** Card with a soft glow that follows the cursor (styles: .spotlight-card in globals.css). */
const SpotlightCard = ({
  className,
  spotlightColor = "rgba(212, 84, 126, 0.15)",
  style,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { spotlightColor?: string }) => {
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spotlight-x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--spotlight-y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      className={cn("spotlight-card group/card", className)}
      style={{ ["--spotlight-color" as any]: spotlightColor, ...style }}
      onMouseMove={onMouseMove}
      {...rest}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
