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
    // Mobile: IO reveal per panel (images and text already visible via CSS)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(e.target, { opacity: 1, y: 0, duration: 0.7 });
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    panels.forEach((p) => {
      gsap.set(p, { opacity: 0, y: 20 });
      io.observe(p);
    });
    return;
  }

  const panelKeys = ['origin', 'roast', 'ritual'] as const;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=300%',
      pin: '[data-showcase-section] > div:first-child',
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  panelKeys.forEach((key, i) => {
    const panel = section.querySelector<HTMLElement>(`[data-panel="${key}"]`);
    const img = section.querySelector<HTMLElement>(`[data-showcase-img="${key}"]`);
    const nextKey = panelKeys[i + 1];
    const nextPanel = nextKey ? section.querySelector<HTMLElement>(`[data-panel="${nextKey}"]`) : null;
    const nextImg = nextKey ? section.querySelector<HTMLElement>(`[data-showcase-img="${nextKey}"]`) : null;

    const seg = 1 / panelKeys.length;
    const s = i * seg;

    // Fade in current panel + image (first pair starts visible, still animate for scrub control)
    if (panel) tl.to(panel, { opacity: 1, duration: seg * 0.25, ease: 'power2.out' }, s + seg * 0.05);
    if (img) tl.to(img, { opacity: 1, duration: seg * 0.25, ease: 'power2.out' }, s + seg * 0.05);

    // Crossfade out current, crossfade in next
    if (panel && nextPanel) {
      tl.to(panel, { opacity: 0, duration: seg * 0.2, ease: 'power1.in' }, s + seg * 0.65);
      tl.to(nextPanel, { opacity: 1, duration: seg * 0.25, ease: 'power2.out' }, s + seg * 0.72);
    }
    if (img && nextImg) {
      tl.to(img, { opacity: 0, duration: seg * 0.2, ease: 'power1.in' }, s + seg * 0.65);
      tl.to(nextImg, { opacity: 1, duration: seg * 0.25, ease: 'power2.out' }, s + seg * 0.72);
    }
  });
}
