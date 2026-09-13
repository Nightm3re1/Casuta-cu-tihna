import Photo from './Photo';
import Reveal from './Reveal';
import { areaShot } from '@/content/gallery';
import type { Dict } from '@/content/schema';
import type { Locale } from '@/content/site';

/** What is within reach — distances, measured, not implied. */
export default function Area({ dict, locale }: { dict: Dict; locale: Locale }) {
  const shot = areaShot;

  return (
    <section id="area" className="py-24 md:py-36" aria-labelledby="area-title">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{dict.area.eyebrow}</p>
          <h2 id="area-title" className="mt-4 text-display-lg font-semibold text-bark-900">
            {dict.area.title}
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-bark-700">{dict.area.lede}</p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-linen lg:sticky lg:top-28">
              <Photo slug={shot.id} alt={shot.alt[locale]} sizes="(max-width: 1024px) 92vw, 40vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bark-950/90 to-transparent p-6 pt-16">
                <p className="font-display text-xl text-cream">Făgăraș</p>
                <p className="mt-1 text-sm text-cream/70">2.034 m · Bâlea</p>
              </div>
            </div>
          </Reveal>

          <ol className="relative">
            <span aria-hidden="true" className="absolute left-[4.5px] top-2 h-[calc(100%-1rem)] w-px bg-stone" />
            {dict.area.items.map((item, i) => (
              <Reveal as="li" key={item.name} delay={i * 60} className="relative pb-10 pl-8 last:pb-0">
                <span aria-hidden="true" className="absolute left-0 top-[7px] block h-2.5 w-2.5 rounded-full border-2 border-clay-500 bg-cream" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-display-sm font-semibold text-bark-900">{item.name}</h3>
                  <span className="rounded-full bg-bark-800/8 px-2.5 py-1 font-mono text-[0.72rem] font-semibold tracking-wide text-bark-700">
                    {item.distance}
                  </span>
                </div>
                <p className="mt-2.5 text-[0.94rem] leading-relaxed text-bark-600">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
