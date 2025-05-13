/** @format */

import { Country } from 'country-state-city';
import { notFound } from 'next/navigation';
import MessagesClient from './messages-client';

// Explicitly mark page as static
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  const params = [];

  // This would typically come from an API or database
  const PHONE_NUMBERS = [
    { phoneNumber: '13132003002', country: 'united-states' },
    { phoneNumber: '13462042708', country: 'united-states' },
    { phoneNumber: '13137425508', country: 'united-states' },
    { phoneNumber: '13132102924', country: 'united-states' },
    { phoneNumber: '14066306572', country: 'united-states' },
  ];

  for (const number of PHONE_NUMBERS) {
    params.push({
      country: number.country,
      phoneNumber: number.phoneNumber,
    });
  }

  return params;
}

function getCountryData(countryParam: string) {
  // Convert kebab-case to space-separated and normalize
  const normalizedName = countryParam.toLowerCase().replace(/-/g, ' ');

  // Try to find by name first
  const allCountries = Country.getAllCountries();
  const countryByName = allCountries.find(
    (c) => c.name.toLowerCase() === normalizedName
  );

  if (countryByName) return countryByName;

  // If not found by name, try by code
  const countryCode = countryParam.toUpperCase();
  const country = Country.getCountryByCode(countryCode);

  return country || null;
}

export default function MessagesPage({
  params,
}: {
  params: { country: string; phoneNumber: string };
}) {
  const countryData = getCountryData(params.country);
  if (!countryData) {
    notFound();
  }

  return <MessagesClient params={params} />;
}

export async function generateMetadata({
  params,
}: {
  params: { country: string; phoneNumber: string };
}) {
  const countryData = getCountryData(params.country);
  if (!countryData) {
    return {
      title: 'Phone Number Not Found | SMSlly',
      description: 'The requested phone number could not be found.',
    };
  }

  return {
    title: `${countryData.name} temporary phone number | ${params.phoneNumber} | Receive SMS online — SMSlly`,
    description: `Receive SMS online with ${params.phoneNumber} - a temporary phone number in ${countryData.name}. Use this number for SMS verification, privacy, and security. Free SMS receiving service.`,
    keywords: [
      `${params.phoneNumber}`,
      `${countryData.name} Receive SMS online`,
      `${countryData.name} temporary number`,
      `${countryData.name} SMS verification`,
      `receive SMS ${params.phoneNumber}`,
      `${countryData.name} online number`,
      `${countryData.name} virtual number`,
      `${countryData.name} disposable number`,
      `free SMS verification ${countryData.name}`,
      `${countryData.name} SMS receiving service`,
    ],
    openGraph: {
      title: `${params.phoneNumber} | ${countryData.name} Receive SMS online — SMSlly`,
      description: `Receive SMS online with ${params.phoneNumber} - a temporary phone number in ${countryData.name}. Use this number for SMS verification, privacy, and security. Free SMS receiving service.`,
    },
  };
}
