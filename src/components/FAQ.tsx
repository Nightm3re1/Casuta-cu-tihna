'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { site } from '@/content/site';
import type { Dict } from '@/content/schema';

/**
 * Objection handling.
 *
 * Built on <details>/<summary>, so it opens without JavaScript, is keyboard
 * operable for free, and is exposed correctly to screen readers. React only
 * tracks which one is open to keep the group to a single panel at a time.
 */
export default function FAQ({ dict }: { dict: Dict }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32" aria-labelledby="faq-title">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{dict.faq.eyebrow}</p>
            <h2 id="faq-title" className="mt-4 text-display-md font-semibold text-bark-900">
              {dict.faq.title}
            </h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-bark-600">{dict.faq.lede}</p>

            <div className="mt-8 rounded-sm border border-stone bg-linen p-6">
              <p className="font-display text-lg text-bark-900">{dict.faq.stillAsking}</p>
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary mt-4 w-full"
              >
                {dict.faq.contactCta}
              </a>
            </div>
          </div>
        </Reveal>

        <div className="divide-y divide-stone border-y border-stone">
          {dict.faq.items.map((item, i) => (
            <details
              key={item.q}
              open={open === i}
              onToggle={(e) => {
                if ((e.currentTarget as HTMLDetailsElement).open) setOpen(i);
                else if (open === i) setOpen(null);
              }}
              className="group"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-[1.12rem] font-medium leading-snug text-bark-900 transition-colors group-hover:text-clay-600 md:text-xl">
                  {item.q}
                </h3>
                <span
                  aria-hidden="true"
                  className="relative mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-stone transition-colors group-open:border-clay-500 group-open:bg-clay-500"
                >
                  <span className="absolute h-[1.5px] w-2.5 rounded bg-bark-700 transition-colors group-open:bg-bark-950" />
                  <span className="absolute h-2.5 w-[1.5px] rounded bg-bark-700 transition-transform duration-300 ease-smooth group-open:scale-y-0" />
                </span>
              </summary>
              <div className="grid grid-rows-[1fr] pb-6 pr-10">
                <p className="text-[0.95rem] leading-relaxed text-bark-600">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
