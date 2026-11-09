"use client";

import { useState, type CSSProperties } from "react";
import type { SkillGroup } from "@/content/types";
import { Spotlight } from "./motion/Spotlight";

const pill = "inline-block max-w-full break-words rounded-lg border px-3 py-1.5 text-left font-mono text-xs";
const pillTone = (strong?: boolean) =>
  strong
    ? "border-accent text-accent shadow-[0_0_14px_rgb(167_139_250/0.25)]"
    : "border-border text-muted";
const chipStyle = (i: number) => ({ "--c": i }) as CSSProperties;

/**
 * One skill category. Skills that carry a `note` become buttons: hovering,
 * focusing or tapping one shows its description in a live region below.
 */
export function SkillCard({ group }: { group: SkillGroup }) {
  const [active, setActive] = useState<string | null>(null);
  const hasNotes = group.items.some((s) => s.note);
  const activeSkill = group.items.find((s) => s.name === active);

  return (
    <Spotlight tilt className="glow-border flex h-full flex-col rounded-2xl border border-border bg-surface/70 p-6">
      <h3 className="font-display text-xl font-semibold">{group.group}</h3>
      <ul className="mt-5 flex flex-wrap gap-2">
        {group.items.map((skill, i) => (
          <li key={skill.name} className="skill-chip max-w-full" style={chipStyle(i)}>
            {skill.note ? (
              <button
                type="button"
                data-strong={skill.strong ? "true" : undefined}
                aria-pressed={active === skill.name}
                onMouseEnter={() => setActive(skill.name)}
                onFocus={() => setActive(skill.name)}
                onClick={() => setActive(skill.name)}
                className={`skill-pill ${pill} cursor-pointer ${pillTone(skill.strong)} aria-pressed:bg-accent/15`}
              >
                {skill.name}
              </button>
            ) : (
              <span data-strong={skill.strong ? "true" : undefined} className={`skill-pill ${pill} ${pillTone(skill.strong)}`}>
                {skill.name}
              </span>
            )}
          </li>
        ))}
      </ul>
      {hasNotes && (
        <p aria-live="polite" className="mt-auto min-h-[3.25rem] pt-5 text-sm leading-relaxed text-muted">
          {activeSkill?.note ? (
            <span key={activeSkill.name} className="note-in block">
              <span className="font-mono text-accent">{activeSkill.name}</span>
              {` — ${activeSkill.note}`}
            </span>
          ) : (
            <span className="opacity-70">Hover, focus or tap a skill for a quick note.</span>
          )}
        </p>
      )}
    </Spotlight>
  );
}
