/** @format */

'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
import { useState, useMemo } from 'react';
import TradingViewSection from '@/containers/tradingview-section';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import RealEstateList from '@/components/RealEstateList';

interface RealEstatePageProps {
  realestate: string;
}

export default function RealEstatePageClient({
  realestate,
}: RealEstatePageProps) {
  const path = usePathname();

  // Extract real estate symbol from URL (e.g., "rwo-vs-btc" -> "RWO")
  const realEstateSymbol = realestate.split('-')[0].toUpperCase();

  // Define realEstateList array
  const realEstateList = useMemo(
    () => [
      { name: 'SPDR Dow Jones Global Real Estate ETF', symbol: 'RWO' },
      { name: 'Invesco NASDAQ ETF', symbol: 'IYR' },
      { name: 'iShares U.S. Real Estate ETF', symbol: 'IYY' },
      { name: 'iShares Global REIT ETF', symbol: 'REET' },
    ],
    []
  );

  // Find real estate name from realEstateList
  const realEstateInfo = realEstateList.find(
    (realEstate) => realEstate.symbol === realEstateSymbol
  );
  const realEstateName = realEstateInfo
    ? realEstateInfo.name
    : 'Unknown Real Estate';

  return (
    <main>
      <div className='flex w-full text-xs '>
        <Navbar />
        <div className='flex justify-between w-full'>
          <div className='flex flex-col w-full h-screen  overflow-y-scroll'>
            <Header />
            <div className='flex w-full h-screen'>
              <RealEstateList realEstateList={realEstateList} />
              <div className='w-full p-4'>
                <TradingViewSection
                  stocksList={realEstateList}
                  initialStockTicker={realEstateSymbol}
                  initialTitle={`${realEstateName} / BTC`}
                  TopTitle='Real Estate: '
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
