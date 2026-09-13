import { ImageResponse } from 'next/og';
import { getDict, isLocale } from '@/lib/i18n';
import { defaultLocale, locales, site } from '@/content/site';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Căsuța cu Tihnă';

/**
 * Share card. Rendered at build time into a static PNG, so nothing is fetched
 * at request time. Deliberately typographic — it must stay legible as a
 * thumbnail in a chat window, which a photograph with text over it does not.
 */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : defaultLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '68px 76px',
          background: 'linear-gradient(140deg, #18271E 0%, #0A120E 62%, #1C3327 100%)',
          color: '#FAF6EE',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="60" height="60" viewBox="0 0 40 40" fill="none">
            <path d="M6.5 36V18.5a13.5 13.5 0 0 1 27 0V36" stroke="#D0A85E" strokeWidth="2.1" strokeLinecap="round" />
            <path d="M11 21.4 20 13l9 8.4" stroke="#D0A85E" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="20" cy="26.6" r="2.9" stroke="#D0A85E" strokeWidth="1.7" />
            <path d="M4 36h32" stroke="#D0A85E" strokeWidth="2.1" strokeLinecap="round" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 34, letterSpacing: -0.5 }}>Căsuța cu Tihnă</span>
            <span style={{ fontSize: 17, letterSpacing: 5, color: '#B4C8BB', fontFamily: 'monospace', marginTop: 4 }}>
              PORUMBACU DE SUS · SIBIU
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 74, lineHeight: 1.04, letterSpacing: -2, maxWidth: 940 }}>
            {dict.hero.title}
          </span>
          <span style={{ fontSize: 74, lineHeight: 1.04, letterSpacing: -2, color: '#E0C287' }}>
            {dict.hero.titleAccent}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 22, color: '#B4C8BB', fontFamily: 'monospace' }}>
          {[`ANNO ${site.builtYear}`, `${site.surfaceSqm} M²`, `${site.maxGuests} ${locale === 'en' ? 'GUESTS' : 'OASPEȚI'}`, `${site.distances.sibiu} KM · SIBIU`].map((t, i) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              {i > 0 && <span style={{ color: '#3D5C48' }}>·</span>}
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
