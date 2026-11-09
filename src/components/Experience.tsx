import type { CSSProperties } from "react";
import type { Education, Job } from "@/content/types";
import { ExternalLink } from "./ExternalLink";
import { Reveal } from "./motion/Reveal";
import { ScrollRail } from "./motion/ScrollRail";
import { Spotlight } from "./motion/Spotlight";
import { Section } from "./Section";

type ExperienceProps = { experience: Job[]; education?: Education[] };

export function Experience({ experience, education }: ExperienceProps) {
  return (
    <Section id="experience" label="02. journey" title="My journey" stagger>
      <ScrollRail as="ol" className="space-y-12 [--rail-x:0.5rem] md:space-y-16 md:[--rail-x:50%]">
        {experience.map((job, i) => {
          const cardOnLeft = i % 2 === 0;
          return (
            <li
              key={`${job.company}-${job.role}-${job.start}`}
              className="relative grid min-w-0 gap-3 break-words pl-10 md:grid-cols-2 md:gap-0 md:pl-0"
            >
              <span data-node aria-hidden="true" className="rail-node" style={{ "--node-top": "1.65rem" } as CSSProperties} />

              <Reveal
                variant={cardOnLeft ? "right" : "left"}
                className={`md:row-start-1 md:pt-5 ${cardOnLeft ? "md:col-start-2 md:pl-14" : "md:col-start-1 md:pr-14 md:text-right"}`}
              >
                <p className="font-display text-xl font-semibold text-accent md:text-3xl">
                  <span>{`${job.start} — ${job.end}`}</span>
                  {job.end === "Present" && (
                    <span className="relative ml-3 inline-flex size-2 align-middle" aria-hidden="true">
                      <span className="hero-ping absolute inline-flex size-full rounded-full bg-emerald-400" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                    </span>
                  )}
                </p>
              </Reveal>

              <Reveal
                variant={cardOnLeft ? "left" : "right"}
                className={`md:row-start-1 ${cardOnLeft ? "md:col-start-1 md:pr-14" : "md:col-start-2 md:pl-14"}`}
              >
                <Spotlight className="group rounded-2xl border border-border bg-surface/70 p-6">
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <p className="mt-1 text-accent">
                    {job.companyUrl ? (
                      <ExternalLink href={job.companyUrl} className="hover:underline">
                        {job.company}
                      </ExternalLink>
                    ) : (
                      <span>{job.company}</span>
                    )}
                  </p>
                  {job.location && <p className="mt-1 font-mono text-sm text-muted">{job.location}</p>}
                  <ul className="mt-4 space-y-2 text-muted">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="text-accent transition-transform duration-300 ease-out group-hover:translate-x-1"
                        >
                          ▹
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </Reveal>
            </li>
          );
        })}
      </ScrollRail>

      {education && education.length > 0 && (
        <div className="mt-20">
          <Reveal>
            <h3 className="font-mono text-sm uppercase tracking-wider text-accent">Education</h3>
          </Reveal>
          <ul className="mt-4 space-y-3">
            {education.map((e, i) => (
              <Reveal as="li" key={`${e.name}-${e.school}`} delay={i * 100} className="min-w-0 break-words">
                <span className="font-semibold">{e.name}</span>
                <span className="text-muted">{` — ${e.school}, ${e.year}`}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
