/**
 * True only when pointer-driven motion (parallax, magnetic hover) is appropriate:
 * a real mouse is present and the user has not asked for reduced motion.
 * Returns false where matchMedia is unavailable (SSR, jsdom).
 */
export function canUsePointerMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
