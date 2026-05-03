import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
  reducedMotion: boolean;
}

export function initProduct({ desktop, reducedMotion }: Opts): void {
  const section = document.querySelector<HTMLElement>('[data-showcase-section]');
  const bag = document.querySelector<HTMLElement>('[data-showcase-bag]');
  const panels = document.querySelectorAll<HTMLElement>('[data-panel]');

  if (!section || !bag || !panels.length) return;

  if (reducedMotion) {
    gsap.set(bag, { scale: 1 });
    panels.forEach((panel) => {
      gsap.from(panel, {
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: panel,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
    return;
  }

  if (!desktop) {
    // Mobile: stack panels, simple reveal
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

  // Add perspective to parent for true 3D rotateY
  gsap.set('[data-showcase-section]', { perspective: 1200 });

  // Set initial states — use rotateY instead of rotation
  gsap.set(panels, { opacity: 0, x: -30 });
  gsap.set(bag, { scale: 0.85, rotateY: -8 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  const panelKeys = ['origin', 'roast', 'ritual'] as const;

  // 3D rotateY positions — subtle, not full 360
  const rotations = [-8, 0, 25];
  const scales = [0.85, 1.0, 1.1];

  panelKeys.forEach((key, i) => {
    const panel = section.querySelector<HTMLElement>(`[data-panel="${key}"]`);
    const nextKey = panelKeys[i + 1];
    const nextPanel = nextKey
      ? section.querySelector<HTMLElement>(`[data-panel="${nextKey}"]`)
      : null;
    const seg = 1 / panelKeys.length;
    const s = i * seg;

    // Bag: true 3D rotateY across timeline positions
    tl.to(
      bag,
      { rotateY: rotations[i], scale: scales[i], duration: seg * 0.8, ease: 'power1.inOut' },
      s
    );

    // Panel in
    if (panel) tl.to(panel, { opacity: 1, x: 0, duration: seg * 0.25, ease: 'power2.out' }, s + seg * 0.05);

    // Panel out (before next panel arrives)
    if (panel && nextPanel) {
      tl.to(panel, { opacity: 0, x: 30, duration: seg * 0.2, ease: 'power1.in' }, s + seg * 0.65);
    }
  });
}
