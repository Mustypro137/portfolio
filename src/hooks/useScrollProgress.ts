"use client";

import { useEffect, type RefObject } from "react";

/**
 * Drives a scroll-linked "rail" (timeline line):
 *  - sets `--progress` (0..1) on the element: how far the reading line has travelled through it
 *  - sets `data-lit` ("true" | "false") on each `[data-node]` inside once the line passes it
 *
 * The reading line sits at 60% of the viewport height. Updates are rAF-throttled and
 * paused while the element is off screen. With reduced motion the rail is shown complete.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const nodes = () => el.querySelectorAll<HTMLElement>("[data-node]");

    const reduce = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--progress", "1");
      nodes().forEach((n) => (n.dataset.lit = "true"));
      return;
    }

    let visible = true;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const reading = window.innerHeight * 0.6;
      const progress = rect.height ? Math.min(1, Math.max(0, (reading - rect.top) / rect.height)) : 1;
      el.style.setProperty("--progress", progress.toFixed(4));
      const head = progress * rect.height;
      nodes().forEach((n) => {
        const r = n.getBoundingClientRect();
        n.dataset.lit = r.top - rect.top + r.height / 2 <= head ? "true" : "false";
      });
    };
    const schedule = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
              schedule();
            },
            { rootMargin: "100px 0px" },
          )
        : null;
    observer?.observe(el);

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}
