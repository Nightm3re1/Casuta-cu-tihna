import type { Dict } from './schema';

export const ro: Dict = {
  meta: {
    title: 'Căsuța cu Tihnă — casă din 1923 la poalele Făgărașului, Porumbacu de Sus',
    description:
      'Căsuță de bârne din 1923, restaurată în 2021, la poalele Făgărașului. 80 mp, până la 4 oaspeți, două băi, terasă cu vedere la munți. 9,9 pe Booking. Rezervi direct, fără comision.',
    ogAlt: 'Căsuța cu Tihnă — casă tradițională restaurată la poalele munților Făgăraș',
  },

  nav: {
    story: 'Povestea',
    space: 'Casa',
    area: 'Împrejurimi',
    reviews: 'Oaspeți',
    rates: 'Tarife',
    faq: 'Întrebări',
    book: 'Verifică datele',
    menu: 'Deschide meniul',
    close: 'Închide meniul',
  },

  hero: {
    eyebrow: 'Porumbacu de Sus · Poalele Făgărașului',
    title: 'Din 1923, casa asta face bine un singur lucru:',
    titleAccent: 'te lasă în pace.',
    lede:
      'Căsuță de sine stătătoare din bârne, restaurată în 2021 fără să i se schimbe firea. 80 m² pe două niveluri, până la 4 oaspeți, două băi și toată creasta Făgărașului de pe terasă.',
    ctaPrimary: 'Vezi datele libere',
    ctaSecondary: 'Fă turul casei',
    scrollHint: 'Derulează — se construiește',
    animationLabel:
      'Animație: planul căsuței din 1923 se ridică din desen tehnic în casă terminată, pe măsură ce derulezi pagina.',
    stats: [
      { value: '1923', label: 'anul de pe grindă' },
      { value: '80 m²', label: 'numai pentru tine' },
      { value: '4', label: 'oaspeți' },
      { value: '9,9', label: 'nota pe Booking' },
    ],
  },

  trust: {
    intro: 'Ne găsești și pe',
    ratingLabel: 'recenzii pe Booking',
    items: ['Rezervare directă, fără comision', 'Răspuns personal de la gazdă în maxim 24 de ore', 'Recepție deschisă nonstop'],
  },

  story: {
    eyebrow: 'Povestea',
    title: 'Am cumpărat o casă bătrână și i-am lăsat vârsta la vedere.',
    body: [
      'A fost ridicată în 1923 de meșteri din sat, care au lucrat lemnul cu mâinile lor și au sculptat fiecare bârnă. A fost casă de familie pentru mai multe generații — martoră la vremuri apuse și la viața simplă din Transilvania de altădată.',
      'În 2021 am restaurat-o cu o singură regulă: să păstrăm spiritul locului. Fiecare bârnă a fost curățată și tratată, nu înlocuită. Am adus doar confortul necesar — încălzire, două băi (una la parter, una la etaj), o bucătărie complet utilată — fără modernitate ostentativă.',
      'Ce n-am pus: nimic care să acopere liniștea. Un oaspete a scris că se aud doar păsările și albinele. Exact asta am vrut să rămână.',
    ],
    pull: 'Păstrarea bârnelor originale n-a fost o decizie estetică — a fost un omagiu adus meșterilor care au construit casa acum un secol.',
    signature: 'Gazdele, Porumbacu de Sus',
    caption: 'Livingul de la parter, cu șemineul și bârnele originale curățate manual în 2021.',
  },

  benefits: {
    eyebrow: 'De ce aici',
    title: 'Lucrurile pentru care oaspeții revin.',
    lede: 'Nu inventăm argumente. Cele de mai jos sunt exact temele care se repetă în cele 52 de recenzii de pe Booking.',
    items: [
      {
        title: 'Creasta, direct de pe terasă',
        body: 'Aproape fiecare recenzie pomenește priveliștea. Terasa privește spre Munții Făgăraș, iar dimineața soarele intră direct în bucătărie.',
      },
      {
        title: 'O liniște pe care o poți auzi',
        body: '„Doar păsările și albinele se aud în liniștea zilei.” Suntem la marginea satului, pe o stradă laterală, cu curte îngrădită și intimitate completă.',
      },
      {
        title: 'Curățenie 10 din 10',
        body: 'Nu e o figură de stil: e nota exactă pe care ne-o dau oaspeții la capitolul curățenie, din 52 de evaluări.',
      },
      {
        title: 'Două băi, una pe fiecare nivel',
        body: 'Baie la parter și baie la etaj. Pentru patru oameni care vor să plece dimineața la munte în același timp, asta schimbă tot.',
      },
      {
        title: 'Mic dejun adus în coș de picnic',
        body: 'La cerere pregătim mic dejun, prânz sau cină. Micul dejun ajunge într-un coș, bogat și făcut din bunătăți locale — e lucrul cel mai lăudat după priveliște.',
      },
      {
        title: 'Vorbești direct cu gazda',
        body: 'Personal: 10 din 10 pe Booking. Fără recepție, fără intermediari — un răspuns personal, de obicei în câteva ore.',
      },
    ],
  },

  space: {
    eyebrow: 'Casa',
    title: 'Optzeci de metri pătrați, pe două niveluri.',
    lede:
      'La parter: bucătăria complet utilată, livingul cu șemineu și o baie. La etaj: dormitorul cu pat matrimonial și a doua baie. Atât — și exact cât trebuie.',
    specs: [
      { label: 'Suprafață', value: '~80 mp' },
      { label: 'Oaspeți', value: 'până la 4' },
      { label: 'Dormitor', value: '1, la etaj' },
      { label: 'Băi', value: '2 — parter și etaj' },
      { label: 'Încălzire', value: 'șemineu în living' },
      { label: 'Wi-Fi', value: 'gratuit, în toată casa' },
    ],
    galleryCta: 'Vezi toate fotografiile',
  },

  amenities: {
    eyebrow: 'Dotări',
    title: 'Tot ce găsești, fără surprize.',
    lede: 'Lista completă, scrisă înainte să rezervi — nu după ce ajungi.',
    groups: [
      {
        title: 'Bucătărie & cafea',
        items: ['Plită electrică', 'Cuptor', 'Frigider', 'Aparat Nespresso cu capsule gratuite', 'Fierbător și prăjitor de pâine', 'Bucătărie complet utilată'],
      },
      {
        title: 'Living & dormitor',
        items: ['Șemineu', 'TV cu satelit', 'Canapea', 'Pat matrimonial confortabil', 'Lenjerie de calitate inclusă', 'Prosoape și produse de igienă'],
      },
      {
        title: 'Curte & terasă',
        items: ['Terasă cu vedere la Făgăraș', 'Zonă grătar, cu lemne și cărbuni incluse', 'Bar exterior', 'Grădină și curte generoasă', 'Parcare privată gratuită', 'Curte îngrădită, intimitate completă'],
      },
      {
        title: 'Practic & activități',
        items: ['Wi-Fi gratuit', 'Recepție deschisă nonstop', 'Biciclete gratuite', 'Echipament de badminton', 'Mic dejun, prânz și cină la cerere', 'Intrare complet separată'],
      },
    ],
    note: 'Pentru animale de companie sau cerințe speciale, vorbește direct cu gazda — comunicarea directă permite soluții personalizate.',
  },

  area: {
    eyebrow: 'Împrejurimi',
    title: 'Ce ai de făcut, dacă vrei să faci ceva.',
    lede: 'Suntem la poalele Făgărașului, între Transfăgărășan și Transalpina. Distanțele sunt pe șosea.',
    items: [
      {
        name: 'Drumeții și ciclism',
        distance: 'de la poartă',
        body: 'Trasee montane pornesc chiar din zonă, iar bicicletele sunt incluse. Pentru zilele leneșe, avem și echipament de badminton în curte.',
      },
      {
        name: 'Sibiu, centrul vechi',
        distance: '38 km',
        body: 'Piața Unirii e la 38 km, iar Pasajul Scărilor la 39. Aeroportul Sibiu, la 42 km — util dacă vii cu avionul.',
      },
      {
        name: 'Castelul de Lut',
        distance: 'Valea Zânelor',
        body: 'Restaurant cu specific tradițional românesc, într-una dintre cele mai spectaculoase locații din țară. Accesul se face doar pe bază de rezervare.',
      },
      {
        name: 'Povestea Calendarului',
        distance: 'în zonă',
        body: 'O expoziție surprinzător de bună despre istoria calendarului. Cea mai bună oră pe care o poți petrece pe vreme rea.',
      },
      {
        name: 'Casa Întoarsă & Ferma de cerbi',
        distance: 'în zonă',
        body: 'Casa Întoarsă e o atracție unică în România. Ferma de cerbi merită mai ales dacă vii cu copii — se pot hrăni animalele.',
      },
      {
        name: 'Panoramic Park',
        distance: 'în zonă',
        body: 'Parc de aventură cu priveliști spre creastă. Bun pentru o după-amiază activă, fără să pleci departe de casă.',
      },
    ],
  },

  reviews: {
    eyebrow: 'Oaspeți',
    title: 'Ce spun oamenii după ce pleacă.',
    lede: 'Recenzii lăsate de oaspeți care au stat efectiv aici.',
    sourceLabel: 'Sursă',
    verified: 'Oaspete verificat',
    prev: 'Recenzia anterioară',
    next: 'Recenzia următoare',
    goTo: 'Mergi la recenzia',
  },

  rates: {
    eyebrow: 'Tarife',
    title: 'Un preț, pentru toată casa.',
    lede:
      'Cel mai bun tarif e întotdeauna direct prin gazdă. Platformele adaugă 15–25% comision — rezervând direct, prețul rămâne corect.',
    tiers: [
      { name: 'Până la 2 persoane', period: 'toată casa, exclusiv', price: '500', unit: 'lei / noapte', note: 'ideal pentru cupluri' },
      { name: 'Până la 4 persoane', period: 'toată casa, exclusiv', price: '700', unit: 'lei / noapte', note: 'capacitate maximă', featured: true },
      { name: 'Mese la cerere', period: 'discutate în avans', price: '—', unit: 'mic dejun · prânz · cină', note: 'tarif stabilit cu gazda' },
    ],
    includedTitle: 'Incluse în preț, întotdeauna',
    included: [
      'Toată casa și curtea, exclusiv',
      'Lenjerie, prosoape și produse de igienă',
      'Lemne și cărbuni pentru grătar',
      'Parcare privată gratuită',
      'Wi-Fi și biciclete',
      'Capsule de cafea Nespresso',
    ],
    fineprint: [
      'Check-in de la 15:00, check-out până la 11:00. Aranjamentele pentru check-in timpuriu sau check-out târziu se discută direct cu gazda.',
      'Politica de anulare se stabilește direct cu gazda la momentul rezervării — rezervând direct, ai flexibilitate sporită.',
      'Fără taxe de platformă și fără costuri ascunse.',
      'Pentru animale de companie sau evenimente speciale, contactează direct gazda.',
    ],
    cta: 'Verifică datele tale',
    ctaNote: 'Primești un răspuns personal de la gazdă în maxim 24 de ore.',
  },

  faq: {
    eyebrow: 'Întrebări',
    title: 'Lucrurile pe care ni le scrieți cel mai des.',
    lede: 'Dacă nu găsești răspunsul aici, scrie-ne. Nu e nicio întrebare prea mică.',
    items: [
      {
        q: 'Câți oameni încap, de fapt?',
        a: 'Patru, și hai să fim exacți: un dormitor cu pat matrimonial la etaj, plus spațiu de dormit în livingul de la parter. Pentru un cuplu e generos; pentru două cupluri sau o familie cu doi copii, e exact cât trebuie. Peste patru nu primim — preferăm să spunem nu decât să vă înghesuim.',
      },
      {
        q: 'Chiar sunt două băi?',
        a: 'Da — una la parter și una la etaj, amândouă moderne, cu prosoape și produse de igienă incluse. E detaliul pe care oaspeții îl remarcă cel mai des după priveliște.',
      },
      {
        q: 'Cum funcționează mesele?',
        a: 'La cerere pregătim mic dejun, prânz sau cină, în funcție de preferințe. Micul dejun vine într-un coș de picnic și e făcut din produse locale. Trebuie discutat în prealabil cu gazda — spune-ne din timp preferințele alimentare și eventualele alergii.',
      },
      {
        q: 'Se ajunge ușor cu mașina?',
        a: 'Da. Suntem la marginea satului, pe o stradă laterală liniștită, cu parcare privată gratuită în curte. Indicațiile precise de acces le trimitem după confirmarea rezervării.',
      },
      {
        q: 'Cum e cu internetul?',
        a: 'Wi-Fi gratuit în toată casa și TV cu satelit în living. Recepția e deschisă nonstop, deci dacă apare ceva la ora două noaptea, tot ne găsești.',
      },
      {
        q: 'Ce fac dacă e închis Transfăgărășanul?',
        a: 'Din noiembrie până în iunie porțiunea de sus e închisă — dar Sibiul e la 38 km, Castelul de Lut merită în orice anotimp, iar iarna cei mai mulți oaspeți vin exact pentru asta: șemineul, zăpada și nimic de făcut.',
      },
      {
        q: 'Care e politica de anulare?',
        a: 'Se stabilește direct cu gazda la momentul rezervării. Tocmai pentru că nu trecem printr-o platformă, avem loc de flexibilitate — spune-ne situația și găsim o soluție.',
      },
      {
        q: 'De ce să rezerv direct și nu prin platforme?',
        a: 'Platformele adaugă comisioane de 15–25%, pe care le plătește cineva — tu sau gazda. Rezervând direct plătești prețul corect, vorbești cu omul care îți deschide ușa și primești recomandări personale, nu o experiență standardizată.',
      },
    ],
    stillAsking: 'Mai ai o întrebare?',
    contactCta: 'Scrie-ne pe WhatsApp',
  },

  finalCta: {
    eyebrow: 'Rezervă',
    title: 'Weekendurile bune se ocupă cu două luni înainte.',
    lede:
      'Casa se închiriază întreagă, unui singur grup. Asta înseamnă că sunt puține date libere — și că, atunci când prinzi una, e numai a ta.',
    primary: 'Verifică disponibilitatea',
    secondary: 'Întreabă-ne pe WhatsApp',
    reassure: ['Răspuns personal în maxim 24 de ore', 'Fără comisioane de platformă', 'Recepție deschisă nonstop'],
  },

  footer: {
    blurb: 'Căsuță din 1923, restaurată și închiriată întreagă, la poalele munților Făgăraș.',
    nav: 'Navigare',
    contact: 'Contact',
    book: 'Rezervă',
    rights: 'Toate drepturile rezervate.',
    built: 'Porumbacu de Sus, județul Sibiu',
    address: 'Strada Principală nr. 489B, Porumbacu de Sus, jud. Sibiu',
  },

  stickyBar: { label: 'de la 500 lei / noapte · toată casa', cta: 'Rezervă' },
  langSwitch: { label: 'Schimbă limba', ro: 'Română', en: 'English' },
  skipToContent: 'Sari la conținut',
};
