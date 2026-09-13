# Brand — Căsuța cu Tihnă

The palette and typeface pairing below are **the brand's own**, read from the
live casuta-cu-tihna.ro DOM rather than invented. If the owner ever publishes a
formal brand guide that differs, this file is the one place to reconcile.

## Palette

Every colour resolves to a token in `tailwind.config.ts`. Values marked ◆ were
sampled directly from production.

| Token | Hex | Role |
|---|---|---|
| `clay.500` | `#7D5936` ◆ | The brand accent. Every primary CTA. |
| `clay.700` | `#563C29` ◆ | Deep brown |
| `clay.300` / `clay.200` | `#C4A078` / `#DFC9AB` | Accents on dark grounds |
| `bark.900` | `#2E251F` ◆ | Primary text; dark sections |
| `bark.600` | `#756357` ◆ | Muted body text |
| `bark.200` | `#E7E1DA` ◆ | Borders and hairlines |
| `cream` | `#FBFAF8` ◆ | Page background |
| `linen` | `#F5F3EF` ◆ | Light surface / text on dark |
| `sand` | `#F4F0EB` ◆ | Third surface |

Two rules when changing them:

1. **Keep the light/dark relationship.** `bark.900`/`bark.950` are backgrounds
   that `cream` text sits on; `clay.500` is a button fill that `cream` text sits
   on. Swap families wholesale, not individual steps.
2. **Re-check contrast.** The current values pass WCAG AA everywhere, and
   getting there required moving small text off `bark.500` onto `bark.600`, and
   putting `cream` rather than `bark.950` on the `clay.500` pill. Re-run the axe
   audit after any palette change.

## Typography

- **Display — Playfair Display.** The face the brand already uses. Weights
  400/500/600.
- **Body — Inter.** Chosen for its Romanian diacritics: `ă â î ș ț` are properly
  drawn rather than composed. Weights 400/500/600.

Both self-hosted via `next/font/google` (no runtime request to Google), with
`display: swap` and no layout shift — measured CLS is 0.000. Only those weights
are loaded; **if you use a new weight in markup, add it to the font config in
`src/app/[locale]/layout.tsx`** or the browser will synthesise it.

## The mark

`src/components/Logo.tsx` draws a limewashed arch — the shape of the cottage's
window and door heads — with the gable roofline and its round loft light inside
it. It is vector, inherits `currentColor`, and is used from favicon to footer.

Replace only the `<svg>` body inside `LogoMark`; every size, colour and layout
decision lives outside that function. Two other copies should be kept in step:
`src/app/icon.svg` (favicon) and `src/app/[locale]/opengraph-image.tsx` (share
card).

This mark was drawn for the site, not taken from the Instagram account — that
account was unreachable from the build environment. If the owner has an official
logo file, swapping it in is the one-file change described above.

## Hard-coded colours in the hero animation

`src/components/HeroBuildAnimation.tsx` is a drawing, not UI, so its scene fills
are literal. If the palette changes substantially, revisit:

| Constant / fill | Value | What it is |
|---|---|---|
| `INK` | `#EADDC8` | Draughting lines |
| `GUIDE` | `#A38B6B` | Grid, dimensions, title block |
| `wallFill` | `#D2A264` → `#9C6E3A` | Honey log walls |
| `roofFill` | `#2B221C` → `#171210` | Near-black shingle |
| `glowFill` | `#FFDA8E` → `#DFA349` | Lit windows |
| `ridgeFill` | `#6E7480` → `#3A3B3C` | The Făgăraș behind |
