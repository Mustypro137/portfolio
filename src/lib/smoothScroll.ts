const MIN_MS = 450;
const MAX_MS = 1100;

/** Ease in and out: gentle start, quick middle, soft landing. */
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const USER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

let stopCurrent: (() => void) | null = null;

/** Stops a smooth scroll in progress (no-op if none). */
export function cancelSmoothScroll() {
  stopCurrent?.();
}

/**
 * Scrolls the window to `targetY()` with an eased animation. The duration grows with
 * the distance. The target is re-read every frame, so it stays correct if the layout
 * shifts mid-scroll (for example a menu closing). Any wheel, touch, key or pointer
 * input from the user stops it at once. With reduced motion it jumps instantly.
 *
 * Steps use `behavior: "instant"` so the page's CSS `scroll-behavior: smooth` can't
 * smooth each step a second time.
 */
export function smoothScrollTo(targetY: () => number) {
  cancelSmoothScroll();

  const reduce = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    window.scrollTo({ top: targetY(), behavior: "instant" });
    return;
  }

  const from = window.scrollY;
  const distance = Math.abs(targetY() - from);
  const duration = Math.min(MAX_MS, Math.max(MIN_MS, 350 + distance * 0.35));
  const start = performance.now();
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    for (const type of USER_SCROLL_EVENTS) window.removeEventListener(type, stop);
    if (stopCurrent === stop) stopCurrent = null;
  };

  const tick = (now: number) => {
    const t = Math.min(1, Math.max(0, (now - start) / duration));
    window.scrollTo({ top: from + (targetY() - from) * easeInOutCubic(t), behavior: "instant" });
    if (t < 1) frame = requestAnimationFrame(tick);
    else stop();
  };

  stopCurrent = stop;
  for (const type of USER_SCROLL_EVENTS) window.addEventListener(type, stop, { passive: true });
  frame = requestAnimationFrame(tick);
}
