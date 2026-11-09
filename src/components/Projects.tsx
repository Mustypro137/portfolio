import Image from "next/image";
import type { Project } from "@/content/types";
import { ExternalLink } from "./ExternalLink";
import { Section } from "./Section";

type ProjectsProps = { projects: Project[]; githubProfile: string };

const linkClass = "font-mono text-sm text-muted transition-colors hover:text-accent";

export function Projects({ projects, githubProfile }: ProjectsProps) {
  return (
    <Section id="projects" label="05. projects" title="Things I've built">
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <li
            key={project.name}
            className="flex min-w-0 flex-col overflow-hidden break-words rounded-xl border border-border bg-surface transition duration-200 hover:border-accent motion-safe:hover:-translate-y-1"
          >
            {project.image && (
              <Image
                src={project.image}
                alt={`Screenshot of ${project.name}`}
                width={800}
                height={450}
                className="aspect-video w-full border-b border-border object-cover"
              />
            )}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{project.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech used">
                {project.tech.map((t) => (
                  <li key={t} className="max-w-full break-words font-mono text-xs text-accent">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex gap-5">
                {project.github && (
                  <ExternalLink href={project.github} className={linkClass} aria-label={`GitHub repo for ${project.name}`}>
                    GitHub ↗
                  </ExternalLink>
                )}
                {project.demo && (
                  <ExternalLink href={project.demo} className={linkClass} aria-label={`Live demo of ${project.name}`}>
                    Live demo ↗
                  </ExternalLink>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-center">
        <ExternalLink href={githubProfile} className="font-mono text-sm text-accent hover:underline">
          See more on GitHub ↗
        </ExternalLink>
      </p>
    </Section>
  );
}
