'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';
import HeroBuildAnimation from './HeroBuildAnimation';
import type { Dict } from '@/content/schema';

/**
 * The hero: the headline holds the first screen, hands over to the build
 * sequence as you scroll, and returns as a figures strip once the house stands.
 * Both booking CTAs stay reachable from the header throughout, so nothing that
 * converts ever scrolls out of reach.
 */
export default function Hero({ dict }: { dict: Dict }) {
  return (
    <section id="hero" className="relative" aria-labelledby="hero-title">
      <HeroBuildAnimation
        label={dict.hero.animationLabel}
        overlay={(p) => <Overlay dict={dict} p={p} />}
      />
    </section>
  );
}

function Overlay({ dict, p }: { dict: Dict; p: MotionValue<number> }) {
  // The words step aside so the drawing can be read, then the figures land.
  const copyO = useTransform(p, [0, 0.12, 0.3], [1, 1, 0], { clamp: true });
  const copyY = useTransform(p, [0, 0.3], [0, -44], { clamp: true });
  const statsO = useTransform(p, [0.87, 0.97], [0, 1], { clamp: true });
  const statsY = useTransform(p, [0.87, 0.97], [26, 0], { clamp: true });
  const hintO = useTransform(p, [0, 0.06], [1, 0], { clamp: true });

  return (
    <div className="pointer-events-none relative h-full">
      <motion.div
        style={{ opacity: copyO, y: copyY }}
        className="shell absolute inset-0 flex flex-col items-center justify-center pb-24 pt-[var(--header-h)] text-center"
      >
        <p className="eyebrow !text-brass-300">{dict.hero.eyebrow}</p>
        <h1
          id="hero-title"
          className="mt-4 max-w-3xl text-display-xl font-semibold text-cream text-shadow-hero"
        >
          {dict.hero.title}{' '}
          <em className="not-italic text-brass-300">{dict.hero.titleAccent}</em>
        </h1>
        <p className="mt-5 max-w-lg text-[0.94rem] leading-relaxed text-cream/75 md:text-base">
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
      </motion.div>

      {/* Scroll affordance — the build only reads as interactive if we say so. */}
      <motion.div
        style={{ opacity: hintO }}
        className="absolute inset-x-0 bottom-5 flex flex-col items-center gap-2 md:bottom-7"
      >
        <span className="text-[0.63rem] font-semibold uppercase tracking-[0.24em] text-cream/70">
          {dict.hero.scrollHint}
        </span>
        <span className="relative block h-9 w-px overflow-hidden bg-cream/20">
          <span className="absolute inset-x-0 top-0 h-3 animate-scroll-cue bg-brass-400" />
        </span>
      </motion.div>

      {/* Figures, once the house stands. */}
      <motion.dl
        style={{ opacity: statsO, y: statsY }}
        className="shell absolute inset-x-0 bottom-10 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4"
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
      </motion.dl>
    </div>
  );
}
