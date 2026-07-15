"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, ArrowRight } from "lucide-react";

const NAV_ITEMS = [
  { n: "01", label: "Home", href: "#hero", sub: null },
  {
    n: "02",
    label: "Project",
    href: "#our-works",
    sub: ["All Works", "Apps", "Branding", "Creative", "Identity", "Mockup"],
  },
  {
    n: "03",
    label: "B2B & B2C",
    href: "#partners",
    sub: ["Enterprise Solutions", "Startup & D2C"],
  },
  {
    n: "04",
    label: "What we do",
    href: "#who-we-are",
    sub: ["Brand Strategy", "Creative Design", "Digital Experiences", "Content Strategy", "Digital Marketing"],
  },
];

const JUMP_LINKS = [
  { label: "OUR WORKS", href: "#our-works", accent: false },
  { label: "TESTIMONIAL", href: "#testimonial", accent: true },
  { label: "PORTFOLIO", href: "#our-works", accent: false },
];

const OFFICES = [
  { name: "Marketing Services", place: "Hyderabad, Telangana" },
  { name: "Marketing Services", place: "Hyderabad, Telangana" },
];

export default function MobileMenu({ open, onClose }) {
  const [active, setActive] = useState(null);
  const activeItem = NAV_ITEMS.find((i) => i.label === active);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] bg-ink text-white overflow-y-auto"
          initial={{ clipPath: "circle(0% at 92% 5%)" }}
          animate={{ clipPath: "circle(150% at 92% 5%)" }}
          exit={{ clipPath: "circle(0% at 92% 5%)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="absolute top-6 left-6 md:top-9 md:left-9 w-10 h-10 flex items-center justify-center text-white/80 hover:text-orange transition-colors"
          >
            <X size={22} />
          </button>

          <div className="max-w-7xl mx-auto px-6 md:px-14 pt-28 pb-16 min-h-screen flex flex-col justify-between">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Parent nav column + floating child panel */}
              <div className="relative max-w-sm" onMouseLeave={() => setActive(null)}>
                <nav className="flex flex-col gap-2">
                  {NAV_ITEMS.map((item) => {
                    const isActive = active === item.label;
                    return (
                      <div
                        key={item.label}
                        className="border-b border-white/10 py-3"
                        onMouseEnter={() => item.sub && setActive(item.label)}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-[11px] text-white/40 font-mono mt-2">{item.n}</span>
                          <a
                            href={item.href}
                            onClick={onClose}
                            className={`font-headline font-bold text-3xl md:text-4xl transition-colors ${
                              isActive ? "text-orange" : "hover:text-orange"
                            }`}
                          >
                            {item.label}
                          </a>
                          {item.sub && (
                            <button
                              onClick={() => setActive(isActive ? null : item.label)}
                              aria-label="Toggle submenu"
                              className="ml-auto w-8 h-8 flex items-center justify-center text-white/50 hover:text-orange transition-colors"
                            >
                              <motion.span animate={{ rotate: isActive ? 45 : 0 }} transition={{ duration: 0.25 }}>
                                <Plus size={18} />
                              </motion.span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </nav>

                {/* Floating child submenu panel, connected with an arrow */}
                <AnimatePresence>
                  {activeItem?.sub && (
                    <motion.div
                      key={activeItem.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="hidden md:block absolute top-16 z-20"
                      style={{ left: "calc(100% + 3.5rem)" }}
                    >
                      <ArrowRight
                        size={28}
                        className="absolute -left-11 top-8 text-white/70"
                      />
                      <div className="border border-orange/40 rounded-2xl px-6 py-5 bg-white/5 backdrop-blur-sm min-w-[220px]">
                        {activeItem.sub.map((s) => (
                          <a
                            key={s}
                            href={activeItem.href}
                            onClick={onClose}
                            className="block font-headline font-semibold text-lg py-1.5 hover:text-orange transition-colors"
                          >
                            {s}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-start md:items-end justify-center gap-1 text-right">
                {JUMP_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={onClose}
                    className={`font-headline font-extrabold text-3xl md:text-4xl tracking-tight hover:opacity-80 transition-opacity ${
                      l.accent ? "text-orange" : "text-white"
                    }`}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-8 mt-20 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-10">
                {OFFICES.map((o, i) => (
                  <div key={i}>
                    <div className="text-sm font-semibold">{o.name}</div>
                    <div className="text-xs text-white/50 mt-1">{o.place}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-8 text-xs font-semibold tracking-wide">
                <a href="#" className="hover:text-orange transition-colors">IN</a>
                <a href="#" className="hover:text-orange transition-colors">INSTAGRAM</a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
