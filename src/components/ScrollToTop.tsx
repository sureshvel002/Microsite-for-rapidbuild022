import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router keeps the window's scroll offset across route changes, so
 * choosing a company from halfway down the chooser used to open the next page
 * already scrolled down. Every navigation starts at the top instead.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
