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

import Image from 'next/image';
import hero from '@/app/hero.png';
// import DashboardSection from '@/containers/dashboard-page';
import { usePathname } from 'next/navigation';
import { AssetSearch } from '@/components/asset-search';
export default function Home() {
  const path = usePathname();

  console.log(path, 'path');

  const stocksList = useMemo(
    () => [
      { name: 'Apple Inc', symbol: 'AAPL' },
      { name: 'Tesla Inc', symbol: 'TSLA' },
      { name: 'Microsoft Inc', symbol: 'MSFT' },
      { name: 'Nvidia Inc', symbol: 'NVDA' },
      { name: 'Amazon Inc', symbol: 'AMZN' },
      { name: 'Alphabet Inc', symbol: 'GOOGL' },
      { name: 'Meta Inc', symbol: 'META' },
      { name: 'Berkshire Hathaway Inc', symbol: 'BRK.B' },
      { name: 'ExxonMobil Inc', symbol: 'XOM' },
      { name: 'BP Inc', symbol: 'BP' },
      { name: 'Marathon Digital Inc', symbol: 'MARA' },
      { name: 'Microstrategy Inc', symbol: 'MSTR' },
      { name: 'JPMorgan Chase Inc', symbol: 'JPM' },
      { name: 'Goldman Sachs Inc', symbol: 'GS' },
      { name: 'Mastercard Inc', symbol: 'MA' },
      { name: 'Visa Inc', symbol: 'V' },
      { name: 'Disney Inc', symbol: 'DIS' },
      { name: 'LVMH Inc', symbol: 'NKE' },
      { name: 'Pepsi', symbol: 'PEP' },
      { name: 'Coca Cola', symbol: 'KO' },
      { name: 'CSL Inc', symbol: 'CSL' },
      { name: 'TSMC', symbol: 'TSM' },
      { name: 'General Electric', symbol: 'GE' },
      { name: 'General Motors', symbol: 'GM' },
      { name: 'Ford Motor', symbol: 'F' },
    ],
    []
  );

  return (
    <>
      {/* <Suspense>
        <Header />
      </Suspense> */}
      <Header />
      <main>
        <div className='flex w-full h-screen text-xs'>
          <div className='flex justify-between w-full'>
            <div className='flex flex-col w-full overflow-y-scroll'>
              <AssetSearch />
              <div className='p-4'>
                <h2 className='text-2xl font-bold mb-4'>Stock Performance</h2>
                <StocksTable
                  stocksList={stocksList}
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
