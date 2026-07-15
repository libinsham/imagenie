"use client";

import { useState } from "react";
import ImageOrFallback from "@/components/ui/ImageOrFallback";
import { siteImages } from "@/lib/site-images";
import ScrollReveal from "@/components/shared/ScrollReveal";

const FILTERS = [
  { label: "All", count: 6 },
  { label: "Apps", count: 2 },
  { label: "Branding", count: 2 },
  { label: "Creative", count: 1 },
  { label: "Identity", count: 5 },
  { label: "Mockup", count: 2 },
];

const PROJECTS = [
  {
    title: "Spatial Flow",
    imageKey: "featured",
    tags: ["Branding", "Identity"],
    featured: true,
  },

  {
    title: "Warmhaus Interiors",
    imageKey: "project1",
    tags: ["Creative"],
  },

  {
    title: "Ohio Mobile",
    imageKey: "project2",
    tags: ["Apps"],
  },

  {
    title: "Credit Card UI",
    imageKey: "project3",
    tags: ["Identity"],
  },

  {
    title: "Brand Guidelines",
    imageKey: "project4",
    tags: ["Branding"],
  },

  {
    title: "Creative Mockup",
    imageKey: "project5",
    tags: ["Mockup"],
  },

  {
    title: "Magazine Identity",
    imageKey: "project6",
    tags: ["Identity"],
  },
];

export default function OurWorks() {
  const [active, setActive] = useState("All");

  return (
    <section id="our-works" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-center mb-8">
          Our Works
        </h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-14 text-sm font-medium text-stone">
          {FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => setActive(f.label)}
              className={`transition-colors ${
                active === f.label ? "text-orange" : "hover:text-ink"
              }`}
            >
              {f.label}
              <sup className="ml-0.5 text-[10px]">{String(f.count).padStart(2, "0")}</sup>
            </button>
          ))}
        </div>

        <ScrollReveal as="div" className="grid md:grid-cols-2 gap-5" stagger={0.1}>
          {/* ============================================================
              🖼️  PHOTOS GO HERE (one per project)
              lib/site-images.js → ourWorks.spatialFlow / .northlineStudio /
              .warmhausInteriors / .ohioJournal / .ledgerCo
             ============================================================ */}
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className={`relative rounded-2xl overflow-hidden aspect-[4/3] flex flex-col justify-end p-6 ${p.span || ""}`}
            >
              <ImageOrFallback
                src={siteImages.ourWorks[p.imageKey]}
                alt={p.title}
                className="absolute inset-0 object-cover -z-10"
                fallback={
                  <div className="absolute inset-0 -z-10" style={{ background: p.gradient }} />
                }
              />

              <div>
                <h3 className="font-display font-semibold text-xl">{p.title}</h3>
                <div className="flex gap-2 mt-1.5 text-xs">
                  {p.tags.map((t) => (
                    <span key={t} className="text-stone">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
