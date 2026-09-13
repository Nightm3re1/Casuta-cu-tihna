/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ⚠  PLACEHOLDER REVIEW CONTENT — REPLACE BEFORE GOING LIVE
 * ─────────────────────────────────────────────────────────────────────────────
 *  The build environment for this site had no network access to Booking.com or
 *  Instagram, so no genuine guest reviews could be retrieved. Nothing below is
 *  a real review by a real guest, and it must NOT be published as if it were.
 *
 *  To publish real reviews:
 *    1. Open the Booking.com extranet → Guest reviews (or the public listing).
 *    2. Replace each entry below with the real quote, first name, country and
 *       date, and set `placeholder: false`.
 *    3. Update `reviewSummary` with the real score and review count.
 *
 *  While ANY entry still has `placeholder: true`, a warning banner renders over
 *  the reviews section in development (never in production) — see
 *  src/components/Testimonials.tsx.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Review = {
  id: string;
  /** true = invented sample copy, not a real guest. */
  placeholder: boolean;
  quote: { ro: string; en: string };
  author: string;
  country: { ro: string; en: string };
  countryCode: string;
  stayed: { ro: string; en: string };
  score: number;
  source: 'Booking.com' | 'Airbnb' | 'Google' | 'Direct';
};

export const reviewSummary = {
  placeholder: true,
  score: 9.6,
  outOf: 10,
  count: 41,
  source: 'Booking.com',
  href: 'https://www.booking.com/Share-DvYKzY',
};

export const reviews: Review[] = [
  {
    id: 'r1',
    placeholder: true,
    quote: {
      ro: 'Am ajuns noaptea și n-am văzut nimic. Dimineața am deschis ușa terasei și era toată creasta acolo. Am stat o oră cu cafeaua în mână fără să zicem nimic.',
      en: 'We arrived at night and saw nothing. In the morning I opened the terrace door and the whole ridge was just there. We sat with our coffee for an hour without saying a word.',
    },
    author: 'Andreea',
    country: { ro: 'România', en: 'Romania' },
    countryCode: 'RO',
    stayed: { ro: 'Familie · 3 nopți', en: 'Family · 3 nights' },
    score: 10,
    source: 'Booking.com',
  },
  {
    id: 'r2',
    placeholder: true,
    quote: {
      ro: 'Casa e exact ca în poze, ceea ce nu se întâmplă des. Cele două băi au salvat dimineața pentru șase oameni care voiau toți pe munte la aceeași oră.',
      en: 'The house is exactly like the photos, which is rarer than it should be. The two bathrooms saved the morning for six people who all wanted to be on the mountain at the same time.',
    },
    author: 'Tobias',
    country: { ro: 'Germania', en: 'Germany' },
    countryCode: 'DE',
    stayed: { ro: 'Grup de prieteni · 4 nopți', en: 'Group of friends · 4 nights' },
    score: 9,
    source: 'Booking.com',
  },
  {
    id: 'r3',
    placeholder: true,
    quote: {
      ro: 'Gazdele ne-au lăsat o listă scrisă de mână cu unde să mâncăm. Am mers la toate. Niciuna n-a dat greș. Ne întoarcem iarna, pentru sobă.',
      en: 'The hosts left us a handwritten list of where to eat. We went to all of them. Not one was a miss. We’re coming back in winter, for the stove.',
    },
    author: 'Ioana & Radu',
    country: { ro: 'România', en: 'Romania' },
    countryCode: 'RO',
    stayed: { ro: 'Cuplu · 2 nopți', en: 'Couple · 2 nights' },
    score: 10,
    source: 'Airbnb',
  },
  {
    id: 'r4',
    placeholder: true,
    quote: {
      ro: 'Am lucrat de aici o săptămână. Internetul a ținut fără o singură întrerupere, iar la 17:00 închideam laptopul și ieșeam la grătar. Cel mai bun birou pe care l-am avut.',
      en: 'I worked from here for a week. The internet held without a single drop, and at five I shut the laptop and went out to the grill. Best office I’ve had.',
    },
    author: 'Marta',
    country: { ro: 'Polonia', en: 'Poland' },
    countryCode: 'PL',
    stayed: { ro: 'Călător singur · 7 nopți', en: 'Solo traveller · 7 nights' },
    score: 10,
    source: 'Booking.com',
  },
  {
    id: 'r5',
    placeholder: true,
    quote: {
      ro: 'Liniștea e reală, nu de brosură. Ultima casă de pe uliță, fără trafic. Singurul zgomot a fost un cocoș, la ora la care trebuia.',
      en: 'The quiet is real, not brochure quiet. Last house on the lane, no traffic. The only noise was a rooster, at exactly the hour it should have been.',
    },
    author: 'Jean-Luc',
    country: { ro: 'Franța', en: 'France' },
    countryCode: 'FR',
    stayed: { ro: 'Cuplu · 5 nopți', en: 'Couple · 5 nights' },
    score: 10,
    source: 'Booking.com',
  },
];

export const hasPlaceholderReviews = reviews.some((r) => r.placeholder) || reviewSummary.placeholder;
