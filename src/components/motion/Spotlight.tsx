"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { canUsePointerMotion } from "@/lib/motionPrefs";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  /** Also tilt the card in 3D toward the mouse (mouse + motion-allowed only). */
  tilt?: boolean;
};

const MAX_TILT_DEG = 6;

/**
 * A card whose border lifts and whose surface is lit by a soft glow that follows
 * the mouse. Hover effects are mouse-only (see the `.spotlight` rules).
 */
export function Spotlight({ children, className = "", tilt = false }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x.toFixed(0)}px`);
    el.style.setProperty("--my", `${y.toFixed(0)}px`);
    if (tilt && canUsePointerMotion()) {
      el.style.setProperty("--tx", `${((x / r.width - 0.5) * 2 * MAX_TILT_DEG).toFixed(2)}deg`);
      el.style.setProperty("--ty", `${(-(y / r.height - 0.5) * 2 * MAX_TILT_DEG).toFixed(2)}deg`);
    }
  }

  function onLeave() {
    ref.current?.style.removeProperty("--tx");
    ref.current?.style.removeProperty("--ty");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`spotlight${tilt ? " spotlight-tilt" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
