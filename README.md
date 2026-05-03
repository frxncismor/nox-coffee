# Nox Coffee

A scroll-driven storytelling landing page for **Nox Coffee** — a fictional specialty coffee brand roasted for late-night creators. Built to demonstrate advanced scroll animation techniques using Astro, GSAP ScrollTrigger, and Lenis smooth scroll.

**Live demo:** [https://nox-coffee.vercel.app](https://nox-coffee.vercel.app)

---

## Brand Story

Some nights the world goes quiet, and it's just you and the work. Nox Coffee was created for those hours — the ones between midnight and dawn when clarity comes and the best ideas take shape. Single-origin, small-batch, roasted for complexity. Not for the morning ritual. For the other kind of focus.

---

## Tech Stack

| Technology | Version | Rationale |
|------------|---------|-----------|
| [Astro](https://astro.build) | 6.x | Zero-JS by default. Static HTML output with no runtime framework overhead. Ideal for content-driven marketing sites where every KB matters. Unlike Next.js, Astro ships zero JavaScript unless you explicitly opt in per component. |
| [TypeScript](https://www.typescriptlang.org) | strict | Strict mode enforces null checks, no implicit `any`, and explicit return types — catches bugs at compile time, not in production. |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first CSS with zero dead code in production via JIT. V4 uses CSS-native variables via `@theme`, eliminating the need for a separate config file. |
| [GSAP](https://gsap.com) | 3.x | Industry-standard animation library. Free tier (~45KB gzipped) includes ScrollTrigger. No paid plugins used — everything built with vanilla GSAP. |
| [Lenis](https://lenis.darkroom.engineering) | 1.x | Lightweight smooth scroll (~5KB gzipped). Synchronizes with GSAP via `autoRaf: false` + `gsap.ticker.add()` for a single RAF loop — no jank, no double-rendering. |
| React | 19.x | Used ONLY for `CustomCursor` and `MagneticButton` islands that require browser-side mouse tracking. Everything else is zero-JS Astro. |

---

## GSAP Techniques

### 1. Lenis + GSAP Ticker Synchronization
The critical pattern that makes scroll animations smooth. Lenis is initialized with `autoRaf: false` to prevent its own RAF loop. Instead, it's driven by GSAP's ticker: `gsap.ticker.add((time) => lenis.raf(time * 1000))`. This ensures both systems share one animation loop, eliminating frame-doubling and scroll jank.

### 2. Character-by-Character Hero Reveal
"NOX" is split into individual `<span data-char>` elements server-side in Astro. GSAP animates each with `stagger: 0.05` on page load — no SplitText plugin needed. Just vanilla DOM splitting.

### 3. Pinned Word-by-Word Story Reveal
The story paragraph is split into words, each wrapped in `<span data-word>` with `opacity: 0.15` set via CSS (not GSAP, to prevent FOUC). On desktop, the section pins for 1500px of scroll and GSAP scrubs word opacity from 0.15 to 1 with stagger. Mobile gets a simple fade-in instead — no pin.

### 4. Pinned Product Showcase with Panel Crossfades
The product section pins for 3000px of scroll. A GSAP timeline drives a coffee bag image through rotate/scale keyframes while three text panels crossfade using `autoAlpha` at 33%/66% scroll progress thresholds.

### 5. Horizontal Scroll Lineup
Product cards are laid out horizontally. On desktop, the section pins and GSAP translates the card track on the X axis based on `scrollWidth - window.innerWidth`. On mobile, native CSS `scroll-snap-type: x mandatory` handles it — no GSAP, no JS.

### 6. ScrollTrigger.matchMedia() Desktop/Mobile Gating
All pinning and scrub animations are gated behind a desktop check (`window.matchMedia('(min-width: 1024px)')`). Mobile users get lightweight IntersectionObserver-style fades via GSAP's ScrollTrigger with simple `start: 'top 80%'` triggers.

### 7. Magnetic Button
A React island that calculates distance between cursor and button center on every `mousemove`. Within 100px, it pulls the button toward the cursor with `translate()`. The pull strength follows `(100 - distance) * 0.25`, clamped at 20px max offset. CSS `transition: transform 75ms ease-out` handles smoothing.

---

## Performance

### Targets
| Metric | Target |
|--------|--------|
| Lighthouse Performance (Desktop) | 100 |
| Lighthouse Performance (Mobile) | 95+ |
| Lighthouse Accessibility | 100 |
| Lighthouse SEO | 100 |
| LCP | < 1.5s |
| Total JS (gzipped) | < 120KB |

### Bundle Breakdown (gzipped)
| Chunk | Size |
|-------|------|
| GSAP (core + ScrollTrigger) | ~45KB |
| React 19 + React DOM | ~58KB |
| Lenis | ~5KB |
| Animation triggers + islands | ~6KB |
| **Total** | **~114KB** |

### LCP Strategy
- Hero image: `loading="eager" fetchpriority="high"` — the browser prioritizes it immediately
- Fonts: `<link rel="preload">` for all three woff2 files before any stylesheet loads
- Static output: served from Vercel CDN edge nodes, TTFB < 50ms
- No server-side rendering — pure static HTML, no hydration waterfall

---

## Local Development

**Prerequisites:** Node.js 20+, npm

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Type check
npx astro check

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Deploy

This project uses Astro's static output adapter for Vercel.

```bash
# Build outputs to dist/
npm run build
```

**Vercel deployment:**
1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Astro** (auto-detected)
4. No environment variables required (fully static)

Every push to `main` triggers an automatic deployment.

---

## Photo Credits

All photography from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license).

| Image | Photographer |
|-------|-------------|
| Hero background | [Brooke Lark](https://unsplash.com/@brookelark) |
| Dusk product | [Nate Contreraas](https://unsplash.com/@natecontrerasphoto) |
| Twilight product | [Brooke Lark](https://unsplash.com/@brookelark) |
| Midnight product | [Nathan Dumlao](https://unsplash.com/@nate_dumlao) |
| Dawn product | [Jason Leung](https://unsplash.com/@ninjason) |
| Showcase bag | [Nathan Dumlao](https://unsplash.com/@nate_dumlao) |
