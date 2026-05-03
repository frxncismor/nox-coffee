import { gsap } from 'gsap';

interface Opts {
  desktop: boolean;
}

export function initStory({ desktop }: Opts): void {
  gsap.context(() => {
    if (desktop) {
      // Desktop: pinned word-by-word scrub reveal
      gsap.to('[data-section="story"] [data-word]', {
        scrollTrigger: {
          trigger: '[data-section="story"]',
          start: 'top top',
          end: '+=1500',
          pin: true,
          scrub: 1,
        },
        opacity: 1,
        stagger: { amount: 1 },
      });
    } else {
      // Mobile: simple paragraph fade-in on scroll entry
      gsap.from('[data-section="story"] p:not(.sr-only)', {
        scrollTrigger: {
          trigger: '[data-section="story"]',
          start: 'top 80%',
        },
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  });
}
