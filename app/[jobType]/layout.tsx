/** @format */

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Explicitly mark layout as static
export const dynamic = 'force-static';
export const revalidate = false;

export default function JobTypeLayout({
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
