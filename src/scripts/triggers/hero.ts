import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
}

export function initHero({ desktop }: Opts): void {
  gsap.context(() => {
    // Char-by-char reveal — fires on load, not on scroll
    gsap.from('[data-char]', {
      autoAlpha: 0,
      y: 60,
      stagger: 0.05,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.3,
    });

    // Tagline fades in after chars complete
    gsap.from('.hero-tagline', {
      autoAlpha: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      delay: 1.3,
    });

    // Scroll indicator fades when user scrolls 10% into hero
    ScrollTrigger.create({
      trigger: '[data-section="hero"]',
      start: 'top top',
      end: '10% top',
      onLeave: () => {
        gsap.to('.scroll-indicator', { autoAlpha: 0, duration: 0.3 });
      },
    });

    // Parallax on hero image — desktop only
    if (desktop) {
      gsap.to('[data-parallax]', {
        scrollTrigger: {
          trigger: '[data-section="hero"]',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: '30%',
        ease: 'none',
      });
    }
  });
}
