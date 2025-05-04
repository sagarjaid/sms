/** @format */

'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
import { useState, useMemo } from 'react';
import TradingViewSection from '@/containers/tradingview-section';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import IndicesList from '@/components/IndicesList';

interface IndicesPageProps {
  indices: string;
}

export default function IndicesPageClient({ indices }: IndicesPageProps) {
  const path = usePathname();

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
                  TopTitle='Index: '
                  selectedTimespan='day'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
