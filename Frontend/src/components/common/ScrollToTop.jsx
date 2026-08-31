import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Ensures the viewport resets to (0,0) on route change for optimal UX.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // instant avoids jarring animations when switching pages
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
