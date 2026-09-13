import { site, type Locale } from '@/content/site';
import { getDict } from './i18n';
import { reviews, reviewSummary } from '@/content/reviews';

/**
 * Structured data for the listing.
 *
 * Built from the same content modules the page renders, so the markup search
 * engines read can never drift from the markup people read.
 *
 * Note: aggregateRating and review are emitted only when the review data has
 * been marked as genuine (`placeholder: false`). Publishing placeholder ratings
 * as structured data would be a false claim to search engines, so the graph
 * simply omits them until real reviews are in place.
 */
export function buildJsonLd(locale: Locale) {
  const dict = getDict(locale);
  const url = `${site.domain}/${locale}`;
  const realReviews = reviews.filter((r) => !r.placeholder);

  const lodging: Record<string, unknown> = {
    '@type': 'LodgingBusiness',
    '@id': `${site.domain}#lodging`,
    name: site.name,
    description: dict.meta.description,
    url,
    telephone: site.contact.phone,
    email: site.contact.email,
    priceRange: 'RON 450–690',
    currenciesAccepted: 'RON',
    numberOfRooms: site.bedrooms,
    petsAllowed: true,
    checkinTime: site.checkIn,
    checkoutTime: site.checkOut,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.village,
      addressRegion: site.county,
      addressCountry: site.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    sameAs: [site.social.instagram, site.social.booking, site.social.airbnb],
    amenityFeature: dict.amenities.groups.flatMap((g) =>
      g.items.map((item) => ({ '@type': 'LocationFeatureSpecification', name: item, value: true })),
    ),
  };

  if (!reviewSummary.placeholder) {
    lodging.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: reviewSummary.score,
      bestRating: reviewSummary.outOf,
      reviewCount: reviewSummary.count,
    };
  }

  if (realReviews.length) {
    lodging.review = realReviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.score, bestRating: 10 },
      reviewBody: r.quote[locale],
    }));
  }

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
