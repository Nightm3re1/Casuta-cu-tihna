import { photoMeta, type Slug } from '@/content/gallery';

const DIR = '/images/property';

/** Widths come from the manifest, so the srcset only ever lists real files. */
const srcset = (slug: Slug, widths: number[], ext: 'avif' | 'webp') =>
  widths.map((w) => `${DIR}/${slug}-${w}.${ext} ${w}w`).join(', ');

/**
 * The property's photography.
 *
 * The files are pre-optimised at build time into AVIF and WebP at three widths
 * (see scripts/fetch-photos.mjs), so they are served straight from the origin
 * with no runtime image optimisation in the path — one fewer hop, and no
 * per-request transform cost on the host.
 *
 * A <picture> element lets the browser choose AVIF where it can and fall back
 * to WebP where it cannot, and the inline blur placeholder means a card is
 * never blank while the photograph decodes.
 */
export default function Photo({
  slug,
  alt,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw',
  priority = false,
  objectPosition,
}: {
  slug: Slug;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
}) {
  const meta = photoMeta(slug);
  const widths = meta?.widths?.length ? meta.widths : [640, 1024];
  const fallbackWidth = widths[Math.min(1, widths.length - 1)];
  const decorative = alt.trim() === '';

  return (
    <picture>
      <source type="image/avif" srcSet={srcset(slug, widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(slug, widths, 'webp')} sizes={sizes} />
      <img
        src={`${DIR}/${slug}-${fallbackWidth}.webp`}
        alt={alt}
        {...(decorative ? { 'aria-hidden': true } : {})}
        width={meta?.width ?? 1536}
        height={meta?.height ?? 1024}
        loading={priority ? 'eager' : 'lazy'}
        // fetchPriority steers the LCP image ahead of the rest of the queue.
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        style={{
          objectPosition,
          // The blur stands in until the photograph paints, so no card is ever
          // an empty rectangle. It is a ~100-byte inline WebP.
          backgroundImage: meta ? `url(${meta.blurDataURL})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: objectPosition ?? 'center',
        }}
      />
    </picture>
  );
}
