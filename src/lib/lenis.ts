import { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export const scrollToElement = (target: string | HTMLElement, offset = -70) => {
  const element = typeof target === 'string'
    ? document.getElementById(target.replace(/^#/, ''))
    : target;

  if (!element) return false;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(element, { offset, duration: 1.2 });
  } else {
    const y = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }
  return true;
};

export const useLenis = () => {
  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.__lenis = lenis;

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
};

