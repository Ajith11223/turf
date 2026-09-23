# Gallant Sports — Next.js landing site (football-turf theme)

Next.js 15 App Router · Tailwind v4 · Framer Motion · Mongoose · JWT login.

## Run it

```bash
npm install
cp .env.example .env          # MONGODB_URI + JWT_SECRET
npm run seed                  # admin account + sample content into MongoDB
npm run dev                   # http://localhost:3000
```

`npm run seed` runs two scripts: `seed:admin` (the one login account) and
`seed:content` (pushes the services, projects and testimonials from `lib/site.js` into
MongoDB so the admin has something to edit). Re-running is safe — it upserts. Add
`--fresh` to `seed:content` to wipe the three collections first.

## Changing the images

Every photo on the site is referenced from **`lib/images.js`** — one file, nothing else
to hunt for. They currently point at picsum.photos sample photos so the site looks
finished out of the box.

To use your own:

1. Put files in `public/images/`.
2. In `lib/images.js`, change a value to `"/images/football-turf.jpg"`.
3. Local paths need no config; if you host photos elsewhere, add the hostname to
   `next.config.mjs` → `images.remotePatterns`.

What each slot wants:

| Key | Shoot / source |
|---|---|
| `hero` | Floodlit football turf, low angle, mowing stripes visible, landscape |
| `heroInset` | Close-up of turf fibres and infill, portrait |
| `services.*` | Crew at work: CAD screen, laser screed, factory line, seaming, LED mast, groomer |
| `projects.*` | Finished facilities, three-quarter or drone angle |
| `people.*` | Square headshots of the person quoted |
| `surfaces.*` | Flat-on texture of turf, track, tiles, vinyl |

## Colour theme

Defined once as Tailwind v4 tokens in `app/globals.css`:

| Token | Hex | Used for |
|---|---|---|
| white | `#ffffff` | page background |
| `chalk` | `#f4f8f1` | alternate section background |
| `turf` | `#14a44d` | buttons, links, accents |
| `lime` | `#9ede3f` | accents on dark green |
| `pitch` | `#063a1d` | dark sections, hero, footer |
| `ink` | `#0d1c14` | body text |
| `stone` | `#5f7268` | secondary text |
| `line` | `#dde8d9` | borders |

Change a hex in `@theme` and it updates everywhere. Two helper classes live there too:
`.turf-stripes` (mown-grass banding) and `.chalk-grid`.

## The hero animation

`components/Hero.js` layers six things, sequenced on page load:

1. Turf photo with a slow 6s Ken Burns push.
2. Ten mown stripes that wipe up from the ground one after another — the pitch being laid.
3. SVG pitch markings that draw themselves on (`pathLength` 0 → 1): touchline, halfway
   line, centre circle, then both penalty boxes.
4. A football that rolls across the pitch, spinning, and loops every 13 seconds.
5. Headline revealed word by word from behind a mask, plus a floating turf-spec card.
6. Partner ticker pinned to the bottom.

On scroll the whole field parallaxes down and scales while the copy lifts and fades.
Everything is disabled by `prefers-reduced-motion`.

## Header

Two behaviours in `components/Header.js`:

- **Hide / reveal** — scrolling down past 140px slides the bar out, scrolling up brings it
  back; past 24px it turns into a white blurred bar. On the home page it starts
  transparent with white text over the dark hero, then flips to dark text.
- **Menu modal** — the hamburger opens a `role="dialog"` overlay that wipes in with
  `clip-path`, staggers each link up from behind a mask over a turf backdrop, locks body
  scroll, and closes on Escape or route change.

## Pages

`/` home · `/services` · `/services/[slug]` (single service) · `/about` ·
`/testimonials` · `/contact` · `/login` · `/dashboard` (protected admin)

Service cards on the home and services pages link to the single-service page, which
renders the detail copy, deliverables and FAQs for that service.

Copy that is not yet in MongoDB lives in `lib/site.js`: surfaces, stats, process steps and
contact details, plus the fallback set of services, projects and testimonials.

## Schemas

`models/Service.js` — slug (unique), title, lead, body, detail, deliverables[], faqs[],
image, order, published.
`models/Project.js` — name, place, type, area, year, image, featured, order, published.
`models/Testimonial.js` — quote, name, role, sport, avatar, rating, order, published.
`models/Lead.js` — contact-form submission with a status workflow.
`models/User.js` — staff account, bcrypt hash, role.

## Modals

`components/Modal.js` exports the modal and the `CloseButton` used across the site. Every
dismissible surface — the header navigation overlay, the admin edit form and the delete
confirmation — has a visible close button, closes on Escape, and locks body scroll while
open. The header overlay additionally closes on the hamburger toggle and on route change.

## Editing content

Sign in at `/login`, then `/dashboard` has four tabs:

| Tab | Edits | Shows up on |
|---|---|---|
| Services | title, slug, summary, card text, detail copy, deliverables, image, order, published | `/services`, `/services/[slug]`, home |
| Project cards | name, place, what was built, area, year, image, featured, order | home marquee, about grid |
| Testimonials | quote, person, role, sport, photo, rating, order | slider + grid on home and `/testimonials` |
| Enquiries | status, and the contact details as submitted | contact form submissions |

Create, edit and delete all happen in a modal with a close button, Escape, and a
backdrop click. Deletes ask for confirmation first. Unpublished entries stay in the admin
but disappear from the public site.

Adding another editable collection means one entry in the `COLLECTIONS` object at the top
of `components/AdminPanel.js` plus the matching API route — the form fields, list rows and
modals are generated from that config.

## Content fetching, with a fallback

Public pages read content through `lib/content.js`, which calls the site's own API. If the
API errors, MongoDB is unreachable, or a collection is still empty, it returns the sample
data from `lib/site.js` instead, so nothing ever renders blank. The services pages show a
small "showing built-in sample content" note when that happens.

## API

| Method | Route | Auth |
|---|---|---|
| `POST` | `/api/auth/login` | public — sets httpOnly `gs_token` cookie |
| `POST` | `/api/auth/logout` | public |
| `GET` | `/api/auth/me` | cookie |
| `GET` | `/api/services` | public (`?all=1` includes drafts, needs a session) |
| `POST` | `/api/services` | cookie |
| `GET` `PATCH` `DELETE` | `/api/services/:slug` | GET public, rest cookie |
| `GET` | `/api/projects?limit=24&featured=1` | public (`?all=1` = drafts) |
| `POST` | `/api/projects` | cookie |
| `GET` `PATCH` `DELETE` | `/api/projects/:id` | GET public, rest cookie |
| `GET` | `/api/testimonials` | public (`?all=1` = drafts) |
| `POST` | `/api/testimonials` | cookie |
| `PATCH` `DELETE` | `/api/testimonials/:id` | cookie |
| `POST` | `/api/leads` | public — the contact form writes here |
| `GET` | `/api/leads?page=1&limit=20&status=new` | cookie |
| `PATCH` `DELETE` | `/api/leads/:id` | cookie |

```bash
curl -c jar.txt -X POST localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@gallant.test","password":"Admin@12345"}'

curl -b jar.txt localhost:3000/api/leads
```

## How auth is wired

- `lib/auth.js` signs and verifies HS256 tokens with **jose**, which runs on the edge —
  that is why `middleware.js` can check the session without a database call. Do not swap
  in `jsonwebtoken`; it will not run in edge middleware.
- httpOnly, sameSite=lax cookie, `secure` on automatically in production.
- bcrypt cost 12, hashed in the `User` model's `pre("save")` hook; the field is
  `select: false` so it never leaks from a normal query.
- Login returns the same message for an unknown email and a wrong password.
- `middleware.js` guards `/dashboard/**`; route handlers check the session again, because
  middleware alone is not authorization.
- No sign-up route by design. More staff accounts = re-run the seed with new values.

## MongoDB

`lib/mongodb.js` caches the Mongoose connection on `globalThis` so Next's dev hot-reload
does not open a new pool per request. Add a collection by dropping a schema in `models/`
and copying the shape of `app/api/leads/route.js`.

For Atlas: allow your IP under Network Access and put the database name in the URI path.

## Before going live

1. Real `JWT_SECRET` in the host's env, never committed.
2. Rate-limit `/api/auth/login`.
3. Replace the sample photos (see above) — picsum URLs are fine for a demo, not a launch.
4. Add your own favicon and OG image in `app/`.
5. Set `NEXT_PUBLIC_SITE_URL` so server-side content fetches use your real domain.
6. Consider adding image upload (S3, Cloudinary or UploadThing) — the admin takes image
   URLs today, which is deliberate but manual.
