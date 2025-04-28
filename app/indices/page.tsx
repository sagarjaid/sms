/** @format */

'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
// import Navbar from '@/components/Navbar';

import { useState, useMemo } from 'react';
import TradingViewSection from '@/containers/tradingview-section';
import IndicesTable from '@/containers/indices-table';
import Navbar from '@/components/Navbar';

import Image from 'next/image';
import hero from '@/app/hero.png';
// import DashboardSection from '@/containers/dashboard-page';
import { usePathname } from 'next/navigation';
import { AssetSearch } from '@/components/asset-search';

export default function Home() {
  const path = usePathname();

  console.log(path, 'path');

  const indicesList = useMemo(
    () => [
      { name: 'S&P500 ETF', symbol: 'SPY' },
      { name: 'Invesco NASDAQ ETF', symbol: 'QQQ' },
      { name: 'iShares Dow Jones ETF', symbol: 'IYY' },
      { name: 'iShares Bitcoin Trust', symbol: 'IBIT' },
      { name: 'Fidelity Wise Origin Bitcoin Trust', symbol: 'FBTC' },
      { name: 'Grayscale Bitcoin Trust', symbol: 'GBTC' },
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
                <h2 className='text-2xl font-bold mb-4'>Indices Performance</h2>
                <IndicesTable
                  indicesList={indicesList}
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
