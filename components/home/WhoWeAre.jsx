import { ArrowUpRight, User } from "lucide-react";
import ImageOrFallback from "@/components/ui/ImageOrFallback";
import { siteImages } from "@/lib/site-images";

/**
 * Renders a real photo (from lib/site-images.js) if one is set, otherwise
 * falls back to a gradient circle with a person icon — no photo needed to
 * ship this section, and no code change needed to add one later.
 */
function PhotoCircle({ size, className = "", gradient, imageSrc, alt = "" }) {
  return (
    <div className={`relative rounded-full overflow-hidden border-4 border-white shadow-lg ${className}`} style={{ width: size, height: size }}>
      <ImageOrFallback
        src={imageSrc}
        alt={alt}
        className="object-cover"
        fallback={
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: gradient }}
          >
            <User size={size * 0.32} className="text-white/70" strokeWidth={1.5} />
          </div>
        }
      />
    </div>
  );
}

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-headline font-extrabold text-4xl md:text-[3rem] leading-[1.1]">
            <span className="text-orange">Where Strategy Meets</span>
            <br />
            Creativity.
          </h2>
          <p className="mt-6 text-stone text-[15.5px] leading-relaxed max-w-md">
            Growth begins with clarity. We combine strategic thinking, creative
            excellence, and digital innovation to help businesses build
            stronger brands, create meaningful customer experiences, and
            achieve sustainable growth.
          </p>
          <a href="#contact" className="btn-primary mt-8">
            <ArrowUpRight size={17} /> More info
          </a>
        </div>

        {/* Circular photo collage */}
      {/* ================= RIGHT IMAGE COLLAGE ================= */}
<div className="relative h-[620px] w-full">

  {/* Soft Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,150,0,.08),transparent_70%)]" />

  {/* Top Left Small Image */}
  <PhotoCircle
    size={165}
    className="absolute top-2 left-[180px] ring-4 ring-orange/30 shadow-2xl"
    gradient="linear-gradient(135deg,#6B6560,#3A342E)"
    imageSrc={siteImages.team.photoSmallTop}
    alt=""
  />

  {/* Top Right Small Image */}
  <PhotoCircle
    size={165}
    className="absolute top-2 right-6 ring-4 ring-orange/30 shadow-2xl"
    gradient="linear-gradient(135deg,#FFC57A,#FF9600)"
    imageSrc={siteImages.team.photoSmallLeft}
    alt=""
  />

  {/* Large Bottom Image */}
  <PhotoCircle
    size={310}
    className="absolute bottom-2 left-[110px] ring-[6px] ring-orange/30 shadow-[0_25px_60px_rgba(0,0,0,.18)]"
    gradient="linear-gradient(135deg,#4B4239,#241E1A)"
    imageSrc={siteImages.team.photoLarge}
    alt=""
  />

  {/* Right Medium Image */}
  <PhotoCircle
    size={220}
    className="absolute right-2 top-[180px] ring-[6px] ring-orange/30 shadow-[0_20px_40px_rgba(0,0,0,.18)]"
    gradient="linear-gradient(135deg,#FF9600,#E35800)"
    imageSrc={siteImages.team.photoOrange}
    alt=""
  />

  {/* Decorative Dark Circle */}
  <div className="absolute left-[330px] top-[250px] w-24 h-24 rounded-full bg-[#2F2F2F] opacity-90" />

  {/* Orange Ring */}
  <div className="absolute top-6 right-[65px] w-[210px] h-[210px] rounded-full border border-orange/40" />

  {/* Left Dot Grid */}
  <div className="absolute left-[70px] top-[270px] grid grid-cols-5 gap-2 opacity-25">
    {Array.from({ length: 20 }).map((_, i) => (
      <span key={i} className="w-1 h-1 rounded-full bg-ink" />
    ))}
  </div>

  {/* Right Dot Grid */}
  <div className="absolute right-0 top-20 grid grid-cols-5 gap-2 opacity-20">
    {Array.from({ length: 25 }).map((_, i) => (
      <span key={i} className="w-1 h-1 rounded-full bg-orange" />
    ))}
  </div>

  {/* Orange Accent */}
  <span className="absolute left-[70px] top-[210px] w-4 h-4 rounded-full bg-orange shadow-xl" />

  {/* Black Accent */}
  <span className="absolute right-8 bottom-20 w-5 h-5 rounded-full bg-ink shadow-xl" />

  {/* Hexagons */}
  <svg
    className="absolute right-[120px] top-[270px] opacity-20"
    width="150"
    height="120"
  >
    {Array.from({ length: 12 }).map((_, i) => (
      <polygon
        key={i}
        points="10,0 20,5 20,15 10,20 0,15 0,5"
        stroke="#FF8A00"
        strokeWidth="1"
        fill="none"
        transform={`translate(${(i % 4) * 32},${Math.floor(i / 4) * 28})`}
      />
    ))}
  </svg>

  {/* Audio Bars */}
  <div className="absolute bottom-4 right-2 flex items-end gap-1 h-24">
    {[18,30,48,72,96,72,52,34,22].map((h,i)=>(
      <span
        key={i}
        className={`w-2 rounded-full ${i < 5 ? "bg-orange" : "bg-gray-300"}`}
        style={{ height: `${h}px` }}
      />
    ))}
  </div>

</div>
      </div>
    </section>
  );
}
