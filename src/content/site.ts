import type { SiteContent } from "./types";

/**
 * All personal content for the site lives here.
 *
 * - List the journey (experience) newest first.
 * - Put images (headshot, project screenshots) and your resume PDF in `public/`,
 *   then reference them by path, e.g. photo: "/headshot.png", resume: "/resume.pdf".
 * - Optional fields (photo, resume, companyUrl, location, education, story, linkedin,
 *   demo, image, other, message) can be left out — that part of the page is simply hidden.
 */
export const site: SiteContent = {
  name: "Mustapha Abdullahi",
  title: "Front-End Developer",
  pitch:
    "I build simple, fast, accessible websites and web apps. I'm looking for my first front-end role, and I also build websites for small businesses.",
  photo: "/headshot.png",
  openToWork: true,
  // resume: "/resume.pdf",

  about: {
    bio: [
      "I'm a self-taught front-end developer. I learned to code through documentation, online resources and building my own projects, one step at a time.",
      "I build web interfaces with HTML, CSS and JavaScript, and I also use Python for scripting and automation. I enjoy taking an idea and turning it into something people can use, and I care about clean layouts, simple interactions and websites that work well for everyone.",
      "I don't have a degree or industry experience yet. I have projects, practice and a steady habit of learning. My goal is to build strong fundamentals and grow into a developer a team can rely on.",
    ],
    location: "Abidjan, Ivory Coast",
    workPreference:
      "Junior front-end roles, internships and apprenticeships (remote or international), freelance projects and open-source collaborations",
    story: {
      title: "My story",
      paragraphs: [
        "I was born deaf. When I was about 10, I received a cochlear implant. It lets me hear and understand people, but my hearing is not typical, and spoken communication is still hard for me.",
        "Growing up, I had to find my own ways to learn and express myself. Writing became the way I communicate best. It lets me think carefully and say exactly what I mean.",
        "That habit shapes how I work. I read documentation closely, I write things down, and I stay with a problem until I understand it. It also works well with remote teams, where most communication is written anyway.",
        "I'm not asking anyone to overlook my limitations, or to give me a chance out of sympathy. I'm asking for a fair chance to show what I can do, and to keep learning and contributing through my work.",
      ],
      quote: "Judge me by my work. I may not vocalize well, but my code will speak for me.",
    },
  },

  experience: [
    {
      role: "Freelance Front-End Developer",
      company: "Upwork",
      start: "Oct 2026",
      end: "Present",
      location: "Remote",
      highlights: [
        "Available for freelance work: one-page business websites, mobile-friendly redesigns and fixes to existing sites.",
      ],
    },
    {
      role: "Full web apps and real-world projects",
      company: "Self-directed",
      start: "2026",
      end: "Present",
      highlights: [
        "Built EnglishFlow AI, a Next.js and PostgreSQL learning platform with accounts, spaced-repetition reviews and an AI tutor, deployed on Vercel.",
        "Moved from plain JavaScript to React and TypeScript, with automated tests in Vitest and React Testing Library.",
        "Built responsive, accessible websites for fictional small businesses: a café, a coffee roaster, a furniture workshop and a family restaurant.",
      ],
    },
    {
      role: "Front-end foundations",
      company: "The Odin Project & Frontend Mentor",
      start: "2024",
      end: "2025",
      highlights: [
        "Built The Odin Project's projects: Rock Paper Scissors, Etch-a-Sketch, a sign-up form, Tic-Tac-Toe, a restaurant page and an admin dashboard.",
        "Turned Frontend Mentor designs into responsive pages, like a space tourism website, a product list with a cart and a crowdfunding page.",
      ],
    },
    {
      role: "First steps in code",
      company: "Self-taught",
      start: "2021",
      end: "2022",
      highlights: ["Opened my GitHub account and built my first small projects with HTML, CSS and JavaScript."],
    },
  ],

  education: [{ name: "Computer Studies", school: "Premier International School", year: "2020 – 2023" }],

  skills: [
    {
      group: "Frontend",
      items: [
        { name: "HTML", strong: true },
        { name: "CSS", strong: true },
        { name: "Responsive, mobile-first design", strong: true },
        { name: "JavaScript", strong: true },
        { name: "Accessibility" },
        { name: "TypeScript" },
        { name: "React" },
        { name: "Next.js" },
      ],
    },
    {
      group: "Backend (learning)",
      items: [
        { name: "Python (scripting & automation)" },
        { name: "Flask" },
        { name: "PostgreSQL" },
        { name: "Socket.IO" },
      ],
    },
    {
      group: "Tools",
      items: [
        { name: "Git & GitHub", strong: true },
        { name: "VS Code" },
        { name: "Browser dev tools" },
        { name: "Vitest" },
        { name: "Vercel" },
        { name: "GitHub Pages" },
        { name: "Claude Code" },
        { name: "ChatGPT" },
      ],
    },
  ],

  traits: [
    {
      title: "I break problems into small steps",
      example:
        "I build a little, test it, then move on. EnglishFlow AI was planned in eight milestones, and I finished each one before starting the next.",
    },
    {
      title: "I learn by building",
      example:
        "I read the docs, try things and fix what breaks. That took me from Odin Project exercises in 2024 to full-stack apps in 2026, across 40+ public repos.",
    },
    {
      title: "I communicate clearly in writing",
      example:
        "Writing is how I communicate best. Clear messages, notes, issues and pull requests are how I work, and my project READMEs explain what each app does and how to run it.",
    },
    {
      title: "I care about quality",
      example:
        "CodeType works with the keyboard only, has good contrast in both themes and scores 100 in Lighthouse for Performance, Accessibility and Best Practices.",
    },
    {
      title: "I use AI responsibly",
      example:
        "ChatGPT and Claude Code help me plan, explain code and debug. I review and understand the code before I use it, and I own the final result.",
    },
  ],

  projects: [
    {
      name: "EnglishFlow AI",
      description:
        "An English-learning platform for levels A1 to C2, with accounts, structured lessons, spaced-repetition reviews, skill labs and an AI tutor.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Anthropic API"],
      github: "https://github.com/Mustypro137/englishflow-ai",
      demo: "https://englishflow-ai.vercel.app",
    },
    {
      name: "CodeType",
      description:
        "A typing-practice app for programmers. Type real code and see your speed and accuracy live. Keyboard-friendly and scores 100 in Lighthouse.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/Mustypro137/codetype",
      demo: "https://mustypro137.github.io/codetype/",
    },
    {
      name: "Client Communication Coach",
      description:
        "Practise client conversations in ten realistic scenarios, get feedback on your English and tone, and draft professional WhatsApp and LinkedIn replies.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/Mustypro137/client-communication-coach",
      demo: "https://mustypro137.github.io/client-communication-coach/",
    },
    {
      name: "CodeQuest Academy",
      description:
        "A free learning site for Python, automation and AI. Python runs in the browser with Pyodide, so you can run real code and get instant feedback.",
      tech: ["JavaScript", "Pyodide", "HTML", "CSS"],
      github: "https://github.com/Mustypro137/code-quest-academy",
      demo: "https://mustypro137.github.io/code-quest-academy/",
    },
    {
      name: "Golden Crust Bakery",
      description:
        "A practice business website for a bakery, with a warm design, product highlights, business information and a responsive layout, improved based on feedback.",
      tech: ["HTML", "CSS", "JavaScript"],
      demo: "https://golden-crust-bakery-two-opal.vercel.app",
    },
    {
      name: "Cedar & Stone Café",
      description:
        "A responsive, accessible website for a fictional café, with an Art Deco design, a filterable menu, an FAQ accordion and a validated contact form.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/Mustypro137/cedar-and-stone-cafe",
      demo: "https://mustypro137.github.io/cedar-and-stone-cafe/",
    },
  ],

  contact: {
    email: "mustypro137@gmail.com",
    linkedin: "https://www.linkedin.com/in/mustapha-abdullahi-133660230/",
    github: "https://github.com/Mustypro137",
    message:
      "Hiring a junior front-end developer, or need a website for your business? Send me a message. I communicate best in writing, so email is the best way to reach me. I usually reply within one day.",
  },
};
