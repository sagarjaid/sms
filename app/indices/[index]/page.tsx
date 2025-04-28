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

import Image from 'next/image';
import hero from '@/app/hero.png';
// import DashboardSection from '@/containers/dashboard-page';
import { usePathname } from 'next/navigation';
// import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { AssetSearch } from '@/components/asset-search';
import Navbar from '@/components/Navbar';
import IndicesList from '@/components/IndicesList';

interface IndexPageProps {
  params: {
    index: string;
  };
}

export default function IndexPage({ params }: IndexPageProps) {
  const path = usePathname();
  const index = params.index;

  // Extract index symbol from URL (e.g., "spy-vs-btc" -> "SPY")
  const indexSymbol = index.split('-')[0].toUpperCase();

  // Define indicesList array
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

  // Find index name from indicesList
  const indexInfo = indicesList.find((index) => index.symbol === indexSymbol);
  const indexName = indexInfo ? indexInfo.name : 'Unknown Index';

  return (
    <>
      <main>
        <div className='flex w-full text-xs '>
          <Navbar />
          <div className='flex justify-between w-full'>
            <div className='flex flex-col w-full h-screen  overflow-y-scroll'>
              <Header />
              <div className='flex w-full h-screen'>
                <IndicesList indicesList={indicesList} />
                <div className='w-full p-4'>
                  <TradingViewSection
                    stocksList={indicesList}
                    initialStockTicker={indexSymbol}
                    initialTitle={`${indexName} / BTC`}
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
