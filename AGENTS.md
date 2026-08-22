# AGENTS.md — MARPROJECTOR Portfolio

> Living guide for AI coding sessions on this codebase. Act like a senior full-stack engineer responsible for this project long-term.

## Project Overview

Personal portfolio website for M. Ammar Arief (MARPROJECTOR). Single-page application with dynamic project detail routes (`/projects/[slug]`). Deployed on Vercel. The home page is an animation-driven, scroll-pinned experience; the project detail pages are content-focused.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **React:** 19.1
- **Language:** TypeScript 5.5 (see [Coding Standards](#coding-standards) — strict is a target, not yet enforced in `tsconfig.json`)
- **Styling:** Tailwind CSS 4 (PostCSS plugin)
- **Animation:** GSAP 3.13 + ScrollTrigger, `@gsap/react` (`useGSAP`), Framer Motion 13 (mount/unmount transitions), Lenis (`@studio-freight/lenis`) for smooth scroll
- **Routing transitions:** `next-transition-router`
- **Icons:** `react-icons`, `lucide-react`
- **Loading UI:** `react-loading-skeleton`
- **Email:** Nodemailer (Gmail SMTP, app-password auth)
- **Analytics:** `@vercel/analytics`, `@next/third-parties` (Google Analytics, optional via env)
- **Lint/Format:** ESLint 8 (`eslint-config-next`, `jsx-a11y`, `react-hooks`), Prettier

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint check
npm run lint:fix   # ESLint auto-fix
npm run format     # Prettier format (writes)
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, analytics, ClientLayout
│   ├── page.tsx                # Home page: composes sections + GSAP scroll/pin orchestration
│   ├── ClientLayout.tsx        # Client wrapper: preloader, cursor, providers, smooth scroll
│   ├── providers.tsx           # Global providers
│   ├── globals.css             # Theme vars, Tailwind layers, marquee/film-grain utilities
│   ├── api/
│   │   ├── contact/route.ts    # Contact form POST (validation, rate limit, email send)
│   │   └── github-project/route.ts  # GitHub project data fetch (server-side proxy)
│   └── projects/
│       └── [slug]/
│           ├── page.tsx        # Dynamic project detail (Server Component shell)
│           └── loading.tsx     # Suspense/loading skeleton
├── components/
│   ├── sections/               # Page sections
│   │   ├── HomeBanner.tsx      # Hero (name, ticker, CTAs, particle canvas)
│   │   ├── About.tsx           # Composes AboutMe + Services + TechStack
│   │   ├── AboutMe.tsx         # Profile image + bio
│   │   ├── Services.tsx        # Pinned service cards (desktop)
│   │   ├── TechStack.tsx       # Tech grid
│   │   ├── Projects.tsx        # Project list (desktop rows + mobile cards)
│   │   ├── MarqueeStrip.tsx    # Infinite marquee text
│   │   ├── Contact.tsx         # Contact form + email copy
│   │   └── MarprojectorPortfolio.tsx  # DEAD CODE — unused, safe to remove
│   ├── shared/                 # Layout-level components
│   │   ├── Navbar.tsx          # Desktop nav + fullscreen mobile menu
│   │   ├── Footer.tsx          # Links, socials, local time
│   │   ├── CustomCursor.tsx    # Dot + outline + text cursor
│   │   └── GlobalPreloader.tsx # Preloader with word cycling
│   ├── ui/                     # Reusable primitives
│   │   ├── AnimatedButton.tsx  # Ripple + text swap
│   │   ├── AnimateHeading.tsx  # Scroll text reveal heading
│   │   ├── AnimateLink.tsx     # Magnetic hover link
│   │   ├── ScrollWordReveal.tsx# Word highlight on scroll
│   │   ├── Magnetic.tsx        # Magnetic hover wrapper
│   │   ├── AnimateDescription.tsx
│   │   └── CurvedSectionDivider.tsx  # SVG curve divider
│   ├── canvas/
│   │   └── AmbientGeometry.tsx # Hero particle network (mouse-reactive)
│   ├── project/                # Project detail components
│   │   └── ProjectDetails.tsx
│   └── providers/
│       └── SmoothScrollProvider.tsx  # Lenis init + context
├── lib/                        # Utilities & config
│   ├── gsap.ts                 # GSAP registration (ScrollTrigger, useGSAP)
│   ├── metadata.ts             # SEO metadata config
│   ├── navigation.ts           # scrollToSection, link click handler
│   ├── projects.ts             # Project data store
│   └── useReducedMotion.ts     # prefers-reduced-motion hook
└── utils/
    └── storage.ts              # Safe sessionStorage helpers
```

## Architecture & Rendering Model

- **Next.js App Router.** Prefer **Server Components by default**. Use `'use client'` only when a component needs hooks, state, browser APIs, or GSAP/Lenis.
- **Goal:** migrate non-animated shells (static markup, metadata, layout) to Server Components. Several existing sections are client-only because of GSAP/Lenis; treat these as legacy and avoid expanding the client boundary unnecessarily.
- **Home page orchestration** (`app/page.tsx`) owns the GSAP scroll/pin timeline: the hero is `sticky` and pinned while the About wrapper layers on top via `z-index`. Do not break this stacking contract when editing layout.
- **Smooth scroll** is provided by Lenis in `SmoothScrollProvider`; it is exposed as `(window as any).__lenis` for escape-hatch access (tech debt — prefer the provider/context where possible).
- **Preloader** (`GlobalPreloader`) dispatches a `preloaderComplete` window event; the hero waits for it before animating in. Keep this handshake intact.
- **Project back-navigation** stores a scroll target in `sessionStorage` (`utils/storage.ts`) and restores it on return.

## Coding Standards

- **TypeScript:** write **strict-clean** code and **avoid `any`** in new/modified code. Note: `tsconfig.json` currently sets `"strict": false`; this is documented as a **target**, not yet enforced. Do not introduce new `any` usages (the Nodemailer transporter `as any` is existing tech debt to revisit).
- **Path alias:** `@/*` → `./src/*`. Use it for all internal imports.
- **Naming:** PascalCase for components and files (`AboutMe.tsx`); camelCase for functions/variables; `useX` for hooks.
- **Comments:** no inline/commented-out code unless explicitly requested. File-level license headers at the top of source files are allowed and present; do not strip them.
- **Formatting:** ESLint + Prettier are enforced. Run `npm run lint:fix` and `npm run format` before completing work.
- **Imports:** group external, then `@/`, then relative; keep `'use client'` as the first line of client components.

## Component Design Principles

- **Layered structure:** `ui/` primitives are dumb and reusable; `sections/` compose primitives + data; `shared/` is layout-level (nav, footer, cursor, preloader); `canvas/` holds WebGL/Canvas effects; `project/` is detail-page specific.
- **Reusability:** build small, composable primitives (e.g. `Magnetic`, `AnimatedButton`) rather than one-off markup. Sections should be data-driven (pull from `lib/projects.ts`).
- **Animation discipline:** use **GSAP for scroll-triggered / pinned effects**; use **Framer Motion only for simple mount/unmount** transitions. Do not add animation for its own sake — every effect should aid hierarchy, feedback, or delight.
- **Accessibility & motion:** always wrap animations behind `useReducedMotion()` and skip hover/magnetic effects on coarse pointers (`window.matchMedia('(pointer: coarse)')`). Animations must degrade gracefully.
- **Cleanup:** scope GSAP work in `gsap.context()` and revert on unmount (or use `useGSAP`); never leak `ScrollTrigger` instances or listeners.

## Performance Optimization Rules

- **Fonts:** already use `display: 'swap'` + `preload`. Keep it; avoid adding font families without reason.
- **Bundle:** do not add dependencies without justification. Prefer code-splitting heavy animation logic and lazy-loading offscreen media.
- **Rendering:** animate only GPU-friendly properties (`transform`, `opacity`); avoid layout thrash and animating `width/height/top/left` in hot paths.
- **Particles/Canvas:** `AmbientGeometry` is mouse-reactive — cap particle counts, respect `prefers-reduced-motion` (disable or freeze), and `prefers-reduced-data` where reasonable.
- **Images:** use `next/image` for remote/local imagery with explicit sizes to avoid CLS.
- **Reduced motion:** when reduced motion is active, skip non-essential animation and render final states directly.

## Security Considerations

- **Contact API** (`api/contact/route.ts`) is the security-sensitive surface. Preserve and extend its guards:
  - Server-side **rate limiting** (in-memory IP limiter: 5 / 15 min — note: not persistent across serverless instances; acceptable for now but flag for Redis/KV if abuse appears).
  - **Input validation:** required fields, email regex, disposable-domain blocklist, name/message length + content checks.
  - **Output encoding:** HTML-escape user content and clean headers (`\r\n`) before emailing to prevent header injection / XSS in the mail body.
  - **Dev fallback:** only writes to `messages.txt` in `NODE_ENV === 'development'`.
- **Secrets:** `GMAIL_APP_PASSWORD` is read from env server-side only. Never log secrets, commit `.env*`, or expose them to the client bundle.
- **API inputs:** validate and sanitize **all** request bodies at the edge; never trust client data. Keep API routes thin and typed via explicit interfaces.
- **Third-party clients:** avoid `as any` casts on nodemailer/SDK clients (current transporter cast is tech debt); use proper types or a narrow, documented escape hatch.
- **Analytics:** Google Analytics loads only when `NEXT_PUBLIC_GA_ID` is set; keep it client-only and non-blocking.

## Testing Expectations

- **Current state:** there is no test runner configured. Do not assume one exists.
- **Type safety gate:** run `npx tsc --noEmit` (or rely on `next build`) to confirm types before considering work done. New code should pass with no new `any`.
- **Recommended (when adding tests):** lightweight unit tests for pure logic in `lib/` — input validation, `navigation.ts`, `projects.ts` data integrity, and API route handlers (mock `nodemailer`). Keep tests close to the code they cover.
- **Manual QA checklist** for UI/animation work:
  - Desktop + mobile (`md:` breakpoint) layouts render correctly.
  - `prefers-reduced-motion` disables/reduces animation and shows final states.
  - Coarse-pointer devices skip magnetic/cursor hover effects.
  - No console errors; no layout shift on load; preloader → hero handoff works.
  - Contact form validation messages and success/error paths behave.

## Git & Change Management

- **Commits:** small, focused, single-purpose. Write clear messages that match repo style (`area: change`).
- **Scope:** do not modify unrelated files. Do not introduce dependencies without explaining why. Do not remove existing features without confirmation.
- **Refactoring:** prefer incremental improvements over large rewrites. Before major refactoring, state the **benefits and risks** and get alignment.
- **Debugging:** find the root cause, not the symptom. Explain *why* it happened and ship a clean long-term fix.
- **Secrets:** never commit credentials or `.env*`.

## UI/UX Consistency Rules

- **Design tokens** (defined in `globals.css` `@theme` / Tailwind theme):

  | Token | Hex | Usage |
  |-------|-----|-------|
  | `cream` | `#E8E4DE` | Light background (hero, projects) |
  | `ink` | `#0F0E0C` | Dark background (about, services, contact) |
  | `accent` | `#C45D3E` | Primary accent (CTAs, highlights) |
  | `accent-light` | `#E07A5F` | Lighter accent variant |
  | `accent-muted` | `#D4956B` | Muted accent (gradients, hovers) |
  | `warm` | `#6B645C` | Secondary text on light |
  | `muted` | `#B0ADA8` | Muted body text on dark |
  | `light` | `#D1D1C7` | Primary body text on dark |
  | `gray-soft` | `#9A9A90` | Muted text on dark bg |
  | `gray-mid` | `#4A4A48` | Low-emphasis text on dark |
  | `gray-btn` | `#524F4C` | Button/icon surfaces on dark |
  | `charcoal` | `#1A1A1A` | Dark text on light bg |
  | `elevated` | `#2A2A2A` | Elevated dark surface |
  | `elevated-dark` | `#1A1A18` | Deeper dark surface (cards, image wraps) |
  | `surface` | `#0D0D0C` | Base dark surface (contact card) |
  | `surface-mid` | `#161615` | Mid dark surface (nested cards, chips) |
  | `border` | `#D0D0C8` | Light borders |
  | `border-dark` | `#C8C8C0` | Slightly darker light border |
  | `border-subtle` | `#393632` | Dark borders |
  | `border-subtler` | `#2A2A28` | Fainter dark borders |
  | `footer-bg` | `#DFDFD9` | Footer background |
  | `footer-border` | `#CFCFC8` | Footer borders |

- **Dark theme:** dark sections are driven by the `portfolio-dark-theme` class on the root wrapper and corresponding overrides in `globals.css`. Keep new dark surfaces consistent with these tokens.
- **Responsive:** `md:` (768px) is the primary mobile/desktop split. Ensure every section has a considered mobile treatment — no desktop-only layouts.
- **Typography & spacing:** use the project fonts (Geist Sans/Mono, Space Grotesk) and a consistent spacing rhythm. Favor generous whitespace, clear hierarchy, and intentional type scale.
- **Polish:** interfaces must feel premium and production-ready — avoid generic templates. Hover/magnetic/cursor interactions are fine-pointer enhancements only; keep them subtle and performant.
- **Consistency:** reuse `ui/` primitives for buttons, links, headings, and dividers instead of bespoke markup.

## Decision-Making Principles

- **Senior posture:** prioritize scalability, maintainability, and preserving existing functionality. Think long-term.
- **Before changes:** understand the architecture, inspect related files, and avoid unnecessary rewrites.
- **Tradeoffs:** for any non-trivial or architectural change, state benefits and risks before acting. Prefer the lowest-risk path that still meets the goal.
- **Quality bar:** clean, readable, production-grade code over shortcuts or hacks. Reuse and modularize. Keep it simple but scalable.
- **Communication:** when debugging, explain the root cause and the chosen solution clearly.

## Known Tech Debt & Important Notes

- `tsconfig.json` has `"strict": false`; strict typing is a documented **target**. Avoid widening the gap.
- `MarprojectorPortfolio.tsx` is unused dead code — safe to delete.
- Nodemailer transporter uses `as any` — replace with proper types when touching the contact route.
- Lenis accessed via `(window as any).__lenis` in places — prefer the provider/context.
- Contact rate limiter is in-memory (per-instance), not shared across serverless invocations.
- `api/github-project/route.ts` proxies GitHub data server-side — keep tokens/secrets out of the client and cache where sensible.
