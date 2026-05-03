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

  // Start cards at reduced scale and opacity — containerAnimation handles reveal
  gsap.set(cards, { scale: 0.88, opacity: 0.4 });

  const tl = gsap.timeline({
    scrollTrigger: {
      id: 'lineupScroll',
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

  // Individual card reveal via containerAnimation
  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { scale: 0.88, opacity: 0.4 },
      {
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: ScrollTrigger.getById('lineupScroll'),
          start: 'left center',
          end: 'center center',
          scrub: 1,
        },
      }
    );
  });

  // Section heading scales down as horizontal scroll progresses
  gsap.to('[data-lineup-section] h2, [data-lineup-section] p', {
    scale: 0.7,
    opacity: 0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${track.scrollWidth - window.innerWidth + 80}`,
      scrub: 1,
    },
  });

  // Recalculate after images load — dimensions may change
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
}
