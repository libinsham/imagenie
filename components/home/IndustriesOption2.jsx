"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Laptop2, Briefcase, Landmark, HeartPulse, ShieldCheck, Building2, Send, X, ArrowRight } from "lucide-react";
import ImageOrFallback from "@/components/ui/ImageOrFallback";
import { siteImages } from "@/lib/site-images";

const CATEGORIES = [
  {
    n: "01",
    icon: Laptop2,
    title: "Technology & SaaS",
    desc: "Complex products, clearer stories.",
    imageKey: "technology",
  },
  {
    n: "02",
    icon: Briefcase,
    title: "Professional & IT Services",
    desc: "Stronger narratives for expertise-led firms.",
    imageKey: "professionalIt",
  },
  {
    n: "03",
    icon: Landmark,
    title: "Government & International Agencies",
    desc: "Policy, impact, and data made accessible.",
    imageKey: "government",
  },
  {
    n: "04",
    icon: HeartPulse,
    title: "Healthcare & Life Sciences",
    desc: "Trusted communication for sensitive categories.",
    imageKey: "healthcare",
  },
  {
    n: "05",
    icon: ShieldCheck,
    title: "Financial Services",
    desc: "Clear, credible communication for regulated environments.",
    imageKey: "financial",
  },
  {
    n: "06",
    icon: Building2,
    title: "Hospitality & Real Estate",
    desc: "Launch-ready experiences across print and digital.",
    imageKey: "hospitality",
  },
];

// Positions around the hub, expressed as % offsets from center for desktop.
const ANGLES = [-90, -30, 30, 90, 150, 210];
const RADIUS = 240;

// A partial ring behind each icon, mimicking the reference's orange arc.
const ICON_RING = "conic-gradient(#FF6A00 0deg 250deg, rgba(0,0,0,0.08) 250deg 360deg)";

function CenterCircle({ active, onBack }) {
  return (
    <div
      className="absolute"
      style={{ width: 168, height: 168, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
    >
      {/* back circle — the "double stacked" look from the reference */}
      <div
        className="absolute inset-0 rounded-full bg-white/70 shadow-md"
        style={{ transform: "translate(6px, 6px)" }}
      />
      {/* front circle with a partial orange ring border */}
      <div
        className="absolute inset-0 rounded-full p-[3px]"
        style={{ background: "conic-gradient(#FF6A00 0deg 260deg, rgba(0,0,0,0.06) 260deg 360deg)" }}
      >
        <div className="w-full h-full rounded-full bg-white shadow-xl flex flex-col items-center justify-center text-center overflow-hidden relative">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.button
                key={active.title}
                onClick={onBack}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center justify-center text-center px-4 cursor-pointer"
                aria-label="Back to Imagenie"
                title="Click to go back"
              >
                <active.icon size={22} className="text-orange mb-2" />
                <div className="font-semibold text-[12.5px] leading-snug">{active.title}</div>
                <div className="text-stone text-[9.5px] leading-snug mt-1">{active.desc}</div>
              </motion.button>
            ) : (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="font-display font-semibold text-lg leading-none">
                  IMA<span className="text-orange">G</span>ENIE
                </div>
                <div className="text-[9px] tracking-[0.2em] text-stone mt-2">
                  DESIGNING DESIRES
                </div>
                {/* paper-plane pointer, decorative, matching the reference */}
                <Send size={15} className="text-orange mt-2 -rotate-12" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function IndustryPopup({ cat, side, onClose, pinned }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ duration: 0.2 }}
      className={`absolute z-30 w-56 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden ${
        side === "left" ? "right-full mr-4" : "left-full ml-4"
      } top-1/2 -translate-y-1/2`}
    >
      {/* ============================================================
          🖼️  PHOTO GOES HERE (one per industry, shown in this popup)
          lib/site-images.js → industries.technology / .professionalIt /
          .government / .healthcare / .financial / .hospitality
         ============================================================ */}
      <div className="relative h-24">
        <ImageOrFallback
          src={siteImages.industries[cat.imageKey]}
          alt={cat.title}
          className="object-cover"
          fallback={
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, #FFC57A, #FF6A00)" }}
            />
          }
        />
        {pinned && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <X size={12} />
          </button>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-headline font-bold text-sm leading-snug">{cat.title}</h4>
        <p className="text-stone text-xs leading-relaxed mt-1.5">{cat.desc}</p>
        <a href="#contact" className="inline-flex items-center gap-1.5 text-orange text-xs font-semibold mt-3">
          See our services
          <ArrowRight size={12} />
        </a>
      </div>
    </motion.div>
  );
}

export default function IndustriesOption2() {
  const [activeIndex, setActiveIndex] = useState(null); // center-circle selection
  const [pinnedIndex, setPinnedIndex] = useState(null); // popup pinned via click
  const [hoverIndex, setHoverIndex] = useState(null); // popup shown via hover

  const active = activeIndex !== null ? CATEGORIES[activeIndex] : null;
  const popupIndex = hoverIndex !== null ? hoverIndex : pinnedIndex;
  const popupCat = popupIndex !== null ? CATEGORIES[popupIndex] : null;

  const handleCenterSwap = (i) => {
    setActiveIndex((cur) => (cur === i ? null : i));
  };

  const handleIconClick = (e, i) => {
    e.stopPropagation();
    handleCenterSwap(i);
    setPinnedIndex((cur) => (cur === i ? null : i));
  };

  return (
    <div
      className="rounded-3xl bg-gradient-to-b from-white to-orange-pale/40 border border-black/5 p-8 md:p-14"
      onClick={() => setPinnedIndex(null)}
    >
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <div>
          <div className="eyebrow flex items-center gap-2 mb-3">
            06 &nbsp;INDUSTRIES <span className="w-8 h-px bg-orange" />
          </div>
          <h2 className="font-display font-semibold text-3xl md:text-[2.6rem] leading-[1.1]">
            Across <span className="text-orange">sectors,</span>
            <br />
            across stages.
          </h2>
          <p className="text-stone text-[15px] leading-relaxed mt-5 max-w-sm">
            From startups to enterprise teams, we work across categories
            where clarity, credibility, and differentiation create real
            impact.
          </p>
          <div className="mt-8 border-l-2 border-orange pl-4">
            <p className="text-[15px] leading-relaxed">
              Every industry has a story. We make it{" "}
              <span className="text-orange font-medium">visible, valuable</span> and{" "}
              <span className="text-orange font-medium">memorable</span>.
            </p>
          </div>
        </div>

        {/* Hub diagram — desktop */}
        <div
          className="hidden md:block relative mx-auto"
          style={{ width: 560, height: 560 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-orange/25" />

          <CenterCircle active={active} onBack={() => setActiveIndex(null)} />

          {CATEGORIES.map((cat, i) => {
            const rad = (ANGLES[i] * Math.PI) / 180;
            const x = 280 + RADIUS * Math.cos(rad);
            const y = 280 + RADIUS * Math.sin(rad);
            const Icon = cat.icon;
            const isActive = activeIndex === i;
            const isDimmed = activeIndex !== null && !isActive;
            const isPopupOpen = popupIndex === i;
            const side = Math.cos(rad) < 0 ? "left" : "right";

            return (
              <div
                key={cat.title}
                className="absolute bg-white rounded-2xl shadow-lg border p-4 w-48 transition-all duration-300"
                style={{
                  left: x,
                  top: y,
                  transform: `translate(-50%,-50%) scale(${isActive ? 1.06 : 1})`,
                  opacity: isDimmed ? 0.5 : 1,
                  borderColor: isActive ? "var(--color-orange)" : "rgba(0,0,0,0.05)",
                }}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <button
                  onClick={(e) => handleIconClick(e, i)}
                  aria-label={`Show ${cat.title}`}
                  aria-pressed={isActive}
                  className="w-9 h-9 rounded-full p-[2.5px] mb-2 relative hover:scale-110 transition-transform cursor-pointer"
                  style={{ background: ICON_RING }}
                >
                  <span className="w-full h-full rounded-full bg-orange-pale flex items-center justify-center text-orange">
                    <Icon size={15} />
                  </span>
                </button>
                <div className="font-semibold text-[13px] leading-snug">{cat.title}</div>
                <p className="text-stone text-[11.5px] leading-snug mt-1">{cat.desc}</p>

                <AnimatePresence>
                  {isPopupOpen && (
                    <IndustryPopup
                      cat={cat}
                      side={side}
                      pinned={pinnedIndex === i}
                      onClose={(e) => {
                        e.stopPropagation();
                        setPinnedIndex(null);
                        setHoverIndex(null);
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Mobile fallback — simple stacked list, tap to highlight + reveal popup below */}
        <div className="md:hidden grid grid-cols-1 gap-3">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = activeIndex === i;
            const isPopupOpen = pinnedIndex === i;
            return (
              <div key={cat.title}>
                <button
                  onClick={(e) => handleIconClick(e, i)}
                  aria-pressed={isActive}
                  className={`w-full text-left bg-white rounded-2xl shadow-sm border p-4 flex gap-3 transition-colors ${
                    isActive ? "border-orange" : "border-black/5"
                  }`}
                >
                  <span className="w-9 h-9 rounded-full p-[2.5px] shrink-0" style={{ background: ICON_RING }}>
                    <span className="w-full h-full rounded-full bg-orange-pale flex items-center justify-center text-orange">
                      <Icon size={16} />
                    </span>
                  </span>
                  <div>
                    <div className="font-semibold text-[13.5px]">{cat.title}</div>
                    <p className="text-stone text-xs leading-snug mt-0.5">{cat.desc}</p>
                  </div>
                </button>

                <AnimatePresence>
                  {isPopupOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 bg-white rounded-2xl shadow-md border border-black/5 overflow-hidden">
                        {/* Same image as the desktop popup above — mobile
                            just displays it inline instead of floating. */}
                        <div className="relative h-28">
                          <ImageOrFallback
                            src={siteImages.industries[cat.imageKey]}
                            alt={cat.title}
                            className="object-cover"
                            fallback={
                              <div
                                className="absolute inset-0"
                                style={{ background: "linear-gradient(135deg, #FFC57A, #FF6A00)" }}
                              />
                            }
                          />
                        </div>
                        <div className="p-4">
                          <a href="#contact" className="inline-flex items-center gap-1.5 text-orange text-xs font-semibold">
                            See our services
                            <ArrowRight size={12} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
