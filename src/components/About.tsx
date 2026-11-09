import Image from "next/image";
import type { CSSProperties } from "react";
import type { AboutInfo } from "@/content/types";
import { Reveal } from "./motion/Reveal";
import { ScrollRail } from "./motion/ScrollRail";
import { Spotlight } from "./motion/Spotlight";
import { Section } from "./Section";

type AboutProps = {
  about: AboutInfo;
  /** Optional portrait shown beside the bio. */
  photo?: string;
};

const vars = (v: Record<string, string>) => v as CSSProperties;

export function About({ about, photo }: AboutProps) {
  const { story } = about;

  return (
    <Section id="about" label="01. about" title="About me" stagger>
      <div className="grid gap-14 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div className="max-w-prose space-y-5 text-lg leading-relaxed text-muted">
          {about.bio.map((paragraph, i) => (
            <Reveal key={i} delay={i * 110}>
              <p className={i === 0 ? "text-xl text-fg sm:text-2xl sm:leading-snug" : undefined}>{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <div className="relative space-y-6">
          {/* Decorative floaters */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-3 -top-5 z-10">
            <div className="shape-float" style={vars({ "--float-dur": "8s" })}>
              <div className="orb" style={vars({ "--s": "1.75rem" })} />
            </div>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute -left-5 bottom-24 z-10 max-md:hidden">
            <div className="shape-float cube-scene" style={vars({ "--float-dur": "9s", "--float-delay": "-3s" })}>
              <div className="ring3d" style={vars({ "--s": "3rem" })} />
            </div>
          </div>

          {photo && (
            <Reveal variant="wipe" className="mx-auto w-full max-w-xs">
              <div className="group overflow-hidden rounded-t-[999px] rounded-b-3xl bg-gradient-to-br from-accent/70 via-accent-2/40 to-transparent p-px">
                <Image
                  src={photo}
                  alt=""
                  width={480}
                  height={600}
                  sizes="(min-width: 768px) 320px, 80vw"
                  className="aspect-[4/5] w-full rounded-t-[999px] rounded-b-[calc(1.5rem-1px)] bg-surface-2 object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
          )}

          <Reveal delay={150}>
            <Spotlight className="rounded-2xl border border-border bg-surface/70 p-6">
              <dl className="space-y-5">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-accent">Based in</dt>
                  <dd className="mt-1">{about.location}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-accent">Looking for</dt>
                  <dd className="mt-1">{about.workPreference}</dd>
                </div>
              </dl>
            </Spotlight>
          </Reveal>
        </div>
      </div>

      {story && (
        <div
          className={`mt-24 grid gap-12 md:mt-32 md:gap-16 ${story.quote ? "md:grid-cols-[1.1fr_1fr]" : ""}`}
        >
          <div>
            <Reveal>
              <h3 className="font-mono text-sm uppercase tracking-wider text-accent">{story.title}</h3>
            </Reveal>
            <ScrollRail className="mt-8 max-w-prose space-y-8 pl-10 [--rail-x:0.5rem]">
              {story.paragraphs.map((paragraph, i) => (
                <Reveal key={i} className="relative">
                  <span data-node aria-hidden="true" className="rail-node" style={vars({ "--node-top": "0.5rem", "--node-x": "-2rem" })} />
                  <p className="text-lg leading-relaxed text-muted">{paragraph}</p>
                </Reveal>
              ))}
            </ScrollRail>
          </div>

          {story.quote && (
            <div className="md:sticky md:top-28 md:self-start">
              <Reveal variant="fade" as="blockquote" className="relative pl-7">
                <span aria-hidden="true" className="quote-bar absolute inset-y-0 left-0 w-1 rounded-full bg-gradient-to-b from-accent to-accent-2" />
                <span aria-hidden="true" className="text-gradient block font-display text-7xl leading-none">
                  “
                </span>
                <p className="quote-text -mt-4 font-display text-2xl font-semibold leading-snug sm:text-3xl">
                  {story.quote}
                </p>
              </Reveal>
            </div>
          )}
        </div>
      )}
    </Section>
  );
}
