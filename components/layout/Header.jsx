"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import AnimatedLogo from "@/components/shared/AnimatedLogo";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "What we do", href: "/services" },
  { label: "Who we are", href: "/about" },
  { label: "Our Works", href: "/portfolio" },
  { label: "B2B", href: "/portfolio" },
  { label: "B2C", href: "/portfolio" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-paper/95 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-24 flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(true)}
            className="w-11 h-11 rounded-full bg-surface-2 flex items-center justify-center"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

    <Link
  href="/"
  className="flex items-center"
  style={{ marginLeft: "-80px" }}
>
  <AnimatedLogo
    className="h-7 md:h-8 w-auto"
    showTagline={false}
  />
</Link>

          <nav className="hidden md:flex items-center gap-9 text-[15px] font-bold font-headline text-ink">
            {LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-orange transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <Link href="/contact" className="inline-flex btn-primary text-sm py-3 px-6">
            Contact us
          </Link>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
