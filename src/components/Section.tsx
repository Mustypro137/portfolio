"use client";

import { Fragment, useRef, type CSSProperties, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Reveal } from "./motion/Reveal";

type SectionProps = {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
  /**
   * Set when the section's children reveal themselves (staggered). The section
   * then only reveals its heading instead of fading in as one block.
   */
  stagger?: boolean;
  /** Larger heading whose words slide up one by one (implies the heading reveals itself). */
  splitTitle?: boolean;
  /** Extra classes for the <section> element. */
  className?: string;
};

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Shared wrapper for every page section. By default a section below the fold fades
 * in the first time it scrolls into view. Content is never hidden unless the browser
 * can reveal it again (IntersectionObserver available, JS running).
 */
export function Section({ id, label, title, children, stagger = false, splitTitle = false, className = "" }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const selfStaggered = stagger || splitTitle;
  useReveal(ref, !selfStaggered);

  const heading = (
    <>
      <p className="section-label font-mono text-sm text-accent">{label}</p>
      <h2
        id={`${id}-title`}
        className={`mt-3 font-display font-bold tracking-tight ${splitTitle ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl"}`}
      >
        {splitTitle
          ? title.split(" ").map((word, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <span className="split-word">
                  <span className="split-word-inner" style={step(i)}>
                    {word}
                  </span>
                </span>
              </Fragment>
            ))
          : title}
      </h2>
    </>
  );

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-24 py-20 sm:py-28 ${className}`.trim()}
    >
      {selfStaggered ? <Reveal variant={splitTitle ? "fade" : "rise"}>{heading}</Reveal> : heading}
      <div className="mt-12">{children}</div>
    </section>
  );
}
