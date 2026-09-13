import BookingForm from './BookingForm';
import Photo from './Photo';
import Reveal from './Reveal';
import { site, type Locale } from '@/content/site';
import { gallery } from '@/content/gallery';
import type { Dict } from '@/content/schema';

/** The close. Scarcity that happens to be true, then the shortest path to a date. */
export default function FinalCTA({ dict, locale }: { dict: Dict; locale: Locale }) {
  const shot = gallery.find((g) => g.scene === 'terrace')!;

  return (
    <section id="book" className="relative overflow-hidden bg-forest-950 py-24 text-cream md:py-32" aria-labelledby="book-title">
      {/* The terrace at dusk, held well back so the form stays legible. */}
      <div className="absolute inset-0 opacity-[0.22]">
        <Photo src={shot.src} scene="terrace" alt="" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_45%,rgba(10,18,14,0.72)_0%,#0A120E_78%)]" />

      <div className="shell relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow !text-brass-400">{dict.finalCta.eyebrow}</p>
          <h2 id="book-title" className="mt-4 text-display-lg font-semibold">
            {dict.finalCta.title}
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-cream/70">{dict.finalCta.lede}</p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-11 max-w-2xl">
          <div className="rounded-sm border border-cream/12 bg-cream/[0.04] p-6 backdrop-blur-sm md:p-8">
            <BookingForm locale={locale} tone="dark" />
          </div>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
            {dict.finalCta.reassure.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[0.82rem] text-cream/60">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-brass-400" aria-hidden="true">
                  <path d="M3 8.4l3.2 3.1L13 4.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center text-sm text-cream/65">
            <a href={site.contact.phoneHref} className="underline-offset-4 transition-colors hover:text-brass-300 hover:underline">
              {site.contact.phone}
            </a>
            <span className="mx-3 opacity-40">·</span>
            <a href={`mailto:${site.contact.email}`} className="underline-offset-4 transition-colors hover:text-brass-300 hover:underline">
              {site.contact.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
