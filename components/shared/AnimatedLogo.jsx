"use client";


import { useEffect, useState, useRef, useLayoutEffect } from "react";

import gsap from "gsap";

/**
 * The "IMAGENIE" wordmark, rendered from the real brand SVG (not a static
 * <img>) so GSAP can animate each letter individually.
 *
 * Structure (matches the source .svg files exactly):
 *   - 7 "ink" letters: I M A _ E N I E (no separate "G" — the G is the
 *     orange swash below, doing double duty as both letterform and accent)
 *   - 1 orange "G" swash
 *   - 16 "ink" tagline letters spelling "DESIGNING DESIRES"
 *   - 1 small orange underline rect beneath the tagline
 *
 * variant="ink"   -> letters use var(--color-ink), which already flips
 *                    light/dark automatically via ThemeProvider (use this
 *                    in the Header/Footer, which sit on the normal page background)
 * variant="white" -> letters are hardcoded white (use this on the mobile
 *                    menu overlay, which is always a dark background
 *                    regardless of the site's light/dark toggle)
 *
 * Orange stays the exact brand orange (#f58020) in both variants — that
 * never changes, matching the two source files you supplied.
 */
export default function AnimatedLogo({
  variant = "ink",
  className = "h-8 w-auto",
  animate = true,
  showTagline = true,
}) {
  const svgRef = useRef(null);
  const letterRefs = useRef([]);
  const gRef = useRef(null);
  const taglineRefs = useRef([]);
  const idleTl = useRef(null);
  const hoverTl = useRef(null);

  useEffect(() => {
    if (!animate) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const letters = letterRefs.current.filter(Boolean);
    const tagline = taglineRefs.current.filter(Boolean);
    const allGlyphs = [...letters, gRef.current].filter(Boolean);

    if (prefersReduced) {
      gsap.set([...allGlyphs, ...tagline], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Entrance: letters + G settle into place with a slight overshoot,
      // tagline follows a beat later.
      const entrance = gsap.timeline();
      entrance
        .fromTo(
          allGlyphs,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.045, ease: "back.out(1.7)" }
        )
        .fromTo(
          tagline,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.015, ease: "power2.out" },
          "-=0.25"
        );

      // Idle: continuous squash-and-stretch bounce, one letter at a time,
      // left to right — classic animation-principle bounce (stretch on the
      // way up, squash on landing) rather than a plain up/down shake.
      // transformOrigin "center bottom" makes each letter squash against
      // an implied ground line instead of its own middle.
      gsap.set([...letters, gRef.current], { transformOrigin: "50% 100%" });

      idleTl.current = gsap.timeline({ repeat: -1, delay: 0.8 });
      idleTl.current
        .to(letters, {
          keyframes: [
            { y: -10, scaleX: 0.9, scaleY: 1.15, duration: 0.22, ease: "power2.out" }, // stretch up
            { y: 0, scaleX: 1.18, scaleY: 0.85, duration: 0.16, ease: "power1.in" },    // squash landing
            { y: 0, scaleX: 1, scaleY: 1, duration: 0.22, ease: "elastic.out(1, 0.5)" }, // settle
          ],
          stagger: 0.09,
        }, 0)
        .to(gRef.current, {
          scale: 1.15,
          filter: "drop-shadow(0 0 6px rgba(245,128,32,0.65))",
          duration: 1.1,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        }, 0);

      // Hover: ALL glyphs (letters + G + tagline) do a bigger squash-stretch
      // jump in a left-to-right wave, and the G's glow intensifies. Idle
      // pauses while hovering so the two don't fight, and resumes on
      // mouse-leave.
      const node = svgRef.current;
      const handleEnter = () => {
        idleTl.current?.pause();
        hoverTl.current?.kill();

        gsap.set([...letters, ...tagline, gRef.current], { transformOrigin: "50% 100%" });

        hoverTl.current = gsap.timeline({ repeat: -1 });
        hoverTl.current
          .to([...letters, ...tagline], {
            keyframes: [
              { y: -16, scaleX: 0.88, scaleY: 1.22, duration: 0.2, ease: "power2.out" },
              { y: 0, scaleX: 1.2, scaleY: 0.82, duration: 0.15, ease: "power1.in" },
              { y: 0, scaleX: 1, scaleY: 1, duration: 0.25, ease: "elastic.out(1, 0.45)" },
            ],
            stagger: 0.035,
          }, 0)
          .to(gRef.current, {
            scale: 1.1,
            rotation: 360,
            transformOrigin: "center",
            filter: "drop-shadow(0 0 12px rgba(245,128,32,0.9))",
            duration: 0.6,
            ease: "power2.inOut",
          }, 0);
      };
      const handleLeave = () => {
        hoverTl.current?.kill();
        gsap.to([...letters, ...tagline, gRef.current], {
          y: 0,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          scale: 1,
          filter: "none",
          duration: 0.35,
          ease: "power2.out",
          onComplete: () => idleTl.current?.resume(),
        });
      };

      node?.addEventListener("mouseenter", handleEnter);
      node?.addEventListener("mouseleave", handleLeave);

      return () => {
        node?.removeEventListener("mouseenter", handleEnter);
        node?.removeEventListener("mouseleave", handleLeave);
      };
    }, svgRef);

    return () => ctx.revert();
  }, [animate]);

  const inkFill = variant === "white" ? "#FFFFFF" : "var(--color-ink)";

  return (
    <svg
      ref={svgRef}
      viewBox={showTagline ? "0 0 570 110.1" : "0 0 570 80"}
      className={className}
      style={{ overflow: "visible" }}
      role="img"
      aria-label="Imagenie — Designing Desires"
    >
      <g style={{ fill: inkFill }}>
          <path ref={(el) => (letterRefs.current[0] = el)} className="logo-letter" d="M440.45,75.3l.02-1.08h1.44c4.02,0,7.26-2.61,7.34-5.85V17.41c-.08-3.24-3.33-5.86-7.35-5.86h-1.44l-.02-1.08h24.47v1.08h-1.46c-3.93,0-7.14,2.51-7.33,5.67v51.23c.13,3.2,3.36,5.76,7.33,5.76h1.44l.02,1.08h-24.48,0Z" />
          <path ref={(el) => (letterRefs.current[1] = el)} className="logo-letter" d="M18.81,75.3l.02-1.08h1.44c4.02,0,7.26-2.61,7.34-5.85V17.41c-.08-3.24-3.33-5.86-7.35-5.86h-1.44l-.02-1.08h24.47v1.08h-1.46c-3.93,0-7.14,2.51-7.33,5.67v51.23c.13,3.2,3.36,5.76,7.34,5.76h1.44l.02,1.08h-24.49Z" />
          <path ref={(el) => (letterRefs.current[2] = el)} className="logo-letter" d="M131,68.29c.61,3.74,3.8,5.92,7.37,5.92h1.62v1.08h-22.44v-1.02h1.58c2.19,0,4.25-1.85,3.96-4.18l-5.68-44.46-20.35,40.15s-3.1,6.56-3.84,11.03h-1.06l-26.02-50.19-4.85,43.48c-.25,2.24,1.77,4.18,3.96,4.18h1.58v1.02h-20.04v-1.08h1.62c3.63,0,6.88-2.26,7.4-6.12l8.35-59.13h1.06l28.52,54.87,27.57-54.83h1.02s8.66,59.29,8.66,59.29Z" />
          <path ref={(el) => (letterRefs.current[3] = el)} className="logo-letter" d="M159.49,67.44l7.85-18.11-5.75-.36-8.79,19c-2.22,4.4-5.6,6.24-8.47,6.24h-.86v1.08h20.58v-1.06h-.86c-2.53,0-5.36-2.46-3.71-6.78h0ZM215.37,74.21c-2.89,0-6.14-1.85-8.34-6.3l-26.67-58.95h-1.02c-.23,2.81-4.16,11.06-4.16,11.13l-9.86,20.34,5.4.2,8.59-20.07,10.89,26.54,1.24,3.03,1.33,3.24h0l5.9,14.37c1.41,4.14-1.35,6.48-3.82,6.48h-.86v1.07h22.19v-1.08h-.82Z" />
          <path ref={(el) => (letterRefs.current[4] = el)} className="logo-letter" d="M338.95,75.3h-43.89l.02-1.08h1.48c3.49,0,6.1-2.55,6.24-5.74V17.21c0-3.22-2.73-5.66-6.24-5.66h-1.48l-.02-1.08h31.56c4.34-.03,10.19-.96,12.07-1.7v12.23h-1.17v-1.68c0-3.03-2.13-5.49-5.41-5.55h-22.4v27.48h18.45c3-.06,4.38-2.09,4.38-4.59v-1.37h1.17s0,15.16,0,15.16h-1.17v-1.39c0-2.42-1.3-4.41-4.13-4.58h-18.71v27.48h16.89c10.38-.14,14.08-5.2,17.15-12.2h1.17l-5.95,15.5h-.01Z" />
          <path ref={(el) => (letterRefs.current[5] = el)} className="logo-letter" d="M431.95,10.47v1.08h-1.81c-3.2,0-5.82,2.39-6.01,5.41v46.07c0,6.96,1.02,13.78,1.02,13.78h-1.03l-56.19-53.31v45.07c.06,3.13,2.73,5.65,6.01,5.65h1.8v1.08s-20.41,0-20.41,0v-1.08h1.81c3.29,0,5.95-2.52,6.01-5.65V22.36c0-7.37-1.04-13.5-1.04-13.5l1.16.05,56.06,52.84V16.95c-.19-3.01-2.81-5.4-6.01-5.4h-1.8v-1.08s20.39,0,20.39,0h.01Z" />
          <path ref={(el) => (letterRefs.current[6] = el)} className="logo-letter" d="M517.31,75.3h-43.89l.02-1.08h1.48c3.49,0,6.1-2.55,6.24-5.74V17.21c0-3.22-2.73-5.66-6.24-5.66h-1.48l-.02-1.08h31.56c4.34-.03,10.19-.96,12.07-1.7v12.23h-1.17v-1.68c0-3.03-2.13-5.49-5.41-5.55h-22.4v27.48h18.45c3-.06,4.38-2.09,4.38-4.59v-1.37h1.17s0,15.16,0,15.16h-1.17v-1.39c0-2.42-1.3-4.41-4.13-4.58h-18.71v27.48h16.89c10.38-.14,14.08-5.2,17.15-12.2h1.17l-5.95,15.5h-.01Z" />
      </g>

      {/* Registered trademark mark — deliberately NOT in letterRefs, so it
          stays static (doesn't bounce/rotate) while everything else
          animates, matching how ® marks behave in real brand usage. */}
      <text
        x="528"
        y="18"
        fontSize="13"
        fontFamily="Arial, sans-serif"
        style={{ fill: inkFill }}
      >
        ®
      </text>
      <path ref={gRef} d="M295.38,42.54v1.08h-1.47c-3.16,0-4.94,1.52-4.92,4.28,0,2.49-.14,5.03,0,7.5.5,8.39-6.3,13.39-13,17.04-5.05,2.76-10.76,4.18-16.51,4.18s-11.37-1.31-17-4.03c-9.66-4.67-18.61-10.56-27.27-16.27-5.11-3.37-10.4-6.86-15.8-10.07-9.24-5.5-21.64-4.57-31.74,2.17l-5.78-.26c17.71-11.76,27.16-12.5,40.34-6.67,5.86,2.59,10.85,6.79,16.01,10.2,2.66,1.75,5.25,3.45,7.86,5.13-2.17-4.58-3.33-9.91-3.33-15.92,0-21.03,14.11-33.92,35.41-33.92,9.95,0,17.93,2.09,25.22,6.54l2.37,15.26h-.94c-3.14-12.62-11.64-18.56-26.75-18.56-16.5,0-27.5,11.66-27.5,30.69,0,10.53,3.42,18.84,9.32,24.15,1.64.88,3.28,1.73,4.98,2.55,12.25,5.92,26.57,3.91,36.09-5.99,2.44-2.55,2.06-7.79,1.68-11.03-.38-3.22-1.71-6.96-5.54-6.96h-1.54v-1.08h19.81Z" fill="#F58020" />
      {showTagline && (
        <>
          <g style={{ fill: inkFill }}>
            <path ref={(el) => (taglineRefs.current[0] = el)} className="logo-tagline-letter" d="M296.84,101.35v-14.09h3.94c1.15,0,2.19.26,3.11.79.92.53,1.63,1.28,2.15,2.26.52.98.77,2.09.77,3.35v1.3c0,1.26-.25,2.38-.77,3.35-.51.97-1.23,1.73-2.15,2.26-.93.53-1.99.79-3.19.79h-3.85,0ZM298.03,88.26v12.08h2.67c1.48,0,2.67-.49,3.57-1.48s1.35-2.32,1.35-4v-1.24c0-1.62-.44-2.92-1.33-3.89-.88-.97-2.05-1.46-3.49-1.48h-2.77Z" />
            <path ref={(el) => (taglineRefs.current[1] = el)} className="logo-tagline-letter" d="M320.38,94.59h-6.59v5.75h7.58v1.01h-8.77v-14.09h8.72v1.01h-7.53v5.32h6.59v1.01h0Z" />
            <path ref={(el) => (taglineRefs.current[2] = el)} className="logo-tagline-letter" d="M334.62,97.88c0-.78-.28-1.4-.83-1.85-.55-.46-1.55-.89-3.01-1.3-1.46-.41-2.52-.86-3.2-1.34-.95-.68-1.43-1.58-1.43-2.69s.44-1.95,1.33-2.63c.89-.67,2.02-1.01,3.4-1.01.93,0,1.77.18,2.51.54s1.31.86,1.72,1.51c.41.64.61,1.37.61,2.16h-1.2c0-.96-.33-1.74-.99-2.33s-1.54-.88-2.66-.88-1.93.24-2.58.72c-.64.48-.96,1.11-.96,1.89,0,.72.28,1.3.86,1.75.57.45,1.5.85,2.76,1.2,1.26.34,2.22.7,2.87,1.08.65.37,1.14.81,1.47,1.33.33.52.5,1.13.5,1.83,0,1.11-.44,2-1.33,2.67-.89.67-2.06,1.01-3.51,1.01-.99,0-1.91-.18-2.73-.53-.83-.35-1.46-.85-1.89-1.49-.43-.64-.64-1.37-.64-2.2h1.19c0,.99.37,1.78,1.12,2.35.74.57,1.73.86,2.96.86,1.1,0,1.98-.24,2.64-.73.66-.48,1-1.13,1-1.93h0Z" />
            <path ref={(el) => (taglineRefs.current[3] = el)} className="logo-tagline-letter" d="M342.62,101.35h-1.19v-14.09h1.19v14.09Z" />
            <path ref={(el) => (taglineRefs.current[4] = el)} className="logo-tagline-letter" d="M359.39,99.67c-.41.59-1.06,1.04-1.94,1.37-.88.33-1.87.5-2.96.5s-2.08-.26-2.95-.79c-.86-.53-1.52-1.28-1.99-2.24-.47-.97-.71-2.08-.72-3.33v-1.78c0-1.95.5-3.5,1.48-4.63.99-1.13,2.31-1.7,3.98-1.7,1.45,0,2.62.37,3.51,1.11s1.41,1.76,1.58,3.06h-1.19c-.17-1.04-.59-1.82-1.26-2.35-.67-.53-1.54-.8-2.62-.8-1.31,0-2.36.47-3.13,1.41-.77.93-1.15,2.26-1.15,3.96v1.66c0,1.07.18,2.02.55,2.84.37.83.89,1.46,1.57,1.91s1.46.68,2.35.68c1.02,0,1.91-.16,2.64-.48.48-.21.83-.46,1.06-.74v-3.64h-3.78v-1.01h4.98v5.01h0Z" />
            <path ref={(el) => (taglineRefs.current[5] = el)} className="logo-tagline-letter" d="M376.04,101.35h-1.19l-8.1-12.06v12.06h-1.2v-14.09h1.2l8.11,12.07v-12.07h1.18v14.09h0Z" />
            <path ref={(el) => (taglineRefs.current[6] = el)} className="logo-tagline-letter" d="M383.84,101.35h-1.19v-14.09h1.19v14.09Z" />
            <path ref={(el) => (taglineRefs.current[7] = el)} className="logo-tagline-letter" d="M400.94,101.35h-1.19l-8.1-12.06v12.06h-1.2v-14.09h1.2l8.11,12.07v-12.07h1.18v14.09h0Z" />
            <path ref={(el) => (taglineRefs.current[8] = el)} className="logo-tagline-letter" d="M417.47,99.67c-.41.59-1.06,1.04-1.94,1.37-.88.33-1.87.5-2.96.5s-2.08-.26-2.95-.79c-.86-.53-1.52-1.28-1.99-2.24-.47-.97-.71-2.08-.72-3.33v-1.78c0-1.95.5-3.5,1.48-4.63.99-1.13,2.31-1.7,3.98-1.7,1.45,0,2.62.37,3.51,1.11s1.41,1.76,1.58,3.06h-1.19c-.17-1.04-.59-1.82-1.26-2.35-.67-.53-1.54-.8-2.62-.8-1.31,0-2.36.47-3.13,1.41-.77.93-1.15,2.26-1.15,3.96v1.66c0,1.07.18,2.02.55,2.84.37.83.89,1.46,1.57,1.91.68.45,1.46.68,2.35.68,1.02,0,1.91-.16,2.64-.48.48-.21.83-.46,1.06-.74v-3.64h-3.78v-1.01h4.98v5.01h0Z" />
            <path ref={(el) => (taglineRefs.current[9] = el)} className="logo-tagline-letter" d="M431.21,101.35v-14.09h3.94c1.15,0,2.19.26,3.11.79.92.53,1.63,1.28,2.15,2.26.52.98.77,2.09.77,3.35v1.3c0,1.26-.25,2.38-.77,3.35-.51.97-1.23,1.73-2.15,2.26-.93.53-1.99.79-3.19.79h-3.85,0ZM432.4,88.26v12.08h2.67c1.48,0,2.67-.49,3.57-1.48.9-.99,1.35-2.32,1.35-4v-1.24c0-1.62-.44-2.92-1.33-3.89-.88-.97-2.05-1.46-3.49-1.48h-2.77Z" />
            <path ref={(el) => (taglineRefs.current[10] = el)} className="logo-tagline-letter" d="M454.75,94.59h-6.59v5.75h7.58v1.01h-8.77v-14.09h8.72v1.01h-7.53v5.32h6.59v1.01h0Z" />
            <path ref={(el) => (taglineRefs.current[11] = el)} className="logo-tagline-letter" d="M469,97.88c0-.78-.28-1.4-.83-1.85-.55-.46-1.55-.89-3.01-1.3-1.46-.41-2.52-.86-3.2-1.34-.95-.68-1.43-1.58-1.43-2.69s.44-1.95,1.33-2.63c.89-.67,2.02-1.01,3.4-1.01.93,0,1.77.18,2.51.54s1.31.86,1.72,1.51c.41.64.61,1.37.61,2.16h-1.2c0-.96-.33-1.74-.99-2.33s-1.54-.88-2.66-.88-1.93.24-2.58.72c-.64.48-.96,1.11-.96,1.89,0,.72.28,1.3.86,1.75.57.45,1.5.85,2.76,1.2,1.26.34,2.22.7,2.87,1.08s1.14.81,1.47,1.33c.33.52.5,1.13.5,1.83,0,1.11-.44,2-1.33,2.67-.89.67-2.06,1.01-3.51,1.01-.99,0-1.91-.18-2.73-.53-.83-.35-1.46-.85-1.89-1.49-.43-.64-.64-1.37-.64-2.2h1.19c0,.99.37,1.78,1.12,2.35.74.57,1.73.86,2.96.86,1.1,0,1.98-.24,2.64-.73.66-.48,1-1.13,1-1.93h0Z" />
            <path ref={(el) => (taglineRefs.current[12] = el)} className="logo-tagline-letter" d="M477,101.35h-1.19v-14.09h1.19v14.09Z" />
            <path ref={(el) => (taglineRefs.current[13] = el)} className="logo-tagline-letter" d="M488.86,95.47h-4.09v5.88h-1.2v-14.09h4.58c1.5,0,2.68.36,3.53,1.09.84.73,1.27,1.75,1.27,3.06,0,.9-.26,1.7-.79,2.39s-1.24,1.17-2.13,1.43l3.53,6v.12h-1.27l-3.41-5.88h0ZM484.76,94.47h3.65c1,0,1.8-.28,2.41-.86.61-.57.91-1.3.91-2.21,0-.99-.32-1.77-.95-2.31-.63-.55-1.52-.83-2.66-.83h-3.36v6.21h0Z" />
            <path ref={(el) => (taglineRefs.current[14] = el)} className="logo-tagline-letter" d="M506.74,94.59h-6.59v5.75h7.58v1.01h-8.77v-14.09h8.72v1.01h-7.53v5.32h6.59v1.01h0Z" />
            <path ref={(el) => (taglineRefs.current[15] = el)} className="logo-tagline-letter" d="M520.98,97.88c0-.78-.28-1.4-.83-1.85-.55-.46-1.55-.89-3.01-1.3-1.46-.41-2.52-.86-3.2-1.34-.95-.68-1.43-1.58-1.43-2.69s.44-1.95,1.33-2.63c.89-.67,2.02-1.01,3.4-1.01.93,0,1.77.18,2.51.54s1.31.86,1.72,1.51c.41.64.61,1.37.61,2.16h-1.2c0-.96-.33-1.74-.99-2.33s-1.54-.88-2.66-.88-1.93.24-2.58.72c-.64.48-.96,1.11-.96,1.89,0,.72.28,1.3.86,1.75.57.45,1.5.85,2.76,1.2,1.26.34,2.22.7,2.87,1.08s1.14.81,1.47,1.33c.33.52.5,1.13.5,1.83,0,1.11-.44,2-1.33,2.67-.89.67-2.06,1.01-3.51,1.01-.99,0-1.91-.18-2.73-.53-.83-.35-1.46-.85-1.89-1.49-.43-.64-.64-1.37-.64-2.2h1.19c0,.99.37,1.78,1.12,2.35.74.57,1.73.86,2.96.86,1.1,0,1.98-.24,2.64-.73.66-.48,1-1.13,1-1.93h0Z" />
          </g>
          <rect x="244.64" y="84.94" width="29.62" height="5.81" fill="#F58020" />
        </>
      )}
    </svg>
  );
}
