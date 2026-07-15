# Imagenie Website — Training Walkthrough

A guided, hands-on session for anyone new to editing this site. Do these
exercises in order, on your own machine, with the dev server running.
Each one takes a few minutes and teaches one skill you'll reuse constantly.

For a reference doc to search later (not a tutorial), see
`EDITING-GUIDE.md` instead — this file is for learning by doing, once.

---

## Before you start

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Open http://localhost:3000 in your browser and keep it open next to your
code editor. Every change below will appear on the page automatically
within a second or two of saving — no restart needed.

---

## Exercise 1 — Change a headline (5 min)

**Goal:** get comfortable finding a file and editing text.

1. Open `components/home/HeroSlider.jsx`
2. Find this near the top:
   ```jsx
   const SLIDES = [
     {
       heading: ["Building", "Brands That", "Lead Markets."],
       body: "We help ambitious businesses transform strategy into...",
       ...
   ```
3. Change `"Lead Markets."` to `"Lead Every Market."`
4. Save the file
5. Check your browser — the hero headline updated without a page reload

**What you just learned:** every visible section of the homepage is one
file under `components/home/`. Find the section → find the string →
edit → save.

---

## Exercise 2 — Add a real photo (10 min)

**Goal:** replace one of the gradient placeholders with an actual image.

1. Pick any image on your computer (a headshot, a logo, anything — this
   is just practice)
2. Save it into `public/images/team/` and name it `test-photo.jpg`
3. Open `lib/site-images.js`
4. Find:
   ```js
   team: {
     photoLarge: null,
     ...
   ```
5. Change it to:
   ```js
   team: {
     photoLarge: "/images/team/test-photo.jpg",
     ...
   ```
6. Save. Scroll to the "Where Strategy Meets Creativity" section on the
   page — the big circle that was a gradient is now your photo.
7. **Undo it** — set the value back to `null` and save, to leave the site
   as you found it.

**What you just learned:** all images route through one config file.
Nothing in the component code ever needs to change to add a photo.

---

## Exercise 3 — Add content through the database (10 min)

**Goal:** understand that some content (blog posts, etc.) lives in a
database, not in a component file — and how to add a row without writing
any code.

1. In a new terminal tab (keep `npm run dev` running in the other one), run:
   ```bash
   npx prisma studio
   ```
   This opens a database browser at http://localhost:5555.
2. Click on the **BlogPost** table in the left sidebar
3. Click **"Add record"**
4. Fill in:
   - `title`: "My First Test Post"
   - `slug`: "my-first-test-post"
   - `excerpt`: "Just testing things out."
   - `content`: "This is the body of the post."
   - `status`: `PUBLISHED`
   - `authorId`: (pick any existing User's id — if there are none yet, go
     add one in the **User** table first, the same way)
5. Save the record
6. Visit http://localhost:3000/blog in your browser — your post is there

**What you just learned:** Prisma Studio is a point-and-click database
editor. For content that changes often (blog posts, portfolio items),
this is usually faster than writing code — and it's exactly what a real
admin dashboard would do behind the scenes.

---

## Exercise 4 — Show/hide a whole section (5 min)

**Goal:** learn to add or remove entire sections from the homepage
without deleting any code.

1. Open `components/home/HomeShell.jsx`
2. Find the line `<ClientLogos />`
3. Wrap it in a comment: `{/* <ClientLogos /> */}`
4. Save — the client logo strip disappears from the homepage
5. Remove the comment markers to bring it back: `<ClientLogos />`
6. Save again — it's back

**What you just learned:** `HomeShell.jsx` is the master list of what
appears on the homepage and in what order. Commenting a line out hides
it; the actual component file is untouched, so nothing is lost.

---

## Exercise 5 — Change a site-wide color (5 min)

**Goal:** see how one color token affects the entire site at once,
instead of hunting through every component.

1. Open `app/globals.css`
2. Find `--color-orange: #FF6A00;`
3. Change it to `--color-orange: #0EA5E9;` (a blue, just to see the effect clearly)
4. Save — buttons, links, and accents across the *entire site* just changed color
5. Change it back to `#FF6A00` when you're done looking

**What you just learned:** colors are never hardcoded per-component —
they're centralized tokens. This is also true for fonts (see
`EDITING-GUIDE.md` §2.4).

---

## You now know the four core moves

| Task | Where |
|---|---|
| Edit text/layout | The matching file in `components/` |
| Add/replace an image | `lib/site-images.js` |
| Add/edit/remove data (blog posts, etc.) | `npx prisma studio`, or the API (see `EDITING-GUIDE.md` §3) |
| Change colors/fonts/section order | `app/globals.css` and `components/home/HomeShell.jsx` |

From here, `EDITING-GUIDE.md` is your reference for anything more
specific — a full file-by-file map, the CRUD pattern for building new
Create/Update/Delete endpoints, and a list of what's not built yet
(dashboard data-fetching, auth, image upload via UI) so you don't assume
something works before it's wired up.
