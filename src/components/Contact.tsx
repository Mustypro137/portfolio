import type { CSSProperties } from "react";
import type { ContactLinks } from "@/content/types";
import { CopyEmailButton } from "./CopyEmailButton";
import { Magnetic } from "./motion/Magnetic";
import { Reveal } from "./motion/Reveal";
import { Spotlight } from "./motion/Spotlight";
import { Section } from "./Section";
import { SocialLinks } from "./SocialLinks";

const vars = (v: Record<string, string>) => v as CSSProperties;

export function Contact({ contact }: { contact: ContactLinks }) {
  return (
    <Section id="contact" label="06. contact" title="Get in touch" splitTitle className="relative isolate">
      <div aria-hidden="true" className="contact-aurora">
        <span className="hero-blob contact-blob-a" />
        <span className="hero-blob contact-blob-b" />
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="max-w-xl text-xl leading-relaxed text-muted sm:text-2xl sm:leading-relaxed">
            {contact.message ??
              "Have a role in mind, a question about my work, or just want to say hi? My inbox is open and I'll get back to you."}
          </p>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute -right-3 -top-6 z-10">
            <div className="shape-float" style={vars({ "--float-dur": "8s" })}>
              <div className="orb" style={vars({ "--s": "2.25rem" })} />
            </div>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-6 -left-5 z-10 max-sm:hidden">
            <div className="shape-float cube-scene" style={vars({ "--float-dur": "9s", "--float-delay": "-3s" })}>
              <div className="ring3d" style={vars({ "--s": "3.25rem" })} />
            </div>
          </div>

          <Spotlight tilt className="glow-border rounded-3xl border border-border bg-surface/70 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">Email me</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href={`mailto:${contact.email}`} className="btn btn-primary btn-lg max-w-full break-all">
                  {contact.email}
                  <span aria-hidden="true" className="btn-arrow">
                    →
                  </span>
                </a>
              </Magnetic>
              <CopyEmailButton email={contact.email} />
            </div>

            <div className="my-7 h-px bg-gradient-to-r from-border via-accent/40 to-border" aria-hidden="true" />

            <p className="font-mono text-xs uppercase tracking-wider text-accent">Find me elsewhere</p>
            <div className="mt-4">
              <SocialLinks contact={contact} />
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </Section>
  );
}
