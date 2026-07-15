import { ArrowRight } from "lucide-react";
import ImageOrFallback from "@/components/ui/ImageOrFallback";
import { siteImages } from "@/lib/site-images";

/**
 * B2B / B2C sliding-door cards.
 *
 * Structure (bottom to top):
 *   1. Full-bleed background photo
 *   2. "Inside" text layer — hidden (opacity-0) until hovered, floats over
 *      the photo with a dark gradient scrim for legibility
 *   3. "Door" layer — the solid dark panel you see by default, holding the
 *      same heading/copy/CTA. On hover it slides off the card like a
 *      sliding door (translate-x-full), revealing the photo underneath;
 *      the "inside" layer fades in a beat later.
 *
 * Pure CSS (Tailwind group-hover), no JS state needed for the interaction.
 * The two cards slide in opposite directions so, side by side, they read
 * as a pair of doors opening outward from the center.
 */
function DoorCard({
  id,
  label,
  labelColorClass,
  description,
  descColorClass,
  imageSrc,
  imageAlt,
  photoFallbackGradient,
  doorBgClass,
  doorTextColorClass,
  slideDirectionClass, // "-translate-x-full" (B2B, slides left) or "translate-x-full" (B2C, slides right)
  ctaTextColorClass,
  ctaRingClass,
}) {
  return (
    <div className="group relative rounded-3xl overflow-hidden min-h-[300px]">
      {/* 1. background photo, always present underneath everything */}
      <ImageOrFallback
        src={imageSrc}
        alt={imageAlt}
        className="object-cover"
        fallback={<div className="absolute inset-0" style={{ background: photoFallbackGradient }} />}
      />

      {/* 2. inside layer — hidden until the door slides away */}
      <div className="absolute inset-0 flex flex-col justify-end p-9 opacity-0 translate-y-2 transition-all duration-500 delay-150 group-hover:opacity-100 group-hover:translate-y-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative">
          <h3 className={`font-headline font-extrabold text-3xl mb-3 ${labelColorClass}`}>{label}</h3>
          <p className="text-white/85 text-sm max-w-[280px] leading-relaxed">{description}</p>
          <a href="#our-works" className={`inline-flex items-center gap-2 text-sm font-medium mt-6 ${ctaTextColorClass}`}>
            See our services
            <span className={`w-8 h-8 rounded-full flex items-center justify-center ${ctaRingClass}`}>
              <ArrowRight size={14} />
            </span>
          </a>
        </div>
      </div>

      {/* 3. the door — solid panel visible by default, slides away on hover */}
      <div
        className={`absolute inset-0 flex flex-col justify-between p-9 transition-transform duration-500 ease-out ${slideDirectionClass} ${doorBgClass} ${doorTextColorClass}`}
      >
        <div>
          <h3 className={`font-headline font-extrabold text-3xl mb-4 ${labelColorClass}`}>{label}</h3>
          <p className={`text-sm max-w-[260px] leading-relaxed ${descColorClass}`}>{description}</p>
        </div>
        <a href="#our-works" className={`inline-flex items-center gap-2 text-sm font-medium mt-6 ${ctaTextColorClass}`}>
          See our services
          <span className={`w-8 h-8 rounded-full flex items-center justify-center ${ctaRingClass}`}>
            <ArrowRight size={14} />
          </span>
        </a>
      </div>
    </div>
  );
}

export default function ApproachCards() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-6">
        {/* ============================================================
            🖼️  PHOTOS GO HERE (2 of them — one per card)
            lib/site-images.js → approach.b2bPhoto / approach.b2cPhoto
           ============================================================ */}
        <DoorCard
          label="B2B"
          labelColorClass="text-orange"
          description="Supporting technology, SaaS, manufacturing, healthcare, financial services, government, and enterprise organizations."
          descColorClass="text-stone"
          imageSrc={siteImages.approach.b2bPhoto}
          imageAlt="B2B client meeting"
          photoFallbackGradient="linear-gradient(135deg, #4B4239, #241E1A)"
          doorBgClass="bg-ink"
          doorTextColorClass="text-white"
          slideDirectionClass="group-hover:-translate-x-full"
          ctaTextColorClass="text-white"
          ctaRingClass="bg-orange text-white"
        />

        <DoorCard
          label="B2C"
          labelColorClass="text-orange-soft"
          description="Helping consumer brands, retail, hospitality, lifestyle, and D2C businesses create memorable experiences that inspire trust and loyalty."
          descColorClass="text-white/65"
          imageSrc={siteImages.approach.b2cPhoto}
          imageAlt="B2C shopper"
          photoFallbackGradient="linear-gradient(135deg, #241E1A, #0F0D0C)"
          doorBgClass="bg-ink"
          doorTextColorClass="text-white"
          slideDirectionClass="group-hover:translate-x-full"
          ctaTextColorClass="text-white"
          ctaRingClass="border border-white/25"
        />
      </div>
    </section>
  );
}
