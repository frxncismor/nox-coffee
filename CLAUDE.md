# Nox Coffee — Claude Instructions

## Project

Scroll-driven storytelling landing page for a fictional specialty coffee brand targeting late-night creators.
Public portfolio piece demonstrating: Astro static output, GSAP scroll animations, performance optimization.

**Repo**: git@github.com:frxncismor/nox-coffee.git
**Deploy**: https://nox-coffee.vercel.app
**Local**: C:\Users\paco_\Documents\code\improving-portfolio-projects\nox-coffee

## Actual Stack (as installed)

- Astro 6.2.1 (not 4 as originally spec'd)
- Tailwind v4 via `@tailwindcss/vite` Vite plugin (NOT `@astrojs/tailwind` — incompatible with Astro 6)
- GSAP 3 + ScrollTrigger (free tier only — NO SplitText, MorphSVG, DrawSVG)
- Lenis 1.x (`import Lenis from 'lenis'`)
- React 19 + React DOM (islands only)
- TypeScript strict

## Critical Architecture Decisions

- **Lenis + GSAP sync**: `autoRaf: false` + `gsap.ticker.add(t => lenis.raf(t * 1000))` + `lagSmoothing(0)` — never change this
- **React islands**: `client:only="react"` for CustomCursor and MagneticButton only — no other React usage
- **Animation gating**: all pinning and scrub animations behind `window.matchMedia('(min-width: 1024px)')` — iOS Safari breaks with pinned sections
- **Mobile words**: `[data-word]` opacity reset to `1 !important` via CSS at max-width: 1023px — GSAP never runs on mobile
- **Tailwind tokens**: defined in `global.css` inside `@theme {}` block (Tailwind v4 syntax), NOT in `tailwind.config.mjs`

## Performance Budget (non-negotiable)

- Lighthouse Desktop: 100 / 100 / 100 / 100
- Lighthouse Mobile: Performance 95+
- LCP < 1.5s
- Total JS < 120KB gzipped (actual: ~113KB — React 19 is 57KB of that)

## File Structure

```
src/
  components/
    islands/      ← React islands (CustomCursor, MagneticButton)
    sections/     ← Astro section components (5 sections)
    ui/           ← Reusable Astro components (ProductCard, FilmGrain, etc.)
  content/
    copy.ts       ← All site copy (typed const)
    products.ts   ← 4 product objects
  layouts/
    BaseLayout.astro
  pages/
    index.astro
  scripts/
    animations.ts         ← Lenis + GSAP boot (single entry point)
    triggers/             ← Per-section GSAP trigger modules
  styles/
    tokens.css    ← CSS custom properties
    global.css    ← Tailwind v4 @import + @theme + base styles
```

## Pending

- [ ] Create `public/og-image.jpg` (1200×630) — WhatsApp preview depends on it
- [ ] Run Lighthouse on deployed URL and document scores in README
- [ ] If mobile Lighthouse < 95: replace React islands with vanilla TS to save ~57KB
