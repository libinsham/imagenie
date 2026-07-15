"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import VideoModal from "@/components/shared/VideoModal";

export default function TestimonialVideo() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <>
      <section>
        <div className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden">

          {/* Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
          >
            <source src="/videos/video1.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10" />

          {/* Optional Heading */}
        
     <div
  className="absolute left-1/2 -translate-x-1/2 z-20 text-center w-full px-6"
  style={{ top: "14%" }}
>
  <h2 className="text-white text-4xl md:text-6xl font-bold">
    Our Creative Journey
  </h2>

  <p className="mt-6 text-white/80 max-w-3xl mx-auto text-lg">
    Discover how Imagenie transforms ideas into impactful brands,
    digital experiences, and measurable growth.
  </p>
</div>

          {/* Animated Play Button */}
          {videoReady && (
            <button
              onClick={() => setVideoOpen(true)}
              className="absolute left-1/2 top-1/2
                         -translate-x-1/2
                         -translate-y-1/2
                         z-30"
              aria-label="Play Video"
            >
              <div className="relative">

                {/* Ripple Animation */}
                <span className="absolute inset-0 rounded-full bg-orange/30 animate-ping"></span>

                <div
                  className="
                  relative
                  w-24
                  h-24
                  rounded-full
                  bg-black
                  border-2
                  border-orange
                  flex
                  items-center
                  justify-center
                  shadow-2xl
                  hover:scale-110
                  transition-all
                  duration-300
                "
                >
                  <Play
                    size={34}
                    className="text-orange fill-orange ml-1"
                  />
                </div>
              </div>
            </button>
          )}

          {/* Bottom Left Card */}
          <div className="absolute bottom-6 left-6 md:left-10 bg-white/95 backdrop-blur rounded-2xl px-6 py-4 z-20 shadow-xl">
            <div className="text-3xl font-bold">
              20 years<span className="text-orange">+</span>
            </div>

            <div className="text-sm text-stone mt-1">
              Combined experience driving growth
            </div>
          </div>

          {/* Bottom Right Card */}
          <div className="absolute bottom-6 right-6 md:right-10 bg-black/80 backdrop-blur rounded-2xl px-6 py-4 text-white z-20 shadow-xl">
            <div className="text-3xl font-bold">
              4.9/5
            </div>

            <div className="text-sm text-white/70 mt-1">
              Based on 2K+ reviews
            </div>
          </div>
        </div>
      </section>

      {/* Popup Video */}
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
      />
    </>
  );
}