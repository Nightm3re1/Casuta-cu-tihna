import { site } from '@/content/site';
import { reviewSummary } from '@/content/reviews';
import type { Dict } from '@/content/schema';

/** The reassurance strip directly under the hero — proof before the pitch. */
export default function TrustBar({ dict }: { dict: Dict }) {
  return (
    <section aria-label={dict.trust.intro} className="relative z-10 border-y border-stone/70 bg-linen">
      <div className="shell grid gap-8 py-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12 md:py-7">
        <div className="flex items-center gap-4">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-4xl font-semibold leading-none text-forest-800">
              {reviewSummary.score.toFixed(1)}
            </span>
            <span className="text-sm text-forest-500">/ {reviewSummary.outOf}</span>
          </div>
          <div className="border-l border-stone pl-4">
            <div className="flex gap-0.5" role="img" aria-label={`${reviewSummary.score} / ${reviewSummary.outOf}`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} />
              ))}
            </div>
            <p className="mt-1 text-xs text-forest-600">
              {dict.trust.ratingLabel} · {reviewSummary.count}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 md:justify-end">
          <span className="text-xs uppercase tracking-[0.16em] text-forest-500">{dict.trust.intro}</span>
          <a href={site.social.booking} target="_blank" rel="noopener noreferrer"
            className="text-sm font-semibold text-forest-700 underline-offset-4 transition-colors hover:text-brass-600 hover:underline">
            Booking.com
          </a>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer"
            className="text-sm font-semibold text-forest-700 underline-offset-4 transition-colors hover:text-brass-600 hover:underline">
            {site.social.instagramHandle}
          </a>
        </div>
      </div>

      <div className="shell border-t border-stone/60 py-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 md:justify-between">
          {dict.trust.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[0.82rem] text-forest-700">
              <Check />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className="text-brass-500" aria-hidden="true">
    <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.65l5.9-.85L10 1.5z" />
  </svg>
);

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 text-brass-600" aria-hidden="true">
    <path d="M3 8.4l3.2 3.1L13 4.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
