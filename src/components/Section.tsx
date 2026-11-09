"use client";

import { useEffect, useRef, type ReactNode } from "react";

type SectionProps = {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
};

/**
 * Shared wrapper for every page section. Sections below the fold fade in the
 * first time they scroll into view. Content is never hidden unless the browser
 * can reveal it again (IntersectionObserver available, JS running).
 */
export function Section({ id, label, title, children }: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || !window.IntersectionObserver) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen

    el.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.remove("reveal-pending");
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className="reveal scroll-mt-24 py-20 sm:py-24">
      <p className="font-mono text-sm text-accent">{label}</p>
      <h2 id={`${id}-title`} className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}
