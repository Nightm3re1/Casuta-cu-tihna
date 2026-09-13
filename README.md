# Căsuța cu Tihnă — website

Marketing and direct-booking site for **Căsuța cu Tihnă**, a restored 1923 cottage
in Porumbacu de Sus, Sibiu County, at the foot of the Făgăraș mountains.

Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS.
Bilingual Romanian / English, statically prerendered.

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /ro
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint
```

---

## ⚠ Before you go live — three things to replace

The build machine for this site had **no network access to Booking.com or
Instagram**, so three pieces of real content could not be fetched. Everything is
wired up and waiting; each is a single-file change.

### 1. Guest reviews — `src/content/reviews.ts`

Every review is currently **placeholder copy, not a real guest**, and is marked
`placeholder: true`. Do not publish it as if it were real.

Replace each entry with the genuine quote, first name, country and date from your
Booking.com extranet, set `placeholder: false`, and update `reviewSummary` with
your actual score and review count.

Two safeguards are already in place until you do:

- A warning banner renders over the reviews section **in development only**.
- `aggregateRating` and `review` are **omitted from the structured data**
  (`src/lib/jsonld.ts`) while the data is flagged as placeholder — so the site
  never claims a rating to Google that it cannot back up.

### 2. Photographs — `src/content/gallery.ts`

Every slot has `src: null` and renders an original, on-brand **illustration** of
the right subject, so the layout is finished and photo-ready rather than full of
grey boxes.

To publish real photography:

1. Put the files in `public/images/gallery/` (JPG or WebP, at least 1600px wide).
2. Set `src: '/images/gallery/<file>'` on the matching slot.
3. Keep or improve the `alt` text — it is read aloud and indexed.

Nothing else changes: `next/image` takes over automatically, with AVIF/WebP
conversion and correct `sizes` already configured.

### 3. Brand mark and palette — see `BRAND.md`

The logo and colour palette were derived from the property itself, not copied
from the Instagram account (which was unreachable). `BRAND.md` explains exactly
where to paste the official values — the palette is one object, the mark is one
SVG.

### Also check before launch

`src/content/site.ts` holds the real phone number, email and WhatsApp link.
The placeholders there (`+40 745 000 000`, `rezervari@casuta-cu-tihna.ro`) must
be replaced with the working ones — they appear in the header, footer, booking
section and structured data.

---

## How it is put together

```
src/
  app/
    [locale]/
      layout.tsx            fonts, metadata, hreflang, header/footer shell
      page.tsx              section order, JSON-LD injection
      opengraph-image.tsx   build-time social share card (1200×630 PNG)
    sitemap.ts robots.ts icon.svg not-found.tsx
  components/               one file per section, plus shared primitives
  content/
    site.ts                 verifiable property facts + outbound links
    schema.ts               the shape both locale dictionaries must satisfy
    ro.ts / en.ts           all user-facing copy
    reviews.ts gallery.ts   review and photo data
  lib/
    i18n.ts                 dictionary lookup
    jsonld.ts               structured data, generated from content/
    observeOnce.ts          one shared IntersectionObserver for all reveals
```

**Content and code are separate.** No user-facing string lives in a component;
they all come from `src/content`. `Dict` in `schema.ts` is the contract, so a
string added to Romanian without an English counterpart is a type error.

**Structured data is generated from the same content the page renders**, so the
JSON-LD can never drift from what a visitor actually reads.

---

## The hero animation

`src/components/HeroBuildAnimation.tsx` — an architect's elevation of the cottage
that is set out, footed, framed, roofed and clad as you scroll, then resolves into
an evening render below the Făgăraș ridge.

- **Scroll-scrubbed**, not time-based. The sequence occupies the first 86% of a
  sticky track (`BUILD_SPAN`), leaving the finished house on screen for a beat
  before it releases. At an ordinary flick the whole build plays in well under
  five seconds.
- **Only `pathLength`, `opacity` and `transform` animate.** No layout is read or
  written, so it stays on the compositor — measured p95 frame time is ~20ms
  (50fps+) on a 4×-throttled mobile CPU.
- **One geometry object.** Everything — blueprint and render alike — derives from
  `G` at the top of the file, so moving a window moves it in both.
- **`prefers-reduced-motion` pins progress to 1**, which *is* the finished frame.
  Same markup, nothing in motion.

---

## Accessibility

Verified with `@axe-core/playwright` against WCAG 2.1 A and AA: **0 violations**
on Romanian desktop, English mobile, and mobile with the menu open.

- Skip link is the first tab stop.
- All text meets AA contrast (the palette in `tailwind.config.ts` was adjusted
  to get there — see `brass.600`).
- FAQ is built on `<details>`/`<summary>`, so it works without JavaScript.
- The reviews carousel is a focusable, labelled region, keyboard-scrollable.
- Mobile menu traps page scroll and closes on Escape.
- Scroll reveals are progressive enhancement — a `<noscript>` rule in the layout
  unhides everything when scripting is off.

## Performance

Measured against the production build:

| | Desktop | Mobile (4× CPU throttle) |
|---|---|---|
| LCP | ~380ms | ~670ms |
| CLS | 0.000 | 0.000 |
| Hero scroll, p95 frame | 18.9ms | 20.2ms |

Fonts are the largest asset at 199 kB (Fraunces + Inter, `latin` and `latin-ext`
for Romanian diacritics), down from 352 kB by loading only the three weights the
markup actually uses. First Load JS is 163 kB for the page.

## Booking flow

There is **no backend and no database** — deliberately. The enquiry form hands the
chosen dates straight to the owner's Booking.com listing as real query parameters
(`checkin`, `checkout`, `group_adults`), and the WhatsApp button pre-writes the
same enquiry in the visitor's language. Both reach a human, and there is nowhere
for a guest's details to sit and leak.

## Deployment

Static apart from nothing — both locales prerender at build time. Any Node host
or Vercel works with no configuration. Set the real domain in
`src/content/site.ts` (`domain`) and in `metadataBase` in `src/app/layout.tsx`;
canonical URLs, hreflang, the sitemap and robots.txt all follow from it.
