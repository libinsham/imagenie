"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ImageOrFallback from "@/components/ui/ImageOrFallback";
import { siteImages } from "@/lib/site-images";

const PROJECTS = [
  {
    title: "Spatial Flow",
    imageKey: "spatialFlow",
    tags: ["Branding", "Identity"],
    span: "md:col-span-2",
    gradient: "linear-gradient(135deg,#FF4D2E,#FF9600 60%,#FFD9A0)",
  },
  {
    title: "Northline Studio",
    imageKey: "northlineStudio",
    tags: ["Mockup"],
    gradient: "linear-gradient(135deg,#2b2b2b,#5a5a5a)",
  },
  {
    title: "Warmhaus Interiors",
    imageKey: "warmhausInteriors",
    tags: ["Creative"],
    gradient: "linear-gradient(135deg,#E8DFD3,#C9B896)",
  },
  {
    title: "Ohio Journal",
    imageKey: "ohioJournal",
    tags: ["Apps"],
    gradient: "linear-gradient(135deg,#D8D8D8,#ABABAB)",
  },
  {
    title: "Ledger & Co.",
    imageKey: "ledgerCo",
    tags: ["Identity"],
    gradient: "linear-gradient(135deg,#FFC9B0,#FF9F73)",
  },
];

// Counts are computed from PROJECTS below, not hand-typed — add/remove a
// project's tags and every count here updates itself automatically.
const FILTER_LABELS = ["All", "Apps", "Branding", "Creative", "Identity", "Mockup"];

function getFilters() {
  return FILTER_LABELS.map((label) => ({
    label,
    count: label === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.tags.includes(label)).length,
  }));
}

export default function OurWorks() {
  const [active, setActive] = useState("All");
  const filters = getFilters();
  const visible = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active));

  return (
    <section id="our-works" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-center mb-8">
          Our Works
        </h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-14 text-sm font-medium text-stone">
          {filters.map((f) => (
            <button
              key={f.label}
              onClick={() => setActive(f.label)}
              className={`relative pb-1 transition-colors ${
                active === f.label ? "text-orange" : "hover:text-ink"
              }`}
            >
              {f.label}
              <sup className="ml-0.5 text-[10px]">{String(f.count).padStart(2, "0")}</sup>
              {/* underline slides between filters instead of just snapping */}
              {active === f.label && (
                <motion.span
                  layoutId="ourworks-filter-underline"
                  className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-orange rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ============================================================
            🖼️  PHOTOS GO HERE (one per project)
            lib/site-images.js → ourWorks.spatialFlow / .northlineStudio /
            .warmhausInteriors / .ohioJournal / .ledgerCo
           ============================================================ */}
        <motion.div layout className="grid md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="text-center text-stone text-sm mt-10">
            No projects tagged "{active}" yet.
          </p>
        )}
      </div>
    </section>
  );
}
