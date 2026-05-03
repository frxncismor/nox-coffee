import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
}

export function initCta({ desktop: _desktop }: Opts): void {
  gsap.context(() => {
    gsap.fromTo(
      '[data-section="cta"] .cta-headline',
      { scale: 1.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-section="cta"]',
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      '[data-section="cta"] .cta-subhead',
      { scale: 1.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-section="cta"]',
          start: 'top 70%',
          end: 'top 15%',
          scrub: 1,
        },
      }
    );
  });
}
