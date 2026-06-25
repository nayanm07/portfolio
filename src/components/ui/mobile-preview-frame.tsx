import React from "react";
import { cn } from "@/lib/utils";

type MobilePreviewFrameProps = {
  className?: string;
  children: React.ReactNode;
};

export default function MobilePreviewFrame({
  className,
  children,
}: MobilePreviewFrameProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] rounded-[2rem] bg-zinc-900 p-[6px] shadow-[0_18px_50px_rgba(0,0,0,0.55)] ring-1 ring-white/20",
        className
      )}
    >
      <div className="pointer-events-none absolute -left-[2px] top-16 h-8 w-[2px] rounded-full bg-zinc-500/70" />
      <div className="pointer-events-none absolute -left-[2px] top-[6.6rem] h-10 w-[2px] rounded-full bg-zinc-500/70" />
      <div className="pointer-events-none absolute -right-[2px] top-24 h-12 w-[2px] rounded-full bg-zinc-500/70" />

      <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] border border-white/10 bg-black">
        <div className="h-full w-full">{children}</div>

        <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-20 h-1 w-14 -translate-x-1/2 rounded-full bg-white/35" />
      </div>
    </div>
  );
}
