import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToElement } from '../lib/lenis';

export const ScrollToAnchor: React.FC = () => {
  const location = useLocation();
  const lastPathname = useRef(location.pathname);

  useEffect(() => {
    // If there is a hash in the URL (e.g. /#sprint or /#disciplines)
    if (location.hash) {
      const targetId = location.hash.replace(/^#/, '');

      let attempts = 0;
      const maxAttempts = 25;

      const attemptScroll = () => {
        const el = document.getElementById(targetId);
        if (el) {
          // Allow DOM and layout measurements to stabilize
          setTimeout(() => {
            scrollToElement(el, -70);
          }, 80);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(attemptScroll, 80);
        }
      };

      attemptScroll();
    } else {
      // If navigating to a page without a hash, scroll to top
      if (lastPathname.current !== location.pathname) {
        window.scrollTo(0, 0);
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true });
        }
      }
    }

    lastPathname.current = location.pathname;
  }, [location.pathname, location.hash]);

  return null;
};
