import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initScrollProgress(): void {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  ScrollTrigger.create({
    start: 'top top',
    end: 'max',
    onUpdate: (self) => {
      gsap.set(progressBar, { scaleX: self.progress });
    },
  });
}
