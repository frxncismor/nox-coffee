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
      const priceEl = p.querySelector<HTMLElement>('[data-lineup-price]');
      if (text) gsap.set(text, { opacity: 1, x: 0 });
      if (priceEl) gsap.set(priceEl, { opacity: 1, y: 0 });
    });
    return;
  }

  products.forEach((product) => {
    const img = product.querySelector<HTMLElement>('[data-lineup-img]');
    const text = product.querySelector<HTMLElement>('[data-lineup-text]');
    const priceEl = product.querySelector<HTMLElement>('[data-lineup-price]');

    // Image parallax (unchanged)
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

    // Text reveal (scrubbed, reversible) as product scrolls into view
    if (text) {
      const textEls = Array.from(text.children) as HTMLElement[];
      gsap.fromTo(
        textEls,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: product,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );
    }

    // Price reveal: pin product + scrub price in
    if (priceEl) {
      gsap.set(priceEl, { opacity: 0, y: 12 });

      const priceTl = gsap.timeline();
      priceTl.to(priceEl, { opacity: 1, y: 0, ease: 'power2.out' });

      ScrollTrigger.create({
        trigger: product,
        start: 'top top',
        end: '+=180',
        pin: true,
        scrub: 1,
        animation: priceTl,
      });
    }
  });
}
