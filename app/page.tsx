/** @format */

import { Suspense } from 'react';
import Footer from '@/components/Footer';
import Headline from '@/components/Headline';
import Copy from '@/components/Copy';
import HeaderHomepage from '@/components/HeaderHomepage';

export default function Home() {
  return (
    <>
      <HeaderHomepage />
      <main>
        <Headline />
        <Copy />
      </main>
      <Footer />
    </>
  );
}
