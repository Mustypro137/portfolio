# Mustapha Abdullahi — Portfolio

My personal portfolio: a single-page site with my story, learning journey, skills and projects.

Built with Next.js, React, TypeScript and Tailwind CSS. Dark-only design with scroll and hover motion that respects reduced-motion settings, responsive from phone to desktop, keyboard-friendly, and tested with Vitest and React Testing Library.

## Run it locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command             | What it does                  |
| ------------------- | ----------------------------- |
| `npm run dev`       | Dev server with instant reload |
| `npm run build`     | Production build              |
| `npm start`         | Serve the production build    |
| `npm test`          | Run all tests                 |
| `npm run typecheck` | Type-check only               |
| `npm run lint`      | Lint                          |

## Editing content

All text, links and project details live in [`src/content/site.ts`](src/content/site.ts). Images and the resume go in `public/`. Optional fields can be left out and that part of the page is hidden.

## Project docs

- [`docs/superpowers/specs/2026-11-09-portfolio-site-design.md`](docs/superpowers/specs/2026-11-09-portfolio-site-design.md) — design spec
- [`docs/superpowers/plans/2026-11-09-portfolio-site.md`](docs/superpowers/plans/2026-11-09-portfolio-site.md) — implementation plan
