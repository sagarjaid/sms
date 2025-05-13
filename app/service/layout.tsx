/** @format */

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Explicitly mark layout as static
export const dynamic = 'force-static';

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
