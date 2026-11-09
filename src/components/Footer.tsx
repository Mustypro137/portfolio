import type { ContactLinks } from "@/content/types";
import { BackToTop } from "./BackToTop";
import { Reveal } from "./motion/Reveal";
import { SocialLinks } from "./SocialLinks";

export function Footer({ name, contact }: { name: string; contact: ContactLinks }) {
  return (
    <footer className="relative isolate mt-10 overflow-hidden">
      <div aria-hidden="true" className="footer-glow" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div aria-hidden="true" className="footer-line" />
          <div className="flex flex-col items-center justify-between gap-6 pb-24 pt-10 font-mono text-xs text-muted sm:flex-row sm:pb-10">
            <p>{`© ${new Date().getFullYear()} ${name}`}</p>
            <SocialLinks contact={contact} size="sm" />
          </div>
        </Reveal>
      </div>
      <BackToTop />
    </footer>
  );
}
