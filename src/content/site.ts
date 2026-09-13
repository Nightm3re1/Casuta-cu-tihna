/**
 * Single source of truth for verifiable property facts and outbound links.
 * Everything here is rendered directly into the page and into JSON-LD, so
 * change it here and the whole site (and its structured data) follows.
 */
export const site = {
  name: 'Căsuța cu Tihnă',
  legalName: 'Căsuța cu Tihnă',
  domain: 'https://casuta-cu-tihna.ro',
  builtYear: 1923,
  village: 'Porumbacu de Sus',
  county: 'Sibiu',
  region: 'Transilvania',
  country: 'RO',
  countryName: { ro: 'România', en: 'Romania' },
  // Village centre of Porumbacu de Sus, at the foot of the Făgăraș range.
  geo: { lat: 45.7167, lng: 24.4333 },

  surfaceSqm: 80,
  bedrooms: 1,
  bathrooms: 2,
  maxGuests: 7,
  minNights: 2,
  checkIn: '15:00',
  checkOut: '11:00',

  // Distances in km, measured by road.
  distances: {
    sibiu: 40,
    balea: 77,
    fagarasRidgeTrailhead: 6,
    airportSibiu: 45,
  },

  contact: {
    phone: '+40 745 000 000',
    phoneHref: 'tel:+40745000000',
    whatsapp: 'https://wa.me/40745000000',
    email: 'rezervari@casuta-cu-tihna.ro',
  },

  social: {
    instagram: 'https://www.instagram.com/casuta_cu_tihna',
    instagramHandle: '@casuta_cu_tihna',
    booking: 'https://www.booking.com/Share-DvYKzY',
    airbnb: 'https://www.airbnb.com/rooms/1047545971723669463',
  },
} as const;

export type Locale = 'ro' | 'en';
export const locales: Locale[] = ['ro', 'en'];
export const defaultLocale: Locale = 'ro';
