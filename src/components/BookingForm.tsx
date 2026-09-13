'use client';

import { useId, useMemo, useState } from 'react';
import { site, type Locale } from '@/content/site';

const COPY = {
  ro: {
    checkIn: 'Sosire',
    checkOut: 'Plecare',
    guests: 'Oaspeți',
    guest: 'oaspete',
    guestsPl: 'oaspeți',
    submit: 'Vezi disponibilitatea',
    whatsapp: 'Întreabă pe WhatsApp',
    errDates: 'Alege și data de sosire, și data de plecare.',
    errOrder: 'Data de plecare trebuie să fie după data de sosire.',
    errMin: `Sejurul minim este de ${site.minNights} nopți.`,
    nights: (n: number) => `${n} ${n === 1 ? 'noapte' : 'nopți'}`,
    waMsg: (a: string, b: string, g: number) =>
      `Bună! Aș dori să rezerv Căsuța cu Tihnă din ${a} până în ${b}, pentru ${g} persoane. Sunt libere datele?`,
    waPlain: 'Bună! Aș dori să întreb despre disponibilitatea la Căsuța cu Tihnă.',
  },
  en: {
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    guest: 'guest',
    guestsPl: 'guests',
    submit: 'See availability',
    whatsapp: 'Ask on WhatsApp',
    errDates: 'Please choose both an arrival and a departure date.',
    errOrder: 'The departure date must be after the arrival date.',
    errMin: `The minimum stay is ${site.minNights} nights.`,
    nights: (n: number) => `${n} ${n === 1 ? 'night' : 'nights'}`,
    waMsg: (a: string, b: string, g: number) =>
      `Hello! I'd like to book Căsuța cu Tihnă from ${a} to ${b}, for ${g} guests. Are those dates free?`,
    waPlain: "Hello! I'd like to ask about availability at Căsuța cu Tihnă.",
  },
} as const;

const today = () => new Date().toISOString().slice(0, 10);

/**
 * Enquiry form.
 *
 * There is no backend here by design: the dates are handed straight to the
 * owner's Booking.com listing as real query parameters, and the WhatsApp button
 * pre-writes the same enquiry. Both paths reach a human without a server, a
 * database, or anywhere for a guest's details to leak.
 */
export default function BookingForm({ locale, tone = 'dark' }: { locale: Locale; tone?: 'dark' | 'light' }) {
  const t = COPY[locale];
  const uid = useId();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState<string | null>(null);

  const nights = useMemo(() => {
    if (!from || !to) return 0;
    const ms = new Date(to).getTime() - new Date(from).getTime();
    return ms > 0 ? Math.round(ms / 86_400_000) : 0;
  }, [from, to]);

  const validate = () => {
    if (!from || !to) return t.errDates;
    if (nights <= 0) return t.errOrder;
    if (nights < site.minNights) return t.errMin;
    return null;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const problem = validate();
    setError(problem);
    if (problem) return;

    const url = new URL(site.social.booking);
    url.searchParams.set('checkin', from);
    url.searchParams.set('checkout', to);
    url.searchParams.set('group_adults', String(guests));
    url.searchParams.set('no_rooms', '1');
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  const waHref = `${site.contact.whatsapp}?text=${encodeURIComponent(
    from && to && nights > 0 ? t.waMsg(from, to, guests) : t.waPlain,
  )}`;

  const dark = tone === 'dark';
  const field = `w-full rounded-sm border px-3.5 py-3 text-sm transition-colors ${
    dark
      ? 'border-cream/20 bg-cream/[0.06] text-cream [color-scheme:dark] placeholder:text-cream/60 focus:border-brass-400'
      : 'border-stone bg-cream text-forest-900 focus:border-brass-500'
  }`;
  const label = `mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${
    dark ? 'text-cream/70' : 'text-forest-500'
  }`;

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor={`${uid}-in`} className={label}>{t.checkIn}</label>
          <input
            id={`${uid}-in`} type="date" value={from} min={today()}
            onChange={(e) => { setFrom(e.target.value); setError(null); }}
            className={field} required
          />
        </div>
        <div>
          <label htmlFor={`${uid}-out`} className={label}>{t.checkOut}</label>
          <input
            id={`${uid}-out`} type="date" value={to} min={from || today()}
            onChange={(e) => { setTo(e.target.value); setError(null); }}
            className={field} required
          />
        </div>
        <div>
          <label htmlFor={`${uid}-g`} className={label}>{t.guests}</label>
          <select
            id={`${uid}-g`} value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className={field}
          >
            {Array.from({ length: site.maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? t.guest : t.guestsPl}</option>
            ))}
          </select>
        </div>
      </div>

      <p aria-live="polite" className="min-h-[1.4rem] pt-2 text-[0.8rem]">
        {error ? (
          <span className={dark ? 'text-ember' : 'text-ember'}>{error}</span>
        ) : nights > 0 ? (
          <span className={dark ? 'text-cream/70' : 'text-forest-500'}>{t.nights(nights)}</span>
        ) : null}
      </p>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn-primary flex-1">{t.submit}</button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${dark ? 'btn-ghost-light' : 'btn-secondary'} flex-1`}
        >
          {t.whatsapp}
        </a>
      </div>
    </form>
  );
}
