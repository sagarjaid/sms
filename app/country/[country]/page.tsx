/** @format */

import { Country } from 'country-state-city';
import { notFound } from 'next/navigation';
import { getAbsoluteUrl } from '@/lib/utils';
import Link from 'next/link';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { SERVICES } from '@/lib/service';
import PhoneNumberGrid from '@/components/phone-number-grid';
import ServicesSection from '@/components/services-section';
import KeywordsSection from '@/components/keywords-section';

// Explicitly mark page as static
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  return Country.getAllCountries().map((country) => ({
    country: encodeURIComponent(
      country.name.toLowerCase().replace(/\s+/g, '-')
    ),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { country: string };
}) {
  const countryData = getCountryData(params.country);
  if (!countryData) {
    return {
      title: 'Country Not Found | SMSlly',
      description: 'The requested country could not be found.',
    };
  }

  return {
    title: `${countryData.name} SMS Numbers | Receive SMS Online — SMSlly`,
    description: `Get temporary phone numbers and SMS receiving services in ${countryData.name}. Receive SMS online for verification, privacy, and security. Instant access to ${countryData.name} phone numbers.`,
    keywords: [
      `${countryData.name} SMS`,
      `${countryData.name} phone numbers`,
      `${countryData.name} temporary number`,
      `${countryData.name} SMS verification`,
      `receive SMS in ${countryData.name}`,
      `${countryData.name} online number`,
      `${countryData.name} virtual number`,
      `${countryData.name} disposable number`,
      `free SMS verification ${countryData.name}`,
      `${countryData.name} SMS receiving service`,
    ],
    openGraph: {
      title: `${countryData.name} SMS Numbers | Receive SMS Online — SMSlly`,
      description: `Get temporary phone numbers and SMS receiving services in ${countryData.name}. Receive SMS online for verification, privacy, and security. Instant access to ${countryData.name} phone numbers.`,
    },
  };
}

function getCountryData(countryParam: string) {
  // First decode the URL parameter
  const decodedParam = decodeURIComponent(countryParam);
  // Convert kebab-case to space-separated and normalize
  const normalizedName = decodedParam.toLowerCase().replace(/-/g, ' ');

  // Try to find by name first
  const allCountries = Country.getAllCountries();
  const countryByName = allCountries.find(
    (c) => c.name.toLowerCase() === normalizedName
  );

  if (countryByName) return countryByName;

  // If not found by name, try by code
  const countryCode = decodedParam.toUpperCase();
  const country = Country.getCountryByCode(countryCode);

  return country || null;
}

export default function CountryPage({
  params,
}: {
  params: { country: string };
}) {
  const countryData = getCountryData(params.country);
  if (!countryData) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: getAbsoluteUrl('/') },
    { label: 'Countries', href: getAbsoluteUrl('/country') },
    { label: countryData.name },
  ];

  return (
    <div className='p-6 w-full max-w-7xl mx-auto'>
      <div className='mb-6'>
        <BreadcrumbNav items={breadcrumbItems} />
      </div>
      <h1 className='text-3xl font-bold mb-6'>
        {countryData.name} SMS Services
      </h1>
      <div className='space-y-8'>
        <PhoneNumberGrid
          country={[countryData.name.toLowerCase().replace(/\s+/g, '-')]}
        />

        <ServicesSection
          showAll={false}
          prefix='receive-sms-online'
          suffix={`${countryData.name.toLowerCase().replace(/\s+/g, '-')}`}
        />

        <KeywordsSection />
      </div>
    </div>
  );
}
