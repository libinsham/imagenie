# Imagenie Website — Editing & Content Guide

This is a practical reference for making changes to the site: editing text,
adding/replacing images, and adding or removing content through the
database (CRUD). No deep React knowledge required for most of this — just
find the file, make the change, save.

---

## 1. How the site is organized

```
app/(website)/     → public pages (URLs people visit)
app/(dashboard)/    → admin area at /dashboard
components/home/    → every homepage section, one file each
components/layout/  → header, footer, side rails, mobile menu
lib/ services/ repositories/ prisma/  → the database layer (see §3)
```

**Rule of thumb:** if you're changing *text or layout*, you're editing a
file in `components/`. If you're changing *data that should persist*
(blog posts, portfolio items, etc.), you're going through the database
(§3), not hardcoding it into a component.

---

## 2. Editing text and images

### 2.1 Text

Every homepage section is its own file. Open it, find the string in the
JSX, change it, save — the dev server (`npm run dev`) hot-reloads
automatically.

| Section on the page | File |
|---|---|
| Header nav / "Contact us" button | `components/layout/Header.jsx` |
| Hero headline / slider text | `components/home/HeroSlider.jsx` |
| Video/stats band (20 years+, 4.9/5) | `components/home/TestimonialVideo.jsx` |
| Client logo strip | `components/home/ClientLogos.jsx` |
| "Where Strategy Meets Creativity" | `components/home/WhoWeAre.jsx` |
| "Helping Businesses Grow" band | `components/home/Partners.jsx` |
| B2B / B2C cards | `components/home/ApproachCards.jsx` |
| Four Capabilities cards | `components/home/FourCapabilities.jsx` |
| Our Works portfolio grid | `components/home/OurWorks.jsx` |
| WORKS case-study slider (play button + two-photo slides) | `components/home/WorksShowcase.jsx` |
| Industries hub | `components/home/IndustriesOption2.jsx` |
| Testimonials | `components/home/Testimonials.jsx` |
| Contact form | `components/home/ContactCTA.jsx` |
| Footer | `components/layout/Footer.jsx` |

**Example** — changing the hero headline:

```jsx
// components/home/HeroSlider.jsx
const SLIDES = [
  {
    heading: ["Building", "Brands That", "Lead Markets."], // ← edit these
    body: "We help ambitious businesses transform strategy into...", // ← and this
    variant: "strategy",
  },
  ...
];
```

### 2.2 Colors, fonts, spacing

These aren't hardcoded per-component — they're tokens in one place:

- **Colors & fonts:** `app/globals.css` — look for the `@theme` block
  (`--color-orange`, `--font-headline`, etc.)
- **Which Google Fonts are loaded:** `app/layout.js`, the `<link href="https://fonts.googleapis.com/...">` tag

Change the token once in `globals.css`, and every component using it
updates everywhere.

### 2.3 Adding / replacing images

The site is now set up so **you never need to touch component code to add
a photo.** Every image slot on the site is listed in one file:

```
lib/site-images.js
```

Each entry starts as `null`, which means "show the current placeholder
graphic." Set it to a real file path, and the real photo appears
everywhere that slot is used — no other file needs to change.

**Step 1 — drop your image file into the matching folder in `public/images/`:**

```
public/images/
  logos/          → client logo images
  team/           → Who We Are photo collage
  approach/       → B2B card portrait
  our-works/      → portfolio grid tiles
  testimonials/   → client avatar photos
  video/          → poster image / video file for the hero video
```

(There's a `README.md` inside `public/images/` with this same list.)

**Step 2 — open `lib/site-images.js` and set the path**, e.g.:

```js
team: {
  photoLarge: "/images/team/photo-1.jpg", // was: null
  photoOrange: null,                       // still showing placeholder
  ...
}
```

That's it — save, and the site shows your photo instead of the gradient
placeholder in that spot. No JSX, no imports, no hunting through
component files.

**If a slot doesn't exist for what you need** (e.g. you're adding a 7th
portfolio project), open the relevant component
(`components/home/OurWorks.jsx`, etc.), add a matching key to both the
component's data array and to `lib/site-images.js`, following the pattern
already there.

**The hero slider is a special case:** `hero.slide1` / `.slide2` /
`.slide3` in `lib/site-images.js` each control one slide. Unlike other
photo slots (which sit inside an existing layout), setting one of these
**replaces that slide's entire CSS/SVG illustration** — the floating
cards, play button, and shapes on the right of the hero — with your
photo, full-bleed. Leave a slide's slot `null` to keep showing the
illustration for that slide specifically; you can mix real photos and
illustrations across the 3 slides if you only have photos for some of
them.

**If you want a photo alongside the illustration instead of replacing
it**, that's a separate, third option: `heroIllustration.strategy` /
`.creative` / `.digital` (keyed by variant, same 3 names as the slides).
This shows your photo as a circular backdrop sitting *behind* the
floating cards/play button/stats box in `HeroIllustration.jsx`, so it
can't visually collide with them — look for the `🖼️ PHOTO GOES HERE`
comment banner near the top of that file to see exactly where it renders
and how to size it.

**Under the hood:** every image-capable spot uses a shared
`<ImageOrFallback>` component (`components/ui/ImageOrFallback.jsx`) that
renders the real photo via Next.js's `<Image>` if a path is set, or the
original placeholder if not. You don't need to touch this file — it's
what makes step 2 above "just work."

**Uploading images through the dashboard instead of by hand:**
`app/api/upload/route.js` is scaffolded for this (meant to connect to
Cloudinary — see `lib/cloudinary.js`) but isn't wired up yet. Until it is,
adding images means the two steps above.

### 2.4 Customizing look & feel

**Site-wide colors** — `app/globals.css`, inside the `@theme` block:

```css
--color-orange: #FF6A00;      /* brand accent — buttons, links, highlights */
--color-orange-soft: #FF9600; /* lighter accent variant */
--color-ink: #0F0D0C;         /* main text / dark backgrounds */
--color-paper: #FAF8F5;       /* main page background */
--color-stone: #6B6560;       /* secondary/muted text */
--color-surface: #FFFFFF;     /* card backgrounds */
--color-line: #E5E1DA;        /* borders/dividers */
```

Change one hex value here and it updates everywhere that token is used —
you never edit a color inside an individual component file.

**Fonts** — two files work together:

1. `app/layout.js` — the `<link href="https://fonts.googleapis.com/...">`
   tag. Swap the font name in that URL for a different Google Font.
2. `app/globals.css` — the `--font-headline`, `--font-body`,
   `--font-display` tokens. Point them at whatever font you loaded in
   step 1.

**Spacing / size on one specific element** — this isn't a global token,
it's a Tailwind utility class directly on that element, inside that
section's own component file. E.g. the hero headline's size is the
`text-[3.6rem]` class inside `components/home/HeroSlider.jsx`. Find the
section using the table in §2.1, then edit the class.

**Showing or hiding a whole section** — open
`components/home/HomeShell.jsx`. It's a plain list of every section on
the homepage, in order:

```jsx
<Hero ... />
<TestimonialVideo />
<ClientLogos />
<WhoWeAre />
<Partners />
<ApproachCards />
<FourCapabilities />
<OurWorks />
<IndustriesSection />
<Testimonials />
<ContactCTA />
```

Comment out a line (wrap it in `{/* ... */}`) to hide that section
without deleting it — uncomment to bring it back. Reorder the lines to
change the order sections appear on the page.

**Default light/dark mode** — `components/shared/ThemeProvider.jsx`, the
`useState(false)` on the first line. Change to `useState(true)` to have
the site load in dark mode by default.

**The genie-lamp cursor** — `components/shared/CustomCursor.jsx`. A small
lamp icon trails a step behind the real mouse pointer on desktop (it
doesn't replace the pointer — hiding the real cursor hurts usability).
To turn it off, remove `<CustomCursor />` from `app/layout.js`. To
restyle it (color, size, trail speed), the SVG paths and the
`useSpring(..., { damping, stiffness })` values are both right there in
that one file.

**The animated logo** — `components/shared/AnimatedLogo.jsx`. The real
"IMAGENIE" wordmark (from your brand SVG files), inlined as JSX rather
than a static image so GSAP can animate each letter individually — 7 ink
letters, the orange "G" swash, and the 16-letter "DESIGNING DESIRES"
tagline are all separately animatable. Idle and hover both use
**squash-and-stretch** (a classic animation principle, not a plain
up/down shake): each letter stretches as it jumps, squashes as it lands,
then settles with a springy elastic ease — one letter at a time, left to
right. Hover plays a bigger, faster version of the same wave across every
letter plus the tagline, with the orange G glowing brighter. Used in the
Header (compact, no tagline) and Footer (full lockup, with tagline).
Original source files are kept as-is in `public/brand/` for anything that
needs a plain static image (favicons, print, etc.) instead of the
animated version.

- `variant="ink"` (default) — letters follow `var(--color-ink)`, so they
  automatically flip light/dark with the site's theme toggle
- `variant="white"` — letters are hardcoded white, for placing the logo
  on a permanently-dark background (like the mobile menu overlay)
- `showTagline={false}` — renders just the main word, cropped tighter,
  for small/compact placements
- `animate={false}` — renders statically with no motion at all

**Scroll animations (GSAP)** — `components/shared/ScrollReveal.jsx` wraps
a section (or a grid of cards) and fades/slides its contents into view as
you scroll to them, using GSAP's `ScrollTrigger` (the real npm package,
not a CDN script). Currently used on the Four Capabilities cards, the Our
Works grid, and the Testimonial cards — each set staggers in one item
after another rather than all at once. To add this effect to another
section, wrap its container in `<ScrollReveal stagger={0.12}>...</ScrollReveal>`
the same way. To remove the effect from a section, swap `<ScrollReveal>`
back to a plain `<div>`.

**B2B / B2C sliding-door cards** — `components/home/ApproachCards.jsx`.
Each card is three stacked layers: a full-bleed background photo, a
solid "door" panel on top (what you see by default, holding the
heading/copy/CTA), and a hidden "inside" layer with the same content
floating over the photo. Hovering slides the door panel off the card
(left for B2B, right for B2C, so the pair reads as two doors opening
outward) and fades the inside layer in a beat later. It's pure CSS
(Tailwind's `group`/`group-hover`), no JavaScript state involved.

Image paths for the two background photos are `approach.b2bPhoto` and
`approach.b2cPhoto` in `lib/site-images.js` (renamed from the old
`b2bPortrait` single-photo-in-a-corner setup, since the whole card
background is now a photo, not just a small graphic). To change the
door's copy or slide direction, edit the two `<DoorCard ... />` calls at
the bottom of the file — `slideDirectionClass` must always be a complete
literal string like `"group-hover:-translate-x-full"`, not built by
concatenating pieces together, or Tailwind won't generate the CSS for it.

**WORKS case-study slider** — `components/home/WorksShowcase.jsx`. A
separate, standalone section (not part of the Our Works grid above it) —
a manual-only slider, no autoplay, with prev/next arrows and a "Restart"
button (jumps back to the first slide) in the bottom-right corner. Each
slide has a play button (opens the same `VideoModal` used elsewhere), a
category tag, title, description, "Show Project" link, and a two-photo
collage — a back photo plus a front photo with a dark scrim and a large
decorative word behind it.

To add/remove/reorder slides, edit the `SLIDES` array at the top of the
file — each entry is `tag`, `title`, `description`, `imageKey` (must match
a key you add under `worksShowcase` in `lib/site-images.js`),
`wordTreatment` (the big faint background word), and fallback gradients
for when no real photo is set yet. There are 3 placeholder slides now —
replace their copy with real case studies whenever you're ready.

**Interactive Industries hub** — `components/home/IndustriesOption2.jsx`
(the only layout now — the old "Option 1 — List" alternative and its
toggle have been removed). Two things happen when you interact with an
industry's icon:

1. **Center swap** — clicking an icon swaps the center circle's content
   from the IMAGENIE logo to that industry's icon/title/description, with
   a crossfade. Click it again (or click the center circle itself) to go
   back to the logo. The clicked satellite also highlights (orange
   border, scales up) while the others dim slightly.
2. **Popup card** — hovering an icon shows a floating card with a photo,
   the industry's description, and a "See our services" link, positioned
   to whichever side of the hub that node sits on. Clicking pins the
   popup open (it gets a close button); clicking elsewhere in the diagram
   unpins it. Hovering a different icon while one is pinned previews the
   new one; moving your mouse away returns to showing the pinned one.

Popup photos come from `industries.technology`, `.professionalIt`,
`.government`, `.healthcare`, `.financial`, `.hospitality` in
`lib/site-images.js` — same pattern as everywhere else, gradient
placeholder until you set a real path. On mobile, tapping a row expands
the same photo+link content inline below it instead of a floating popup.

**Gradients and placeholder boxes** (the colored circles/tiles you see
before adding real photos) — these aren't something you turn on/off by
hand. They're the automatic fallback in `<ImageOrFallback>`: if the
matching slot in `lib/site-images.js` is `null`, the gradient/box shows;
set a real path, and it's replaced by your photo. Leaving a slot as
`null` forever is completely fine — the placeholder is designed to look
finished on its own, not like a "missing image" state.

---

## 3. CRUD — adding, editing, and removing database content

Some content (blog posts, portfolio items, services, careers, contact
submissions) lives in a real database via **Prisma**, not hardcoded in
components. This section is the blueprint for working with it.

### 3.0 The pattern, in one picture

```
API route (app/api/.../route.js)
      ↓ calls
Service (services/*.service.js)      — validation, business rules
      ↓ calls
Repository (repositories/*.repository.js) — the ONLY layer that talks to Prisma
      ↓ reads/writes
Database (via prisma/schema.prisma)
```

Every resource follows this same four-layer shape. Learn it once for
Blog (fully built), and you can copy it for anything else.

### 3.1 What's already fully working

| Resource | Create | Read | Update | Delete |
|---|---|---|---|---|
| **Contact submissions** | ✅ (public form) | — | — | — |
| **Blog posts** | — | ✅ (list + single) | — | — |
| **Users** | ✅ | ✅ | — | — |
| **Services** | — | ✅ | — | — |
| **Portfolio** | — | ✅ | — | — |

Blank cells aren't broken — they're just not built yet (see §3.4 for how
to add them).

### 3.2 Reading content (the simplest case)

To pull blog posts into a page, call the service from a server component:

```jsx
// app/(website)/blog/page.jsx
import { getPublishedPosts } from "@/services/blog.service";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### 3.3 Creating content (example: a new blog post)

**Option A — directly in the database** (fastest for one-off content):

```bash
npx prisma studio
```

This opens a visual database browser in your actual browser. Click into
the `BlogPost` table, hit "Add record," fill in the fields, save. No code
required.

**Option B — through the API** (what a real admin UI would call):

```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "5 Brand Strategy Mistakes to Avoid",
    "slug": "5-brand-strategy-mistakes",
    "excerpt": "A quick rundown of the errors we see most often.",
    "content": "Full article body here...",
    "authorId": "<a real user id from your Users table>",
    "status": "PUBLISHED"
  }'
```

*(Note: check `app/api/blogs/route.js` — if `POST` isn't implemented yet
for blogs specifically, follow the Users pattern in §3.4 to add it in
about 10 lines.)*

### 3.4 Adding Create/Update/Delete for a resource that doesn't have it yet

Worked example: adding **DELETE** for a portfolio item. The same three
steps apply to add Create, Update, or Delete for *any* resource.

**Step 1 — repository** (`repositories/portfolio.repository.js`):

```js
import { db } from "@/lib/db";

export async function deletePortfolioItem(id) {
  return db.portfolioItem.delete({ where: { id } });
}
```

**Step 2 — service** (`services/portfolio.service.js`):

```js
import { deletePortfolioItem as deleteItem } from "@/repositories/portfolio.repository";

export async function removePortfolioItem(id) {
  if (!id) throw new Error("An id is required.");
  return deleteItem(id);
}
```

**Step 3 — API route** (`app/api/portfolio/route.js` or a new
`app/api/portfolio/[id]/route.js`):

```js
import { removePortfolioItem } from "@/services/portfolio.service";
import { jsonResponse, errorResponse } from "@/lib/helpers";

export async function DELETE(request, { params }) {
  try {
    await removePortfolioItem(params.id);
    return jsonResponse({ success: true });
  } catch (err) {
    return errorResponse(err.message, 400);
  }
}
```

That's the whole pattern. Copy it for `PATCH` (update) or `POST` (create)
on any of the currently read-only resources (Services, Portfolio) or the
currently-stubbed ones (Careers has a database model but no API route at
all yet — you'd create `app/api/careers/route.js` from scratch using this
same shape).

### 3.5 Removing content

- **One record** (e.g. delete a single blog post): use Prisma Studio
  (`npx prisma studio`) and delete the row — no code needed. Or call a
  `DELETE` endpoint once it exists (§3.4).
- **An entire content type** (e.g. you decide you'll never use Careers):
  you can leave the unused Prisma model in place harmlessly, or remove it
  from `prisma/schema.prisma` and run `npx prisma db push` to drop the
  table. Only do this if you're sure — it deletes the table and its data.
- **A homepage section** (not database content — a whole visual block
  like "Four Capabilities"): open `components/home/HomeShell.jsx` and
  delete the corresponding `<FourCapabilities />` line. The component
  file can stay on disk unused, or you can delete it entirely.

### 3.6 Changing the database schema itself

If you need a new field (say, `featured: Boolean` on `PortfolioItem`):

1. Edit `prisma/schema.prisma`, add the field to the model
2. Run `npx prisma db push` (dev/prototyping) or `npx prisma migrate dev` (once schema is stable and you want tracked migration history)
3. Run `npx prisma generate` so the Prisma client's types match
4. Use the new field in your repository/service/route as normal

---

## 4. Quick reference — common tasks

| I want to... | Do this |
|---|---|
| Change a headline or paragraph | Edit the relevant file in `components/home/` |
| Change a color site-wide | Edit the token in `app/globals.css` |
| Add a real photo | Drop file in `public/images/`, use `<Image>` in the component |
| Add a blog post | `npx prisma studio` → add a row, or build the `POST` route (§3.4) |
| Remove a blog post | `npx prisma studio` → delete the row |
| Add Create/Update/Delete to a resource | Follow the 3-file pattern in §3.4 |
| Remove a whole homepage section | Delete its line from `components/home/HomeShell.jsx` |
| See the database visually | `npx prisma studio` |

---

## 5. Things that are NOT built yet (be aware before relying on them)

- **Dashboard pages** (`/dashboard/*`) are visual shells only — they don't
  fetch or display real data yet. Wiring them up means calling the
  relevant service inside each dashboard page component (same pattern as
  §3.2).
- **Auth/login** is not implemented — `/dashboard` is currently open to
  anyone who knows the URL. Do not put this live on the internet until
  `lib/auth.js` and `middleware.js` have real logic (both have TODO
  comments marking exactly where).
- **Image upload via the dashboard** isn't wired up — use the manual
  `public/images/` method in §2.3 for now.
