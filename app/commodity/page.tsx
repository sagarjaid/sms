/** @format */

'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
// import Navbar from '@/components/Navbar';

import { useState, useMemo } from 'react';
import TradingViewSection from '@/containers/tradingview-section';
import CommodityTable from '@/containers/commodity-table';
import Navbar from '@/components/Navbar';

import Image from 'next/image';
import hero from '@/app/hero.png';
// import DashboardSection from '@/containers/dashboard-page';
import { usePathname } from 'next/navigation';
import { AssetSearch } from '@/components/asset-search';

export default function Home() {
  const path = usePathname();

  console.log(path, 'path');

  const commoditiesList = useMemo(
    () => [
      { name: 'Gold', symbol: 'GLD' },
      { name: 'Silver', symbol: 'SLV' },
      { name: 'Copper', symbol: 'CPER' },
      { name: 'Platinum', symbol: 'PPLT' },
      { name: 'Wti Crude Oil', symbol: 'USO' },
      { name: 'Sugar', symbol: 'CANE' },
      { name: 'Corn', symbol: 'CORN' },
      { name: 'Coffee', symbol: 'COFE' },
      { name: 'Natural Gas', symbol: 'UNG' },
      { name: 'Wheat', symbol: 'WEAT' },
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
                <h2 className='text-2xl font-bold mb-4'>
                  Commodity Performance
                </h2>
                <CommodityTable
                  commoditiesList={commoditiesList}
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
