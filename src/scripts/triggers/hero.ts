import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
}

export function initHero({ desktop: _desktop }: Opts): void {
  const chars = document.querySelectorAll<HTMLElement>('[data-hero-char]');
  const tagline = document.querySelector<HTMLElement>('[data-hero-tagline]');
  const scrollCue = document.querySelector<HTMLElement>('[data-scroll-cue]');

  if (!chars.length) return;

  // Brand name: chars appear one by one, from dim to full — like eyes adjusting to dark
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(
    chars,
    { opacity: 0, y: 30, filter: 'blur(8px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.08 }
  );

  if (tagline) {
    tl.fromTo(
      tagline,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.4'
    );
  }

  // Scroll cue: pulses gently, fades on first scroll
  if (scrollCue) {
    gsap.to(scrollCue, {
      y: 6,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'sine.inOut',
    });

    ScrollTrigger.create({
      start: 'top top',
      end: '5% top',
      onEnter: () => gsap.to(scrollCue, { opacity: 0, duration: 0.4 }),
    });
  }

  // Hero image parallax: slower than scroll — creates depth
  const heroImage = document.querySelector<HTMLElement>('[data-hero-image]');
  if (heroImage) {
    gsap.to(heroImage, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '[data-hero-section]',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}
