import type { ContactLinks } from "@/content/types";
import { socialLinks } from "@/lib/socialLinks";
import { ExternalLink } from "./ExternalLink";

export function Footer({ name, contact }: { name: string; contact: ContactLinks }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 font-mono text-xs text-muted sm:flex-row sm:px-6">
        <p>{`© ${new Date().getFullYear()} ${name}`}</p>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {socialLinks(contact).map((link) => (
            <li key={link.url}>
              <ExternalLink href={link.url} className="transition-colors hover:text-accent">
                {link.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
