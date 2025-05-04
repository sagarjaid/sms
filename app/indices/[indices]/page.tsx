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

interface IndicesPageProps {
  params: {
    indices: string;
  };
}

export default function IndicesPage({ params }: IndicesPageProps) {
  const path = usePathname();
  const indices = params.indices;

  // Extract indices symbol from URL (e.g., "spy-vs-btc" -> "SPY")
  const indicesSymbol = indices.split('-')[0].toUpperCase();

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

  // Find indices name from indicesList
  const indicesInfo = indicesList.find(
    (indices) => indices.symbol === indicesSymbol
  );
  const indicesName = indicesInfo ? indicesInfo.name : 'Unknown Index';

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
                    initialStockTicker={indicesSymbol}
                    initialTitle={`${indicesName} / BTC`}
                    TopTitle='Indices: '
                    selectedTimespan='day'
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
