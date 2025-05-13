/** @format */

import { Suspense } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import { getSEOTags } from '@/lib/seo';
import ServicesSection from '@/components/services-section';
import KeywordsSection from '@/components/keywords-section';
import CountriesSection from '@/components/countries-section';
import PhoneNumberGrid from '@/components/phone-number-grid';

// Server Component for metadata
export const metadata = getSEOTags({
  title: 'SMSlly - Receive SMS Online | Temporary Phone Number',
  description:
    'Get a temporary phone number to receive SMS online. Free and secure SMS receiving service for verification codes, messages, and more.',
  keywords: [
    'temporary phone number',
    'receive SMS online',
    'SMS verification',
    'virtual phone number',
    'disposable phone number',
    'SMS receiving service',
    'online SMS',
    'free SMS receiver',
  ],
  canonicalUrlRelative: '/',
});

// Client Component for the main content
// 'use client';

export default function HomePageContent() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <main className='p-6 max-w-7xl mx-auto space-y-8 mb-10'>
        <h1 className='text-4xl font-bold mt-8'>Receive SMS Online</h1>
        <h2>
          FREE temporary phone number to receive SMS online completely free. No
          registration required. No credit card required. Enjoy!
        </h2>

        <PhoneNumberGrid />
        <CountriesSection />
        <KeywordsSection />
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}
