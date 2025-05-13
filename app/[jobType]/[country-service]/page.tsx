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

// export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function generateStaticParams() {
  const params = [];

  for (const jobType of KEYWORDS) {
    // Generate country params
    for (const country of Country.getAllCountries()) {
      params.push({
        jobType: jobType.slug,
        'country-service': country.name.toLowerCase().replace(/\s+/g, '-'),
      });
    }
    // Generate service params
    for (const service of SERVICES) {
      params.push({
        jobType: jobType.slug,
        'country-service': service.toLowerCase().replace(/\s+/g, '-'),
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { jobType: string; 'country-service': string };
}) {
  const jobType = KEYWORDS.find((type) => type.slug === params.jobType);
  const normalizedName = params['country-service']
    .toLowerCase()
    .replace(/-/g, ' ');

  // Try to find as country first
  let country = Country.getAllCountries().find(
    (c) => c.name.toLowerCase() === normalizedName
  );

  // If not found as country, try as service
  let service =
    !country ? SERVICES.find((s) => s.toLowerCase() === normalizedName) : null;

  if (!jobType || (!country && !service)) {
    return getSEOTags({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    });
  }

  const title =
    country ?
      `${jobType.title} in ${country.name}`
    : `${jobType.title} for ${service}`;

  const description =
    country ?
      `Looking for ${jobType.title.toLowerCase()} in ${country.name}? Join today and earn with flexible hours, great pay, and complete privacy.`
    : `Looking for ${jobType.title.toLowerCase()} for ${service}? Join today and earn with flexible hours, great pay, and complete privacy.`;

  return getSEOTags({
    title: `${title} | High-Paying Opportunities — Smslly`,
    description,
    canonicalUrlRelative: `/${jobType.slug}/${params['country-service']}`,
    openGraph: {
      title: `${title} | High-Paying Opportunities — Smslly`,
      description,
    },
  });
}

export default function CountryServicePage({
  params,
}: {
  params: { jobType: string; 'country-service': string };
}) {
  const jobType = KEYWORDS.find((type) => type.slug === params.jobType);
  const normalizedName = params['country-service']
    .toLowerCase()
    .replace(/-/g, ' ');

  // Try to find as country first
  let country = Country.getAllCountries().find(
    (c) => c.name.toLowerCase() === normalizedName
  );

  // If not found as country, try as service
  let service =
    !country ? SERVICES.find((s) => s.toLowerCase() === normalizedName) : null;

  if (!jobType || (!country && !service)) {
    return notFound();
  }

  // If it's a country, show the country page
  if (country) {
    return (
      <div className='p-6 w-full max-w-7xl mx-auto'>
        <div className='mb-6'>
          <BreadcrumbNav
            items={[
              { label: 'Home', href: getAbsoluteUrl('/') },
              {
                label: jobType.title,
                href: getAbsoluteUrl(`/${jobType.slug}`),
              },
              { label: country.name },
            ]}
          />
        </div>

        <h1 className='text-3xl font-semibold mb-6'>
          {jobType.title} in {country.name}
        </h1>

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

  // If it's a service, show the country selection page
  return (
    <div className='p-6 w-full max-w-7xl mx-auto'>
      <div className='mb-6'>
        <BreadcrumbNav
          items={[
            { label: 'Home', href: getAbsoluteUrl('/') },
            { label: jobType.title, href: getAbsoluteUrl(`/${jobType.slug}`) },
            { label: service },
          ]}
        />
      </div>

      <h1 className='text-3xl font-semibold mb-6'>
        {jobType.title} for {service}
      </h1>

      <div className='my-8'>
        <h2 className='text-xl font-semibold mb-4'>Select Country</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Country.getAllCountries().map((country) => (
            <Link
              href={getAbsoluteUrl(
                `/${jobType.slug}/${params['country-service']}/${country.name.toLowerCase().replace(/\s+/g, '-')}`
              )}
              key={country.isoCode}
              className='text-blue-600 underline'>
              {jobType.title} for {service} in {country.name}
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
