import type { Trait } from "@/content/types";
import { Section } from "./Section";

export function WhyMe({ traits }: { traits: Trait[] }) {
  return (
    <Section id="why-me" label="04. why me" title="Why hire me">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {traits.map((trait, i) => (
          <li key={trait.title} className="min-w-0 break-words rounded-xl border border-border bg-surface p-6">
            <span aria-hidden="true" className="font-mono text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg font-semibold">{trait.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{trait.example}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
