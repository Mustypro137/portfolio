"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { canUsePointerMotion } from "@/lib/motionPrefs";

type MagneticProps = {
  children: ReactNode;
  /** Fraction of the pointer offset the element follows. Default 0.3. */
  strength?: number;
};

/** Nudges its child toward the mouse while hovered. Mouse-only; inert on touch and reduced motion. */
export function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  function onMove(e: PointerEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || !canUsePointerMotion()) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <span ref={ref} className="magnetic" onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </span>
  );
}
