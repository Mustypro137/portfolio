"use client";

import { useEffect, type RefObject } from "react";

/**
 * Reveals an element the first time it scrolls into view. Elements already on
 * screen are left alone, and nothing is hidden unless the browser can reveal it
 * again (IntersectionObserver available, JS running).
 */
export function useReveal(ref: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || !("IntersectionObserver" in window) || !window.IntersectionObserver) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen

    el.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.remove("reveal-pending");
          el.classList.add("reveal-in");
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, enabled]);
}
