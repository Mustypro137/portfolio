import type { SkillGroup } from "@/content/types";
import { Section } from "./Section";

export function Skills({ skills }: { skills: SkillGroup[] }) {
  return (
    <Section id="skills" label="03. skills" title="Skills">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div key={group.group} className="min-w-0 rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold">{group.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li
                  key={skill.name}
                  data-strong={skill.strong ? "true" : undefined}
                  className={`max-w-full break-words rounded-md border px-2.5 py-1 font-mono text-xs ${
                    skill.strong ? "border-accent text-accent" : "border-border text-muted"
                  }`}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 flex items-center gap-2 font-mono text-xs text-muted">
        <span aria-hidden="true" className="inline-block size-2.5 rounded-sm border border-accent" />
        Highlighted skills are my strongest.
      </p>
    </Section>
  );
}
