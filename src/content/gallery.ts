/**
 * Photo slots for the house.
 *
 * ⚠  No real photography could be fetched (Booking.com and Instagram are
 *    unreachable from the build environment). Every slot below therefore has
 *    `src: null`, which renders a hand-drawn, on-brand SVG scene instead of an
 *    empty box — the layout is final and photo-ready.
 *
 *  To publish real photos:
 *    1. Drop the files into /public/images/gallery/ (JPG or WebP, ≥ 1600px wide).
 *    2. Set `src: '/images/gallery/<file>'` on the matching slot below.
 *    3. Keep the alt text, or improve it — it is read aloud by screen readers
 *       and indexed by search engines.
 */

export type Scene = 'ridge' | 'cabin' | 'interior' | 'terrace' | 'stove' | 'orchard';

export type Shot = {
  id: string;
  /** null → renders the illustrated placeholder for `scene`. */
  src: string | null;
  scene: Scene;
  alt: { ro: string; en: string };
  /**
   * Cell footprint in the gallery grid. The set below is chosen so the grid
   * tiles exactly at both 2 and 4 columns, with no ragged edge or hole.
   */
  size: 'feature' | 'wide' | 'square';
};

export const gallery: Shot[] = [
  {
    id: 'g1',
    src: null,
    scene: 'cabin',
    alt: {
      ro: 'Fațada căsuței din 1923, cu pereți văruiți și tâmplărie de lemn, văzută dinspre curte',
      en: 'The 1923 cottage seen from the yard, limewashed walls and timber joinery',
    },
    size: 'feature',
  },
  {
    id: 'g2',
    src: null,
    scene: 'ridge',
    alt: {
      ro: 'Creasta munților Făgăraș văzută de pe terasa casei, la răsărit',
      en: 'The Făgăraș ridge seen from the terrace at sunrise',
    },
    size: 'wide',
  },
  {
    id: 'g3',
    src: null,
    scene: 'interior',
    alt: {
      ro: 'Camera mare, cu grinzile originale de stejar lăsate la vedere',
      en: 'The main room, with the original oak beams left exposed',
    },
    size: 'square',
  },
  {
    id: 'g4',
    src: null,
    scene: 'terrace',
    alt: {
      ro: 'Terasa acoperită, cu masa lungă și barul de sub streașină',
      en: 'The covered terrace, with the long table and the bar under the eaves',
    },
    size: 'square',
  },
  {
    id: 'g5',
    src: null,
    scene: 'stove',
    alt: {
      ro: 'Soba cu lemne din camera mare, aprinsă seara',
      en: 'The wood stove in the main room, lit in the evening',
    },
    size: 'wide',
  },
  {
    id: 'g6',
    src: null,
    scene: 'orchard',
    alt: {
      ro: 'Grădina cu pomi fructiferi din spatele casei, în lumina de după-amiază',
      en: 'The orchard garden behind the house in afternoon light',
    },
    size: 'wide',
  },
];
