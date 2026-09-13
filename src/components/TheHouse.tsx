import Photo from './Photo';
import Reveal from './Reveal';
import { gallery } from '@/content/gallery';
import type { Dict } from '@/content/schema';
import type { Locale } from '@/content/site';

/**
 * Footprints on a 2-column (small) / 4-column (large) grid with fixed row
 * heights. Chosen so the six shots tile into a clean rectangle at both widths
 * rather than leaving the ragged edge an auto-flow masonry gives.
 */
const CELL: Record<string, string> = {
  feature: 'col-span-2 row-span-2',
  wide: 'col-span-2',
  square: 'col-span-1',
};

/** The house itself: hard specification alongside the pictures. */
export default function TheHouse({ dict, locale }: { dict: Dict; locale: Locale }) {
  return (
    <section id="house" className="py-24 md:py-36" aria-labelledby="house-title">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{dict.space.eyebrow}</p>
            <h2 id="house-title" className="mt-4 text-display-lg font-semibold text-bark-900">
              {dict.space.title}
            </h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-bark-700">{dict.space.lede}</p>
          </Reveal>

          <Reveal delay={100}>
            <dl className="grid grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-3 lg:grid-cols-2">
              {dict.space.specs.map((s) => (
                <div key={s.label} className="border-t border-stone pt-3">
                  <dt className="text-[0.66rem] uppercase tracking-[0.16em] text-bark-600">{s.label}</dt>
                  <dd className="mt-1 font-display text-lg font-medium text-bark-900">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={80} className="mt-16">
          <div className="grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] lg:auto-rows-[15rem] lg:grid-cols-4 lg:gap-4">
            {gallery.map((shot, i) => (
              <figure
                key={shot.id}
                className={`group relative overflow-hidden rounded-sm bg-linen ${CELL[shot.size]}`}
              >
                <Photo
                  slug={shot.id}
                  alt={shot.alt[locale]}
                  priority={i === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.04]"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-bark-950/85 to-transparent p-4 pt-10 text-[0.8rem] leading-snug text-cream opacity-0 transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
                  {shot.alt[locale]}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
