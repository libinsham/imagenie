import { ArrowUpRight, X } from "lucide-react";

export default function Partners() {
  return (
    <section id="partners" className="py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-orange-pale/30 rounded-3xl p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center relative overflow-hidden">
          <h2 className="font-headline font-extrabold text-3xl md:text-[2.6rem] leading-[1.1]">
            Helping Businesses
            <br />
            Grow Across
            <br />
            <span className="text-orange">Every Stage</span>
          </h2>

          <div className="relative">
            <button
              aria-label="Dismiss"
              className="absolute -top-2 right-0 md:right-8 w-6 h-6 flex items-center justify-center text-stone/60"
            >
              <X size={14} />
            </button>
            <p className="text-stone text-[15px] leading-relaxed max-w-xs">
              From ambitious startups to established enterprises, we craft
              strategies and experiences that drive growth, build brands and
              create impact.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium mt-6 hover:text-orange transition-colors"
            >
              <span className="w-7 h-7 rounded-full border border-line flex items-center justify-center">
                <ArrowUpRight size={13} />
              </span>
              Let's talk about your goals
            </a>

            {/* faceted prism graphic */}
            <div className="hidden md:block absolute -right-4 -top-16 w-36 h-36">
              <svg viewBox="0 0 160 160" className="w-full h-full">
                <defs>
                  <linearGradient id="prismA" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFC57A" />
                    <stop offset="100%" stopColor="#FF6A00" />
                  </linearGradient>
                  <linearGradient id="prismB" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FF9600" />
                    <stop offset="100%" stopColor="#E35800" />
                  </linearGradient>
                </defs>
                <polygon points="80,10 150,70 80,150" fill="url(#prismA)" opacity="0.9" />
                <polygon points="80,10 10,70 80,150" fill="url(#prismB)" opacity="0.75" />
                <polygon points="80,10 150,70 10,70" fill="#FFE7D2" opacity="0.9" />
              </svg>
              <span className="absolute top-1 -right-3 w-3 h-3 rounded-full bg-orange" />
              <span className="absolute bottom-0 left-2 w-2.5 h-2.5 bg-ink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
