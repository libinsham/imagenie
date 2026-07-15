import HeroSlider from "./HeroSlider";

export default function Hero({ activeSlide, onSlideChange, onManualAdvance, swiperRef }) {
  return (
    <section id="hero" className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      {/* Slide indicator: intentionally NOT fixed — it scrolls away with the
          hero, unlike the light/dark + scroll-to-top rail which stays sticky. */}
      <button
        onClick={onManualAdvance}
        aria-label="Next slide"
        title="Click to go to next slide"
        className="hidden lg:flex absolute left-6 top-24 w-8 h-8 rounded-full border border-line items-center justify-center text-xs font-semibold hover:border-orange hover:text-orange transition-colors z-20"
      >
        {activeSlide}
      </button>

      <HeroSlider onSlideChange={onSlideChange} swiperRef={swiperRef} />
    </section>
  );
}
