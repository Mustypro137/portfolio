# Portfolio Website — Design Spec

**Date:** 2026-11-09
**Status:** Design approved, content pending

---

## 1. Goal

A personal portfolio website that helps me land a **software engineer / developer** job.

- **Main audience:** recruiters. They skim fast, so the page must answer within seconds: who I am, what I do, what I've done, how to contact me.
- **Success:** a recruiter can find my role, experience, top skills, best projects, and contact info without hunting, on phone or desktop.

## 2. Decisions

| Topic | Decision |
|---|---|
| Structure | One page that scrolls, with a nav that jumps to each section |
| Framework | Next.js (App Router, latest stable version) + React + TypeScript |
| Styling | Tailwind CSS |
| Theme | Dark and light, follows the visitor's system setting, with a toggle (`next-themes`) |
| Visual style | Dark & techy: navy background, teal accent, monospace touches |
| Motion | Subtle: fade/slide-in on scroll and hover lift on cards. Turned off when the visitor's device asks for reduced motion |
| Projects | 3–6 hand-picked GitHub repos, written by hand (no live GitHub API) |
| Contact | Links only (email, LinkedIn, GitHub). No form, no backend |
| Resume | Not available yet. The site supports a download button that appears once a PDF is added |
| Photo | Headshot in the hero |
| Hosting | Vercel, free `*.vercel.app` address (custom domain can be added later) |

## 3. Out of scope

Not part of this version: blog, contact form, CMS, live GitHub data, analytics, custom domain, multiple languages, project detail pages.

## 4. Page layout (top to bottom)

Each section has an `id` so the nav can link to it (`#about`, `#experience`, `#skills`, `#why-me`, `#projects`, `#contact`).

### 4.1 Top bar (sticky)
- Left: my name (links to the top of the page).
- Right: links to About, Experience, Skills, Why Me, Projects, Contact, plus the light/dark toggle.
- On screens narrower than 768px the links collapse into a menu button that opens a dropdown panel. The panel closes when a link is tapped or Escape is pressed.
- Background turns slightly opaque with a blur once the page is scrolled, so text underneath doesn't clash.

### 4.2 Hero
- Headshot (round or rounded square), name, job title, one-line pitch.
- "Open to work" badge, shown only when `openToWork` is `true` in the content file.
- Buttons: **View projects** (jumps to `#projects`), **Contact me** (jumps to `#contact`), **Resume** (only shown when a resume file path is set; opens the PDF in a new tab).
- Fills most of the first screen on desktop; stacks photo above text on mobile.

### 4.3 About
- 1–2 short paragraphs of bio.
- Location and work preference (remote / relocation / local).

### 4.4 Experience
- A vertical timeline, newest first.
- Each entry: role, company (linked if a URL is given), dates, location (optional), 2–3 bullet-point achievements.
- Education and certifications shown below the jobs as a shorter list, if provided.

### 4.5 Skills
- Grouped into **Frontend**, **Backend**, and **Tools** (group names come from the content file, so they can change).
- Each skill is a small chip. Skills marked as strongest get the teal accent so they stand out.

### 4.6 Why hire me
- 3–5 cards in a grid (1 column on mobile, 2–3 on desktop).
- Each card: a trait as the heading plus one short real example.

### 4.7 Projects
- 3–6 cards in a grid (1 column on mobile, 2 on desktop).
- Each card: screenshot, project name, 1–2 sentence description, tech tags, GitHub link, live demo link.
- Screenshot and demo link are optional. If missing, that part of the card is simply not shown.
- A "See more on GitHub" link below the grid goes to my GitHub profile.

### 4.8 Contact
- Short line inviting people to reach out.
- Email (a `mailto:` link), LinkedIn, GitHub, and any other links in the content file.

### 4.9 Footer
- Name, year, and repeated social links.

## 5. Visual design

### 5.1 Colors
Defined once as CSS variables and used through Tailwind.

| Token | Dark theme | Light theme |
|---|---|---|
| Background | `#0b1220` (deep navy) | `#f8fafc` |
| Surface (cards) | `#111a2e` | `#ffffff` |
| Border | `#1e2a44` | `#e2e8f0` |
| Main text | `#e2e8f0` | `#0f172a` |
| Muted text | `#94a3b8` | `#475569` |
| Accent | `#2dd4bf` (teal) | `#0f766e` (darker teal, readable on white) |

All text must meet WCAG AA contrast (4.5:1 for body text) in both themes.

### 5.2 Typography
- **Body and headings:** Geist Sans (loaded with `next/font`).
- **Monospace touches:** Geist Mono for section labels (e.g. `01. about`), tech tags, dates, and the nav.
- Large, bold hero name. Comfortable body size (around 16–18px) and line length (about 70 characters max).

### 5.3 Motion
- Sections fade in and slide up a little (about 16px, about 400ms) the first time they scroll into view. Uses `IntersectionObserver` and CSS, no animation library.
- Cards lift slightly with a stronger border on hover.
- Theme toggle switches instantly, with no flash of the wrong theme on page load.
- All motion is turned off under `prefers-reduced-motion: reduce`.

## 6. Content file

All text and links live in **`src/content/site.ts`**, a typed TypeScript file. Updating the site means editing only this file (and dropping images into `public/`). Components read from it and never contain hard-coded personal content.

Shape:

```ts
export const site = {
  name: string,
  title: string,
  pitch: string,
  photo: string,            // e.g. "/headshot.jpg" in public/
  openToWork: boolean,
  resume?: string,          // e.g. "/resume.pdf"; button hidden when missing
  about: { bio: string[], location: string, workPreference: string },
  experience: { role, company, companyUrl?, start, end, location?, highlights: string[] }[],
  education?: { name, school, year }[],
  skills: { group: string, items: { name: string, strong?: boolean }[] }[],
  traits: { title: string, example: string }[],
  projects: { name, description, tech: string[], github: string, demo?: string, image?: string }[],
  contact: { email: string, linkedin?: string, github: string, other?: { label, url }[] },
};
```

## 7. Content to fill in

Anything still marked **⟨fill in⟩** gets placeholder text until it's provided. The site builds and works with placeholders.

**About me**
- Name: ⟨fill in⟩
- Title: ⟨fill in — e.g. "Full-Stack Developer"⟩
- One-line pitch: ⟨fill in⟩
- Bio (1–2 short paragraphs): ⟨fill in⟩
- Location: ⟨fill in⟩
- Work preference (remote / relocation / local): ⟨fill in⟩
- Open to work: ⟨yes / no⟩
- Headshot photo: ⟨add file to `public/`⟩

**Experience** (repeat per job, newest first)
- Role / Company / Dates / Location: ⟨fill in⟩
- 2–3 achievements, with numbers where possible: ⟨fill in⟩

**Education / certifications** (optional): ⟨fill in⟩

**Skills**
- Frontend: ⟨fill in, mark strongest⟩
- Backend: ⟨fill in, mark strongest⟩
- Tools: ⟨fill in, mark strongest⟩

**Why hire me** (3–5)
- Trait + short real example: ⟨fill in⟩

**Projects** (3–6)
- GitHub username: ⟨fill in⟩
- Per repo: name, what it does, tech used, demo link, screenshot: ⟨fill in — or give repo names and Claude drafts descriptions from the READMEs⟩

**Contact**
- Email: ⟨fill in⟩
- LinkedIn: ⟨fill in⟩
- Other links: ⟨fill in⟩

**Resume PDF:** ⟨add later as `public/resume.pdf`⟩

## 8. Project structure

```
my-site/
  public/              headshot, project screenshots, resume (later), favicon
  src/
    app/
      layout.tsx       fonts, theme provider, page metadata
      page.tsx         puts the sections in order
      globals.css      color tokens, base styles
      opengraph-image.tsx  link-preview image
    components/
      Nav.tsx, ThemeToggle.tsx, Hero.tsx, About.tsx, Experience.tsx,
      Skills.tsx, WhyMe.tsx, Projects.tsx, Contact.tsx, Footer.tsx,
      Section.tsx      shared wrapper: id, label, fade-in on scroll
    content/
      site.ts          all personal content (section 6)
```

## 9. Quality requirements

- **Responsive:** looks right from 360px phones up to wide desktop screens, with no sideways scrolling.
- **Accessible:** proper heading order, alt text on images, visible keyboard focus, nav and toggle usable by keyboard, a "skip to content" link.
- **SEO and sharing:** page title, description, and a link-preview image (so links look good in LinkedIn or Slack).
- **Fast:** mostly static. Images go through `next/image`. Lighthouse score of 90+ in Performance, Accessibility, Best Practices, and SEO.
- **Missing optional content** (no demo link, no screenshot, no resume, no education) hides that element instead of showing an empty slot or a broken link.

## 10. How we check it's done

1. `next build` and the TypeScript check pass with no errors.
2. Lighthouse 90+ in all four categories in both themes.
3. Manual check at phone (375px) and desktop (1440px) widths: layout, mobile menu, theme toggle.
4. Keyboard-only walkthrough of the whole page.
5. Reduced-motion setting turns off animations.
6. Every link (nav, projects, contact) opens the right place.
7. Deployed to Vercel and the live URL loads.
