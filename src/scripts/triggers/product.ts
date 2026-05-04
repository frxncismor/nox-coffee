import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
  reducedMotion: boolean;
}

export function initProduct({ desktop, reducedMotion }: Opts): void {
  const section = document.querySelector<HTMLElement>('[data-showcase-section]');
  const panels = document.querySelectorAll<HTMLElement>('[data-panel]');
  const imgs = document.querySelectorAll<HTMLElement>('[data-showcase-img]');

  if (!section || !panels.length || !imgs.length) return;

  if (reducedMotion) {
    // Show all panels and images, no pin, no animation
    panels.forEach((p) => gsap.set(p, { opacity: 1 }));
    imgs.forEach((img) => gsap.set(img, { opacity: 1 }));
    return;
  }

  if (!desktop) {
    const mobilePanels = document.querySelectorAll<HTMLElement>('[data-showcase-mobile-panel]');
    mobilePanels.forEach((panel) => {
      gsap.fromTo(
        panel,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return;
  }

  const panelKeys = ['origin', 'roast', 'ritual'] as const;

  // Set initial states before creating the timeline.
  // gsap.set() runs synchronously — when the timeline tweens (.to) are created
  // right after, they capture these values as their "from" state on first play.
  panelKeys.forEach((key, i) => {
    const panel = section.querySelector<HTMLElement>(`[data-panel="${key}"]`);
    const img = section.querySelector<HTMLElement>(`[data-showcase-img="${key}"]`);
    if (panel) gsap.set(panel, { opacity: i === 0 ? 1 : 0 });
    if (img) gsap.set(img, { opacity: i === 0 ? 1 : 0 });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=300%',
      scrub: 1.2,
      invalidateOnRefresh: true,
    },
  });

  const seg = 1 / panelKeys.length;

  panelKeys.forEach((key, i) => {
    const panel = section.querySelector<HTMLElement>(`[data-panel="${key}"]`);
    const img = section.querySelector<HTMLElement>(`[data-showcase-img="${key}"]`);
    const nextKey = panelKeys[i + 1];
    const nextPanel = nextKey ? section.querySelector<HTMLElement>(`[data-panel="${nextKey}"]`) : null;
    const nextImg = nextKey ? section.querySelector<HTMLElement>(`[data-showcase-img="${nextKey}"]`) : null;

    const s = i * seg;

    // .to() in a timeline has immediateRender:false — it captures the "from" state
    // when the playhead first reaches it, not at construction. This avoids the
    // fromTo conflict where two tweens on the same element set contradictory
    // immediate "from" values at build time.
    if (nextPanel) {
      if (panel) tl.to(panel, { opacity: 0, duration: seg * 0.2, ease: 'power1.in' }, s + seg * 0.65);
      tl.to(nextPanel, { opacity: 1, duration: seg * 0.25, ease: 'power2.out' }, s + seg * 0.72);
    }
    if (nextImg) {
      if (img) tl.to(img, { opacity: 0, duration: seg * 0.2, ease: 'power1.in' }, s + seg * 0.65);
      tl.to(nextImg, { opacity: 1, duration: seg * 0.25, ease: 'power2.out' }, s + seg * 0.72);
    }

    // Last panel fades out before lineup enters
    if (i === panelKeys.length - 1) {
      if (panel) tl.to(panel, { opacity: 0, duration: seg * 0.2, ease: 'power1.in' }, 1 - seg * 0.2);
      if (img) tl.to(img, { opacity: 0, duration: seg * 0.2, ease: 'power1.in' }, 1 - seg * 0.2);
    }
  });
}
