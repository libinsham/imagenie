"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Play, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import ImageOrFallback from "@/components/ui/ImageOrFallback";
import { siteImages } from "@/lib/site-images";
import VideoModal from "@/components/shared/VideoModal";
import "swiper/css";

/**
 * The standalone "WORKS" case-study showcase — a manual-only slider (no
 * autoplay), each slide pairing a project writeup with a two-photo
 * collage: a back photo, and a front photo with a dark scrim + a large
 * decorative word behind it, à la the reference design.
 */
const SLIDES = [
  {
    tag: "Strategy, UI/UX",
    title: "AWS Non-Profit Cloud Solutions",
    description:
      "A global brand entrusted us with a unique challenge: crafting an internal tool to share its brand story with every employee, from onboarding to leadership.",
    imageKey: "slide1",
    wordTreatment: "CREATIVE INTELLIGENCE",
    backGradient: "linear-gradient(135deg,#2a2a2a,#0F0D0C)",
    frontGradient: "linear-gradient(135deg,#171717,#3a3a3a)",
  },
  {
    tag: "Strategy of UI Design",
    title: "Creative Design",
    description:
      "A full identity and interface overhaul, built to hold up across a fast-growing product line without losing what made the brand recognizable.",
    imageKey: "slide2",
    wordTreatment: "DESIGN THINKING",
    backGradient: "linear-gradient(135deg,#3a2a1a,#1a1210)",
    frontGradient: "linear-gradient(135deg,#241E1A,#0F0D0C)",
  },
  {
    tag: "Branding, Digital",
    title: "Northline Studio Rebrand",
    description:
      "Positioning, naming, and a full visual system for a studio that outgrew its original identity — built to scale across print and digital alike.",
    imageKey: "slide3",
    wordTreatment: "BUILT TO SCALE",
    backGradient: "linear-gradient(135deg,#1a2a2a,#0F0D0C)",
    frontGradient: "linear-gradient(135deg,#1e2624,#0F0D0C)",
  },
];

export default function WorksShowcase() {
  const swiperRef = useRef(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();
  const restart = () => swiperRef.current?.slideTo(0);

  return (
    <section className="py-10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="relative rounded-3xl bg-surface-2 overflow-hidden">
          {/* vertical "WORKS" label, static across all slides */}
          <span
            className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 font-headline font-extrabold text-orange-pale text-[5.5rem] leading-none tracking-tight select-none [writing-mode:vertical-rl] rotate-180"
            aria-hidden="true"
          >
            WORKS
          </span>

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1}
            speed={600}
            className="w-full"
          >
            {SLIDES.map((slide) => (
              <SwiperSlide key={slide.title}>
                <div className="grid md:grid-cols-2 gap-10 items-center p-8 md:p-14 md:pl-32">
                  <div>
                    <button
                      onClick={() => setVideoOpen(true)}
                      aria-label="Play project video"
                      className="w-20 h-20 rounded-full bg-surface shadow-md flex items-center justify-center mb-8 hover:scale-105 transition-transform"
                    >
                      <Play size={22} className="text-ink fill-ink ml-1" />
                    </button>

                    <div className="text-orange text-xs font-semibold tracking-wide mb-1">
                      {slide.tag}
                    </div>
                    <h3 className="font-headline font-bold text-2xl md:text-[1.8rem] leading-snug mb-4">
                      {slide.title}
                    </h3>
                    <p className="text-stone text-[15px] leading-relaxed max-w-md mb-6">
                      {slide.description}
                    </p>
                    <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium hover:text-orange transition-colors">
                      Show Project
                      <ArrowRight size={15} />
                    </a>
                  </div>

                  {/* two-photo collage */}
                  {/* ============================================================
                      🖼️  PHOTOS GO HERE (2 per slide — back + front)
                      lib/site-images.js → worksShowcase.slide1/2/3.photoBack
                      and .photoFront
                     ============================================================ */}
                  <div className="relative h-[280px] md:h-[360px]">
                    <ImageOrFallback
                      src={siteImages.worksShowcase[slide.imageKey]?.photoBack}
                      alt=""
                      className="object-cover rounded-2xl"
                      fallback={
                        <div className="absolute inset-0 rounded-2xl" style={{ background: slide.backGradient }} />
                      }
                    />
                    <div className="absolute inset-y-0 right-0 w-[58%] rounded-2xl overflow-hidden">
                      <ImageOrFallback
                        src={siteImages.worksShowcase[slide.imageKey]?.photoFront}
                        alt=""
                        className="object-cover"
                        fallback={
                          <div className="absolute inset-0" style={{ background: slide.frontGradient }} />
                        }
                      />
                      <div className="absolute inset-0 bg-black/55" />
                      <span
                        className="absolute inset-0 flex items-center justify-center text-center font-headline font-extrabold text-white/25 text-3xl md:text-4xl leading-[0.95] px-4 select-none"
                        aria-hidden="true"
                      >
                        {slide.wordTreatment}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* manual controls — no autoplay */}
          <div className="absolute bottom-5 right-5 flex items-center gap-2 z-10">
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full bg-surface shadow-sm flex items-center justify-center hover:text-orange transition-colors"
            >
              <ArrowLeft size={15} />
            </button>
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full bg-surface shadow-sm flex items-center justify-center hover:text-orange transition-colors"
            >
              <ArrowRight size={15} />
            </button>
            <button
              onClick={restart}
              aria-label="Restart"
              title="Restart (back to first slide)"
              className="flex items-center gap-1.5 pl-3 pr-2 h-9 rounded-full bg-ink text-white text-xs font-medium hover:bg-ink/90 transition-colors"
            >
              <RotateCcw size={13} />
              Restart
            </button>
          </div>
        </div>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
