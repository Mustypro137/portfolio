"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { FloatingShapes } from "./FloatingShapes";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/** A thin rotating ring arc; `dot` adds a glowing satellite that orbits with it. */
function Orbit({ width, spin, arc, thickness = "2px", reverse = false, dot }: {
  width: string;
  spin: string;
  arc: string;
  thickness?: string;
  reverse?: boolean;
  dot?: string;
}) {
  return (
    <div
      className="poster-orbit"
      data-reverse={reverse ? "" : undefined}
      style={v({ "--w": width, "--spin": spin, "--arc": arc, "--t": thickness, ...(dot ? { "--dot": dot } : {}) })}
    >
      <span className="poster-orbit-stroke" />
      {dot && <span className="poster-orbit-dot" />}
    </div>
  );
}

/** Centres a backdrop element on the figure's chest (slightly above the middle of the stage). */
const centred = "shape inset-0 grid place-items-center pb-[16%]";

/**
 * The Hero's visual column, built in depth: a halo and ring arcs behind, then the
 * cutout figure, then shapes in front. Mouse movement shifts each layer by a
 * different amount. The photo itself is passed in as children so it stays
 * server-rendered.
 */
export function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  usePointerParallax(ref);

  return (
    <div ref={ref} className="hero-stage">
      <div aria-hidden="true" className="poster-backdrop pointer-events-none absolute inset-0 z-[1]">
        <div className={centred} style={v({ "--depth": 10, "--enter": "250ms" })}>
          <div className="poster-halo" />
        </div>
        <div className={centred} style={v({ "--depth": 18, "--enter": "500ms" })}>
          <Orbit
            width="78%"
            spin="46s"
            thickness="1px"
            dot="var(--accent-2)"
            arc="conic-gradient(from 20deg, transparent 0deg, rgb(167 139 250 / 0.95) 90deg, transparent 150deg, transparent 220deg, rgb(96 165 250 / 0.85) 290deg, transparent 350deg)"
          />
        </div>
        <div className={centred} style={v({ "--depth": 26, "--enter": "650ms" })}>
          <Orbit
            width="100%"
            spin="70s"
            reverse
            thickness="1px"
            dot="var(--accent)"
            arc="conic-gradient(from 200deg, transparent 0deg, rgb(96 165 250 / 0.7) 70deg, transparent 130deg, transparent 210deg, rgb(167 139 250 / 0.6) 280deg, transparent 340deg)"
          />
        </div>
      </div>

      <FloatingShapes layer="back" />

      <div className="poster-lane">
        <div className="poster-figure">
          <div className="poster-mask">{children}</div>
        </div>
      </div>

      <FloatingShapes layer="front" />
    </div>
  );
}
