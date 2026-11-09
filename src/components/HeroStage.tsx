"use client";

import { useRef, type ReactNode } from "react";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { FloatingShapes } from "./FloatingShapes";

/**
 * The Hero's visual column: portrait with a rotating gradient ring, floating
 * shapes behind it, and subtle mouse-driven depth. The portrait itself is passed
 * in as children so it stays server-rendered.
 */
export function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  usePointerParallax(ref);

  return (
    <div ref={ref} className="hero-stage">
      <FloatingShapes />
      <div className="hero-photo">
        <span aria-hidden="true" className="hero-ring" />
        {children}
      </div>
    </div>
  );
}
