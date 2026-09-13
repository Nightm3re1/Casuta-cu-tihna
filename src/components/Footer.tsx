import Link from 'next/link';
import { Logo } from './Logo';
import { site, type Locale } from '@/content/site';
import type { Dict } from '@/content/schema';

const SECTIONS = ['story', 'house', 'area', 'reviews', 'rates', 'faq'] as const;

export default function Footer({ dict, locale }: { dict: Dict; locale: Locale }) {
  const labels: Record<(typeof SECTIONS)[number], string> = {
    story: dict.nav.story,
    house: dict.nav.space,
    area: dict.nav.area,
    reviews: dict.nav.reviews,
    rates: dict.nav.rates,
    faq: dict.nav.faq,
  };

  return (
    <footer className="border-t border-forest-800 bg-forest-950 pb-28 pt-16 text-cream md:pb-14">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
          <div>
            <Link href={`/${locale}`} className="inline-block text-cream" aria-label={site.name}>
              <Logo markClass="h-10 w-10" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">{dict.footer.blurb}</p>
            <address className="mt-5 not-italic text-sm text-cream/65">{dict.footer.address}</address>
          </div>

          <nav aria-label={dict.footer.nav}>
            <h2 className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brass-400">
              {dict.footer.nav}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-sm text-cream/70 underline-offset-4 transition-colors hover:text-cream hover:underline">
                    {labels[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brass-400">
              {dict.footer.contact}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={site.contact.phoneHref} className="text-cream/60 underline-offset-4 transition-colors hover:text-cream hover:underline">
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="break-all text-cream/70 underline-offset-4 transition-colors hover:text-cream hover:underline">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-cream/60 underline-offset-4 transition-colors hover:text-cream hover:underline">
                  {site.social.instagramHandle}
                </a>
              </li>
              <li>
                <a href={site.social.booking} target="_blank" rel="noopener noreferrer" className="text-cream/60 underline-offset-4 transition-colors hover:text-cream hover:underline">
                  Booking.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-cream/10 pt-7 text-xs text-cream/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </p>
          <p>{dict.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
