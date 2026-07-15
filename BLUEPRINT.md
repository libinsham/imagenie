# Imagenie Website — Blueprint

One page to orient yourself, then dig into `EDITING-GUIDE.md` (full
reference) or `TRAINING-GUIDE.md` (hands-on exercises) for depth. This
file is the map; those two are the detail.

---

## 🗺️ The five folders that matter

```
app/(website)/     → the public pages people visit (URLs)
app/(dashboard)/    → the admin area at /dashboard
components/home/    → every homepage section — one file each
components/layout/  → header, footer, side rails, mobile menu
components/shared/  → cross-cutting stuff: cursor, logo, theme, video modal
lib/site-images.js  → every photo on the site, in one place
```

**The rule that explains 90% of this codebase:** if it's *text or
layout*, edit a component file directly. If it's *data that should
persist* (blog posts, portfolio items), it goes through the database, not
hardcoded into a file — see `EDITING-GUIDE.md` §3 for that.

---

## ✏️ Editing text

Find the section on the live site → find its file below → edit the
string → save. Dev server hot-reloads automatically.

| Section | File |
|---|---|
| Header nav / logo | `components/layout/Header.jsx` |
| Hero headline + slides | `components/home/HeroSlider.jsx` |
| Video/stats band | `components/home/TestimonialVideo.jsx` |
| Client logos | `components/home/ClientLogos.jsx` |
| "Where Strategy Meets Creativity" | `components/home/WhoWeAre.jsx` |
| "Helping Businesses Grow" | `components/home/Partners.jsx` |
| B2B / B2C sliding-door cards | `components/home/ApproachCards.jsx` |
| Four Capabilities | `components/home/FourCapabilities.jsx` |
| Our Works grid | `components/home/OurWorks.jsx` |
| WORKS case-study slider | `components/home/WorksShowcase.jsx` |
| Industries hub | `components/home/IndustriesOption2.jsx` |
| Testimonials | `components/home/Testimonials.jsx` |
| Contact form | `components/home/ContactCTA.jsx` |
| Footer | `components/layout/Footer.jsx` |

---

## 🎨 Colors & fonts (site-wide, one place)

```css
/* app/globals.css, inside @theme */
--color-orange: #FF6A00;
--color-ink: #0F0D0C;
--color-paper: #FAF8F5;
--color-stone: #6B6560;
```

Change a hex value once here — it updates everywhere that token is used.
Never edit a color inside an individual component.

Fonts load from `app/layout.js` (the Google Fonts `<link>` tag) and get
named in `app/globals.css` (`--font-headline`, `--font-body`,
`--font-display`).

---

## 🖼️ Adding photos

**One file controls every photo on the site:** `lib/site-images.js`.
Every slot starts `null` (shows a gradient placeholder). To add a real
one:

1. Drop the file in the matching `public/images/<category>/` folder
2. Set the path in `lib/site-images.js`, e.g. `photoLarge: "/images/team/photo-1.jpg"`
3. Save — done. No component code to touch.

**Hero slider is a special case worth knowing about:** each of the 3
slides has a slot under `hero.slide1` / `.slide2` / `.slide3`. Setting
one **replaces that slide's whole CSS/SVG illustration with your photo**
— it's not a small inset image, it takes over the entire right-hand
visual. Leave it `null` to keep the illustration for that slide.

There's also `heroIllustration.strategy` / `.creative` / `.digital` —
different from the above. This one shows your photo as a circular
**backdrop behind** the floating cards/play button, keeping the
illustration's decorative elements instead of replacing them. Look for
the big `🖼️ PHOTO GOES HERE` comment block near the top of
`components/home/HeroIllustration.jsx` if you want to see exactly where
it renders.

Full details, including what to do if a slot doesn't exist yet, in
`EDITING-GUIDE.md` §2.3.

---

## 🔺 Adding SVGs

There are three different situations, and they call for three different
approaches — using the wrong one either wastes effort or loses you
animation capability you'll want later.

### Situation A — you just need an icon (arrow, play button, checkmark, etc.)

The whole site uses **lucide-react** for this (already installed). Don't
draw or paste anything — import the icon you need:

```jsx
import { ArrowRight } from "lucide-react";

<ArrowRight size={16} className="text-orange" />
```

Browse available icons at **lucide.dev** — search, copy the component
name, import it. This is how every arrow, play button, and UI icon on
the site already works (see any component in `components/home/` for
examples).

### Situation B — a one-off decorative shape (not from a design file)

Sometimes you just want a custom shape with no source file — e.g. the
faceted prism graphic in `components/home/Partners.jsx`. These are raw
`<svg>` markup pasted directly into the JSX:

```jsx
<svg viewBox="0 0 160 160" className="w-36 h-36">
  <polygon points="80,10 150,70 80,150" fill="#FF6A00" />
</svg>
```

Look at `Partners.jsx` (the prism) or `ApproachCards.jsx` (the B2C
crystal cube) for two working examples to copy and modify — change the
`points`/`d` coordinates and `fill` colors to reshape them.

### Situation C — you have a real SVG file (logo, custom icon set, illustration)

This is the important fork. You have two options, and which one you pick
depends on whether you want it to **animate**:

**Option 1 — Quick, static, no animation.** Just drop the file in
`public/` and reference it like any image:

```jsx
import Image from "next/image";
<Image src="/brand/my-icon.svg" alt="..." width={32} height={32} />
```

Good enough for anything that just sits there — a favicon, a one-off
illustration, a partner logo.

**Option 2 — Full animation control.** This is how
`components/shared/AnimatedLogo.jsx` was built from your two brand SVG
files (`imagenie_black_logo_svg_file-02.svg` / `imagenie_svg_white-01.svg`).
Instead of `<Image>`, you **inline the SVG's own `<path>` elements
directly as JSX**, so GSAP (or Framer Motion) can grab each shape
individually and animate it:

```jsx
<svg viewBox="0 0 527 110">
  <path ref={(el) => (myRefs.current[0] = el)} d="M18.81,75.3..." />
  <path ref={(el) => (myRefs.current[1] = el)} d="M131,68.29..." />
</svg>
```

Once each shape has its own `ref`, GSAP can target `myRefs.current[0]`
and animate it independently — that's the entire trick behind the
logo's letter-by-letter bounce.

**How to get from "I have an .svg file" to this:** open the file in a
text editor — SVGs are just XML/text. Each `<path d="...">` is one shape.
Copy those `d` attributes into JSX `<path>` tags the same way
`AnimatedLogo.jsx` does. If the file has 5 separate paths, you get 5
independently-animatable shapes; if it's one merged path, you get one.

**Rule of thumb:** if you're not sure which option you need — start with
Option 1 (static `<Image>`). Only go to Option 2 if you actually want
GSAP to animate individual parts of it. Converting a static SVG to
Option 2 later just means moving its `<path>` tags into a component, not
starting over.

---

## 🎬 Animation building blocks already in the project

If you're adding a new animated thing, don't start from scratch — copy
the pattern from whichever of these is closest to what you want:

| Want to... | Copy the pattern from |
|---|---|
| Fade/slide something in as it scrolls into view | `components/shared/ScrollReveal.jsx` |
| Animate individual letters/shapes of an SVG | `components/shared/AnimatedLogo.jsx` |
| A hover state that reveals hidden content | `components/home/ApproachCards.jsx` (sliding-door cards) |
| A cursor-following element | `components/shared/CustomCursor.jsx` |
| A modal/popup with enter-exit animation | `components/shared/VideoModal.jsx` |

---

## 👁️ Showing/hiding whole sections

`components/home/HomeShell.jsx` is a plain list of every homepage
section in order:

```jsx
<Hero ... />
<TestimonialVideo />
<ClientLogos />
<WhoWeAre />
...
```

Comment a line out (`{/* <ClientLogos /> */}`) to hide it, uncomment to
bring it back, reorder lines to reorder the page.

---

## 🗄️ Database content (blog posts, portfolio, etc.)

Full pattern and worked examples in `EDITING-GUIDE.md` §3 — the short
version:

```bash
npx prisma studio   # visual database editor, no code needed
```

For anything beyond simple add/edit/delete (like building a new API
endpoint), the four-layer pattern is: **API route → service →
repository → database**. Copy an existing resource's three files
(there's a full worked example for adding `DELETE` in §3.4 of the full
guide) rather than inventing your own shape.

---

## 🚧 Not built yet — don't assume these work

- Dashboard pages (`/dashboard/*`) show static shells, no real data yet
- No login/auth — `/dashboard` is open to anyone with the URL; **do not
  deploy publicly until this is fixed** (see TODOs in `lib/auth.js` and
  `middleware.js`)
- Image upload through the dashboard UI — use the manual `public/images/`
  method above for now
