/** @format */

import { Country } from 'country-state-city';
import { notFound } from 'next/navigation';
import { getAbsoluteUrl } from '@/lib/utils';
import Link from 'next/link';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { SERVICES } from '@/lib/service';
import PhoneNumberGrid from '@/components/phone-number-grid';

// Explicitly mark page as static
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  return Country.getAllCountries().map((country) => ({
    country: country.name.toLowerCase().replace(/\s+/g, '-'),
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
      title: 'Country Not Found',
      description: 'The requested country could not be found.',
    };
  }

  return {
    title: `${countryData.name}`,
    description: `Find ${countryData.name}. Browse through various job types and opportunities.`,
  };
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
    { label: 'Country' },
    { label: countryData.name },
  ];

  return (
    <div className='p-6 w-full max-w-7xl mx-auto'>
      <div className='mb-6'>
        <BreadcrumbNav items={breadcrumbItems} />
      </div>
      <h1 className='text-3xl font-bold mb-6'>Browse Jobs by Location</h1>
      <div className='mb-8'>
        <PhoneNumberGrid />
        <h2 className='text-xl font-semibold mb-4'>Available Services</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {SERVICES.map((service) => (
            <Link
              href={getAbsoluteUrl(
                `/receive-sms-online/${service
                  .toLowerCase()
                  .replace(/\s+/g, '-')}/${countryData.name
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`
              )}
              key={service}
              className='text-blue-600 underline'>
              {service}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
