/** @format */

'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
// import Navbar from '@/components/Navbar';

import { useState, useMemo } from 'react';
import TradingViewSection from '@/containers/tradingview-section';
import StocksTable from '@/containers/stocks-table';
import Navbar from '@/components/Navbar';

import Image from 'next/image';
import hero from '@/app/hero.png';
// import DashboardSection from '@/containers/dashboard-page';
import { usePathname } from 'next/navigation';
import { AssetSearch } from '@/components/asset-search';
import RealEstateList from '@/components/RealEstateList';

export default function Home() {
  const path = usePathname();

  console.log(path, 'path');

  const realEstateList = useMemo(
    () => [
      { name: 'SPDR Dow Jones Global Real Estate ETF', symbol: 'RWO' },
      { name: 'Invesco NASDAQ ETF', symbol: 'IYR' },
      { name: 'iShares U.S. Real Estate ETF', symbol: 'IYY' },
      { name: 'iShares Global REIT ETF', symbol: 'REET' },
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
              <div className='flex w-full'>
                <div className='flex flex-col w-full p-4'>
                  <h2 className='text-2xl font-bold mb-4'>
                    Real Estate Performance
                  </h2>
                  <StocksTable
                    stocksList={realEstateList}
                    path={path}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
