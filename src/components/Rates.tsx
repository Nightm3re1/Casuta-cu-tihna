import Reveal from './Reveal';
import type { Dict } from '@/content/schema';

/** Rate card. One price for the whole house — the argument, made visible. */
export default function Rates({ dict }: { dict: Dict }) {
  return (
    <section id="rates" className="border-y border-stone/70 bg-linen py-24 md:py-32" aria-labelledby="rates-title">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{dict.rates.eyebrow}</p>
          <h2 id="rates-title" className="mt-4 text-display-lg font-semibold text-bark-900">
            {dict.rates.title}
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-bark-700">{dict.rates.lede}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {dict.rates.tiers.map((tier, i) => (
              <Reveal
                key={tier.name}
                delay={i * 80}
                className={`relative flex flex-col rounded-sm border p-6 transition-shadow duration-500 ${
                  tier.featured
                    ? 'border-bark-800 bg-bark-900 text-cream shadow-xl'
                    : 'border-stone bg-cream'
                }`}
              >
                <h3 className={`text-[0.7rem] font-semibold uppercase tracking-[0.16em] ${tier.featured ? 'text-clay-300' : 'text-clay-600'}`}>
                  {tier.name}
                </h3>
                <p className={`mt-1 text-xs ${tier.featured ? 'text-cream/70' : 'text-bark-500'}`}>{tier.period}</p>
                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className={`font-display text-4xl font-semibold leading-none ${tier.featured ? 'text-cream' : 'text-bark-900'}`}>
                    {tier.price}
                  </span>
                  <span className={`text-xs ${tier.featured ? 'text-cream/70' : 'text-bark-500'}`}>{tier.unit}</span>
                </p>
                <p className={`mt-auto pt-5 text-xs ${tier.featured ? 'text-cream/70' : 'text-bark-500'}`}>{tier.note}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <h3 className="border-b border-stone pb-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-clay-600">
              {dict.rates.includedTitle}
            </h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {dict.rates.included.map((item) => (
                <li key={item} className="flex gap-2.5 text-[0.92rem] leading-snug text-bark-700">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0 text-clay-500" aria-hidden="true">
                    <path d="M3 8.4l3.2 3.1L13 4.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-sm bg-cream p-6 ring-1 ring-stone">
              <a href="#book" className="btn-primary w-full">{dict.rates.cta}</a>
              <p className="mt-3 text-center text-xs text-bark-500">{dict.rates.ctaNote}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <ul className="mt-12 grid gap-x-10 gap-y-2.5 border-t border-stone pt-7 text-[0.82rem] leading-relaxed text-bark-500 sm:grid-cols-2">
            {dict.rates.fineprint.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
