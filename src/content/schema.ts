/** Shape shared by every locale dictionary, so RO and EN can never drift apart. */
export type Dict = {
  meta: { title: string; description: string; ogAlt: string };
  nav: { story: string; space: string; area: string; reviews: string; rates: string; faq: string; book: string; menu: string; close: string };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollHint: string;
    animationLabel: string;
    stats: { value: string; label: string }[];
  };
  trust: { intro: string; ratingLabel: string; items: string[] };
  story: { eyebrow: string; title: string; body: string[]; pull: string; signature: string; caption: string };
  benefits: { eyebrow: string; title: string; lede: string; items: { title: string; body: string }[] };
  space: { eyebrow: string; title: string; lede: string; specs: { label: string; value: string }[]; galleryCta: string };
  amenities: { eyebrow: string; title: string; lede: string; groups: { title: string; items: string[] }[]; note: string };
  area: { eyebrow: string; title: string; lede: string; items: { name: string; distance: string; body: string }[] };
  reviews: { eyebrow: string; title: string; lede: string; sourceLabel: string; verified: string; prev: string; next: string; goTo: string };
  rates: {
    eyebrow: string; title: string; lede: string;
    tiers: { name: string; period: string; price: string; unit: string; note: string; featured?: boolean }[];
    includedTitle: string; included: string[];
    fineprint: string[];
    cta: string; ctaNote: string;
  };
  faq: { eyebrow: string; title: string; lede: string; items: { q: string; a: string }[]; stillAsking: string; contactCta: string };
  finalCta: { eyebrow: string; title: string; lede: string; primary: string; secondary: string; reassure: string[] };
  footer: { blurb: string; nav: string; contact: string; book: string; rights: string; built: string; address: string };
  stickyBar: { label: string; cta: string };
  langSwitch: { label: string; ro: string; en: string };
  skipToContent: string;
};
