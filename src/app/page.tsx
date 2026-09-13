import { redirect } from 'next/navigation';
import { defaultLocale } from '@/content/site';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
