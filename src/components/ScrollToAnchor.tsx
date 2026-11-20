import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToElement } from '../lib/lenis';

export const ScrollToAnchor: React.FC = () => {
  const location = useLocation();
  const lastPathname = useRef(location.pathname);

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) scrollToElement(target);
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
