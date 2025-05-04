/** @format */

import { ReactNode } from 'react';
import { getSEOTags } from '@/lib/seo';
import config from '@/config';

export const metadata = getSEOTags({
  title: `All Assets | ${config.appName}`,
  description:
    'Browse and compare all assets against Bitcoin. View stocks, commodities, cryptocurrencies, real estate, indices, and bonds in real-time.',
  canonicalUrlRelative: '/all',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
