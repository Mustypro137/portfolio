import Image from "next/image";
import type { SiteContent } from "@/content/types";
import { getInitials } from "@/lib/initials";
import { ExternalLink } from "./ExternalLink";

type HeroProps = Pick<SiteContent, "name" | "title" | "pitch" | "photo" | "openToWork" | "resume">;

const buttonBase =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 font-mono text-sm font-medium transition-colors";
const primaryButton = `${buttonBase} bg-accent text-bg hover:opacity-90`;
const outlineButton = `${buttonBase} border border-border text-fg hover:border-accent hover:text-accent`;

export function Hero({ name, title, pitch, photo, openToWork, resume }: HeroProps) {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] items-center py-16">
      <div className="grid w-full items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="order-2 min-w-0 md:order-1">
          {openToWork && (
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              Open to work
            </p>
          )}
          <p className="mt-6 font-mono text-sm text-accent">Hi, my name is</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight break-words sm:text-6xl lg:text-7xl">{name}</h1>
          <p className="mt-3 text-2xl font-semibold text-muted sm:text-3xl">{title}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{pitch}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className={primaryButton}>
              View projects
            </a>
            <a href="#contact" className={outlineButton}>
              Contact me
            </a>
            {resume && (
              <ExternalLink href={resume} className={outlineButton}>
                Resume
              </ExternalLink>
            )}
          </div>
        </div>

        <div className="order-1 md:order-2">
          {photo ? (
            <Image
              src={photo}
              alt={`Photo of ${name}`}
              width={240}
              height={240}
              priority
              className="size-36 rounded-full object-cover ring-2 ring-accent ring-offset-4 ring-offset-bg sm:size-48 md:size-60"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex size-36 items-center justify-center rounded-full bg-surface font-mono text-4xl font-bold text-accent ring-2 ring-accent ring-offset-4 ring-offset-bg sm:size-48 sm:text-5xl md:size-60 md:text-6xl"
            >
              {getInitials(name)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
