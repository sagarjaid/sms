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
// export const dynamic = 'force-static';
export const dynamic = 'force-dynamic';
export const revalidate = false;

// export async function generateStaticParams() {
//   const params = [];
//   for (const jobType of KEYWORDS) {
//     for (const service of SERVICES) {
//       for (const country of Country.getAllCountries()) {
//         params.push({
//           jobType: jobType.slug,
//           'country-service': service.toLowerCase().replace(/\s+/g, '-'),
//           country: country.name.toLowerCase().replace(/\s+/g, '-'),
//         });
//       }
//     }
//   }

//   return params;
// }

export async function generateMetadata({
  params,
}: {
  params: { jobType: string; 'country-service': string; country: string };
}) {
  const jobType = KEYWORDS.find((type) => type.slug === params.jobType);
  const normalizedServiceName = params['country-service']
    .toLowerCase()
    .replace(/-/g, ' ');
  const normalizedCountryName = params.country.toLowerCase().replace(/-/g, ' ');

  const service = SERVICES.find(
    (s) => s.toLowerCase() === normalizedServiceName
  );
  const country = Country.getAllCountries().find(
    (c) => c.name.toLowerCase() === normalizedCountryName
  );

  if (!jobType || !service || !country) {
    return getSEOTags({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    });
  }

  const title = `${jobType.title} for ${service} in ${country.name}`;
  const description = `Looking for ${jobType.title.toLowerCase()} for ${service} in ${country.name}? Join today and earn with flexible hours, great pay, and complete privacy.`;

  return getSEOTags({
    title: `${title} | High-Paying Opportunities — Smslly`,
    description,
    canonicalUrlRelative: `/${jobType.slug}/${params['country-service']}/${params.country}`,
    openGraph: {
      title: `${title} | High-Paying Opportunities — Smslly`,
      description,
    },
  });
}

export default function ServiceCountryPage({
  params,
}: {
  params: { jobType: string; 'country-service': string; country: string };
}) {
  const jobType = KEYWORDS.find((type) => type.slug === params.jobType);
  const normalizedServiceName = params['country-service']
    .toLowerCase()
    .replace(/-/g, ' ');
  const normalizedCountryName = params.country.toLowerCase().replace(/-/g, ' ');

  const service = SERVICES.find(
    (s) => s.toLowerCase() === normalizedServiceName
  );
  const country = Country.getAllCountries().find(
    (c) => c.name.toLowerCase() === normalizedCountryName
  );

  if (!jobType || !service || !country) {
    return notFound();
  }

  return (
    <div className='p-6 w-full max-w-7xl mx-auto'>
      <div className='mb-6'>
        <BreadcrumbNav
          items={[
            { label: 'Home', href: getAbsoluteUrl('/') },
            { label: jobType.title, href: getAbsoluteUrl(`/${jobType.slug}`) },
            {
              label: service,
              href: getAbsoluteUrl(
                `/${jobType.slug}/${params['country-service']}`
              ),
            },
            { label: country.name },
          ]}
        />
      </div>

      <h1 className='text-3xl font-semibold mb-6'>
        {jobType.title} for {service} in {country.name}
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
