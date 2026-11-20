import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export const scrollToElement = (target: string | HTMLElement) => {
  const element = typeof target === 'string'
    ? document.getElementById(target.replace(/^#/, ''))
    : target;

  if (!element) return false;

  const offset = -(document.querySelector('header')?.getBoundingClientRect().height ?? 0);
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(element.getBoundingClientRect().top + window.scrollY + offset, { duration: 1.2 });
  } else {
    const y = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: Math.max(0, y), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return true;
};

export const useLenis = () => {
  const reduced = useReducedMotion();
  useEffect(() => {
    // Respect reduced motion
    if (reduced) {
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
  }, [reduced]);
};

