import type { ContactLinks } from "@/content/types";

/** GitHub, LinkedIn (if set) and any extra links, in display order. */
export function socialLinks(contact: ContactLinks): { label: string; url: string }[] {
  return [
    { label: "GitHub", url: contact.github },
    ...(contact.linkedin ? [{ label: "LinkedIn", url: contact.linkedin }] : []),
    ...(contact.other ?? []),
  ];
}
