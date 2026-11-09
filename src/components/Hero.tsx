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

const portraitSize = "size-36 sm:size-48 md:size-60";

export function Hero({ name, title, pitch, photo, openToWork, resume }: HeroProps) {
  const words = name.split(" ");

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center py-16">
      <div aria-hidden="true" className="hero-aurora">
        <span className="hero-blob hero-blob-a" />
        <span className="hero-blob hero-blob-b" />
      </div>

      <div className="grid w-full items-center gap-6 md:grid-cols-[1fr_auto] md:gap-12">
        <div className="order-2 min-w-0 md:order-1">
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
          <h1 className="mt-3 font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
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
            className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-muted"
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

        <div className="order-1 md:order-2">
          <HeroStage>
            {photo ? (
              <Image
                src={photo}
                alt={`Photo of ${name}`}
                width={240}
                height={240}
                sizes="(min-width: 768px) 240px, (min-width: 640px) 192px, 144px"
                loading="eager"
                className={`relative ${portraitSize} rounded-full bg-surface-2 object-cover object-top`}
              />
            ) : (
              <div
                aria-hidden="true"
                className={`relative flex ${portraitSize} items-center justify-center rounded-full bg-surface-2 font-mono text-4xl font-bold text-accent sm:text-5xl`}
              >
                {getInitials(name)}
              </div>
            )}
          </HeroStage>
        </div>
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
