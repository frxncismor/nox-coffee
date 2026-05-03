import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __noxInit?: boolean;
  }
}

export let lenis: Lenis;

export function bootNox(): void {
  // Idempotent guard — prevent double initialization
  if (window.__noxInit) return;
  window.__noxInit = true;

  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: false });

  // Sync Lenis scroll position to ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Drive Lenis from GSAP ticker (time is in seconds, lenis.raf expects ms)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Refresh ScrollTrigger after all assets load (fonts, images)
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  // Skip animations for users who prefer reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

  // Import and initialize all trigger modules
  Promise.all([
    import('./triggers/hero').then((m) => m.initHero({ desktop: isDesktop })),
    import('./triggers/story').then((m) => m.initStory({ desktop: isDesktop })),
    import('./triggers/product').then((m) => m.initProduct({ desktop: isDesktop })),
    import('./triggers/lineup').then((m) => m.initLineup({ desktop: isDesktop })),
    import('./triggers/cta').then((m) => m.initCta({ desktop: isDesktop })),
    import('./triggers/scroll-progress').then((m) => m.initScrollProgress()),
  ]).catch((err) => {
    console.error('[Nox] Animation init failed:', err);
  });
}
