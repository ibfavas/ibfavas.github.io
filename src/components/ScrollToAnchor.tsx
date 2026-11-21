import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToElement } from '../lib/lenis';

export const ScrollToAnchor: React.FC = () => {
  const location = useLocation();
  const lastPathname = useRef(location.pathname);

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      // Article headings use native fragment navigation and their own sticky inset.
      if (target && !target.matches('.markdown-body h2')) scrollToElement(target);
    } else {
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
