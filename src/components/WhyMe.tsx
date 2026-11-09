import type { Trait } from "@/content/types";
import { CountUp } from "./CountUp";
import { Reveal } from "./motion/Reveal";
import { Spotlight } from "./motion/Spotlight";
import { Section } from "./Section";
import { WhyMeArt } from "./WhyMeArt";

/**
 * Bento layout by position (large screens are a 6-column grid): a wide card, a tall
 * card, two standard cards, then a full-width banner. Extra traits fall back to a
 * standard card.
 */
const layout = [
  { span: "sm:col-span-2 lg:col-span-4", wide: true, art: "h-32 lg:h-36" },
  { span: "lg:col-span-2 lg:row-span-2", tall: true, art: "h-44 lg:h-auto lg:min-h-56 lg:flex-1" },
  { span: "lg:col-span-2", art: "h-32" },
  { span: "sm:col-span-2 lg:col-span-2", art: "h-32" },
  { span: "sm:col-span-2 lg:col-span-6", wide: true, art: "h-32 lg:h-36" },
] as const;

type Slot = { span: string; wide?: boolean; tall?: boolean; art: string };
const slotFor = (i: number): Slot => layout[i] ?? { span: "lg:col-span-2", art: "h-32" };

export function WhyMe({ traits }: { traits: Trait[] }) {
  return (
    <Section id="why-me" label="04. why me" title="Why hire me" stagger>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {traits.map((trait, i) => {
          const slot = slotFor(i);
          return (
            <Reveal key={trait.title} as="li" delay={(i % 3) * 90} className={`min-w-0 ${slot.span}`}>
              <Spotlight
                tilt
                className={`glow-border relative flex h-full flex-col gap-6 overflow-hidden rounded-2xl border border-border bg-surface/70 p-6 ${
                  slot.wide ? "lg:flex-row lg:items-center lg:gap-10" : ""
                }`}
              >
                <span aria-hidden="true" className="absolute right-5 top-4 font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={`art-stage shrink-0 ${slot.art} ${slot.wide ? "lg:w-2/5" : ""}`}>
                  <WhyMeArt index={i} />
                </div>
                <div className="min-w-0 break-words">
                  {trait.stat && (
                    <p className="mb-3 flex items-baseline gap-2">
                      <span className="text-gradient font-display text-5xl font-bold leading-none">
                        <CountUp value={trait.stat.value} suffix={trait.stat.suffix} />
                      </span>
                      <span className="font-mono text-xs text-muted">{trait.stat.label}</span>
                    </p>
                  )}
                  <h3 className="text-lg font-semibold">{trait.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{trait.example}</p>
                </div>
              </Spotlight>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
