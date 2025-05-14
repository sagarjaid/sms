/** @format */

import { Country } from 'country-state-city';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSEOTags } from '@/lib/seo';
import { KEYWORDS, Keyword } from '@/lib/keyword';
import { SERVICES, Service } from '@/lib/service';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { getAbsoluteUrl } from '@/lib/utils';
import ServicesSection from '@/components/services-section';
import KeywordsSection from '@/components/keywords-section';
import CountriesSection from '@/components/countries-section';
import PhoneNumberGrid from '@/components/phone-number-grid';

// Explicitly mark page as static
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  return KEYWORDS.map((keyword: Keyword) => ({
    jobType: keyword.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { jobType: string };
}) {
  const jobType = KEYWORDS.find(
    (type: Keyword) => type.slug === params.jobType
  );

  if (!jobType) {
    return getSEOTags({
      title: 'Page Not Found — SMSlly',
      description: 'The requested page could not be found.',
    });
  }

  return getSEOTags({
    title: `${jobType.title} | Receive SMS Online — SMSlly`,
    description: `${jobType.title.toLowerCase()} SMS verification. Free and secure SMS receiving service for ${jobType.title.toLowerCase()} messages and codes.`,
    keywords: [
      `${jobType.title} SMS`,
      `${jobType.title} verification`,
      `${jobType.title} phone number`,
      `${jobType.title} SMS service`,
      'temporary phone number',
      'SMS verification',
      'receive SMS online',
    ],
    canonicalUrlRelative: `/${jobType.slug}`,
    openGraph: {
      title: `${jobType.title} SMS Service | Receive SMS Online — SMSlly`,
      description: `${jobType.title.toLowerCase()} SMS verification. Free and secure SMS receiving service for ${jobType.title.toLowerCase()} messages and codes.`,
    },
  });
}

export default function JobTypePage({
  params,
}: {
  params: { jobType: string };
}) {
  const jobType = KEYWORDS.find(
    (type: Keyword) => type.slug === params.jobType
  );

  if (!jobType) {
    return notFound();
  }

  return (
    <div className='p-6 w-full max-w-7xl mx-auto'>
      <div className='mb-6'>
        <BreadcrumbNav
          items={[
            { label: 'Home', href: getAbsoluteUrl('/') },
            { label: jobType.title, href: getAbsoluteUrl(`/${jobType.slug}`) },
          ]}
        />
      </div>

      <h1 className='text-3xl font-bold mb-6'>{jobType.title}</h1>

      <div className='space-y-8'>
        <PhoneNumberGrid country={['united-states', 'united-kingdom']} />
        <CountriesSection prefix={jobType.slug} />
        <ServicesSection
          showAll={false}
          prefix={jobType.slug}
        />
        <KeywordsSection />
      </div>
    </div>
  );
}
