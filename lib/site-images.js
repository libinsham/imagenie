/**
 * SITE IMAGES — the one file to edit to add real photos/logos to the site.
 *
 * How to use:
 *   1. Drop your image file into public/images/... (create subfolders as
 *      needed — they match the section names below).
 *   2. Set the matching value here to that path, e.g.:
 *        headOfMarketing: "/images/testimonials/head-of-marketing.jpg"
 *   3. Save. The site automatically shows your photo instead of the
 *      gradient placeholder — no other file needs to change.
 *
 * Leave a value as `null` to keep the current placeholder graphic.
 * Paths are relative to /public, always starting with a leading slash.
 */

export const siteImages = {
  // Hero slider (components/home/HeroSlider.jsx) — one photo per slide.
  // If set, the photo REPLACES that slide's CSS/SVG illustration entirely.
  // Leave null to keep showing the illustration for that slide.
  hero: {
    slide1: null,
    slide2: null,
    slide3: null,
  },

  // ============================================================
  // 🖼️ HERO ILLUSTRATION PHOTO (components/home/HeroIllustration.jsx)
  // This is DIFFERENT from `hero` above — this one sits INSIDE the
  // illustration as a backdrop photo, behind the floating "Growth
  // Overview" card / play button / stats box, instead of replacing
  // the whole illustration. Keyed by variant ("strategy" / "creative"
  // / "digital"), same 3 names used by each hero slide.
  // ============================================================
 
   heroIllustration: {
  strategy: "/images/hero/ai-png.png",
  creative: "/images/hero/ai-png.png",
  digital: "/images/hero/ai-png.png",

  },

  // Client logo strip (components/home/ClientLogos.jsx)
  // Currently rendered as text wordmarks. Add a path to show a real logo
  // image instead for that one client.
  clientLogos: {
    accenture: null,
    schneiderElectric: null,
    pwc: null,
    dhl: null,
    google: null,
    microsoft: null,
  },

  // "Where Strategy Meets Creativity" photo collage (components/home/WhoWeAre.jsx)
team: {
  photoLarge: "/images/team/team-main.png",
  photoOrange: "/images/team/team-right.png",
  photoSmallTop: "/images/team/team-top-left.png",
  photoSmallLeft: "/images/team/team-top-right.png",
},

  // B2B / B2C sliding-door cards (components/home/ApproachCards.jsx)
  // These are now full-bleed background photos behind a sliding dark
  // panel, not small corner graphics — see the component for how the
  // hover reveal works.
  approach: {
    b2bPhoto: null,
    b2cPhoto: null,
  },

  // Our Works portfolio grid (components/home/OurWorks.jsx)
  // Keys match each project's title — add/remove entries if you add/remove
  // projects in OurWorks.jsx's PROJECTS array.
ourWorks: {
  featured: "/images/portfolio/spatial-flow.jpg",

  project1: "/images/portfolio/interior.jpg",

  project2: "/images/portfolio/mobile-app.jpg",

  project3: "/images/portfolio/credit-card.jpg",

  project4: "/portfolio/branding.jpg",

  project5: "/portfolio/mockup.jpg",

  project6: "/portfolio/identity.jpg",

},

services: {
  b2b: "/images/services/b2b.jpg",
  b2c: "/images/services/b2c.jpg",
},

  // Works showcase slider — the standalone "WORKS" section with a play
  // button and two overlapping photos per slide (components/home/WorksShowcase.jsx)
  // Each slide has a back photo (full-bleed) and a front photo (overlapping,
  // with a dark scrim + decorative word treatment).
  worksShowcase: {
    slide1: { photoBack: null, photoFront: null },
    slide2: { photoBack: null, photoFront: null },
    slide3: { photoBack: null, photoFront: null },
  },

  // Industries hub — the photo shown in the hover/click popup for each
  // industry (components/home/IndustriesOption2.jsx)
  industries: {
    technology: null,
    professionalIt: null,
    government: null,
    healthcare: null,
    financial: null,
    hospitality: null,
  },

  // Testimonial avatars (components/home/Testimonials.jsx)
  // Currently shown as initials in a colored circle.
  testimonials: {
    headOfMarketing: null,
    vpSales: null,
    founder: null,
  },

  // Video/stats band right after the hero (components/home/TestimonialVideo.jsx)
  testimonialVideo: {
    posterImage: null, // still image shown behind the play button
    videoSrc: null, // replaces the placeholder MDN sample video
  },


  approach: {
  b2bPhoto: "/images/approach/b2b.jpg",
  b2cPhoto: "/images/approach/b2c.jpg",
},


};
