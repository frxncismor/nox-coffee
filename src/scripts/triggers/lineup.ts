import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
}

export function initLineup({ desktop }: Opts): void {
  // Mobile: no-op — CSS handles native horizontal scroll
  if (!desktop) return;

  const section = document.querySelector<HTMLElement>('[data-lineup-section]');
  const track = document.querySelector<HTMLElement>('[data-lineup-track]');

  if (!section || !track) return;

  const cards = track.querySelectorAll<HTMLElement>('[data-product-card]');

  // Start cards slightly off-screen to the right
  gsap.set(cards, { x: 60, opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${track.scrollWidth - window.innerWidth + 80}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Translate the entire track
  tl.to(track, { x: -(track.scrollWidth - window.innerWidth + 80), ease: 'none', duration: 1 });

  // Each card fades in as it enters the viewport during horizontal scroll
  cards.forEach((card, i) => {
    const progress = i / cards.length;
    tl.to(card, { x: 0, opacity: 1, duration: 0.15, ease: 'power2.out' }, progress * 0.6);
  });

  // Recalculate after images load — dimensions may change
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
}
