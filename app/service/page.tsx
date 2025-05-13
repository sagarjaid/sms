/** @format */

import Link from 'next/link';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { getAbsoluteUrl } from '@/lib/utils';
import { SERVICES } from '@/lib/service';

export const dynamic = 'force-static';

export async function generateMetadata() {
  return {
    title: 'Browse Jobs by Service',
    description:
      'Find jobs by service type. Browse through various services and opportunities.',
  };
}

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: 'Home', href: getAbsoluteUrl('/') },
    { label: 'Services' },
  ];

  return (
    <div className='p-6 w-full max-w-7xl mx-auto'>
      <div className='mb-6'>
        <BreadcrumbNav items={breadcrumbItems} />
      </div>
      <h1 className='text-3xl font-bold mb-6'>Browse Jobs by Service</h1>
      <div className='mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Available Services</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {SERVICES.map((service) => (
            <Link
              href={getAbsoluteUrl(
                `/service/${service.toLowerCase().replace(/\s+/g, '-')}`
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
