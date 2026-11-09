"use client";

import { useEffect, useRef, useState } from "react";

type State = "idle" | "copied" | "failed";

const LABEL: Record<State, string> = { idle: "Copy email", copied: "Copied", failed: "Copy failed" };
const ANNOUNCE: Record<State, string> = {
  idle: "",
  copied: "Email address copied to clipboard.",
  failed: "Could not copy. Use the email link instead.",
};

/** Copies the address to the clipboard; the icon and label morph for a moment to confirm. */
export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    let next: State = "copied";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      next = "failed";
    }
    setState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        data-state={state}
        aria-label="Copy email address"
        className="btn btn-ghost btn-lg copy-btn"
      >
        <svg
          key={state}
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="morph-in size-[1.1em] shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {state === "copied" ? (
            <path d="M20 6 9 17l-5-5" />
          ) : (
            <>
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </>
          )}
        </svg>
        <span key={`label-${state}`} aria-hidden="true" className="morph-in">
          {LABEL[state]}
        </span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {ANNOUNCE[state]}
      </span>
    </>
  );
}
