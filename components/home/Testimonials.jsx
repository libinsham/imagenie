"use client";

import { useState } from "react";
import { Quote } from "lucide-react";
import ImageOrFallback from "@/components/ui/ImageOrFallback";
import { siteImages } from "@/lib/site-images";
import ScrollReveal from "@/components/shared/ScrollReveal";

const TESTIMONIALS = [
  {
    quote: [
      "Imagenie became our ",
      { text: "go-to partner", accent: true },
      " for anything that needed to be both ",
      { text: "strategic and beautifully presented.", bold: true },
    ],
    name: "Head of Marketing",
    company: "B2B SaaS Company",
    initials: "AM",
    imageKey: "headOfMarketing",
    shape: "blob",
  },
  {
    quote: [
      "They understood our GTM faster than most internal hires, and turned it into ",
      { text: "content our sales team actually uses.", bold: true },
    ],
    name: "VP Sales",
    company: "Tech Services Firm",
    initials: "RK",
    imageKey: "vpSales",
    shape: "bubble",
  },
  {
    quote: [
      "From packaging to digital, they gave our brand a ",
      { text: "consistent, premium presence.", bold: true },
    ],
    name: "Founder",
    company: "D2C Wellness Brand",
    initials: "SL",
    imageKey: "founder",
    shape: "hex",
  },
];

const SHAPE_CLASS = {
  blob: "rounded-[2.5rem] rounded-bl-lg",
  bubble: "rounded-[2rem]",
  hex: "rounded-[2rem] rounded-br-lg",
};

function QuoteCard({ item }) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div
        className={`relative bg-surface border border-line shadow-sm p-7 pt-9 ${SHAPE_CLASS[item.shape]}`}
      >
        <Quote size={26} className="text-orange fill-orange/20 mx-auto mb-3" />
        <p className="text-[14.5px] leading-relaxed text-ink/90 max-w-[240px] mx-auto">
          {item.quote.map((part, i) =>
            typeof part === "string" ? (
              <span key={i}>{part}</span>
            ) : (
              <span
                key={i}
                className={part.accent ? "text-orange font-semibold" : "font-semibold"}
              >
                {part.text}
              </span>
            )
          )}
        </p>
        {/* speech-bubble tail */}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-surface border-b border-r border-line rotate-45" />
      </div>

      <div className="flex items-center gap-2.5 mt-7">
        {/* ============================================================
            🖼️  PHOTO GOES HERE (per testimonial)
            lib/site-images.js → testimonials.headOfMarketing / .vpSales /
            .founder
           ============================================================ */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
          <ImageOrFallback
            src={siteImages.testimonials[item.imageKey]}
            alt={item.name}
            className="object-cover"
            fallback={
              <span className="w-full h-full bg-orange-pale text-orange font-headline font-bold text-xs flex items-center justify-center">
                {item.initials}
              </span>
            }
          />
        </div>
        <div className="text-left">
          <div className="text-orange text-[13px] font-semibold leading-tight">{item.name}</div>
          <div className="text-stone text-[12px] leading-tight mt-0.5">{item.company}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonial" className="py-24 md:py-32 bg-gradient-to-b from-orange-pale/25 to-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 rounded-md bg-orange text-white text-xs font-bold flex items-center justify-center shrink-0">
            7
          </span>
          <span className="eyebrow">What Clients Say</span>
          <span className="flex-1 h-px bg-line" />
        </div>

        <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-center mb-16">
          Testimonials
        </h2>

        <ScrollReveal
          as="div"
          className="grid md:grid-cols-3 gap-10 md:gap-6 items-start"
          stagger={0.15}
        >
          {TESTIMONIALS.map((item) => (
            <QuoteCard key={item.name} item={item} />
          ))}
        </ScrollReveal>

        {/* pagination dots — decorative on desktop grid, functional if you later swap to a carousel */}
        <div className="flex justify-center gap-2 mt-14 md:hidden">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                active === i ? "bg-orange" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
