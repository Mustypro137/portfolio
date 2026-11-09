import type { CSSProperties } from "react";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Rising bars: small steps adding up. */
function Steps() {
  return (
    <div className="flex h-full items-end justify-center gap-2">
      {[28, 44, 60, 78, 100].map((h, n) => (
        <span key={n} className="art-bar" style={{ ...i(n), height: `${h}%` }} />
      ))}
    </div>
  );
}

/** Blocks stacking up from the bottom: building. */
function Blocks() {
  return (
    <div className="mx-auto grid h-full w-40 grid-cols-3 content-end gap-2">
      {Array.from({ length: 9 }, (_, n) => (
        <span key={n} className={`art-block ${n % 3 === 1 ? "art-block-alt" : ""}`} style={i(8 - n)} />
      ))}
    </div>
  );
}

/** Lines of text being written, with a cursor. */
function Writing() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {[100, 82, 92, 56].map((w, n) => (
        <span key={n} className="art-line" style={{ ...i(n), width: `${w}%` }} />
      ))}
      <span className="art-cursor" />
    </div>
  );
}

/** A score ring that fills, with a check inside. */
function Quality() {
  return (
    <svg viewBox="0 0 100 100" className="mx-auto h-full max-h-32">
      <defs>
        <linearGradient id="art-ring-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="7" />
      <circle
        className="art-ring"
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="url(#art-ring-gradient)"
        strokeWidth="7"
        strokeLinecap="round"
        pathLength="100"
        strokeDasharray="100"
        transform="rotate(-90 50 50)"
      />
      <path d="M34 51l11 11 21-23" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** An AI node handing work across to a human who reviews it. */
function Review() {
  return (
    <div className="flex h-full items-center justify-center">
      <span className="art-node">AI</span>
      <span className="art-link">
        <i className="art-pulse" />
      </span>
      <span className="art-node art-node-me">✓</span>
    </div>
  );
}

const illustrations = [Steps, Blocks, Writing, Quality, Review];

/** A decorative illustration per card, chosen by position. Hidden from assistive tech. */
export function WhyMeArt({ index }: { index: number }) {
  const Art = illustrations[index % illustrations.length];
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Art />
    </div>
  );
}
