import manifest from '../../public/images/property/manifest.json';

/**
 * The property's own photography.
 *
 * The files are fetched from the owner's CDN and committed by
 * .github/workflows/fetch-photos.yml — see scripts/fetch-photos.mjs. Each slug
 * has AVIF and WebP at 640/1024/1536, plus a blur placeholder in the manifest.
 *
 * Alt text follows the descriptions the owner wrote for their own site.
 */
export type Slug =
  | 'exterior-fatada'
  | 'exterior-lateral'
  | 'gradina'
  | 'living'
  | 'dormitor'
  | 'bucatarie'
  | 'baie'
  | 'dus';

export type Shot = {
  id: Slug;
  alt: { ro: string; en: string };
  /** Cell footprint in the gallery grid — tiles exactly at 2 and 4 columns. */
  size: 'feature' | 'wide' | 'square';
};

type ManifestEntry = { width: number | null; height: number | null; blurDataURL: string };
const meta = manifest as Record<string, ManifestEntry>;

export const photoMeta = (slug: Slug) => meta[slug];

export const gallery: Shot[] = [
  {
    id: 'exterior-fatada',
    alt: {
      ro: 'Fațada exterioară a căsuței din 1923, cu elemente tradiționale și detalii rustice',
      en: 'The 1923 cottage’s front elevation, with traditional detailing and rustic timberwork',
    },
    size: 'feature',
  },
  {
    id: 'gradina',
    alt: {
      ro: 'Grădina casei, cu elemente rustice și armonie naturală',
      en: 'The garden, rustic and settled into its surroundings',
    },
    size: 'wide',
  },
  {
    id: 'living',
    alt: {
      ro: 'Living spațios cu mobilier rustic, șemineu și atmosferă caldă',
      en: 'The spacious living room — rustic furniture, a fireplace and a warm atmosphere',
    },
    size: 'square',
  },
  {
    id: 'bucatarie',
    alt: {
      ro: 'Bucătărie rustică complet utilată, cu plită electrică, cuptor și frigider',
      en: 'The fully equipped rustic kitchen, with electric hob, oven and fridge',
    },
    size: 'square',
  },
  {
    id: 'dormitor',
    alt: {
      ro: 'Dormitorul principal de la etaj, cu pat matrimonial și mobilier rustic',
      en: 'The main bedroom upstairs, with a double bed and rustic furniture',
    },
    size: 'wide',
  },
  {
    id: 'exterior-lateral',
    alt: {
      ro: 'Vedere laterală a casei, cu detalii rustice și armonie naturală',
      en: 'The cottage seen from the side, rustic detailing set against the landscape',
    },
    size: 'wide',
  },
];

/** Shots used outside the main grid. */
export const storyShot: Shot = {
  id: 'living',
  alt: {
    ro: 'Livingul de la parter, cu șemineul și bârnele originale',
    en: 'The ground-floor living room, with the fireplace and the original beams',
  },
  size: 'square',
};

export const ctaShot: Shot = {
  id: 'gradina',
  alt: { ro: '', en: '' },
  size: 'wide',
};

export const areaShot: Shot = {
  id: 'exterior-lateral',
  alt: {
    ro: 'Casa văzută dinspre grădină, cu creasta Făgărașului în fundal',
    en: 'The cottage from the garden, with the Făgăraș ridge behind',
  },
  size: 'wide',
};
