'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { site, type Locale } from '@/content/site';
import type { Dict } from '@/content/schema';

const SECTIONS = ['story', 'house', 'area', 'reviews', 'rates', 'faq'] as const;

export default function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  const labels: Record<(typeof SECTIONS)[number], string> = {
    story: dict.nav.story,
    house: dict.nav.space,
    area: dict.nav.area,
    reviews: dict.nav.reviews,
    rates: dict.nav.rates,
    faq: dict.nav.faq,
  };

  // The header only takes its light state once the dark hero is actually
  // behind us — measured from the hero itself, not a guessed pixel offset.
  useEffect(() => {
    let threshold = 0;

    const measure = () => {
      const hero = document.getElementById('hero');
      threshold = hero ? hero.offsetHeight - 96 : window.innerHeight * 0.8;
    };
    const onScroll = () => setScrolled(window.scrollY > threshold);

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Highlight the section currently on screen.
  useEffect(() => {
    const targets = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!targets.length || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // Lock the page behind the mobile sheet and close it on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const onLight = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-smooth ${
          onLight
            ? 'bg-cream shadow-[0_1px_0_0_rgba(231,225,218,1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-2 sm:gap-6">
          <Link
            href={`/${locale}`}
            className={`min-w-0 flex-shrink transition-colors duration-500 ${onLight ? 'text-bark-800' : 'text-cream'}`}
            aria-label={site.name}
          >
            <Logo compact markClass="h-8 w-8 md:h-9 md:w-9" />
          </Link>

          <nav aria-label={dict.nav.menu} className="hidden items-center gap-1 lg:flex">
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[0.82rem] font-medium transition-colors duration-300 ${
                  onLight ? 'text-bark-700 hover:text-bark-900' : 'text-cream/80 hover:text-cream'
                }`}
              >
                {labels[id]}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-clay-500 transition-transform duration-300 ease-smooth ${
                    active === id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
            <LocaleSwitch locale={locale} dict={dict} onLight={onLight} />
            <a href="#book" className="btn-primary hidden !px-5 !py-2.5 text-[0.8rem] sm:inline-flex">
              {dict.nav.book}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? dict.nav.close : dict.nav.menu}
              className={`-mr-1 grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden ${
                onLight ? 'text-bark-800 hover:bg-bark-800/8' : 'text-cream hover:bg-cream/10'
              }`}
            >
              <span className="relative block h-4 w-6">
                <span
                  className={`absolute left-0 block h-[2px] w-6 rounded bg-current transition-all duration-300 ease-smooth ${
                    open ? 'top-[7px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block h-[2px] w-6 rounded bg-current transition-all duration-200 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[2px] w-6 rounded bg-current transition-all duration-300 ease-smooth ${
                    open ? 'top-[7px] -rotate-45' : 'top-[14px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-cream lg:hidden"
      >
        <div className="shell flex h-full flex-col pt-[var(--header-h)]">
          <nav aria-label={dict.nav.menu} className="flex flex-1 flex-col justify-center gap-1 py-8">
            {SECTIONS.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="border-b border-stone/60 py-4 font-display text-3xl text-bark-900 transition-colors hover:text-clay-600"
                style={{ animation: open ? `fade-up 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 55}ms both` : undefined }}
              >
                {labels[id]}
              </a>
            ))}
          </nav>
          <div className="pb-10">
            <a href="#book" onClick={() => setOpen(false)} className="btn-primary w-full">
              {dict.nav.book}
            </a>
            <a
              href={site.contact.phoneHref}
              className="mt-3 block text-center text-sm text-bark-600 underline underline-offset-4"
            >
              {site.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function LocaleSwitch({ locale, dict, onLight }: { locale: Locale; dict: Dict; onLight: boolean }) {
  return (
    <div
      role="group"
      aria-label={dict.langSwitch.label}
      className={`flex items-center rounded-full border p-0.5 text-[0.7rem] font-semibold uppercase tracking-wider transition-colors duration-500 ${
        onLight ? 'border-stone' : 'border-cream/25'
      }`}
    >
      {(['ro', 'en'] as const).map((l) => {
        const isActive = l === locale;
        return (
          <Link
            key={l}
            href={`/${l}`}
            hrefLang={l}
            aria-current={isActive ? 'true' : undefined}
            className={`rounded-full px-2 py-1.5 transition-colors duration-300 xs:px-2.5 ${
              isActive
                ? 'bg-clay-500 text-cream'
                : onLight
                  ? 'text-bark-600 hover:text-bark-900'
                  : 'text-cream/70 hover:text-cream'
            }`}
          >
            <span className="sr-only">{l === 'ro' ? dict.langSwitch.ro : dict.langSwitch.en}</span>
            <span aria-hidden="true">{l}</span>
          </Link>
        );
      })}
    </div>
  );
}
