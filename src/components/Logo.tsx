/**
 * The mark: a limewashed arch — the shape of the cottage's window and door
 * heads — with the gable roofline and its round loft light set inside it.
 *
 * Drawn rather than bitmapped so it stays crisp at favicon and billboard size
 * and inherits `currentColor` from whatever it sits on. To swap in the owner's
 * official Instagram mark, replace the <svg> body only — every size, colour and
 * layout decision lives outside this file.
 */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true" focusable="false">
      <path
        d="M6.5 36V18.5a13.5 13.5 0 0 1 27 0V36"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path d="M11 21.4 20 13l9 8.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="26.6" r="2.9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 36h32" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  className = '',
  markClass = 'h-9 w-9',
  stacked = false,
  compact = false,
}: {
  className?: string;
  markClass?: string;
  stacked?: boolean;
  /** Drops the locality line below 400px, where the header runs out of room. */
  compact?: boolean;
}) {
  return (
    <span className={`inline-flex min-w-0 items-center ${stacked ? 'flex-col gap-2' : 'gap-2.5 sm:gap-3'} ${className}`}>
      <LogoMark className={`shrink-0 ${markClass}`} />
      <span className={`min-w-0 font-display leading-none ${stacked ? 'text-center' : ''}`}>
        <span className="block truncate text-[0.95rem] font-semibold tracking-tight sm:text-[1.05rem]">
          Căsuța cu Tihnă
        </span>
        <span
          className={`mt-1 ${compact ? 'hidden xs:block' : 'block'} truncate text-[0.62rem] font-sans font-medium uppercase tracking-[0.22em] opacity-80`}
        >
          Porumbacu de Sus · 1923
        </span>
      </span>
    </span>
  );
}
