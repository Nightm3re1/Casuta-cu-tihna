import { site, type Locale } from '@/content/site';
import { getDict } from './i18n';
import { reviews, reviewSummary } from '@/content/reviews';

/**
 * Structured data for the listing.
 *
 * Built from the same content modules the page renders, so the markup search
 * engines read can never drift from the markup people read. The rating and the
 * reviews are the real Booking.com figures — see src/content/reviews.ts.
 */
export function buildJsonLd(locale: Locale) {
  const dict = getDict(locale);
  const url = `${site.domain}/${locale}`;

  const lodging = {
    '@type': 'LodgingBusiness',
    '@id': `${site.domain}#lodging`,
    name: site.name,
    description: dict.meta.description,
    url,
    telephone: site.contact.phone,
    email: site.contact.email,
    priceRange: `RON ${site.rates.upTo2}–${site.rates.upTo4}`,
    currenciesAccepted: site.rates.currency,
    numberOfRooms: site.bedrooms,
    maximumAttendeeCapacity: site.maxGuests,
    petsAllowed: true,
    checkinTime: site.checkIn,
    checkoutTime: site.checkOut,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      addressLocality: site.village,
      postalCode: site.postalCode,
      addressRegion: site.county,
      addressCountry: site.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    sameAs: [site.social.instagram, site.social.booking],
    amenityFeature: dict.amenities.groups.flatMap((g) =>
      g.items.map((item) => ({ '@type': 'LocationFeatureSpecification', name: item, value: true })),
    ),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewSummary.score,
      bestRating: reviewSummary.outOf,
      worstRating: 1,
      reviewCount: reviewSummary.count,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.score, bestRating: 10, worstRating: 1 },
      reviewBody: r.quote[locale],
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      lodging,
      {
        '@type': 'WebSite',
        '@id': `${site.domain}#website`,
        url: site.domain,
        name: site.name,
        inLanguage: locale === 'ro' ? 'ro-RO' : 'en-GB',
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: dict.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}
