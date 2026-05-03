import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
  reducedMotion: boolean;
}

export function initCta({ desktop: _desktop, reducedMotion }: Opts): void {
  if (reducedMotion) {
    gsap.from('[data-section="cta"] .cta-headline, [data-section="cta"] .cta-subhead', {
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '[data-section="cta"]',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    return;
  }

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
