import { ro } from '@/content/ro';
import { en } from '@/content/en';
import { defaultLocale, locales, type Locale } from '@/content/site';
import type { Dict } from '@/content/schema';

const dictionaries: Record<Locale, Dict> = { ro, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export const otherLocale = (locale: Locale): Locale => (locale === 'ro' ? 'en' : 'ro');

export type { Locale, Dict };
