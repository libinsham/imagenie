"use client";

import { Play } from "lucide-react";
import ImageOrFallback from "@/components/ui/ImageOrFallback";
import { siteImages } from "@/lib/site-images";

/**
 * The floating collage graphic. `variant` swaps the card copy/stat/accent
 * so each hero slide can show something slightly different.
 */
const VARIANTS = {
  strategy: {
    label: "GROWTH OVERVIEW",
    title: ["Strategy made ", "visible."],
    tags: ["Clarify", "Creativity", "Growth"],
    ring: "600WTH LOOP",
    stat: "+47%",
    statLabel: "Growth Acceleration",
  },
  creative: {
    label: "CREATIVE OUTPUT",
    title: ["Ideas made ", "tangible."],
    tags: ["Concept", "Craft", "Launch"],
    ring: "12X REACH",
    stat: "+62%",
    statLabel: "Engagement Lift",
  },
  digital: {
    label: "DIGITAL PRESENCE",
    title: ["Experiences made ", "seamless."],
    tags: ["Design", "Build", "Scale"],
    ring: "3.2X ROI",
    stat: "+38%",
    statLabel: "Conversion Rate",
  },
};

export default function HeroIllustration({ variant = "strategy", onPlayClick }) {
  const v = VARIANTS[variant] || VARIANTS.strategy;

  return (
   
    <div className="relative h-[400px] md:h-[520px] overflow-visible">
  <div
    className="relative w-full h-full"
    style={{
      transform: "translateX(-80px) translateY(0px) scale(1.08)",
    }}
  ></div>

      {/* ============================================================
          🖼️  PHOTO GOES HERE
          To show a photo, open lib/site-images.js and set:
            heroIllustration.strategy  (or .creative / .digital)
         and you just see the
          usual rings/glow/shapes as before.
         ============================================================ */}
      <div
  className="absolute rounded-full overflow-hidden z-10"
  style={{
    width: "520px",
    height: "520px",
    right: "120px",
    top: "20px",
  }}
>
        <ImageOrFallback
          src={siteImages.heroIllustration[variant]}
          alt=""
          className="object-cover opacity-90"
          fallback={null}
        />
      </div>
      {/* ============================================================
          END PHOTO SECTION
         ============================================================ */}

      <div className="absolute w-[420px] h-[420px] md:w-[480px] md:h-[480px] rounded-full border border-black/10" />
      <div className="absolute w-[480px] h-[480px] md:w-[540px] md:h-[540px] rounded-full border border-dashed border-black/15" />

      <div className="absolute top-2 right-4 grid grid-cols-4 gap-1.5 opacity-40">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-ink" />
        ))}
      </div>

      <div
        className="absolute w-72 h-72 rounded-full blur-2xl opacity-70"
        style={{
          right: "6%",
          top: "38%",
          background: "radial-gradient(circle, #0A0C0F 0%, rgba(10,12,15,0.4) 55%, transparent 75%)",
        }}
      />

      <div
        className="absolute w-40 h-40 rounded-full"
        style={{
          left: "18%",
          top: "6%",
          background: "radial-gradient(circle at 32% 28%, #FFC57A, #FF9600 55%, #E35800 85%)",
          boxShadow: "0 20px 40px rgba(255,106,0,0.35)",
        }}
      />

      <div className="absolute top-[14%] right-[6%] w-60 bg-ink text-white rounded-2xl p-4 shadow-2xl -rotate-2 z-10">
        <div className="flex items-center justify-between">
          <span className="text-[9px] tracking-widest text-white/45">{v.label}</span>
          <span className="flex gap-0.5">
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="w-1 h-1 rounded-full bg-white/40" />
          </span>
        </div>
        <div className="font-headline font-bold text-lg mt-2 leading-snug">
          {v.title[0]}
          <span className="text-orange-soft">{v.title[1]}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[10.5px] text-white/55 leading-tight">
            {v.tags.map((t, i) => (
              <span key={t}>
                {t}
                {i < v.tags.length - 1 && <br />}
              </span>
            ))}
          </span>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-center shrink-0"
            style={{
              background: "conic-gradient(#FF9600 0deg 130deg, rgba(255,255,255,0.12) 130deg 360deg)",
            }}
          >
            <div className="w-11 h-11 rounded-full bg-ink flex items-center justify-center text-[7.5px] font-semibold leading-tight px-1 text-center">
              {v.ring}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[10%] right-[38%] w-6 h-6 rounded-full border-2 border-orange bg-white z-10" />

      <button
        onClick={onPlayClick}
        aria-label="Play video"
        className="absolute bottom-[18%] left-[4%] w-24 h-24 rounded-full bg-ink flex items-center justify-center shadow-2xl z-10 cursor-pointer hover:scale-105 transition-transform"
      >
        <div
          className="w-[88px] h-[88px] rounded-full flex items-center justify-center"
          style={{ boxShadow: "0 0 0 2px #FF9600, 0 0 24px 4px rgba(255,150,0,0.55)" }}
        >
          <Play size={26} className="text-orange-soft fill-orange-soft ml-1" />
        </div>
      </button>

      <div className="absolute bottom-[10%] left-[26%] bg-white rounded-2xl p-4 shadow-xl w-48 flex items-center gap-3 z-10">
        <div className="flex items-end gap-1 h-9">
          {[5, 9, 6, 13, 18].map((h, i) => (
            <span
              key={i}
              className={`w-1.5 rounded-sm ${i === 3 ? "bg-orange" : "bg-[#D9D9D9]"}`}
              style={{ height: `${h * 2}px` }}
            />
          ))}
        </div>
        <div>
          <div className="text-orange font-headline font-bold text-base leading-none">{v.stat}</div>
          <div className="text-[10px] text-stone leading-tight mt-1">{v.statLabel}</div>
        </div>
      </div>

      <span className="absolute top-[6%] right-[16%] w-9 h-9 bg-ink rotate-12 rounded-sm z-10" />
      <span className="absolute bottom-[22%] right-[2%] w-3 h-3 rounded-full bg-orange" />
      <span className="absolute bottom-[2%] left-[8%] w-6 h-6 rounded-full bg-ink" />
      <span
        className="absolute bottom-[4%] right-[20%] w-11 h-11 bg-orange"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      />

      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 520 520" fill="none">
        <ellipse cx="260" cy="330" rx="230" ry="70" stroke="#0F0D0C" strokeOpacity="0.15" strokeDasharray="2 6" />
      </svg>
    </div>
  );
}
