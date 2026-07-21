"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import AnimatedLogo from "@/components/shared/AnimatedLogo";

const COLUMNS = [
  {
    title: "Services",
    links: ["Brand Strategy", "Creative Design", "Digital Experiences", "Content Strategy"],
  },
  {
    title: "Company",
    links: ["About Us", "Our Works", "Careers", "Blog"],
  },
  {
    title: "Resources",
    links: ["Case Studies", "Guides", "FAQs", "Get in Touch"],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const glowRef = useRef(null);
  const leftCloudRef = useRef(null);
  const rightCloudRef = useRef(null);
  const bigPlanetRef = useRef(null);
  const smallPlanetRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Glow: slow, gentle breathing pulse — never fully off, never harsh.
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.2,
          scale: 1.08,
          duration: 3.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          transformOrigin: "center",
        });
      }

      // Clouds: slow horizontal drift, opposite directions, so they never
      // look like they're moving in lockstep.
      if (leftCloudRef.current) {
        gsap.to(leftCloudRef.current, {
          x: 18,
          duration: 6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
      if (rightCloudRef.current) {
        gsap.to(rightCloudRef.current, {
          x: -18,
          duration: 6.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      // Planets: gentle vertical bob, staggered timing so they float
      // independently rather than in sync.
      if (bigPlanetRef.current) {
        gsap.to(bigPlanetRef.current, {
          y: -14,
          duration: 4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
      if (smallPlanetRef.current) {
        gsap.to(smallPlanetRef.current, {
          y: -10,
          duration: 3.3,
          delay: 0.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-surface-2 pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-4 gap-10 pb-16">
        {/* Left */}
        <div>
          <AnimatedLogo className="h-9 w-auto mb-4" />

          <div className="text-xs text-stone mb-4">Fb. / Ig. / Tw. / Be.</div>

          <p className="text-sm text-stone leading-relaxed max-w-[230px]">
            We help ambitious brands turn strategy into measurable growth —
            one considered decision at a time.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-stone hover:text-orange transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold text-sm mb-4">Sign up for the newsletter</h4>

          <div className="flex items-center rounded-full border border-line pl-4 pr-2 py-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button className="btn-primary text-xs px-4 py-2">Sign Up</button>
          </div>

          <label className="flex items-start gap-2 mt-3 text-[11px] text-stone leading-snug">
            <input type="checkbox" className="mt-0.5" />
            By sending this message, I agree that the data provided may be
            processed and used for the purpose of sending the newsletter.
          </label>
        </div>
      </div>

      {/* ================= FOOTER WORDMARK ================= */}
      <div className="relative overflow-hidden border-t border-line h-[560px]">
        {/* Animated Glow */}
        <div
          ref={glowRef}
          className="absolute left-1/2 top-[220px] -translate-x-1/2 w-[900px] h-[220px] rounded-full blur-[130px] opacity-10 z-0"
          style={{
            background: "radial-gradient(circle,#FF8A00 0%,transparent 70%)",
          }}
        />

        {/* Left Cloud */}
        <Image
          ref={leftCloudRef}
          src="/images/footer/cloud-2-1.png"
          alt=""
          width={900}
          height={500}
          priority
          className="absolute left-[-3%] top-[150px] w-[44%] h-auto pointer-events-none select-none z-30 will-change-transform"
        />

        {/* Right Cloud */}
        <Image
          ref={rightCloudRef}
          src="/images/footer/cloud-2-2.png"
          alt=""
          width={900}
          height={500}
          priority
          className="absolute right-[-3%] top-[150px] w-[44%] h-auto pointer-events-none select-none z-10 will-change-transform"
        />

        {/* Left Planet */}
        <div
          ref={bigPlanetRef}
          className="absolute left-[12%] top-[45px] w-28 h-28 md:w-40 md:h-40 rounded-full z-30 will-change-transform"
          style={{
            background: "radial-gradient(circle at 35% 30%,#FFE3B3,#FFB13D 35%,#FF8A00 70%,#F96A00 100%)",
            boxShadow: "0 25px 60px rgba(255,140,0,.25)",
          }}
        />

        {/* Right Planet */}
        <div
          ref={smallPlanetRef}
          className="absolute right-[12%] top-[60px] w-20 h-20 md:w-24 md:h-24 rounded-full z-30 will-change-transform"
          style={{
            background: "radial-gradient(circle at 35% 30%,#FFCDA2,#FF9650 40%,#FF6A00 100%)",
            boxShadow: "0 18px 40px rgba(255,120,0,.20)",
          }}
        />

        {/* IMAGENIE Logo */}
        <div className="absolute inset-0 flex items-center justify-center pt-36 z-20">
          <h2 className="font-display font-semibold text-[18vw] md:text-[11rem] leading-none tracking-tight text-ink select-none drop-shadow-[0_25px_50px_rgba(0,0,0,.06)]">
            IMA<span className="text-orange">G</span>ENIE
          </h2>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-line py-6 text-center text-xs text-stone">
        © {new Date().getFullYear()} Imagenie. All rights reserved.
      </div>
    </footer>
  );
}
