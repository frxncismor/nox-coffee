import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
  reducedMotion: boolean;
}

export function initStory({ desktop, reducedMotion }: Opts): void {
  const section = document.querySelector<HTMLElement>('[data-story-section]');
  const blocks = document.querySelectorAll<HTMLElement>('[data-story-block]');

  if (!section || !blocks.length) return;

  if (reducedMotion) {
    blocks.forEach((block) => {
      gsap.from(block, {
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
    return;
  }

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

  // All blocks start hidden below
  gsap.set(blocks, { opacity: 0, y: 32 });

  blocks.forEach((block, i) => {
    const isFirst = i === 0;
    const segmentSize = 1 / blocks.length;
    const start = i * segmentSize;
    const mid = start + segmentSize * 0.3;
    const exit = start + segmentSize * 0.65;

    const accent = block.querySelector<HTMLElement>('[data-story-accent]');

    // Enter: slide up and fade in
    tl.fromTo(
      block,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: segmentSize * 0.3, ease: 'power2.out' },
      start
    );

    // Accent line scaleY 0 → 1 on enter
    if (accent) {
      tl.fromTo(
        accent,
        { scaleY: 0 },
        { scaleY: 1, duration: segmentSize * 0.25, ease: 'power2.out', transformOrigin: 'bottom' },
        start + segmentSize * 0.05
      );
    }

    // Exit previous block completely (opacity 0, y -32)
    if (!isFirst) {
      const prev = blocks[i - 1];
      const prevAccent = prev.querySelector<HTMLElement>('[data-story-accent]');

      tl.to(
        prev,
        { opacity: 0, y: -32, duration: segmentSize * 0.2, ease: 'power1.in' },
        mid - 0.05
      );

      if (prevAccent) {
        tl.to(
          prevAccent,
          { scaleY: 0, duration: segmentSize * 0.15, ease: 'power1.in', transformOrigin: 'bottom' },
          mid - 0.05
        );
      }
    }

    // Exit current block before next one arrives (if not last)
    if (i < blocks.length - 1) {
      const nextAccent = blocks[i + 1]?.querySelector<HTMLElement>('[data-story-accent]');

      tl.to(
        block,
        { opacity: 0, y: -32, duration: segmentSize * 0.2, ease: 'power1.in' },
        exit
      );

      if (accent && !nextAccent) {
        // fallback: also hide accent on exit if next block has no accent
        tl.to(
          accent,
          { scaleY: 0, duration: segmentSize * 0.15, ease: 'power1.in', transformOrigin: 'bottom' },
          exit
        );
      }
    }
  });
}
