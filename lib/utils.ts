/** @format */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import config from '@/config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAbsoluteUrl(path: string): string {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${config.domainName}`;
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function formatCountryUrl(
  countryName: string,
  prefix: string = '',
  suffix: string = ''
): string {
  const formattedName = countryName.toLowerCase().replace(/\s+/g, '-');
  const parts = [prefix, formattedName, suffix].filter(Boolean);
  return `/${parts.join('/')}`;
}
