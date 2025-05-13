/** @format */

'use client';

/** @format */

import { Suspense } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import { getAbsoluteUrl } from '@/lib/utils';
import { SERVICES } from '@/lib/service';
import { KEYWORDS } from '@/lib/keyword';
import { Country } from 'country-state-city';

export default function HomePageContent() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <main className='p-6 max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold my-8'>Receive SMS Online</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {SERVICES.map((service) => (
            <Link
              href={getAbsoluteUrl(`/service/${service.toLowerCase()}`)}
              key={service}
              className='text-blue-600 underline'>
              {service}
            </Link>
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {KEYWORDS.map((keyword) => (
            <Link
              href={getAbsoluteUrl(`/${keyword.slug}`)}
              key={keyword.slug}
              className='text-blue-600 underline'>
              {keyword.title}
            </Link>
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Country.getAllCountries().map((country) => (
            <Link
              href={getAbsoluteUrl(
                `/country/${country.name.toLowerCase().replace(/\s+/g, '-')}`
              )}
              key={country.isoCode}
              className='text-blue-600 underline'>
              {country.name}
            </Link>
          ))}
        </div>

        <div className='flex justify-center'>
          <Link
            href='#join'
            className='border border-gray-700 rounded-sm w-fit text-center gap-1.5 hover:bg-muted/80 text-muted-foreground font-bold py-4 px-6 mb-12 flex items-center h-12 transition-colors'>
            <span>Apply Now</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
