import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initScrollProgress(): void {
  const bar = document.querySelector<HTMLElement>('#scroll-progress');
  if (!bar) return;

  // Easter Egg 1: bar turns gold after 11pm (noche NOX hours)
  function updateBarColor(): void {
    const hour = new Date().getHours();
    const isNightTime = hour >= 23 || hour < 7; // 11pm – 7am
    bar!.style.background = isNightTime ? 'var(--nox-accent)' : 'rgba(245, 230, 211, 0.4)';
  }

  updateBarColor();
  // Check every minute
  setInterval(updateBarColor, 60_000);

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    scrub: 0,
    onUpdate: (self) => {
      bar.style.transform = `scaleX(${self.progress})`;
    },
  });

  const clock = document.querySelector<HTMLTimeElement>('#nox-clock');
  if (clock) {
    function updateClock(): void {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      clock!.textContent = `${h}:${m}`;
      const isNight = now.getHours() >= 23 || now.getHours() < 7;
      clock!.style.color = isNight ? 'var(--nox-accent)' : 'var(--nox-fg)';
      clock!.style.opacity = isNight ? '0.7' : '0.3';
    }
    updateClock();
    setInterval(updateClock, 1000);
  }
}
