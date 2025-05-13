/** @format */

import Link from 'next/link';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { getAbsoluteUrl } from '@/lib/utils';
import { SERVICES } from '@/lib/service';
import ServicesSection from '@/components/services-section';
import KeywordsSection from '@/components/keywords-section';

export const dynamic = 'force-static';

export async function generateMetadata() {
  return {
    title: 'SMS Services | SMSlly - Receive SMS Online',
    description:
      'Browse our comprehensive list of SMS services. Find the perfect temporary phone number service for your needs - verification codes, messages, and more.',
    keywords: [
      'SMS services',
      'temporary phone services',
      'SMS verification services',
      'virtual number services',
      'SMS receiving services',
    ],
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
      <h1 className='text-3xl font-bold mb-6'>Receive SMS Online by Service</h1>
      <div className='space-y-8'>
        <ServicesSection
          showAll={true}
          baseUrl={'service'}
        />
        <KeywordsSection />
      </div>
    </div>
  );
}
