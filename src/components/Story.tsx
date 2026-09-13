import Photo from './Photo';
import Reveal from './Reveal';
import type { Dict } from '@/content/schema';
import type { Locale } from '@/content/site';
import { gallery } from '@/content/gallery';

/** The origin story — the section that turns a rental into a place. */
export default function Story({ dict, locale }: { dict: Dict; locale: Locale }) {
  const shot = gallery.find((g) => g.scene === 'interior')!;

  return (
    <section id="story" className="relative overflow-hidden py-24 md:py-36" aria-labelledby="story-title">
      <div className="shell grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">{dict.story.eyebrow}</p>
          <h2 id="story-title" className="mt-4 max-w-xl text-display-lg font-semibold text-forest-900">
            {dict.story.title}
          </h2>
          <div className="mt-7 space-y-5 text-[1.02rem] leading-relaxed text-forest-700">
            {dict.story.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>

          <figure className="mt-10 border-l-2 border-brass-500 pl-6">
            <blockquote className="font-display text-xl leading-snug text-forest-900 md:text-2xl">
              “{dict.story.pull}”
            </blockquote>
            <figcaption className="mt-3 text-xs uppercase tracking-[0.16em] text-forest-500">
              {dict.story.signature}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={120}>
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden arch bg-linen">
              <Photo src={shot.src} scene="interior" alt={shot.alt[locale]} sizes="(max-width: 1024px) 92vw, 42vw" />
            </div>
            {/* Year plate, struck like the one on the beam. */}
            <div className="absolute -bottom-6 -left-3 rounded-sm bg-forest-900 px-6 py-4 text-cream shadow-xl md:-left-6">
              <span className="block font-display text-3xl font-semibold leading-none text-brass-300">1923</span>
              <span className="mt-1.5 block text-[0.6rem] uppercase tracking-[0.2em] text-cream/60">Anno</span>
            </div>
            <figcaption className="mt-9 max-w-xs text-sm leading-relaxed text-forest-500 md:ml-auto md:text-right">
              {dict.story.caption}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
