import type { CSSProperties } from "react";
import type { SkillGroup } from "@/content/types";
import { Reveal } from "./motion/Reveal";
import { Section } from "./Section";
import { SkillCard } from "./SkillCard";

/** Asymmetric 5-column rhythm on large screens: wide, narrow, then a full-width row. */
const spans = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-5"];

/** Decorative code glyphs that drift behind the cards. Purely visual. */
const glyphs = [
  { text: "</>", style: { top: "-1.5rem", right: "6%", "--float-dur": "9s" } },
  { text: "{ }", style: { top: "38%", left: "-1rem", "--float-dur": "11s", "--float-delay": "-3s" } },
  { text: "=>", style: { bottom: "-1.5rem", right: "22%", "--float-dur": "8s", "--float-delay": "-5s" } },
  { text: "#", style: { top: "12%", left: "44%", "--float-dur": "10s", "--float-delay": "-2s" }, hideOnMobile: true },
  { text: "[ ]", style: { bottom: "14%", left: "3%", "--float-dur": "12s", "--float-delay": "-6s" }, hideOnMobile: true },
];

export function Skills({ skills }: { skills: SkillGroup[] }) {
  return (
    <Section id="skills" label="03. skills" title="Skills" stagger>
      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {glyphs.map((g) => (
            <span
              key={g.text}
              className={`skill-glyph shape-float absolute font-mono text-4xl font-bold ${g.hideOnMobile ? "max-md:hidden" : ""}`}
              style={g.style as CSSProperties}
            >
              {g.text}
            </span>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {skills.map((group, i) => (
            <Reveal
              key={group.group}
              variant={i % 2 === 0 ? "left" : "right"}
              delay={i * 100}
              className={`min-w-0 ${spans[i % spans.length]}`}
            >
              <SkillCard group={group} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={200}>
        <p className="mt-8 flex items-center gap-2 font-mono text-xs text-muted">
          <span aria-hidden="true" className="inline-block size-2.5 rounded-sm border border-accent shadow-[0_0_8px_rgb(167_139_250/0.5)]" />
          Highlighted skills are my strongest.
        </p>
      </Reveal>
    </Section>
  );
}
