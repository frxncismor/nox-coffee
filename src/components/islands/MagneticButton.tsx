import { useEffect, useRef, useState } from 'react';

interface Props {
  label: string;
  href: string;
}

export default function MagneticButton({ label, href }: Props) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true);
      return;
    }

    const btn = btnRef.current;
    if (!btn) return;

    const RADIUS = 100;
    const MAX_OFFSET = 20;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < RADIUS) {
        const pull = Math.min(MAX_OFFSET, (RADIUS - dist) * 0.25);
        const nx = (dx / dist) * pull;
        const ny = (dy / dist) * pull;
        btn.style.transform = `translate(${nx}px, ${ny}px)`;
      } else {
        btn.style.transform = '';
      }
    };

    const onLeave = () => {
      if (btn) btn.style.transform = '';
    };

    window.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      btn?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const baseClass =
    'inline-block border border-nox-accent text-nox-fg px-10 py-4 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-nox-accent hover:text-nox-bg';

  if (isTouch) {
    return (
      <a href={href} className={baseClass}>
        {label}
      </a>
    );
  }

  return (
    <a
      ref={btnRef}
      href={href}
      className={baseClass}
      style={{ transition: 'transform 75ms ease-out, background-color 0.3s, color 0.3s' }}
    >
      {label}
    </a>
  );
}
