import Reveal from './Reveal';
import type { Dict } from '@/content/schema';

const ICONS = [
  // whole house
  'M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10M10 19.5v-6h4v6',
  // two bathrooms
  'M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3ZM7 12V6a2 2 0 0 1 4 0',
  // ridge view
  'M2 18 8.5 8l4.5 6.5L16 10l6 8H2Z',
  // kitchen
  'M7 3v8m0 0a3 3 0 0 0 3-3V3M7 11v10M17 3c-1.5 1.5-2 3.5-2 5.5S16 12 17 12v9',
  // grill and bar
  'M12 3v4m-6 4h12l-2.5 8h-7L6 11Zm3 12-1 3m5-3 1 3',
  // parking
  'M4 17V9.5A2.5 2.5 0 0 1 6.5 7h11A2.5 2.5 0 0 1 20 9.5V17M4 17h16M4 17v2.5M20 17v2.5M7.5 12.5h9',
];

/** Six reasons, each a countable fact rather than an adjective. */
export default function Benefits({ dict }: { dict: Dict }) {
  return (
    <section className="relative bg-bark-900 py-24 text-cream grain md:py-36" aria-labelledby="benefits-title">
      <div className="shell relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow !text-clay-300">{dict.benefits.eyebrow}</p>
          <h2 id="benefits-title" className="mt-4 text-display-lg font-semibold">
            {dict.benefits.title}
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-cream/70">{dict.benefits.lede}</p>
        </Reveal>

        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {dict.benefits.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 70}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-clay-500/35 text-clay-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d={ICONS[i % ICONS.length]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-5 text-display-sm font-semibold">{item.title}</h3>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-cream/75">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
