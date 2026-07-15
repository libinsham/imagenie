"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { ArrowUpRight } from "lucide-react";
import HeroIllustration from "./HeroIllustration";
import VideoModal from "@/components/shared/VideoModal";
import ImageOrFallback from "@/components/ui/ImageOrFallback";
import { siteImages } from "@/lib/site-images";
import "swiper/css";
import "swiper/css/effect-fade";

const SLIDES = [
  {
    heading: ["Building", "Brands That", "Lead Markets."],
    body: "We help ambitious businesses transform strategy into measurable growth through Brand Strategy, Go-to-Market Planning, Creative Design, Digital Experiences, Content Strategy, and Digital Marketing.",
    variant: "strategy",
    imageKey: "slide1",
  },
  {
    heading: ["Turning Ideas", "Into Work That", "Gets Noticed."],
    body: "From concept to execution, our creative team builds campaigns and identities that cut through the noise and stay memorable long after launch.",
    variant: "creative",
    imageKey: "slide2",
  },
  {
    heading: ["Digital Experiences", "Built To", "Convert."],
    body: "Websites, apps, and platforms engineered around real user behavior — designed to look good and perform even better.",
    variant: "digital",
    imageKey: "slide3",
  },
];

export default function HeroSlider({ onSlideChange, swiperRef }) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        speed={700}
        onSwiper={(swiper) => {
          if (swiperRef) swiperRef.current = swiper;
          // Safety net: some setups need autoplay kicked off explicitly
          // once the instance and its slides have fully mounted.
          requestAnimationFrame(() => swiper.autoplay?.start());
        }}
        onSlideChange={(swiper) => onSlideChange?.(swiper.realIndex + 1)}
        className="w-full"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i}>
            
<div className="max-w-[1600px] mx-auto px-6 md:px-14 grid md:grid-cols-[48%_52%] gap-6 items-center">

<div className="translate-x-[120px] ">
                <h1 className="font-headline font-extrabold text-[2.75rem] leading-[1.08] md:text-[3.6rem] md:leading-[1.08] tracking-tight">
                  {slide.heading[0]}
                  <br />
                  {slide.heading[1]}
                  <br />
                  <span className="text-orange">{slide.heading[2]}</span>
                </h1>
                <p className="mt-7 text-stone text-[15.5px] leading-relaxed max-w-md">
                  {slide.body}
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a href="#contact" className="btn-primary pl-1.5 pr-6 py-1.5">
                    <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowUpRight size={16} />
                    </span>
                    Talk to us
                  </a>
                  <a href="#our-works" className="btn-secondary pl-1.5 pr-6 py-1.5">
                    <span className="w-9 h-9 rounded-full bg-[#D9D9D9]" />
                    View Our Works
                  </a>
                </div>
              </div>

              {/* ============================================================
                  🖼️  PHOTO GOES HERE (one per slide — replaces the
                  illustration entirely when set)
                  lib/site-images.js → hero.slide1 / .slide2 / .slide3
                 ============================================================ */}
        
        

{siteImages.hero[slide.imageKey] ? (
  <div className="relative h-[400px] md:h-[520px] rounded-3xl overflow-hidden">
    <ImageOrFallback
      src={siteImages.hero[slide.imageKey]}
      alt={slide.heading.join(" ")}
      className="object-cover"
    />
  </div>
) : (
  <div className="-ml-16 lg:-ml-24">
    <HeroIllustration
      variant={slide.variant}
      onPlayClick={() => setVideoOpen(true)}
    />
  </div>
)}



            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}
