import Link from 'next/link';
import { defaultLocale } from '@/content/site';

export default function NotFound() {
  return (
    <html lang={defaultLocale}>
      <body className="grid min-h-screen place-items-center bg-cream px-6 text-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-600">404</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-forest-900">
            Pagina nu există
          </h1>
          <p className="mt-3 text-forest-600">This page could not be found.</p>
          <Link href={`/${defaultLocale}`} className="btn-primary mt-8">
            Înapoi acasă · Back home
          </Link>
        </div>
      </body>
    </html>
  );
}
