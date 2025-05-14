/** @format */

import { Country } from 'country-state-city';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSEOTags } from '@/lib/seo';
import { KEYWORDS, Keyword } from '@/lib/keyword';
import { SERVICES, Service } from '@/lib/service';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { getAbsoluteUrl } from '@/lib/utils';
import CountriesSection from '@/components/countries-section';
import PhoneNumberGrid from '@/components/phone-number-grid';
import ServicesSection from '@/components/services-section';
import KeywordsSection from '@/components/keywords-section';

// Explicitly mark page as static

// export const dynamic = 'force-static';

export const dynamic = 'force-dynamic';
export const revalidate = false;

// export async function generateStaticParams() {
//   const params = [];

//   for (const jobType of KEYWORDS) {
//     // Generate country params
//     for (const country of Country.getAllCountries()) {
//       params.push({
//         jobType: jobType.slug,
//         'country-service': country.name.toLowerCase().replace(/\s+/g, '-'),
//       });
//     }
//     // Generate service params
//     for (const service of SERVICES) {
//       params.push({
//         jobType: jobType.slug,
//         'country-service': service.toLowerCase().replace(/\s+/g, '-'),
//       });
//     }
//   }

//   return params;
// }

export async function generateMetadata({
  params,
}: {
  params: { jobType: string; 'country-service': string };
}) {
  const jobType = KEYWORDS.find(
    (type: Keyword) => type.slug === params.jobType
  );
  const normalizedName = params['country-service']
    .toLowerCase()
    .replace(/-/g, ' ');

  // Try to find as country first
  let country = Country.getAllCountries().find(
    (c) => c.name.toLowerCase() === normalizedName
  );

  // If not found as country, try as service
  let service = !country
    ? SERVICES.find((s: Service) => s.toLowerCase() === normalizedName)
    : null;

  if (!jobType || (!country && !service)) {
    return getSEOTags({
      title: 'Page Not Found — SMSlly',
      description: 'The requested page could not be found.',
    });
  }

  const title = country
    ? `${jobType.title} SMS in ${country.name}`
    : `${jobType.title} SMS for ${service}`;

  const description = country
    ? `${jobType.title.toLowerCase()} SMS verification in ${
        country.name
      }. Free and secure SMS receiving service for ${jobType.title.toLowerCase()} messages and codes. Instant access to online numbers for receiving text messages in ${
        country.name
      }.`
    : `${jobType.title.toLowerCase()} SMS verification with ${service}. Free and secure SMS receiving service for ${jobType.title.toLowerCase()} messages and codes. Instant access to online numbers for receiving text messages for ${service}.`;

  const keywords = country
    ? [
        `${jobType.title} SMS ${country.name}`,
        `${jobType.title} verification ${country.name}`,
        `${jobType.title} phone number ${country.name}`,
        `${country.name} SMS service`,
        'temporary phone number',
        'SMS verification',
        'receive SMS online',
        'online phone number',
        'virtual phone number',
        'disposable phone number',
        'free SMS verification',
        'SMS receiving service',
        `${country.name} phone number`,
        `${country.name} SMS verification`,
      ]
    : [
        `${jobType.title} SMS ${service}`,
        `${jobType.title} verification ${service}`,
        `${jobType.title} phone number ${service}`,
        `${service} SMS service`,
        'temporary phone number',
        'SMS verification',
        'receive SMS online',
        'online phone number',
        'virtual phone number',
        'disposable phone number',
        'free SMS verification',
        'SMS receiving service',
        `${service} phone number`,
        `${service} SMS verification`,
      ];

  return getSEOTags({
    title: `${title} | Receive SMS Online — SMSlly`,
    description,
    keywords,
    canonicalUrlRelative: `/${jobType.slug}/${params['country-service']}`,
    openGraph: {
      title: `${title} | Receive SMS Online — SMSlly`,
      description,
    },
  });
}

export default function CountryServicePage({
  params,
}: {
  params: { jobType: string; 'country-service': string };
}) {
  const jobType = KEYWORDS.find(
    (type: Keyword) => type.slug === params.jobType
  );
  const normalizedName = params['country-service']
    .toLowerCase()
    .replace(/-/g, ' ');

  // Try to find as country first
  let country = Country.getAllCountries().find(
    (c) => c.name.toLowerCase() === normalizedName
  );

  // If not found as country, try as service
  let service = !country
    ? SERVICES.find((s: Service) => s.toLowerCase() === normalizedName)
    : null;

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

        <div className='space-y-8'>
          <PhoneNumberGrid
            country={[country.name.toLowerCase().replace(/\s+/g, '-')]}
          />
          <CountriesSection prefix={jobType.slug} />
          <ServicesSection
            showAll={false}
            prefix={jobType.slug}
            suffix={country.name.toLowerCase().replace(/\s+/g, '-')}
          />
          <KeywordsSection />
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
        <CountriesSection
          prefix={`${jobType.slug}/${service
            .toLowerCase()
            .replace(/\s+/g, '-')}`}
        />
      </div>
    </div>
  );
}
