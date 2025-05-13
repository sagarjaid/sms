/** @format */

import { Country } from 'country-state-city';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSEOTags } from '@/lib/seo';
import { KEYWORDS } from '@/lib/keyword';
import { SERVICES } from '@/lib/service';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { getAbsoluteUrl } from '@/lib/utils';

// Explicitly mark page as static
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  return KEYWORDS.map((keyword) => ({
    jobType: keyword.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { jobType: string };
}) {
  const jobType = KEYWORDS.find((type) => type.slug === params.jobType);

  if (!jobType) {
    return getSEOTags({
      title: 'Page Not Found — Smslly',
      description: 'The requested page could not be found.',
    });
  }

  return getSEOTags({
    title: `${jobType.title} Jobs | High-Paying Opportunities — Smslly`,
    description: `Find high-paying ${jobType.title.toLowerCase()} jobs and opportunities. Join Smslly today and earn with flexible hours, great pay, and complete privacy.`,
    canonicalUrlRelative: `/${jobType.slug}`,
    openGraph: {
      title: `${jobType.title} Jobs | High-Paying Opportunities — Smslly`,
      description: `Find high-paying ${jobType.title.toLowerCase()} jobs and opportunities. Join Smslly today and earn with flexible hours, great pay, and complete privacy.`,
    },
  });
}

export default function JobTypePage({
  params,
}: {
  params: { jobType: string };
}) {
  const jobType = KEYWORDS.find((type) => type.slug === params.jobType);

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

      <div className='my-8'>
        <h2 className='text-xl font-semibold mb-4'>Available Countries</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Country.getAllCountries().map((country) => (
            <Link
              href={getAbsoluteUrl(
                `/${jobType.slug}/${country.name.toLowerCase().replace(/\s+/g, '-')}`
              )}
              key={country.isoCode}
              className='text-blue-600 underline'>
              {jobType.title} in {country.name}
            </Link>
          ))}
        </div>
      </div>

      <div className='my-8'>
        <h2 className='text-xl font-semibold mb-4'>Available Services</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {SERVICES.map((service) => (
            <Link
              href={getAbsoluteUrl(
                `/${jobType.slug}/${service.toLowerCase().replace(/\s+/g, '-')}`
              )}
              key={service}
              className='text-blue-600 underline'>
              {jobType.title} for {service}
            </Link>
          ))}
        </div>
      </div>

      <div className='flex justify-center'>
        <Link
          href='#join'
          className='border border-gray-700 rounded-sm w-fit text-center gap-1.5 hover:bg-muted/80 text-muted-foreground font-bold py-4 px-6 mb-12 flex items-center h-12 transition-colors'>
          <span>Apply Now</span>
        </Link>
      </div>
    </div>
  );
}
