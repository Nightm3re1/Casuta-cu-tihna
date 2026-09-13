import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://casuta-cu-tihna.ro'),
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF6EE' },
    { media: '(prefers-color-scheme: dark)', color: '#0A120E' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/** The locale layout under [locale] renders <html>; this only passes through. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
