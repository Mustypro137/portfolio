"use client";

import { useEffect, useRef, useState } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

const SHOW_AFTER_PX = 600;

/**
 * Floating back-to-top button. It appears once you have scrolled down, and its ring
 * fills as you read through the page. Hidden (and out of the tab order) at the top.
 */
export function BackToTop() {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      ref.current?.style.setProperty("--p", progress.toFixed(3));
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function toTop() {
    smoothScrollTo(() => 0);
    // The button hides itself at the top, so hand focus to the site name instead of losing it.
    document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
  }

  return (
    <button ref={ref} type="button" onClick={toTop} aria-label="Back to top" data-visible={visible} className="to-top">
      <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
        <circle cx="24" cy="24" r="22" fill="none" stroke="var(--border)" strokeWidth="2" />
        <circle className="to-top-ring" cx="24" cy="24" r="22" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" pathLength="100" strokeDasharray="100" />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="to-top-arrow relative size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
