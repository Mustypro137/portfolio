"use client";

import { useEffect, useRef } from "react";

const DURATION_MS = 1200;

/**
 * A number that counts up the first time it scrolls into view. The final value is
 * always in the DOM (and in a screen-reader-only copy), so nothing depends on the
 * animation. Numbers already on screen at load, and reduced motion, skip it.
 */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible

    el.textContent = `0${suffix}`;
    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${Math.round(value * eased)}${suffix}`;
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = `${value}${suffix}`;
    };
  }, [value, suffix]);

  return (
    <>
      <span ref={ref} aria-hidden="true">{`${value}${suffix}`}</span>
      <span className="sr-only">{`${value}${suffix}`}</span>
    </>
  );
}
