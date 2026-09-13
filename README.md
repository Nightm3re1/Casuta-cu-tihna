# Căsuța cu Tihnă — website

Direct-booking site for **Căsuța cu Tihnă**, a log cottage built in 1923 and
restored in 2021, in Porumbacu de Sus at the foot of the Făgăraș mountains.

Next.js 15 (App Router), React 19, TypeScript, Tailwind. Bilingual Romanian /
English, statically prerendered, no backend.

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /ro
npm run build
npm start
npm run typecheck
npm run lint
npm run photos     # re-fetch and re-optimise the property photography
```

## Everything on this site is real

There are no placeholders. All of it is sourced and traceable:

| Content | Source |
|---|---|
| Facts, rates, amenities, attractions | The owner's own site, casuta-cu-tihna.ro |
| Photography | The owner's CDN, fetched by `scripts/fetch-photos.mjs` |
| Reviews, 9.9/10 score, category sub-scores | The Booking.com listing |
| Colour palette | Sampled from the live casuta-cu-tihna.ro DOM |
| Typeface pairing | Playfair Display + Inter, as the brand already uses |

Key facts, all verified: sleeps **4**, ~80 m² over two floors, one bedroom
upstairs, **two bathrooms** (one per floor), **500 lei/night up to 2 guests and
700 up to 4** booked direct, check-in 15:00, check-out 11:00.

## Photography

`scripts/fetch-photos.mjs` downloads the eight property photographs from the
owner's CDN and writes AVIF + WebP at 640/1024/1536 into
`public/images/property/`, plus a `manifest.json` holding each image's real
dimensions, the widths actually produced, and an inline blur placeholder.

`.github/workflows/fetch-photos.yml` runs it on CI and commits the result, so
the binaries enter the repository without anyone hand-copying them. Re-run it
from the Actions tab whenever the owner replaces a photo.

`Photo.tsx` reads the manifest and emits a `<picture>` with an AVIF and a WebP
`srcset`. The files are pre-optimised, so **no runtime image transform sits in
the request path** — one fewer hop per image, and no per-request transform cost
on the host.

## The hero animation

`src/components/HeroBuildAnimation.tsx` — an architect's elevation of the
cottage that is set out, footed, framed, roofed and clad as you scroll, then
resolves into an evening render below the ridge.

- **Scroll-scrubbed**, not timed. The sequence occupies the first 86% of a
  sticky track (`BUILD_SPAN`), so the finished house holds on screen for a beat
  before it releases. An ordinary flick plays the whole build in under five
  seconds.
- **No animation library.** A ~70-line hook (`src/lib/useScrollProgress.ts`)
  runs a rAF loop that stops when the value settles and writes straight to the
  DOM by ref — a scroll never re-renders React. Dropping framer-motion took
  first-load JS from 159 kB to **115 kB**.
- **One geometry object.** Blueprint and render both derive from `G`, so they
  cannot disagree.
- **`prefers-reduced-motion`** pins progress to 1, which *is* the finished
  frame: same markup, nothing in motion.

## Architecture

```
src/
  app/[locale]/          layout (fonts, metadata, hreflang), page, OG image
  app/                   sitemap, robots, icon, 404
  components/            one file per section, plus shared primitives
  content/
    site.ts              verified property facts + outbound links
    schema.ts            the shape both locale dictionaries must satisfy
    ro.ts / en.ts        all user-facing copy
    reviews.ts           the real Booking.com reviews and scores
    gallery.ts           photo slots, typed against the manifest
  lib/
    i18n.ts              dictionary lookup
    jsonld.ts            structured data, generated from content/
    observeOnce.ts       one shared IntersectionObserver for all reveals
    useScrollProgress.ts the hero's scroll driver
scripts/fetch-photos.mjs
```

No user-facing string lives in a component. `Dict` in `schema.ts` is the
contract, so a string added to Romanian without an English counterpart is a
type error. The JSON-LD is generated from the same content the page renders,
so structured data cannot drift from what a visitor reads.

## Verified

- **Accessibility** — 0 axe violations (WCAG 2.1 AA) on RO desktop, EN mobile
  and mobile with the menu open. Skip link first in tab order; FAQ on
  `<details>` so it works without JS; keyboard-reachable review scroller; a
  `<noscript>` rule unhides every scroll reveal when scripting is off.
- **Interactions** — 18 automated checks: form validation, the real
  Booking.com URL with `checkin`/`checkout`/`group_adults`, WhatsApp prefill,
  FAQ, mobile menu + Escape, reduced motion, locale switching.
- **Performance** — LCP ~380 ms desktop / ~640 ms on a 4× throttled mobile CPU;
  **CLS 0.000**; hero scroll p95 ~20 ms. 115 kB first-load JS, 189 kB fonts.
- **Responsive** — no horizontal overflow at 320 / 768 / 2560 px.

## Booking flow

No backend by design. The enquiry form hands the chosen dates to the owner's
Booking.com listing as real query parameters, and the WhatsApp button
pre-writes the same enquiry in the visitor's language. Both reach a human, and
there is nowhere for a guest's details to sit.

## Deploying to Vercel

`vercel.json` is in place with the caching and security headers this site
wants. Pick one of:

1. **Connect the repo in the Vercel dashboard** (recommended). New Project →
   import `Nightm3re1/Casuta-cu-tihna` → framework auto-detects as Next.js →
   Deploy. Vercel then builds every push and gives preview URLs per branch.
   Delete `.github/workflows/deploy-vercel.yml` if you go this way.

2. **Deploy from CI.** Add repository secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`
   and `VERCEL_PROJECT_ID`; `.github/workflows/deploy-vercel.yml` then deploys
   on every push (production from `main`, previews elsewhere). It no-ops
   silently until those secrets exist.

Set the real domain in `src/content/site.ts` (`domain`) and in `metadataBase`
in `src/app/layout.tsx` — canonical URLs, hreflang, the sitemap and robots.txt
all follow from it.
