"use client";

import { useEffect } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

/**
 * Makes in-page links (`href="#section"`) glide to their section instead of jumping.
 * One delegated click listener for the whole page. It lands below the sticky header
 * (using the target's `scroll-margin-top`), updates the URL, and moves keyboard focus
 * to the section. Modified clicks, new-tab links and links marked `data-instant` (the
 * skip link) keep the browser's default behaviour.
 */
export function SmoothAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || link.target === "_blank" || link.hasAttribute("data-instant")) return;

      const hash = link.getAttribute("href") ?? "";
      const toTop = hash === "#";
      const target = toTop ? null : document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!toTop && !target) return; // unknown anchor: let the browser handle it

      e.preventDefault();

      if (target) {
        const margin = () => parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        smoothScrollTo(() => target.getBoundingClientRect().top + window.scrollY - margin());
        // Hand focus to the section so keyboard and screen-reader users land there too.
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      } else {
        smoothScrollTo(() => 0);
      }

      if (location.hash !== hash && !(toTop && !location.hash)) {
        history.pushState(null, "", toTop ? location.pathname + location.search : hash);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
