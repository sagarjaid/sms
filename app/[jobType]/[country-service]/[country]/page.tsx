/** @format */

import { Country } from 'country-state-city';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSEOTags } from '@/lib/seo';
import { KEYWORDS } from '@/lib/keyword';
import { SERVICES } from '@/lib/service';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { getAbsoluteUrl } from '@/lib/utils';
import PhoneNumberGrid from '@/components/phone-number-grid';
import KeywordsSection from '@/components/keywords-section';
import CountriesSection from '@/components/countries-section';
import ServicesSection from '@/components/services-section';

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
      title: 'Page Not Found — SMSlly',
      description: 'The requested page could not be found.',
    });
  }

  const title = `${jobType.title} SMS for ${service} in ${country.name}`;
  const description = `${jobType.title.toLowerCase()} SMS verification with ${service} in ${
    country.name
  }. Free and secure SMS receiving service for ${jobType.title.toLowerCase()} messages and codes. Instant access to online numbers for receiving text messages for ${service} in ${
    country.name
  }.`;

  const keywords = [
    `${jobType.title} SMS ${service} ${country.name}`,
    `${jobType.title} verification ${service} ${country.name}`,
    `${jobType.title} phone number ${service} ${country.name}`,
    `${service} SMS service ${country.name}`,
    `${country.name} phone number ${service}`,
    `${country.name} SMS verification ${service}`,
    'temporary phone number',
    'SMS verification',
    'receive SMS online',
    'online phone number',
    'virtual phone number',
    'disposable phone number',
    'free SMS verification',
    'SMS receiving service',
  ];

  return getSEOTags({
    title: `${title} | Receive SMS Online — SMSlly`,
    description,
    keywords,
    canonicalUrlRelative: `/${jobType.slug}/${params['country-service']}/${params.country}`,
    openGraph: {
      title: `${title} | Receive SMS Online — SMSlly`,
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

      <div className='space-y-8'>
        <PhoneNumberGrid />
        <CountriesSection />
        <ServicesSection showAll={false} />
        <KeywordsSection />
      </div>
    </div>
  );
}
