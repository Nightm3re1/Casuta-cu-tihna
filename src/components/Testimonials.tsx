'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { reviews, reviewSummary, hasPlaceholderReviews } from '@/content/reviews';
import type { Dict } from '@/content/schema';
import type { Locale } from '@/content/site';

/**
 * Guest reviews.
 *
 * A native scroll-snap track does the moving, so touch swipe, trackpad and
 * keyboard all work without a gesture library, and the cards stay in the
 * accessibility tree in reading order.
 */
export default function Testimonials({ dict, locale }: { dict: Dict; locale: Locale }) {
  // The scroller and the list are separate elements: the region role that makes
  // the overflow keyboard-accessible would otherwise override the list
  // semantics and orphan every <li>.
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }, []);

  // Track which card is showing, so the dots and buttons stay truthful.
  useEffect(() => {
    const track = trackRef.current;
    const scroller = scrollerRef.current;
    if (!track || !scroller || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const i = Array.prototype.indexOf.call(track.children, best.target);
        if (i >= 0) setIndex(i);
      },
      { root: scroller, threshold: 0.6 },
    );
    Array.from(track.children).forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const go = (delta: number) => scrollTo(Math.min(reviews.length - 1, Math.max(0, index + delta)));

  return (
    <section id="reviews" className="relative bg-forest-900 py-24 text-cream grain md:py-32" aria-labelledby="reviews-title">
      <div className="shell relative">
        {hasPlaceholderReviews && process.env.NODE_ENV !== 'production' && (
          <p className="mb-8 rounded-sm border border-amber-400/50 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            <strong className="font-semibold">Development notice:</strong> these reviews are placeholder
            copy, not real guests. Replace them in <code className="font-mono">src/content/reviews.ts</code>{' '}
            with the genuine Booking.com reviews before launch. This notice never renders in production.
          </p>
        )}

        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <p className="eyebrow !text-brass-400">{dict.reviews.eyebrow}</p>
            <h2 id="reviews-title" className="mt-4 text-display-lg font-semibold">
              {dict.reviews.title}
            </h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-cream/75">{dict.reviews.lede}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label={dict.reviews.prev}
              className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 text-cream transition-all duration-300 hover:border-brass-400 hover:text-brass-300 disabled:opacity-30 disabled:hover:border-cream/25 disabled:hover:text-cream"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={index === reviews.length - 1}
              aria-label={dict.reviews.next}
              className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 text-cream transition-all duration-300 hover:border-brass-400 hover:text-brass-300 disabled:opacity-30 disabled:hover:border-cream/25 disabled:hover:text-cream"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>

        {/* tabIndex makes the horizontal scroller reachable and arrow-key
            scrollable for keyboard users, which a bare overflow container is not. */}
        <div
          ref={scrollerRef}
          tabIndex={0}
          role="region"
          aria-label={dict.reviews.title}
          className="-mx-6 mt-12 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 px-6 pb-4"
        >
          {reviews.map((r) => (
            <li
              key={r.id}
              className="w-[85vw] shrink-0 snap-start sm:w-[420px]"
            >
              <figure className="flex h-full flex-col rounded-sm border border-cream/12 bg-cream/[0.045] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-brass-400/40">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5" role="img" aria-label={`${r.score} / 10`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill="currentColor" className="text-brass-400" aria-hidden="true">
                        <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.65l5.9-.85L10 1.5z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-mono text-xs text-cream/60">{r.source}</span>
                </div>

                <blockquote className="mt-5 flex-1 font-display text-[1.15rem] leading-relaxed text-cream/90">
                  “{r.quote[locale]}”
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-cream/10 pt-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brass-500/15 font-display text-base font-semibold text-brass-300">
                    {r.author.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-cream">{r.author}</span>
                    <span className="block truncate text-xs text-cream/65">
                      {r.country[locale]} · {r.stayed[locale]}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        </div>

        <div className="mt-6 flex items-center justify-between gap-6">
          <div className="flex gap-2">
            {reviews.map((r, i) => (
              <button
                key={r.id}
                type="button"
                aria-current={i === index}
                aria-label={`${dict.reviews.goTo} ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={`h-1.5 rounded-full transition-all duration-400 ease-smooth ${
                  i === index ? 'w-8 bg-brass-400' : 'w-1.5 bg-cream/25 hover:bg-cream/50'
                }`}
              />
            ))}
          </div>
          <a
            href={reviewSummary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-cream/70 underline-offset-4 transition-colors hover:text-brass-300 hover:underline"
          >
            {dict.reviews.sourceLabel}: {reviewSummary.source} →
          </a>
        </div>
      </div>
    </section>
  );
}

const Arrow = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
    style={{ transform: dir === 'left' ? 'rotate(180deg)' : undefined }}>
    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
