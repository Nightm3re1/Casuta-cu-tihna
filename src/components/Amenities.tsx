import Reveal from './Reveal';
import type { Dict } from '@/content/schema';

/** The full inventory, in four honest columns. */
export default function Amenities({ dict }: { dict: Dict }) {
  return (
    <section className="border-y border-stone/70 bg-linen py-24 md:py-32" aria-labelledby="amenities-title">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{dict.amenities.eyebrow}</p>
          <h2 id="amenities-title" className="mt-4 text-display-md font-semibold text-bark-900">
            {dict.amenities.title}
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-bark-700">{dict.amenities.lede}</p>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {dict.amenities.groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <h3 className="border-b border-stone pb-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-clay-600">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.92rem] leading-snug text-bark-700">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0 text-clay-500" aria-hidden="true">
                      <path d="M3 8.4l3.2 3.1L13 4.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-12 flex items-center gap-2.5 text-sm text-bark-600">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="shrink-0 text-clay-600" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 11v5.5M12 7.6v.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            {dict.amenities.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
