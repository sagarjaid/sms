/** @format */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSEOTags } from '@/lib/seo';
import { KEYWORDS } from '@/lib/keyword';
import { SERVICES } from '@/lib/service';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { getAbsoluteUrl } from '@/lib/utils';

// Explicitly mark page as static
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  try {
    const params = [];

    // Ensure KEYWORDS and SERVICES are defined and not empty
    if (!KEYWORDS?.length || !SERVICES?.length) {
      console.error('KEYWORDS or SERVICES is empty or undefined');
      return [];
    }

    for (const jobType of KEYWORDS) {
      if (!jobType?.slug) continue;

      for (const service of SERVICES) {
        if (!service) continue;

        params.push({
          jobType: jobType.slug,
          service: service.toLowerCase().replace(/\s+/g, '-'),
        });
      }
    }

    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { jobType: string; service: string };
}) {
  if (!params?.jobType || !params?.service) {
    return getSEOTags({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    });
  }

  const jobType = KEYWORDS.find((type) => type.slug === params.jobType);
  if (!jobType) {
    return getSEOTags({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    });
  }

  const normalizedServiceName = params.service.toLowerCase().replace(/-/g, ' ');
  const service = SERVICES.find(
    (s) => s.toLowerCase() === normalizedServiceName
  );

  if (!service) {
    return getSEOTags({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    });
  }

  return getSEOTags({
    title: `${jobType.title} for ${service} | High-Paying Opportunities — Smslly`,
    description: `Looking for ${jobType.title.toLowerCase()} for ${service}? Join today and earn with flexible hours, great pay, and complete privacy. Apply now and start your journey!`,
    canonicalUrlRelative: `/${jobType.slug}/${params.service}`,
    openGraph: {
      title: `${jobType.title} for ${service} | High-Paying Opportunities — Smslly`,
      description: `Looking for ${jobType.title.toLowerCase()} for ${service}? Join today and earn with flexible hours, great pay, and complete privacy. Apply now and start your journey!`,
    },
  });
}

export default function ServicePage({
  params,
}: {
  params: { jobType: string; service: string };
}) {
  if (!params?.jobType || !params?.service) {
    return notFound();
  }

  const jobType = KEYWORDS.find((type) => type.slug === params.jobType);
  if (!jobType) {
    return notFound();
  }

  const normalizedServiceName = params.service.toLowerCase().replace(/-/g, ' ');
  const service = SERVICES.find(
    (s) => s.toLowerCase() === normalizedServiceName
  );

  if (!service) {
    return notFound();
  }

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
