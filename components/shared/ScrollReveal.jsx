"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fades + slides its children up into place as they scroll into view,
 * using GSAP's ScrollTrigger (npm package, not the CDN build). Wrap any
 * section or group of items in this instead of hand-rolling
 * IntersectionObserver logic.
 *
 * - `stagger`: set a number (e.g. 0.12) when wrapping multiple direct
 *   children (like a grid of cards) to animate them in one after another
 *   instead of all at once. Leave it at 0 for a single element.
 * - Respects prefers-reduced-motion — skips the animation and shows
 *   content immediately for anyone with that setting on.
 */
export default function ScrollReveal({
  children,
  as: Tag = "div",
  className = "",
  y = 32,
  duration = 0.8,
  stagger = 0,
  start = "top 85%",
  once = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(node.children.length && stagger ? node.children : node, { opacity: 1, y: 0 });
      return;
    }

    const targets = stagger ? node.children : node;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start,
            once,
          },
        }
      );
    }, node);

    return () => ctx.revert();
  }, [y, duration, stagger, start, once]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
