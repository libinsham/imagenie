"use client";

import { Sun, Moon, Search, ChevronUp } from "lucide-react";
import { useTheme } from "@/components/shared/ThemeProvider";
import { useLenis } from "@/components/shared/SmoothScroll";

export default function SideRails() {
  const { dark, toggle } = useTheme();
  const { scrollToTop } = useLenis();

  return (
    <>
      {/* Left rail — fixed to viewport, persists across the whole page */}
      <div className="hidden lg:flex flex-col items-center gap-5 fixed left-6 top-1/2 -translate-y-1/2 z-40">
        <span className="font-headline text-[11px] font-bold tracking-widest text-stone">LIGHT</span>
        <button
          onClick={toggle}
          className="w-9 h-16 rounded-full border border-line bg-surface flex flex-col items-center justify-between py-2"
          aria-label="Toggle theme"
        >
          <Sun size={13} className={dark ? "text-stone" : "text-orange"} />
          <Moon size={13} className={dark ? "text-orange" : "text-stone"} />
        </button>
        <span className="font-headline text-[11px] font-bold tracking-widest text-stone">DARK</span>

        <span className="w-px h-14 bg-line my-1" />

        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex flex-col items-center gap-2 text-stone hover:text-orange transition-colors"
        >
          <span className="font-headline text-[11px] font-bold tracking-widest [writing-mode:vertical-rl]">
            Scroll to top
          </span>
          <ChevronUp size={14} />
        </button>

        <button className="w-10 h-10 rounded-full border border-line flex items-center justify-center hover:border-orange hover:text-orange transition-colors">
          <Search size={14} />
        </button>
      </div>

      {/* Right rail */}
      <div className="hidden lg:flex flex-col items-center gap-5 fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <span className="font-headline text-[11px] font-bold tracking-widest text-stone [writing-mode:vertical-rl] rotate-180">
          FOLLOW US
        </span>
        <span className="w-px h-14 bg-line" />
        <a href="#" aria-label="LinkedIn" className="text-xs font-semibold text-stone hover:text-orange transition-colors">
          in
        </a>
        <a href="#" aria-label="Instagram" className="text-stone hover:text-orange transition-colors">
          <span className="block w-4 h-4 rounded-[5px] border-[1.5px] border-current relative">
            <span className="absolute inset-[3px] rounded-full border-[1.5px] border-current" />
            <span className="absolute top-[1px] right-[1px] w-[3px] h-[3px] rounded-full bg-current" />
          </span>
        </a>
      </div>
    </>
  );
}
