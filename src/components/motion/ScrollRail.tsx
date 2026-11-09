"use client";

import { useRef, type ReactNode } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

type ScrollRailProps = {
  children: ReactNode;
  as?: "div" | "ol";
  className?: string;
};

/**
 * A vertical line that fills as the reader scrolls. Descendants marked with
 * `data-node` (usually a `.rail-node` dot) light up as the line passes them.
 * Set `--rail-x` on the container (via className) to position the line.
 */
export function ScrollRail({ children, as: Tag = "div", className = "" }: ScrollRailProps) {
  const ref = useRef<HTMLDivElement & HTMLOListElement>(null);
  useScrollProgress(ref);
  return (
    <Tag ref={ref} className={`relative ${className}`}>
      <span aria-hidden="true" className="rail-line" />
      {children}
    </Tag>
  );
}
