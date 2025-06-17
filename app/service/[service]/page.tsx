/** @format */

import { Country } from 'country-state-city';
import { notFound } from 'next/navigation';
import { getAbsoluteUrl } from '@/lib/utils';
import Link from 'next/link';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { SERVICES } from '@/lib/service';
import CountriesSection from '@/components/countries-section';
import KeywordsSection from '@/components/keywords-section';

// Remove static generation - render on demand
// export const dynamic = 'force-static';
// export const revalidate = false;

// Comment out static params generation
// export async function generateStaticParams() {
//   return SERVICES.map((service) => ({
//     service: service.toLowerCase().replace(/\s+/g, '-'),
//   }));
// }

export async function generateMetadata({
  params,
}: {
  params: { service: string };
}) {
  const serviceData = getServiceData(params.service);
  if (!serviceData) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: `${serviceData}`,
    description: `Find ${serviceData}. Browse through various locations and opportunities.`,
  };
}

function getServiceData(serviceParam: string) {
  const service = SERVICES.find(
    (s) => s.toLowerCase().replace(/\s+/g, '-') === serviceParam.toLowerCase()
  );
  return service || null;
}

export default function ServicePage({
  params,
}: {
  params: { service: string };
}) {
  const serviceData = getServiceData(params.service);
  if (!serviceData) {
    notFound();
  }

  const countries = Country.getAllCountries()
    .map((country) => ({
      code: country.name.toLowerCase().replace(/\s+/g, '-'),
      name: country.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const breadcrumbItems = [
    { label: 'Home', href: getAbsoluteUrl('/') },
    { label: 'Services' },
    { label: serviceData },
  ];

  return (
    <div className='p-6 w-full max-w-7xl mx-auto'>
      <div className='mb-6'>
        <BreadcrumbNav items={breadcrumbItems} />
      </div>
      <h1 className='text-3xl font-bold mb-6'>
        Receive SMS Online for {serviceData}
      </h1>
      <div className='space-y-8'>
        <CountriesSection
          prefix={`receive-sms-online/${serviceData
            .toLowerCase()
            .replace(/\s+/g, '-')}`}
        />
        <KeywordsSection />
      </div>
    </div>
  );
}
