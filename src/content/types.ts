export type Job = {
  role: string;
  company: string;
  companyUrl?: string;
  start: string;
  end: string;
  location?: string;
  highlights: string[];
};

export type Education = { name: string; school: string; year: string };

export type Skill = { name: string; strong?: boolean };

export type SkillGroup = { group: string; items: Skill[] };

export type Trait = { title: string; example: string };

export type Project = {
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  image?: string;
};

export type ContactLinks = {
  email: string;
  linkedin?: string;
  github: string;
  other?: { label: string; url: string }[];
  /** Replaces the default invitation text in the Contact section. */
  message?: string;
};

export type Story = { title: string; paragraphs: string[]; quote?: string };

export type AboutInfo = {
  bio: string[];
  location: string;
  workPreference: string;
  story?: Story;
};

export type SiteContent = {
  name: string;
  title: string;
  pitch: string;
  photo?: string;
  openToWork: boolean;
  resume?: string;
  about: AboutInfo;
  experience: Job[];
  education?: Education[];
  skills: SkillGroup[];
  traits: Trait[];
  projects: Project[];
  contact: ContactLinks;
};
