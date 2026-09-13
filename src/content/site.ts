/**
 * Single source of truth for the property's verifiable facts.
 *
 * Every value here was taken from the owner's own live site
 * (casuta-cu-tihna.ro) or from the Booking.com listing — nothing is estimated.
 * It is rendered straight into the page and into the JSON-LD, so a change here
 * updates the whole site and its structured data together.
 */
export const site = {
  name: 'Căsuța cu Tihnă',
  legalName: 'Căsuța cu Tihnă',
  domain: 'https://casuta-cu-tihna.ro',
  builtYear: 1923,
  restoredYear: 2021,

  street: 'Strada Principală nr. 489B',
  village: 'Porumbacu de Sus',
  postalCode: '557192',
  county: 'Sibiu',
  region: 'Transilvania',
  country: 'RO',
  geo: { lat: 45.7167, lng: 24.4333 },

  surfaceSqm: 80,
  bedrooms: 1,
  bathrooms: 2, // one on each floor
  maxGuests: 4,
  checkIn: '15:00',
  checkOut: '11:00',

  /** Direct-booking rate for the whole house, in RON per night. */
  rates: {
    upTo2: 500,
    upTo4: 700,
    currency: 'RON',
  },

  /** Road distances in km, as published by the owner. */
  distances: {
    sibiuCentre: 38,
    passageOfStairs: 39,
    sibiuAirport: 42,
  },

  contact: {
    phone: '+40 735 751 636',
    phoneHref: 'tel:+40735751636',
    whatsapp: 'https://wa.me/40735751636',
    email: 'contact@casuta-cu-tihna.ro',
  },

  social: {
    instagram: 'https://www.instagram.com/casuta_cu_tihna',
    instagramHandle: '@casuta_cu_tihna',
    booking: 'https://www.booking.com/hotel/ro/little-bear-lodge.html',
    bookingShare: 'https://www.booking.com/Share-DvYKzY',
  },
} as const;

export type Locale = 'ro' | 'en';
export const locales: Locale[] = ['ro', 'en'];
export const defaultLocale: Locale = 'ro';
