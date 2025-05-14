/** @format */

import { Country } from 'country-state-city';
import Link from 'next/link';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { getAbsoluteUrl } from '@/lib/utils';
import CountriesSection from '@/components/countries-section';
import PhoneNumberGrid from '@/components/phone-number-grid';
import KeywordsSection from '@/components/keywords-section';

export const dynamic = 'force-static';

export async function generateMetadata() {
  return {
    title: 'Receive SMS Online by Country | Receive SMS Online — SMSlly',
    description:
      'Find temporary phone numbers and SMS receiving services available in your country. Get instant access to online numbers for SMS verification, privacy, and security. Browse our global network of SMS services by location.',
    keywords: [
      'SMS by country',
      'international SMS',
      'country phone numbers',
      'global SMS service',
      'local SMS numbers',
      'temporary phone number',
      'SMS verification',
      'receive SMS online',
      'online phone number',
      'virtual phone number',
      'disposable phone number',
      'free SMS verification',
      'SMS receiving service',
    ],
    openGraph: {
      title: 'Receive SMS Online by Country | Receive SMS Online — SMSlly',
      description:
        'Find temporary phone numbers and SMS receiving services available in your country. Get instant access to online numbers for SMS verification, privacy, and security. Browse our global network of SMS services by location.',
    },
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
    { label: 'Countries' },
  ];

  return (
    <div className='p-6 w-full max-w-7xl mx-auto'>
      <div className='mb-6'>
        <BreadcrumbNav items={breadcrumbItems} />
      </div>
      <h1 className='text-3xl font-bold mb-4'>SMS Services by Country</h1>
      <div className='my-4 space-y-8'>
        <h2>
          Free Temporary Phone Numbers Available in {countries.length} Countries
        </h2>
        <PhoneNumberGrid
          country={['united-states', 'united-kingdom', 'india', 'canada']}
        />
        <CountriesSection prefix='country' />
        <KeywordsSection />
      </div>
    </div>
  );
}
