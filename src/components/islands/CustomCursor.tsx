import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const isTouchRef = useRef(false);

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    dot.style.display = 'block';

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button')) {
        dot.classList.add('is-hovering');
      } else {
        dot.classList.remove('is-hovering');
      }
    };

    const onTouchStart = () => {
      isTouchRef.current = true;
      dot.style.display = 'none';
    };

    const animate = () => {
      const pos = posRef.current;
      const tgt = targetRef.current;

      // Lerp current position toward target by 12% per frame
      pos.x += (tgt.x - pos.x) * 0.12;
      pos.y += (tgt.y - pos.y) * 0.12;

      if (dot) {
        dot.style.transform = `translate(${pos.x - 6}px, ${pos.y - 6}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    window.addEventListener('touchstart', onTouchStart, { once: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      window.removeEventListener('touchstart', onTouchStart);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="custom-cursor"
      style={{ display: 'none' }}
      aria-hidden="true"
    />
  );
}
