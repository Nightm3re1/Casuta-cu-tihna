import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyBookBar from '@/components/StickyBookBar';
import { getDict, isLocale } from '@/lib/i18n';
import { locales, site, type Locale } from '@/content/site';

const display = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-display',
  // Exactly the weights the markup uses — see the type scale in globals.css.
  weight: ['400', '500', '600'],
  preload: true,
});

const sans = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600'],
  preload: true,
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${site.domain}/${locale}`,
      languages: {
        ro: `${site.domain}/ro`,
        en: `${site.domain}/en`,
        'x-default': `${site.domain}/ro`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : 'en_GB',
      url: `${site.domain}/${locale}`,
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typed = locale as Locale;
  const dict = getDict(typed);

  return (
    <html lang={typed} className={`${display.variable} ${sans.variable}`}>
      <head>
        {/* Scroll reveals are progressive enhancement: with scripting off they
            never run, so unhide everything they would have revealed. */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bark-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
        >
          {dict.skipToContent}
        </a>
        <Header dict={dict} locale={typed} />
        <main id="main">{children}</main>
        <Footer dict={dict} locale={typed} />
        <StickyBookBar dict={dict} />
      </body>
    </html>
  );
}
