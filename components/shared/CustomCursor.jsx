"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
/**
 * A small genie-lamp icon that trails alongside the real system cursor —
 * it does NOT replace the pointer (hiding the real cursor hurts usability
 * and accessibility), it just follows a step behind for a bit of brand
 * personality. Automatically disabled on touch devices, where there's no
 * mouse to follow.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring smoothing gives the trailing/lag feel instead of a rigid 1:1 follow.
  const springX = useSpring(mouseX, { damping: 22, stiffness: 260, mass: 0.6 });
  const springY = useSpring(mouseY, { damping: 22, stiffness: 260, mass: 0.6 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasFinePointer || prefersReduced) return;

    setEnabled(true);

    const handleMove = (e) => {
      mouseX.set(e.clientX + 18);
      mouseY.set(e.clientY + 18);
      if (!visible) setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
  <motion.div
  aria-hidden="true"
  className="pointer-events-none fixed top-0 left-0 z-[9999]"
  style={{
    x: springX,
    y: springY,
    opacity: visible ? 1 : 0,
    width: 36,
    height: 36,
  }}
>
  <img
    src="/images/cursor.svg"
    alt=""
    className="w-full h-full object-contain"
    draggable={false}
  />
</motion.div>
  );
}
