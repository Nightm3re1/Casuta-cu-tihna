/**
 * Real guest reviews, taken from the property's Booking.com listing.
 *
 * Source: https://www.booking.com/hotel/ro/little-bear-lodge.html
 * (the legacy slug of the "Căsuța cu tihnă" listing, reached via the owner's
 * share link https://www.booking.com/Share-DvYKzY)
 *
 * Every quote, name, country, party type and date below is as published by
 * Booking.com. Reviews left in Romanian, German, Hungarian, Polish and English
 * are shown in their original language on the Romanian site and translated on
 * the English one — the `quote.ro` field is the guest's own wording where they
 * wrote in Romanian.
 */

export type Review = {
  id: string;
  quote: { ro: string; en: string };
  author: string;
  country: { ro: string; en: string };
  stayed: { ro: string; en: string };
  score: number;
  source: 'Booking.com';
};

/** Headline figures exactly as Booking.com reports them. */
export const reviewSummary = {
  score: 9.9,
  outOf: 10,
  count: 52,
  label: { ro: 'Excepțional', en: 'Exceptional' },
  source: 'Booking.com',
  href: 'https://www.booking.com/hotel/ro/little-bear-lodge.html',
};

/** Booking.com category sub-scores. */
export const reviewCategories = [
  { key: 'staff', value: 10, label: { ro: 'Personal', en: 'Staff' } },
  { key: 'facilities', value: 10, label: { ro: 'Facilități', en: 'Facilities' } },
  { key: 'cleanliness', value: 10, label: { ro: 'Curățenie', en: 'Cleanliness' } },
  { key: 'comfort', value: 9.8, label: { ro: 'Confort', en: 'Comfort' } },
  { key: 'value', value: 9.6, label: { ro: 'Raport calitate/preț', en: 'Value for money' } },
  { key: 'location', value: 9.6, label: { ro: 'Locație', en: 'Location' } },
];

export const reviews: Review[] = [
  {
    id: 'iuliana',
    quote: {
      ro: 'Căsuța de lemn din Porumbacu de Sus este un colț de rai unde tradiția se îmbină perfect cu confortul modern. Priveliștea spectaculoasă spre Munții Făgăraș îți taie respirația încă de la prima oră a dimineții. Micul dejun a fost un adevărat spectacol culinar: adus într-un coș fermecător de picnic, extrem de bogat, proaspăt și plin de bunătăți locale.',
      en: 'The wooden cottage in Porumbacu de Sus is a corner of paradise where tradition blends perfectly with modern comfort. The spectacular view towards the Făgăraș Mountains takes your breath away from the first hour of the morning. Breakfast was a culinary spectacle: brought in a charming picnic basket, generous, fresh and full of local delicacies.',
    },
    author: 'Iuliana',
    country: { ro: 'Germania', en: 'Germany' },
    stayed: { ro: 'Familie · septembrie 2026', en: 'Family · September 2026' },
    score: 10,
    source: 'Booking.com',
  },
  {
    id: 'anca',
    quote: {
      ro: 'Căsuța este într-un loc de vis, de unde poți vedea Munții Făgăraș! Este utilată cu tot ce-ți trebuie, iar gazdele sunt extrem de amabile. Micul dejun bogat și delicios. Curățenie exemplară.',
      en: 'The cottage is in a dream location, with a view of the Făgăraș Mountains. It has everything you need, and the hosts are extremely kind. A generous, delicious breakfast. Spotlessly clean.',
    },
    author: 'Anca',
    country: { ro: 'România', en: 'Romania' },
    stayed: { ro: '2 nopți · septembrie 2026', en: '2 nights · September 2026' },
    score: 10,
    source: 'Booking.com',
  },
  {
    id: 'paula',
    quote: {
      ro: 'Căsuța este așezată într-o zonă mai retrasă, foarte liniștită. Doar păsările și albinele se aud în liniștea zilei. Am aflat că are mai mult de 100 de ani, este foarte bine întreținută și ai impresia că te întorci în timp… la căsuța bunicii.',
      en: 'The cottage sits in a secluded, very quiet spot. Only the birds and the bees break the silence of the day. We learned it is more than 100 years old; it is beautifully kept and you feel you have gone back in time — to your grandmother’s cottage.',
    },
    author: 'Paula',
    country: { ro: 'România', en: 'Romania' },
    stayed: { ro: 'Familie · iunie 2025', en: 'Family · June 2025' },
    score: 10,
    source: 'Booking.com',
  },
  {
    id: 'catalin',
    quote: {
      ro: 'O locație foarte frumoasă, extrem de curată și cu o priveliște superbă către munți, retrasă și liniștită. Bucătărie super dotată, camere mari, pat confortabil, două băi — atât la parter, cât și la etaj — terasă minunată, design durabil, cu o notă tradițională.',
      en: 'A beautiful location, spotless, with a superb view of the mountains — secluded and quiet. A very well equipped kitchen, large rooms, a comfortable bed, two bathrooms — one downstairs and one upstairs — a wonderful terrace, and a durable design with a traditional note.',
    },
    author: 'Cătălin',
    country: { ro: 'România', en: 'Romania' },
    stayed: { ro: 'Familie · 2 nopți', en: 'Family · 2 nights' },
    score: 10,
    source: 'Booking.com',
  },
  {
    id: 'jet',
    quote: {
      ro: 'Un loc perfect dacă îți dorești o ședere liniștită la țară. Gazdele sunt foarte săritoare. Casa este bine utilată, curată și confortabilă. Priveliștea e grozavă. Mulțumim!',
      en: 'A perfect place if you’re looking for a peaceful, quiet stay in the countryside. Owners are very helpful. The house is well equipped, clean, and comfortable. View is great. Thank you!',
    },
    author: 'Jet',
    country: { ro: 'Olanda', en: 'Netherlands' },
    stayed: { ro: 'Familie · 2 nopți', en: 'Family · 2 nights' },
    score: 10,
    source: 'Booking.com',
  },
  {
    id: 'karina',
    quote: {
      ro: 'Căsuță foarte frumoasă, curată, amenajată cu stil și bine dotată, pe o stradă laterală liniștită. Priveliște superbă spre munți atât de pe terasă, cât și de la fereastra de la etaj. Gazda s-a îngrijit până și de periuțe și papuci de unică folosință.',
      en: 'A lovely cottage — clean, stylishly furnished and well equipped, on a quiet side street. A beautiful mountain view both from the terrace and from the upstairs window. The host had even thought of toothbrushes and slippers.',
    },
    author: 'Karina',
    country: { ro: 'Polonia', en: 'Poland' },
    stayed: { ro: 'Familie · 7 nopți', en: 'Family · 7 nights' },
    score: 10,
    source: 'Booking.com',
  },
  {
    id: 'uta',
    quote: {
      ro: 'Căsuța este așezată într-un peisaj de poveste. Gazda este comunicativă și deschisă la orice cerere. Curățenia și atenția la detalii sunt alte puncte forte ale acestui loc superb.',
      en: 'The cottage sits in a storybook landscape. The host communicates well and is open to any request. Cleanliness and attention to detail are further strengths of this superb place.',
    },
    author: 'Uta',
    country: { ro: 'România', en: 'Romania' },
    stayed: { ro: '2 nopți · mai 2026', en: '2 nights · May 2026' },
    score: 10,
    source: 'Booking.com',
  },
  {
    id: 'stefan',
    quote: {
      ro: 'Cazarea a fost superbă și amenajată cu drag. O căsuță de lemn minunată, în care puteai sta afară, cu vedere largă spre Carpați.',
      en: 'The accommodation was beautiful and lovingly furnished. A wonderful little log house where you could sit outside with a wide view over the Carpathians.',
    },
    author: 'Stefan',
    country: { ro: 'Germania', en: 'Germany' },
    stayed: { ro: 'Cuplu · 4 nopți', en: 'Couple · 4 nights' },
    score: 10,
    source: 'Booking.com',
  },
  {
    id: 'razvan',
    quote: {
      ro: 'Locația e superbă, căsuța e de poveste, iar oamenii — „de pus pe rană”. Liniștea din această căsuță de lemn a fost o terapie.',
      en: 'The location is superb, the cottage is something out of a story, and the people could not have been kinder. The quiet in this little wooden house was pure therapy.',
    },
    author: 'Răzvan',
    country: { ro: 'România', en: 'Romania' },
    stayed: { ro: 'Cuplu · 3 nopți', en: 'Couple · 3 nights' },
    score: 10,
    source: 'Booking.com',
  },
  {
    id: 'attila',
    quote: {
      ro: 'Priveliște superbă spre Munții Făgăraș, dimineața soarele intră în bucătărie, o căsuță foarte îngrijită — exact pentru o retragere liniștită.',
      en: 'A beautiful view of the Făgăraș mountains, morning sun coming into the kitchen, a very neat little house — exactly right for a quiet retreat.',
    },
    author: 'Attila',
    country: { ro: 'Ungaria', en: 'Hungary' },
    stayed: { ro: 'Cuplu · 3 nopți', en: 'Couple · 3 nights' },
    score: 10,
    source: 'Booking.com',
  },
  {
    id: 'jingfeng',
    quote: {
      ro: 'Un loc extraordinar, cu vedere frumoasă la munte și decor plăcut. Gazda a fost foarte prietenoasă și dispusă să ajute. Dacă va fi nevoie, îl voi alege din nou!',
      en: 'Extraordinary apartment, nice mountain view and nice decoration, the landlord was very friendly and willing to help. If need I will choose next time!',
    },
    author: 'Jingfeng',
    country: { ro: 'China', en: 'China' },
    stayed: { ro: 'Cuplu · 1 noapte', en: 'Couple · 1 night' },
    score: 10,
    source: 'Booking.com',
  },
  {
    id: 'teodora',
    quote: {
      ro: 'O locație foarte frumoasă, extrem de curată și cu o priveliște superbă către munții Făgăraș. Am apreciat atenția la detalii și faptul că gazda a fost foarte comunicativă. Cu siguranță aș reveni.',
      en: 'A very beautiful location, spotless, with a superb view towards the Făgăraș mountains. We appreciated the attention to detail and how communicative the host was. I would certainly come back.',
    },
    author: 'Teodora',
    country: { ro: 'România', en: 'Romania' },
    stayed: { ro: 'Grup · 1 noapte', en: 'Group · 1 night' },
    score: 10,
    source: 'Booking.com',
  },
];
