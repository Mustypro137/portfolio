import type { SiteContent } from "@/content/types";

/** Every optional field set. */
export const fullSite: SiteContent = {
  name: "Jane Doe",
  title: "Full-Stack Developer",
  pitch: "I build things.",
  photo: "/headshot.jpg",
  openToWork: true,
  resume: "/resume.pdf",
  about: {
    bio: ["First paragraph.", "Second paragraph."],
    location: "Lagos, Nigeria",
    workPreference: "Open to remote",
    story: {
      title: "My story",
      paragraphs: ["Story paragraph one.", "Story paragraph two."],
      quote: "My code will speak for me.",
    },
  },
  experience: [
    {
      role: "Senior Engineer",
      company: "Acme",
      companyUrl: "https://acme.example",
      start: "2023",
      end: "Present",
      location: "Remote",
      highlights: ["Shipped A", "Shipped B"],
    },
    {
      role: "Junior Engineer",
      company: "Globex",
      start: "2021",
      end: "2023",
      highlights: ["Built C"],
    },
  ],
  education: [{ name: "B.S. CS", school: "State University", year: "2021" }],
  skills: [
    { group: "Frontend", items: [{ name: "React", strong: true }, { name: "CSS" }] },
    { group: "Backend", items: [{ name: "Node.js" }] },
  ],
  traits: [
    { title: "Learns fast", example: "Learned X in a week." },
    { title: "Owns problems", example: "Fixed Y end to end." },
    { title: "Communicates", example: "Wrote Z docs." },
  ],
  projects: [
    {
      name: "Alpha",
      description: "Alpha does things.",
      tech: ["Next.js", "TypeScript"],
      github: "https://github.com/jane/alpha",
      demo: "https://alpha.example",
      image: "/alpha.png",
    },
    {
      name: "Beta",
      description: "Beta does other things.",
      tech: ["Go"],
      github: "https://github.com/jane/beta",
    },
    {
      name: "Gamma",
      description: "Gamma does more things.",
      tech: ["Python"],
      github: "https://github.com/jane/gamma",
    },
  ],
  contact: {
    email: "jane@example.com",
    linkedin: "https://linkedin.com/in/jane",
    github: "https://github.com/jane",
    other: [{ label: "Blog", url: "https://blog.example" }],
    message: "Email me, I reply within a day.",
  },
};

/** Every optional field omitted. */
export const minimalSite: SiteContent = {
  name: "Jane Doe",
  title: "Full-Stack Developer",
  pitch: "I build things.",
  openToWork: false,
  about: { bio: ["Only paragraph."], location: "Lagos, Nigeria", workPreference: "Open to remote" },
  experience: [
    { role: "Engineer", company: "Acme", start: "2023", end: "Present", highlights: ["Shipped A"] },
  ],
  education: [],
  skills: [{ group: "Frontend", items: [{ name: "React" }] }],
  traits: fullSite.traits,
  projects: fullSite.projects.map(({ name, description, tech, github }) => ({ name, description, tech, github })),
  contact: { email: "jane@example.com", github: "https://github.com/jane" },
};
