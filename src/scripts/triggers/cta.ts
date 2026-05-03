import { gsap } from 'gsap';

interface Opts {
  desktop: boolean;
}

export function initCta({ desktop: _desktop }: Opts): void {
  gsap.context(() => {
    // CTA animations fire on both desktop and mobile — not pinned
    gsap.from('[data-section="cta"] .cta-headline, [data-section="cta"] .cta-subhead', {
      scrollTrigger: {
        trigger: '[data-section="cta"]',
        start: 'top 75%',
      },
      autoAlpha: 0,
      y: 40,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out',
    });
  });
}
