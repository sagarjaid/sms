/** @format */

import { Suspense } from 'react';
import Footer from '@/components/Footer';
import Headline from '@/components/Headline';
import Copy from '@/components/Copy';
import Header from '@/components/Header';

export default function HomePageContent() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <main>
        <Headline />
        <Copy />
      </main>
      <Footer />
    </>
  );
}
