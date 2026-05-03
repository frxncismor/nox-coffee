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

    const priceEl = product.querySelector<HTMLElement>('[data-lineup-price]');
    if (priceEl) {
      gsap.fromTo(
        priceEl,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: product,
            start: 'top top+=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  });

  const sectionEl = document.querySelector<HTMLElement>('[data-lineup-section]');
  if (sectionEl && products.length) {
    ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top top',
      end: 'bottom bottom',
      snap: {
        snapTo: (progress: number) => Math.round(progress * products.length) / products.length,
        duration: { min: 0.3, max: 0.6 },
        delay: 0.05,
        ease: 'power2.inOut',
      },
    });
  }
}
