import { gsap } from 'gsap';

interface Opts {
  desktop: boolean;
}

export function initProduct({ desktop }: Opts): void {
  gsap.context(() => {
    if (desktop) {
      const trigger = '[data-section="product"]';

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: '+=3000',
          pin: true,
          scrub: 1,
        },
      });

      // Bag rotation/scale sequence across 3 keyframes
      tl.to('[data-bag]', { rotate: 5, scale: 1.1, ease: 'none' }, 0)
        .to('[data-bag]', { rotate: -5, scale: 0.95, ease: 'none' }, 0.5)
        .to('[data-bag]', { rotate: 0, scale: 1, ease: 'none' }, 1);

      // Panel cross-fades: divide scroll into thirds
      // Origin: visible at start, fades out at 33%
      tl.to('[data-panel="origin"]', { autoAlpha: 0, ease: 'none' }, 0.33);

      // Roast: fades in at 33%, fades out at 66%
      tl.fromTo(
        '[data-panel="roast"]',
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'none' },
        0.25
      );
      tl.to('[data-panel="roast"]', { autoAlpha: 0, ease: 'none' }, 0.66);

      // Ritual: fades in at 66%, stays until end
      tl.fromTo(
        '[data-panel="ritual"]',
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'none' },
        0.58
      );
    } else {
      // Mobile: each panel gets a simple scroll-entry fade
      const panels = document.querySelectorAll<HTMLElement>('[data-panel]');
      panels.forEach((panel) => {
        gsap.from(panel, {
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
          },
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    }
  });
}
