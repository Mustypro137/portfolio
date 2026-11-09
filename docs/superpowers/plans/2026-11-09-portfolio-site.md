# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, dark/light, recruiter-friendly developer portfolio in Next.js, driven entirely by one content file, ready to deploy on Vercel.

**Architecture:** A Next.js App Router site with one route (`/`). `src/content/site.ts` holds every piece of personal content as a typed `SiteContent` object. `page.tsx` passes each section component the slice of content it needs as props, so components can be tested with fixtures. Theming uses CSS variables switched by a `.dark` class from `next-themes`. Scroll-reveal is a small `IntersectionObserver` inside the shared `Section` wrapper.

**Tech Stack:** Next.js (latest stable, App Router), React, TypeScript, Tailwind CSS v4, next-themes, Vitest + React Testing Library (jsdom). Node 22 / npm 11 are installed.

**Spec:** [docs/superpowers/specs/2026-11-09-portfolio-site-design.md](../specs/2026-11-09-portfolio-site-design.md)

## Global Constraints

- One route only (`/`). No blog, contact form, CMS, live GitHub API, analytics, or project detail pages.
- Components never hard-code personal content. Everything comes from `src/content/site.ts` via props.
- Section ids, exactly: `about`, `experience`, `skills`, `why-me`, `projects`, `contact`.
- Color tokens, exactly:

  | Token | Dark | Light |
  |---|---|---|
  | `--bg` | `#0b1220` | `#f8fafc` |
  | `--surface` | `#111a2e` | `#ffffff` |
  | `--border` | `#1e2a44` | `#e2e8f0` |
  | `--fg` | `#e2e8f0` | `#0f172a` |
  | `--muted` | `#94a3b8` | `#475569` |
  | `--accent` | `#2dd4bf` | `#0f766e` |

- Fonts: Geist Sans (body/headings), Geist Mono (section labels, tags, dates, nav) via `next/font/google`.
- Theme follows the system by default (`defaultTheme="system"`, `enableSystem`), toggled with `attribute="class"`. No flash of the wrong theme.
- Reveal motion: fade + ~16px slide up, ~400ms. Fully disabled under `prefers-reduced-motion: reduce`.
- Mobile breakpoint for the nav menu: below 768px (Tailwind `md`).
- External links use `target="_blank" rel="noopener noreferrer"`. `mailto:` and in-page `#` links do not.
- Missing optional content (photo, resume, education, company URL, LinkedIn, demo, project image) hides that element. Nothing renders empty or broken.
- Must meet WCAG AA contrast, keyboard operability, a skip link, and alt text on images.

## Review Focus

1. **JavaScript fails or `IntersectionObserver` is missing.** Content must stay visible. Hiding happens only after mount, and only when the observer exists (Task 3 test `keeps content visible without IntersectionObserver`).
2. **Jumping to a section from the nav.** The heading must not land under the sticky bar, so sections carry `scroll-mt-24` (Task 3 test `adds scroll margin for the sticky nav`).
3. **No photo provided yet.** The hero shows an initials circle, never a broken image (Task 5 tests `shows initials when no photo` and the `getInitials` tests).
4. **Long unbroken strings on a 360px phone** (long URLs, emails, company names, many tech tags). Nothing may scroll sideways. Card containers use `min-w-0 break-words` (Tasks 6–8). Checked in Task 10 Step 3 by asserting `scrollWidth <= innerWidth` with a long-content edit.
5. **Shipping placeholder content.** Every placeholder line in `site.ts` carries a `// TODO: fill in` comment, and Task 10 Step 6 greps for it and reports before deploying.

---

### Task 1: Project setup, content types, placeholder content

**Files:**
- Create (scaffold): Next.js app in the project root (the existing `docs/` folder is allowed by create-next-app)
- Create: `vitest.config.ts`, `src/test/setup.ts`
- Create: `src/content/types.ts`, `src/content/site.ts`, `src/test/fixtures.ts`
- Test: `src/content/site.test.ts`
- Modify: `package.json` (scripts), `tsconfig.json` (vitest types)

**Interfaces:**
- Produces (`src/content/types.ts`):
  ```ts
  export type Job = { role: string; company: string; companyUrl?: string; start: string; end: string; location?: string; highlights: string[] };
  export type Education = { name: string; school: string; year: string };
  export type Skill = { name: string; strong?: boolean };
  export type SkillGroup = { group: string; items: Skill[] };
  export type Trait = { title: string; example: string };
  export type Project = { name: string; description: string; tech: string[]; github: string; demo?: string; image?: string };
  export type ContactLinks = { email: string; linkedin?: string; github: string; other?: { label: string; url: string }[] };
  export type AboutInfo = { bio: string[]; location: string; workPreference: string };
  export type SiteContent = {
    name: string; title: string; pitch: string; photo?: string; openToWork: boolean; resume?: string;
    about: AboutInfo; experience: Job[]; education?: Education[]; skills: SkillGroup[];
    traits: Trait[]; projects: Project[]; contact: ContactLinks;
  };
  ```
  `photo` is optional (initials fallback, see Review Focus 3). This refines spec §6, where it was required.
- Produces: `site: SiteContent` from `src/content/site.ts`; `fullSite: SiteContent` (every optional field set) and `minimalSite: SiteContent` (every optional field omitted, `education: []`) from `src/test/fixtures.ts`.

- [ ] **Step 1: Initialize git and scaffold**

  ```bash
  git init
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --turbopack
  ```
  Accept defaults for any other prompts. If the installed create-next-app rejects a flag, drop it and give the same answer at the prompt. Expected: `src/app/page.tsx` exists and `npm run dev` serves the starter page.

- [ ] **Step 2: Install test and theme dependencies**

  ```bash
  npm i next-themes
  npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
  ```

- [ ] **Step 3: Configure Vitest**

  `vitest.config.ts`: `@vitejs/plugin-react`, `test.environment: "jsdom"`, `test.globals: true`, `test.setupFiles: ["./src/test/setup.ts"]`, alias `@` → `./src`. `setup.ts` imports `@testing-library/jest-dom/vitest`. Add `"vitest/globals"` to `compilerOptions.types` in `tsconfig.json`. Add scripts `"test": "vitest run"` and `"typecheck": "tsc --noEmit"`.

- [ ] **Step 4: Write the failing test** (`src/content/site.test.ts`)

  ```ts
  import { site } from "./site";
  describe("site content", () => {
    it("has 3–6 projects", () => { expect(site.projects.length).toBeGreaterThanOrEqual(3); expect(site.projects.length).toBeLessThanOrEqual(6); });
    it("has 3–5 traits", () => { expect(site.traits.length).toBeGreaterThanOrEqual(3); expect(site.traits.length).toBeLessThanOrEqual(5); });
    it("every job has 1–3 highlights", () => { site.experience.forEach(j => { expect(j.highlights.length).toBeGreaterThanOrEqual(1); expect(j.highlights.length).toBeLessThanOrEqual(3); }); });
    it("contact email has no mailto: prefix", () => { expect(site.contact.email).not.toMatch(/^mailto:/); });
  });
  ```

- [ ] **Step 5: Run it to verify it fails**

  Run: `npm test`. Expected: FAIL, cannot resolve `./site`.

- [ ] **Step 6: Write `types.ts`, `site.ts`, and `fixtures.ts`**

  `site.ts` exports `site: SiteContent` with readable placeholders (name `"Your Name"`, title `"Software Engineer"`, email `"you@example.com"`, GitHub `"https://github.com/your-username"`, 2 jobs, 3 skill groups `Frontend`/`Backend`/`Tools`, 3 traits, 3 projects, no `photo`, no `resume`, `openToWork: true`). Every placeholder line ends with `// TODO: fill in`. Add a comment at the top: experience must be listed newest first; images go in `public/`.

- [ ] **Step 7: Run tests and typecheck**

  Run: `npm test && npm run typecheck`. Expected: 4 passing, no type errors.

- [ ] **Step 8: Commit**

  ```bash
  git add -A && git commit -m "chore: scaffold Next.js app, content types, placeholder content"
  ```

---

### Task 2: Theme tokens, fonts, layout, theme toggle

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Create: `src/components/ThemeProvider.tsx`, `src/components/ThemeToggle.tsx`
- Test: `src/components/ThemeToggle.test.tsx`

**Interfaces:**
- Consumes: `site` (name, title, pitch for metadata).
- Produces: Tailwind color utilities `bg-bg`, `bg-surface`, `border-border`, `text-fg`, `text-muted`, `text-accent`, `bg-accent`, and `font-sans` / `font-mono` mapped to Geist. `<ThemeToggle />` (no props, client component). Layout renders `<a href="#main">Skip to content</a>`, visible on focus. `page.tsx` must render `<main id="main">`.

- [ ] **Step 1: Write the failing test**

  Mock `next-themes`: `vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: mockTheme, setTheme: mockSetTheme }) }))`.

  ```ts
  it("offers light mode when dark is active", async () => {
    mockTheme = "dark"; render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });
  it("offers dark mode when light is active", async () => {
    mockTheme = "light"; render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
  ```

- [ ] **Step 2: Run it to verify it fails**

  Run: `npx vitest run src/components/ThemeToggle.test.tsx`. Expected: FAIL, module not found.

- [ ] **Step 3: Implement**

  - `globals.css`: `@import "tailwindcss";`, then `@custom-variant dark (&:where(.dark, .dark *));`. Put the light token values on `:root` and the dark values on `.dark` (exact hex from Global Constraints). Map them with `@theme inline { --color-bg: var(--bg); … --font-sans: var(--font-geist-sans); --font-mono: var(--font-geist-mono); }`. Add `html { scroll-behavior: smooth }` inside `@media (prefers-reduced-motion: no-preference)`. Set `body` to `bg-bg text-fg font-sans antialiased`.
  - `ThemeProvider.tsx`: a `"use client"` wrapper around next-themes' `ThemeProvider` with `attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange`.
  - `ThemeToggle.tsx`: `"use client"`. Render nothing until mounted (avoids a hydration mismatch), then a button with an `aria-label` from the test and an inline SVG sun/moon icon (`aria-hidden`).
  - `layout.tsx`: `<html lang="en" suppressHydrationWarning>`, Geist font variables on `<body>`, skip link, wrap children in `ThemeProvider`. Set `metadata` to `title: \`${site.name} — ${site.title}\``, `description: site.pitch`, and `openGraph` with the same title and description.

- [ ] **Step 4: Run tests and build**

  Run: `npm test && npm run build`. Expected: all pass, build succeeds.

- [ ] **Step 5: Commit**

  `git add -A && git commit -m "feat: theme tokens, fonts, layout, theme toggle"`

---

### Task 3: Section wrapper with scroll reveal

**Files:**
- Create: `src/components/Section.tsx`
- Modify: `src/app/globals.css` (reveal styles)
- Test: `src/components/Section.test.tsx`

**Interfaces:**
- Produces: `Section({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode })`, a `"use client"` component. It renders `<section id={id} className="scroll-mt-24 …">`, a mono accent `<p>` with `label` (e.g. `"01. about"`), an `<h2>` with `title`, then children. It uses a `reveal-pending` class while hidden.

- [ ] **Step 1: Write the failing tests**

  Stub `IntersectionObserver` with a class that records its callback and exposes `trigger(isIntersecting)`.

  ```ts
  it("renders id, label and heading", () => { /* getByRole("heading",{level:2,name:"About"}); container.querySelector("section#about"); getByText("01. about") */ });
  it("adds scroll margin for the sticky nav", () => { expect(section).toHaveClass("scroll-mt-24"); });
  it("keeps content visible without IntersectionObserver", () => { /* delete window.IntersectionObserver; render; */ expect(section).not.toHaveClass("reveal-pending"); });
  it("hides until intersecting, then reveals and stops observing", () => {
    /* render with stub; */ expect(section).toHaveClass("reveal-pending");
    act(() => stub.trigger(true)); expect(section).not.toHaveClass("reveal-pending"); expect(stub.disconnect).toHaveBeenCalled();
  });
  ```

- [ ] **Step 2: Run them to verify they fail**

  Run: `npx vitest run src/components/Section.test.tsx`. Expected: FAIL, module not found.

- [ ] **Step 3: Implement**

  Server-rendered markup never has `reveal-pending`. In `useEffect`, if `"IntersectionObserver" in window`, add `reveal-pending` and observe with `threshold: 0.1`. On the first intersection, remove the class and `disconnect()`. Track state with `useState(false)`, not by touching `classList` directly. Do not hide sections already in the viewport at mount: if `getBoundingClientRect().top < window.innerHeight`, skip hiding. CSS: `.reveal { transition: opacity 400ms ease, transform 400ms ease }` and `.reveal-pending { opacity: 0; transform: translateY(16px) }`. Under `@media (prefers-reduced-motion: reduce)`, both get `opacity:1; transform:none; transition:none`.

  Note: in jsdom, `getBoundingClientRect().top` is 0 and `innerHeight` is 768, so the in-viewport skip would hide nothing. In the "hides until intersecting" test, mock `getBoundingClientRect` to return `top: 2000`.

- [ ] **Step 4: Run tests**

  Run: `npm test`. Expected: all pass.

- [ ] **Step 5: Commit**

  `git add -A && git commit -m "feat: Section wrapper with scroll reveal"`

---

### Task 4: Sticky nav with mobile menu

**Files:**
- Create: `src/components/Nav.tsx`
- Test: `src/components/Nav.test.tsx`

**Interfaces:**
- Consumes: `<ThemeToggle />`.
- Produces: `export const NAV_LINKS = [{ href: "#about", label: "About" }, { href: "#experience", label: "Experience" }, { href: "#skills", label: "Skills" }, { href: "#why-me", label: "Why Me" }, { href: "#projects", label: "Projects" }, { href: "#contact", label: "Contact" }] as const;` and `Nav({ name }: { name: string })`, a `"use client"` component.

- [ ] **Step 1: Write the failing tests** (mock `./ThemeToggle` to render null)

  ```ts
  it("renders name linking to top and all six section links", () => { /* getByRole("link",{name:"Your Name"}) has href "#"; each NAV_LINKS label → link with matching href (use getAllByRole since desktop + mobile lists may both exist; at least one per label) */ });
  it("menu button toggles aria-expanded and the panel", async () => { /* button "Open menu" aria-expanded="false"; click → aria-expanded="true", panel with id "mobile-menu" visible; button aria-controls="mobile-menu" */ });
  it("closes the menu on Escape", async () => { /* open; userEvent.keyboard("{Escape}"); aria-expanded="false" */ });
  it("closes the menu when a link is tapped", async () => { /* open; click "Projects" inside panel; aria-expanded="false" */ });
  it("marks the bar as scrolled after scrolling", () => { /* window.scrollY = 50; fireEvent.scroll(window); header has data-scrolled="true" */ });
  ```

- [ ] **Step 2: Run them to verify they fail**

  Run: `npx vitest run src/components/Nav.test.tsx`. Expected: FAIL.

- [ ] **Step 3: Implement**

  `<header data-scrolled={scrolled}>` is `sticky top-0 z-50`. When `data-scrolled="true"` it gets `bg-bg/80 backdrop-blur border-b border-border`. The desktop list is `hidden md:flex` (mono font, small). The menu button is `md:hidden` with `aria-label` "Open menu"/"Close menu". The panel renders only when open. Escape is handled by a `keydown` listener on `window` while open. The scroll listener is passive, and the threshold is `scrollY > 8`.

- [ ] **Step 4: Run tests**

  Run: `npm test`. Expected: all pass.

- [ ] **Step 5: Commit**

  `git add -A && git commit -m "feat: sticky nav with mobile menu"`

---

### Task 5: Hero and About

**Files:**
- Create: `src/lib/initials.ts`, `src/components/Hero.tsx`, `src/components/About.tsx`
- Test: `src/lib/initials.test.ts`, `src/components/Hero.test.tsx`, `src/components/About.test.tsx`

**Interfaces:**
- Produces: `getInitials(name: string): string`. `Hero(props: Pick<SiteContent, "name" | "title" | "pitch" | "photo" | "openToWork" | "resume">)`. `About({ about }: { about: AboutInfo })`, wrapped in `<Section id="about" label="01. about" title="About me">`.

- [ ] **Step 1: Write the failing tests**

  ```ts
  // initials
  expect(getInitials("Jane Doe")).toBe("JD");
  expect(getInitials("Mary Ann Smith")).toBe("MS");
  expect(getInitials("Cher")).toBe("C");
  expect(getInitials("   ")).toBe("?");
  // Hero (use fullSite / minimalSite fields)
  it("shows name as h1, title and pitch", ...);
  it("shows the photo with alt text when provided", () => { expect(screen.getByRole("img", { name: `Photo of ${fullSite.name}` })).toBeInTheDocument(); });
  it("shows initials when no photo", () => { /* minimalSite → getByText(getInitials(name)); queryByRole("img") null */ });
  it("shows Open to work badge only when openToWork", ...);
  it("links View projects to #projects and Contact me to #contact", ...);
  it("shows Resume only when resume is set, opening in a new tab", () => { /* fullSite: link "Resume" href=fullSite.resume target=_blank rel="noopener noreferrer"; minimalSite: queryByRole("link",{name:"Resume"}) null */ });
  // About
  it("renders each bio paragraph, location and work preference", ...);
  ```

- [ ] **Step 2: Run them to verify they fail**

  Run: `npm test`. Expected: the new tests FAIL.

- [ ] **Step 3: Implement**

  `getInitials`: trim and split on whitespace. Take the first letter of the first word plus the first letter of the last word when there is more than one word, uppercased. Return `"?"` if empty. Hero photo uses `next/image` (`width={160} height={160} priority`, rounded). The initials fallback is a same-size `aria-hidden` circle with a `border-accent` ring. The layout is a two-column grid on `md+`, with the photo stacked above the text on mobile, `min-h-[80vh]`. The h1 is large and bold. The Open to work badge is a mono pill with a teal dot. The primary button (View projects) is solid accent; the others are outlined.

- [ ] **Step 4: Run tests**

  Run: `npm test`. Expected: all pass.

- [ ] **Step 5: Commit**

  `git add -A && git commit -m "feat: hero and about sections"`

---

### Task 6: Experience and Skills

**Files:**
- Create: `src/components/Experience.tsx`, `src/components/Skills.tsx`
- Test: `src/components/Experience.test.tsx`, `src/components/Skills.test.tsx`

**Interfaces:**
- Produces: `Experience({ experience, education }: { experience: Job[]; education?: Education[] })` → `<Section id="experience" label="02. experience" title="Where I've worked">`. `Skills({ skills }: { skills: SkillGroup[] })` → `<Section id="skills" label="03. skills" title="Skills">`.

- [ ] **Step 1: Write the failing tests**

  ```ts
  it("renders jobs in content order with role, company, dates and highlights", () => { /* role headings order matches fullSite.experience order; `${start} — ${end}` text */ });
  it("links company when companyUrl is set, plain text otherwise", () => { /* link with name company, href companyUrl, target _blank; for job without url: getByText(company) not inside <a> */ });
  it("hides location when absent", ...);
  it("shows Education list only when education has entries", () => { /* fullSite → heading "Education"; minimalSite (education: []) → no heading */ });
  // Skills
  it("renders a heading per group and a chip per skill", ...);
  it("highlights strong skills", () => { /* strong chip has data-strong="true"; others no attribute */ });
  ```

- [ ] **Step 2: Run them to verify they fail**

  Run: `npm test`. Expected: the new tests FAIL.

- [ ] **Step 3: Implement**

  Experience is an `<ol>` timeline with a left border line and an accent dot per entry. Dates and location are mono and muted. Each entry wrapper has `min-w-0 break-words`. Education is a compact `<ul>` under an `<h3>Education</h3>`. Skills groups go in a responsive grid (`sm:grid-cols-2 lg:grid-cols-3`), each a surface card with an `<h3>` and a wrapping flex list of mono chips. Strong chips use `border-accent text-accent`.

- [ ] **Step 4: Run tests**

  Run: `npm test`. Expected: all pass.

- [ ] **Step 5: Commit**

  `git add -A && git commit -m "feat: experience and skills sections"`

---

### Task 7: Why hire me and Projects

**Files:**
- Create: `src/components/WhyMe.tsx`, `src/components/Projects.tsx`, `src/components/ExternalLink.tsx`
- Test: `src/components/WhyMe.test.tsx`, `src/components/Projects.test.tsx`

**Interfaces:**
- Produces: `ExternalLink({ href, children, className? })`, an `<a>` with `target="_blank" rel="noopener noreferrer"`. Use it in every task from here on, and refactor Tasks 5–6 to use it as well. `WhyMe({ traits }: { traits: Trait[] })` → `<Section id="why-me" label="04. why me" title="Why hire me">`. `Projects({ projects, githubProfile }: { projects: Project[]; githubProfile: string })` → `<Section id="projects" label="05. projects" title="Things I've built">`.

- [ ] **Step 1: Write the failing tests**

  ```ts
  it("renders a card per trait with title and example", ...);
  it("renders each project's name, description and tech tags", ...);
  it("shows screenshot with alt only when image is set", () => { /* fullSite project → img name `Screenshot of ${name}`; minimalSite → no img */ });
  it("shows GitHub link always and Live demo only when demo is set", () => { /* accessible names `GitHub repo for ${name}` / `Live demo of ${name}`; target _blank, rel noopener noreferrer */ });
  it("links See more on GitHub to the profile", () => { /* href === githubProfile */ });
  ```

- [ ] **Step 2: Run them to verify they fail**

  Run: `npm test`. Expected: the new tests FAIL.

- [ ] **Step 3: Implement**

  The trait grid is `sm:grid-cols-2 lg:grid-cols-3`. The project grid is `md:grid-cols-2`. Cards: `bg-surface border border-border rounded-xl min-w-0 break-words`, with hover `-translate-y-1 border-accent` wrapped in `motion-safe:`. The screenshot uses `next/image` with a `16/9` aspect and `object-cover`. The visible link text is "GitHub" / "Live demo" with `aria-label` giving the accessible names from the tests.

- [ ] **Step 4: Run tests**

  Run: `npm test`. Expected: all pass.

- [ ] **Step 5: Commit**

  `git add -A && git commit -m "feat: why-me and projects sections"`

---

### Task 8: Contact and Footer

**Files:**
- Create: `src/components/Contact.tsx`, `src/components/Footer.tsx`
- Test: `src/components/Contact.test.tsx`, `src/components/Footer.test.tsx`

**Interfaces:**
- Produces: `Contact({ contact }: { contact: ContactLinks })` → `<Section id="contact" label="06. contact" title="Get in touch">`. `Footer({ name, contact }: { name: string; contact: ContactLinks })`.

- [ ] **Step 1: Write the failing tests**

  ```ts
  it("renders email as mailto link without new tab", () => { /* href `mailto:${email}`, no target attr; visible text is the address */ });
  it("renders GitHub always, LinkedIn and other links only when set", ...);
  it("footer shows © current year and name", () => { expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} ${name}`))).toBeInTheDocument(); });
  ```

- [ ] **Step 2: Run them to verify they fail**

  Run: `npm test`. Expected: the new tests FAIL.

- [ ] **Step 3: Implement**

  Contact is a centered short invitation line, a large accent "Say hello" `mailto:` button, and a row of links below. Links wrap and the email has `break-all`. The footer is a small, muted mono line plus the same links, rendered compact.

- [ ] **Step 4: Run tests**

  Run: `npm test`. Expected: all pass.

- [ ] **Step 5: Commit**

  `git add -A && git commit -m "feat: contact and footer"`

---

### Task 9: Page assembly and link-preview image

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/opengraph-image.tsx`
- Delete: unused starter assets in `public/` (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`)
- Test: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: every component above and `site`.

- [ ] **Step 1: Write the failing test** (mock `next-themes` as in Task 2)

  ```ts
  it("renders main#main with sections in spec order", () => {
    const { container } = render(<Home />);
    const ids = [...container.querySelectorAll("main section[id]")].map(s => s.id);
    expect(ids).toEqual(["about", "experience", "skills", "why-me", "projects", "contact"]);
  });
  it("has exactly one h1", () => { expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1); });
  ```

- [ ] **Step 2: Run it to verify it fails**

  Run: `npx vitest run src/app/page.test.tsx`. Expected: FAIL (starter page).

- [ ] **Step 3: Implement**

  `page.tsx` renders `<Nav name={site.name} />`, then `<main id="main" className="mx-auto max-w-5xl px-4 sm:px-6">` containing Hero, About, Experience, Skills, WhyMe, Projects (`githubProfile={site.contact.github}`), Contact, then `<Footer />`. Sections have vertical spacing of about `py-24`, and body text is capped at `max-w-prose`. `opengraph-image.tsx` uses `ImageResponse` from `next/og`, `size = { width: 1200, height: 630 }`, background `#0b1220`, with name in `#e2e8f0` and title in `#2dd4bf`, both read from `site`.

- [ ] **Step 4: Run tests, typecheck, lint, build**

  Run: `npm test && npm run typecheck && npm run lint && npm run build`. Expected: all pass, and the build output lists `/` and `/opengraph-image`.

- [ ] **Step 5: Commit**

  `git add -A && git commit -m "feat: assemble page and link-preview image"`

---

### Task 10: Verification and deploy

**Files:** none new. Fixes go in whichever component a check fails on.

- [ ] **Step 1: Production server**

  Run: `npm run build && npm start`. Expected: serves on `http://localhost:3000`.

- [ ] **Step 2: Lighthouse, both themes**

  Run: `npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --output=json --quiet --chrome-flags="--headless"`. Headless Chrome renders the light theme. For the dark run, temporarily set `defaultTheme="dark" enableSystem={false}` in `ThemeProvider.tsx`, rebuild, re-run Lighthouse, then revert. Expected: every category ≥ 0.90 in both runs. Fix and re-run if not.

- [ ] **Step 3: Responsive and overflow check (browser)**

  Temporarily set one project's description to a 120-character unbroken string and the email to a 60-character address. At 360px, 375px, 768px and 1440px wide, evaluate `document.documentElement.scrollWidth <= window.innerWidth` and take a screenshot. Expected: `true` at every width, with no visual overlap. Revert the temporary content.

- [ ] **Step 4: Interaction checks (browser)**

  - Tab from the top: the skip link appears first and jumps to main. Every link and button shows a visible focus ring.
  - At 375px, open the menu, press Escape, reopen it, and tap "Projects". The menu closes and the Projects heading is not hidden under the bar.
  - Toggle the theme, then reload. The chosen theme persists with no flash.
  - Emulate `prefers-reduced-motion: reduce` and reload. Sections appear without animation.
  - Click every nav, project, and contact link. Each one goes to the right target.

- [ ] **Step 5: Commit any fixes**

  `git add -A && git commit -m "fix: verification findings"` (skip if nothing changed).

- [ ] **Step 6: Placeholder check before deploy**

  Run: `git grep -n "TODO: fill in" src/content/site.ts`. Expected: no output. If any lines remain, list them to the user and get their decision before deploying. Deploying with placeholders is their call.

- [ ] **Step 7: Deploy (user action, needs their Vercel account)**

  Either run `npx vercel` and follow the login prompts, or push the repo to GitHub and import it at vercel.com/new (framework auto-detected, no settings needed). Expected: the live `*.vercel.app` URL loads, the link preview shows the OG image, and the theme toggle works.
