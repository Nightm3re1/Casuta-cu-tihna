/**
 * Fetches the property photography from the owner's own CDN and writes
 * web-optimised copies into public/images/property/.
 *
 * Why this exists: the photographs live on the CDN that already serves
 * casuta-cu-tihna.ro. Committing optimised copies into this repository means
 * the site serves its own images — no third-party runtime dependency, and the
 * files are versioned alongside the code.
 *
 * Run with `npm run photos`. CI runs it via .github/workflows/fetch-photos.yml
 * and commits the result, so the binaries enter the repo without ever being
 * hand-copied.
 */
import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const CDN = 'https://websites-images-prv.fra1.cdn.digitaloceanspaces.com/images_casuta-cu-tihna';
const OUT = 'public/images/property';

/** source name on the CDN → the slug this site uses. */
const PHOTOS = {
  'casuta-cu-tihna-fatada-exterioara': 'exterior-fatada',
  'casuta-cu-tihna-vedere-laterala': 'exterior-lateral',
  'gradina-casuta-cu-tihna': 'gradina',
  'living-casuta-cu-tihna': 'living',
  'dormitor-casuta-cu-tihna': 'dormitor',
  'bucatarie-casuta-cu-tihna': 'bucatarie',
  'baie-casuta-cu-tihna': 'baie',
  'cabina-de-dus-casuta-cu-tihna': 'dus',
};

/** Widths emitted per photo. next/image picks from these via `sizes`. */
const WIDTHS = [640, 1024, 1536];

const exists = (p) => access(p).then(() => true, () => false);

async function download(name) {
  const url = `${CDN}/${name}.webp`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const manifest = {};

  for (const [source, slug] of Object.entries(PHOTOS)) {
    const src = await download(source);
    const meta = await sharp(src).metadata();

    for (const w of WIDTHS) {
      if (meta.width && w > meta.width) continue;
      const base = sharp(src).resize({ width: w, withoutEnlargement: true });
      await writeFile(join(OUT, `${slug}-${w}.avif`), await base.clone().avif({ quality: 52, effort: 6 }).toBuffer());
      await writeFile(join(OUT, `${slug}-${w}.webp`), await base.clone().webp({ quality: 74 }).toBuffer());
    }

    // A 16px blur placeholder, inlined so the card never flashes empty.
    const lqip = await sharp(src).resize(16).blur(1).webp({ quality: 40 }).toBuffer();
    manifest[slug] = {
      width: meta.width ?? null,
      height: meta.height ?? null,
      // Only the widths actually written, so the srcset can never point at a
      // file that does not exist.
      widths: WIDTHS.filter((w) => !meta.width || w <= meta.width),
      blurDataURL: `data:image/webp;base64,${lqip.toString('base64')}`,
    };
    console.log(`✓ ${slug}  ${meta.width}×${meta.height}`);
  }

  await writeFile(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\nWrote ${Object.keys(PHOTOS).length} photos × ${WIDTHS.length} widths → ${OUT}`);
}

main().catch((err) => {
  console.error('Photo fetch failed:', err.message);
  process.exit(1);
});
