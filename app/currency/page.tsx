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
import CurrencyTable from '@/containers/currency-table';

export default function Home() {
  const path = usePathname();

  console.log(path, 'path');

  const currencyList = useMemo(
    () => [
      { symbol: 'ETHBTC', name: 'ETH / BTC' },
      { symbol: 'BTCUSD', name: 'USD / BTC' },
      { symbol: 'BTCAUD', name: 'AUD / BTC' },
      { symbol: 'BTCEUR', name: 'EUR / BTC' },
      { symbol: 'BTCGBP', name: 'GBP / BTC' },
      { symbol: 'BTCJPY', name: 'JPY / BTC' },
      { symbol: 'LTCBTC', name: 'LTC / BTC' },
      { symbol: 'XRPBTC', name: 'XRP / BTC' },
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
                  Currency Performance
                </h2>
                <CurrencyTable
                  currencyList={currencyList}
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
