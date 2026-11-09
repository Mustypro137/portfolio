import type { Education, Job } from "@/content/types";
import { ExternalLink } from "./ExternalLink";
import { Section } from "./Section";

type ExperienceProps = { experience: Job[]; education?: Education[] };

export function Experience({ experience, education }: ExperienceProps) {
  return (
    <Section id="experience" label="02. experience" title="Where I've worked">
      <ol className="relative space-y-10 border-l border-border pl-6 sm:pl-8">
        {experience.map((job) => (
          <li key={`${job.company}-${job.role}-${job.start}`} className="relative min-w-0 break-words">
            <span
              aria-hidden="true"
              className="absolute -left-[29px] top-2 size-2.5 rounded-full bg-accent ring-4 ring-bg sm:-left-[37px]"
            />
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
            <p className="mt-1 flex flex-wrap gap-x-3 font-mono text-sm text-muted">
              <span>{`${job.start} — ${job.end}`}</span>
              {job.location && <span>{job.location}</span>}
            </p>
            <ul className="mt-4 max-w-prose space-y-2 text-muted">
              {job.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden="true" className="text-accent">▹</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      {education && education.length > 0 && (
        <div className="mt-14">
          <h3 className="font-mono text-sm uppercase tracking-wider text-accent">Education</h3>
          <ul className="mt-4 space-y-3">
            {education.map((e) => (
              <li key={`${e.name}-${e.school}`} className="min-w-0 break-words">
                <span className="font-semibold">{e.name}</span>
                <span className="text-muted">{` — ${e.school}, ${e.year}`}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
