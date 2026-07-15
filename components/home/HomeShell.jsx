"use client";

import { useRef, useState } from "react";
import Hero from "./Hero";
import TestimonialVideo from "./TestimonialVideo";
import ClientLogos from "./ClientLogos";
import WhoWeAre from "./WhoWeAre";
import Partners from "./Partners";
import ApproachCards from "./ApproachCards";
import FourCapabilities from "./FourCapabilities";
import OurWorks from "./OurWorks";
import WorksShowcase from "./WorksShowcase";
import IndustriesSection from "./IndustriesSection";
import Testimonials from "./Testimonials";
import ContactCTA from "./ContactCTA";

/**
 * Composes the homepage's own sections. Page chrome (Header, SideRails,
 * Footer) is provided by app/(website)/layout.jsx, not here — this keeps
 * HomeShell reusable if the homepage is ever rendered somewhere else
 * (e.g. a preview route) without duplicating the site chrome.
 */
export default function HomeShell() {
  const [activeSlide, setActiveSlide] = useState(1);
  const swiperRef = useRef(null);

  const handleManualAdvance = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    // Deliberately NOT calling swiper.autoplay.stop() here — manual clicks
    // just jump ahead, autoplay keeps running on its normal timer.
    swiper.slideNext();
  };

  return (
    <>
      <Hero
        activeSlide={activeSlide}
        onSlideChange={setActiveSlide}
        onManualAdvance={handleManualAdvance}
        swiperRef={swiperRef}
      />
      <TestimonialVideo />
      <ClientLogos />
      <WhoWeAre />
      <Partners />
      <ApproachCards />
      <FourCapabilities />
      <OurWorks />
      <WorksShowcase />
      <IndustriesSection />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
