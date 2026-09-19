'use client';

import { useEffect, useState } from 'react';
import type { Dict } from '@/content/schema';

/**
 * Mobile booking rail. Appears once the hero is behind the reader and retires
 * when the booking section itself is on screen, so it never covers the form it
 * is pointing at.
 */
export default function StickyBookBar({ dict }: { dict: Dict }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById('book');

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 1.6;
      const atBooking = target
        ? target.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;
      setShow(pastHero && !atBooking);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-bark-800 bg-bark-950 transition-transform duration-500 ease-smooth md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="shell flex items-center justify-between gap-4 py-3">
        <p className="min-w-0 flex-1 text-[0.76rem] leading-snug text-cream/70">{dict.stickyBar.label}</p>
        <a href="#book" tabIndex={show ? 0 : -1} className="btn-primary shrink-0 !px-6 !py-2.5 text-[0.8rem]">
          {dict.stickyBar.cta}
        </a>
      </div>
    </div>
  );
}
