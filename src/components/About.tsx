import type { AboutInfo } from "@/content/types";
import { Section } from "./Section";

export function About({ about }: { about: AboutInfo }) {
  return (
    <Section id="about" label="01. about" title="About me">
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <div className="max-w-prose space-y-4 text-lg leading-relaxed text-muted">
          {about.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <dl className="h-fit space-y-4 rounded-xl border border-border bg-surface p-6">
          <div>
            <dt className="font-mono text-xs uppercase tracking-wider text-accent">Based in</dt>
            <dd className="mt-1">{about.location}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wider text-accent">Looking for</dt>
            <dd className="mt-1">{about.workPreference}</dd>
          </div>
        </dl>
      </div>

      {about.story && (
        <div className="mt-14 max-w-prose">
          <h3 className="font-mono text-sm uppercase tracking-wider text-accent">{about.story.title}</h3>
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
            {about.story.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {about.story.quote && (
            <blockquote className="mt-8 border-l-2 border-accent pl-5 text-xl font-semibold leading-snug sm:text-2xl">
              <p>{about.story.quote}</p>
            </blockquote>
          )}
        </div>
      )}
    </Section>
  );
}
