# Imagenie — Next.js Platform

Full-stack Next.js 15 (App Router) build for Imagenie: a public marketing
site plus an admin dashboard, backed by Prisma.

See **`BLUEPRINT.md`** first — a one-page map of the whole project,
including how to add SVGs/icons. Start there.

See **`TRAINING-GUIDE.md`** for a hands-on, guided walkthrough if you're
new to editing this site (do it once, in order).

See **`EDITING-GUIDE.md`** for the full reference to come back to later —
every section mapped to its file, the CRUD pattern, and what's not built
yet.

## Stack

Next.js 15 · React 19 · Tailwind CSS 4 · Prisma 7 (SQLite by default) ·
Zustand · Framer Motion · GSAP · Lenis · Swiper

## Getting started

```bash
npm install
npx prisma generate
npx prisma db push      # creates dev.db from the schema
npm run dev
```

Open http://localhost:3000 for the public site, http://localhost:3000/dashboard for the admin area.

> **Note:** `npx prisma generate` needs outbound internet access to download
> its query engine binary from `binaries.prisma.sh`. If you're behind a
> restrictive proxy/firewall, allow that host (or run this step somewhere
> with normal internet access, then bring the generated `node_modules/.prisma`
> folder with you).

## Project structure

```
app/
  (website)/         # public marketing site — own layout (Header/SideRails/Footer)
    page.jsx          # home
    about/, services/, portfolio/, careers/, blog/, blog/[slug]/, contact/
    privacy-policy/, terms/
  (dashboard)/        # admin area — separate layout, own sidebar nav
    dashboard/         # overview
    dashboard/users/, blogs/, services/, portfolio/, careers/, settings/
  api/                # route handlers, one folder per resource
    auth/login, auth/logout, users, blogs, blogs/[slug], services,
    portfolio, contact, upload, settings
  layout.js           # root layout — fonts, ThemeProvider, SmoothScroll only
  globals.css

components/
  layout/    Header, Footer, MobileMenu, SideRails
  home/      All homepage sections (Hero, WhoWeAre, OurWorks, Industries, ...)
  shared/    ThemeProvider, SmoothScroll, VideoModal
  ui/        ImageOrFallback (shared image/placeholder switcher) — add Button/Card/Modal/etc. here as the dashboard UI grows
  about/ services/ portfolio/ careers/ blog/ contact/  (empty — populate as those pages grow)

lib/          prisma.js (client singleton), db.js (re-export), auth.js, cloudinary.js,
              helpers.js, site-images.js (central image path config — see EDITING-GUIDE.md)
services/     one file per domain — business logic + validation, called by API routes
repositories/ one file per domain — the only layer that talks to Prisma directly
hooks/        useAuth, useTheme, useFetch
context/      AuthContext, ThemeContext
store/        authStore, appStore (Zustand)
utils/        constants, formatter, slugify, validation
types/        JSDoc typedefs (project is JS, not TS — see note below)
prisma/       schema.prisma, seed.js, migrations/ (created by prisma migrate)
public/images/  drop real photos/logos here — see public/images/README.md
middleware.js Route matcher scaffold for /dashboard/* — currently a no-op, see TODO inside
```

## What's fully wired vs. scaffolded

**Fully wired** (API route → service/db → Prisma → DB):
- `Contact` — public form (`app/(website)/contact`) posts to `/api/contact`
- `BlogPost` — list + detail (`/api/blogs`, `/api/blogs/[slug]`)
- `Users` — `GET /api/users` (list) and `POST /api/users` (create) both hit the DB for real
- `Services` — `GET /api/services` reads from the DB
- `Portfolio` — `GET /api/portfolio` reads from the DB

**Genuinely stubbed (return `501`), not implemented:**
- `POST /api/auth/login`, `POST /api/auth/logout` — no auth strategy chosen yet; see `lib/auth.js`
- `POST /api/upload` — no storage provider wired; see `lib/cloudinary.js`
- `PATCH /api/settings` — no Settings model yet, `GET` returns a hardcoded object
- `Services`/`Portfolio` write operations (POST/PATCH/DELETE) — read-only for now

Dashboard pages (`/dashboard/*`) are static shells with no data fetching yet.
`middleware.js` has no real auth check — every `/dashboard/*` route is
currently open. **Do not deploy this as-is** — see the TODO comment in
`middleware.js` for what to add once `lib/auth.js` has a real session
strategy.

## Images

All image sources live in one place: `lib/site-images.js`. Every slot
defaults to `null` (shows the current gradient/SVG placeholder) — set a
real `/images/...` path there to swap in a real photo, with no component
code to touch. Full instructions in `EDITING-GUIDE.md` §2.3.

## Database

Default datasource is SQLite (`prisma/schema.prisma`, `DATABASE_URL` in
`.env`) for zero-config local dev. Swap the `provider` in schema.prisma to
`postgresql` or `mysql` and point `DATABASE_URL` at a real database before
deploying.

```bash
npm run db:push      # sync schema to DB (no migration history — good for prototyping)
npm run db:migrate   # create a tracked migration (use this once schema stabilizes)
npm run db:seed       # run prisma/seed.js
npm run db:studio     # visual DB browser
```

## Notes on content

- Client logos default to text wordmarks, not reproductions of each
  company's actual logo — avoids trademark issues while keeping the
  layout intact. Add real logo image paths via `lib/site-images.js` if
  you have permission to use them.
- Hero/illustration graphics are original CSS/SVG, not licensed photography.
- The Industries section ships both layout options (list vs. hub diagram)
  behind a toggle so you can compare live — pick one and delete the other
  before shipping.
