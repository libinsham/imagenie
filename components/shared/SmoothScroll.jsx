"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext({ scrollToTop: () => window.scrollTo({ top: 0, behavior: "smooth" }) });

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Wraps the app in Lenis smooth scrolling and exposes a scrollToTop() helper
 * via context. Respects prefers-reduced-motion.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const [scrollToTop, setScrollToTop] = useState(() => () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    setScrollToTop(() => () => lenis.scrollTo(0, { duration: 1.2 }));

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ scrollToTop }}>
      {children}
    </LenisContext.Provider>
  );
}
