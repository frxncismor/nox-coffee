import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
  reducedMotion: boolean;
}

export function initLineup({ desktop, reducedMotion }: Opts): void {
  if (!desktop) return;

  const products = document.querySelectorAll<HTMLElement>('[data-lineup-product]');

  if (reducedMotion) {
    products.forEach((p) => {
      const text = p.querySelector<HTMLElement>('[data-lineup-text]');
      if (text) gsap.set(text, { opacity: 1, x: 0 });
    });
    return;
  }

  products.forEach((product) => {
    const img = product.querySelector<HTMLElement>('[data-lineup-img]');
    const text = product.querySelector<HTMLElement>('[data-lineup-text]');

    if (img) {
      gsap.to(img, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: product,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    if (text) {
      gsap.fromTo(
        text,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: product,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  });
}
