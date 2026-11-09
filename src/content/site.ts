import type { SiteContent } from "./types";

/**
 * All personal content for the site lives here.
 *
 * - Replace every line marked `TODO: fill in` with your own details.
 * - List experience newest first.
 * - Put images (headshot, project screenshots) and your resume PDF in `public/`,
 *   then reference them by path, e.g. photo: "/headshot.jpg", resume: "/resume.pdf".
 * - Optional fields (photo, resume, companyUrl, location, education, linkedin,
 *   demo, image, other) can be left out — that part of the page is simply hidden.
 */
export const site: SiteContent = {
  name: "Your Name", // TODO: fill in
  title: "Software Engineer", // TODO: fill in
  pitch: "I build fast, reliable web apps and enjoy turning messy problems into simple tools.", // TODO: fill in
  // photo: "/headshot.jpg",
  openToWork: true,
  // resume: "/resume.pdf",

  about: {
    bio: [
      "I'm a software engineer who likes building things people actually use. Write a sentence or two here about who you are and what you enjoy working on.", // TODO: fill in
      "Add a second short paragraph about what you're looking for next, or what you do outside of code.", // TODO: fill in
    ],
    location: "City, Country", // TODO: fill in
    workPreference: "Open to remote or hybrid roles", // TODO: fill in
  },

  experience: [
    {
      role: "Software Engineer", // TODO: fill in
      company: "Company Name", // TODO: fill in
      start: "2024", // TODO: fill in
      end: "Present", // TODO: fill in
      location: "Remote", // TODO: fill in
      highlights: [
        "Describe something you built or improved, ideally with a number (e.g. cut load time by 40%).", // TODO: fill in
        "Describe a second achievement and the impact it had.", // TODO: fill in
      ],
    },
    {
      role: "Software Engineering Intern", // TODO: fill in
      company: "Previous Company", // TODO: fill in
      start: "2023", // TODO: fill in
      end: "2023", // TODO: fill in
      highlights: [
        "Describe what you worked on and what you learned.", // TODO: fill in
      ],
    },
  ],

  education: [
    { name: "B.S. Computer Science", school: "University Name", year: "2024" }, // TODO: fill in
  ],

  skills: [
    {
      group: "Frontend",
      items: [
        { name: "TypeScript", strong: true }, // TODO: fill in
        { name: "React", strong: true }, // TODO: fill in
        { name: "Next.js" }, // TODO: fill in
        { name: "Tailwind CSS" }, // TODO: fill in
      ],
    },
    {
      group: "Backend",
      items: [
        { name: "Node.js", strong: true }, // TODO: fill in
        { name: "PostgreSQL" }, // TODO: fill in
        { name: "REST APIs" }, // TODO: fill in
      ],
    },
    {
      group: "Tools",
      items: [
        { name: "Git" }, // TODO: fill in
        { name: "Docker" }, // TODO: fill in
        { name: "Vercel" }, // TODO: fill in
      ],
    },
  ],

  traits: [
    {
      title: "Learns fast", // TODO: fill in
      example: "Give a short real example — e.g. picked up a new framework and shipped a feature with it in a week.", // TODO: fill in
    },
    {
      title: "Owns problems end to end", // TODO: fill in
      example: "Give a short real example of a problem you saw through from start to finish.", // TODO: fill in
    },
    {
      title: "Communicates clearly", // TODO: fill in
      example: "Give a short real example — e.g. wrote docs that cut onboarding time for new teammates.", // TODO: fill in
    },
  ],

  projects: [
    {
      name: "Project One", // TODO: fill in
      description: "One or two sentences on what this project does and why it's interesting.", // TODO: fill in
      tech: ["Next.js", "TypeScript"], // TODO: fill in
      github: "https://github.com/your-username/project-one", // TODO: fill in
      demo: "https://example.com", // TODO: fill in
    },
    {
      name: "Project Two", // TODO: fill in
      description: "One or two sentences on what this project does and why it's interesting.", // TODO: fill in
      tech: ["React", "Node.js"], // TODO: fill in
      github: "https://github.com/your-username/project-two", // TODO: fill in
    },
    {
      name: "Project Three", // TODO: fill in
      description: "One or two sentences on what this project does and why it's interesting.", // TODO: fill in
      tech: ["Python", "PostgreSQL"], // TODO: fill in
      github: "https://github.com/your-username/project-three", // TODO: fill in
    },
  ],

  contact: {
    email: "you@example.com", // TODO: fill in
    linkedin: "https://www.linkedin.com/in/your-profile", // TODO: fill in
    github: "https://github.com/your-username", // TODO: fill in
  },
};
