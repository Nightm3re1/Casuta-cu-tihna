import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Story from '@/components/Story';
import Benefits from '@/components/Benefits';
import TheHouse from '@/components/TheHouse';
import Amenities from '@/components/Amenities';
import Area from '@/components/Area';
import Testimonials from '@/components/Testimonials';
import Rates from '@/components/Rates';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import { getDict, isLocale } from '@/lib/i18n';
import { buildJsonLd } from '@/lib/jsonld';
import type { Locale } from '@/content/site';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typed = locale as Locale;
  const dict = getDict(typed);

  return (
    <>
      <script
        type="application/ld+json"
        // Structured data is generated from src/content/* — it can never
        // disagree with what the page actually says.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(typed)) }}
      />
      <Hero dict={dict} />
      <TrustBar dict={dict} />
      <Story dict={dict} locale={typed} />
      <Benefits dict={dict} />
      <TheHouse dict={dict} locale={typed} />
      <Amenities dict={dict} />
      <Area dict={dict} locale={typed} />
      <Testimonials dict={dict} locale={typed} />
      <Rates dict={dict} />
      <FAQ dict={dict} />
      <FinalCTA dict={dict} locale={typed} />
    </>
  );
}
