import type { ContactLinks } from "@/content/types";
import { socialLinks } from "@/lib/socialLinks";
import { ExternalLink } from "./ExternalLink";
import { Section } from "./Section";

export function Contact({ contact }: { contact: ContactLinks }) {
  return (
    <Section id="contact" label="06. contact" title="Get in touch">
      <div className="max-w-xl">
        <p className="text-lg leading-relaxed text-muted">
          {contact.message ??
            "Have a role in mind, a question about my work, or just want to say hi? My inbox is open and I'll get back to you."}
        </p>
        <a
          href={`mailto:${contact.email}`}
          className="mt-8 inline-block max-w-full break-all rounded-md bg-accent px-6 py-3 font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          {contact.email}
        </a>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {socialLinks(contact).map((link) => (
            <li key={link.url}>
              <ExternalLink href={link.url} className="font-mono text-sm text-muted transition-colors hover:text-accent">
                {link.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
