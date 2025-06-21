/**
 * @file ScrollToTop.tsx
 * @description This utility component ensures that the window scrolls to the top (0,0)
 * whenever a route change occurs. This is a common requirement for single-page applications
 * to mimic traditional page load behavior.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to the top (0,0) whenever the route (pathname) changes.
 * This component does not render any DOM elements itself. It should be placed
 * within the Router context, ideally as part of a layout component that wraps
 * all routed pages.
 *
 * @returns {null} This component renders nothing.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (error) {
      // This catch block is useful for environments where `window` or `scrollTo` might not be fully available,
      // such as during certain types of server-side rendering or specific testing setups.
      console.error("ScrollToTop failed:", error);
    }
  }, [pathname]); // Effect runs only when the pathname changes

  return null; // This component does not render any UI
};

export default ScrollToTop;
