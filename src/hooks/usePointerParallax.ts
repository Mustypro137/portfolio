"use client";

import { useEffect, type RefObject } from "react";
import { canUsePointerMotion } from "@/lib/motionPrefs";

/**
 * Writes the pointer position to `--px` / `--py` (each -1..1, viewport-relative)
 * on the element, so descendants can offset themselves in pure CSS. Updates are
 * rAF-throttled, paused while the element is off screen, and skipped entirely on
 * touch devices or when reduced motion is requested.
 */
export function usePointerParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !canUsePointerMotion()) return;

    let visible = true;
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
          })
        : null;
    observer?.observe(el);

    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      if (!visible || e.pointerType !== "mouse") return;
      x = (e.clientX / window.innerWidth - 0.5) * 2;
      y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}
