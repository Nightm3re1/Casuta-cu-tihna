# Brand — Căsuța cu Tihnă

## Read this first

The brief asked for the logo and colour palette **exactly as they appear on the
Instagram account** (`@casuta_cu_tihna`). The build environment for this site had
no network route to instagram.com, booking.com, or the existing
casuta-cu-tihna.ro — all three are blocked by the network egress policy — so the
official mark and its exact hex values **could not be read**.

What is in the repository instead is a coherent identity derived from the
property itself: Făgăraș spruce, 1923 oak timber, limewashed plaster, and the
brass of old door furniture. It is deliberately built so that swapping in the
real values is a small, contained edit rather than a redesign.

---

## Swapping in the official palette

Every colour on the site resolves to a token in **`tailwind.config.ts`**. Nothing
else needs touching — no component hard-codes a hex value except the hero
animation's scene fills, listed at the end.

```ts
colors: {
  forest: { 50…950 },  // the dark ground: headers, dark sections, footer
  oak:    { 100…700 }, // timber, warm mid-tones
  brass:  { 300…600 }, // the accent — every primary CTA
  ember:  '#B85C38',   // errors only
  cream:  '#FAF6EE',   // page background
  linen:  '#F1E9DA',   // alternating section background
  stone:  '#D9CDB8',   // hairlines and borders
  ink:    '#15120F',   // body text
}
```

### Two rules to keep when you replace them

1. **Keep the light/dark relationship.** `forest.900`/`forest.950` are backgrounds
   that `cream` text sits on; `brass.500` is a button fill that `forest.950` text
   sits on. Swap families wholesale, not individual steps.

2. **Re-check contrast.** The current values pass WCAG AA everywhere, and getting
   there required darkening `brass.600` from `#9E7430` to `#856026` — the lighter
   value failed at 3.9:1 against cream for the small uppercase eyebrow labels. If
   the official brass is lighter, either darken it for small text or raise those
   labels above 18.66px.

   Re-run the check after any palette change:

   ```bash
   npm run build && npx next start -p 3000 &
   node <your-axe-script>   # see the audit script referenced in README
   ```

### Current values, for reference

| Token | Hex | Used for |
|---|---|---|
| `forest.950` | `#0A120E` | Booking section, footer |
| `forest.900` | `#101C16` | Benefits, reviews |
| `forest.800` | `#18271E` | Logo tile, year plate |
| `brass.500` | `#BE8F3E` | Primary CTA fill |
| `brass.600` | `#856026` | Eyebrow labels on light (AA-tuned) |
| `brass.400`/`300` | `#D0A85E` / `#E0C287` | Accents on dark |
| `cream` | `#FAF6EE` | Page background |
| `linen` | `#F1E9DA` | Alternating sections |
| `stone` | `#D9CDB8` | Hairlines |
| `ink` | `#15120F` | Body text |

---

## Swapping in the official logo

The mark is drawn as inline SVG in **`src/components/Logo.tsx`** — a limewashed
arch (the shape of the cottage's window and door heads) with the gable roofline
and its round loft light set inside it.

It is vector, inherits `currentColor`, and is used at every size from favicon to
footer. **Replace only the `<svg>` body inside `LogoMark`** — every size, colour
and layout decision lives outside that function, so nothing else breaks.

Two other copies exist and should be updated to match:

- `src/app/icon.svg` — favicon (the mark on a `forest.800` tile).
- `src/app/[locale]/opengraph-image.tsx` — the social share card.

If the official logo is a raster file, put it in `public/`, and in `Logo.tsx`
swap the `<svg>` for `next/image`. Keep the `LogoMark`/`Logo` split so the
wordmark lockup and its responsive behaviour survive.

---

## Typography

- **Display — Fraunces.** A high-contrast serif with genuine character in its
  italics and terminals; carries the heritage of a 1923 house without looking
  like a pastiche. Weights 400/500/600.
- **Body — Inter.** Chosen for its Romanian diacritics: `ă â î ș ț` are correctly
  drawn rather than composed, which many geometric sans faces get wrong.
  Weights 400/500/600.

Both are self-hosted through `next/font/google` (no request to Google at
runtime), with `display: swap` and no layout shift — measured CLS is 0.000.

Only the weights listed above are loaded. **If you use a new weight in markup,
add it to the font config in `src/app/[locale]/layout.tsx`**, or the browser will
synthesise it and it will look wrong.

---

## Hard-coded colours in the hero animation

`src/components/HeroBuildAnimation.tsx` is a drawing, not UI, so its scene fills
are literal values rather than tokens. If the palette changes substantially,
these are the ones to revisit:

| Constant / fill | Value | What it is |
|---|---|---|
| `INK` | `#C2E2CE` | Draughting lines |
| `GUIDE` | `#6F9A83` | Grid, dimensions, title block |
| `wallFill` | `#F3EADA` → `#D6C3A6` | Limewashed walls |
| `roofFill` | `#3C3028` → `#221B16` | Roof |
| `glowFill` | `#FFDA8E` → `#DFA349` | Lit windows |
| `ridgeFill` | `#2E3C3C` → `#16211C` | The Făgăraș behind |

The same applies to the illustrated photo placeholders in
`src/components/Photo.tsx` — though those disappear entirely once real
photographs are dropped into `src/content/gallery.ts`.
