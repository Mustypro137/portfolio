import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/types";
import { getInitials } from "@/lib/initials";
import { ExternalLink } from "./ExternalLink";
import { HeroStage } from "./HeroStage";
import { Magnetic } from "./motion/Magnetic";

type HeroProps = Pick<SiteContent, "name" | "title" | "pitch" | "photo" | "openToWork" | "resume">;

/** Position in the load sequence; the CSS turns it into a stagger delay. */
const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero({ name, title, pitch, photo, openToWork, resume }: HeroProps) {
  const words = name.split(" ");

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-center py-16 md:flex-row md:items-center">
      <div aria-hidden="true" className="hero-aurora">
        <span className="hero-blob hero-blob-a" />
        <span className="hero-blob hero-blob-b" />
      </div>

      {/* The portrait stage is first in the DOM so phones show the person on top. On md+ it is
          positioned against the section's bottom-right corner and the spacer below holds its column. */}
      <HeroStage>
        {photo ? (
          <Image
            src={photo}
            alt={`Photo of ${name}`}
            width={768}
            height={1024}
            sizes="(min-width: 1024px) 34rem, (min-width: 768px) 30rem, 22rem"
            loading="eager"
            className="size-full object-contain object-bottom"
          />
        ) : (
          <div aria-hidden="true" className="poster-fallback">
            {getInitials(name)}
          </div>
        )}
      </HeroStage>

      <div className="grid w-full items-center gap-2 md:grid-cols-[1fr_30rem] md:gap-12 lg:grid-cols-[1fr_34rem]">
        {/* Headline sits behind the figure on md+ (z 2 vs 3) so its last letters can tuck behind a
            shoulder; on phones it sits in front (z 5) over the figure's faded base. */}
        <div className="relative z-[5] -mt-14 min-w-0 md:z-[2] md:mt-0">
          {openToWork && (
            <p
              className="hero-rise inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 font-mono text-xs text-muted"
              style={step(0)}
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="hero-ping absolute inline-flex size-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Open to work
            </p>
          )}
          <p className="hero-rise mt-6 font-mono text-sm text-accent" style={step(1)}>
            Hi, my name is
          </p>
          <h1 className="mt-3 font-display text-[clamp(3.5rem,9.5vw,8rem)] font-bold leading-[0.95] tracking-tight">
            {words.map((word, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <span className="hero-word">
                  <span
                    className={`hero-word-inner${words.length > 1 && i === words.length - 1 ? " hero-name-gradient" : ""}`}
                    style={step(2 + i)}
                  >
                    {word}
                  </span>
                </span>
              </Fragment>
            ))}
          </h1>
          <p
            className="hero-rise mt-3 font-display text-2xl font-semibold text-muted sm:text-3xl"
            style={step(2 + words.length)}
          >
            {title}
          </p>
          <p
            className="hero-rise mt-6 max-w-md text-lg leading-relaxed text-muted"
            style={step(3 + words.length)}
          >
            {pitch}
          </p>
          <div className="hero-rise mt-8 flex flex-wrap gap-3" style={step(4 + words.length)}>
            <Magnetic>
              <a href="#projects" className="btn btn-primary">
                View projects
                <span aria-hidden="true" className="btn-arrow">
                  →
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-ghost">
                Contact me
              </a>
            </Magnetic>
            {resume && (
              <Magnetic>
                <ExternalLink href={resume} className="btn btn-ghost">
                  Resume
                </ExternalLink>
              </Magnetic>
            )}
          </div>
        </div>

        <div aria-hidden="true" className="hidden md:block" />
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="hero-rise hero-scroll absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent md:flex"
        style={step(7 + words.length)}
      >
        <span className="flex h-8 w-5 justify-center rounded-full border border-current pt-1.5" aria-hidden="true">
          <span className="hero-scroll-dot size-1 rounded-full bg-accent" />
        </span>
        <span aria-hidden="true">scroll</span>
      </a>
    </section>
  );
}
