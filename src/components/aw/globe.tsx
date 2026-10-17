"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

/**
 * Dotted WebGL globe (cobe) with the awrs.me dark-theme settings.
 * Spins slowly on its own; drag to rotate it, with inertia on release.
 */
const Globe = ({ size = 420, className }: { size?: number; className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const velPhi = useRef(0);
  const velTheta = useRef(0);
  const phi = useRef(0.8);
  const theta = useRef(0.15);

  useEffect(() => {
    if (!canvasRef.current) return;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: phi.current,
      theta: theta.current,
      dark: 1,
      diffuse: 1.5,
      mapSamples: 30000,
      mapBrightness: 8,
      mapBaseBrightness: 0.02,
      baseColor: [0.05, 0.03, 0.04],
      markerColor: [0.83, 0.33, 0.49],
      glowColor: [0.05, 0.02, 0.04],
      markers: [],
      scale: 1.02,
      opacity: 1,
      onRender: (state) => {
        if (dragging.current) {
          phi.current += velPhi.current;
          theta.current += velTheta.current;
        } else {
          phi.current += 0.002 + velPhi.current;
          velPhi.current *= 0.92;
          theta.current += (0.15 - theta.current) * 0.06; // ease back to resting tilt
        }
        theta.current = Math.max(-0.6, Math.min(0.6, theta.current));
        state.phi = phi.current;
        state.theta = theta.current;
      },
    });

    return () => globe.destroy();
  }, [size]);

  const release = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragging.current = false;
    e.currentTarget.style.cursor = "grab";
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className={`globe-glow-wrap ${className ?? ""}`} style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size, cursor: "grab", touchAction: "none" }}
        onPointerDown={(e) => {
          dragging.current = true;
          last.current = { x: e.clientX, y: e.clientY };
          velPhi.current = 0;
          velTheta.current = 0;
          e.currentTarget.style.cursor = "grabbing";
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          const dx = e.clientX - last.current.x;
          const dy = e.clientY - last.current.y;
          last.current = { x: e.clientX, y: e.clientY };
          velPhi.current = dx / 120;
          velTheta.current = dy / 120;
        }}
      />
    </div>
  );
};

export default Globe;
