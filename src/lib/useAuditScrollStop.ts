import { useEffect, type RefObject } from 'react';

// Stop the gesture that crossed the last pinned frame. A new gesture can leave it.
export function useAuditScrollStop(section: RefObject<HTMLElement>, reduced: boolean) {
  useEffect(() => {
    const element = section.current;
    if (!element || reduced) return;
    let input: 'wheel' | 'touch' | 'key' | undefined;
    let holding = false;
    let previous = window.scrollY;
    let lastWheel = 0;
    let touchY = 0;

    function reset() {
      holding = false;
      input = undefined;
    }

    function begin(kind: typeof input) {
      input = kind;
      previous = window.scrollY;
      holding = false;
    }

    const onScroll = () => {
      if (!input) return;
      const y = window.scrollY;
      const end = Math.round(element.getBoundingClientRect().bottom + y - window.innerHeight);
      if (y < end - 1 && holding) reset();
      if (y >= end && (holding || previous < end)) {
        holding = true;
        if (y !== end || window.__lenis?.isScrolling === 'smooth') {
          window.__lenis?.scrollTo(end, { immediate: true });
          // A native key scroll or touch fling may still move after Lenis settled.
          if (window.scrollY !== end) window.scrollTo({ top: end, behavior: 'instant' });
        }
      }
      previous = window.scrollY;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.deltaY <= 0 || Math.abs(event.deltaX) > event.deltaY) {
        reset();
        return;
      }
      const now = performance.now();
      // WheelEvent has no gesture-end event. A quiet interval separates trackpad bursts.
      if (input !== 'wheel' || now - lastWheel > 160) begin('wheel');
      lastWheel = now;
      if (holding && event.cancelable) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return reset();
      touchY = event.touches[0].clientY;
      begin('touch');
    };
    const onTouchMove = (event: TouchEvent) => {
      if (input !== 'touch' || event.touches.length !== 1) return;
      const y = event.touches[0].clientY;
      if (y > touchY) holding = false;
      if (holding && event.cancelable) event.preventDefault();
      touchY = y;
    };
    const onKey = (event: KeyboardEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!['PageDown', 'ArrowDown', ' '].includes(event.key) || event.shiftKey ||
          target?.closest('input, textarea, select, dialog, [contenteditable]') ||
          (event.key === ' ' && target?.closest('button'))) {
        reset();
        return;
      }
      if (!event.repeat || input !== 'key') begin('key');
      const remaining = element.getBoundingClientRect().bottom - window.innerHeight;
      const step = event.key === 'ArrowDown' ? 40 : window.innerHeight * 0.875;
      if (remaining > 1 && remaining <= step) {
        event.preventDefault();
        holding = true;
        const end = Math.round(window.scrollY + remaining);
        window.scrollTo({ top: end, behavior: 'instant' });
      } else if (holding) event.preventDefault();
    };

    const listeners = new AbortController();
    const { signal } = listeners;
    window.addEventListener('wheel', onWheel, { capture: true, passive: false, signal });
    window.addEventListener('touchstart', onTouchStart, { passive: true, signal });
    window.addEventListener('touchmove', onTouchMove, { passive: false, signal });
    window.addEventListener('keydown', onKey, { signal });
    window.addEventListener('pointerdown', reset, { capture: true, signal });
    window.addEventListener('click', reset, { capture: true, signal });
    window.addEventListener('hashchange', reset, { signal });
    window.addEventListener('scroll', onScroll, { passive: true, signal });
    return () => listeners.abort();
  }, [section, reduced]);
}
