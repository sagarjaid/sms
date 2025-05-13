/** @format */

import { Country } from 'country-state-city';
import Link from 'next/link';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { getAbsoluteUrl } from '@/lib/utils';

export const dynamic = 'force-static';

export async function generateMetadata() {
  return {
    title: 'Browse Jobs by Location',
    description:
      'Find your area. Browse through various locations and job types.',
  };
}

export default function LocationsPage() {
  const countries = Country.getAllCountries()
    .map((country) => {
      return {
        code: country.name.toLowerCase().replace(/\s+/g, '-'),
        name: country.name,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const breadcrumbItems = [
    { label: 'Home', href: getAbsoluteUrl('/') },
    { label: 'Country' },
  ];

  return (
    <div className='p-6 w-full max-w-7xl mx-auto'>
      <div className='mb-6'>
        <BreadcrumbNav items={breadcrumbItems} />
      </div>
      <h1 className='text-3xl font-bold mb-6'>Browse Jobs by Location</h1>
      <div className='mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Available Countries</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {countries.map((country) => (
            <Link
              href={getAbsoluteUrl(`/country/${country.code}`)}
              key={country.code}
              className='text-blue-600 underline'>
              {country.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
