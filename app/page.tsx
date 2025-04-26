/** @format */

import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <h1 className='text-4xl font-bold'>Hello</h1>
      <Footer />
    </>
  );
}
