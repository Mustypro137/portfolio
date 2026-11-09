"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

type RevealProps = {
  children: ReactNode;
  /** Entrance direction. Default: rise. */
  variant?: "rise" | "fade" | "left" | "right" | "wipe";
  /** Stagger offset in milliseconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/** Scroll-triggered entrance. Use `delay` (e.g. index * 80) to stagger siblings. */
export function Reveal({ children, variant = "rise", delay = 0, as: Tag = "div", className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
