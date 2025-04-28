/** @format */

'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
// import Navbar from '@/components/Navbar';

import { useState, useMemo } from 'react';
import TradingViewSection from '@/containers/tradingview-section';
import BondsTable from '@/containers/bonds-table';
import Navbar from '@/components/Navbar';

import Image from 'next/image';
import hero from '@/app/hero.png';
// import DashboardSection from '@/containers/dashboard-page';
import { usePathname } from 'next/navigation';
import { AssetSearch } from '@/components/asset-search';

export default function Home() {
  const path = usePathname();

  console.log(path, 'path');

  const bondsList = useMemo(
    () => [
      { name: 'iShares U.S. Treasury Bond ETF', symbol: 'GOVT' },
      { name: 'iShares Core U.S. Aggregate Bond ETF', symbol: 'AGG' },
      {
        name: 'iShares iBoxx $ Investment Grade Corporate Bond',
        symbol: 'LQD',
      },
      { name: 'iShares MBS ETF', symbol: 'MBB' },
    ],
    []
  );

  return (
    <>
      <main className='h-screen'>
        <div className='flex w-full text-xs '>
          <Navbar />
          <div className='flex justify-between w-full'>
            <div className='flex flex-col w-full '>
              <Header />
              <div className='flex flex-col w-full  p-4'>
                <h2 className='text-2xl font-bold mb-4'>Bond Performance</h2>
                <BondsTable
                  bondsList={bondsList}
                  path={path}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
