/** @format */

import { Country } from 'country-state-city';
import { notFound } from 'next/navigation';
import { getAbsoluteUrl } from '@/lib/utils';
import Link from 'next/link';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { SERVICES } from '@/lib/service';

// Explicitly mark page as static
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    service: service.toLowerCase().replace(/\s+/g, '-'),
  }));
}

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
      <h1 className='text-3xl font-bold mb-6'>Browse {serviceData}</h1>
      <div className='mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Available Locations</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {countries.map((country) => (
            <Link
              href={getAbsoluteUrl(
                `/receive-sms-online/${serviceData
                  .toLowerCase()
                  .replace(/\s+/g, '-')}/${country.code}`
              )}
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
