"use client";

import { useState } from "react";
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

  return (
    <footer className="bg-surface-2 pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-4 gap-10 pb-14">
        <div>
          <AnimatedLogo className="h-9 w-auto mb-3" />
          <div className="text-xs text-stone mb-3">Fb. / Ig. / Tw. / Be.</div>
          <p className="text-sm text-stone leading-relaxed max-w-[220px]">
            We help ambitious brands turn strategy into measurable growth —
            one considered decision at a time.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-stone hover:text-orange transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-semibold text-sm mb-4">Sign up for the newsletter</h4>
          <div className="flex items-center bg-surface rounded-full border border-line pl-4 pr-1.5 py-1.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 text-sm outline-none bg-transparent"
            />
            <button className="btn-primary text-xs py-2 px-4">Sign Up</button>
          </div>
          <label className="flex items-start gap-2 mt-3 text-[11px] text-stone leading-snug">
            <input type="checkbox" className="mt-0.5" />
            By sending this message, I agree that the data provided may be
            processed and used for the purpose of sending the newsletter.
          </label>
        </div>
      </div>

      {/* decorative wordmark strip */}
      <div className="relative overflow-hidden border-t border-line pt-10 pb-2">
        <div
          className="absolute left-[8%] top-2 w-24 h-24 md:w-32 md:h-32 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 30%, #FFD9A0, #FF9600 55%, #FF6A00 85%)",
          }}
        />
        <div
          className="absolute right-[10%] top-6 w-14 h-14 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 30%, #FFB27A, #E14D00)",
          }}
        />
        <h2 className="font-display font-semibold text-center text-[16vw] md:text-[9rem] leading-none tracking-tight text-ink select-none">
          IMA<span className="text-orange">G</span>ENIE
        </h2>
      </div>

      <div className="text-center text-xs text-stone py-6 border-t border-line">
        © {new Date().getFullYear()} Imagenie. All rights reserved.
      </div>
    </footer>
  );
}
