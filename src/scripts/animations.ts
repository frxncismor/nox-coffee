import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ⬇⬇⬇ AGREGAR ESTA LÍNEA — solo en dev, para diagnóstico
if (import.meta.env.DEV) {
  (window as any).ScrollTrigger = ScrollTrigger;
  (window as any).gsap = gsap;
  console.log('[Nox] GSAP & ScrollTrigger exposed on window for debugging');
}

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
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

  // Easter Egg 3: film grain opacity increases with scroll depth
  const grain = document.querySelector<HTMLElement>('.film-grain');
  if (grain) {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      scrub: 0,
      onUpdate: (self) => {
        const opacity = 0.035 + self.progress * 0.025;
        grain.style.opacity = String(opacity);
      },
    });
  }

  const opts = { desktop: isDesktop, reducedMotion: prefersReducedMotion };

  // Import and initialize all trigger modules
  Promise.all([
    import('./triggers/hero').then((m) => m.initHero(opts)),
    import('./triggers/story').then((m) => m.initStory(opts)),
    import('./triggers/product').then((m) => m.initProduct(opts)),
    import('./triggers/lineup').then((m) => m.initLineup(opts)),
    import('./triggers/cta').then((m) => m.initCta(opts)),
    import('./triggers/scroll-progress').then((m) => m.initScrollProgress()),
  ])
    .then(() => {
      ScrollTrigger.refresh();
    })
    .catch((err) => {
      console.error('[Nox] Animation init failed:', err);
    });
}
