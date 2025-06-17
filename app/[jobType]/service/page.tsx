/** @format */

import { notFound } from 'next/navigation';
import { getSEOTags } from '@/lib/seo';
import { KEYWORDS } from '@/lib/keyword';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { getAbsoluteUrl } from '@/lib/utils';
import ServicesSection from '@/components/services-section';

// Remove static generation - render on demand
// export const dynamic = 'force-static';
// export const revalidate = 3600; // Revalidate every hour

// Comment out static params generation
// export async function generateStaticParams() {
//   try {
//     const params = [];

//     // Ensure KEYWORDS is defined and not empty
//     if (!KEYWORDS?.length) {
//       console.error('KEYWORDS is empty or undefined');
//       return [];
//     }

//     for (const jobType of KEYWORDS) {
//       if (!jobType?.slug) continue;
//       params.push({
//         jobType: jobType.slug,
//       });
//     }

//     return params;
//   } catch (error) {
//     console.error('Error generating static params:', error);
//     return [];
//   }
// }

export async function generateMetadata({
  params,
}: {
  params: { jobType: string };
}) {
  if (!params?.jobType) {
    return getSEOTags({
      title: 'Page Not Found — SMSlly',
      description: 'The requested page could not be found.',
    });
  }

  const jobType = KEYWORDS.find((type) => type.slug === params.jobType);
  if (!jobType) {
    return getSEOTags({
      title: 'Page Not Found — SMSlly',
      description: 'The requested page could not be found.',
    });
  }

  const title = `${jobType.title} SMS Services`;
  const description = `${jobType.title.toLowerCase()} SMS verification services. Free and secure SMS receiving service for ${jobType.title.toLowerCase()} messages and codes. Instant access to online numbers for receiving text messages.`;

  const keywords = [
    `${jobType.title} SMS services`,
    `${jobType.title} verification`,
    `${jobType.title} phone number`,
    'SMS service',
    'phone number',
    'SMS verification',
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
    canonicalUrlRelative: `/${jobType.slug}/service`,
    openGraph: {
      title: `${title} | Receive SMS Online — SMSlly`,
      description,
    },
  });
}

export default function ServicePage({
  params,
}: {
  params: { jobType: string };
}) {
  if (!params?.jobType) {
    return notFound();
  }

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
            { label: 'Service' },
          ]}
        />
      </div>

      <h1 className='text-3xl font-semibold mb-6'>
        {jobType.title} OTP Service
      </h1>

      <ServicesSection showAll={true} />
    </div>
  );
}
