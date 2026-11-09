import type { CSSProperties } from "react";
import type { Project } from "@/content/types";
import { ExternalLink } from "./ExternalLink";
import { Reveal } from "./motion/Reveal";
import { Spotlight } from "./motion/Spotlight";
import { ProjectFrame } from "./ProjectFrame";
import { Section } from "./Section";

type ProjectsProps = { projects: Project[]; githubProfile: string };

/** Asymmetric rhythm on large screens (6 columns): two wide cards, then three narrow ones. */
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "md:col-span-2 lg:col-span-2"];

const chip = (i: number) => ({ "--c": i }) as CSSProperties;
const vars = (v: Record<string, string>) => v as CSSProperties;

function TechTags({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tech used">
      {tech.map((t, i) => (
        <li
          key={t}
          className="tech-tag max-w-full break-words rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent"
          style={chip(i)}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="relative z-[2] flex flex-wrap gap-3">
      {project.demo && (
        <ExternalLink href={project.demo} className="btn btn-primary btn-sm" aria-label={`Live demo of ${project.name}`}>
          Live demo
          <span aria-hidden="true" className="btn-arrow">
            ↗
          </span>
        </ExternalLink>
      )}
      {project.github && (
        <ExternalLink href={project.github} className="btn btn-ghost btn-sm" aria-label={`GitHub repo for ${project.name}`}>
          GitHub
          <span aria-hidden="true" className="btn-arrow">
            ↗
          </span>
        </ExternalLink>
      )}
    </div>
  );
}

/** Makes the whole card open the live demo with the mouse. Keyboard and screen-reader users use the Live demo button. */
function CardLink({ href }: { href?: string }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className="absolute inset-0 z-[1]"
    />
  );
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal as="li" className="min-w-0 sm:col-span-2 lg:col-span-6">
      <Spotlight className="group glow-border relative overflow-hidden rounded-3xl border border-border bg-surface/70 p-6 sm:p-8 lg:p-12">
        <div aria-hidden="true" className="featured-glow pointer-events-none absolute inset-0 -z-10" />
        <div aria-hidden="true" className="pointer-events-none absolute right-8 top-8 hidden lg:block">
          <div className="shape-float" style={vars({ "--float-dur": "8s" })}>
            <div className="orb" style={vars({ "--s": "2rem" })} />
          </div>
        </div>
        <CardLink href={project.demo} />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div className="featured-stage">
            <div className="shape-float" style={vars({ "--float-dur": "9s" })}>
              <div className="featured-frame">
                <ProjectFrame project={project} index={index} large />
              </div>
            </div>
          </div>

          <div className="min-w-0 break-words">
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="hero-ping absolute inline-flex size-full rounded-full bg-accent" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Featured project
            </p>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              <span className="text-gradient">{project.name}</span>
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">{project.description}</p>
            <div className="mt-5">
              <TechTags tech={project.tech} />
            </div>
            <div className="mt-7">
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      </Spotlight>
    </Reveal>
  );
}

function ProjectCard({ project, index, span }: { project: Project; index: number; span: string }) {
  return (
    <Reveal as="li" delay={(index % 3) * 90} className={`min-w-0 ${span}`}>
      <Spotlight className="group glow-border relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/70">
        <CardLink href={project.demo} />
        <div className="p-3 pb-0">
          <ProjectFrame project={project} index={index} />
        </div>
        <div className="flex flex-1 flex-col break-words p-6">
          <h3 className="font-display text-xl font-semibold">{project.name}</h3>
          <p className="mt-2 flex-1 leading-relaxed text-muted">{project.description}</p>
          <div className="mt-4">
            <TechTags tech={project.tech} />
          </div>
          <div className="mt-5">
            <ProjectLinks project={project} />
          </div>
        </div>
      </Spotlight>
    </Reveal>
  );
}

export function Projects({ projects, githubProfile }: ProjectsProps) {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => p !== featured);

  return (
    <Section id="projects" label="05. projects" title="Things I've built" stagger>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {featured && <FeaturedProject project={featured} index={0} />}
        {rest.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={i + (featured ? 1 : 0)}
            span={spans[i] ?? "lg:col-span-2"}
          />
        ))}
      </ul>
      <Reveal className="mt-12 text-center">
        <ExternalLink href={githubProfile} className="btn btn-ghost">
          See more on GitHub
          <span aria-hidden="true" className="btn-arrow">
            ↗
          </span>
        </ExternalLink>
      </Reveal>
    </Section>
  );
}
