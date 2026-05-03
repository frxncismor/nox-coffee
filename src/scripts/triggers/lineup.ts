import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
}

export function initLineup({ desktop }: Opts): void {
  // Mobile: no-op — CSS handles native horizontal scroll
  if (!desktop) return;

  gsap.context(() => {
    const track = document.querySelector<HTMLElement>('[data-lineup-track]');
    if (!track) return;

    const calculateScroll = () => track.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="lineup"]',
        start: 'top top',
        end: () => `+=${calculateScroll()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to('[data-lineup-track]', {
      x: () => -calculateScroll(),
      ease: 'none',
    });

    // Recalculate after images load — dimensions may change
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
  });
}
