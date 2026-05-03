import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
}

export function initStory({ desktop }: Opts): void {
  const section = document.querySelector<HTMLElement>('[data-story-section]');
  const blocks = document.querySelectorAll<HTMLElement>('[data-story-block]');

  if (!section || !blocks.length) return;

  if (!desktop) {
    // Mobile: simple IntersectionObserver fade-in per block
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    blocks.forEach((b) => {
      gsap.set(b, { opacity: 0, y: 24 });
      io.observe(b);
    });
    return;
  }

  // Desktop: pin section, reveal blocks sequentially
  // Each block gets ~80vh of scroll distance
  const totalScrollDistance = blocks.length * window.innerHeight * 0.8;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: `+=${totalScrollDistance}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // All blocks start hidden
  gsap.set(blocks, { opacity: 0, y: 32 });

  blocks.forEach((block, i) => {
    const isFirst = i === 0;
    const segmentSize = 1 / blocks.length;
    const start = i * segmentSize;
    const mid = start + segmentSize * 0.3;

    // Bring current block in
    tl.to(block, { opacity: 1, y: 0, duration: segmentSize * 0.3, ease: 'power2.out' }, start);

    // Dim previous block when current arrives
    if (!isFirst) {
      const prev = blocks[i - 1];
      tl.to(prev, { opacity: 0.25, duration: segmentSize * 0.2, ease: 'power1.in' }, mid - 0.05);
    }
  });
}
