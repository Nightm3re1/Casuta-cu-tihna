'use client';

import { useCallback, useRef } from 'react';
import HeroBuildAnimation from './HeroBuildAnimation';
import { seg } from '@/lib/useScrollProgress';
import type { Dict } from '@/content/schema';

/**
 * The hero: the headline holds the first screen, hands over to the build
 * sequence as you scroll, and returns as a figures strip once the house stands.
 * Both booking CTAs stay reachable from the header throughout, so nothing that
 * converts ever scrolls out of reach.
 *
 * The overlay is written to by ref on each animation frame rather than through
 * React state, so scrolling the hero never re-renders the tree.
 */
export default function Hero({ dict }: { dict: Dict }) {
  const copyRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDListElement>(null);

  const onProgress = useCallback((p: number) => {
    const copy = copyRef.current;
    if (copy) {
      // The words are gone before the footing is drawn, so nothing ever
      // ghosts over the blueprint; a slight lift, never enough to reach the
      // header.
      const t = seg(p, 0.03, 0.14);
      copy.style.opacity = String(1 - t);
      copy.style.transform = `translateY(${-14 * t}px)`;
      copy.style.pointerEvents = p > 0.1 ? 'none' : '';
    }
    if (hintRef.current) hintRef.current.style.opacity = String(1 - seg(p, 0, 0.04));
    const stats = statsRef.current;
    if (stats) {
      // …then the figures land once the house stands.
      const t = seg(p, 0.87, 0.97);
      stats.style.opacity = String(t);
      stats.style.transform = `translateY(${26 * (1 - t)}px)`;
    }
  }, []);

  return (
    <section id="hero" className="relative" aria-labelledby="hero-title">
      <HeroBuildAnimation label={dict.hero.animationLabel} onProgress={onProgress}>
        <div className="pointer-events-none absolute inset-0">
        <div
          ref={copyRef}
          className="shell absolute inset-0 flex flex-col items-center justify-center pb-24 pt-[var(--header-h)] text-center"
        >
          <p className="eyebrow !text-clay-200 tracking-[0.12em] sm:tracking-[0.18em]">{dict.hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-4 max-w-3xl text-display-xl font-semibold text-cream text-shadow-hero"
          >
            {dict.hero.title} <em className="not-italic text-clay-200">{dict.hero.titleAccent}</em>
          </h1>
          <p className="mt-5 max-w-lg text-[0.94rem] leading-relaxed text-cream/80 md:text-base">
            {dict.hero.lede}
          </p>
          <div className="pointer-events-auto mt-7 flex w-full max-w-md flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <a href="#book" className="btn-primary w-full sm:w-auto">
              {dict.hero.ctaPrimary}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#house" className="btn-ghost-light w-full sm:w-auto">
              {dict.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Scroll affordance — the build only reads as interactive if we say so. */}
        <div ref={hintRef} className="absolute inset-x-0 bottom-5 flex flex-col items-center gap-2 md:bottom-7">
          <span className="text-[0.63rem] font-semibold uppercase tracking-[0.24em] text-cream/70">
            {dict.hero.scrollHint}
          </span>
          <span className="relative block h-9 w-px overflow-hidden bg-cream/20">
            <span className="absolute inset-x-0 top-0 h-3 animate-scroll-cue bg-clay-300" />
          </span>
        </div>

        {/* Figures, once the house stands. */}
        <dl
          ref={statsRef}
          className="shell absolute inset-x-0 bottom-9 grid grid-cols-2 gap-x-6 gap-y-7 opacity-0 sm:grid-cols-4"
        >
          {dict.hero.stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-semibold text-cream md:text-4xl">{s.value}</span>
                <span className="mt-1.5 block text-[0.68rem] uppercase tracking-[0.16em] text-cream/75">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
          </dl>
        </div>
      </HeroBuildAnimation>
    </section>
  );
}
